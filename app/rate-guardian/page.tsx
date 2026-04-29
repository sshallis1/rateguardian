import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Bell, CheckCircle2, Shield, TrendingDown, Clock } from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SavingsScore } from "@/components/brand/SavingsScore";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Rate Guardian — Free Mortgage Monitoring, 24/7",
  description:
    "Rosie the Rate Guardian monitors your mortgage rate multiple times a day. Get your free Savings Score in 90 seconds. No credit impact.",
};

export default function RateGuardianPage() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)]">
      <SpokeNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(14, 107, 109, 0.12), transparent 50%)",
          }}
          aria-hidden
        />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-3xl">
            <Badge variant="teal" className="mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--brand-teal)] animate-pulse" />
              Rate Guardian™ · LIVE
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight mb-6">
              Rosie watches your rate.
              <br />
              <span className="text-gradient-brand">So you don't have to.</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8 max-w-2xl">
              The Credit Karma of mortgages. Free rate monitoring, powered by
              30 years of mortgage wisdom. When you&apos;re ready to act, Sean
              originates your loan through U.S. Bank.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold hover:bg-[color:var(--brand-teal-dark)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Get My Free Savings Score
                <ArrowRight size={18} />
              </Link>
              <Link
                href="#how"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold hover:border-neutral-900 transition-colors"
              >
                How It Works
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-600">
              <span className="flex items-center gap-2">
                <Clock size={14} /> 90-second check
              </span>
              <span className="flex items-center gap-2">
                <Shield size={14} /> No credit impact
              </span>
              <span className="flex items-center gap-2">
                <TrendingDown size={14} /> Free forever
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Savings Score showcase */}
      <section id="how" className="py-20 md:py-28 bg-white border-y border-neutral-200">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
                The Number That Matters
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Your Mortgage Savings Score
              </h2>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                One simple number, 0 to 100, that tells you if you're
                overpaying. Just like a credit score — but for the biggest
                debt of your life.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Compares your rate against live market data, multiple times a day",
                  "Factors in fees, lender credits, and loan structure — not just rate",
                  "Backed by 30 years of mortgage wisdom, not just an algorithm",
                  "Updates automatically — you're notified the moment the window opens",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-[color:var(--brand-teal)] flex-shrink-0 mt-0.5"
                    />
                    <span className="text-neutral-700">{t}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold text-sm hover:bg-[color:var(--brand-teal-dark)] transition-colors"
              >
                Get My Score — 90 Seconds
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <SavingsScore score={82} monthlySavings={247} size="lg" />
            </div>
          </div>
        </Container>
      </section>

      {/* 3 Cs */}
      <section className="py-20 md:py-24 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
              The Rosie Promise
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Clarity. Confidence. Comfort.
            </h2>
            <p className="text-lg text-neutral-600">
              Clear the financial fog and see the opportunity.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BRAND.threeCs.map((c) => (
              <div
                key={c.word}
                className="bg-white rounded-2xl p-8 border border-neutral-200 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[color:var(--brand-teal)] text-white flex items-center justify-center font-mono font-bold text-2xl">
                  {c.letter}
                </div>
                <h3 className="text-2xl font-bold mb-2">{c.word}</h3>
                <p className="text-neutral-600">{c.blurb}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Moat */}
      <section className="py-20 md:py-28 bg-[color:var(--surface-dark)] text-white">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-[color:var(--brand-teal-light)] uppercase tracking-widest text-xs font-bold mb-3">
              Why Rate Guardian Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Five ingredients nobody else has.
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

      {/* Closing CTA */}
      <section className="py-20 bg-[color:var(--brand-teal)] text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Bell className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start Your Free Monitoring
            </h2>
            <p className="text-lg text-white/80 mb-8">
              No forms. No credit check. Just a conversation with Rosie.
            </p>
            <Link
              href="/rate-guardian/ask-rosie"
              className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-[color:var(--brand-teal)] font-semibold text-base hover:bg-neutral-100 transition-all shadow-xl hover:-translate-y-0.5"
            >
              Ask Rosie
              <ArrowRight size={18} />
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
