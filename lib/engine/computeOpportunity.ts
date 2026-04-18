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

// Fetch the latest 30yr conventional rate from Supabase market_rates table.
// Falls back to a hardcoded rate ONLY if no scraped data exists yet.
let _cachedRate: { rate: number; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 min cache

export async function getCurrentMarketRate(): Promise<number> {
  // Return cached if fresh
  if (_cachedRate && Date.now() - _cachedRate.fetchedAt < CACHE_TTL_MS) {
    return _cachedRate.rate;
  }

  try {
    const { data, error } = await supabase
      .from("market_rates" as any)
      .select("rate_30yr_conventional" as any)
      .order("scraped_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      const rate = parseFloat((data as any).rate_30yr_conventional);
      if (Number.isFinite(rate) && rate > 0) {
        _cachedRate = { rate, fetchedAt: Date.now() };
        return rate;
      }
    }
  } catch (err) {
    log({ stage: "market-rate:error", message: "Failed to fetch market rate from Supabase", meta: { error: err } });
  }

  // Fallback: last known rate or a conservative default
  log({ stage: "market-rate:fallback", message: "Using fallback market rate — no scraped data available" });
  return _cachedRate?.rate ?? 6.75;
}

function deriveTier(score: number, monthlySavings: number): string {
  if (score >= 80 || monthlySavings >= 500) return "A";
  if (score >= 60 || monthlySavings >= 250) return "B";
  if (score >= 40 || monthlySavings >= 100) return "C";
  return "D";
}

export async function computeOpportunity(contact: ContactRow): Promise<OpportunityResult | null> {
  const marketRate = await getCurrentMarketRate();
  const existingRateRaw = Number(contact.rg_existing_rate ?? marketRate + 0.5);
  const existingRate = Number.isFinite(existingRateRaw) ? existingRateRaw : marketRate + 0.5;
  const loanAmountRaw = Number(contact.rg_loan_amount ?? 350000);
  const loanAmount = Number.isFinite(loanAmountRaw) && loanAmountRaw > 0 ? loanAmountRaw : 350000;

  const rateDelta = existingRate - marketRate;
  // Rates are stored as percentage points (e.g. 6.25), not decimals (0.0625)
  // 1 percentage point = 100 basis points, so multiply by 100
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
