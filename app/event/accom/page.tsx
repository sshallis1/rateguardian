import type { Metadata } from "next";
import { ACCOMFunnel } from "@/components/event/ACCOMFunnel";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Private Wealth Strategy for Medical Professionals — Sean Shallis",
  description:
    "Stop overpaying. See what you're missing in 30 seconds. Free financial blind spot scan for physicians and healthcare professionals.",
};

export default function ACCOMPage() {
  return (
    <main className="min-h-screen bg-[color:var(--surface-dark)] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 0%, rgba(14, 107, 109, 0.25), transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(200, 165, 80, 0.1), transparent 50%)",
          }}
          aria-hidden
        />
        <div className="relative max-w-3xl mx-auto px-5 pt-12 pb-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[color:var(--brand-teal-light)] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--brand-teal-light)] animate-pulse" />
            ACCOM 2026 — Exclusive
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-5">
            Most Medical Professionals
            <br />
            <span className="text-[color:var(--brand-teal-light)]">
              Are Overpaying.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed mb-3 max-w-xl mx-auto">
            See what you&apos;re missing in 30 seconds. No cost. No commitment.
            Just clarity.
          </p>
          <p className="text-sm text-neutral-500 mb-8">
            Free financial blind spot scan — only available at this event.
          </p>
        </div>
      </section>

      {/* Funnel */}
      <section className="pb-12">
        <ACCOMFunnel />
      </section>

      {/* Trust bar */}
      <section className="border-t border-white/10 py-10">
        <div className="max-w-3xl mx-auto px-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { stat: BRAND.stats.years, label: "Years Experience" },
              { stat: BRAND.stats.transactions, label: "In Transactions" },
              { stat: BRAND.stats.families, label: "Families Helped" },
              { stat: BRAND.stats.book, label: "Amazon Author" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-bold text-[color:var(--brand-teal-light)]">
                  {s.stat}
                </div>
                <div className="text-xs text-neutral-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media logos */}
      <section className="border-t border-white/10 py-8">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-xs text-neutral-600 text-center mb-4 uppercase tracking-widest">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-neutral-500 font-medium">
            {BRAND.mediaLogos.map((logo) => (
              <span key={logo}>{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-neutral-600">
        <p>
          Sean Shallis · Private Wealth Mortgage Strategist · {BRAND.bank} ·{" "}
          {BRAND.nmls}
        </p>
        <p className="mt-1">
          {BRAND.contact.phone} · {BRAND.contact.email}
        </p>
      </footer>
    </main>
  );
}
