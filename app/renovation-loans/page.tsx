import Link from "next/link";
import type { Metadata } from "next";
import { STATES } from "@/lib/states";
import { StateSelector } from "@/components/ui/state-selector";
import {
  ArrowRight,
  Shield,
  CheckCircle2,
  Paintbrush,
  Home,
  Clock,
  DollarSign,
  Calendar,
  Building2,
  Wrench,
  TrendingUp,
  HardHat,
  Star,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Renovation Loans — Purchase + Reno in One Close | Sean Shallis",
  description:
    "Renovation-to-permanent loans that roll your purchase + renovation costs into one mortgage. Finance up to 90% of after-renovation value. Single close, no HELOC needed. AI budget tracking with Project Guardian. Loans originated through U.S. Bank.",
  keywords: [
    "renovation loan",
    "renovation to permanent loan",
    "buy and renovate loan",
    "fixer upper financing",
    "rehab loan",
    "renovation mortgage",
    "single close renovation loan",
    "construction to permanent loan",
    "home renovation financing",
    "renovation loan no HELOC",
    "after renovation value loan",
    "renovation loan vs 203k",
    "renovation loan vs HELOC",
    "home rehab mortgage",
    "fixer upper mortgage",
    "renovation budget escrow",
    "renovation loan interest only",
    "renovation loan single close",
    "renovation loan U.S. Bank",
    "renovation loan specialist",
    "value add renovation loan",
    "investor renovation loan",
    "physician renovation loan",
  ],
  openGraph: {
    title: "Renovation Loans — Purchase + Reno in One Close",
    description:
      "Roll your purchase + renovation costs into one mortgage. Finance up to 90% of after-renovation value. Single close. AI budget tracking included. Loans originated through U.S. Bank.",
    type: "website",
    url: "https://seanshallis.com/renovation-loans",
  },
  alternates: {
    canonical: "https://seanshallis.com/renovation-loans",
  },
};

const WHO_THIS_IS_FOR = [
  { icon: Home, title: "Buy & Renovate", desc: "Found a fixer with good bones? Finance the purchase and the full renovation in one loan. No separate construction financing needed." },
  { icon: Wrench, title: "Major Home Upgrade", desc: "Homeowners doing $100K+ renovations — kitchens, additions, full gut rehabs. Skip the HELOC and lock a single rate." },
  { icon: Star, title: "Physician Renovators", desc: "Physicians upgrading to dream-home spec. Combine with physician loan benefits for maximum purchasing power." },
  { icon: TrendingUp, title: "Value-Add Investors", desc: "Investors doing value-add renovation on primary or second homes. Finance based on what the property will be worth." },
];

const KEY_NUMBERS = [
  { stat: "90%", label: "After-Reno Value", desc: "Finance up to 90% of the property's after-renovation appraised value" },
  { stat: "1", label: "Single Close", desc: "One loan, one closing, one rate — purchase + renovation combined" },
  { stat: "$0", label: "HELOC Needed", desc: "No separate home equity line or construction loan required" },
  { stat: "AI", label: "Budget Tracking", desc: "Project Guardian watches your contractor spend in real time" },
];

const COMPARISON = [
  { feature: "Single close (purchase + renovation)", us: true, heloc: false, fha203k: true },
  { feature: "Based on after-renovation value", us: true, heloc: false, fha203k: true },
  { feature: "No existing equity required", us: true, heloc: false, fha203k: true },
  { feature: "Interest-only during renovation", us: true, heloc: true, fha203k: false },
  { feature: "No FHA mortgage insurance", us: true, heloc: true, fha203k: false },
  { feature: "Renovation budget in escrow", us: true, heloc: false, fha203k: true },
  { feature: "No HUD consultant required", us: true, heloc: true, fha203k: false },
  { feature: "AI budget tracking (Project Guardian)", us: true, heloc: false, fha203k: false },
  { feature: "Works for jumbo amounts ($1M+)", us: true, heloc: true, fha203k: false },
  { feature: "Portfolio lender (keeps your loan)", us: true, heloc: false, fha203k: false },
];

