import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    title: `Private Wealth Mortgage in ${data.name} — Jumbo Loans Up to $20M+`,
    description: `Jumbo and portfolio mortgage solutions in ${data.name} (${cities}) for high-net-worth borrowers. Complex income, trust purchases, foreign nationals, multi-property portfolios. Sean structures what others can't. U.S. Bank Private Wealth.`,
    keywords: [
      `jumbo mortgage ${data.name}`,
      `jumbo mortgage ${data.abbr}`,
      `private wealth mortgage ${data.name}`,
      `high net worth mortgage ${data.name}`,
      `jumbo loan ${data.name}`,
      `luxury home mortgage ${data.name}`,
      `portfolio mortgage ${data.name}`,
      `non-QM mortgage ${data.name}`,
      `jumbo loan ${data.abbr}`,
      ...data.majorCities.map((c) => `jumbo mortgage ${c}`),
      ...data.majorCities.map((c) => `high net worth mortgage ${c}`),
      ...data.majorCities.map((c) => `luxury home mortgage ${c}`),
    ],
    openGraph: {
      title: `Private Wealth Mortgage in ${data.name} — Jumbo Loans Up to $20M+`,
      description: `Jumbo and portfolio lending for high-net-worth borrowers in ${data.name}. Complex income, trust-held assets, foreign nationals. U.S. Bank Private Wealth.`,
      type: "website",
      url: `https://seanshallis.com/private-wealth-mortgage/${data.slug}`,
    },
    alternates: {
      canonical: `https://seanshallis.com/private-wealth-mortgage/${data.slug}`,
    },
  };
}

const COMPARISON = [
  { feature: "Loans up to $20M+", us: true, retail: false, competitor: true },
  { feature: "Portfolio lender (keeps your loan)", us: true, retail: false, competitor: true },
  { feature: "RSU/stock income counted", us: true, retail: false, competitor: true },
  { feature: "Asset-based qualification", us: true, retail: false, competitor: true },
  { feature: "Trust and LLC vesting", us: true, retail: false, competitor: true },
  { feature: "Interest-only options", us: true, retail: false, competitor: true },
  { feature: "Foreign national eligible", us: true, retail: false, competitor: false },
  { feature: "Free rate renegotiation", us: true, retail: false, competitor: false },
  { feature: "Single point of contact (Sean)", us: true, retail: false, competitor: false },
  { feature: "AI rate monitoring (Rosie)", us: true, retail: false, competitor: false },
];

