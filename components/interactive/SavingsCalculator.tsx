"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, DollarSign, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const LOAN_TYPES = [
  { label: "30-Year Fixed", value: "30fixed" },
  { label: "15-Year Fixed", value: "15fixed" },
  { label: "5/1 ARM", value: "5arm" },
  { label: "7/1 ARM", value: "7arm" },
];

// Approximate current market rates for comparison (illustrative)
const MARKET_RATES: Record<string, number> = {
  "30fixed": 6.25,
  "15fixed": 5.5,
  "5arm": 5.75,
  "7arm": 5.9,
};

function calculateMonthlySavings(
  balance: number,
  currentRate: number,
  marketRate: number,
  termYears: number
): { monthlySavings: number; totalSavings: number; score: number } {
  const n = termYears * 12;
  const r1 = currentRate / 100 / 12;
  const r2 = marketRate / 100 / 12;

  const payment1 = r1 > 0 ? (balance * r1 * Math.pow(1 + r1, n)) / (Math.pow(1 + r1, n) - 1) : balance / n;
  const payment2 = r2 > 0 ? (balance * r2 * Math.pow(1 + r2, n)) / (Math.pow(1 + r2, n) - 1) : balance / n;

  const monthlySavings = Math.max(0, payment1 - payment2);
  const totalSavings = monthlySavings * n;

  // Score: 0-100 based on potential savings percentage
  const savingsPercent = payment1 > 0 ? (monthlySavings / payment1) * 100 : 0;
  const score = Math.min(100, Math.round(savingsPercent * 10));

  return { monthlySavings, totalSavings, score };
}

export function SavingsCalculator() {
  const [balance, setBalance] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [loanType, setLoanType] = React.useState("30fixed");
  const [result, setResult] = React.useState<{
    monthlySavings: number;
    totalSavings: number;
    score: number;
  } | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const bal = parseFloat(balance.replace(/,/g, ""));
    const r = parseFloat(rate);
    if (!bal || !r || bal <= 0 || r <= 0) return;

    const termYears = loanType.includes("15") ? 15 : 30;
    const marketRate = MARKET_RATES[loanType] ?? 6.25;
    setResult(calculateMonthlySavings(bal, r, marketRate, termYears));
  }

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const inputClass =
    "w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-white text-base font-medium focus:border-[color:var(--brand-teal)] focus:outline-none transition-colors";

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[color:var(--brand-teal)]/10 flex items-center justify-center">
          <DollarSign size={20} className="text-[color:var(--brand-teal)]" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-neutral-900">
            Savings Calculator
          </h3>
          <p className="text-sm text-neutral-500">
            See what you could save in 30 seconds
          </p>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1.5">
            Current Loan Balance
          </label>
          <input
            className={inputClass}
            type="text"
            inputMode="numeric"
            placeholder="$400,000"
            value={balance}
            onChange={(e) => setBalance(e.target.value.replace(/[^\d,]/g, ""))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1.5">
            Current Interest Rate
          </label>
          <input
            className={inputClass}
            type="text"
            inputMode="decimal"
            placeholder="7.25%"
            value={rate}
            onChange={(e) => setRate(e.target.value.replace(/[^\d.]/g, ""))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1.5">
            Loan Type
          </label>
          <select
            className={inputClass}
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
          >
            {LOAN_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" className="w-full !h-12 !text-base">
          Calculate My Savings
        </Button>
      </form>

      {result && (
        <div className="mt-6 pt-6 border-t border-neutral-200 animate-fade-in">
          {result.monthlySavings > 10 ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown size={18} className="text-emerald-600" />
                <span className="font-bold text-emerald-700">
                  Savings opportunity detected
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                  <p className="text-xs text-emerald-600 uppercase tracking-wider font-bold">
                    Monthly
                  </p>
                  <p className="text-2xl font-bold font-mono text-emerald-700">
                    {fmt(result.monthlySavings)}
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                  <p className="text-xs text-emerald-600 uppercase tracking-wider font-bold">
                    Over Loan Life
                  </p>
                  <p className="text-2xl font-bold font-mono text-emerald-700">
                    {fmt(result.totalSavings)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-neutral-500 mb-4">
                Based on current market rates. Your actual savings depend on
                credit, property, and timing. Rosie can give you an exact number.
              </p>
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand-teal)] hover:underline"
              >
                Get my exact Savings Score from Rosie
                <ArrowRight size={14} />
              </Link>
            </>
          ) : (
            <>
              <p className="font-semibold text-neutral-900 mb-2">
                You look well-positioned.
              </p>
              <p className="text-sm text-neutral-500 mb-4">
                Your rate is close to market. But rates change daily — Rosie can
                monitor and alert you if a window opens.
              </p>
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand-teal)] hover:underline"
              >
                Set up free monitoring with Rosie
                <ArrowRight size={14} />
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
