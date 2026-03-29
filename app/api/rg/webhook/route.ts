// Rate Guardian — GHL Webhook Receiver
// GHL fires this endpoint before any workflow action runs
// Claude routing agent reasons about the lead, returns routing instructions

import { NextRequest, NextResponse } from "next/server";
import { routeLead } from "@/lib/rg/router-agent";
import {
  getContact,
  updateContactFields,
  addTags,
} from "@/lib/rg/ghl-client";
import type { GHLWebhookPayload } from "@/lib/rg/types";

export async function POST(req: NextRequest) {
  try {
    const payload: GHLWebhookPayload = await req.json();

    // Verify the webhook is from our GHL location
    if (payload.locationId !== process.env.GHL_LOCATION_ID) {
      return NextResponse.json(
        { error: "Invalid location" },
        { status: 403 }
      );
    }

    // Fetch full contact data (webhook payload may be partial)
    const contact = await getContact(payload.contact.id);

    // Run the Claude routing agent
    const decision = await routeLead(contact);

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
