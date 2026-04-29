import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Shield,
  CheckCircle2,
  Clock,
  DollarSign,
  Calendar,
  Star,
  MapPin,
  Users,
  Award,
  Home,
  RefreshCw,
  Building2,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { STATES, getStateBySlug } from "@/lib/states";
import { VA_STATE_DATA } from "@/lib/va-data";

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

  const vaData = VA_STATE_DATA[state];
  const cities = data.majorCities.slice(0, 3).join(", ");

  return {
    title: `VA Loans in ${data.name} — $0 Down, No PMI | Sean Shallis`,
    description: `VA loan programs in ${data.name} (${cities}) with zero down payment, no PMI, and no minimum credit score. Sean Shallis is a U.S. Army Veteran and VA loan specialist. AI rate monitoring included free. Loans originated through U.S. Bank.`,
    keywords: [
      `VA loan ${data.name}`,
      `VA mortgage ${data.name}`,
      `veteran home loan ${data.name}`,
      `VA loan no down payment ${data.name}`,
      `VA loan ${data.abbr}`,
      `veteran mortgage ${data.abbr}`,
      `military home loan ${data.name}`,
      `VA IRRRL ${data.name}`,
      ...data.majorCities.map((c) => `veteran home loan ${c}`),
      ...data.majorCities.map((c) => `VA loan ${c}`),
    ],
    openGraph: {
      title: `VA Loans in ${data.name} — $0 Down, No PMI`,
      description: `$0 down, no PMI, no minimum credit score for veterans in ${data.name}. AI rate monitoring included free.`,
      type: "website",
      url: `https://seanshallis.com/va-loans/${data.slug}`,
    },
    alternates: {
      canonical: `https://seanshallis.com/va-loans/${data.slug}`,
    },
  };
}

const COMPARISON = [
  { feature: "Portfolio lender (keeps your loan)", us: true, them: false },
  { feature: "AI rate monitoring (Rosie)", us: true, them: false },
  { feature: "Veteran-to-veteran relationship", us: true, them: false },
  { feature: "Construction-to-perm with VA", us: true, them: false },
  { feature: "Physician + VA combination programs", us: true, them: false },
  { feature: "Free rate renegotiation before funding", us: true, them: false },
  { feature: "Loan recasting for $250", us: true, them: false },
  { feature: "Available nationwide", us: true, them: false },
];

