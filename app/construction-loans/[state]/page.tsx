import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  Ruler,
  TrendingUp,
  MapPin,
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
    title: `Construction Loans in ${data.name} — Single Close, Zero Surprises`,
    description: `Construction-to-permanent financing in ${data.name} (${cities}). Single close saves $5-15K. Interest-only during build. One rate lock. Draw schedule managed by Sean. Backed by U.S. Bank Private Wealth.`,
    keywords: [
      `construction loan ${data.name}`,
      `construction loan ${data.abbr}`,
      `construction to permanent loan ${data.name}`,
      `single close construction loan ${data.name}`,
      `build a home ${data.name}`,
      `renovation loan ${data.name}`,
      `construction mortgage ${data.name}`,
      `new construction financing ${data.abbr}`,
      `construction loan lender ${data.name}`,
      ...data.majorCities.map((c) => `single close construction loan ${c}`),
      ...data.majorCities.map((c) => `construction loan ${c}`),
      ...data.majorCities.map((c) => `build a home ${c}`),
      ...data.majorCities.map((c) => `renovation loan ${c}`),
      ...data.majorCities.map((c) => `construction mortgage ${c}`),
    ],
    openGraph: {
      title: `Construction Loans in ${data.name} — Single Close, Zero Surprises`,
      description: `Construction-to-permanent financing in ${data.name}. One close. Interest-only during build. Backed by U.S. Bank.`,
      type: "website",
      url: `https://seanshallis.com/construction-loans/${data.slug}`,
    },
    alternates: {
      canonical: `https://seanshallis.com/construction-loans/${data.slug}`,
    },
  };
}

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

