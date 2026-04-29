import Link from "next/link";
import type { Metadata } from "next";
import { STATES } from "@/lib/states";
import { StateSelector } from "@/components/ui/state-selector";
import {
  ArrowRight,
  Shield,
  CheckCircle2,
  Landmark,
  Briefcase,
  Home,
  Clock,
  DollarSign,
  Calendar,
  Building2,
  Star,
  Globe,
  Users,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Private Wealth Mortgage — Jumbo Loans Up to $20M+ | Sean Shallis",
  description:
    "Jumbo and portfolio mortgage solutions for high-net-worth borrowers. Complex income, multiple properties, foreign nationals, trust-held assets — Sean structures what others can't. Loans originated through U.S. Bank.",
  keywords: [
    "jumbo mortgage",
    "private wealth mortgage",
    "high net worth mortgage",
    "jumbo loan",
    "luxury home mortgage",
    "portfolio mortgage",
    "non-QM mortgage",
    "jumbo mortgage rates",
    "asset-based mortgage",
    "RSU income mortgage",
    "stock compensation mortgage",
    "foreign national mortgage",
    "trust purchase mortgage",
    "LLC property purchase",
    "multi-property mortgage",
    "interest-only mortgage",
    "jumbo loan no PMI",
    "private banking mortgage",
    "executive mortgage",
    "business owner mortgage",
    "complex income mortgage",
    "asset depletion mortgage",
    "jumbo refinance",
    "luxury home loan",
  ],
  openGraph: {
    title: "Private Wealth Mortgage — Jumbo Loans Up to $20M+",
    description:
      "Portfolio lending for high-net-worth borrowers. Complex income, trust-held assets, foreign nationals. Sean structures what others can't. U.S. Bank.",
    type: "website",
    url: "https://seanshallis.com/private-wealth-mortgage",
  },
  alternates: {
    canonical: "https://seanshallis.com/private-wealth-mortgage",
  },
};

const WHO_THIS_IS_FOR = [
  { icon: Briefcase, title: "Executives & C-Suite", desc: "RSU/stock-based compensation, deferred comp, and complex W-2s. We count income others won't." },
  { icon: Building2, title: "Business Owners", desc: "Self-employed with write-offs that suppress taxable income. We look at cash flow, not just your 1040." },
  { icon: Users, title: "Physicians & Professionals", desc: "High DTI from student loans with massive earning trajectories. Portfolio lending solves what conforming can't." },
  { icon: Globe, title: "Foreign Nationals", desc: "Non-resident borrowers purchasing U.S. real estate. No SSN required. Asset-based qualification available." },
  { icon: Home, title: "Multi-Property Investors", desc: "5, 10, 20+ properties. Portfolio lending with no limit on financed properties. Trust and LLC vesting available." },
];

const KEY_NUMBERS = [
  { stat: "$20M+", label: "Loan Amounts", desc: "No arbitrary cap — structured to your net worth" },
  { stat: "$0", label: "PMI on Jumbo", desc: "No private mortgage insurance, ever" },
  { stat: "Flexible", label: "DTI Guidelines", desc: "Asset-based qualification and residual income analysis" },
  { stat: "Portfolio", label: "Lender", desc: "U.S. Bank keeps your loan — relationship banking, not a transaction" },
];

const COMPARISON = [
  { feature: "Loans up to $20M+", us: true, retail: false, competitor: true },
  { feature: "Portfolio lender (keeps your loan)", us: true, retail: false, competitor: true },
  { feature: "RSU/stock income counted", us: true, retail: false, competitor: true },
  { feature: "Asset-based qualification", us: true, retail: false, competitor: true },
  { feature: "Trust and LLC vesting", us: true, retail: false, competitor: true },
  { feature: "Interest-only options", us: true, retail: false, competitor: true },
  { feature: "No PMI on jumbo", us: true, retail: false, competitor: true },
  { feature: "Foreign national eligible", us: true, retail: false, competitor: false },
  { feature: "Free rate renegotiation", us: true, retail: false, competitor: false },
  { feature: "Single point of contact (Sean)", us: true, retail: false, competitor: false },
  { feature: "AI rate monitoring (Rosie)", us: true, retail: false, competitor: false },
  { feature: "Private banking relationship included", us: true, retail: false, competitor: false },
];

