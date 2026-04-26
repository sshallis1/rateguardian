"use client";

import Link from "next/link";
import { ArrowRight, Shield, AlertTriangle, Eye } from "lucide-react";

const COMPARISON = [
  {
    type: "30-Year Fixed",
    rate: "6.75%",
    payment: "$2,594",
    year1Cost: "$31,128",
    pros: ["Predictable payments", "No rate shock risk"],
    cons: ["Higher rate", "Overpay if rates drop", "No one watching"],
    verdict: "Safe — but expensive if no one monitors",
    icon: Shield,
    accent: "neutral",
  },
  {
    type: "5/1 ARM + Rosie",
    rate: "5.75%",
    payment: "$2,334",
    year1Cost: "$28,008",
    pros: [
      "Save $260/mo immediately",
      "$3,120 saved in year one",
      "Rosie watches for refi window",
    ],
    cons: ["Rate adjusts at year 5"],
    verdict: "Smart play — monitoring makes it safe",
    icon: Eye,
    accent: "teal",
  },
];

export function RateComparisonWidget() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
      <div className="p-6 md:p-8 border-b border-neutral-200">
        <h3 className="font-bold text-lg text-neutral-900 mb-1">
          Fixed vs ARM — The Hidden Math
        </h3>
        <p className="text-sm text-neutral-500">
          Based on $400K loan. Rates illustrative.
        </p>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
        {COMPARISON.map((c) => {
          const isTeal = c.accent === "teal";
          return (
            <div
              key={c.type}
              className={`p-6 md:p-8 ${isTeal ? "bg-[color:var(--brand-teal)]/[0.02]" : ""}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <c.icon
                  size={18}
                  className={
                    isTeal
                      ? "text-[color:var(--brand-teal)]"
                      : "text-neutral-400"
                  }
                />
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isTeal
                      ? "text-[color:var(--brand-teal)]"
                      : "text-neutral-400"
                  }`}
                >
                  {c.type}
                </span>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold font-mono text-neutral-900">
                  {c.payment}
                  <span className="text-sm font-normal text-neutral-400">
                    /mo
                  </span>
                </div>
                <div className="text-sm text-neutral-500">
                  at {c.rate} &middot; {c.year1Cost}/yr
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                {c.pros.map((p) => (
                  <div key={p} className="flex items-start gap-2 text-sm">
                    <span className="text-emerald-500 mt-0.5">+</span>
                    <span className="text-neutral-700">{p}</span>
                  </div>
                ))}
                {c.cons.map((p) => (
                  <div key={p} className="flex items-start gap-2 text-sm">
                    <span className="text-amber-500 mt-0.5">-</span>
                    <span className="text-neutral-500">{p}</span>
                  </div>
                ))}
              </div>

              <div
                className={`text-xs font-bold uppercase tracking-wider ${
                  isTeal ? "text-[color:var(--brand-teal)]" : "text-neutral-400"
                }`}
              >
                {c.verdict}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 md:p-8 bg-neutral-50 border-t border-neutral-200 text-center">
        <p className="text-sm text-neutral-600 mb-3">
          The ARM is only &ldquo;risky&rdquo; without monitoring. With Rosie, it
          becomes the smart play.
        </p>
        <Link
          href="/rate-guardian/ask-rosie"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand-teal)] hover:underline"
        >
          Ask Rosie which strategy fits you
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
