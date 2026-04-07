// RG | Egress | Call Window Check
// Authoritative gate for outbound communication timing.
// Every GHL call/SMS/voicemail step MUST POST here BEFORE firing.
//
// Rule: a touch is allowed only when the current time is inside 8am–8pm
//       in BOTH the operator timezone (Sean / America/New_York) AND the
//       contact's local timezone. Federal-holiday respect via holiday-mode.
//
// Request:  { contactId, contactTimezone?, action? }
//   - contactTimezone: IANA TZ from GHL contact (e.g., "America/Los_Angeles").
//     If omitted, falls back to OPERATOR_TZ (safest assumption).
//
// Response: { allowed: true } OR { allowed: false, reason, defer_until_iso }
//   - defer_until_iso: ISO timestamp of next moment the dual window opens.
//     GHL Wait step should wait until this exact time.

import { NextRequest, NextResponse } from "next/server";
import { getContact, hasTag } from "@/lib/rg/ghl-client";
import {
  MANUAL_OWNED_TAG,
  OPERATOR_TZ,
  CALL_WINDOW_START_HOUR,
  CALL_WINDOW_END_HOUR,
} from "@/lib/rg/types";
import { isHolidayMode } from "@/lib/rg/holiday-mode";

// Get the hour-of-day (0-23) for a given Date in a given IANA timezone
function hourInTz(date: Date, tz: string): number {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    hour12: false,
  });
  // "23" or "0" — Intl returns hour as a string
  const part = fmt.formatToParts(date).find((p) => p.type === "hour");
  return part ? parseInt(part.value, 10) % 24 : 0;
}

// Get the day-of-week (0=Sun..6=Sat) for a given Date in a given IANA timezone
function dayOfWeekInTz(date: Date, tz: string): number {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
  });
  const map: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  return map[fmt.format(date)] ?? 0;
}

function isInWindow(date: Date, tz: string): boolean {
  const dow = dayOfWeekInTz(date, tz);
  if (dow === 0 || dow === 6) return false; // weekends off
  const hr = hourInTz(date, tz);
  return hr >= CALL_WINDOW_START_HOUR && hr < CALL_WINDOW_END_HOUR;
}

// Walk forward in 15-minute increments until both windows are simultaneously open.
// Cap at 7 days to prevent infinite loops on bad TZ inputs.
function nextDualWindowOpen(start: Date, contactTz: string): Date {
  const STEP_MS = 15 * 60 * 1000;
  const MAX_STEPS = (7 * 24 * 60) / 15;
  let cursor = new Date(start.getTime());
  for (let i = 0; i < MAX_STEPS; i++) {
    if (isInWindow(cursor, OPERATOR_TZ) && isInWindow(cursor, contactTz)) {
      return cursor;
    }
    cursor = new Date(cursor.getTime() + STEP_MS);
  }
  return cursor;
}

export async function POST(req: NextRequest) {
  try {
    const { contactId, contactTimezone } = (await req.json()) as {
      contactId: string;
      contactTimezone?: string;
      action?: string;
    };

    if (!contactId) {
      return NextResponse.json({ error: "contactId required" }, { status: 400 });
    }

    // Holiday mode → block everything
    if (isHolidayMode()) {
      return NextResponse.json({
        allowed: false,
        reason: "holiday_mode_active",
        defer_until_iso: null,
        message: "Outbound holiday mode is active. No automated calls until released.",
      });
    }

    // Manual ownership → block
    const contact = await getContact(contactId);
    if (hasTag(contact, MANUAL_OWNED_TAG)) {
      return NextResponse.json({
        allowed: false,
        reason: "manual_owned",
        defer_until_iso: null,
        message: "Contact is manually owned by Sean. No automation.",
      });
    }

    // DNC / opted out → block
    if (hasTag(contact, "dnc") || hasTag(contact, "RG_Opted_Out")) {
      return NextResponse.json({
        allowed: false,
        reason: "dnc_or_opted_out",
        defer_until_iso: null,
      });
    }

    // Resolve contact timezone — fall back to operator TZ if missing/invalid
    let tz = contactTimezone || OPERATOR_TZ;
    try {
      // Validate IANA TZ — throws RangeError if bad
      new Intl.DateTimeFormat("en-US", { timeZone: tz });
    } catch {
      tz = OPERATOR_TZ;
    }

    const now = new Date();
    const operatorOk = isInWindow(now, OPERATOR_TZ);
    const contactOk = isInWindow(now, tz);

    if (operatorOk && contactOk) {
      return NextResponse.json({
        allowed: true,
        contactId,
        operator_tz: OPERATOR_TZ,
        contact_tz: tz,
        operator_hour: hourInTz(now, OPERATOR_TZ),
        contact_hour: hourInTz(now, tz),
      });
    }

    const deferUntil = nextDualWindowOpen(now, tz);
    return NextResponse.json({
      allowed: false,
      reason: !operatorOk && !contactOk
        ? "outside_both_windows"
        : !operatorOk
        ? "outside_operator_window"
        : "outside_contact_window",
      defer_until_iso: deferUntil.toISOString(),
      contactId,
      operator_tz: OPERATOR_TZ,
      contact_tz: tz,
      operator_hour: hourInTz(now, OPERATOR_TZ),
      contact_hour: hourInTz(now, tz),
      window: `${CALL_WINDOW_START_HOUR}:00 - ${CALL_WINDOW_END_HOUR}:00 weekdays, both zones`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[RG Call Window Check Error]", message);
    // Fail CLOSED — if we can't verify, don't fire.
    return NextResponse.json(
      { allowed: false, reason: "error", error: message },
      { status: 200 }
    );
  }
}
