// RG | Egress | Contact Follow-Up
// Gate + activation for outbound follow-up sequences.
// SAFETY: Only fires for contacts with RG_Rosie_Status = Completed.
// If not Completed → STOP immediately. No ungated outbound.
//
// Sequence: 3 days, 3 touches/day (physician leads)
// Day 1: SMS → Voicemail #1 → Voicemail #2
// Day 2: Voicemail #3 → Email (value-add) → Voicemail #4
// Day 3: Voicemail #5 → Voicemail #6 → Email (final touch)
//
// NOTE: Voicemail drops and timed sends happen in GHL workflow.
// This endpoint gates entry and manages exit conditions.

import { NextRequest, NextResponse } from "next/server";
import {
  getContact,
  addTags,
  removeTags,
  updateCustomField,
  hasTag,
} from "@/lib/rg/ghl-client";
import { RG_FIELDS, ROSIE_STATUS } from "@/lib/rg/types";
import { resolveCustomFields } from "@/lib/rg/field-map";

// Actions this endpoint handles
type FollowUpAction = "gate_check" | "exit_engaged" | "exit_booked" | "exit_opted_out";

const SEQUENCE_TAGS = [
  "RG_Path_Buying",
  "RG_Path_Shopping",
  "RG_Path_Refi",
];

export async function POST(req: NextRequest) {
  try {
    const { contactId, action = "gate_check" } = await req.json() as {
      contactId: string;
      action?: FollowUpAction;
    };

    if (!contactId) {
      return NextResponse.json({ error: "contactId required" }, { status: 400 });
    }

    const contact = await getContact(contactId);
    const fields = resolveCustomFields(
      contact.customFields
    );

    // ── EXIT CONDITIONS ──
    // These are called by GHL workflow when reply/booking/opt-out detected

    if (action === "exit_engaged") {
      // Contact replied — pull from sequence
      await removeTags(contactId, SEQUENCE_TAGS);
      await addTags(contactId, ["RG_Engaged"]);
      await updateCustomField(contactId, RG_FIELDS.FOLLOW_UP_EXIT,"engaged");
      await updateCustomField(contactId, RG_FIELDS.FOLLOW_UP_EXIT_AT,new Date().toISOString());
      return NextResponse.json({ action: "exited", reason: "engaged", contactId });
    }

    if (action === "exit_booked") {
      // Contact booked appointment — pull from sequence
      await removeTags(contactId, SEQUENCE_TAGS);
      await addTags(contactId, ["RG_Booked"]);
      await updateCustomField(contactId, RG_FIELDS.FOLLOW_UP_EXIT,"booked");
      await updateCustomField(contactId, RG_FIELDS.FOLLOW_UP_EXIT_AT,new Date().toISOString());
      return NextResponse.json({ action: "exited", reason: "booked", contactId });
    }

    if (action === "exit_opted_out") {
      // Contact opted out — pull from sequence, respect DNC
      await removeTags(contactId, SEQUENCE_TAGS);
      await addTags(contactId, ["RG_Opted_Out"]);
      await updateCustomField(contactId, RG_FIELDS.FOLLOW_UP_EXIT,"opted_out");
      await updateCustomField(contactId, RG_FIELDS.FOLLOW_UP_EXIT_AT,new Date().toISOString());
      return NextResponse.json({ action: "exited", reason: "opted_out", contactId });
    }

    // ── GATE CHECK (default action) ──
    // Validates contact is eligible to enter follow-up sequence

    const rosieStatus = fields[RG_FIELDS.ROSIE_STATUS];

    // HARD GATE: Must be Completed
    if (rosieStatus !== ROSIE_STATUS.COMPLETED) {
      return NextResponse.json({
        action: "blocked",
        reason: `RG_Rosie_Status is "${rosieStatus}", not "Completed"`,
        contactId,
      });
    }

    // Check DNC
    if (hasTag(contact, "dnc") || hasTag(contact, "RG_Opted_Out")) {
      return NextResponse.json({
        action: "blocked",
        reason: "Contact is DNC or opted out",
        contactId,
      });
    }

    // Check if already in sequence (prevent double-entry)
    if (hasTag(contact, "RG_In_Follow_Up")) {
      return NextResponse.json({
        action: "blocked",
        reason: "Contact already in follow-up sequence",
        contactId,
      });
    }

    // Check if already exited a sequence (prevent re-entry)
    const exitReason = fields[RG_FIELDS.FOLLOW_UP_EXIT];
    if (exitReason) {
      return NextResponse.json({
        action: "blocked",
        reason: `Contact previously exited follow-up: ${exitReason}`,
        contactId,
      });
    }

    // ── GATE PASSED: Approve entry into follow-up sequence ──
    await addTags(contactId, ["RG_In_Follow_Up"]);
    await updateCustomField(contactId, RG_FIELDS.FOLLOW_UP_STARTED_AT, new Date().toISOString());

    return NextResponse.json({
      action: "approved",
      contactId,
      rosieStatus,
      rosiePath: fields[RG_FIELDS.ROSIE_PATH],
      message: "Contact approved for follow-up sequence. GHL workflow should proceed.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[RG Follow-Up Error]", message);
    return NextResponse.json(
      { action: "error", error: message },
      { status: 200 }
    );
  }
}
