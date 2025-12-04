import fetch from "node-fetch";
import type { ContactRow } from "../../types/supabase";
import type { OpportunityResult } from "./computeOpportunity";
import { supabase } from "../supabase";
import { log } from "./logger";

const MAX_RETRIES = 3;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendWebhook(contact: ContactRow, opportunity: OpportunityResult, runId: string) {
  const url = process.env.GHL_WEBHOOK_URL;
  const apiKey = process.env.GHL_API_KEY;

  if (!url || !apiKey) {
    log({
      stage: "webhook:missing-env",
      message: "Missing GHL webhook configuration",
      contact_id: contact.id,
      meta: { hasUrl: Boolean(url), hasApiKey: Boolean(apiKey) },
    });
    return false;
  }

  const payload = {
    contact_id: contact.id,
    email: contact.email ?? undefined,
    name: contact.name ?? undefined,
    phone: contact.phone ?? undefined,
    rg_source: contact.rg_source ?? undefined,
    rg_oppty_tier: opportunity.opptyTier,
    rg_oppty_score: opportunity.opptyScore,
    estimated_monthly_savings: opportunity.monthlySavings,
    rate_delta_bps: opportunity.rateDeltaBps,
    run_id: runId,
  };

  let attempt = 0;
  let lastError: any = null;

  while (attempt < MAX_RETRIES) {
    attempt += 1;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        log({ stage: "webhook:sent", message: "Webhook delivered", contact_id: contact.id, meta: { attempt } });
        return true;
      }
      lastError = await res.text();
      log({
        stage: "webhook:retry",
        message: "Webhook attempt failed",
        contact_id: contact.id,
        meta: { attempt, status: res.status, body: lastError },
      });
    } catch (err: any) {
      lastError = err?.message || String(err);
      log({ stage: "webhook:retry", message: "Webhook network error", contact_id: contact.id, meta: { attempt, lastError } });
    }
    await sleep(300 * attempt);
  }

  log({ stage: "webhook:failed", message: "Failed to deliver webhook", contact_id: contact.id, meta: { lastError } });

  try {
    await supabase.from("rg_webhook_dead_letter").insert({
      contact_id: contact.id,
      payload,
      attempts: attempt,
      last_error: String(lastError).slice(0, 1000),
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    log({ stage: "webhook:dead-letter:error", message: "Failed to persist webhook failure", contact_id: contact.id, meta: { error } });
  }

  return false;
}
