import Link from "next/link";
import type { Metadata } from "next";
import { STATES } from "@/lib/states";
import { StateSelector } from "@/components/ui/state-selector";
import {
  ArrowRight,
  Shield,
  CheckCircle2,
  Hammer,
  Home,
  Clock,
  DollarSign,
  Calendar,
  Building2,
  HardHat,
  Ruler,
  TrendingUp,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Construction Loans — Single Close, Zero Surprises | Sean Shallis",
  description:
    "Construction-to-permanent financing that combines your build loan and mortgage into a single close. No double closing costs. Interest-only during construction. Sean manages the draw schedule so you can focus on the build. U.S. Bank Private Wealth.",
  keywords: [
    "construction loan",
    "construction to permanent loan",
    "single close construction loan",
    "build a home",
    "renovation loan",
    "construction mortgage",
    "one time close construction loan",
    "construction loan rates",
    "new construction financing",
    "renovation to permanent loan",
    "gut renovation loan",
    "lot and construction loan",
    "construction draw schedule",
    "construction loan lender",
    "custom home construction loan",
    "physician construction loan",
    "investment property construction loan",
    "construction loan interest only",
    "construction loan single close",
    "build loan no double closing",
  ],
  openGraph: {
    title: "Construction Loans — Single Close, Zero Surprises",
    description:
      "Construction-to-permanent financing. One close. Interest-only during build. Draw schedule managed by Sean. Backed by U.S. Bank.",
    type: "website",
    url: "https://seanshallis.com/construction-loans",
  },
  alternates: {
    canonical: "https://seanshallis.com/construction-loans",
  },
};

const WHO_THIS_IS_FOR = [
  { icon: Home, title: "Custom Build", desc: "Building your dream home from the ground up. One loan, one close, one rate lock from dirt to doorstep." },
  { icon: Ruler, title: "Major Renovation", desc: "Gut renos and renovation-to-permanent projects. Transform an existing structure without juggling multiple loans." },
  { icon: Building2, title: "Physician Builders", desc: "Physicians building custom homes can combine construction-to-perm with physician loan benefits. Zero down available." },
  { icon: TrendingUp, title: "Investment Builders", desc: "Developers building rental or flip properties. Competitive terms for experienced investors with $100K+ projects." },
];

const KEY_NUMBERS = [
  { stat: "$0", label: "Double-Close Costs", desc: "Single close saves $5-15K vs. two-close construction loans" },
  { stat: "Interest-Only", label: "During Build", desc: "Pay only interest on funds drawn — not the full loan amount" },
  { stat: "One", label: "Rate Lock", desc: "Lock your permanent rate before construction begins" },
  { stat: "12-18 Mo", label: "Build Window", desc: "Generous construction timeline with extension options" },
];

const COMPARISON = [
  { feature: "Single close (one set of closing costs)", us: true, them: false },
  { feature: "Interest-only during construction", us: true, them: true },
  { feature: "Rate locked before build starts", us: true, them: false },
  { feature: "Draw schedule managed for you", us: true, them: false },
  { feature: "Physician loan combo available", us: true, them: false },
  { feature: "Renovation-to-permanent eligible", us: true, them: false },
  { feature: "No re-qualification at conversion", us: true, them: false },
  { feature: "Lot purchase + construction in one loan", us: true, them: false },
];

