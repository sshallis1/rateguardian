// Project Guardian — Dual Auth helper
// Tries Clerk JWT first, falls back to CRON_SECRET token

import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

export interface PGAuthResult {
  authenticated: boolean;
  userId: string | null;
  method: "clerk" | "token" | "dev";
}

export async function authenticatePG(req: NextRequest): Promise<PGAuthResult> {
  // 1. Try Clerk JWT (from session cookie or Bearer token)
  try {
    const { userId } = await auth();
    if (userId) {
      return { authenticated: true, userId, method: "clerk" };
    }
  } catch {
    // Clerk auth not available — continue to token check
  }

  // 2. Fall back to CRON_SECRET token (backward compat)
  if (verifyToken(req)) {
    return { authenticated: true, userId: null, method: "token" };
  }

  return { authenticated: false, userId: null, method: "token" };
}

export function verifyToken(req: NextRequest): boolean {
  const secret =
    req.headers.get("x-cron-secret") ||
    req.headers.get("authorization") ||
    req.nextUrl.searchParams.get("token");
  const expected = process.env.CRON_SECRET;
  if (!expected) return true;
  return secret === expected || secret === `Bearer ${expected}`;
}
