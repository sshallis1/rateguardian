import Link from "next/link";
import type { Metadata } from "next";
import { STATES } from "@/lib/states";
import { StateSelector } from "@/components/ui/state-selector";
import {
  ArrowRight,
  Shield,
  CheckCircle2,
  Clock,
  DollarSign,
  Calendar,
  Star,
  Users,
  Award,
  Home,
  RefreshCw,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "VA Loans — $0 Down, No PMI, No Minimum Credit Score | Sean Shallis",
  description:
    "VA loan programs with zero down payment, no PMI, and no minimum credit score requirement. Sean Shallis is a U.S. Army Veteran and VA loan specialist with 30+ years experience and $1B+ in transactions. AI rate monitoring included free. Backed by U.S. Bank.",
  keywords: [
    "VA loan",
    "VA mortgage",
    "veteran home loan",
    "VA loan no down payment",
    "VA loan no PMI",
    "VA IRRRL",
    "VA streamline refinance",
    "veteran mortgage",
    "military home loan",
    "VA loan eligibility",
    "VA loan rates",
    "VA construction loan",
    "VA loan specialist",
    "veteran loan officer",
    "VA funding fee",
    "VA loan COE",
    "VA loan second use",
    "VA physician loan",
    "active duty home loan",
    "military relocation mortgage",
    "VA loan lender",
    "veteran mortgage specialist",
  ],
  openGraph: {
    title: "VA Loans — $0 Down, No PMI | U.S. Army Veteran Loan Officer",
    description:
      "$0 down. No PMI. No minimum credit score. The most powerful mortgage benefit in America — backed by a veteran who knows how to maximize it.",
    type: "website",
    url: "https://seanshallis.com/va-loans",
  },
  alternates: {
    canonical: "https://seanshallis.com/va-loans",
  },
};

const TARGET_AUDIENCE = [
  { icon: Users, title: "Active Duty Transitioning", desc: "PCSing or separating soon? Lock in your rate before you leave service. Close on time, every time." },
  { icon: Award, title: "Recently Separated Veterans", desc: "Just got out? Your VA benefit is waiting. Zero down, no PMI, competitive rates from day one." },
  { icon: Home, title: "Retired Military", desc: "Whether it's your first home or your fifth — your VA benefit never expires. Use it again and again." },
  { icon: Star, title: "Veteran Physicians", desc: "Double benefit: VA loan + physician program advantages. Sean structures the best of both worlds." },
];

const ADVANTAGES = [
  { stat: "$0", label: "Down Payment", desc: "100% financing — no down payment required, ever" },
  { stat: "$0", label: "PMI — Ever", desc: "No private mortgage insurance at any loan-to-value ratio" },
  { stat: "None", label: "Min. Credit Score", desc: "No VA-mandated minimum — flexible underwriting for veterans" },
  { stat: "$0", label: "Prepayment Penalty", desc: "Pay off your loan early with zero penalty, anytime" },
];

const BENEFITS = [
  "$0 down payment on any loan amount",
  "No PMI — ever",
  "No prepayment penalty",
  "Competitive interest rates (typically lower than conventional)",
  "Lenient credit requirements — no VA minimum score",
  "VA IRRRL streamline refinance available",
  "Construction-to-permanent loans available",
  "Assumable loan (huge advantage in high-rate environments)",
];

const COMPARISON = [
  { feature: "Portfolio lender (keeps your loan)", us: true, them: false },
  { feature: "AI rate monitoring (Rosie)", us: true, them: false },
  { feature: "Veteran-to-veteran relationship", us: true, them: false },
  { feature: "Construction-to-perm with VA", us: true, them: false },
  { feature: "Physician + VA combination programs", us: true, them: false },
  { feature: "Free rate renegotiation before funding", us: true, them: false },
  { feature: "Loan recasting for $250", us: true, them: false },
  { feature: "Lifetime relationship with your loan officer", us: true, them: false },
];

const TESTIMONIALS = [
  {
    quote: "After 22 years in the Army, I wanted someone who understood my world. Sean's a veteran himself — he got my LES, my BAH, my timeline. Closed in 24 days, zero down.",
    name: "MSG R.T. (Ret.)",
    role: "U.S. Army, Fort Liberty area",
  },
  {
    quote: "I'm a physician AND a veteran. Sean structured a loan that combined both benefits — better rate than VA alone, better terms than physician alone. Nobody else even suggested it.",
    name: "Dr. J.M.",
    role: "Navy Veteran, Internal Medicine",
  },
  {
    quote: "Used my VA loan for the third time. Sean walked me through restoring my entitlement and got me into a new home with zero down while I still had my rental. Rosie found us a rate drop 4 months later.",
    name: "SSgt K.W.",
    role: "USAF Veteran, relocating to TX",
  },
];

