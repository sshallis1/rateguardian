import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Home,
  BarChart3,
  Shield,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "102 Wiltop Rd Case Study — Project Guardian",
  description:
    "See how Project Guardian identified savings opportunities on a real renovation project in Livingston, NJ.",
};

const NUMBERS = {
  purchase: 345000,
  renoLow: 55000,
  renoHigh: 75000,
  carryMonthly: 3500,
  holdMonths: 6,
  carryTotal: 21000,
  costOfSalePct: 0.045,
  resaleTarget: 575000,
  resaleLow: 550000,
  resaleHigh: 595000,
  confirmedSpend: 10957,
  projectedProfitLow: 85000,
  projectedProfitHigh: 130000,
};

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

const SAVINGS_EXAMPLES = [
  {
    category: "Landscaping",
    problem: "Full landscaping package quoted at $35,000-$37,500",
    insight:
      "Rosie flagged this as 4-7x the typical curb appeal budget for a flip in this market. Most of the proposed work had zero ROI impact.",
    action:
      "Scoped down to ROI-driving items only: fresh mulch, trimming, power wash, front plantings.",
    result: "Target budget: $5,000 (savings: ~$31,000)",
    icon: AlertTriangle,
  },
  {
    category: "Hardwood Flooring",
    problem:
      "GC-bundled flooring quote included 15-25% markup on a sub-contractor",
    insight:
      "Rosie recommended hiring a direct refinisher — the GC was adding markup for work they'd outsource anyway.",
    action:
      "Getting 2 quotes from direct hardwood refinishers. Estimated $2,500-$3,500 vs $4,500-$5,000 through a GC.",
    result: "Estimated savings: ~$1,500",
    icon: DollarSign,
  },
  {
    category: "Cabinets",
    problem:
      "Full kitchen remodel estimates coming in at $25,000-$50,000",
    insight:
      "Rosie identified that cabinet refacing could deliver 80% of the visual impact at 40% of the cost. The existing cabinet boxes were structurally sound.",
    action:
      "Getting 3 refacing quotes (Kitchen Tune-Up, Homestyle, Zook/Capra). Target: $10,000-$20,000.",
    result: "Estimated savings: $5,000-$30,000",
    icon: CheckCircle,
  },
];

const TIMELINE = [
  { phase: "Acquisition", date: "Feb 2026", status: "complete" },
  { phase: "Demolition & Cleanout", date: "Feb 2026", status: "complete" },
  { phase: "Painting — Interior", date: "Mar 2026", status: "complete" },
  { phase: "Flooring — Carpet & Resilient", date: "Mar 2026", status: "complete" },
  { phase: "Hardwood Refinishing", date: "Apr-May 2026", status: "in_progress" },
  { phase: "Kitchen Cabinets", date: "Apr-May 2026", status: "in_progress" },
  { phase: "Bathrooms", date: "May 2026", status: "planned" },
  { phase: "Appliances + Fixtures", date: "May 2026", status: "planned" },
  { phase: "Landscaping (Curb Appeal)", date: "Jun 2026", status: "planned" },
  { phase: "Staging + Photos", date: "Jun 2026", status: "planned" },
  { phase: "List for Sale", date: "Jul 2026", status: "planned" },
];