export default function ConstructionLoansPage() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)]">
      <SpokeNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(14, 107, 109, 0.12), transparent 50%), radial-gradient(circle at 70% 80%, rgba(200, 165, 80, 0.08), transparent 40%)",
          }}
          aria-hidden
        />
        <Container className="relative py-16 md:py-24 lg:py-28">
          <div className="max-w-3xl">
            <Badge variant="teal" className="mb-6">
              <Hammer size={12} />
              Construction Loan Specialist &middot; U.S. Bank Private Wealth
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-6">
              One Close. One Expert. Zero Surprises.
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8 max-w-2xl">
              Construction-to-permanent financing that combines your build loan
              and mortgage into a single close. No double closing costs.
              Interest-only during construction. Sean manages the draw schedule
              so you can focus on the build.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold hover:bg-[color:var(--brand-teal-dark)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Your Build Budget
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://link.seanshallis.com/widget/bookings/usb_20m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold hover:border-neutral-900 transition-colors"
              >
                <Calendar size={16} />
                Book Strategy Call
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600">
              <span className="flex items-center gap-2">
                <Clock size={14} /> 90-second pre-qualification
              </span>
              <span className="flex items-center gap-2">
                <Shield size={14} /> No credit impact
              </span>
              <span className="flex items-center gap-2">
                <DollarSign size={14} /> $100K+ minimum project
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Who This Is For */}
      <section className="py-16 md:py-24 bg-white border-y border-neutral-200">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
              Built for Builders
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Who this is for.
            </h2>
            <p className="text-lg text-neutral-600">
              Whether you&apos;re building from scratch, gutting a fixer, or
              combining physician benefits with construction financing — Sean
              structures the loan so you can focus on the build.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {WHO_THIS_IS_FOR.map((item) => (
              <div
                key={item.title}
                className="bg-[color:var(--brand-cream)] rounded-2xl p-8 border border-neutral-200 hover:border-[color:var(--brand-teal)] hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[color:var(--brand-teal)]/10 flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-[color:var(--brand-teal)]" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Key Numbers */}
      <section className="py-16 md:py-24 bg-[color:var(--surface-dark)] text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[color:var(--brand-gold)] uppercase tracking-widest text-xs font-bold mb-3">
              The Construction Advantage
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Numbers that make the build make sense.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {KEY_NUMBERS.map((item) => (
              <div
                key={item.label}
                className="text-center p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="text-3xl md:text-4xl font-black text-[color:var(--brand-teal-light)] mb-1">
                  {item.stat}
                </div>
                <div className="text-sm font-bold text-white mb-2">{item.label}</div>
                <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Sean + U.S. Bank vs. Typical Construction Lender
              </h2>
              <p className="text-lg text-neutral-600">
                Most construction lenders require two closings, two sets of fees,
                and leave you managing the draw schedule yourself.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="grid grid-cols-3 bg-neutral-50 border-b border-neutral-200 text-sm font-bold">
                <div className="px-6 py-4">Feature</div>
                <div className="px-6 py-4 text-center text-[color:var(--brand-teal)]">Sean + U.S. Bank</div>
                <div className="px-6 py-4 text-center text-neutral-400">Typical Lender</div>
              </div>
              {COMPARISON.map((row) => (
                <div key={row.feature} className="grid grid-cols-3 border-b border-neutral-100 last:border-0">
                  <div className="px-6 py-3 text-sm text-neutral-700">{row.feature}</div>
                  <div className="px-6 py-3 text-center">
                    {row.us ? (
                      <CheckCircle2 size={18} className="text-[color:var(--brand-teal)] mx-auto" />
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </div>
                  <div className="px-6 py-3 text-center">
                    {row.them ? (
                      <CheckCircle2 size={18} className="text-neutral-400 mx-auto" />
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Three steps. One mortgage.
              </h2>
              <p className="text-lg text-neutral-600">
                From blueprint to move-in day — Sean quarterbacks the financing so you can focus on the build.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  n: "01",
                  title: "Plan with Sean",
                  body: "Share your build plans, budget, and timeline. Sean structures a single-close loan that covers lot purchase (if needed), construction, and your permanent mortgage — all in one.",
                },
                {
                  n: "02",
                  title: "Build with Confidence",
                  body: "During construction, you pay interest-only on funds drawn. Sean manages the draw schedule with your builder, releasing funds at each milestone. Your permanent rate is already locked.",
                },
                {
                  n: "03",
                  title: "Move In with One Mortgage",
                  body: "When construction completes, your loan automatically converts to a permanent mortgage. No second closing. No re-qualification. No surprises. Just your new home.",
                },
              ].map((step) => (
                <div key={step.n} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[color:var(--brand-teal)] text-white flex items-center justify-center font-mono font-bold text-2xl">
                    {step.n}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Construction Loan FAQ
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What's the difference between single-close and two-close construction loans?",
                  a: "A two-close loan requires separate closings (and separate fees) for the construction phase and the permanent mortgage. Single-close combines both into one loan, one closing, one set of fees — saving you $5-15K and eliminating the risk of rate changes or re-qualification between phases.",
                },
                {
                  q: "What's the minimum project size?",
                  a: "The minimum project size is $100K. This applies to both new construction and renovation-to-permanent projects. There's no maximum — Sean regularly structures construction loans for custom builds well into the millions.",
                },
                {
                  q: "Does renovation-to-permanent qualify?",
                  a: "Yes. If you're doing a gut renovation or major structural work, renovation-to-permanent financing rolls your purchase (or refinance), renovation costs, and permanent mortgage into a single close. The property must be uninhabitable during construction to qualify.",
                },
                {
                  q: "How does the draw schedule work?",
                  a: "Funds are released to your builder at pre-agreed milestones (foundation, framing, mechanical, etc.). Sean coordinates inspections and approvals so draws are released promptly. You only pay interest on funds that have been drawn — not the full loan amount.",
                },
                {
                  q: "Can I combine this with a physician loan?",
                  a: "Yes. Physicians building custom homes can access construction-to-permanent financing with physician loan benefits including favorable DTI treatment for student loans. This is one of Sean's specialties — building the dream home without the typical physician lending restrictions.",
                },
                {
                  q: "What's the typical timeline from application to breaking ground?",
                  a: "Plan for 30-45 days from application to closing. You'll need approved plans, a licensed builder, and a detailed budget. Sean's team works in parallel with your builder to keep the timeline tight. The construction phase itself typically runs 12-18 months.",
                },
                {
                  q: "Can I include lot purchase in the construction loan?",
                  a: "Yes. If you haven't purchased your lot yet, the single-close loan can include lot acquisition, construction costs, and your permanent mortgage — all in one loan with one closing. If you already own the lot, its equity counts toward your down payment.",
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-neutral-200 bg-[color:var(--brand-cream)] overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-bold text-neutral-900 hover:text-[color:var(--brand-teal)] transition-colors">
                    {faq.q}
                    <ArrowRight size={16} className="text-neutral-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-5 text-sm text-neutral-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="py-20 md:py-24 bg-[color:var(--brand-teal)] text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Hammer className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Ready to plan your build?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              90 seconds with Rosie to get your build budget. No credit impact.
              No obligation. Or book a 20-minute strategy call with Sean — free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-[color:var(--brand-teal)] font-semibold text-base hover:bg-neutral-100 transition-all shadow-xl hover:-translate-y-0.5"
              >
                Get Your Build Budget
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://link.seanshallis.com/widget/bookings/usb_20m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-white/40 text-white font-semibold text-base hover:border-white transition-colors"
              >
                <Calendar size={16} />
                Book Strategy Call
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* State Directory */}
      <section className="py-16 md:py-20 bg-[color:var(--brand-cream)] border-t border-neutral-200">
        <Container>
          <StateSelector
            basePath="/construction-loans"
            heading="Construction Loans — Available in All 50 States"
            subheading="Sean is licensed nationwide. Select your state for local details."
          />
        </Container>
      </section>

      <Footer />
    </main>
  );
}
