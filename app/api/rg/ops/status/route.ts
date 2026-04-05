// RG | Ops | Dashboard Status
// Single endpoint that returns everything the Command Center UI needs.

import { NextRequest, NextResponse } from "next/server";
import { listContacts, getContact, hasTag } from "@/lib/rg/ghl-client";
import { isHolidayMode, HOLD_TAG } from "@/lib/rg/holiday-mode";

function verifyCronSecret(req: NextRequest): boolean {
  const secret =
    req.headers.get("x-cron-secret") ||
    req.headers.get("authorization") ||
    req.nextUrl.searchParams.get("token");
  const expected = process.env.CRON_SECRET;
  if (!expected) return true;
  return secret === expected || secret === `Bearer ${expected}`;
}

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Count held leads (RG_Outbound_Hold tag)
  let heldCount = 0;
  let totalContacts = 0;
  try {
    let cursor: string | undefined;
    let pages = 0;
    while (pages < 5) {
      const batch = await listContacts(100, cursor);
      const contacts = batch.contacts || [];
      if (contacts.length === 0) break;
      totalContacts += contacts.length;

      for (const summary of contacts) {
        try {
          const contact = await getContact(summary.id);
          if (hasTag(contact, HOLD_TAG)) heldCount++;
        } catch {
          // skip individual contact errors
        }
      }

      cursor = contacts[contacts.length - 1]?.id;
      if (contacts.length < 100) break;
      pages++;
    }
  } catch {
    // partial count is fine
  }

  return NextResponse.json({
    holidayMode: isHolidayMode(),
    heldLeads: heldCount,
    totalContacts,
    timestamp: new Date().toISOString(),
  });
}
