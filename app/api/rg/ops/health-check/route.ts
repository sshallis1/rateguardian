// RG | Ops | Engine Health Check Monitor | Schedule
// Detects stuck or stale records that indicate engine failures or silent exits.
// Stuck = In Progress for >2 hours. Stale = Needs Data for >14 days.

import { NextRequest, NextResponse } from "next/server";
import {
  listContacts,
  getContact,
  addTags,
  updateCustomField,
  hasTag,
} from "@/lib/rg/ghl-client";
import { RG_FIELDS, ROSIE_STATUS } from "@/lib/rg/types";
import { resolveCustomFields } from "@/lib/rg/field-map";

const STUCK_THRESHOLD_MS = 2 * 60 * 60 * 1000; // 2 hours
const STALE_THRESHOLD_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

const OPS_NOTIFY_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/rg/ops/notify`
  : "http://localhost:3000/api/rg/ops/notify";

function verifyCronSecret(req: NextRequest): boolean {
  const secret = req.headers.get("x-cron-secret") || req.headers.get("authorization");
  const expected = process.env.CRON_SECRET;
  if (!expected) return true;
  return secret === expected || secret === `Bearer ${expected}`;
}

async function notifyOps(contactId: string, source: string, context: string) {
  try {
    await fetch(OPS_NOTIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactId, source, context }),
    });
  } catch (err) {
    console.error("[Health Check] Failed to notify ops:", err);
  }
}

export async function POST(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();
  const now = Date.now();
  const results = {
    scanned: 0,
    stuck: 0,
    stale: 0,
    already_tagged: 0,
    errors: [] as string[],
  };

  try {
    let cursor: string | undefined;
    let hasMore = true;

    while (hasMore) {
      const batch = await listContacts(20, cursor);
      const contacts = batch.contacts || [];

      if (contacts.length === 0) break;

      for (const summary of contacts) {
        results.scanned++;

        try {
          const contact = await getContact(summary.id);
          const fields = resolveCustomFields(
            contact.customFields
          );

          const status = fields[RG_FIELDS.ROSIE_STATUS];
          const lastRunAt = fields[RG_FIELDS.LAST_RUN_AT];
          const lastEvaluated = fields[RG_FIELDS.LAST_EVALUATED];

          // ── STUCK DETECTION ──
          // In Progress for >2 hours = likely engine failure
          if (status === ROSIE_STATUS.IN_PROGRESS && lastRunAt) {
            const runTime = new Date(lastRunAt).getTime();
            if (!isNaN(runTime) && (now - runTime) > STUCK_THRESHOLD_MS) {
              // Don't re-tag if already tagged
              if (!hasTag(contact, "RG_Stuck_Record")) {
                await addTags(contact.id, ["RG_Stuck_Record"]);
                await notifyOps(
                  contact.id,
                  "health_check",
                  `STUCK: In Progress for ${Math.round((now - runTime) / 3600000)}h (threshold: 2h). Last run: ${lastRunAt}`
                );
                results.stuck++;
              } else {
                results.already_tagged++;
              }
            }
          }

          // ── STALE DETECTION ──
          // Needs Data for >14 days = abandoned/forgotten
          if (status === ROSIE_STATUS.NEEDS_DATA && lastEvaluated) {
            const evalTime = new Date(lastEvaluated).getTime();
            if (!isNaN(evalTime) && (now - evalTime) > STALE_THRESHOLD_MS) {
              if (!hasTag(contact, "RG_Stale_Needs_Data")) {
                await addTags(contact.id, ["RG_Stale_Needs_Data"]);
                await notifyOps(
                  contact.id,
                  "health_check",
                  `STALE: Needs Data for ${Math.round((now - evalTime) / 86400000)} days (threshold: 14d). Last evaluated: ${lastEvaluated}`
                );
                results.stale++;
              } else {
                results.already_tagged++;
              }
            }
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Unknown";
          results.errors.push(`${summary.id}: ${msg}`);
        }
      }

      cursor = contacts[contacts.length - 1]?.id;
      hasMore = contacts.length >= 20;
    }

    const healthLog = {
      timestamp: new Date().toISOString(),
      ...results,
      elapsed: Date.now() - startTime,
    };

    console.log("[RG Health Check]", JSON.stringify(healthLog));

    return NextResponse.json({
      action: "health_check_complete",
      ...results,
      elapsed: Date.now() - startTime,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[RG Health Check Error]", message);
    return NextResponse.json(
      { action: "error", error: message, partial: results },
      { status: 200 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "RG Health Check Monitor",
    status: "operational",
    config: {
      stuckThresholdHours: STUCK_THRESHOLD_MS / 3600000,
      staleThresholdDays: STALE_THRESHOLD_MS / 86400000,
    },
  });
}