export default async function ConstructionLoansStatePage({ params }: PageProps) {
  const { state } = await params;
  const data = getStateBySlug(state);
  if (!data) notFound();

  const cities = data.majorCities;

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
              Construction Loans &middot; {data.name}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
              Construction Loans in {data.name} —{" "}
              <span className="text-[color:var(--brand-teal)]">
                One Close. Zero Surprises.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-4 max-w-2xl">
              Whether you&apos;re building a custom home in {cities[0]},
              renovating in {cities[1] || cities[0]}, or developing in{" "}
              {cities[2] || cities[0]} — Sean Shallis structures
              construction-to-permanent loans that save you $5-15K in double
              closing costs.
            </p>
            <p className="text-lg text-neutral-500 mb-8 max-w-2xl">
              Single close. Interest-only during build. One rate lock. Draw
              schedule managed. Backed by U.S. Bank Private Wealth.
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

      {/* State-Specific Context + Who This Is For */}
      <section className="py-16 md:py-24 bg-white border-y border-neutral-200">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
                Construction Lending in {data.name}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {data.name} builders deserve a lender who manages the details.
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                Sean Shallis is a national construction loan specialist backed by
                U.S. Bank Private Wealth. He structures single-close
                construction-to-permanent loans that eliminate double closing
                costs, lock your rate before you break ground, and keep the draw
                schedule on track so your builder gets paid on time.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Whether you&apos;re building a custom home in {cities[0]}, doing
                a gut renovation in {cities[1] || cities[0]}, or combining
                construction financing with a physician loan — Sean&apos;s
                construction programs are available nationwide with the same
                white-glove service.
              </p>

              <div className="space-y-4">
                {[
                  {
                    n: "01",
                    title: "Plan with Sean",
                    body: `Share your ${data.name} build plans, budget, and timeline. Sean structures a single-close loan covering lot, construction, and permanent mortgage in one.`,
                  },
                  {
                    n: "02",
                    title: "Build with Confidence",
                    body: `During construction, pay interest-only on funds drawn. Sean manages the draw schedule with your ${data.name} builder — releasing funds at each milestone.`,
                  },
                  {
                    n: "03",
                    title: "Move In with One Mortgage",
                    body: "When construction completes, your loan converts automatically. No second closing. No re-qualification. No surprises.",
                  },
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
              {[
                {
                  icon: Home,
                  title: "Custom Build in " + data.name,
                  desc: `Building from the ground up in ${cities[0]} or ${cities[1] || cities[0]}? One loan, one close, one rate lock from dirt to doorstep.`,
                },
                {
                  icon: Ruler,
                  title: "Major Renovation",
                  desc: `Gut renos and renovation-to-permanent projects in ${data.name}. Transform an existing structure without juggling multiple loans.`,
                },
                {
                  icon: Building2,
                  title: "Physician Builders",
                  desc: `Physicians building in ${data.name} can combine construction-to-perm with physician loan benefits. Student loan-friendly DTI available.`,
                },
                {
                  icon: TrendingUp,
                  title: "Investment Builders",
                  desc: `Developing rental or investment properties in ${data.name}? Competitive terms for experienced investors with $100K+ projects.`,
                },
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
              { stat: "$0", label: "Double-Close Costs", desc: "Single close saves $5-15K vs. two-close construction loans" },
              { stat: "Interest-Only", label: "During Build", desc: "Pay only interest on funds drawn — not the full loan amount" },
              { stat: "One", label: "Rate Lock", desc: "Lock your permanent rate before construction begins" },
              { stat: "12-18 Mo", label: "Build Window", desc: "Generous construction timeline with extension options" },
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
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Sean + U.S. Bank vs. {data.name} Construction Lenders
            </h2>
            <p className="text-center text-neutral-600 mb-10">
              Most {data.name} lenders require two closings and leave you managing the draw schedule yourself.
            </p>
            <div className="rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="grid grid-cols-3 bg-neutral-50 border-b border-neutral-200 text-sm font-bold">
                <div className="px-6 py-4">Feature</div>
                <div className="px-6 py-4 text-center text-[color:var(--brand-teal)]">Sean + U.S. Bank</div>
                <div className="px-6 py-4 text-center text-neutral-400">Typical {data.abbr} Lender</div>
              </div>
              {COMPARISON.map((row) => (
                <div key={row.feature} className="grid grid-cols-3 border-b border-neutral-100 last:border-0">
                  <div className="px-6 py-3 text-sm text-neutral-700">{row.feature}</div>
                  <div className="px-6 py-3 text-center">
                    {row.us ? <CheckCircle2 size={18} className="text-[color:var(--brand-teal)] mx-auto" /> : <span className="text-neutral-300">—</span>}
                  </div>
                  <div className="px-6 py-3 text-center">
                    {row.them ? <CheckCircle2 size={18} className="text-neutral-400 mx-auto" /> : <span className="text-neutral-300">—</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Local Build Context */}
      <section className="py-16 md:py-20 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Building Across {data.name}
            </h2>
            <p className="text-center text-neutral-600 mb-10">
              Sean works with builders and developers across every {data.name} market — and nationwide.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => (
                <div key={city} className="bg-white rounded-xl p-5 border border-neutral-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-[color:var(--brand-teal)]" />
                    <span className="font-bold text-sm">{city}, {data.abbr}</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Construction-to-permanent loans available for custom builds and renovations in {city}.
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
              Construction Loan FAQ — {data.name}
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: `What's the difference between single-close and two-close construction loans in ${data.name}?`,
                  a: `A two-close loan requires separate closings (and separate fees) for the construction phase and permanent mortgage. Sean's single-close program combines both into one loan — saving ${data.name} builders $5-15K in duplicate closing costs and eliminating the risk of rate changes or re-qualification between phases.`,
                },
                {
                  q: `What's the minimum project size for a construction loan in ${data.name}?`,
                  a: `The minimum project size is $100K. This applies to both new construction and renovation-to-permanent projects in ${data.name}. There's no maximum — Sean regularly structures construction loans for custom builds well into the millions.`,
                },
                {
                  q: `Can I do a renovation-to-permanent loan in ${data.name}?`,
                  a: `Yes. If you're doing a gut renovation or major structural work on a ${data.name} property, renovation-to-permanent financing rolls your purchase (or refinance), renovation costs, and permanent mortgage into a single close.`,
                },
                {
                  q: "How does the draw schedule work?",
                  a: `Funds are released to your ${data.name} builder at pre-agreed milestones (foundation, framing, mechanical, etc.). Sean coordinates inspections and approvals so draws are released promptly. You only pay interest on funds that have been drawn — not the full loan amount.`,
                },
                {
                  q: `Can I combine a construction loan with a physician loan in ${data.name}?`,
                  a: `Yes. Physicians building custom homes in ${data.name} can access construction-to-permanent financing with physician loan benefits including favorable DTI treatment for student loans. This is one of Sean's specialties.`,
                },
                {
                  q: `Can I include lot purchase in my ${data.name} construction loan?`,
                  a: `Yes. If you haven't purchased your ${data.name} lot yet, the single-close loan can include lot acquisition, construction costs, and your permanent mortgage — all in one loan with one closing. If you already own the lot, its equity counts toward your down payment.`,
                },
                {
                  q: "What's the typical timeline from application to breaking ground?",
                  a: `Plan for 30-45 days from application to closing. You'll need approved plans, a licensed ${data.name} builder, and a detailed budget. Sean's team works in parallel with your builder to keep the timeline tight. The construction phase itself typically runs 12-18 months.`,
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
              Ready to plan your {data.name} build?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              90 seconds with Rosie to get your build budget. No credit impact.
              No obligation. Or book a 20-minute strategy call with Sean.
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

      {/* Internal linking footer */}
      <section className="py-10 bg-[color:var(--brand-cream)] border-t border-neutral-200">
        <Container>
          <div className="text-center text-sm text-neutral-500">
            <Link href="/construction-loans" className="text-[color:var(--brand-teal)] hover:underline font-medium">
              Construction Loans — All States
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
