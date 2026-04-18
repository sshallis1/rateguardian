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
              alt="Rosie the Rate Guardian"
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
            opportunity opens up, you&apos;ll hear from us.
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
              Book a free 20-minute discovery call. I&apos;ll show you exactly
              where you stand &mdash; individual, practice, or health system level.
            </p>
            <a
              href="https://link.seanshallis.com/widget/bookings/usb_20m"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#c8a550] hover:bg-[#e2c172] text-[#002855] font-semibold py-3.5 transition-colors"
            >
              <Calendar size={16} />
              Book Free Discovery Call
            </a>
          </div>

          {/* USB personal page */}
          <a
            href="https://mortgage.usbank.com/nj-chatham-sean-shallis"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center hover:bg-white/[0.06] transition-colors"
          >
            <p className="text-xs text-blue-200/40 mb-1">Meet Sean at</p>
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

  // Form step
  return (
    <main className="min-h-screen bg-[#002855] text-white">
      <ACCOMNav />

      <div className="max-w-md mx-auto px-5 py-10">
        {/* Rosie logo */}
        <div className="w-28 h-28 mx-auto mb-5 relative">
          <Image
            src="/rosie/rate-guardian-logo.png"
            alt="Rosie the Rate Guardian"
            fill
            className="object-contain drop-shadow-2xl"
            sizes="112px"
            priority
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-center leading-tight mb-3">
          Let Rosie Check
          <br />
          <span className="text-[#14a8ab]">Your Rate &mdash; Free.</span>
        </h1>

        <p className="text-center text-blue-200/60 text-sm mb-2">
          Is your current mortgage rate costing you money? Rosie will find out
          and keep watching &mdash; forever. No cost. No catch.
        </p>

        {/* 100/0 Guarantee inline */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Shield size={14} className="text-[#14a8ab]" />
          <span className="text-xs font-semibold text-[#14a8ab]">
            100/0 GUARANTEE
          </span>
          <span className="text-xs text-blue-200/40">
            &mdash; Zero Obligations. Zero Excuses.
          </span>
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
            placeholder="Phone (for Rosie alerts)"
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
                Let Rosie Check My Rate
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <p className="text-xs text-blue-200/30 text-center pt-1">
            No credit check. Takes 30 seconds. Free forever.
          </p>
        </form>

        {/* What you get */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-200/30 mb-4">
            What Rosie Does For You
          </p>
          <div className="space-y-3">
            {[
              "Checks your current rate against today's market",
              "Monitors daily — alerts you if a savings window opens",
              "If there's an opportunity, offers a free discovery call",
              "Works for individuals, practices, and health systems",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle
                  size={14}
                  className="text-[#14a8ab] flex-shrink-0 mt-0.5"
                />
                <span className="text-sm text-blue-200/60">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Physician program highlights */}
        <div className="mt-6 pt-6 border-t border-white/10">
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
