import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Shield,
  Star,
  Award,
  Zap,
  CheckCircle,
  Stethoscope,
  Building2,
  Landmark,
  Home as HomeIcon,
  GraduationCap,
  Briefcase,
  Users,
  Calendar,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { GuardianCard } from "@/components/brand/GuardianCard";
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

      {/* ========= HERO — Sean's Authority ========= */}
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
            {/* Text */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-6">
                <Badge variant="teal">
                  <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--brand-teal)] animate-pulse" />
                  U.S. Bank &middot; Private Wealth
                </Badge>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-4">
                Sean Shallis
              </h1>

              <p className="text-2xl md:text-3xl font-semibold text-neutral-700 mb-2">
                Private Wealth Mortgage Strategist
              </p>
              <p className="text-xl md:text-2xl font-semibold text-gradient-brand mb-6">
                National Physician Loan Expert
              </p>

              <p className="text-lg text-neutral-600 leading-relaxed mb-6 max-w-2xl">
                Concierge-level lending for physicians and medical professionals.
                30+ years of experience. $1B+ in transactions. Backed by the 5th
                largest bank in the world &mdash; and an AI rate monitoring system
                that never sleeps.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <Link
                  href="/rate-guardian/ask-rosie"
                  className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold text-base hover:bg-[color:var(--brand-teal-dark)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Check My Rate &mdash; Free
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="https://link.seanshallis.com/widget/bookings/usb_20m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold text-base hover:border-neutral-900 transition-colors"
                >
                  <Calendar size={16} />
                  Book Strategy Call
                </a>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {[
                  { value: "30+", label: "Years" },
                  { value: "$1B+", label: "Transactions" },
                  { value: "1,000+", label: "Families" },
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

            {/* Visual — Headshot placeholder + credentials */}
            <div className="lg:col-span-5">
              <div className="relative max-w-sm mx-auto">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/sean-shallis-headshot.jpg"
                    alt="Sean Shallis — Private Wealth Mortgage Strategist"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 384px"
                    priority
                  />
                </div>
                {/* Media logos badge */}
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

      {/* ========= WHAT WE DO — Physician Programs ========= */}
      <section id="lending" className="py-20 md:py-28 bg-white scroll-mt-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
              What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Lending Designed for Medical Professionals
            </h2>
            <p className="text-lg text-neutral-600">
              Concierge-level mortgage solutions from U.S. Bank &mdash; tailored
              to every stage of your medical career.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Stethoscope,
                title: "Physician Loan Programs",
                desc: "Up to 100% financing, no PMI — designed for MDs, DOs, DMDs, and residents",
              },
              {
                icon: Building2,
                title: "Construction-to-Permanent",
                desc: "Build your dream home or practice facility with a single close loan",
              },
              {
                icon: Landmark,
                title: "Jumbo & Portfolio Loans",
                desc: "High-balance financing for luxury properties and complex transactions",
              },
              {
                icon: Shield,
                title: "VA Loans for Veterans",
                desc: "Military service + medical career = maximum benefit strategies",
              },
              {
                icon: HomeIcon,
                title: "Private Wealth Banking",
                desc: "Full-service access through U.S. Bank's Private Wealth division",
              },
              {
                icon: GraduationCap,
                title: "Student Loan Strategies",
                desc: "Income-based qualification that accounts for your real earning trajectory",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[color:var(--brand-cream)] rounded-2xl p-6 border border-neutral-200 hover:border-[color:var(--brand-teal)] hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[color:var(--brand-teal)]/10 flex items-center justify-center mb-4">
                  <item.icon
                    size={24}
                    className="text-[color:var(--brand-teal)]"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========= WHO WE SERVE ========= */}
      <section className="py-16 md:py-20 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
              Who We Serve
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              From Residency to Retirement
            </h2>
            <p className="text-lg text-neutral-600">
              We align financing with your career stage &mdash; because a
              resident and a department chief have very different lending needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stage: "Residents & Fellows", icon: GraduationCap },
              { stage: "Attending Physicians", icon: Stethoscope },
              { stage: "Practice Owners", icon: Briefcase },
              { stage: "Hospital Leadership", icon: Users },
            ].map((item) => (
              <div
                key={item.stage}
                className="text-center p-6 rounded-2xl bg-white border border-neutral-200 hover:border-[color:var(--brand-teal)] transition-colors"
              >
                <item.icon
                  size={32}
                  className="mx-auto mb-3 text-[color:var(--brand-teal)]"
                />
                <p className="font-semibold">{item.stage}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========= SAVINGS SCORE — The Credit Karma Moment ========= */}
      <section id="savings-score" className="py-20 md:py-28 bg-white scroll-mt-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
                Your Free Mortgage Checkup
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                What&apos;s Your Savings Score?
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                Like a credit score &mdash; but for your mortgage. In 90
                seconds, Rosie compares your current rate, fees, and loan
                structure against today&apos;s market and 30 years of wisdom,
                then gives you one simple number from 0 to 100.
              </p>
              <ul className="space-y-3 mb-8">
                <Checkmark>
                  <strong>75-100</strong> &mdash; Huge opportunity. You&apos;re
                  leaving real money on the table.
                </Checkmark>
                <Checkmark>
                  <strong>40-74</strong> &mdash; Worth a look. Small tweaks can
                  still save thousands.
                </Checkmark>
                <Checkmark>
                  <strong>0-39</strong> &mdash; You&apos;re in good shape. Rosie
                  will keep watching anyway.
                </Checkmark>
              </ul>
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold text-sm hover:bg-[color:var(--brand-teal-dark)] transition-colors"
              >
                Get My Savings Score
                <ArrowRight size={16} />
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

      {/* ========= RATE GUARDIAN / ROSIE — The USP ========= */}
      <section id="rate-guardian" className="py-20 md:py-28 bg-[color:var(--surface-dark)] text-white relative overflow-hidden scroll-mt-20">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, rgba(14, 168, 171, 0.3), transparent 50%), radial-gradient(circle at 70% 60%, rgba(200, 165, 80, 0.2), transparent 50%)",
          }}
          aria-hidden
        />
        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <div className="text-[color:var(--brand-teal-light)] uppercase tracking-widest text-xs font-bold mb-3">
              Something No Other Loan Officer Offers
            </div>

            <div className="w-20 h-20 mx-auto mb-6 relative">
              <Image
                src="/rosie/rate-guardian-logo.png"
                alt="Rate Guardian"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="80px"
              />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Meet{" "}
              <span className="bg-gradient-to-r from-[color:var(--brand-teal-light)] to-[color:var(--brand-teal)] bg-clip-text text-transparent">
                Rosie.
              </span>{" "}
              Your Rate Guardian.
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Sean built Rosie &mdash; a proprietary AI that monitors your
              mortgage rate multiple times a day. When a savings window opens,
              she alerts you. When it&apos;s time to act, Sean closes it.
              Free. Forever.
            </p>
          </div>

          {/* How it works — 3 steps */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              {
                n: "01",
                title: "Free Rate Check",
                body: "Tell Rosie about your mortgage in 90 seconds. No credit impact, no forms, no games. Get your Savings Score instantly.",
              },
              {
                n: "02",
                title: "Rosie Stands Watch",
                body: "Rosie monitors rates and lender credits multiple times per day — listening for opportunities and red flags. She never sleeps.",
              },
              {
                n: "03",
                title: "Sean Closes It",
                body: "When the window opens, Rosie alerts you. Sean picks up the phone. Backed by the 5th largest bank in the world.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.05] transition-colors"
              >
                <div className="text-5xl font-mono font-bold text-[color:var(--brand-teal-light)] mb-4">
                  {s.n}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          {/* ARM Paradigm Flip — condensed */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-3">
                Traditional Advice
              </div>
              <h3 className="text-2xl font-bold mb-3 text-neutral-400">
                30-Year Fixed
              </h3>
              <p className="text-neutral-400 leading-relaxed mb-4">
                &ldquo;Lock it in. Peace of mind. Never think about it
                again.&rdquo;
              </p>
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs text-neutral-500 mb-1">Reality</div>
                <div className="text-sm text-neutral-300">
                  You overpay every month &mdash; for decades &mdash; because no
                  one is watching for a better window.
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[color:var(--brand-gold)]/40 bg-gradient-to-br from-[color:var(--brand-gold)]/10 to-transparent p-8 relative">
              <div className="absolute -top-3 left-6">
                <Badge variant="gold">The Rate Guardian Play</Badge>
              </div>
              <div className="text-xs uppercase tracking-widest text-[color:var(--brand-gold)] font-bold mb-3 mt-2">
                The Smart Move
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                Short-Term ARM + Rosie
              </h3>
              <p className="text-neutral-200 leading-relaxed mb-4">
                Take the <strong>lower rate</strong> &mdash; save $400-700/month
                immediately. Rosie watches. Sean refinances you before the
                reset, every time.
              </p>
              <div className="pt-4 border-t border-[color:var(--brand-gold)]/20">
                <div className="text-xs text-[color:var(--brand-gold)] mb-1">
                  Why it works
                </div>
                <div className="text-sm text-neutral-100">
                  Monitoring turns the &ldquo;risky&rdquo; ARM into the smart
                  play. You get the savings AND the safety net.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========= ENTERPRISE — Health System Partnerships ========= */}
      <section id="enterprise" className="py-20 md:py-28 bg-[color:var(--surface-dark)] text-white border-t border-white/5 scroll-mt-20">
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
                with custom lending solutions and financial literacy education
                &mdash; at zero cost to the employer.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                {
                  title: "Private Wealth for Physicians",
                  desc: "High-net-worth consultative lending for attendings and leadership",
                },
                {
                  title: "Financial Literacy",
                  desc: "Lunch & learns for admin and nursing staff on homeownership",
                },
                {
                  title: "Relocation Support",
                  desc: "Onboarding mortgage support for new hires and recruits",
                },
                {
                  title: "Zero Cost to Employer",
                  desc: "Ongoing lending strategy as an employee benefit — free",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-colors"
                >
                  <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
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

      {/* ========= THE SEAN SHALLIS DIFFERENCE ========= */}
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
                Why Partner With Sean
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                The Sean Shallis Difference
              </h2>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                {[
                  "30+ years | $1B+ in closed transactions",
                  "Married to a physician — understands the journey",
                  "Amazon #1 best-selling author",
                  "Featured in WSJ, NYT, Bloomberg, CNBC",
                  "Host of The Loan Doctor Podcast",
                  "HousingWire contributing writer",
                  "Creator of Rate Guardian AI",
                  "Trusted by physicians and hospital HR teams",
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

      {/* ========= BEYOND THE MORTGAGE — Wealth, Growth, 10X Formula ========= */}
      <BeyondMortgageSection />

      {/* ========= TESTIMONIALS ========= */}
      <TestimonialStreamer />

      {/* ========= FIVE INGREDIENT MOAT ========= */}
      <section className="py-20 md:py-28 bg-[color:var(--surface-dark)] text-white">
        <Container>
          <div className="max-w-2xl mb-14">
            <div className="text-[color:var(--brand-teal-light)] uppercase tracking-widest text-xs font-bold mb-3">
              Why Rate Guardian Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Five ingredients.
              <br />
              <span className="text-neutral-400">
                No competitor has all five.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {BRAND.moat.map((m, i) => (
              <div
                key={m.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors"
              >
                <div className="font-mono text-[color:var(--brand-teal-light)] text-xs font-bold mb-3">
                  0{i + 1}
                </div>
                <h3 className="font-bold text-base mb-2 leading-tight">
                  {m.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========= GUARDIAN FAMILY SPOKES ========= */}
      <section className="py-20 md:py-28 bg-[color:var(--surface-dark)] text-white border-t border-white/5">
        <Container>
          <div className="max-w-2xl mb-14">
            <div className="text-[color:var(--brand-gold)] uppercase tracking-widest text-xs font-bold mb-3">
              The Guardian Family
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              One AI relationship.
              <br />
              Every financial blind spot.
            </h2>
            <p className="text-lg text-neutral-400">
              Rate Guardian is the first. The rest are coming &mdash; each
              watching a life domain most people can&apos;t see through.
            </p>
          </div>

          <div className="space-y-6">
            <GuardianCard guardian={GUARDIANS[0]} variant="spotlight" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {GUARDIANS.slice(1).map((g) => (
                <GuardianCard key={g.id} guardian={g} variant="card" />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ========= CLOSING CTA ========= */}
      <section className="py-20 md:py-24 bg-[color:var(--brand-teal)] text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Ready to See Where You Stand?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Free rate check. No credit impact. 90 seconds. Or book a
              20-minute strategy call &mdash; no obligation.
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

function Checkmark({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-1 w-5 h-5 rounded-full bg-[color:var(--brand-teal)]/15 flex items-center justify-center flex-shrink-0">
        <svg
          className="w-3 h-3 text-[color:var(--brand-teal)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span className="text-neutral-700">{children}</span>
    </li>
  );
}
