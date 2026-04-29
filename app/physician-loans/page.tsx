import Link from "next/link";
import type { Metadata } from "next";
import { StateSelector } from "@/components/ui/state-selector";
import {
  ArrowRight,
  Shield,
  CheckCircle2,
  Stethoscope,
  GraduationCap,
  Home,
  Clock,
  DollarSign,
  Calendar,
  Building2,
  Star,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Physician Mortgage Loans — $0 Down, No PMI | Sean Shallis",
  description:
    "Physician loan programs up to $3M with zero down payment and no PMI. Designed for MDs, DOs, DMDs, residents, and fellows. Flexible student loan qualification. Compare rates, skip the marketplace — get white-glove service backed by U.S. Bank.",
  keywords: [
    "physician mortgage loan",
    "physician mortgage",
    "doctor home loan",
    "physician loan no PMI",
    "physician mortgage NJ",
    "doctor mortgage zero down",
    "resident physician home loan",
    "medical professional mortgage",
    "physician relocation loan",
    "physician mortgage rates",
    "physician mortgage compare rates",
    "doctor loan program",
    "physician home buying",
    "physician disability insurance",
    "physician financial planning",
    "white coat investor mortgage",
    "physician loan refinance",
    "physician mortgage lender",
    "doctor mortgage lender NJ",
    "physician loan student debt",
    "physician own occupation",
    "physician insurance",
    "medical resident mortgage",
    "fellow physician loan",
    "attending physician mortgage",
  ],
  openGraph: {
    title: "Physician Mortgage Loans — $0 Down, No PMI",
    description:
      "Up to $3M, zero down, no PMI. Designed for physicians at every career stage. AI rate monitoring included free. Loans originated through U.S. Bank.",
    type: "website",
    url: "https://seanshallis.com/physician-loans",
  },
  alternates: {
    canonical: "https://seanshallis.com/physician-loans",
  },
};

const PHYSICIAN_TYPES = [
  { icon: Stethoscope, title: "Attending Physicians", desc: "MDs, DOs, DMDs — established or relocating. Up to $3M, zero down." },
  { icon: GraduationCap, title: "Residents & Fellows", desc: "Qualify on your signed contract, not your current salary. We understand the trajectory." },
  { icon: Building2, title: "Group Practice Owners", desc: "Buying your first practice space? Commercial and residential lending under one roof." },
  { icon: Home, title: "Relocating Physicians", desc: "Moving for a new role? Close before you start. We move at physician speed." },
];

const ADVANTAGES = [
  { stat: "$0", label: "Down Payment", desc: "Up to 100% financing on homes up to $3M" },
  { stat: "$0", label: "PMI — Ever", desc: "No private mortgage insurance, regardless of LTV" },
  { stat: "Flexible", label: "Student Loan DTI", desc: "We underwrite based on your earning trajectory, not your current IBR payment" },
  { stat: "30 Days", label: "Average Close", desc: "Sean's team moves fast — physician-specific processing lane" },
];

const COMPARISON = [
  { feature: "Zero down up to $3M", us: true, them: false },
  { feature: "No PMI at any LTV", us: true, them: false },
  { feature: "Student loan-friendly DTI", us: true, them: false },
  { feature: "Portfolio lender (keeps your loan)", us: true, them: false },
  { feature: "Free rate renegotiation before funding", us: true, them: false },
  { feature: "Loan recasting for $250", us: true, them: false },
  { feature: "AI rate monitoring (Rosie)", us: true, them: false },
  { feature: "Lifetime relationship with Sean", us: true, them: false },
];

const TESTIMONIALS = [
  {
    quote: "I thought my student loans would keep me from buying for years. Sean got me into a zero-down physician loan in 28 days. No PMI. My colleagues couldn't believe it.",
    name: "Dr. M.P.",
    role: "Internal Medicine, relocating to NJ",
  },
  {
    quote: "Sean understood the physician timeline — I was closing on a house while finishing fellowship. He made it seamless. Rosie's been watching my rate ever since.",
    name: "Dr. A.K.",
    role: "Cardiology Fellow → Attending",
  },
  {
    quote: "We refinanced with Sean and saved $420/month. His ARM strategy with Rosie monitoring was the move nobody else suggested.",
    name: "Dr. R.S.",
    role: "Orthopedic Surgery, NJ",
  },
];