export default async function VALoansStatePage({ params }: PageProps) {
  const { state } = await params;
  const data = getStateBySlug(state);
  if (!data) notFound();

  const vaData = VA_STATE_DATA[state];
  const cities = data.majorCities;
  const bases = vaData?.militaryBases || [];
  const vaCenters = vaData?.vaMedicalCenters || [];

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
              VA Loans &middot; {data.name}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
              VA Loans in {data.name} —{" "}
              <span className="text-[color:var(--brand-teal)]">
                $0 Down, No PMI.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-4 max-w-2xl">
              Whether you&apos;re stationed at {bases[0] || `a base in ${data.name}`},
              separating near {cities[0]}, or a veteran buying in{" "}
              {cities[1] || cities[0]} — Sean Shallis is a U.S. Army Veteran
              and VA loan specialist licensed nationwide.
            </p>
            <p className="text-lg text-neutral-500 mb-8 max-w-2xl">
              $0 down. No PMI. No minimum credit score. Loans originated through U.S. Bank.
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

      {/* State-Specific Context */}
      <section className="py-16 md:py-24 bg-white border-y border-neutral-200">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
                VA Lending in {data.name}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {data.name} veterans deserve a lender who served too.
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                Sean Shallis is a U.S. Army Veteran, VA loan specialist, and
                Senior Loan Officer with U.S. Bank. With 30+ years of mortgage
                expertise and over $1B in closed transactions, he knows how to
                maximize your VA benefit — whether you&apos;re buying your first
                home, refinancing with an IRRRL, or building from the ground up.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                {bases.length > 0 && (
                  <>
                    Serving veterans near {bases.slice(0, 2).join(", ")}
                    {bases.length > 2 ? `, and ${bases.length - 2} more ${data.name} installations` : ""}.{" "}
                  </>
                )}
                Sean handles everything — COE retrieval, entitlement restoration,
                funding fee exemption verification — so you can focus on finding
                your home.
              </p>

              <div className="space-y-4">
                {[
                  { n: "01", title: "Talk to Rosie", body: `Tell Rosie about your ${data.name} home search, refinance, or IRRRL. 90 seconds, no forms, no credit impact.` },
                  { n: "02", title: "Rosie Watches", body: `Rosie monitors ${data.name} VA rates multiple times a day. She knows your entitlement status and alerts you when savings windows open.` },
                  { n: "03", title: "Sean Closes It", body: "When the window opens, Sean calls you personally. Veteran to veteran. One phone call. White glove. Loans originated through U.S. Bank." },
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
                { icon: Users, title: "Active Duty in " + data.name, desc: `Stationed at ${bases[0] || data.name}? PCSing soon? Lock in your rate and close before you move.` },
                { icon: Award, title: "Separated & Retired Veterans", desc: `Living in ${cities[0]} or ${cities[1] || cities[0]}? Your VA benefit never expires. Use it again — zero down.` },
                { icon: RefreshCw, title: "VA IRRRL Refinance", desc: `Already have a VA loan in ${data.name}? The IRRRL streamline lets you drop your rate with minimal paperwork and no appraisal.` },
                { icon: Home, title: "VA Construction Loans", desc: `Building in ${data.name}? Single-close construction-to-permanent. Zero down. No PMI. One closing.` },
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
              { stat: "$0", label: "Down Payment", desc: "100% financing — no down payment required" },
              { stat: "$0", label: "PMI — Ever", desc: "No private mortgage insurance at any LTV" },
              { stat: "None", label: "Min. Credit Score", desc: "No VA-mandated minimum credit score" },
              { stat: "$0", label: "Prepayment Penalty", desc: "Pay off early with zero penalty" },
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
              Sean + U.S. Bank vs. {data.name} VA Lenders
            </h2>
            <p className="text-center text-neutral-600 mb-10">
              Most {data.name} lenders process VA loans. Sean <em>strategizes</em> them — veteran to veteran.
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

      {/* Local Military Context */}
      <section className="py-16 md:py-20 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Serving Veterans Across {data.name}
            </h2>
            <p className="text-center text-neutral-600 mb-10">
              Sean works with veterans near every {data.name} military installation and VA facility.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bases.map((base) => (
                <div key={base} className="bg-white rounded-xl p-5 border border-neutral-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={14} className="text-[color:var(--brand-teal)]" />
                    <span className="font-bold text-sm">{base}</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    VA loans available for service members and veterans near {base}.
                  </p>
                </div>
              ))}
              {vaCenters.map((center) => (
                <div key={center} className="bg-white rounded-xl p-5 border border-neutral-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 size={14} className="text-[color:var(--brand-teal)]" />
                    <span className="font-bold text-sm">{center}</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Veterans receiving care here may qualify for disability-related funding fee exemptions.
                  </p>
                </div>
              ))}
              {cities.map((city) => (
                <div key={city} className="bg-white rounded-xl p-5 border border-neutral-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-[color:var(--brand-teal)]" />
                    <span className="font-bold text-sm">{city}, {data.abbr}</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    VA home loans available for veterans buying or refinancing in {city}.
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
              VA Loan FAQ — {data.name}
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: `Who is eligible for a VA loan in ${data.name}?`,
                  a: `Veterans, active-duty service members, National Guard and Reserve members with qualifying service, and eligible surviving spouses. If you served at ${bases[0] || `a ${data.name} installation`} or anywhere else, your benefit works nationwide. Sean can pull your COE electronically in minutes.`,
                },
                {
                  q: "How do I get my Certificate of Eligibility (COE)?",
                  a: "You don't need to request it yourself. Sean pulls your COE electronically through the VA's system as part of the process. It takes minutes, not weeks. He'll also verify your entitlement amount and any funding fee exemptions.",
                },
                {
                  q: `Can I use my VA loan benefit more than once in ${data.name}?`,
                  a: `Yes. There's no limit to how many times you can use your VA benefit. You can even have two VA loans simultaneously if you have remaining entitlement. Sean specializes in helping ${data.name} veterans restore and strategically reuse their entitlement.`,
                },
                {
                  q: "What is the VA funding fee and can I avoid it?",
                  a: "The funding fee is a one-time charge (1.25%–3.3%) that can be rolled into your loan. Veterans with a service-connected disability rating of 10% or more are fully exempt. Sean verifies your exemption status upfront — if you're receiving care at a VA medical center for a service-connected condition, you likely qualify.",
                },
                {
                  q: `I'm a veteran AND a physician. Can I combine benefits?`,
                  a: "Absolutely — this is Sean's specialty. As both a VA loan specialist and physician lender, he structures loans that leverage both benefits. Veteran physicians often get better rates, higher limits, and more flexible terms than either program alone.",
                },
                {
                  q: `What is the VA IRRRL and can I use it in ${data.name}?`,
                  a: `The IRRRL (Interest Rate Reduction Refinance Loan) lets you refinance your existing VA loan with minimal paperwork, no appraisal, and often no out-of-pocket costs. If you have a VA loan in ${data.name}, Rosie monitors your rate daily and alerts you the moment an IRRRL saves you money.`,
                },
                {
                  q: `Can I build a home in ${data.name} with a VA loan?`,
                  a: `Yes. U.S. Bank offers VA construction-to-permanent loans in ${data.name} — a single close that covers your build and converts to your permanent VA mortgage. Zero down, no PMI, one closing. Sean has guided dozens of veterans through new construction.`,
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
              Ready to use your VA benefit in {data.name}?
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

      {/* Internal linking footer */}
      <section className="py-10 bg-[color:var(--brand-cream)] border-t border-neutral-200">
        <Container>
          <div className="text-center text-sm text-neutral-500">
            <Link href="/va-loans" className="text-[color:var(--brand-teal)] hover:underline font-medium">
              VA Loans — All States
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
