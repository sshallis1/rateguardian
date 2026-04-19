"use client";

import * as React from "react";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Loader2,
  Headphones,
  Calendar,
} from "lucide-react";
import { ACCOMNav } from "./ACCOMNav";

export function ACCOMScan() {
  const [step, setStep] = React.useState<"form" | "thanks">("form");
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.firstName || submitting) return;
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/rg/intake/accom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, stage: "optimizer" }),
      });

      if (!res.ok) throw new Error("Failed");
      setStep("thanks");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "thanks") {
    return (
      <main className="min-h-screen bg-[#002855] text-white">
        <ACCOMNav />

        <div className="max-w-lg mx-auto px-5 py-12 text-center">
          {/* Rosie logo */}
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <Image
              src="/rosie/rate-guardian-logo.png"
              alt="Rate Guardian"
              fill
              className="object-contain"
              sizes="96px"
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-[#14a8ab] font-semibold text-lg mb-2">
            <CheckCircle size={22} />
            You&apos;re on Rosie&apos;s Watch List!
          </div>

          <p className="text-blue-200/60 mb-8">
            Rosie is now monitoring your rate &mdash; free, forever. If a savings
            opportunity opens up, you&apos;ll hear from Sean directly.
          </p>

          {/* Podcast CTA */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 mb-5 text-left">
            <div className="flex items-center gap-3 mb-3">
              <Headphones size={20} className="text-[#c8a550]" />
              <span className="font-semibold">Thank You Gift</span>
            </div>
            <p className="text-sm text-blue-200/60 mb-4">
              Listen to how physicians are saving $200&ndash;$400/month and why
              working with a dedicated physician lending strategist makes the
              difference.
            </p>
            <a
              href="https://link.seanshallis.com/widget/bookings/usb_20m"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#14a8ab] hover:text-[#14a8ab]/80 transition-colors"
            >
              Listen to The Loan Doctor Podcast
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Discovery Call CTA */}
          <div className="rounded-2xl border border-[#c8a550]/30 bg-[#c8a550]/5 p-6 text-left">
            <div className="flex items-center gap-3 mb-3">
              <Calendar size={20} className="text-[#c8a550]" />
              <span className="font-semibold">Ready to See Your Numbers?</span>
            </div>
            <p className="text-sm text-blue-200/60 mb-4">
              Book a free 20-minute strategy call. Sean will show you exactly
              where you stand &mdash; individual, practice, or health system level.
            </p>
            <a
              href="https://link.seanshallis.com/widget/bookings/usb_20m"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#c8a550] hover:bg-[#e2c172] text-[#002855] font-semibold py-3.5 transition-colors"
            >
              <Calendar size={16} />
              Book Free Strategy Call
            </a>
          </div>

          {/* USB personal page */}
          <a
            href="https://mortgage.usbank.com/nj-chatham-sean-shallis"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center hover:bg-white/[0.06] transition-colors"
          >
            <p className="text-xs text-blue-200/40 mb-1">Learn more at</p>
            <p className="text-sm font-semibold text-white">
              U.S. Bank Home Mortgage
            </p>
          </a>

          <p className="text-xs text-blue-200/30 mt-8">
            Sean Shallis &middot; Private Wealth Mortgage Strategist &middot;
            U.S. Bank &middot; NMLS #2362814
          </p>
        </div>
      </main>
    );
  }

  // Form step — leads with Sean's authority, Rosie as the value-add
  return (
    <main className="min-h-screen bg-[#002855] text-white">
      <ACCOMNav />

      <div className="max-w-md mx-auto px-5 py-10">
        {/* Sean identity */}
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-200/40 font-semibold mb-2">
            U.S. Bank &middot; Private Wealth
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-1">
            Sean Shallis
          </h1>
          <p className="text-sm text-[#14a8ab] font-semibold mb-3">
            National Physician Loan Expert
          </p>
        </div>

        {/* Value prop */}
        <div className="text-center mb-6">
          <p className="text-xl sm:text-2xl font-bold mb-2">
            Are You Overpaying on
            <br />
            <span className="text-[#14a8ab]">Your Mortgage?</span>
          </p>
          <p className="text-sm text-blue-200/50">
            Most physicians overpay $50K&ndash;$200K+ in unnecessary mortgage interest.
            Let&apos;s find out if you&apos;re one of them.
          </p>
        </div>

        {/* Rosie value-add badge */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-8 relative flex-shrink-0">
            <Image
              src="/rosie/rate-guardian-logo.png"
              alt="Rate Guardian"
              fill
              className="object-contain"
              sizes="32px"
            />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-[#14a8ab]">
              + Rate Guardian AI Monitoring
            </p>
            <p className="text-[10px] text-blue-200/40">
              Free forever. No credit impact.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First name"
              required
              value={form.firstName}
              onChange={(e) =>
                setForm((f) => ({ ...f, firstName: e.target.value }))
              }
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#14a8ab] transition-colors"
            />
            <input
              type="text"
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) =>
                setForm((f) => ({ ...f, lastName: e.target.value }))
              }
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#14a8ab] transition-colors"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({ ...f, email: e.target.value }))
            }
            className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#14a8ab] transition-colors"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm((f) => ({ ...f, phone: e.target.value }))
            }
            className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#14a8ab] transition-colors"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#14a8ab] hover:bg-[#0e6b6d] text-white font-semibold py-4 text-base transition-colors disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                See If I&apos;m Overpaying
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <p className="text-xs text-blue-200/30 text-center pt-1">
            No credit check. Takes 30 seconds. Free forever.
          </p>
        </form>

        {/* Physician program highlights */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#D71E28]/60 mb-4">
            U.S. Bank Physician Loan Programs
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { stat: "100%", label: "Financing Available" },
              { stat: "$0", label: "PMI Required" },
              { stat: "$3M", label: "Loan Amounts" },
              { stat: "6 mo", label: "Residency Eligible" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-3 text-center"
              >
                <div className="text-lg font-bold text-white">{item.stat}</div>
                <div className="text-[10px] text-blue-200/40">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise note */}
        <div className="mt-6 rounded-lg bg-white/[0.03] border border-white/[0.06] p-4">
          <p className="text-xs text-blue-200/50 leading-relaxed">
            <span className="font-semibold text-blue-200/70">For practices &amp; health systems:</span>{" "}
            Sean partners with hospitals and medical groups to provide
            homeownership education and lending solutions as an employee
            benefit — at zero cost to the employer.
          </p>
        </div>

        <p className="text-center text-xs text-blue-200/20 mt-8">
          Sean Shallis &middot; Private Wealth Mortgage Strategist &middot;
          U.S. Bank &middot; NMLS #2362814
          <br />
          (973) 457-2278 &middot; sean.shallis@usbank.com
        </p>
      </div>
    </main>
  );
}
