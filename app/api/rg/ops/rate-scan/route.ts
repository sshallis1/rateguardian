// RG | Ops | Rate Scan | Engine
// The core monitoring engine. Runs on Vercel cron after Apify pushes market rates.
// Scans GHL contacts tagged rate_guardian_monitoring, computes opportunity vs
// today's market rate, writes results back to GHL fields.
// When RG_Eligible_Rate_Today changes → GHL "Rate Drop Alert" workflow fires.

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  listContacts,
  getContact,
  updateCustomFields,
  addTags,
  hasTag,
} from "@/lib/rg/ghl-client";
import { resolveCustomFields, GHL_FIELD_REVERSE } from "@/lib/rg/field-map";
import { RulesEngine, type ClassificationInput } from "@/lib/rg/RulesEngine";
import { isHolidayMode } from "@/lib/rg/holiday-mode";

export const maxDuration = 120; // Pro plan: 2 min for throttled GHL scans

const MAX_BATCH = 50;
const REFI_COST_EST = 3000; // Assumed closing costs for breakeven calc

// Verify cron secret
function verifyCronSecret(req: NextRequest): boolean {
  const secret =
    req.headers.get("x-cron-secret") || req.headers.get("authorization");
  const expected = process.env.CRON_SECRET;
  if (!expected) return true;
  return secret === expected || secret === `Bearer ${expected}`;
}

// Fetch latest market rate from Supabase
async function getLatestMarketRate(): Promise<{
  rate30yr: number;
  scrapedAt: string;
} | null> {
  const { data, error } = await supabase
    .from("market_rates" as any)
    .select("rate_30yr_conventional, scraped_at" as any)
    .order("scraped_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    console.error("[Rate Scan] Failed to fetch market rate:", error);
    return null;
  }

  const row = data as any;
  const rate = parseFloat(row.rate_30yr_conventional);
  if (!Number.isFinite(rate)) return null;

  return { rate30yr: rate, scrapedAt: row.scraped_at };
}

// Fetch thresholds from Supabase (or use defaults)
async function getThresholds(): Promise<{
  version: { id: string; version_name: string };
  thresholds: Record<string, number>;
}> {
  // Try reading from rg_threshold_versions + rg_thresholds
  const { data: versionData } = await supabase
    .from("rg_threshold_versions" as any)
    .select("id, version_name" as any)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (versionData) {
    const version = versionData as any;
    const { data: thresholdRows } = await supabase
      .from("rg_thresholds" as any)
      .select("key, value" as any)
      .eq("version_id", version.id);

    const thresholds: Record<string, number> = {};
    if (thresholdRows) {
      for (const row of thresholdRows as any[]) {
        thresholds[row.key] = Number(row.value);
      }
    }

    return {
      version: { id: version.id, version_name: version.version_name },
      thresholds,
    };
  }

  // Defaults: 50 bps for conventional, 75 for jumbo, 25 for ARMs
  return {
    version: { id: "default", version_name: "default-v1" },
    thresholds: {
      trigger_threshold_30yr: 50,
      trigger_threshold_15yr: 50,
      trigger_threshold_10yr: 50,
      trigger_threshold_30yr_fha: 50,
      trigger_threshold_30yr_va: 50,
      trigger_threshold_jumbo: 75,
      trigger_threshold_5_1_arm: 25,
      trigger_threshold_7_1_arm: 25,
    },
  };
}

// Compute monthly savings from rate delta and loan amount
function computeSavings(
  rateDeltaPct: number,
  loanAmount: number
): { monthly: number; total36mo: number; breakeven: number } {
  // rateDeltaPct is in percentage points (e.g., 0.75 = 75 bps)
  const monthly = Math.max(0, (rateDeltaPct / 100) * loanAmount / 12);
  const total36mo = monthly * 36;
  const breakeven = monthly > 0 ? Math.round(REFI_COST_EST / monthly) : 0;
  return {
    monthly: Math.round(monthly),
    total36mo: Math.round(total36mo),
    breakeven,
  };
}

// Derive opportunity tier from savings
function deriveTier(monthlySavings: number, deltaBps: number): string {
  if (monthlySavings >= 500 || deltaBps >= 100) return "A";
  if (monthlySavings >= 250 || deltaBps >= 75) return "B";
  if (monthlySavings >= 100 || deltaBps >= 50) return "C";
  return "D";
}

