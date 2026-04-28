import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  MapPin,
  GraduationCap,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { STATES, getStateBySlug } from "@/lib/states";

interface PageProps {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params;
  const data = getStateBySlug(state);
  if (!data) return {};

  const cities = data.majorCities.slice(0, 3).join(", ");
  return {
    title: `Renovation Loans in ${data.name} — Purchase + Reno in One Close`,
    description: `Renovation-to-permanent loans in ${data.name} (${cities}). Finance up to 90% of after-renovation value. Single close, no HELOC needed. AI budget tracking with Project Guardian. Backed by U.S. Bank Private Wealth.`,
    keywords: [
      `renovation loan ${data.name}`,
      `renovation loan ${data.abbr}`,
      `renovation to permanent loan ${data.name}`,
      `buy and renovate loan ${data.name}`,
      `fixer upper financing ${data.name}`,
      `rehab loan ${data.name}`,
      `renovation mortgage ${data.name}`,
      `fixer upper financing ${data.abbr}`,
      `rehab loan ${data.abbr}`,
      `renovation mortgage ${data.abbr}`,
      ...data.majorCities.map((c) => `renovation loan ${c}`),
      ...data.majorCities.map((c) => `buy and renovate loan ${c}`),
      ...data.majorCities.map((c) => `fixer upper financing ${c}`),
    ],
    openGraph: {
      title: `Renovation Loans in ${data.name} — Purchase + Reno in One Close`,
      description: `Finance up to 90% of after-renovation value in ${data.name}. Single close. AI budget tracking included. Backed by U.S. Bank.`,
      type: "website",
      url: `https://seanshallis.com/renovation-loans/${data.slug}`,
    },
    alternates: {
      canonical: `https://seanshallis.com/renovation-loans/${data.slug}`,
    },
  };
}

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

