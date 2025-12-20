"use strict";

/**
 * Canonical loan products supported by the Rate Guardian engine.
 * The names must remain stable so downstream systems can map dispositions
 * and alerts without ambiguity.
 */
const CANONICAL_PRODUCTS = [
  "Conventional 10-Year Fixed",
  "Conventional 15-Year Fixed",
  "Conventional 20-Year Fixed",
  "Conventional 30-Year Fixed",
  "Jumbo 30-Year Fixed",
  "Conforming ARM 10/6",
  "Conforming ARM 7/6",
  "Jumbo ARM 10/1",
  "Jumbo ARM 7/1",
  "Jumbo ARM 5/1",
  "FHA 30-Year Fixed",
  "VA 30-Year Fixed",
  "USDA 30-Year Fixed",
  "Construction-to-Permanent",
];

const DEFAULT_BENCHMARK_RATE = 6.25;

/**
 * High-level rules per product.
 *  - opportunityBps: minimum spread (existing - market) required to surface an Opportunity alert.
 *  - neutralFloorBps: spreads below this value should stay quiet.
 *  - warningBps: negative spread (market materially higher) that should raise a cautionary Warning.
 *  - armAdjustmentWarningDays: ARM-only window to surface warnings ahead of a reset.
 */
const PRODUCT_LOGIC_MAP = {
  "Conventional 10-Year Fixed": {
    kind: "fixed",
    termYears: 10,
    opportunityBps: 60,
    neutralFloorBps: 20,
    warningBps: -65,
    benchmarkRate: 6.05,
    notes: "Short amortization fixed; fast amortization favors tighter thresholds.",
  },
  "Conventional 15-Year Fixed": {
    kind: "fixed",
    termYears: 15,
    opportunityBps: 55,
    neutralFloorBps: 20,
    warningBps: -65,
    benchmarkRate: 6.1,
    notes: "Mid-term fixed conventional product.",
  },
  "Conventional 20-Year Fixed": {
    kind: "fixed",
    termYears: 20,
    opportunityBps: 60,
    neutralFloorBps: 20,
    warningBps: -70,
    benchmarkRate: 6.2,
    notes: "Balanced term; aligns with conventional conforming pricing.",
  },
  "Conventional 30-Year Fixed": {
    kind: "fixed",
    termYears: 30,
    opportunityBps: 75,
    neutralFloorBps: 25,
    warningBps: -75,
    benchmarkRate: 6.35,
    notes: "Flagship product; requires larger spread for alerts to reduce noise.",
  },
  "Jumbo 30-Year Fixed": {
    kind: "fixed",
    termYears: 30,
    opportunityBps: 90,
    neutralFloorBps: 35,
    warningBps: -80,
    benchmarkRate: 6.55,
    notes: "Higher balance; tighter pricing and overlays merit higher trigger.",
  },
  "Conforming ARM 10/6": {
    kind: "arm",
    termYears: 30,
    armStructure: "10/6",
    opportunityBps: 65,
    neutralFloorBps: 25,
    warningBps: -60,
    armAdjustmentWarningDays: 180,
    benchmarkRate: 6.05,
    notes: "Conforming ARM with 10-year fixed period; adjusts every 6 months after year 10.",
  },
  "Conforming ARM 7/6": {
    kind: "arm",
    termYears: 30,
    armStructure: "7/6",
    opportunityBps: 65,
    neutralFloorBps: 25,
    warningBps: -60,
    armAdjustmentWarningDays: 150,
    benchmarkRate: 6.0,
    notes: "7-year fixed period, semi-annual adjustments thereafter.",
  },
  "Jumbo ARM 10/1": {
    kind: "arm",
    termYears: 30,
    armStructure: "10/1",
    opportunityBps: 70,
    neutralFloorBps: 30,
    warningBps: -65,
    armAdjustmentWarningDays: 180,
    benchmarkRate: 6.3,
    notes: "Jumbo ARM; annual adjustment cadence after year 10.",
  },
  "Jumbo ARM 7/1": {
    kind: "arm",
    termYears: 30,
    armStructure: "7/1",
    opportunityBps: 70,
    neutralFloorBps: 30,
    warningBps: -65,
    armAdjustmentWarningDays: 150,
    benchmarkRate: 6.25,
    notes: "Jumbo ARM with 7-year fixed period and annual adjustments.",
  },
  "Jumbo ARM 5/1": {
    kind: "arm",
    termYears: 30,
    armStructure: "5/1",
    opportunityBps: 75,
    neutralFloorBps: 30,
    warningBps: -70,
    armAdjustmentWarningDays: 120,
    benchmarkRate: 6.4,
    notes: "Aggressive jumbo ARM; short fixed window demands early warnings.",
  },
  "FHA 30-Year Fixed": {
    kind: "fixed",
    termYears: 30,
    opportunityBps: 60,
    neutralFloorBps: 25,
    warningBps: -70,
    benchmarkRate: 6.2,
    notes: "Government-backed; MI savings can stack with rate improvements.",
  },
  "VA 30-Year Fixed": {
    kind: "fixed",
    termYears: 30,
    opportunityBps: 55,
    neutralFloorBps: 20,
    warningBps: -65,
    benchmarkRate: 6.15,
    notes: "VA pricing can be aggressive; lower trigger to capture savings.",
  },
  "USDA 30-Year Fixed": {
    kind: "fixed",
    termYears: 30,
    opportunityBps: 60,
    neutralFloorBps: 20,
    warningBps: -70,
    benchmarkRate: 6.25,
    notes: "USDA fixed rate with guarantee fee considerations.",
  },
  "Construction-to-Permanent": {
    kind: "construction",
    termYears: 30,
    opportunityBps: 95,
    neutralFloorBps: 35,
    warningBps: -75,
    benchmarkRate: 6.75,
    notes: "Two-phase loan; higher trigger to avoid churn during build stage.",
  },
};

