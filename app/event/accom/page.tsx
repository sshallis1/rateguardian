import type { Metadata } from "next";
import { ACCOMFunnel } from "@/components/event/ACCOMFunnel";
import { TestimonialStreamer } from "@/components/event/TestimonialStreamer";
import { BRAND } from "@/lib/brand";
import { Shield, Star, Award, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Private Wealth Strategy for Medical Professionals — Sean Shallis",
  description:
    "Stop overpaying. See what you're missing in 30 seconds. Free financial blind spot scan for physicians and healthcare professionals.",
};

export default function ACCOMPage() {
  return (
    <main className="min-h-screen bg-[#002855] text-white">
      {/* U.S. Bank branded header bar */}
      <div className="bg-[#D71E28] py-2 px-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wide text-white/90">
            U.S. Bank &middot; Private Wealth Mortgage Division
          </span>
          <span className="text-xs text-white/70 hidden sm:block">
            ACCOM 2026 &middot; Exclusive Event Access
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Gradient overlays for depth */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 0%, rgba(215, 30, 40, 0.15), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(14, 107, 109, 0.2), transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(0, 40, 85, 0.8), transparent 70%)",
          }}
          aria-hidden
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />

        <div className="relative max-w-3xl mx-auto px-5 pt-14 pb-10 text-center">
          {/* Event badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#D71E28]/20 border border-[#D71E28]/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff6b6b] mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D71E28] animate-pulse" />
            ACCOM 2026 &mdash; Conference Exclusive
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-5">
            Most Medical Professionals
            <br />
            <span className="bg-gradient-to-r from-[#14a8ab] via-[#0e6b6d] to-[#14a8ab] bg-clip-text text-transparent">
              Are Overpaying.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-200/70 leading-relaxed mb-3 max-w-xl mx-auto">
            See what you&apos;re missing in 30 seconds. No cost. No commitment.
            Just clarity.
          </p>
          <p className="text-sm text-blue-300/40 mb-10">
            Free financial blind spot scan &mdash; only available at this event.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-2">
            {[
              { icon: Shield, text: "No Credit Impact" },
              { icon: Zap, text: "30-Second Scan" },
              { icon: Star, text: "100% Free" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/10 px-3.5 py-1.5 text-xs text-blue-200/80"
              >
                <Icon size={12} className="text-[#14a8ab]" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funnel */}
      <section className="pb-12">
        <ACCOMFunnel />
      </section>

      {/* Stats bar with U.S. Bank red accent */}
      <section className="relative border-t border-white/10">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D71E28] to-transparent" />
        <div className="max-w-3xl mx-auto px-5 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              {
                stat: BRAND.stats.years,
                label: "Years Experience",
                icon: Award,
              },
              {
                stat: BRAND.stats.transactions,
                label: "In Transactions",
                icon: Zap,
              },
              {
                stat: BRAND.stats.families,
                label: "Families Helped",
                icon: Shield,
              },
              {
                stat: BRAND.stats.book,
                label: "Amazon Author",
                icon: Star,
              },
            ].map((s) => (
              <div key={s.label} className="group">
                <s.icon
                  size={18}
                  className="mx-auto mb-2 text-[#D71E28]/60 group-hover:text-[#D71E28] transition-colors"
                />
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {s.stat}
                </div>
                <div className="text-xs text-blue-200/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media logos */}
      <section className="border-t border-white/10 py-8">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-xs text-blue-200/30 text-center mb-5 uppercase tracking-widest">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-blue-200/50 font-medium">
            {BRAND.mediaLogos.map((logo) => (
              <span
                key={logo}
                className="hover:text-white transition-colors cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Streamer */}
      <TestimonialStreamer />

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-blue-200/40">
        <p>
          Sean Shallis &middot; Private Wealth Mortgage Strategist &middot;{" "}
          {BRAND.bank} &middot; {BRAND.nmls}
        </p>
        <p className="mt-1">
          {BRAND.contact.phone} &middot; {BRAND.contact.email}
        </p>
        <p className="mt-2 text-blue-200/20">
          Equal Housing Lender. Member FDIC.
        </p>
      </footer>
    </main>
  );
}
