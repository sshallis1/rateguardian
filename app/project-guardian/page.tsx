import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Upload,
  MessageCircle,
  BarChart3,
  Shield,
  DollarSign,
  Search,
  Users,
  FileText,
  Camera,
  CheckCircle,
  AlertTriangle,
  Star,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Project Guardian — Before You Overpay, Ask Rosie",
  description:
    "Upload your renovation estimate and Project Guardian helps you understand the cost, compare it locally, and find smarter ways to complete the work.",
};

const HOW_IT_WORKS = [
  {
    icon: Upload,
    step: "1",
    title: "Upload Your Estimate",
    desc: "Snap a photo or upload a PDF of any contractor estimate, invoice, or scope of work.",
  },
  {
    icon: Search,
    step: "2",
    title: "Rosie Compares Locally",
    desc: "See what that work typically costs in your area. Know if you're in range or overpaying.",
  },
  {
    icon: MessageCircle,
    step: "3",
    title: "Ask Rosie",
    desc: '"Is this estimate high?" "Should I get another bid?" "Can your team help me reduce this?"',
  },
  {
    icon: DollarSign,
    step: "4",
    title: "Save Smart",
    desc: "Get recommendations for vendor alternatives, supplier-direct options, and smarter scope decisions.",
  },
];

const FEATURES = [
  {
    icon: Upload,
    title: "Scan & Upload",
    desc: "Contractor estimates, receipts, invoices, photos, scope of work — all in one place.",
  },
  {
    icon: BarChart3,
    title: "Budget Tracker",
    desc: "See what you planned, what you spent, and where the gaps are. Simple and clear.",
  },
  {
    icon: Search,
    title: "Local Price Compare",
    desc: "Your estimate vs. what it typically costs locally. Instant context on every line item.",
  },
  {
    icon: MessageCircle,
    title: "Ask Rosie",
    desc: "Chat with Rosie about your project. Get plain-language answers about costs, risks, and next steps.",
  },
  {
    icon: Camera,
    title: "Before & After",
    desc: "Document every phase. When it's time to sell, you have the full story ready.",
  },
  {
    icon: Shield,
    title: "Pro Savings",
    desc: "Pro members may access vendor referrals, supplier discounts, and scope optimization support.",
  },
];

const CASE_STUDY_HIGHLIGHTS = [
  { label: "Purchase Price", value: "$345,000" },
  { label: "Target Resale", value: "$575,000" },
  { label: "Confirmed Spend", value: "$10,957" },
  { label: "Overpay Alert", value: "Landscaping $36K → $5K" },
];

export default function ProjectGuardianPage() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)] text-neutral-900">
      <SpokeNav />

      {/* Hero */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
              <Shield size={16} />
              Protects the Project
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight mb-6">
              Before You Overpay,
              <br />
              <span className="text-orange-600">Ask Rosie.</span>
            </h1>

            <p className="text-xl text-neutral-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Upload your renovation estimate and Project Guardian helps you
              understand the cost, compare it locally, and find smarter ways to
              complete the work.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/project-guardian/scan"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors shadow-lg text-lg"
              >
                <Upload size={20} />
                Scan My Estimate
              </Link>
              <Link
                href="/project-guardian/case-study"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold hover:border-neutral-900 transition-colors text-lg"
              >
                View 102 Wiltop Case Study
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-14">
            <div className="text-orange-600 uppercase tracking-widest text-xs font-bold mb-3">
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Four Steps to Smarter Spending
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-4">
                  <s.icon size={28} className="text-orange-600" />
                </div>
                <div className="text-sm font-bold text-orange-600 mb-1">
                  Step {s.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-orange-600 uppercase tracking-widest text-xs font-bold mb-3">
              What You Get
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Everything to Protect Your Budget
            </h2>
            <p className="text-lg text-neutral-600">
              Simple enough for any homeowner. Powerful enough for real project management.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 hover:border-orange-300 hover:-translate-y-1 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-orange-600" />
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

      {/* 102 Wiltop Case Study Teaser */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white p-8 md:p-12">
              <div className="flex items-center gap-2 mb-4">
                <Star size={20} className="text-orange-600" />
                <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">
                  Real Case Study
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                102 Wiltop Rd — Livingston, NJ
              </h2>
              <p className="text-lg text-neutral-600 mb-8 max-w-2xl">
                A split-level renovation where smarter scope review, vendor
                selection, and supplier strategy identified major savings
                opportunities — including a landscaping estimate that was 7x the
                ROI-appropriate budget.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {CASE_STUDY_HIGHLIGHTS.map((h) => (
                  <div
                    key={h.label}
                    className="rounded-xl bg-white border border-orange-100 p-4"
                  >
                    <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
                      {h.label}
                    </div>
                    <div className="font-bold text-lg font-mono">
                      {h.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/project-guardian/case-study"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 transition-colors"
                >
                  See Full Case Study
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/project-guardian/compare"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-orange-300 text-orange-700 font-semibold text-sm hover:border-orange-600 transition-colors"
                >
                  View Local Comparisons
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Savings Stories (Placeholder Cards) */}
      <section className="py-20 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="text-center mb-14">
            <div className="text-orange-600 uppercase tracking-widest text-xs font-bold mb-3">
              Real Results
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Smarter Decisions Save Thousands
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Cabinet Refacing vs Full Remodel",
                theme:
                  "Refacing delivered 80% of visual impact at 40% of full remodel cost.",
                highlight: "Saved ~$20K",
                time: "5 days vs 3-4 weeks",
              },
              {
                title: "Bath Fitter vs Full Bathroom Gut",
                theme:
                  "Surface-level refresh vs unnecessary gut job. Surfaces were structurally sound.",
                highlight: "Saved ~$11.5K",
                time: "2 days vs 2-3 weeks",
              },
              {
                title: "Specialist Trades vs All-in-One GC",
                theme:
                  'The "Master of None" GC marked up every sub 20-30%. Hiring direct saved big.',
                highlight: "Saved ~$33K",
                time: "Roughly half the time",
              },
            ].map((story) => (
              <div
                key={story.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={18} className="text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-700">
                    {story.highlight}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{story.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                  {story.theme}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <AlertTriangle size={12} />
                  {story.time}
                </div>
                <p className="text-xs text-neutral-400 mt-3 italic">
                  Full story details coming soon.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pro User CTA */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-6">
              <Users size={16} />
              Pro Access
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want Help Getting the Price Down?
            </h2>
            <p className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto">
              Pro members may access local vendor referrals, supplier discount
              pass-throughs, estimate reviews, and scope optimization support.
              We typically identify savings opportunities on most renovation projects.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/project-guardian/pro"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 transition-colors"
              >
                Learn About Pro
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/project-guardian/scan"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold text-sm hover:border-neutral-900 transition-colors"
              >
                <Upload size={16} />
                Scan My Estimate Free
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Renovation + Financing */}
      <section className="py-16 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Renovation + Financing = One System
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Project Guardian connects directly to Rate Guardian. Need a
              construction-to-perm loan? Cash-out refi to fund the reno? Sean
              handles it — with full visibility into your project numbers.
            </p>
            <Link
              href="/rate-guardian/ask-rosie"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold text-sm hover:border-neutral-900 transition-colors"
            >
              Talk to Rosie About Rates
              <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
