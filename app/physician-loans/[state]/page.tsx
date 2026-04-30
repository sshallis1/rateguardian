import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    title: `Physician Mortgage Loans in ${data.name} — Low Down Payment, No PMI`,
    description: `Physician loan programs in ${data.name} (${cities}) up to $2.5M with as little as 5% down and no PMI. For MDs, DOs, and JDs. Student loan-friendly. AI rate monitoring included free. Loans originated through U.S. Bank.`,
    keywords: [
      `physician mortgage ${data.name}`,
      `physician mortgage ${data.abbr}`,
      `doctor home loan ${data.name}`,
      `physician loan ${data.abbr}`,
      `doctor mortgage ${data.name}`,
      `physician mortgage no PMI ${data.abbr}`,
      `medical professional mortgage ${data.name}`,
      `resident physician home loan ${data.name}`,
      `physician loan low down payment ${data.abbr}`,
      ...data.majorCities.map((c) => `physician mortgage ${c}`),
      ...data.majorCities.map((c) => `doctor home loan ${c}`),
    ],
    openGraph: {
      title: `Physician Mortgage Loans in ${data.name} — Low Down Payment, No PMI`,
      description: `Up to $2.5M, as little as 5% down, no PMI for physicians in ${data.name}. AI rate monitoring included free.`,
      type: "website",
      url: `https://seanshallis.com/physician-loans/${data.slug}`,
    },
    alternates: {
      canonical: `https://seanshallis.com/physician-loans/${data.slug}`,
    },
  };
}

const COMPARISON = [
  { feature: "As little as 5% down, no PMI", us: true, them: false },
  { feature: "No PMI at any LTV", us: true, them: false },
  { feature: "Student loan-friendly DTI", us: true, them: false },
  { feature: "Portfolio lender (keeps your loan)", us: true, them: false },
  { feature: "Free rate renegotiation before funding", us: true, them: false },
  { feature: "AI rate monitoring (Rosie)", us: true, them: false },
  { feature: "Lifetime relationship with your loan officer", us: true, them: false },
  { feature: "Available nationwide", us: true, them: false },
];

