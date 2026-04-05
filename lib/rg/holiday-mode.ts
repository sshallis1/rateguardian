// Rate Guardian — Holiday Mode
// Simple toggle that holds outbound sequences while still processing leads.
// Leads still get routed (AI analysis + field writes + tags), but outbound
// workflows (calls, SMS, voicemails) are held until mode is deactivated.
//
// Toggle via: POST /api/rg/ops/holiday { "enabled": true/false }
// Or set env var: RG_HOLIDAY_MODE=true
//
// When deactivated, run POST /api/rg/ops/drain to re-route held leads.

// In-memory flag (survives within a single function instance, not across deploys).
// Falls back to env var on cold start.
let holidayModeOverride: boolean | null = null;

export function isHolidayMode(): boolean {
  if (holidayModeOverride !== null) return holidayModeOverride;
  return process.env.RG_HOLIDAY_MODE === "true";
}

export function setHolidayMode(enabled: boolean): void {
  holidayModeOverride = enabled;
}

// Tag applied to contacts routed during holiday mode
export const HOLD_TAG = "RG_Outbound_Hold";
