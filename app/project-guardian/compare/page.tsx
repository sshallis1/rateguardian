import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { getProjectComparisons } from "@/lib/pg/db";

export const metadata: Metadata = {
  title: "Compare Locally — Project Guardian",
  description: "See how your renovation estimates compare to local market pricing.",
};

const DEMO_PROJECT_ID = "00000000-0000-4000-8000-000000000100";

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default async function ComparePage() {
  let comparisons: Awaited<ReturnType<typeof getProjectComparisons>> = [];
  try {
    comparisons = await getProjectComparisons(DEMO_PROJECT_ID);
  } catch {
    comparisons = [];
  }

  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)] text-neutral-900">
      <SpokeNav />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Local Price Comparison
            </h1>
            <p className="text-lg text-neutral-600 mb-10">
              See how your estimates stack up against local market pricing. Items
              flagged in red may represent overpay opportunities.
            </p>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 mb-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neutral-300" />
                <span className="text-neutral-500">What you were quoted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-neutral-500">Local range (low - high)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-neutral-500">Guardian target</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-neutral-500">Potential savings</span>
              </div>
            </div>

            {comparisons.length === 0 ? (
              <div className="text-center py-16 text-neutral-400">
                <p className="mb-4">
                  No comparisons yet. Run the database seed to see 102 Wiltop Rd data.
                </p>
                <Link
                  href="/project-guardian/scan"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 transition-colors"
                >
                  Upload an Estimate
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {comparisons
                  .filter((c) => c.user_estimate_amount > 0)
                  .map((c) => {
                    const savings = c.potential_savings;
                    const isOverpay = savings > 500;
                    const isFair = savings <= 500 && savings >= -500;

                    return (
                      <div
                        key={c.id}
                        className={`rounded-2xl border bg-white p-6 ${
                          isOverpay
                            ? "border-red-200"
                            : "border-neutral-200"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {isOverpay ? (
                              <AlertTriangle
                                size={20}
                                className="text-red-500"
                              />
                            ) : isFair ? (
                              <CheckCircle
                                size={20}
                                className="text-emerald-500"
                              />
                            ) : (
                              <HelpCircle
                                size={20}
                                className="text-neutral-400"
                              />
                            )}
                            <h3 className="font-bold text-lg">
                              {c.category?.name ?? "Category"}
                            </h3>
                          </div>
                          {isOverpay && (
                            <span className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                              Save {fmt(savings)}
                            </span>
                          )}
                          {isFair && (
                            <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                              Fair Price
                            </span>
                          )}
                        </div>

                        {/* Price Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
                              What you were quoted
                            </div>
                            <div className="text-lg font-bold font-mono">
                              {fmt(c.user_estimate_amount)}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
                              Local range
                            </div>
                            <div className="text-lg font-mono text-blue-600">
                              {fmt(c.local_market_low)} &ndash;{" "}
                              {fmt(c.local_market_high)}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
                              Guardian target
                            </div>
                            <div className="text-lg font-bold font-mono text-emerald-600">
                              {fmt(c.guardian_target_amount)}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
                              Potential savings
                            </div>
                            <div
                              className={`text-lg font-bold font-mono ${
                                isOverpay ? "text-red-600" : "text-neutral-400"
                              }`}
                            >
                              {savings > 0 ? fmt(savings) : "--"}
                            </div>
                          </div>
                        </div>

                        {/* Visual bar */}
                        <div className="h-2 rounded-full bg-neutral-100 relative overflow-hidden mb-3">
                          {(() => {
                            const max = Math.max(
                              c.user_estimate_amount,
                              c.local_market_high,
                              c.guardian_target_amount
                            );
                            const targetPct =
                              max > 0
                                ? (c.guardian_target_amount / max) * 100
                                : 0;
                            const quotePct =
                              max > 0
                                ? (c.user_estimate_amount / max) * 100
                                : 0;
                            return (
                              <>
                                <div
                                  className="absolute top-0 left-0 h-full bg-emerald-400 rounded-full"
                                  style={{ width: `${targetPct}%` }}
                                />
                                {quotePct > targetPct && (
                                  <div
                                    className="absolute top-0 h-full bg-red-300 rounded-r-full"
                                    style={{
                                      left: `${targetPct}%`,
                                      width: `${quotePct - targetPct}%`,
                                    }}
                                  />
                                )}
                              </>
                            );
                          })()}
                        </div>

                        {/* Recommendation */}
                        {c.recommendation && (
                          <p className="text-sm text-neutral-600 bg-neutral-50 rounded-lg p-3 italic">
                            Rosie&apos;s take: {c.recommendation}
                          </p>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-10">
              <Link
                href="/project-guardian/scan"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 transition-colors"
              >
                Upload Another Estimate
              </Link>
              <Link
                href="/project-guardian/chat"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold text-sm hover:border-neutral-900 transition-colors"
              >
                Ask Rosie About These
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