export default function CaseStudyPage() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)] text-neutral-900">
      <SpokeNav />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Link
              href="/project-guardian"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-900 mb-8 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Project Guardian
            </Link>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                <Home size={24} className="text-orange-600" />
              </div>
              <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">
                Case Study
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              102 Wiltop Rd
            </h1>
            <p className="text-xl text-neutral-500 mb-8">
              Livingston, NJ &middot; Split-Level &middot; 4 bed / 2.5 bath &middot; 2,200 sqft
            </p>

            {/* Key Numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <NumberCard label="Purchase" value={fmt(NUMBERS.purchase)} />
              <NumberCard label="Reno Budget" value={`${fmt(NUMBERS.renoLow)}-${fmt(NUMBERS.renoHigh)}`} />
              <NumberCard label="Target Resale" value={fmt(NUMBERS.resaleTarget)} />
              <NumberCard label="Projected Profit" value={`${fmt(NUMBERS.projectedProfitLow)}-${fmt(NUMBERS.projectedProfitHigh)}`} sub="18-28% ROI" />
            </div>

            {/* The Problem */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">The Problem</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                A residential split-level with good bones but every surface
                needed updating. The initial contractor estimates and vendor
                quotes totaled well over budget — including a landscaping
                package at 7x the ROI-appropriate spend and cabinet estimates
                that ranged from reasonable to astronomical.
              </p>
            </div>

            {/* What Rosie Found */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                What Rosie / Project Guardian Found
              </h2>
              <div className="space-y-6">
                {SAVINGS_EXAMPLES.map((s) => (
                  <div
                    key={s.category}
                    className="rounded-2xl border border-neutral-200 bg-white p-6"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <s.icon size={20} className="text-orange-600" />
                      <h3 className="font-bold text-lg">{s.category}</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-semibold text-neutral-900">
                          Estimate received:
                        </span>{" "}
                        <span className="text-neutral-600">{s.problem}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-neutral-900">
                          What Rosie flagged:
                        </span>{" "}
                        <span className="text-neutral-600">{s.insight}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-neutral-900">
                          Smarter decision:
                        </span>{" "}
                        <span className="text-neutral-600">{s.action}</span>
                      </p>
                      <p className="font-semibold text-emerald-600">
                        {s.result}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Project Timeline</h2>
              <div className="space-y-2">
                {TIMELINE.map((t) => (
                  <div
                    key={t.phase}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl border border-neutral-200 bg-white"
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        t.status === "complete"
                          ? "bg-emerald-500"
                          : t.status === "in_progress"
                            ? "bg-amber-500"
                            : "bg-neutral-300"
                      }`}
                    />
                    <span className="text-sm font-medium text-neutral-900 flex-1">
                      {t.phase}
                    </span>
                    <span className="text-xs text-neutral-400">{t.date}</span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        t.status === "complete"
                          ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                          : t.status === "in_progress"
                            ? "text-amber-700 bg-amber-50 border-amber-200"
                            : "text-neutral-500 bg-neutral-100 border-neutral-200"
                      }`}
                    >
                      {t.status === "in_progress"
                        ? "In Progress"
                        : t.status === "complete"
                          ? "Done"
                          : "Planned"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lessons Learned */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Lessons Learned</h2>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-3">
                {[
                  "Get 3 quotes before committing to any scope over $5K",
                  "Hire specialist trades directly — the GC markup on subs is 15-25%",
                  "Curb appeal spend should match ROI math, not the landscaper's wish list",
                  "Surface-level refreshes (refacing, refinishing) often deliver 80%+ of the visual impact",
                  "Document everything from day one — it compounds into resale value",
                ].map((lesson) => (
                  <div key={lesson} className="flex items-start gap-3">
                    <CheckCircle
                      size={16}
                      className="text-emerald-500 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-sm text-neutral-700">{lesson}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guardian Flywheel */}
            <div className="rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white p-8 mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={20} className="text-orange-600" />
                <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">
                  The Guardian Flywheel
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
                <span className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg">
                  Project Guardian
                </span>
                <ArrowRight size={16} className="text-neutral-400" />
                <span className="text-neutral-500">Sell to buyer</span>
                <ArrowRight size={16} className="text-neutral-400" />
                <span className="bg-teal-100 text-teal-700 px-3 py-1.5 rounded-lg">
                  Rate Guardian
                </span>
                <ArrowRight size={16} className="text-neutral-400" />
                <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg">
                  Home Guardian
                </span>
                <ArrowRight size={16} className="text-neutral-400" />
                <span className="text-neutral-500">Repeat</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/project-guardian/scan"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors shadow-lg"
              >
                Scan My Estimate
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/project-guardian/compare"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold hover:border-neutral-900 transition-colors"
              >
                View Local Comparisons
              </Link>
              <Link
                href="/project-guardian/dashboard"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold hover:border-neutral-900 transition-colors"
              >
                <BarChart3 size={18} />
                Dashboard
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}

function NumberCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4">
      <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="font-bold text-lg font-mono">{value}</div>
      {sub && <div className="text-xs text-emerald-600 mt-0.5">{sub}</div>}
    </div>
  );
}
