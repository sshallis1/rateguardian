import type { Metadata } from "next";
import { ACCOMFunnel } from "@/components/event/ACCOMFunnel";
import { RosieStory } from "@/components/event/RosieStory";
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
          <div className="inline-flex items-center gap-2 rounded-full bg-[#D71E28]/20 border border-[#D71E28]/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff6b6b] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D71E28] animate-pulse" />
            ACCOM 2026 &mdash; Members Only
          </div>

          {/* Welcome + Rosie intro */}
          <p className="text-sm sm:text-base text-blue-200/60 mb-4 tracking-wide">
            Welcome, ACCOM Members.
          </p>

          {/* Rosie avatar */}
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#14a8ab] to-[#0e6b6d] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#0e6b6d]/30 ring-2 ring-[#14a8ab]/20 ring-offset-2 ring-offset-[#002855]">
            R
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-5">
            Meet{" "}
            <span className="bg-gradient-to-r from-[#14a8ab] via-[#0e6b6d] to-[#14a8ab] bg-clip-text text-transparent">
              Rosie.
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/80 leading-tight mt-2 block">
              Your Rate Guardian.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-blue-200/70 leading-relaxed mb-3 max-w-xl mx-auto">
            Let Rosie clear the financial fog &mdash; so you never overpay again.
          </p>

          {/* 100/0 Guarantee */}
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-[#14a8ab]/30 px-6 py-3 mb-8">
            <div className="text-3xl font-black bg-gradient-to-b from-[#14a8ab] to-[#0e6b6d] bg-clip-text text-transparent leading-none">
              100/0
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-[#14a8ab] uppercase tracking-wider">
                Guarantee
              </div>
              <div className="text-xs text-blue-200/50">
                100% Zero Obligations. Zero Excuses.
              </div>
            </div>
          </div>

          <p className="text-sm text-blue-300/40 mb-8">
            Exclusively designed for ACCOM members. Takes 30 seconds.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-2">
            {[
              { icon: Shield, text: "No Credit Impact" },
              { icon: Zap, text: "30-Second Scan" },
              { icon: Star, text: "Free Forever" },
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

      {/* Rosie Origin Story */}
      <RosieStory />

      {/* Funnel */}
      <section id="accom-funnel" className="py-12">
        <ACCOMFunnel />
      </section>

      {/* Stats bar — white section for contrast */}
      <section className="bg-white text-[#002855]">
        <div className="max-w-3xl mx-auto px-5 py-14">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#D71E28] mb-8">
            Why Physicians Trust Sean Shallis
          </p>
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
                  size={20}
                  className="mx-auto mb-2 text-[#D71E28]"
                />
                <div className="text-3xl sm:text-4xl font-black text-[#002855]">
                  {s.stat}
                </div>
                <div className="text-xs text-[#002855]/50 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media logos — light gray band */}
      <section className="bg-neutral-100 py-8 border-y border-neutral-200">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-xs text-neutral-400 text-center mb-5 uppercase tracking-widest font-semibold">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-neutral-500 font-semibold">
            {BRAND.mediaLogos.map((logo) => (
              <span
                key={logo}
                className="hover:text-[#002855] transition-colors cursor-default"
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