export async function POST(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();
  const results = {
    scanned: 0,
    opportunities: 0,
    updated: 0,
    skipped_no_rate: 0,
    skipped_manual_owned: 0,
    skipped_below_threshold: 0,
    errors: [] as string[],
    marketRate: null as number | null,
    rateScrapedAt: null as string | null,
  };

  try {
    if (isHolidayMode()) {
      return NextResponse.json({
        action: "rate_scan_skipped",
        reason: "holiday_mode",
        timestamp: new Date().toISOString(),
      });
    }

    // Step 1: Get today's market rate
    const marketData = await getLatestMarketRate();
    if (!marketData) {
      return NextResponse.json(
        {
          action: "rate_scan_skipped",
          reason: "no_market_rate",
          hint: "Apify scraper may not have run yet — check /api/webhook",
        },
        { status: 200 }
      );
    }

    results.marketRate = marketData.rate30yr;
    results.rateScrapedAt = marketData.scrapedAt;

    // Step 2: Get thresholds
    const { version, thresholds } = await getThresholds();

    // Step 3: Scan GHL contacts
    // Paginate through all contacts — filter for rate_guardian_monitoring tag
    let startAfterId: string | undefined;

    while (results.scanned < MAX_BATCH) {
      const batch = await listContacts(20, startAfterId);
      const contacts = batch.contacts || [];

      if (contacts.length === 0) break;
      startAfterId = contacts[contacts.length - 1]?.id;

      for (const summary of contacts) {
        if (results.scanned >= MAX_BATCH) break;

        // Only process contacts tagged for monitoring
        const tags: string[] = summary.tags || [];
        if (
          !tags.some(
            (t: string) => t.toLowerCase() === "rate_guardian_monitoring"
          )
        ) {
          continue;
        }

        results.scanned++;

        try {
          const contact = await getContact(summary.id);
          const fields = resolveCustomFields(contact.customFields);

          // Skip manually owned contacts (Sean is handling directly)
          if (hasTag(contact, "RG_Manual_Owned")) {
            results.skipped_manual_owned++;
            continue;
          }

          // Get contact's current rate
          const existingRate = parseFloat(fields["RG_Rate_Original"] || "0");
          if (!existingRate || existingRate <= 0) {
            results.skipped_no_rate++;
            continue;
          }

          // Get loan amount (default 350K if missing)
          const loanAmount =
            parseFloat(
              (fields["RG_Loan_Amount"] || "350000").replace(/[$,]/g, "")
            ) || 350000;

          // Get loan product for per-product threshold
          const loanProduct =
            fields["RG_Loan_Product_Normalized"] ||
            fields["RG_Loan_Product_Type"] ||
            "Conv 30Y FIXED";

          // Step 4: Classify using RulesEngine
          const classInput: ClassificationInput = {
            loan: {
              id: contact.id,
              loan_fingerprint: `ghl:${contact.id}`,
              loan_type_raw: loanProduct,
              loan_product_normalized: loanProduct,
              current_rate: existingRate,
              market_rate: marketData.rate30yr,
            },
            thresholdVersion: version,
            thresholds,
          };

          const classification = RulesEngine.classify(classInput);
          const deltaBps = classification.details.delta_bps as number;

          if (!classification.opportunity) {
            results.skipped_below_threshold++;
            continue;
          }

          // Step 5: Compute savings
          const rateDeltaPct = existingRate - marketData.rate30yr;
          const savings = computeSavings(rateDeltaPct, loanAmount);
          const tier = deriveTier(savings.monthly, deltaBps);

          // Step 6: Write results back to GHL
          // Writing RG_Eligible_Rate_Today triggers the Rate Drop Alert workflow
          const fieldUpdates = [
            {
              key: "RG_Eligible_Rate_Today",
              value: marketData.rate30yr.toString(),
            },
            { key: "RG_Todays_Rate", value: marketData.rate30yr.toString() },
            { key: "RG_Rate_Delta_bps", value: deltaBps.toString() },
            {
              key: "RG_Monthly_Savings_Est",
              value: savings.monthly.toString(),
            },
            { key: "RG_Savings", value: savings.total36mo.toString() },
            {
              key: "RG_Breakeven_Months",
              value: savings.breakeven.toString(),
            },
            { key: "RG_Opportunity_Tier", value: tier },
            { key: "RG_Oppty_Tier", value: tier },
            {
              key: "RG_Last_Evaluated",
              value: new Date().toISOString(),
            },
            {
              key: "RG_Last_Run_At",
              value: new Date().toISOString(),
            },
            {
              key: "RG_Savings_Opportunity",
              value: `$${savings.monthly}/mo savings (${deltaBps}bps, ${tier}-tier)`,
            },
          ];

          await updateCustomFields(contact.id, fieldUpdates);

          // Tag for tracking
          await addTags(contact.id, ["RG_Rate_Drop_Alert", `RG_Tier_${tier}`]);

          results.opportunities++;
          results.updated++;

          console.log(
            `[Rate Scan] Opportunity: ${contact.firstName} ${contact.lastName} — ${existingRate}% vs ${marketData.rate30yr}% = ${deltaBps}bps, $${savings.monthly}/mo, Tier ${tier}`
          );
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Unknown";
          results.errors.push(`${summary.id}: ${msg}`);
          if (results.errors.length > 10) break; // Circuit breaker
        }
      }

      if (contacts.length < 20) break; // Last page
    }

    const scanLog = {
      timestamp: new Date().toISOString(),
      ...results,
      elapsed: Date.now() - startTime,
    };
    console.log("[Rate Scan]", JSON.stringify(scanLog));

    return NextResponse.json({
      action: "rate_scan_complete",
      ...results,
      elapsed: Date.now() - startTime,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Rate Scan Error]", message);
    return NextResponse.json(
      { action: "error", error: message, partial: results },
      { status: 200 }
    );
  }
}

// GET for health/status checks
export async function GET() {
  const marketData = await getLatestMarketRate();
  return NextResponse.json({
    service: "RG Rate Scan Engine",
    status: "operational",
    config: {
      batchSize: MAX_BATCH,
      refiCostAssumption: REFI_COST_EST,
    },
    latestMarketRate: marketData
      ? {
          rate30yr: marketData.rate30yr,
          scrapedAt: marketData.scrapedAt,
        }
      : null,
  });
}
