// RG | Ops | Internal Notify
// Sends internal alerts to Sean on exceptions (Needs Data, Errors).
// NOT customer-facing. Ops only.
// Called by: Result Routing, Health Check Monitor

import { NextRequest, NextResponse } from "next/server";
import {
  getContact,
  sendEmail,
  updateCustomField,
} from "@/lib/rg/ghl-client";
import { RG_FIELDS, ROSIE_STATUS } from "@/lib/rg/types";
import { resolveCustomFields } from "@/lib/rg/field-map";

const NOTIFY_EMAIL = process.env.RG_NOTIFY_EMAIL || "sean@rateguardian.com";
const FLOOD_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const contactId = payload.contactId || payload.id;
    const { source, context } = payload;
    if (!contactId) {
      return NextResponse.json({ error: "contactId or id required" }, { status: 400 });
    }

    const contact = await getContact(contactId);
    const fields = resolveCustomFields(
      contact.customFields
    );

    // ── FLOOD CONTROL: Skip if notified < 1 hour ago for this contact ──
    const lastNotified = fields[RG_FIELDS.LAST_NOTIFIED_AT];
    if (lastNotified) {
      const elapsed = Date.now() - new Date(lastNotified).getTime();
      if (elapsed < FLOOD_COOLDOWN_MS) {
        return NextResponse.json({
          action: "throttled",
          reason: `Last notified ${Math.round(elapsed / 60000)}m ago (cooldown: 60m)`,
          contactId,
        });
      }
    }

    const rosieStatus = fields[RG_FIELDS.ROSIE_STATUS];
    const rosieError = fields[RG_FIELDS.ROSIE_ERROR];
    const contactName = `${contact.firstName || ""} ${contact.lastName || ""}`.trim() || "Unknown";
    const contactLink = `https://app.gohighlevel.com/contacts/detail/${contactId}`;

    let subject: string;
    let body: string;
    let notificationType: string;

    // ── ERROR NOTIFICATION ──
    if (rosieError) {
      notificationType = "error";
      subject = `🚨 RG Error: ${contactName}`;
      body = [
        `Contact: ${contactName}`,
        `Contact ID: ${contactId}`,
        `Error: ${rosieError}`,
        `Rosie Status: ${rosieStatus || "not set"}`,
        `Last Run: ${fields[RG_FIELDS.LAST_RUN_AT] || "never"}`,
        `Source: ${source || "unknown"}`,
        context ? `Context: ${context}` : "",
        `Link: ${contactLink}`,
      ].filter(Boolean).join("\n");
    }
    // ── NEEDS DATA NOTIFICATION ──
    else if (rosieStatus === ROSIE_STATUS.NEEDS_DATA) {
      notificationType = "needs_data";
      const failureReason = fields[RG_FIELDS.ROSIE_FAILURE_REASON] || "Unknown reason";
      subject = `⚠️ RG Needs Data: ${contactName}`;
      body = [
        `Contact: ${contactName}`,
        `Contact ID: ${contactId}`,
        `Failure Reason: ${failureReason}`,
        `Lead Source: ${fields[RG_FIELDS.LEAD_SOURCE] || "not set"}`,
        `Last Evaluated: ${fields[RG_FIELDS.LAST_EVALUATED] || "never"}`,
        `Source: ${source || "unknown"}`,
        context ? `Context: ${context}` : "",
        `Link: ${contactLink}`,
      ].filter(Boolean).join("\n");
    }
    // ── CUSTOM NOTIFICATION (from Health Check, etc.) ──
    else if (context) {
      notificationType = "custom";
      subject = `📋 RG Alert: ${contactName}`;
      body = [
        `Contact: ${contactName}`,
        `Contact ID: ${contactId}`,
        `Rosie Status: ${rosieStatus || "not set"}`,
        `Alert: ${context}`,
        `Source: ${source || "unknown"}`,
        `Link: ${contactLink}`,
      ].filter(Boolean).join("\n");
    }
    // ── NO NOTIFICATION NEEDED ──
    else {
      return NextResponse.json({
        action: "skipped",
        reason: "No error or exception to notify about",
        contactId,
      });
    }

    // Send notification (creates a note on the contact)
    await sendEmail(contactId, NOTIFY_EMAIL, subject, body);

    // Update last notified timestamp (flood control)
    await updateCustomField(contactId, RG_FIELDS.LAST_NOTIFIED_AT, new Date().toISOString());

    return NextResponse.json({
      action: "notified",
      type: notificationType,
      subject,
      contactId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[RG Ops Notify Error]", message);
    return NextResponse.json(
      { action: "error", error: message },
      { status: 200 }
    );
  }
}
