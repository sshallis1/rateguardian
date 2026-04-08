// Rate Guardian — State → IANA Timezone Resolver
// Used by the lead webhook to stamp every new GHL contact with the correct
// timezone so "Wait until business hours" steps fire at the right local time.
//
// Source of truth: engaged-nurture/timezone-map.json (kept inline for zero-io).
// Multi-zone states default to the most populated zone; city-based exceptions
// override when present.

export type IanaTz =
  | "America/New_York"
  | "America/Chicago"
  | "America/Denver"
  | "America/Phoenix"
  | "America/Los_Angeles"
  | "America/Anchorage"
  | "America/Boise"
  | "America/Detroit"
  | "America/Indiana/Indianapolis"
  | "Pacific/Honolulu";

export const DEFAULT_TZ: IanaTz = "America/New_York";

// Single-zone states — authoritative
const SINGLE_ZONE: Record<string, IanaTz> = {
  AL: "America/Chicago", AR: "America/Chicago", AZ: "America/Phoenix",
  CA: "America/Los_Angeles", CO: "America/Denver", CT: "America/New_York",
  DE: "America/New_York", DC: "America/New_York", GA: "America/New_York",
  HI: "Pacific/Honolulu", IA: "America/Chicago", IL: "America/Chicago",
  LA: "America/Chicago", MA: "America/New_York", MD: "America/New_York",
  ME: "America/New_York", MN: "America/Chicago", MO: "America/Chicago",
  MS: "America/Chicago", MT: "America/Denver", NC: "America/New_York",
  NH: "America/New_York", NJ: "America/New_York", NM: "America/Denver",
  NV: "America/Los_Angeles", NY: "America/New_York", OH: "America/New_York",
  OK: "America/Chicago", PA: "America/New_York", RI: "America/New_York",
  SC: "America/New_York", UT: "America/Denver", VA: "America/New_York",
  VT: "America/New_York", WA: "America/Los_Angeles", WI: "America/Chicago",
  WV: "America/New_York", WY: "America/Denver",
};

// Multi-zone states — default to most-populated zone; city exceptions below
const MULTI_ZONE_DEFAULTS: Record<string, IanaTz> = {
  AK: "America/Anchorage",
  FL: "America/New_York",
  ID: "America/Boise",
  IN: "America/Indiana/Indianapolis",
  KS: "America/Chicago",
  KY: "America/New_York",
  MI: "America/Detroit",
  ND: "America/Chicago",
  NE: "America/Chicago",
  OR: "America/Los_Angeles",
  SD: "America/Chicago",
  TN: "America/Chicago",
  TX: "America/Chicago",
};

// City overrides for multi-zone states — normalized lowercased match
const CITY_EXCEPTIONS: Array<{
  state: string;
  tz: IanaTz;
  cities: string[];
}> = [
  { state: "FL", tz: "America/Chicago", cities: ["pensacola", "panama city", "destin", "fort walton beach"] },
  { state: "TX", tz: "America/Denver", cities: ["el paso"] },
  { state: "TN", tz: "America/New_York", cities: ["knoxville", "chattanooga", "johnson city", "kingsport"] },
  { state: "KY", tz: "America/Chicago", cities: ["paducah", "bowling green", "owensboro"] },
  { state: "IN", tz: "America/Chicago", cities: ["gary", "hammond", "merrillville"] },
];

function normalizeState(state: string | null | undefined): string | null {
  if (!state) return null;
  const s = state.trim().toUpperCase();
  if (s.length === 2) return s;
  // Full-name fallback for the few we're likely to see
  const FULL: Record<string, string> = {
    "ALABAMA": "AL", "ALASKA": "AK", "ARIZONA": "AZ", "ARKANSAS": "AR",
    "CALIFORNIA": "CA", "COLORADO": "CO", "CONNECTICUT": "CT", "DELAWARE": "DE",
    "FLORIDA": "FL", "GEORGIA": "GA", "HAWAII": "HI", "IDAHO": "ID",
    "ILLINOIS": "IL", "INDIANA": "IN", "IOWA": "IA", "KANSAS": "KS",
    "KENTUCKY": "KY", "LOUISIANA": "LA", "MAINE": "ME", "MARYLAND": "MD",
    "MASSACHUSETTS": "MA", "MICHIGAN": "MI", "MINNESOTA": "MN", "MISSISSIPPI": "MS",
    "MISSOURI": "MO", "MONTANA": "MT", "NEBRASKA": "NE", "NEVADA": "NV",
    "NEW HAMPSHIRE": "NH", "NEW JERSEY": "NJ", "NEW MEXICO": "NM", "NEW YORK": "NY",
    "NORTH CAROLINA": "NC", "NORTH DAKOTA": "ND", "OHIO": "OH", "OKLAHOMA": "OK",
    "OREGON": "OR", "PENNSYLVANIA": "PA", "RHODE ISLAND": "RI", "SOUTH CAROLINA": "SC",
    "SOUTH DAKOTA": "SD", "TENNESSEE": "TN", "TEXAS": "TX", "UTAH": "UT",
    "VERMONT": "VT", "VIRGINIA": "VA", "WASHINGTON": "WA", "WEST VIRGINIA": "WV",
    "WISCONSIN": "WI", "WYOMING": "WY", "DISTRICT OF COLUMBIA": "DC",
  };
  return FULL[s] ?? null;
}

/**
 * Resolve a US state (and optional city) to an IANA timezone.
 * Falls back to DEFAULT_TZ ("America/New_York") when state is missing/invalid.
 */
export function resolveTimezone(
  state: string | null | undefined,
  city?: string | null
): IanaTz {
  const code = normalizeState(state);
  if (!code) return DEFAULT_TZ;

  // City overrides first
  if (city) {
    const c = city.trim().toLowerCase();
    const override = CITY_EXCEPTIONS.find(
      (x) => x.state === code && x.cities.some((ex) => c.includes(ex))
    );
    if (override) return override.tz;
  }

  return SINGLE_ZONE[code] ?? MULTI_ZONE_DEFAULTS[code] ?? DEFAULT_TZ;
}
