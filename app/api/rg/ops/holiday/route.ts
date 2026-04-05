// RG | Ops | Holiday Mode Toggle
// POST: { "enabled": true } → activates holiday mode (holds outbound)
// POST: { "enabled": false } → deactivates holiday mode
// GET: returns current holiday mode status

import { NextRequest, NextResponse } from "next/server";
import { isHolidayMode, setHolidayMode } from "@/lib/rg/holiday-mode";

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

  const body = await req.json();
  const enabled = body.enabled === true;

  setHolidayMode(enabled);

  console.log(`[RG Holiday Mode] ${enabled ? "ACTIVATED" : "DEACTIVATED"} at ${new Date().toISOString()}`);

  return NextResponse.json({
    holidayMode: enabled,
    message: enabled
      ? "Holiday mode ON — leads will be routed but outbound sequences are held. Run POST /api/rg/ops/drain when ready to release."
      : "Holiday mode OFF — normal operations resumed. Run POST /api/rg/ops/drain to release any held leads.",
    timestamp: new Date().toISOString(),
  });
}

export async function GET() {
  return NextResponse.json({
    service: "RG Holiday Mode",
    holidayMode: isHolidayMode(),
    source: isHolidayMode() ? "active" : "inactive",
    hint: "POST with { enabled: true/false } to toggle. Requires CRON_SECRET auth.",
  });
}
