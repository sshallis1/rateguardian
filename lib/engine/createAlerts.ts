import crypto from "crypto";
import { supabase } from "../supabase";
import type { ContactRow } from "../../types/supabase";
import type { OpportunityResult } from "./computeOpportunity";
import { log } from "./logger";

function todayDateString() {
  return new Date().toISOString().slice(0, 10);
}

export async function createAlerts(
  contact: ContactRow,
  opportunity: OpportunityResult,
  runId: string
) {
  const alertDate = todayDateString();
  const duplicateCheck = await supabase
    .from("rate_alerts")
    .select("id")
    .eq("contact_id", contact.id)
    .eq("alert_date", alertDate)
    .limit(1)
    .maybeSingle();

  if (duplicateCheck.error) {
    log({
      stage: "alerts:check:error",
      message: "Failed to check duplicate alerts",
      contact_id: contact.id,
      meta: { error: duplicateCheck.error },
    });
  }

  if (duplicateCheck.data) {
    log({
      stage: "alerts:skip",
      message: "Duplicate alert for today",
      contact_id: contact.id,
      meta: { alertDate },
    });
    return false;
  }

  const alertRecord = {
    contact_id: contact.id,
    name: contact.name,
    loan_type: "refi",
    current_rate: opportunity.existingRate,
    market_rate: opportunity.marketRate,
    delta: opportunity.rateDeltaBps,
    estimated_savings: opportunity.monthlySavings,
    message_type: opportunity.opptyTier,
    inserted_at: new Date().toISOString(),
    alert_sent: false,
    attempts: 0,
  };

  const { data: alert, error: alertError } = await supabase
    .from("alerts")
    .insert(alertRecord)
    .select()
    .maybeSingle();

  if (alertError) {
    log({ stage: "alerts:create:error", message: "Failed to insert alert", contact_id: contact.id, meta: { alertError } });
    return false;
  }

  const { error: rateAlertError } = await supabase.from("rate_alerts").insert({
    contact_id: contact.id,
    opportunity_id: opportunity.opportunityId ?? alert?.id ?? crypto.randomUUID(),
    created_at: new Date().toISOString(),
    alert_type: "rate_drop",
    status: "pending",
    alert_date: alertDate,
  });

  if (rateAlertError) {
    log({
      stage: "alerts:rate_alert:error",
      message: "Failed to insert rate_alert",
      contact_id: contact.id,
      meta: { rateAlertError },
    });
  }

  log({
    stage: "alerts:created",
    message: "Alert created",
    contact_id: contact.id,
    meta: { opportunityTier: opportunity.opptyTier, runId, alertDate },
  });

  return true;
}
