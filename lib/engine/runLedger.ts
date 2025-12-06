import * as crypto from "crypto";
import { supabase } from "@/lib/supabase";
import { log } from "./logger";

export interface RunStats {
  contactsProcessed: number;
  opportunitiesFound: number;
  alertsSent: number;
}

export async function startRun() {
  const runId = crypto.randomUUID();
  const started_at = new Date().toISOString();
  try {
    const { error } = await supabase.from("rg_run_ledger").insert({
      run_id: runId,
      started_at,
      status: "started",
    });
    if (error) {
      log({ stage: "runLedger:start:error", message: "Failed to insert run", meta: { error, runId } });
    }
  } catch (err: any) {
    log({ stage: "runLedger:start:exception", message: err?.message || "Failed to start run", meta: { runId } });
  }
  return { runId, started_at };
}

export async function completeRun(
  runId: string,
  stats: RunStats,
  status: "success" | "partial" | "failed",
  lastError?: string
) {
  const completed_at = new Date().toISOString();
  try {
    const { error } = await supabase
      .from("rg_run_ledger")
      .update({
        completed_at,
        contacts_processed: stats.contactsProcessed,
        opportunities_found: stats.opportunitiesFound,
        alerts_sent: stats.alertsSent,
        status,
        last_error: lastError ?? null,
      })
      .eq("run_id", runId);
    if (error) {
      log({ stage: "runLedger:complete:error", message: "Failed to update run", meta: { error, runId } });
    }
  } catch (err: any) {
    log({
      stage: "runLedger:complete:exception",
      message: err?.message || "Failed to complete run",
      meta: { runId },
    });
  }
}