export default async function RenovationLoansStatePage({ params }: PageProps) {
  const { state } = await params;
  const data = getStateBySlug(state);
  if (!data) notFound();

  const cities = data.majorCities;
  const schools = data.medicalSchools;
  const systems = data.healthSystems;

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
              <MapPin size={12} />
              Renovation Loans &middot; {data.name}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
              Renovation Loans in {data.name} &mdash;{" "}
              <span className="text-[color:var(--brand-teal)]">
                Purchase + Reno in One Close.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-4 max-w-2xl">
              Whether you&apos;re buying a fixer in {cities[0]}, doing a gut
              renovation in {cities[1] || cities[0]}, or upgrading your{" "}
              {data.name} home to dream-home spec — Sean Shallis structures
              renovation-to-permanent loans nationwide.
            </p>
            <p className="text-lg text-neutral-500 mb-8 max-w-2xl">
              Finance up to 90% of after-renovation value. Single close. No
              HELOC needed. AI budget tracking included. Backed by U.S. Bank
              Private Wealth.
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

      {/* State-Specific Context */}
      <section className="py-16 md:py-24 bg-white border-y border-neutral-200">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
                Renovation Lending in {data.name}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {data.name} renovators deserve a lender who gets it.
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                Sean Shallis is a national renovation loan specialist backed by
                U.S. Bank Private Wealth. He structures renovation-to-permanent
                loans that combine your purchase and renovation into a single
                close — financed against what the home will be worth after the
                work is done, not what it looks like today.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Whether you&apos;re buying a fixer in {cities[0]}, doing a major
                renovation in {cities[1] || cities[0]}, or an investor doing
                value-add work in {data.name} — Sean&apos;s renovation loan
                programs are available nationwide with the same white-glove
                service and AI budget tracking.
              </p>

              <div className="space-y-4">
                {[
                  { n: "01", title: "Plan the Reno", body: `Tell Sean about your ${data.name} renovation vision. He structures the loan around the after-renovation value — not what the property is worth today.` },
                  { n: "02", title: "Finance It All", body: `One loan covers your ${data.name} purchase (or refinance) plus the full renovation budget. Funds held in escrow, released as work completes.` },
                  { n: "03", title: "Build with AI Tracking", body: "Project Guardian monitors your renovation spend in real time. Draw requests, change orders, budget overruns — you'll know before your contractor does." },
                ].map((s) => (
                  <div key={s.n} className="flex gap-4">
                    <div className="text-2xl font-mono font-bold text-[color:var(--brand-teal)] w-10 shrink-0">
                      {s.n}
                    </div>
                    <div>
                      <div className="font-bold mb-0.5">{s.title}</div>
                      <div className="text-sm text-neutral-600">{s.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Program cards */}
              {[
                { icon: Home, title: "Buy & Renovate in " + data.name, desc: `Found a fixer in ${cities[0]} or ${cities[1] || cities[0]}? Finance the purchase and full renovation in one loan. No separate construction financing.` },
                { icon: Wrench, title: "Major Home Upgrade", desc: `${data.name} homeowners doing $100K+ renovations — kitchens, additions, full gut rehabs. Skip the HELOC and lock a single rate.` },
                { icon: Star, title: "Physician Renovators", desc: `Physicians in ${data.name} upgrading to dream-home spec. Combine with physician loan benefits for maximum purchasing power.` },
                { icon: TrendingUp, title: "Value-Add Investors", desc: `Investors doing value-add renovation on ${data.name} properties. Finance based on what the property will be worth after the work.` },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[color:var(--brand-cream)] rounded-2xl p-6 border border-neutral-200 hover:border-[color:var(--brand-teal)] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[color:var(--brand-teal)]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-[color:var(--brand-teal)]" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Key Numbers */}
      <section className="py-16 md:py-20 bg-[color:var(--surface-dark)] text-white">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { stat: "90%", label: "After-Reno Value", desc: "Finance up to 90% of the after-renovation appraised value" },
              { stat: "1", label: "Single Close", desc: "One loan, one closing, one rate — purchase + renovation combined" },
              { stat: "$0", label: "HELOC Needed", desc: "No separate home equity line or construction loan required" },
              { stat: "AI", label: "Budget Tracking", desc: "Project Guardian watches your contractor spend in real time" },
            ].map((item) => (
              <div key={item.label} className="text-center p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="text-3xl font-black text-[color:var(--brand-teal-light)] mb-1">{item.stat}</div>
                <div className="text-sm font-bold text-white mb-2">{item.label}</div>
                <p className="text-xs text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Sean + U.S. Bank vs. {data.name} Alternatives
            </h2>
            <p className="text-center text-neutral-600 mb-10">
              HELOCs, FHA 203k, and traditional construction loans all have trade-offs.
              Here&apos;s how Sean&apos;s program compares for {data.name} renovators.
            </p>
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
                    {row.us ? <CheckCircle2 size={18} className="text-[color:var(--brand-teal)] mx-auto" /> : <span className="text-neutral-300">&mdash;</span>}
                  </div>
                  <div className="px-5 py-3 text-center">
                    {row.heloc ? <CheckCircle2 size={18} className="text-neutral-400 mx-auto" /> : <span className="text-neutral-300">&mdash;</span>}
                  </div>
                  <div className="px-5 py-3 text-center">
                    {row.fha203k ? <CheckCircle2 size={18} className="text-neutral-400 mx-auto" /> : <span className="text-neutral-300">&mdash;</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Local Context — Cities */}
      <section className="py-16 md:py-20 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Renovation Loans Across {data.name}
            </h2>
            <p className="text-center text-neutral-600 mb-10">
              Sean works with renovators in every {data.name} market — and nationwide.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => (
                <div key={city} className="bg-white rounded-xl p-5 border border-neutral-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-[color:var(--brand-teal)]" />
                    <span className="font-bold text-sm">{city}, {data.abbr}</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Renovation-to-permanent loans for buyers and homeowners renovating in {city}. Finance based on after-renovation value.
                  </p>
                </div>
              ))}
              {systems.map((sys) => (
                <div key={sys} className="bg-white rounded-xl p-5 border border-neutral-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 size={14} className="text-[color:var(--brand-teal)]" />
                    <span className="font-bold text-sm">{sys}</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Physicians and staff near {sys} can combine renovation loans with physician loan benefits.
                  </p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Renovation Loan FAQ &mdash; {data.name}
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: `What's the minimum renovation amount for a ${data.name} property?`,
                  a: `The program works best for renovations of $75K or more on ${data.name} properties. For smaller projects, a HELOC or personal loan may be simpler. Sean will help you determine the right structure based on your scope of work.`,
                },
                {
                  q: `How does after-renovation value work in ${data.name}?`,
                  a: `The appraiser evaluates what your ${data.name} home will be worth after the planned renovation — based on your contractor's scope of work and local comparable sales in ${cities[0]}, ${cities[1] || cities[0]}, and surrounding areas. You can finance up to 90% of that future value.`,
                },
                {
                  q: `What are the contractor requirements in ${data.name}?`,
                  a: `Your contractor must be licensed in ${data.name}, insured, and provide a detailed scope of work with line-item budget. Sean's team reviews the bid to ensure it aligns with the appraisal. You can use your own contractor — no approved-list restriction.`,
                },
                {
                  q: "How long does the renovation period last?",
                  a: "Typical renovation periods are 6-12 months, depending on scope. During this time you pay interest-only on the drawn amount. Once the reno is complete, the loan converts to your permanent mortgage automatically.",
                },
                {
                  q: `Can I combine a renovation loan with a physician loan in ${data.name}?`,
                  a: `Yes. Physicians in ${data.name} can access renovation-to-permanent financing with physician loan benefits — including favorable DTI treatment of student loans. Sean structures these regularly for physicians at ${schools[0] || data.name + " institutions"} and across the state.`,
                },
                {
                  q: "How is this different from an FHA 203k?",
                  a: "No FHA mortgage insurance premiums (saving you hundreds per month), no HUD consultant requirement, higher loan limits (jumbo-eligible), and faster processing. Sean's program is conventional — cleaner, simpler, and often cheaper long-term.",
                },
                {
                  q: `Why not just use a HELOC for my ${data.name} renovation?`,
                  a: `A HELOC requires existing equity in your ${data.name} property, has a variable rate, and doesn't protect your renovation budget in escrow. Sean's renovation loan finances based on future value, locks your rate, and holds funds in escrow so your budget is protected.`,
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
              Ready to finance your {data.name} renovation?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              90 seconds with Rosie to get your renovation budget estimate. No
              credit impact. No obligation. Or book a 20-minute strategy call
              with Sean.
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

      {/* Internal linking footer */}
      <section className="py-10 bg-[color:var(--brand-cream)] border-t border-neutral-200">
        <Container>
          <div className="text-center text-sm text-neutral-500">
            <Link href="/renovation-loans" className="text-[color:var(--brand-teal)] hover:underline font-medium">
              Renovation Loans &mdash; All States
            </Link>
            <span className="mx-2">|</span>
            <Link href="/physician-loans" className="text-[color:var(--brand-teal)] hover:underline font-medium">
              Physician Loans
            </Link>
            <span className="mx-2">|</span>
            <Link href="/rate-guardian" className="text-[color:var(--brand-teal)] hover:underline font-medium">
              Rate Guardian
            </Link>
            <span className="mx-2">|</span>
            <Link href="/about" className="text-[color:var(--brand-teal)] hover:underline font-medium">
              About Sean
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
