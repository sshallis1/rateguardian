// Project Guardian — Auth helper
// Same token-based auth as RG ops dashboard

import { NextRequest } from "next/server";

export function verifyToken(req: NextRequest): boolean {
  const secret =
    req.headers.get("x-cron-secret") ||
    req.headers.get("authorization") ||
    req.nextUrl.searchParams.get("token");
  const expected = process.env.CRON_SECRET;
  if (!expected) return true;
  return secret === expected || secret === `Bearer ${expected}`;
}