export default function VALoansPage() {
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
              <Shield size={12} />
              VA Loan Specialist &middot; U.S. Army Veteran &middot; U.S. Bank
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-6">
              You Served Your Country. Now Let Someone Serve You.
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8 max-w-2xl">
              $0 down. No PMI. No minimum credit score requirement. The VA loan
              is the most powerful mortgage benefit in America — and Sean is a
              veteran who knows how to maximize it.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold hover:bg-[color:var(--brand-teal-dark)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Check My VA Rate
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
              Built for Those Who Served
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Every branch. Every era. Every mission.
            </h2>
            <p className="text-lg text-neutral-600">
              Sean is a U.S. Army Veteran. He speaks your language, understands
              your timeline, and knows how to maximize the benefit you earned.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TARGET_AUDIENCE.map((item) => (
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
              The VA Loan Advantage
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Benefits you earned. Numbers that prove it.
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

      {/* Key Benefits List */}
      <section className="py-16 md:py-24 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                The VA loan benefit — unlocked.
              </h2>
              <p className="text-lg text-neutral-600">
                Here&apos;s what your service earned you. Sean makes sure you get every bit of it.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl mx-auto">
              {BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-[color:var(--brand-teal)] flex-shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-neutral-700 leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Sean + U.S. Bank vs. Typical VA Lender
              </h2>
              <p className="text-lg text-neutral-600">
                Most lenders process VA loans. Sean <em>strategizes</em> them — because he&apos;s been on your side of the desk.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="grid grid-cols-3 bg-neutral-50 border-b border-neutral-200 text-sm font-bold">
                <div className="px-6 py-4">Feature</div>
                <div className="px-6 py-4 text-center text-[color:var(--brand-teal)]">Sean + U.S. Bank</div>
                <div className="px-6 py-4 text-center text-neutral-400">Typical VA Lender</div>
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
                Three steps. Mission complete.
              </h2>
              <p className="text-lg text-neutral-600">
                You spent years navigating bureaucracy. This takes 90 seconds to start.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  n: "01",
                  title: "Talk to Rosie",
                  body: "Tell Rosie about your situation — buying, refinancing, IRRRL, construction. 90 seconds, no forms, no credit impact. She calculates your Savings Score.",
                },
                {
                  n: "02",
                  title: "Rosie Watches",
                  body: "Rosie monitors VA rates multiple times a day. She knows your loan structure, your entitlement status, and exactly when a savings window opens.",
                },
                {
                  n: "03",
                  title: "Sean Closes It",
                  body: "When the window opens, Sean calls you personally. Veteran to veteran. One phone call. White glove. Backed by U.S. Bank.",
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
              Veterans trust Sean.
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

      {/* Sean's Credibility — Veteran-Specific */}
      <section className="py-16 md:py-24 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
              Why Veterans Choose Sean
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              He&apos;s not just a loan officer. He&apos;s a brother in arms.
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Sean is a U.S. Army Veteran. He knows what it means to serve, to
              sacrifice, and to earn a benefit that most lenders treat like just
              another checkbox. He built Rosie because veterans deserve someone
              watching their six — even after they hang up the uniform.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-left max-w-lg mx-auto mb-10">
              {[
                "U.S. Army Veteran",
                "30+ years, $1B+ in closed transactions",
                "Amazon #1 best-selling author",
                "WSJ, NYT, Bloomberg, CNBC featured",
                "U.S. Bank — portfolio lender",
                "Creator of Rate Guardian AI (Rosie)",
                "NLP Practitioner",
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
              VA Loan FAQ
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Who is eligible for a VA loan?",
                  a: "Veterans, active-duty service members, National Guard and Reserve members (with qualifying service), and surviving spouses of veterans who died in service or from a service-connected disability. Generally, you need 90 days of active-duty service during wartime, or 181 days during peacetime, or 6 years in the Guard/Reserves.",
                },
                {
                  q: "What is a Certificate of Eligibility (COE) and how do I get one?",
                  a: "Your COE proves to the lender that you qualify for a VA loan. Sean can pull it electronically in minutes through the VA's system. You don't need to request it yourself — Sean handles it as part of the process.",
                },
                {
                  q: "What is the VA funding fee?",
                  a: "The funding fee is a one-time charge (typically 1.25%–3.3% depending on service type, down payment, and usage) that funds the VA loan program. It can be rolled into your loan. Veterans with service-connected disabilities are exempt. Sean will calculate your exact fee upfront — no surprises.",
                },
                {
                  q: "Can I use my VA loan more than once?",
                  a: "Absolutely. There's no limit to how many times you can use your VA loan benefit. You can even have two VA loans simultaneously if you have remaining entitlement. Sean specializes in helping veterans restore and reuse their entitlement strategically.",
                },
                {
                  q: "Can I combine VA benefits with a physician loan program?",
                  a: "Yes — and this is Sean's specialty. As both a VA loan specialist and physician lender, Sean can structure loans that leverage both benefits. Veteran physicians often get better rates, higher limits, and more flexible terms than either program alone.",
                },
                {
                  q: "What is the VA IRRRL (Interest Rate Reduction Refinance Loan)?",
                  a: "The IRRRL — also called a VA Streamline Refinance — lets you refinance your existing VA loan with minimal paperwork, no appraisal required, and often no out-of-pocket costs. Rosie monitors your rate daily and alerts you the moment an IRRRL makes financial sense.",
                },
                {
                  q: "Can I build a home with a VA loan?",
                  a: "Yes. U.S. Bank offers VA construction-to-permanent loans — a single close that covers your build and converts to your permanent VA mortgage. Zero down, no PMI, one closing. Sean has guided dozens of veterans through new construction.",
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
            <Shield className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Ready to use the benefit you earned?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              90 seconds with Rosie. No credit impact. No obligation.
              Or book a 20-minute strategy call with Sean — veteran to veteran.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-[color:var(--brand-teal)] font-semibold text-base hover:bg-neutral-100 transition-all shadow-xl hover:-translate-y-0.5"
              >
                Check My VA Rate
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
            basePath="/va-loans"
            heading="VA Loans — Available in All 50 States"
            subheading="Sean is licensed nationwide. Select your state for local VA loan details and military base info."
          />
        </Container>
      </section>

      <Footer />
    </main>
  );
}