function coerceRate(value, fallback) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function daysUntil(dateInput, today) {
  if (!dateInput) return null;
  const target = new Date(dateInput);
  if (Number.isNaN(target.getTime())) return null;
  const base = today ? new Date(today) : new Date();
  const diffMs = target.getTime() - base.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Evaluate a loan against the canonical product rules to return a disposition.
 * @param {object} loan
 * @param {string} loan.productName
 * @param {number} loan.existingRate
 * @param {number} [loan.marketRate]
 * @param {string|Date} [loan.armAdjustmentDate]
 * @param {string|Date} [loan.today]
 */
function evaluateLoan(loan) {
  if (!CANONICAL_PRODUCTS.includes(loan.productName)) {
    return {
      productName: loan.productName,
      disposition: "Neutral",
      alertCount: 0,
      reason: "Non-canonical product",
      rateDeltaBps: 0,
    };
  }

  const rule = PRODUCT_LOGIC_MAP[loan.productName];
  const benchmark = rule?.benchmarkRate ?? DEFAULT_BENCHMARK_RATE;
  const marketRate = coerceRate(loan.marketRate, benchmark);
  const existingRate = coerceRate(loan.existingRate, marketRate);

  if (!rule) {
    return {
      productName: loan.productName,
      disposition: "Neutral",
      alertCount: 0,
      reason: "Product not in canonical map",
      rateDeltaBps: 0,
    };
  }

  if (!Number.isFinite(existingRate) || !Number.isFinite(marketRate)) {
    return {
      productName: loan.productName,
      disposition: "Neutral",
      alertCount: 0,
      reason: "Missing rate data",
      rateDeltaBps: 0,
    };
  }

  // Positive Δ → borrower rate worse than market (Opportunity). Negative Δ → borrower rate better than market (Warning).
  const rateDeltaBps = Math.round((existingRate - marketRate) * 10000);
  const neutralFloor = rule.neutralFloorBps ?? 25;
  const warningBps = rule.warningBps ?? -75;

  let disposition = "Stay the Course";
  let alertCount = 0;
  const notes = [];

  let daysToReset = null;
  if (rule.kind === "arm") {
    daysToReset = daysUntil(loan.armAdjustmentDate, loan.today);
    if (daysToReset !== null && rule.armAdjustmentWarningDays && daysToReset <= rule.armAdjustmentWarningDays) {
      disposition = "Warning";
      alertCount = 1;
      notes.push("ARM adjustment within warning window");
    }
  }

  if (rateDeltaBps >= rule.opportunityBps) {
    disposition = "Opportunity";
    alertCount = 1;
    notes.push(`Spread meets opportunity trigger (${rateDeltaBps}bps >= ${rule.opportunityBps}bps)`);
  } else if (disposition !== "Warning" && rateDeltaBps <= warningBps) {
    disposition = "Warning";
    alertCount = 1;
    notes.push(`Market rates have risen materially above the existing rate (Δ=${rateDeltaBps}bps)`);
  } else if (disposition !== "Warning" && rateDeltaBps >= neutralFloor) {
    disposition = "Neutral";
    notes.push(`Positive spread but below alert threshold (Δ=${rateDeltaBps}bps)`);
  } else if (disposition === "Stay the Course") {
    notes.push(`Spread below neutral floor (Δ=${rateDeltaBps}bps)`);
  }

  return {
    productName: loan.productName,
    disposition,
    alertCount,
    reason: notes.join("; ") || "No action",
    rateDeltaBps,
    daysToReset,
  };
}

module.exports = {
  CANONICAL_PRODUCTS,
  PRODUCT_LOGIC_MAP,
  DEFAULT_BENCHMARK_RATE,
  evaluateLoan,
};

/**
 * Notes:
 * - This module performs evaluation only.
 * - Alert creation, duplicate prevention, and delivery live in createAlerts.ts.
 */
