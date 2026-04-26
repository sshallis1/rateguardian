import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Hammer,
  DollarSign,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CostEstimator } from "@/components/interactive/CostEstimator";

export const metadata: Metadata = {
  title: "Project Guardian — AI Renovation Management",
  description:
    "AI project management for your renovation. From first-walkthrough cost estimate to resale prep. Keep the 15-20% GC markup in your pocket.",
};

const FEATURES = [
  {
    icon: DollarSign,
    title: "Cost Evaluator",
    desc: "Know what the project will REALLY cost before you buy or break ground",
    tier: "free",
  },
  {
    icon: TrendingUp,
    title: "Budget Tracker",
    desc: "Rosie flags every line item creeping past market rate with variance alerts",
    tier: "free",
  },
  {
    icon: Users,
    title: "Contractor Management",
    desc: "Bids, draws, payments, and performance notes in one place",
    tier: "pro",
  },
  {
    icon: FileText,
    title: "Document Vault",
    desc: "Photos per phase, receipts, permits, warranties, insurance — forever",
    tier: "pro",
  },
  {
    icon: Calendar,
    title: "Timeline Tracking",
    desc: "Demo, rough, finish, punch list — all visible with milestone alerts",
    tier: "free",
  },
  {
    icon: Hammer,
    title: "Resale Prep",
    desc: "Every upgrade documented from day one, powered by Sean's 10X House Selling Secrets",
    tier: "pro",
  },
];

export default function ProjectGuardianPage() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)] text-neutral-900">
      <SpokeNav />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-900 mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Guardian Family
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <Hammer size={28} className="text-orange-600" />
                </div>
                <Badge variant="teal">Live</Badge>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-[1.02] tracking-tight mb-4">
                Project Guardian
              </h1>
              <p className="text-2xl font-semibold text-orange-600 mb-6">
                Your reno. Your budget. Your rules.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-xl">
                AI project management for your renovation — from
                first-walkthrough cost estimate to resale prep. Keep the 15-20%
                general contractor markup in your pocket, not someone
                else&apos;s.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 transition-colors shadow-lg"
                >
                  Start Tracking Free
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/rate-guardian/ask-rosie"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold text-sm hover:border-neutral-900 transition-colors"
                >
                  Ask Rosie About Financing
                </Link>
              </div>
            </div>

            {/* Interactive demo */}
            <CostEstimator />
          </div>
        </Container>
      </section>

      {/* Features grid */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-orange-600 uppercase tracking-widest text-xs font-bold mb-3">
              What You Get
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Everything to Run Your Reno
            </h2>
            <p className="text-lg text-neutral-600">
              Free tier gets you started. Pro unlocks the full toolkit.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-neutral-200 bg-[color:var(--brand-cream)] p-6 hover:border-orange-300 hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <f.icon size={20} className="text-orange-600" />
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      f.tier === "free"
                        ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                        : "text-amber-700 bg-amber-50 border border-amber-200"
                    }`}
                  >
                    {f.tier}
                  </span>
                </div>
                <h3 className="font-bold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it connects to financing */}
      <section className="py-16 md:py-20 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Renovation + Financing = One System
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Project Guardian connects directly to Rate Guardian. Need a
              construction-to-perm loan? Cash-out refi to fund the reno? HELOC
              for phase two? Sean handles it — with full visibility into your
              project.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 transition-colors"
              >
                Create Free Account
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold text-sm hover:border-neutral-900 transition-colors"
              >
                Talk to Rosie About Rates
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
