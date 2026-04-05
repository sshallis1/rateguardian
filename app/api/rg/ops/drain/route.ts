// RG | Ops | Drain Held Leads
// Finds all contacts tagged RG_Outbound_Hold and re-routes them through
// the webhook (with holiday mode OFF) so they get full sequence assignment.
// Run this after turning off holiday mode to release the queue.

import { NextRequest, NextResponse } from "next/server";
import {
  listContacts,
  getContact,
  removeTags,
  hasTag,
} from "@/lib/rg/ghl-client";
import { isHolidayMode, HOLD_TAG } from "@/lib/rg/holiday-mode";
import { routeLead } from "@/lib/rg/router-agent";
import { updateContactFields, addTags } from "@/lib/rg/ghl-client";

function verifyCronSecret(req: NextRequest): boolean {
  const secret = req.headers.get("x-cron-secret") || req.headers.get("authorization");
  const expected = process.env.CRON_SECRET;
  if (!expected) return true;
  return secret === expected || secret === `Bearer ${expected}`;
}

export async function POST(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Safety: don't drain while holiday mode is still on
  if (isHolidayMode()) {
    return NextResponse.json({
      action: "blocked",
      error: "Holiday mode is still ON. Turn it off first: POST /api/rg/ops/holiday { enabled: false }",
    }, { status: 409 });
  }

  const startTime = Date.now();
  const results = {
    scanned: 0,
    drained: 0,
    errors: [] as string[],
  };

  try {
    let cursor: string | undefined;
    let hasMore = true;

    while (hasMore) {
      const batch = await listContacts(100, cursor);
      const contacts = batch.contacts || [];
      if (contacts.length === 0) break;

      for (const summary of contacts) {
        results.scanned++;

        try {
          const contact = await getContact(summary.id);

          if (!hasTag(contact, HOLD_TAG)) continue;

          // Re-route with full sequences (holiday mode is off now)
          const decision = await routeLead(contact);
          await updateContactFields(contact.id, decision);
          await addTags(contact.id, decision.tags);

          // Remove the hold tag
          await removeTags(contact.id, [HOLD_TAG]);

          results.drained++;
          console.log(`[RG Drain] Re-routed ${contact.id} (${contact.firstName} ${contact.lastName}) → ${decision.segment}/${decision.priority}`);
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Unknown";
          results.errors.push(`${summary.id}: ${msg}`);
        }
      }

      cursor = contacts[contacts.length - 1]?.id;
      hasMore = contacts.length >= 100;
    }

    console.log(`[RG Drain] Complete: ${results.drained} leads released, ${results.errors.length} errors`);

    return NextResponse.json({
      action: "drain_complete",
      ...results,
      elapsed: Date.now() - startTime,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[RG Drain Error]", message);
    return NextResponse.json(
      { action: "error", error: message, partial: results },
      { status: 200 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "RG Lead Drain",
    holidayMode: isHolidayMode(),
    hint: "POST to re-route all held leads (RG_Outbound_Hold tag). Holiday mode must be OFF first.",
  });
}
