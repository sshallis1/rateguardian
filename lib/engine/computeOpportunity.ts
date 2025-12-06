import type { Database, ContactRow } from "../../types/supabase";
import { supabase } from "../supabase";
import { log } from "./logger";

export interface OpportunityResult {
  marketRate: number;
  existingRate: number;
  rateDeltaBps: number;
  monthlySavings: number;
  totalSavings: number;
  breakevenMonths: number;
  opptyScore: number;
  opptyTier: string;
  opportunityId?: string;
}

export function getCurrentMarketRate(): number {
  const base = 6.25;
  const variance = (Math.random() - 0.5) * 0.2;
  return Number((base + variance).toFixed(3));
}

function deriveTier(score: number, monthlySavings: number): string {
  if (score >= 80 || monthlySavings >= 500) return "A";
  if (score >= 60 || monthlySavings >= 250) return "B";
  if (score >= 40 || monthlySavings >= 100) return "C";
  return "D";
}

export async function computeOpportunity(contact: ContactRow): Promise<OpportunityResult | null> {
  const marketRate = getCurrentMarketRate();
  const existingRateRaw = Number(contact.rg_existing_rate ?? marketRate + 0.5);
  const existingRate = Number.isFinite(existingRateRaw) ? existingRateRaw : marketRate + 0.5;
  const loanAmountRaw = Number(contact.rg_loan_amount ?? 350000);
  const loanAmount = Number.isFinite(loanAmountRaw) && loanAmountRaw > 0 ? loanAmountRaw : 350000;

  const rateDelta = existingRate - marketRate;
  // Basis points are percentage points * 100; previously multiplied by 10,000 causing 100x inflation.
  const rateDeltaBps = Math.round(rateDelta * 100);
  if (!loanAmount || rateDeltaBps <= 25) {
    log({
      stage: "opportunity:skip",
      message: "Contact not eligible for savings threshold",
      contact_id: contact.id,
      meta: { rateDeltaBps, loanAmount },
    });
    return null;
  }

  const monthlySavings = Math.max(0, (rateDelta / 100) * loanAmount / 12);
  const totalSavings = monthlySavings * 36;
  const breakevenMonths = monthlySavings > 0 ? Math.round(3000 / monthlySavings) : 0;
  const opptyScore = Math.min(100, Math.max(0, Math.round(rateDeltaBps / 10 + monthlySavings / 10)));
  const opptyTier = deriveTier(opptyScore, monthlySavings);

  const payload: Database["public"]["Tables"]["rate_opportunities"]["Insert"] = {
    market_rate: marketRate,
    existing_rate: existingRate,
    rate_delta_bps: rateDeltaBps,
    monthly_savings: Math.round(monthlySavings),
    total_savings: Math.round(totalSavings),
    breakeven_months: breakevenMonths,
    oppty_score: opptyScore,
    oppty_tier: opptyTier,
    contact_id: contact.id,
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from("rate_opportunities")
      .upsert(payload, { onConflict: "contact_id" })
      .select()
      .maybeSingle<Database["public"]["Tables"]["rate_opportunities"]["Row"]>();

    if (error) {
      throw error;
    }

    log({ stage: "opportunity:computed", message: "Computed opportunity", contact_id: contact.id, meta: payload });
    const opportunityId = data ? data.id : undefined;
    return {
      marketRate,
      existingRate,
      rateDeltaBps,
      monthlySavings: payload.monthly_savings ?? 0,
      totalSavings: payload.total_savings ?? 0,
      breakevenMonths,
      opptyScore,
      opptyTier,
      opportunityId,
    };
  } catch (error) {
    log({ stage: "opportunity:save:error", message: "Failed to upsert opportunity", contact_id: contact.id, meta: { error } });
    return null;
  }
}
