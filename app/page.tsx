import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Shield,
  CheckCircle,
  Stethoscope,
  Building2,
  Landmark,
  Home as HomeIcon,
  GraduationCap,
  Calendar,
  Eye,
  Zap,
  TrendingUp,
  Hammer,
  Heart,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { SavingsScore } from "@/components/brand/SavingsScore";
import { BeyondMortgageSection } from "@/components/brand/BeyondMortgageSection";
import { Footer } from "@/components/brand/Footer";
import { RosieChatWidget } from "@/components/chat/RosieChatWidget";
import { TestimonialStreamer } from "@/components/event/TestimonialStreamer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BRAND, GUARDIANS } from "@/lib/brand";

export default function Home() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)] text-neutral-900">
      <SpokeNav />

      {/* ========= HERO — Platform Vision ========= */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 10%, rgba(14, 107, 109, 0.08), transparent 40%), radial-gradient(circle at 80% 60%, rgba(200, 165, 80, 0.08), transparent 40%)",
          }}
          aria-hidden
        />

        <Container className="relative py-16 md:py-24 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-6">
                {BRAND.headline}
              </h1>

              <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed mb-8 max-w-2xl">
                {BRAND.subheadline}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="/rate-guardian/ask-rosie"
                  className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold text-base hover:bg-[color:var(--brand-teal-dark)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  See What You&apos;re Missing
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="#guardians"
                  className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold text-base hover:border-neutral-900 transition-colors"
                >
                  <Eye size={16} />
                  Explore the Guardians
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {[
                  { value: "30+", label: "Years" },
                  { value: "$1B+", label: "Transactions" },
                  { value: "2,000+", label: "Families" },
                  { value: "#1", label: "Amazon Author" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-black text-neutral-900">
                      {s.value}
                    </div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative max-w-sm mx-auto">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/sean-shallis-headshot.jpg"
                    alt="Sean Shallis — Financial Blind Spot Eliminator"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 384px"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-lg border border-neutral-200">
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                    Featured in
                  </span>
                  <span className="text-xs font-semibold text-neutral-600">
                    WSJ &middot; NYT &middot; Bloomberg &middot; CNBC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========= THE GUARDIAN ECOSYSTEM ========= */}
      <section id="guardians" className="py-20 md:py-28 bg-[color:var(--surface-dark)] text-white scroll-mt-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-[color:var(--brand-gold)] uppercase tracking-widest text-xs font-bold mb-3">
              The Guardian Ecosystem
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Five guardians.{" "}
              <span className="text-neutral-400">Every blind spot.</span>
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              {BRAND.ecosystemLine}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {GUARDIANS.map((g) => {
              const href = g.cta?.href ?? g.href;
              const isExternal = href.startsWith("http");
              const Tag = isExternal ? "a" : Link;
              const extraProps = isExternal ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
              return (
              <Tag
                key={g.id}
                href={href}
                {...extraProps}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.06] hover:-translate-y-1 transition-all"
                style={{ borderLeftWidth: 4, borderLeftColor: g.color }}
              >
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-10 blur-3xl"
                  style={{ background: g.color }}
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${g.color}20`, color: g.color }}
                    >
                      {g.id === "rate" && <Shield size={24} />}
                      {g.id === "project" && <Hammer size={24} />}
                      {g.id === "trade" && <TrendingUp size={24} />}
                      {g.id === "health" && <Heart size={24} />}
                      {g.id === "home" && <HomeIcon size={24} />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{g.name}</h3>
                      <p className="text-sm font-semibold" style={{ color: g.color }}>
                        {g.protects}
                      </p>
                    </div>
                    <div className="ml-auto">
                      {g.status === "live" && <Badge variant="live">Live</Badge>}
                      {g.status === "launching" && <Badge variant="soon">Launching</Badge>}
                      {g.status === "soon" && <Badge variant="future">Coming Soon</Badge>}
                    </div>
                  </div>
                  <p className="text-neutral-400 leading-relaxed mb-5">
                    {g.description}
                  </p>
                  <div className="flex items-center gap-2 font-semibold text-sm" style={{ color: g.color }}>
                    {g.cta?.label ?? "Learn More"}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Tag>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========= RATE GUARDIAN — Primary Product Spotlight ========= */}
      <section id="rate-guardian" className="py-20 md:py-28 bg-white scroll-mt-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="teal">
                  <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--brand-teal)] animate-pulse" />
                  Rate Guardian &middot; Live
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Most people overpay on their mortgage.{" "}
                <span className="text-[color:var(--brand-teal)]">
                  Rosie makes sure you don&apos;t.
                </span>
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                In 90 seconds, Rosie compares your current rate against
                today&apos;s market and 30 years of wisdom. She gives you one
                number — your Savings Score. Then she watches. Every day.
                For free. Forever.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { n: "01", title: "Free Rate Check", body: "Tell Rosie about your mortgage. No credit impact, no forms." },
                  { n: "02", title: "Rosie Stands Watch", body: "She monitors rates multiple times per day. She never sleeps." },
                  { n: "03", title: "Sean Closes It", body: "When the window opens, Sean picks up the phone. Your mortgage is originated through U.S. Bank." },
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

              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold text-base hover:bg-[color:var(--brand-teal-dark)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Get My Savings Score
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[color:var(--brand-teal)]/10 to-[color:var(--brand-gold)]/10 rounded-full blur-3xl" />
                <div className="relative">
                  <SavingsScore
                    score={82}
                    monthlySavings={247}
                    subtitle="Example — your actual score appears after the rate check"
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========= ARM PARADIGM FLIP — Conviction Builder ========= */}
      <section className="py-16 md:py-20 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-neutral-200 bg-white p-8">
              <div className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-3">
                Traditional Advice
              </div>
              <h3 className="text-2xl font-bold mb-3 text-neutral-400">
                30-Year Fixed
              </h3>
              <p className="text-neutral-500 leading-relaxed mb-4">
                &ldquo;Lock it in. Peace of mind. Never think about it again.&rdquo;
              </p>
              <div className="pt-4 border-t border-neutral-100">
                <div className="text-xs text-neutral-400 mb-1">Reality</div>
                <div className="text-sm text-neutral-600">
                  You overpay every month — for decades — because no one
                  is watching for a better window.
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[color:var(--brand-gold)]/40 bg-gradient-to-br from-[color:var(--brand-gold)]/5 to-transparent p-8 relative">
              <div className="absolute -top-3 left-6">
                <Badge variant="gold">The Rate Guardian Play</Badge>
              </div>
              <div className="text-xs uppercase tracking-widest text-[color:var(--brand-gold)] font-bold mb-3 mt-2">
                The Smart Move
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Short-Term ARM + Rosie
              </h3>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Take the <strong>lower rate</strong> — save $400-700/month
                immediately. Rosie watches. Sean refinances you before
                the reset, every time.
              </p>
              <div className="pt-4 border-t border-[color:var(--brand-gold)]/20">
                <div className="text-xs text-[color:var(--brand-gold)] mb-1">
                  Why it works
                </div>
                <div className="text-sm text-neutral-700">
                  Monitoring turns the &ldquo;risky&rdquo; ARM into the smart
                  play. You get the savings AND the safety net.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========= PROJECT GUARDIAN — Live Product ========= */}
      <section className="py-20 md:py-28 bg-white scroll-mt-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="teal">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                Project Guardian &middot; Live
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Stop paying someone 20% to manage your renovation.
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-2xl">
              Most renovation projects go over budget because homeowners can&apos;t
              see where the money is going. Rosie acts as your virtual project
              manager — you keep the margin.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Zap, title: "Cost Evaluator", desc: "What will this REALLY cost? Get the answer before you commit." },
                { icon: Shield, title: "Budget Guardrails", desc: "Real-time tracking. Rosie flags overruns before they happen." },
                { icon: HomeIcon, title: "Resale Prep", desc: "Every upgrade documented. Know exactly what your home is worth." },
              ].map((f) => (
                <div key={f.title} className="bg-[color:var(--brand-cream)] rounded-2xl p-6 border border-neutral-200">
                  <f.icon size={24} className="text-orange-600 mb-3" />
                  <h3 className="font-bold mb-1">{f.title}</h3>
                  <p className="text-sm text-neutral-600">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/project-guardian"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 transition-colors shadow-lg"
              >
                Explore Project Guardian
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/portal"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-neutral-300 font-semibold text-sm hover:border-neutral-900 transition-colors"
              >
                Sign In to Portal
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ========= TRADE GUARDIAN — Launching ========= */}
      <section className="py-20 md:py-28 bg-[color:var(--surface-dark)] text-white scroll-mt-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="soon">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Trade Guardian &middot; Launching This Week
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Most people watch rates <em>or</em> markets.{" "}
              <span className="text-blue-400">
                Here&apos;s what happens when you watch both.
              </span>
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
              A free weekly intelligence brief that connects mortgage rates
              to financial markets — the signals most people miss because
              they&apos;re only listening to one channel. Written by someone
              with 30+ years in the game who also manages his own portfolio.
            </p>

            <div className="grid sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Rate Watch", desc: "Lock or float — and why" },
                { label: "Market Signals", desc: "The 3-5 that matter this week" },
                { label: "Opportunity Radar", desc: "What I'm watching and avoiding" },
                { label: "Action Notes", desc: "Buyers, owners, investors, partners" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-sm font-bold text-blue-400 mb-1">{item.label}</div>
                  <div className="text-xs text-neutral-400">{item.desc}</div>
                </div>
              ))}
            </div>

            <Link
              href="/trade-guardian"
              className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition-colors shadow-lg"
            >
              Get the Free Brief
              <ArrowRight size={18} />
            </Link>
          </div>
        </Container>
      </section>

      {/* ========= PHYSICIAN LENDING — Revenue Engine ========= */}
      <section id="lending" className="py-20 md:py-28 bg-white scroll-mt-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
              Concierge Lending
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Lending Designed for Medical Professionals
            </h2>
            <p className="text-lg text-neutral-600">
              Sean Shallis is a Mortgage Loan Originator at U.S. Bank with
              30+ years of expertise. When you&apos;re ready to finance, you
              work directly with Sean through U.S. Bank.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Stethoscope, title: "Physician Loan Programs", desc: "Up to 100% financing, no PMI — designed for MDs, DOs, DMDs, and residents" },
              { icon: Building2, title: "Construction-to-Permanent", desc: "Build your dream home or practice facility with a single close loan" },
              { icon: Landmark, title: "Jumbo & Portfolio Loans", desc: "High-balance financing for luxury properties and complex transactions" },
              { icon: Shield, title: "VA Loans for Veterans", desc: "Military service + medical career = maximum benefit strategies" },
              { icon: HomeIcon, title: "Private Client Solutions", desc: "Sean originates through U.S. Bank — full product suite available" },
              { icon: GraduationCap, title: "Student Loan Strategies", desc: "Income-based qualification that accounts for your real earning trajectory" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[color:var(--brand-cream)] rounded-2xl p-6 border border-neutral-200 hover:border-[color:var(--brand-teal)] hover:-translate-y-1 transition-all"
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

      {/* ========= ENTERPRISE ========= */}
      <section id="enterprise" className="py-20 md:py-28 bg-[color:var(--surface-dark)] text-white scroll-mt-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <div className="text-[color:var(--brand-gold)] uppercase tracking-widest text-xs font-bold mb-3">
                For Health Systems &amp; Medical Groups
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Homeownership &amp; Wealth
                <br />
                Advantage Program
              </h2>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                Help your organization attract, retain, and support top talent
                with custom lending solutions — at zero cost to the employer.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { title: "Private Wealth for Physicians", desc: "Consultative lending for attendings and leadership" },
                { title: "Financial Literacy", desc: "Lunch & learns for admin and nursing staff" },
                { title: "Relocation Support", desc: "Onboarding mortgage support for new hires" },
                { title: "Zero Cost to Employer", desc: "Ongoing lending strategy as an employee benefit" },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-colors">
                  <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="https://link.seanshallis.com/widget/bookings/usb_20m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold-light)] transition-colors"
              >
                Schedule an Enterprise Consultation
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ========= CREDIBILITY — Who Sean Is ========= */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <div className="relative aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/sean-shallis-headshot.jpg"
                  alt="Sean Shallis"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
                The Builder Behind the Guardians
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                System builder. AI strategist.{" "}
                <span className="text-neutral-400">
                  30 years of blind spots eliminated.
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                {[
                  "30+ years | $1B+ in closed transactions",
                  "Married to a physician — understands the journey",
                  "Amazon #1 best-selling author",
                  "Featured in WSJ, NYT, Bloomberg, CNBC",
                  "Host of The Loan Doctor Podcast",
                  "HousingWire contributing writer",
                  "Creator of Rate Guardian AI + Rosie",
                  "Mortgage Loan Originator, U.S. Bank",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-[color:var(--brand-teal)] flex-shrink-0 mt-0.5"
                    />
                    <span className="text-sm text-neutral-700">{point}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[color:var(--brand-teal)] font-semibold hover:underline"
              >
                Read Sean&apos;s Full Story
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ========= BEYOND THE MORTGAGE ========= */}
      <BeyondMortgageSection />

      {/* ========= TESTIMONIALS ========= */}
      <TestimonialStreamer />

      {/* ========= CLOSING CTA ========= */}
      <section className="py-20 md:py-24 bg-[color:var(--brand-teal)] text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Ready to See What You&apos;re Missing?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Free rate check. No credit impact. 90 seconds. Or book a
              20-minute strategy call — no obligation.
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

      <Footer />
      <RosieChatWidget />
    </main>
  );
}
