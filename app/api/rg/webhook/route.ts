// Rate Guardian — GHL Webhook Receiver
// GHL fires this endpoint before any workflow action runs
// Claude routing agent reasons about the lead, returns routing instructions

import { NextRequest, NextResponse } from "next/server";
import { routeLead } from "@/lib/rg/router-agent";
import {
  getContact,
  updateContactFields,
  updateContactTimezone,
  addTags,
} from "@/lib/rg/ghl-client";
import type { GHLWebhookPayload } from "@/lib/rg/types";
import { isHolidayMode, HOLD_TAG } from "@/lib/rg/holiday-mode";
import { resolveTimezone } from "@/lib/rg/timezone";
import { resolveCustomFields } from "@/lib/rg/field-map";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Extract locationId — GHL sends it at different levels depending on trigger type
    const locationId =
      payload.locationId ||
      payload.location?.id ||
      payload.location_id ||
      payload.contact?.locationId ||
      payload.customData?.locationId ||
      null;

    // Debug: log raw payload keys for troubleshooting new trigger types
    if (!locationId || locationId !== process.env.GHL_LOCATION_ID) {
      console.error("[RG Webhook] Location mismatch", {
        expected: process.env.GHL_LOCATION_ID,
        received: locationId,
        payloadKeys: Object.keys(payload),
        contactKeys: payload.contact ? Object.keys(payload.contact) : [],
      });
    }

    if (locationId !== process.env.GHL_LOCATION_ID) {
      return NextResponse.json(
        { error: "Invalid location" },
        { status: 403 }
      );
    }

    const typedPayload = payload as GHLWebhookPayload;

    // Fetch full contact data (webhook payload may be partial)
    const contact = await getContact(typedPayload.contact.id);

    // Resolve + set native GHL timezone from lead state (city refines multi-zone states).
    // GHL "Wait until business hours" steps use this natively. Non-blocking: failure
    // falls back to OPERATOR_TZ in the call-window-check endpoint.
    try {
      const fields = resolveCustomFields(contact.customFields);
      const state =
        fields["RG_Target_Property_State"] ||
        (contact as { state?: string }).state ||
        null;
      const city =
        fields["RG_Target_City"] ||
        (contact as { city?: string }).city ||
        null;
      const tz = resolveTimezone(state, city);
      if (!(contact as { timezone?: string }).timezone || (contact as { timezone?: string }).timezone !== tz) {
        await updateContactTimezone(contact.id, tz);
      }
    } catch (tzErr) {
      console.warn("[RG Webhook] timezone resolve failed:", tzErr);
    }

    // Run the Claude routing agent — always runs, even in holiday mode
    const decision = await routeLead(contact);

    // Holiday mode: still write routing decision + tags, but hold outbound
    const holidayActive = isHolidayMode();
    if (holidayActive) {
      decision.tags.push(HOLD_TAG);
      // Strip active outreach sequences — keep monitoring + newsletter only
      decision.sequence = decision.sequence.filter(
        (s) => s === "rate_guardian_monitoring" || s === "newsletter_weekly"
      );
    }

    // Write routing decision back to GHL
    await updateContactFields(contact.id, decision);
    await addTags(contact.id, decision.tags);

    return NextResponse.json({
      success: true,
      contactId: contact.id,
      segment: decision.segment,
      priority: decision.priority,
      pipelineStage: decision.pipelineStage,
      sequences: decision.sequence,
      reasoning: decision.reasoning,
      holidayMode: holidayActive,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[RG Webhook Error]", message);

    // Return 200 even on error to prevent GHL retry floods
    // Errors are logged and surfaced via Ops | Internal Notify
    return NextResponse.json(
      { success: false, error: message },
      { status: 200 }
    );
  }
}

// Health check for GHL webhook verification
export async function GET() {
  return NextResponse.json({
    service: "Rate Guardian Routing Agent",
    status: "operational",
    version: "1.0.0",
  });
}