export default async function PrivateWealthMortgageStatePage({ params }: PageProps) {
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
              Private Wealth Mortgage &middot; {data.name}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
              Jumbo &amp; Private Wealth Mortgage in {data.name} —{" "}
              <span className="text-[color:var(--brand-teal)]">
                Up to $20M+.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-4 max-w-2xl">
              Whether you&apos;re purchasing in {cities[0]}, building in{" "}
              {cities[1] || cities[0]}, or consolidating a portfolio across{" "}
              {data.name} — Sean Shallis structures jumbo and private wealth
              mortgages that retail lenders can&apos;t touch.
            </p>
            <p className="text-lg text-neutral-500 mb-8 max-w-2xl">
              Portfolio lending. Complex income. Trust and LLC vesting. No PMI.
              Backed by U.S. Bank Private Wealth.
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

      {/* State-Specific Context */}
      <section className="py-16 md:py-24 bg-white border-y border-neutral-200">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
                Private Wealth Lending in {data.name}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {data.name}&apos;s luxury markets deserve a lender who builds custom.
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                Sean Shallis is a national private wealth mortgage specialist
                backed by U.S. Bank. He personally handles every high-net-worth
                client — no hand-off to junior staff, no 1-800 number. Complex
                income, multiple properties, foreign nationals, trust
                purchases — Sean structures what others can&apos;t.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Whether you&apos;re an executive purchasing in {cities[0]}, a
                business owner building in{" "}
                {cities[1] || cities[0]}, or a foreign national investing in{" "}
                {data.name} real estate — U.S. Bank Private Wealth offers
                portfolio lending solutions unavailable through retail channels.
              </p>

              <div className="space-y-4">
                {[
                  { n: "01", title: "Strategy Call", body: `A confidential 20-minute call with Sean. He maps your income structure, asset picture, and ${data.name} property goals.` },
                  { n: "02", title: "Custom Structure", body: `Sean designs your loan: income sources, asset leverage, optimal term, trust or LLC vesting — tailored to your ${data.name} purchase.` },
                  { n: "03", title: "White Glove Close", body: "Sean manages every detail through closing. One point of contact. Private wealth processing lane. Coordinated seamlessly." },
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
                { icon: Briefcase, title: "Executives & C-Suite", desc: `RSU, stock options, and deferred compensation counted as qualifying income for ${data.name} purchases.` },
                { icon: Building2, title: "Business Owners", desc: `Self-employed with complex write-offs? We look at cash flow, not just your 1040. Ideal for ${data.name} entrepreneurs.` },
                { icon: Globe, title: "Foreign Nationals", desc: `Non-resident buyers purchasing ${data.name} real estate. No SSN required. Asset-based qualification available.` },
                { icon: Home, title: "Multi-Property & Trust", desc: `Portfolio lending with no property count limit. Trust and LLC vesting. Perfect for ${data.name} investment portfolios.` },
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
              { stat: "$20M+", label: "Loan Amounts", desc: "No arbitrary cap — structured to your net worth" },
              { stat: "$0", label: "PMI on Jumbo", desc: "No private mortgage insurance, ever" },
              { stat: "Flexible", label: "DTI Guidelines", desc: "Asset-based qualification and residual income analysis" },
              { stat: "Portfolio", label: "Lender", desc: "U.S. Bank keeps your loan — relationship banking" },
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
              Sean + U.S. Bank vs. {data.name} Jumbo Lenders
            </h2>
            <p className="text-center text-neutral-600 mb-10">
              Most {data.name} lenders offer jumbo loans. Very few offer private wealth lending <em>strategy</em>.
            </p>
            <div className="rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="grid grid-cols-4 bg-neutral-50 border-b border-neutral-200 text-sm font-bold">
                <div className="px-5 py-4">Feature</div>
                <div className="px-5 py-4 text-center text-[color:var(--brand-teal)]">Sean + U.S. Bank</div>
                <div className="px-5 py-4 text-center text-neutral-400">Retail Jumbo</div>
                <div className="px-5 py-4 text-center text-neutral-400">{data.abbr} Private Bank</div>
              </div>
              {COMPARISON.map((row) => (
                <div key={row.feature} className="grid grid-cols-4 border-b border-neutral-100 last:border-0">
                  <div className="px-5 py-3 text-sm text-neutral-700">{row.feature}</div>
                  <div className="px-5 py-3 text-center">
                    {row.us ? <CheckCircle2 size={18} className="text-[color:var(--brand-teal)] mx-auto" /> : <span className="text-neutral-300">&mdash;</span>}
                  </div>
                  <div className="px-5 py-3 text-center">
                    {row.retail ? <CheckCircle2 size={18} className="text-neutral-400 mx-auto" /> : <span className="text-neutral-300">&mdash;</span>}
                  </div>
                  <div className="px-5 py-3 text-center">
                    {row.competitor ? <CheckCircle2 size={18} className="text-neutral-400 mx-auto" /> : <span className="text-neutral-300">&mdash;</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Local Market Context */}
      <section className="py-16 md:py-20 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Luxury Markets Across {data.name}
            </h2>
            <p className="text-center text-neutral-600 mb-10">
              Sean works with high-net-worth borrowers in every {data.name} market — and nationwide.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => (
                <div key={city} className="bg-white rounded-xl p-5 border border-neutral-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-[color:var(--brand-teal)]" />
                    <span className="font-bold text-sm">{city}, {data.abbr}</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Jumbo and private wealth mortgage solutions for luxury homes and investment properties in {city}.
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
              Private Wealth Mortgage FAQ — {data.name}
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: `What are the jumbo loan limits in ${data.name}?`,
                  a: `Conforming loan limits vary by county in ${data.name}, but U.S. Bank Private Wealth portfolio loans start above conforming limits and go up to $20M+. There is no arbitrary cap — your loan amount is structured around your financial picture, not a government guideline.`,
                },
                {
                  q: `Can I use asset depletion to qualify in ${data.name}?`,
                  a: `Yes. Asset depletion divides your eligible liquid assets by the loan term to create qualifying income. Ideal for retired executives, business owners between ventures, or high-net-worth borrowers purchasing in ${data.name} with significant wealth but non-traditional income.`,
                },
                {
                  q: `Can I purchase a ${data.name} property in a trust or LLC?`,
                  a: `Absolutely. U.S. Bank Private Wealth regularly closes loans vested in revocable trusts, irrevocable trusts, and LLCs in ${data.name}. No need to close in personal name and transfer after — we close directly into the entity.`,
                },
                {
                  q: `Does Sean work with foreign nationals buying in ${data.name}?`,
                  a: `Yes. Non-resident foreign nationals can purchase ${data.name} real estate through our private wealth programs. No SSN required. Asset-based qualification available. Typically 30-40% down payment with competitive rates.`,
                },
                {
                  q: `Can RSU and stock income qualify me for a ${data.name} jumbo loan?`,
                  a: `Yes. U.S. Bank Private Wealth counts vested RSUs, stock options, and deferred compensation as qualifying income. We analyze your vesting schedule and historical grants — unlike retail lenders who often ignore non-cash compensation entirely.`,
                },
                {
                  q: `Are interest-only jumbo loans available in ${data.name}?`,
                  a: `Yes. Interest-only periods of 5, 7, or 10 years are available on private wealth mortgages in ${data.name}. This maximizes cash flow and provides flexibility for borrowers who prefer to deploy capital elsewhere during the IO period.`,
                },
                {
                  q: `How many investment properties can I finance in ${data.name}?`,
                  a: `Portfolio lending means no limit on the number of financed properties. Whether you have 5 or 50 properties across ${data.name} and beyond, we structure each loan based on your total financial picture. No property count restrictions.`,
                },
                {
                  q: "How does rate renegotiation work?",
                  a: "Because U.S. Bank portfolios your loan (keeps it on their books), rate renegotiation is available before funding if rates drop. Sean also monitors rates post-close through Rosie — if a meaningful savings window opens, he'll reach out proactively.",
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
              Ready for a private wealth mortgage in {data.name}?
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

      {/* Internal linking footer */}
      <section className="py-10 bg-[color:var(--brand-cream)] border-t border-neutral-200">
        <Container>
          <div className="text-center text-sm text-neutral-500">
            <Link href="/private-wealth-mortgage" className="text-[color:var(--brand-teal)] hover:underline font-medium">
              Private Wealth Mortgage — All States
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
