import Link from "next/link";
import { ArrowRight, Clock, Shield, TrendingDown } from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { TrustBar } from "@/components/brand/TrustBar";
import { GuardianCard } from "@/components/brand/GuardianCard";
import { GearVisualization } from "@/components/brand/GearVisualization";
import { SavingsScore } from "@/components/brand/SavingsScore";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BRAND, GUARDIANS } from "@/lib/brand";

export default function Home() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)] text-neutral-900">
      <SpokeNav />

      {/* ========= HERO ========= */}
      <section className="relative overflow-hidden">
        {/* Subtle background pattern */}
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
              <Badge variant="teal" className="mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--brand-teal)] animate-pulse" />
                Rate Guardian is Live
              </Badge>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-6">
                Rosie Watches Your Rate.
                <br />
                <span className="text-gradient-brand">So You Don't Have To.</span>
              </h1>

              <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-4 max-w-2xl">
                Your personal Rate Guardian — monitoring your mortgage{" "}
                <strong className="font-semibold text-neutral-900">
                  multiple times a day
                </strong>
                , so you never overpay and never get stuck with the wrong
                strategy at the wrong time.
              </p>

              {/* The 3 Cs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {BRAND.threeCs.map((c) => (
                  <div
                    key={c.word}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-neutral-200 backdrop-blur-sm"
                  >
                    <span className="font-mono font-bold text-[color:var(--brand-teal)]">
                      {c.letter}
                    </span>
                    <span className="text-sm font-semibold text-neutral-800">
                      {c.word}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <Link
                  href="/rate-guardian/ask-rosie"
                  className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold text-base hover:bg-[color:var(--brand-teal-dark)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Check My Rate — Free
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold text-base hover:border-neutral-900 transition-colors"
                >
                  How Rosie Works
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-500">
                <span className="flex items-center gap-2">
                  <Clock size={14} />
                  90-second check
                </span>
                <span className="flex items-center gap-2">
                  <Shield size={14} />
                  No credit impact
                </span>
                <span className="flex items-center gap-2">
                  <TrendingDown size={14} />
                  100% free monitoring
                </span>
              </div>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5">
              <div className="relative">
                <GearVisualization className="w-full max-w-lg mx-auto" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-lg border border-neutral-200">
                  <div className="w-2 h-2 rounded-full bg-[color:var(--status-success)] animate-pulse" />
                  <span className="text-xs font-mono font-semibold">
                    Monitoring · Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <TrustBar />

      {/* ========= CREDIT KARMA MOMENT — Savings Score ========= */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
                Your Free Mortgage Checkup
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                What's Your Savings Score?
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                Like a credit score — but for your mortgage. In 90 seconds,
                Rosie compares your current rate, fees, and loan structure
                against today's market and 30 years of wisdom, then gives you
                one simple number from 0 to 100.
              </p>
              <ul className="space-y-3 mb-8">
                <Checkmark>
                  <strong>75-100</strong> — Huge opportunity. You're leaving
                  real money on the table.
                </Checkmark>
                <Checkmark>
                  <strong>40-74</strong> — Worth a look. Small tweaks can still
                  save thousands.
                </Checkmark>
                <Checkmark>
                  <strong>0-39</strong> — You're in good shape. Rosie will keep
                  watching anyway.
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

      {/* ========= HOW IT WORKS — 3 STEPS ========= */}
      <section
        id="how-it-works"
        className="py-20 md:py-28 bg-[color:var(--brand-cream)]"
      >
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
              How Rosie Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Three Steps. Zero Babysitting.
            </h2>
            <p className="text-lg text-neutral-600">
              Once Rosie is watching your rate, you stop thinking about it.
              That's the whole point.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                title: "Free Rate Check",
                body:
                  "Tell Rosie about your mortgage in 90 seconds. No credit impact, no forms, no games. Get your Savings Score instantly.",
              },
              {
                n: "02",
                title: "Rosie Stands Watch",
                body:
                  "Rosie monitors rates and lender credits multiple times per day — listening for opportunities and red flags. She never sleeps.",
              },
              {
                n: "03",
                title: "Sean Closes It",
                body:
                  "When the window opens, Rosie alerts you. Sean picks up the phone. Backed by the 5th largest bank in the world.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="bg-white rounded-2xl p-8 border border-neutral-200 hover:border-[color:var(--brand-teal)] hover:-translate-y-1 transition-all shadow-sm hover:shadow-md"
              >
                <div className="text-5xl font-mono font-bold text-[color:var(--brand-teal)] mb-4">
                  {s.n}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========= ARM PARADIGM FLIP ========= */}
      <section className="py-20 md:py-28 bg-[color:var(--surface-dark)] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, rgba(14, 168, 171, 0.3), transparent 50%), radial-gradient(circle at 70% 60%, rgba(200, 165, 80, 0.2), transparent 50%)",
          }}
          aria-hidden
        />
        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="gold" className="mb-6 bg-[color:var(--brand-gold)]/20 border-[color:var(--brand-gold)]/40">
              The Contrarian Play
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Why Smart Buyers Choose{" "}
              <span className="text-gradient-gold">ARMs Now</span>
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Most people default to a 30-year fixed because they're afraid of
              what they can't watch. But when Rosie is monitoring your rate
              multiple times a day — and Sean can refinance you in 30 days —
              the lower ARM rate becomes the{" "}
              <em className="text-white font-medium">
                wealth-building path, not the risky one
              </em>
              .
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-3">
                Traditional Advice
              </div>
              <h3 className="text-2xl font-bold mb-3 text-neutral-400">
                30-Year Fixed
              </h3>
              <p className="text-neutral-400 leading-relaxed mb-4">
                "Lock it in. Peace of mind. Never think about it again."
              </p>
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs text-neutral-500 mb-1">Reality</div>
                <div className="text-sm text-neutral-300">
                  You overpay every month — for decades — because no one is
                  watching for a better window.
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
                Take the <strong>lower rate</strong> — save $400-700/month
                immediately. Rosie watches. Sean refinances you before the
                reset, every time.
              </p>
              <div className="pt-4 border-t border-[color:var(--brand-gold)]/20">
                <div className="text-xs text-[color:var(--brand-gold)] mb-1">
                  Why it works
                </div>
                <div className="text-sm text-neutral-100">
                  Monitoring turns the "risky" ARM into the smart play. You get
                  the savings AND the safety net.
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-neutral-500 max-w-2xl mx-auto mt-8 italic">
            That's the difference between having a loan officer and having a
            Rate Guardian.
          </p>
        </Container>
      </section>

      {/* ========= FIVE INGREDIENT MOAT ========= */}
      <section className="py-20 md:py-28 bg-[color:var(--surface-dark)] text-white border-t border-white/5">
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
              Rate Guardian is the first. The rest are coming — each watching a
              life domain most people can't see through.
            </p>
          </div>

          <div className="space-y-6">
            {/* Live spoke spotlight */}
            <GuardianCard guardian={GUARDIANS[0]} variant="spotlight" />

            {/* Upcoming spokes as cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {GUARDIANS.slice(1).map((g) => (
                <GuardianCard key={g.id} guardian={g} variant="card" />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ========= ABOUT SEAN ========= */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <div className="relative aspect-square max-w-sm mx-auto rounded-3xl bg-gradient-to-br from-[color:var(--brand-teal)] to-[color:var(--brand-navy)] flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-7xl font-bold mb-2">SS</div>
                  <div className="text-sm uppercase tracking-widest opacity-80">
                    Sean Shallis
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
                The Mind Behind Rosie
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Three decades of financial wisdom.
                <br />
                <span className="text-neutral-500">
                  Now powered by AI that never sleeps.
                </span>
              </h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-relaxed mb-8">
                <p>
                  Sean Shallis is a Private Wealth Mortgage Strategist at U.S.
                  Bank — the 5th largest bank in the world. He specializes in
                  physician lending, high-balance jumbo financing, and
                  construction-to-permanent loans for families building real
                  wealth.
                </p>
                <p>
                  He's guided <strong>$1 billion+</strong> in transactions,
                  been featured in the <em>Wall Street Journal</em>, the{" "}
                  <em>New York Times</em>, <em>Bloomberg</em>, and{" "}
                  <em>CNBC</em>, and authored the Amazon bestseller{" "}
                  <em>10X House Selling Secrets</em>.
                </p>
                <p>
                  Rosie is the result of 30 years of watching clients overpay
                  because nobody was guarding the rate. Now — somebody is.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[color:var(--brand-teal)] font-semibold hover:underline"
              >
                Read Sean's Full Story
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ========= CLOSING CTA ========= */}
      <section className="py-20 md:py-24 bg-[color:var(--brand-teal)] text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Let Rosie Watch Your Rate.
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Free forever. No credit impact. 90 seconds to get your Savings
              Score.
            </p>
            <Link
              href="/rate-guardian/ask-rosie"
              className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-[color:var(--brand-teal)] font-semibold text-base hover:bg-neutral-100 transition-all shadow-xl hover:-translate-y-0.5"
            >
              Check My Rate Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-neutral-700">{children}</span>
    </li>
  );
}
