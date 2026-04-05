// RG | Ops | Engine Heartbeat Ingest | Schedule
// Scheduler backbone. Runs on schedule (Vercel Cron or GHL trigger).
// Scans contacts due for re-evaluation and triggers the Master Dispatcher.
// Batch safety: max 50 contacts per run.

import { NextRequest, NextResponse } from "next/server";
import {
  listContacts,
  getContact,
  triggerWorkflow,
  updateCustomField,
  hasTag,
} from "@/lib/rg/ghl-client";
import { RG_FIELDS, ROSIE_STATUS } from "@/lib/rg/types";
import { resolveCustomFields } from "@/lib/rg/field-map";
import { isHolidayMode } from "@/lib/rg/holiday-mode";

const MAX_BATCH = 50;
const RE_EVAL_DAYS = 7;
const REENGAGE_DAYS = 90; // Long-term nurture, past clients, COIs
const MASTER_DISPATCHER_WF_ID = process.env.GHL_WF_MASTER_DISPATCHER || "";

// Verify cron secret to prevent unauthorized triggers
function verifyCronSecret(req: NextRequest): boolean {
  const secret = req.headers.get("x-cron-secret") || req.headers.get("authorization");
  const expected = process.env.CRON_SECRET;
  if (!expected) return true; // No secret configured = allow (dev mode)
  return secret === expected || secret === `Bearer ${expected}`;
}

export async function POST(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();
  const results = {
    scanned: 0,
    triggered: 0,
    reengaged: 0,
    skipped_in_progress: 0,
    skipped_not_due: 0,
    skipped_holiday: false,
    errors: [] as string[],
  };

  try {
    // Holiday mode: skip re-engagement triggers (leads still accumulate for drain)
    if (isHolidayMode()) {
      console.log("[RG Heartbeat] Skipped — holiday mode active");
      return NextResponse.json({
        action: "heartbeat_skipped",
        reason: "holiday_mode",
        timestamp: new Date().toISOString(),
      });
    }

    if (!MASTER_DISPATCHER_WF_ID) {
      return NextResponse.json({
        action: "error",
        error: "GHL_WF_MASTER_DISPATCHER not configured",
      }, { status: 500 });
    }

    const now = Date.now();
    const reEvalThreshold = now - RE_EVAL_DAYS * 24 * 60 * 60 * 1000;
    let cursor: string | undefined;
    let processed = 0;

    // Paginate through contacts until batch limit
    while (processed < MAX_BATCH) {
      const batch = await listContacts(100, cursor);
      const contacts = batch.contacts || [];

      if (contacts.length === 0) break;

      for (const summary of contacts) {
        if (processed >= MAX_BATCH) break;
        results.scanned++;

        try {
          const contact = await getContact(summary.id);
          const fields = resolveCustomFields(
            contact.customFields
          );

          const status = fields[RG_FIELDS.ROSIE_STATUS];
          const lastEvaluated = fields[RG_FIELDS.LAST_EVALUATED];

          // SAFETY: Never re-trigger In Progress contacts
          if (status === ROSIE_STATUS.IN_PROGRESS) {
            results.skipped_in_progress++;
            continue;
          }

          // 90-day re-engagement: long-term nurture, past clients, COIs
          // These contacts exited active sequences but stay in the database for periodic outreach.
          const isNurtureContact =
            hasTag(contact, "RG_Long_Term_Nurture") ||
            hasTag(contact, "RG_Lost_Opportunity") ||
            fields[RG_FIELDS.LEAD_SOURCE] === "Funded_Client" ||
            fields[RG_FIELDS.LEAD_SOURCE] === "Funded_Referral" ||
            fields[RG_FIELDS.LEAD_SOURCE] === "Center_Of_Influence";

          const dispositionAt = fields[RG_FIELDS.DISPOSITION_AT];
          const reengageThreshold = now - REENGAGE_DAYS * 24 * 60 * 60 * 1000;

          if (isNurtureContact && status === ROSIE_STATUS.COMPLETED) {
            // Use disposition timestamp (last interaction) or last evaluated, whichever is newer
            const lastTouch = dispositionAt
              ? Math.max(new Date(dispositionAt).getTime(), new Date(lastEvaluated || 0).getTime())
              : new Date(lastEvaluated || 0).getTime();

            if (!isNaN(lastTouch) && lastTouch < reengageThreshold) {
              // Due for 90-day re-engagement — trigger dispatcher to re-route
              await triggerWorkflow(MASTER_DISPATCHER_WF_ID, contact.id);
              await updateCustomField(contact.id, RG_FIELDS.LAST_RUN_AT, new Date().toISOString());
              results.reengaged++;
              processed++;
              continue;
            }
          }

          // Only re-evaluate Completed contacts past the 7-day threshold
          if (status !== ROSIE_STATUS.COMPLETED) continue;
          if (!lastEvaluated) continue;

          const evalDate = new Date(lastEvaluated).getTime();
          if (isNaN(evalDate) || evalDate > reEvalThreshold) {
            results.skipped_not_due++;
            continue;
          }

          // Trigger the Master Dispatcher for re-evaluation
          await triggerWorkflow(MASTER_DISPATCHER_WF_ID, contact.id);
          await updateCustomField(contact.id, RG_FIELDS.LAST_RUN_AT, new Date().toISOString());

          results.triggered++;
          processed++;
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Unknown";
          results.errors.push(`${summary.id}: ${msg}`);
        }
      }

      // Get next page cursor
      cursor = contacts[contacts.length - 1]?.id;
      if (contacts.length < 100) break; // Last page
    }

    // Log heartbeat run timestamp
    // We use a dummy contact note approach — alternatively store in Edge Config
    const heartbeatLog = {
      timestamp: new Date().toISOString(),
      ...results,
      elapsed: Date.now() - startTime,
    };

    console.log("[RG Heartbeat]", JSON.stringify(heartbeatLog));

    return NextResponse.json({
      action: "heartbeat_complete",
      ...results,
      elapsed: Date.now() - startTime,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[RG Heartbeat Error]", message);
    return NextResponse.json(
      { action: "error", error: message, partial: results },
      { status: 200 }
    );
  }
}

// GET for health checks
export async function GET() {
  return NextResponse.json({
    service: "RG Heartbeat Scheduler",
    status: "operational",
    config: {
      batchSize: MAX_BATCH,
      reEvalDays: RE_EVAL_DAYS,
      reengageDays: REENGAGE_DAYS,
      dispatcherConfigured: !!MASTER_DISPATCHER_WF_ID,
    },
  });
}