export default async function PhysicianLoansStatePage({ params }: PageProps) {
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
              Physician Loans &middot; {data.name}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
              Physician Mortgage Loans in {data.name} —{" "}
              <span className="text-[color:var(--brand-teal)]">
                Low Down Payment, No PMI.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-4 max-w-2xl">
              Whether you&apos;re practicing in {cities[0]}, relocating to{" "}
              {cities[1] || cities[0]}, or finishing residency at{" "}
              {schools[0] || `a program in ${data.name}`} — Sean Shallis
              specializes in physician lending nationwide.
            </p>
            <p className="text-lg text-neutral-500 mb-8 max-w-2xl">
              Up to $2.5M. As little as 5% down. No PMI. Student loan-friendly.
              Loans originated through U.S. Bank.
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

      {/* State-Specific Context */}
      <section className="py-16 md:py-24 bg-white border-y border-neutral-200">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
                Physician Lending in {data.name}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {data.name} physicians deserve a lender who gets it.
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                Sean Shallis is a national physician loan specialist backed by
                U.S. Bank. He&apos;s married to a physician — he
                understands the student debt, the relocations, the delayed
                gratification, and the earning curve that makes physicians
                uniquely qualified borrowers.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Whether you&apos;re an attending at{" "}
                {systems[0] || `a health system in ${data.name}`}, a resident at{" "}
                {schools[0] || `a ${data.name} program`}, or relocating to{" "}
                {cities[0]} for a new role — Sean&apos;s physician loan programs
                are available nationwide with the same white-glove service.
              </p>

              <div className="space-y-4">
                {[
                  { n: "01", title: "Talk to Rosie", body: `Tell Rosie about your ${data.name} home search or current mortgage. 90 seconds, no forms, no credit impact.` },
                  { n: "02", title: "Rosie Watches", body: `Rosie monitors ${data.name} rates multiple times a day. She knows your loan structure and alerts you when savings windows open.` },
                  { n: "03", title: "Sean Closes It", body: "When the window opens, Sean calls you personally. One phone call. White glove. Loans originated through U.S. Bank." },
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
                { icon: Stethoscope, title: "Attending Physicians", desc: `MDs, DOs, JDs in ${data.name}. Up to $2.5M, as little as 5% down, no PMI.` },
                { icon: GraduationCap, title: "Residents & Fellows", desc: `Training at ${schools[0] || data.name + ' programs'}? Qualify on your signed contract, not current salary.` },
                { icon: Home, title: "Relocating to " + data.name, desc: `Moving to ${cities[0]} or ${cities[1] || cities[0]} for a new role? Close before you start.` },
                { icon: Building2, title: "Construction & Renovation", desc: `Building or renovating in ${data.name}? Single-close construction-to-permanent loans available.` },
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
              { stat: "5%", label: "Down Payment", desc: "As little as 5% down on loans up to $1M — no PMI" },
              { stat: "$0", label: "PMI — Ever", desc: "No private mortgage insurance, regardless of LTV" },
              { stat: "Flexible", label: "Student Loan DTI", desc: "Underwritten on earning trajectory, not current IBR" },
              { stat: "30 Days", label: "Average Close", desc: "Physician-specific processing lane" },
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
              Sean + U.S. Bank vs. {data.name} Lenders
            </h2>
            <p className="text-center text-neutral-600 mb-10">
              Most {data.name} lenders offer physician loans. Very few offer physician lending <em>strategy</em>.
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

      {/* Local Medical Context */}
      <section className="py-16 md:py-20 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Serving Physicians Across {data.name}
            </h2>
            <p className="text-center text-neutral-600 mb-10">
              Sean works with physicians at every major {data.name} institution — and nationwide.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => (
                <div key={city} className="bg-white rounded-xl p-5 border border-neutral-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-[color:var(--brand-teal)]" />
                    <span className="font-bold text-sm">{city}, {data.abbr}</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Physician mortgage loans available for physicians buying or refinancing in {city}.
                  </p>
                </div>
              ))}
              {schools.map((school) => (
                <div key={school} className="bg-white rounded-xl p-5 border border-neutral-200">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap size={14} className="text-[color:var(--brand-teal)]" />
                    <span className="font-bold text-sm">{school}</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Residents and fellows can qualify with a signed employment contract.
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
                    Attending physicians and staff can access physician loan programs.
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
              Physician Loan FAQ — {data.name}
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: `Can I get a physician loan if I'm relocating to ${data.name}?`,
                  a: `Absolutely. Sean works with physicians relocating to ${data.name} every month. You can close before you start your new role — all you need is a signed employment contract. Sean handles the timing so you can focus on the move.`,
                },
                {
                  q: `I'm a resident at ${schools[0] || `a ${data.name} program`}. Can I buy now?`,
                  a: `Yes. Physician loan programs let you qualify based on your attending salary — not your resident income. Many ${data.name} residents buy 60-90 days before starting their attending role.`,
                },
                {
                  q: `Does Sean work with physicians in ${cities[0]} and ${cities[1] || 'across ' + data.name}?`,
                  a: `Sean is licensed nationwide and works with physicians in every ${data.name} city. U.S. Bank provides the same physician loan programs regardless of location.`,
                },
                {
                  q: "What are the down payment requirements?",
                  a: "No catch. Physician loan programs exist because banks recognize doctors as low-risk borrowers with high earning trajectories. U.S. Bank portfolios these loans — they want the long-term relationship.",
                },
                {
                  q: `Can I build a home in ${data.name} with a physician loan?`,
                  a: `Yes. U.S. Bank offers construction-to-permanent loans that combine your build financing and permanent mortgage into a single close. Available for physician-qualified borrowers building in ${data.name}.`,
                },
                {
                  q: "Is the AI rate monitoring really free?",
                  a: "Zero cost, forever. Rosie monitors your rate multiple times a day and alerts you when savings windows open. No subscription, no hidden fees. Sean built it because physicians are too busy to track rates themselves.",
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
              Ready to see what you qualify for in {data.name}?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              90 seconds with Rosie. No credit impact. No obligation.
              Or book a 20-minute strategy call with Sean.
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

      {/* Internal linking to parent + other states */}
      <section className="py-10 bg-[color:var(--brand-cream)] border-t border-neutral-200">
        <Container>
          <div className="text-center text-sm text-neutral-500">
            <Link href="/physician-loans" className="text-[color:var(--brand-teal)] hover:underline font-medium">
              Physician Loans — All States
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
