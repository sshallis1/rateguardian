import * as crypto from "crypto";
import { supabase, isSupabaseConfigured } from "../supabase";
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
  if (!isSupabaseConfigured()) {
    log({ stage: "alerts:config:missing", message: "Supabase not configured", contact_id: contact.id });
    return false;
  }

  const alertDate = todayDateString();

  try {
    const duplicateCheck = await supabase
      .from("rate_alerts")
      .select("id")
      .eq("contact_id", contact.id)
      .eq("alert_date", alertDate)
      .limit(1)
      .maybeSingle();

    if (duplicateCheck.error) {
      throw duplicateCheck.error;
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
      name: contact.name ?? contact.email ?? "Unknown",
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
      .maybeSingle<{
        id: string;
      }>();

    if (alertError) {
      throw alertError;
    }

    const rateAlertId = opportunity.opportunityId ?? alert?.id ?? crypto.randomUUID();
    const { error: rateAlertError } = await supabase.from("rate_alerts").insert({
      contact_id: contact.id,
      opportunity_id: rateAlertId,
      created_at: new Date().toISOString(),
      alert_type: "rate_drop",
      status: "pending",
      alert_date: alertDate,
    });

    if (rateAlertError) {
      throw rateAlertError;
    }

    log({
      stage: "alerts:created",
      message: "Alert created",
      contact_id: contact.id,
      meta: { opportunityTier: opportunity.opptyTier, runId, alertDate, opportunityId: rateAlertId },
    });

    return true;
  } catch (error) {
    log({
      stage: "alerts:error",
      message: "Failed to create alert",
      contact_id: contact.id,
      meta: { error, runId },
    });
    return false;
  }
}