export default function RenovationLoansPage() {
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
              <Paintbrush size={12} />
              Renovation Loan Specialist &middot; U.S. Bank
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-6">
              Renovate Smart. Finance Smarter.
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8 max-w-2xl">
              Renovation-to-permanent loans that roll your purchase + renovation
              costs into one mortgage. Buy the fixer, fund the reno, and lock
              your rate — all in a single close. No home equity line needed.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold hover:bg-[color:var(--brand-teal-dark)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Your Reno Budget
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
                <Clock size={14} /> 90-second rate check
              </span>
              <span className="flex items-center gap-2">
                <Shield size={14} /> No credit impact
              </span>
              <span className="flex items-center gap-2">
                <DollarSign size={14} /> Free forever
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
              Built for Renovators
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Who this is for.
            </h2>
            <p className="text-lg text-neutral-600">
              Whether you&apos;re buying a fixer or turning your current home
              into your forever home — one loan covers it all.
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
              The Renovation Advantage
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Numbers that make renovations possible.
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

      {/* How It Works + Project Guardian */}
      <section className="py-16 md:py-24 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Three steps. One loan. AI-tracked budget.
              </h2>
              <p className="text-lg text-neutral-600">
                Your renovation loan comes with AI budget tracking. Rosie&apos;s
                sister watches your contractor spend so you don&apos;t have to.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  n: "01",
                  title: "Plan the Reno",
                  body: "Tell Sean about the property and your renovation vision. Get a contractor bid, and Sean structures the loan around the after-renovation value — not what the home is worth today.",
                },
                {
                  n: "02",
                  title: "Finance It All",
                  body: "One loan covers the purchase (or refinance) plus the full renovation budget. Single close, single rate. Renovation funds held in escrow and released as work completes.",
                },
                {
                  n: "03",
                  title: "Build with AI Budget Tracking",
                  body: "Project Guardian monitors your renovation spend in real time. Draw requests, change orders, budget overruns — you'll know before your contractor does. Rosie keeps you on track.",
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

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Sean&apos;s Renovation Loan vs. The Alternatives
              </h2>
              <p className="text-lg text-neutral-600">
                HELOCs, FHA 203k, and traditional construction loans all have
                trade-offs. Here&apos;s how Sean&apos;s program stacks up.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="grid grid-cols-4 bg-neutral-50 border-b border-neutral-200 text-sm font-bold">
                <div className="px-5 py-4">Feature</div>
                <div className="px-5 py-4 text-center text-[color:var(--brand-teal)]">Sean + U.S. Bank</div>
                <div className="px-5 py-4 text-center text-neutral-400">HELOC</div>
                <div className="px-5 py-4 text-center text-neutral-400">FHA 203k</div>
              </div>
              {COMPARISON.map((row) => (
                <div key={row.feature} className="grid grid-cols-4 border-b border-neutral-100 last:border-0">
                  <div className="px-5 py-3 text-sm text-neutral-700">{row.feature}</div>
                  <div className="px-5 py-3 text-center">
                    {row.us ? (
                      <CheckCircle2 size={18} className="text-[color:var(--brand-teal)] mx-auto" />
                    ) : (
                      <span className="text-neutral-300">&mdash;</span>
                    )}
                  </div>
                  <div className="px-5 py-3 text-center">
                    {row.heloc ? (
                      <CheckCircle2 size={18} className="text-neutral-400 mx-auto" />
                    ) : (
                      <span className="text-neutral-300">&mdash;</span>
                    )}
                  </div>
                  <div className="px-5 py-3 text-center">
                    {row.fha203k ? (
                      <CheckCircle2 size={18} className="text-neutral-400 mx-auto" />
                    ) : (
                      <span className="text-neutral-300">&mdash;</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white border-t border-neutral-200">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Renovation Loan FAQ
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What's the minimum renovation amount?",
                  a: "The program works best for renovations of $75K or more. For smaller projects, a HELOC or personal loan may be simpler. Sean will help you determine the right structure based on your scope of work.",
                },
                {
                  q: "How does after-renovation value (ARV) work?",
                  a: "The appraiser evaluates what your home will be worth after the planned renovation is complete — based on your contractor's scope of work and comparable sales. You can finance up to 90% of that future value, which often means you need less cash upfront than you'd expect.",
                },
                {
                  q: "What are the contractor requirements?",
                  a: "Your contractor must be licensed, insured, and provide a detailed scope of work with line-item budget. Sean's team reviews the bid to ensure it aligns with the appraisal. You can use your own contractor — no approved-list restriction.",
                },
                {
                  q: "How long does the renovation period last?",
                  a: "Typical renovation periods are 6-12 months, depending on scope. During this time you pay interest-only on the drawn amount. Once the reno is complete, the loan converts to your permanent mortgage automatically.",
                },
                {
                  q: "Can I combine this with a physician loan?",
                  a: "Yes. Physicians can access renovation-to-permanent financing with physician loan benefits — including favorable DTI treatment of student loans. Sean structures these regularly for physicians upgrading to dream-home spec.",
                },
                {
                  q: "How is this different from an FHA 203k?",
                  a: "No FHA mortgage insurance premiums (saving you hundreds per month), no HUD consultant requirement, higher loan limits (jumbo-eligible), and faster processing. Sean's program is conventional — cleaner, simpler, and often cheaper long-term.",
                },
                {
                  q: "Why not just use a HELOC for the renovation?",
                  a: "A HELOC requires existing equity, has a variable rate, and doesn't protect your renovation budget in escrow. Sean's renovation loan finances based on future value, locks your rate, and holds funds in escrow so your budget is protected.",
                },
                {
                  q: "What happens if the renovation goes over budget?",
                  a: "Project Guardian's AI budget tracking catches overruns early. If a change order is needed, Sean works with you to adjust. A contingency reserve (typically 10-15%) is built into the original loan to cover unexpected costs.",
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
            <HardHat className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Ready to finance your renovation?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              90 seconds with Rosie to get your renovation budget estimate. No
              credit impact. No obligation. Or book a 20-minute strategy call
              with Sean — free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-[color:var(--brand-teal)] font-semibold text-base hover:bg-neutral-100 transition-all shadow-xl hover:-translate-y-0.5"
              >
                Get Your Reno Budget
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
            basePath="/renovation-loans"
            heading="Renovation Loans — Available in All 50 States"
            subheading="Sean is licensed nationwide. Select your state for local details."
          />
        </Container>
      </section>

      <Footer />
    </main>
  );
}
