import type { ContactRow } from "../../types/supabase";
import { supabase } from "../supabase";
import { fetchEligibleContacts } from "./fetchContacts";
import { computeOpportunity } from "./computeOpportunity";
import { createAlerts } from "./createAlerts";
import { sendWebhook } from "./sendWebhook";
import { log } from "./logger";
import { completeRun, startRun } from "./runLedger";

export interface EngineOptions {
  limit?: number;
  contactId?: string;
  email?: string;
}

export interface EngineResult {
  run_id: string;
  contacts_processed: number;
  opportunities_found: number;
  alerts_sent: number;
  status: "success" | "partial" | "failed";
  last_error?: string;
}

async function updateContactAfterRun(contact: ContactRow, updates: Record<string, any> = {}) {
  const now = new Date().toISOString();
  const payload = {
    rg_last_run_at: now,
    rg_last_evaluated: now,
    rg_trigger_flag: false,
    ...updates,
  };

  const { error } = await supabase.from("contacts").update(payload).eq("id", contact.id);
  if (error) {
    log({ stage: "engine:contact:update:error", message: "Failed to update contact post run", contact_id: contact.id, meta: { error } });
  }
}

export async function runEngine(options: EngineOptions = {}): Promise<EngineResult> {
  const { runId } = await startRun();
  const stats = {
    contactsProcessed: 0,
    opportunitiesFound: 0,
    alertsSent: 0,
  };
  let status: "success" | "partial" | "failed" = "success";
  let lastError: string | undefined;

  try {
    const contacts = await fetchEligibleContacts(options);
    if (!contacts.length) {
      log({ stage: "engine:no-contacts", message: "No eligible contacts found", meta: options });
    }
    for (const contact of contacts) {
      stats.contactsProcessed += 1;
      try {
        const opportunity = await computeOpportunity(contact);
        if (!opportunity) {
          await updateContactAfterRun(contact);
          continue;
        }

        stats.opportunitiesFound += 1;
        const alertCreated = await createAlerts(contact, opportunity, runId);
        if (alertCreated) {
          stats.alertsSent += 1;
        }
        await sendWebhook(contact, opportunity, runId);

        await updateContactAfterRun(contact, {
          rg_oppty_tier: opportunity.opptyTier,
          rg_oppty_score: opportunity.opptyScore,
          rg_monthly_savings_est: opportunity.monthlySavings,
          rg_savings: opportunity.totalSavings,
          rg_breakeven_months: opportunity.breakevenMonths,
          rg_rate_delta_bps: opportunity.rateDeltaBps,
          rg_eligible_rate_today: opportunity.marketRate,
        });
      } catch (contactErr: any) {
        status = status === "failed" ? "failed" : "partial";
        lastError = contactErr?.message || String(contactErr);
        log({
          stage: "engine:contact:error",
          message: lastError,
          contact_id: contact.id,
        });
      }
    }
  } catch (err: any) {
    status = "failed";
    lastError = err?.message || String(err);
    log({ stage: "engine:run:error", message: lastError, meta: { options } });
  } finally {
    await completeRun(runId, stats, status, lastError);
  }

  return {
    run_id: runId,
    contacts_processed: stats.contactsProcessed,
    opportunities_found: stats.opportunitiesFound,
    alerts_sent: stats.alertsSent,
    status,
    last_error: lastError,
  };
}