export default function PhysicianLoansPage() {
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
              <Stethoscope size={12} />
              Physician Loan Specialist &middot; U.S. Bank
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-6">
              The Loan Program Your Residency Director Never Told You About.
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8 max-w-2xl">
              $0 down. No PMI. Student loan-friendly. Up to $3M. Designed
              exclusively for physicians — and backed by 30 years of mortgage
              wisdom you won&apos;t find at a big-box lender.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold hover:bg-[color:var(--brand-teal-dark)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                See What You Qualify For
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
              Built for Your Career Stage
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Whether you&apos;re in residency or running the department.
            </h2>
            <p className="text-lg text-neutral-600">
              Sean&apos;s married to a physician. He gets the timeline, the
              student debt, the relocations, and the earning curve.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {PHYSICIAN_TYPES.map((item) => (
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

      {/* The Numbers */}
      <section className="py-16 md:py-24 bg-[color:var(--surface-dark)] text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[color:var(--brand-gold)] uppercase tracking-widest text-xs font-bold mb-3">
              The Physician Advantage
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Numbers that move the needle.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {ADVANTAGES.map((item) => (
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
                Sean + U.S. Bank vs. Everyone Else
              </h2>
              <p className="text-lg text-neutral-600">
                Most lenders offer physician loans. Very few offer physician
                lending <em>strategy</em>.
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
                Three steps. Zero stress.
              </h2>
              <p className="text-lg text-neutral-600">
                Most physicians spend 40+ hours shopping lenders. This takes 90 seconds to start.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  n: "01",
                  title: "Talk to Rosie",
                  body: "Tell Rosie about your situation — buying, refinancing, relocating. 90 seconds, no forms, no credit impact. She calculates your Savings Score.",
                },
                {
                  n: "02",
                  title: "Rosie Watches",
                  body: "Rosie monitors rates multiple times a day. She knows your loan structure, your goals, and exactly when a savings window opens.",
                },
                {
                  n: "03",
                  title: "Sean Closes It",
                  body: "When the window opens, Sean calls you personally. One phone call. White glove. Loans originated through U.S. Bank's physician lending team.",
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

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white border-y border-neutral-200">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Physicians trust Sean.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-[color:var(--brand-cream)] rounded-2xl p-8 border border-neutral-200"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className="text-[color:var(--brand-gold)] fill-[color:var(--brand-gold)]" />
                  ))}
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-neutral-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Sean's Credibility — Physician-Specific */}
      <section className="py-16 md:py-24 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
              Why Physicians Choose Sean
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              He&apos;s not just a loan officer. He&apos;s family.
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Sean is married to a physician. He&apos;s lived the 80-hour weeks,
              the relocations, the student loan weight, and the delayed
              gratification. He built Rosie because physicians deserve someone
              watching out for them — even when they&apos;re too busy to watch
              for themselves.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-left max-w-lg mx-auto mb-10">
              {[
                "30+ years, $1B+ in closed transactions",
                "Married to a physician",
                "Amazon #1 best-selling author",
                "WSJ, NYT, Bloomberg, CNBC featured",
                "Mortgage Loan Originator, U.S. Bank",
                "Creator of Rate Guardian AI (Rosie)",
                "NLP Practitioner, U.S. Army Veteran",
                "Host: The Loan Doctor Podcast",
              ].map((point) => (
                <div key={point} className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-[color:var(--brand-teal)] flex-shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-neutral-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ — SEO + Objection Handling */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Physician Loan FAQ
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Can I qualify with $300K+ in student loans?",
                  a: "Yes. Physician loan programs use income-based repayment or a percentage of your balance for DTI — not the full payment. Sean specializes in structuring these loans to maximize your purchasing power.",
                },
                {
                  q: "I'm still in residency. Can I buy now?",
                  a: "Absolutely. With a signed employment contract, you can qualify based on your attending salary — not your resident income. Many physicians buy 60-90 days before starting their new role.",
                },
                {
                  q: "What's the catch with zero down and no PMI?",
                  a: "No catch. Physician loan programs exist because banks know doctors are low-risk borrowers with high earning trajectories. U.S. Bank portfolios these loans — they want the long-term relationship.",
                },
                {
                  q: "How is this different from other physician lenders?",
                  a: "Most lenders sell your loan after closing. U.S. Bank keeps it on their books — which means free rate renegotiation, low-cost recasting, and Sean as your lifelong point of contact. Plus Rosie monitors your rate daily, for free, forever.",
                },
                {
                  q: "What types of properties qualify?",
                  a: "Primary residences, including condos and townhomes. Up to $3M. Single-close construction-to-permanent loans are also available if you're building.",
                },
                {
                  q: "Is there really no cost for the rate monitoring?",
                  a: "Zero. Rosie watches your rate multiple times a day and alerts you when a savings window opens. No subscription, no hidden fees. Sean built it because physicians are too busy to watch rates themselves.",
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
            <Stethoscope className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Ready to see what you qualify for?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              90 seconds with Rosie. No credit impact. No obligation.
              Or book a 20-minute strategy call with Sean — free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-[color:var(--brand-teal)] font-semibold text-base hover:bg-neutral-100 transition-all shadow-xl hover:-translate-y-0.5"
              >
                Check My Rate Now
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

      {/* State Directory — Internal Linking + SEO */}
      <section className="py-16 md:py-20 bg-[color:var(--brand-cream)] border-t border-neutral-200">
        <Container>
          <StateSelector
            basePath="/physician-loans"
            heading="Physician Loans — Available in All 50 States"
            subheading="Sean is licensed nationwide. Select your state for local details."
          />
        </Container>
      </section>

      <Footer />
    </main>
  );
}
