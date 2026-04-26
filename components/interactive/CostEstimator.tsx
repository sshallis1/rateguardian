"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Hammer, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

// National average renovation costs per sqft by project type
const COST_PER_SQFT: Record<string, { low: number; high: number; label: string }> = {
  kitchen: { low: 75, high: 250, label: "Kitchen Remodel" },
  bathroom: { low: 120, high: 300, label: "Bathroom Remodel" },
  full_reno: { low: 50, high: 175, label: "Full Home Renovation" },
  addition: { low: 100, high: 400, label: "Addition / Build-Out" },
  flip: { low: 30, high: 100, label: "Flip / Cosmetic Refresh" },
};

// Regional cost multipliers (simplified)
const REGION_MULTIPLIERS: Record<string, { mult: number; label: string }> = {
  northeast: { mult: 1.25, label: "Northeast (NJ, NY, CT, MA)" },
  southeast: { mult: 0.85, label: "Southeast (FL, GA, NC, SC)" },
  midwest: { mult: 0.80, label: "Midwest (OH, IL, MI, IN)" },
  west: { mult: 1.15, label: "West Coast (CA, WA, OR)" },
  southwest: { mult: 0.90, label: "Southwest (TX, AZ, NV)" },
};

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function CostEstimator() {
  const [sqft, setSqft] = React.useState("");
  const [projectType, setProjectType] = React.useState("full_reno");
  const [region, setRegion] = React.useState("northeast");
  const [result, setResult] = React.useState<{
    low: number;
    high: number;
    gcMarkup: number;
  } | null>(null);

  function handleEstimate(e: React.FormEvent) {
    e.preventDefault();
    const sf = parseFloat(sqft);
    if (!sf || sf <= 0) return;

    const costs = COST_PER_SQFT[projectType];
    const mult = REGION_MULTIPLIERS[region].mult;

    const low = Math.round(sf * costs.low * mult);
    const high = Math.round(sf * costs.high * mult);
    const gcMarkup = Math.round(((low + high) / 2) * 0.175); // 17.5% avg GC markup

    setResult({ low, high, gcMarkup });
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-white text-base font-medium focus:border-orange-500 focus:outline-none transition-colors";

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
          <Hammer size={20} className="text-orange-600" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-neutral-900">
            Renovation Cost Estimator
          </h3>
          <p className="text-sm text-neutral-500">
            Ballpark your project in 10 seconds
          </p>
        </div>
      </div>

      <form onSubmit={handleEstimate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1.5">
            Square Footage
          </label>
          <input
            className={inputClass}
            type="text"
            inputMode="numeric"
            placeholder="1,500"
            value={sqft}
            onChange={(e) => setSqft(e.target.value.replace(/[^\d]/g, ""))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1.5">
            Project Type
          </label>
          <select
            className={inputClass}
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          >
            {Object.entries(COST_PER_SQFT).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1.5">
            <MapPin size={14} className="inline mr-1" />
            Region
          </label>
          <select
            className={inputClass}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {Object.entries(REGION_MULTIPLIERS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
        <Button
          type="submit"
          className="w-full !h-12 !text-base !bg-orange-600 hover:!bg-orange-700"
        >
          Estimate My Cost
        </Button>
      </form>

      {result && (
        <div className="mt-6 pt-6 border-t border-neutral-200 animate-fade-in">
          <div className="rounded-xl bg-orange-50 border border-orange-200 p-5 mb-4">
            <p className="text-xs text-orange-600 uppercase tracking-wider font-bold mb-1">
              Estimated Range
            </p>
            <p className="text-2xl font-bold font-mono text-orange-700">
              {fmt(result.low)} &ndash; {fmt(result.high)}
            </p>
          </div>

          <div className="rounded-xl bg-red-50 border border-red-200 p-4 mb-4">
            <p className="text-xs text-red-600 uppercase tracking-wider font-bold mb-1">
              Typical GC Markup You&apos;d Pay
            </p>
            <p className="text-xl font-bold font-mono text-red-700">
              +{fmt(result.gcMarkup)}
            </p>
            <p className="text-xs text-red-500 mt-1">
              15-20% general contractor markup on average
            </p>
          </div>

          <p className="text-sm text-neutral-500 mb-4">
            Project Guardian helps you keep that markup in your pocket.
            Track every dollar, manage contractors directly, and stay on budget.
          </p>

          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:underline"
          >
            Sign up free to track your full project
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
