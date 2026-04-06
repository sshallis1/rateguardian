import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, Briefcase } from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { TrustBar } from "@/components/brand/TrustBar";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About Sean Shallis — The Mind Behind Rosie",
  description:
    "30+ years of mortgage wisdom. WSJ & NYT featured. Amazon bestseller. The story behind Rate Guardian and the Guardian Family platform.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)]">
      <SpokeNav />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="teal" className="mb-6">About Sean</Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight mb-6">
              Three decades of wisdom.
              <br />
              <span className="text-gradient-brand">
                One AI that never sleeps.
              </span>
            </h1>
            <p className="text-xl text-neutral-700 leading-relaxed">
              Sean Shallis is a Private Wealth Mortgage Strategist at U.S. Bank
              — the 5th largest bank in the world. He's guided{" "}
              <strong>$1 billion+</strong> in transactions, authored the
              Amazon bestseller <em>10X House Selling Secrets</em>, and been
              featured in the Wall Street Journal, New York Times, Bloomberg,
              and CNBC.
            </p>
          </div>
        </Container>
      </section>

      <TrustBar />

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
              The Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-12">
              From Army Rangers to AI Guardians.
            </h2>

            <div className="space-y-10 relative">
              <div
                className="absolute left-5 top-0 bottom-0 w-px bg-neutral-200"
                aria-hidden
              />
              {[
                {
                  year: "Early Career",
                  title: "U.S. Army Elite Rangers",
                  body:
                    "Learned that preparation and discipline aren't abstractions — they're the margin between winning and losing.",
                },
                {
                  year: "1995+",
                  title: "Real Estate & Mortgage",
                  body:
                    "Three decades guiding families through $1B+ in transactions. Saw firsthand how the biggest financial decision of most people's lives gets made in the dark.",
                },
                {
                  year: "2010s",
                  title: "Keller Williams MAPS Coach",
                  body:
                    "Coached elite producers and leadership teams. Formally trained in NLP (Neuro-Linguistic Programming). Developed the Billion Dollar Blind Spot™ framework.",
                },
                {
                  year: "2020",
                  title: "Amazon #1 Bestseller",
                  body:
                    "Published 10X House Selling Secrets — #1 in Business/Buying & Selling within 12 hours of release.",
                },
                {
                  year: "Now",
                  title: "Rate Guardian + AI Built on 30 Years",
                  body:
                    "Rosie is the distillation of three decades of knowing what most loan officers never bother to watch. She doesn't replace the wisdom — she scales it.",
                },
              ].map((step) => (
                <div key={step.title} className="relative pl-14">
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center text-white">
                    <Briefcase size={16} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[color:var(--brand-teal)] font-bold mb-1">
                    {step.year}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Frameworks */}
      <section className="py-20 md:py-28 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="text-[color:var(--brand-teal)] uppercase tracking-widest text-xs font-bold mb-3">
              Proprietary Frameworks
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Systems built from three decades of pattern recognition.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Billion Dollar Blind Spot™",
                body:
                  "The hidden constraint that silently caps production — for businesses and personal wealth alike.",
              },
              {
                name: "10X Personal Success Formula™",
                body:
                  "The framework behind the bestseller. Break down your numbers, find the growth, build what lasts.",
              },
              {
                name: "Internal Intelligence™ (I²)",
                body:
                  "The discipline of knowing your own patterns before you try to master a market's.",
              },
              {
                name: "Core Passion & Purpose (CP²)",
                body:
                  "Not motivation. Architecture — the thing you're built to do regardless of whether anyone's watching.",
              },
              {
                name: "AIDA Strategic Execution Model",
                body:
                  "Attention, Interest, Decision, Action — reworked for modern financial decision-making.",
              },
              {
                name: "Success Addiction Framework",
                body:
                  "Blending mindset mastery with tactical business systems. Used by the Success Addicts Collective.",
              },
            ].map((f) => (
              <div
                key={f.name}
                className="bg-white rounded-2xl border border-neutral-200 p-6 hover:border-[color:var(--brand-teal)] transition-colors"
              >
                <Award className="w-6 h-6 text-[color:var(--brand-gold)] mb-3" />
                <h3 className="font-bold text-lg mb-2">{f.name}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[color:var(--brand-teal)] text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to work with Sean directly?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Start with a free Savings Score. If the window's open, Sean
              closes it.
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