const DIFFERENCES = [
  { title: "Your Loan Stays In-House", desc: "U.S. Bank portfolios private wealth mortgages. That means rate renegotiation, low-cost recasting, and a real relationship — not a servicing transfer to a random company 90 days after closing." },
  { title: "One Human. Not a Team.", desc: "Sean personally handles every private wealth client from application to close. No hand-off to a junior processor. No 1-800 number. His cell phone. His expertise. Every time." },
  { title: "Income Flexibility Others Can't Match", desc: "Rental income from 20 properties? RSUs vesting quarterly? K-1 losses that suppress taxable income? Asset depletion for retired borrowers? We structure around your actual financial picture." },
  { title: "Private Banking Access", desc: "Your mortgage relationship unlocks U.S. Bank banking — dedicated private banker, preferred rates on deposits, and concierge treasury services." },
];

export default function PrivateWealthMortgagePage() {
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
              <Landmark size={12} />
              Private Wealth Mortgage &middot; U.S. Bank Division
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-6">
              When Your Loan Doesn&apos;t Fit the Box, You Need Someone Who Builds Custom.
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8 max-w-2xl">
              Jumbo and portfolio mortgage solutions for high-net-worth borrowers.
              Complex income, multiple properties, foreign nationals, trust-held
              assets — Sean structures what others can&apos;t. Backed by U.S.
              Bank Private Wealth.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="https://link.seanshallis.com/widget/bookings/usb_20m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold hover:bg-[color:var(--brand-teal-dark)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Private Consultation
                <ArrowRight size={18} />
              </a>
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold hover:border-neutral-900 transition-colors"
              >
                <DollarSign size={16} />
                Check My Rate
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600">
              <span className="flex items-center gap-2">
                <Shield size={14} /> Confidential consultation
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} /> 20-minute strategy call
              </span>
              <span className="flex items-center gap-2">
                <Star size={14} /> No obligation
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
              Built for Complex Borrowers
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              You don&apos;t need another lender. You need a private wealth mortgage strategist.
            </h2>
            <p className="text-lg text-neutral-600">
              If your income, assets, or property structure doesn&apos;t fit a
              standard underwriting box — you&apos;re in the right place.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
              Private Wealth Advantage
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Numbers that move differently.
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

      {/* The Private Wealth Difference */}
      <section className="py-16 md:py-24 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
                What Makes This Different
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                The Private Wealth Difference
              </h2>
              <p className="text-lg text-neutral-600">
                This isn&apos;t retail mortgage with a higher limit. It&apos;s a
                fundamentally different lending experience.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {DIFFERENCES.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-8 border border-neutral-200"
                >
                  <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
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
                Sean + U.S. Bank vs. Everyone Else
              </h2>
              <p className="text-lg text-neutral-600">
                Not all jumbo lending is created equal.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="grid grid-cols-4 bg-neutral-50 border-b border-neutral-200 text-sm font-bold">
                <div className="px-5 py-4">Feature</div>
                <div className="px-5 py-4 text-center text-[color:var(--brand-teal)]">Sean + U.S. Bank</div>
                <div className="px-5 py-4 text-center text-neutral-400">Retail Jumbo</div>
                <div className="px-5 py-4 text-center text-neutral-400">Private Bank Competitor</div>
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
                    {row.retail ? (
                      <CheckCircle2 size={18} className="text-neutral-400 mx-auto" />
                    ) : (
                      <span className="text-neutral-300">&mdash;</span>
                    )}
                  </div>
                  <div className="px-5 py-3 text-center">
                    {row.competitor ? (
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

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Three steps. White glove throughout.
              </h2>
              <p className="text-lg text-neutral-600">
                High-net-worth lending requires strategy, not just paperwork.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  n: "01",
                  title: "Strategy Call",
                  body: "A confidential 20-minute call with Sean. He maps your income structure, asset picture, and property goals — then designs a custom lending strategy.",
                },
                {
                  n: "02",
                  title: "Custom Structure",
                  body: "Sean builds your loan structure: which income to use, which assets to leverage, optimal term, interest-only vs. amortizing, trust vs. personal name. Tailored to you.",
                },
                {
                  n: "03",
                  title: "White Glove Close",
                  body: "Sean manages every detail through closing. One point of contact. No hand-offs. Private wealth processing lane. Title, appraisal, legal — coordinated seamlessly.",
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
              Private Wealth Mortgage FAQ
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What are the jumbo loan limits?",
                  a: "Conforming loan limits (currently $766,550 in most areas) don't apply here. U.S. Bank offers jumbo portfolio loans from $766,551 to $20M+ with no arbitrary cap. Your loan amount is structured around your financial picture, not a government guideline.",
                },
                {
                  q: "How does asset-based qualification work?",
                  a: "Asset depletion allows you to qualify using liquid assets instead of traditional income. We divide your eligible assets by the loan term to create a qualifying income stream. Ideal for retired executives, business owners between ventures, or borrowers with significant wealth but non-traditional income.",
                },
                {
                  q: "Can RSU and stock compensation count as income?",
                  a: "Yes. U.S. Bank counts vested RSUs, stock options, and deferred compensation as qualifying income. We analyze your vesting schedule and historical grants to determine sustainable income — unlike retail lenders who ignore it entirely.",
                },
                {
                  q: "Can I finance multiple investment properties?",
                  a: "Absolutely. Portfolio lending means no limit on the number of financed properties. Whether you have 5 or 50, we structure each loan based on your total financial picture. No property count restrictions that plague conventional lending.",
                },
                {
                  q: "Can I purchase in a trust or LLC?",
                  a: "Yes. U.S. Bank regularly closes loans vested in revocable trusts, irrevocable trusts, and LLCs. No need to close in personal name and transfer after — we close directly into the entity.",
                },
                {
                  q: "Are foreign nationals eligible?",
                  a: "Yes. Non-resident foreign nationals can purchase U.S. real estate through our private wealth programs. No SSN required. Asset-based qualification available. Typically 30-40% down payment with competitive rates.",
                },
                {
                  q: "Are interest-only options available?",
                  a: "Yes. Interest-only periods of 5, 7, or 10 years are available on private wealth mortgages. This maximizes cash flow and provides flexibility for borrowers who prefer to deploy capital elsewhere during the IO period.",
                },
                {
                  q: "How do rate locks work on jumbo loans?",
                  a: "Extended rate locks up to 90 days are available for jumbo purchases. For new construction, we offer float-down options and extended locks up to 12 months. Sean also monitors rates after lock — if they drop significantly before close, renegotiation is available.",
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
            <Landmark className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Ready for a mortgage that matches your net worth?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Book a confidential 20-minute strategy call with Sean. No
              obligation. No junior staff. Direct access to 30+ years of
              private wealth lending expertise.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://link.seanshallis.com/widget/bookings/usb_20m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-[color:var(--brand-teal)] font-semibold text-base hover:bg-neutral-100 transition-all shadow-xl hover:-translate-y-0.5"
              >
                Book Private Consultation
                <ArrowRight size={18} />
              </a>
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-white/40 text-white font-semibold text-base hover:border-white transition-colors"
              >
                <DollarSign size={16} />
                Check My Rate
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* State Directory */}
      <section className="py-16 md:py-20 bg-[color:var(--brand-cream)] border-t border-neutral-200">
        <Container>
          <StateSelector
            basePath="/private-wealth-mortgage"
            heading="Private Wealth Mortgage — Available in All 50 States"
            subheading="Sean is licensed nationwide. Select your state for local jumbo and luxury market details."
          />
        </Container>
      </section>

      <Footer />
    </main>
  );
}
