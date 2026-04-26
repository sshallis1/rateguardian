import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  ChefHat,
  ShoppingCart,
  CalendarDays,
  Users,
  Shield,
  Sparkles,
  Clock,
  Leaf,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Health Guardian — Your Family's Wellness Companion",
  description:
    "AI-powered meal planning and family health monitoring. Rosie handles dinner tonight — and watches your family's health signals over time. Try it free.",
};

export default function HealthGuardianPage() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)] text-neutral-900">
      <SpokeNav />

      {/* ========= HERO ========= */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(5, 150, 105, 0.1), transparent 50%), radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.08), transparent 50%)",
          }}
          aria-hidden
        />

        <Container className="relative py-16 md:py-24 lg:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="teal">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Health Guardian &middot; Live
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-6">
              Stop asking{" "}
              <span className="text-emerald-600">
                &ldquo;What&apos;s for dinner?&rdquo;
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed mb-4">
              Rosie plans your meals, builds your shopping list, and learns
              what your family actually eats. In 2 minutes, your week is handled.
            </p>

            <p className="text-lg text-neutral-500 mb-8">
              Because health blind spots cost more than money.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://myhealthguardian.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-emerald-600 text-white font-semibold text-base hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Try It Free
                <ArrowRight size={18} />
              </a>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold text-base hover:border-neutral-900 transition-colors"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ========= THE PROBLEM ========= */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Sound familiar?
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  emoji: "5:30 PM",
                  text: "\"What should we eat tonight?\" ...for the 4,000th time.",
                },
                {
                  emoji: "Sunday",
                  text: "You meal-prepped once. In 2019. It lasted 3 days.",
                },
                {
                  emoji: "Budget",
                  text: "$200 in groceries. Half of it expired. DoorDash anyway.",
                },
              ].map((item) => (
                <div
                  key={item.emoji}
                  className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100"
                >
                  <div className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-2">
                    {item.emoji}
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ========= HOW IT WORKS ========= */}
      <section id="how-it-works" className="py-20 md:py-28 bg-[color:var(--brand-cream)] scroll-mt-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-emerald-600 uppercase tracking-widest text-xs font-bold mb-3">
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Three steps. Two minutes. Week handled.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                n: "01",
                icon: Users,
                title: "Tell Rosie About Your Family",
                body: "Diet preferences, allergies, budget, cooking skill, how much time you have. Rosie remembers everything.",
              },
              {
                n: "02",
                icon: CalendarDays,
                title: "Get Your Custom Week",
                body: "A full 7-day meal plan with recipes, nutritional info, and a drag-and-drop planner. Swap anything you don't like.",
              },
              {
                n: "03",
                icon: ShoppingCart,
                title: "Shop & Cook With Ease",
                body: "One-tap shopping list organized by aisle. Step-by-step recipes. Rosie adjusts portions if plans change.",
              },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <s.icon size={28} className="text-emerald-600" />
                </div>
                <div className="text-3xl font-mono font-bold text-emerald-600 mb-2">
                  {s.n}
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
              <Clock size={14} />
              Takes 2 minutes to set up
            </div>
          </div>
        </Container>
      </section>

      {/* ========= FEATURES ========= */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-emerald-600 uppercase tracking-widest text-xs font-bold mb-3">
              Everything In One Place
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              More than meal planning.
            </h2>
            <p className="text-lg text-neutral-600">
              Rosie starts with dinner. Over time, she watches your
              family&apos;s health — the quiet signals most people miss.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: ChefHat,
                title: "AI Meal Planning",
                desc: "Tell Rosie your constraints. She builds meals your family will actually eat.",
                live: true,
              },
              {
                icon: CalendarDays,
                title: "Weekly Planner",
                desc: "Drag-and-drop your week. Swap meals, adjust portions, plan ahead.",
                live: true,
              },
              {
                icon: ShoppingCart,
                title: "Smart Shopping Lists",
                desc: "Auto-generated from your meal plan. Organized by aisle. One tap to share.",
                live: true,
              },
              {
                icon: Leaf,
                title: "Diet & Allergy Aware",
                desc: "Keto, vegan, diabetes-friendly, picky eaters — Rosie adapts to everyone.",
                live: true,
              },
              {
                icon: Sparkles,
                title: "Travel Dining",
                desc: "On the road? Rosie finds restaurants that match your family's dietary needs.",
                live: true,
              },
              {
                icon: Heart,
                title: "Health Signals",
                desc: "Coming soon: track vitals, flag patterns, prep for doctor visits. The quiet guardian.",
                live: false,
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-[color:var(--brand-cream)] rounded-2xl p-6 border border-neutral-200 hover:border-emerald-400 hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <f.icon size={20} className="text-emerald-600" />
                  </div>
                  {f.live ? (
                    <Badge variant="live">Live</Badge>
                  ) : (
                    <Badge variant="future">Coming Soon</Badge>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========= ROSIE'S ROLE ========= */}
      <section className="py-20 md:py-28 bg-[color:var(--surface-dark)] text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-900/50 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <Shield size={36} className="text-emerald-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Meet Rosie.{" "}
              <span className="text-emerald-400">Your Health Guardian.</span>
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">
              Same AI. Different guardian mindset. In Rate Guardian, Rosie watches
              your mortgage. In Health Guardian, she watches your family&apos;s
              wellness. She&apos;s the warning light — not the mechanic. She never
              diagnoses. She never creates panic. She watches quietly until she
              needs to speak.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              {[
                { trait: "Protective", desc: "Not clinical" },
                { trait: "Proactive", desc: "Not reactive" },
                { trait: "Calm", desc: "Not alarmist" },
              ].map((t) => (
                <div
                  key={t.trait}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="font-bold text-emerald-400">{t.trait}</div>
                  <div className="text-xs text-neutral-500">{t.desc}</div>
                </div>
              ))}
            </div>
            <a
              href="https://myhealthguardian.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-emerald-600 text-white font-semibold text-base hover:bg-emerald-700 transition-all shadow-lg"
            >
              Try Health Guardian Free
              <ArrowRight size={18} />
            </a>
          </div>
        </Container>
      </section>

      {/* ========= GUARDIAN FAMILY CONNECTION ========= */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-neutral-400 uppercase tracking-widest text-xs font-bold mb-3">
              Part of the Guardian Family
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              One AI. Every blind spot.
            </h2>
            <p className="text-neutral-600 mb-8">
              Health Guardian is one spoke in a family of AI guardians — each
              watching a different part of your life. Same Rosie. Same
              intelligence. Different domain.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "Rate Guardian", color: "#0e6b6d", href: "/rate-guardian" },
                { name: "Project Guardian", color: "#c2410c", href: "/project-guardian" },
                { name: "Trade Guardian", color: "#2563eb", href: "/trade-guardian" },
                { name: "Home Guardian", color: "#16a34a", href: "/home-guardian" },
              ].map((g) => (
                <Link
                  key={g.name}
                  href={g.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-neutral-200 hover:border-neutral-400 transition-colors"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: g.color }}
                  />
                  {g.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ========= CLOSING CTA ========= */}
      <section className="py-20 md:py-24 bg-emerald-600 text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Dinner&apos;s handled. Your week&apos;s planned.
            </h2>
            <p className="text-lg text-emerald-100 mb-8">
              Free to start. No credit card. Rosie learns your family in
              2 minutes.
            </p>
            <a
              href="https://myhealthguardian.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-emerald-700 font-semibold text-base hover:bg-emerald-50 transition-all shadow-xl hover:-translate-y-0.5"
            >
              Start My Free Week
              <ArrowRight size={18} />
            </a>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
