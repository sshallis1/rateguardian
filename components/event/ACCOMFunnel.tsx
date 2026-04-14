"use client";

import * as React from "react";
import {
  ArrowRight,
  Home,
  Search,
  TrendingDown,
  CheckCircle,
  Calendar,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Stage = "buyer" | "shopper" | "optimizer";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  stage: Stage | null;
}

const PATHS: { id: Stage; icon: typeof Home; label: string; sub: string }[] = [
  {
    id: "buyer",
    icon: Home,
    label: "Getting Started",
    sub: "I need pre-approval or I'm just exploring",
  },
  {
    id: "shopper",
    icon: Search,
    label: "Actively Shopping",
    sub: "I'm under contract or comparing options",
  },
  {
    id: "optimizer",
    icon: TrendingDown,
    label: "Already Own",
    sub: "I have a mortgage — am I overpaying?",
  },
];

const VALUE_DELIVERY: Record<Stage, { title: string; bullets: string[] }> = {
  buyer: {
    title: "Your Pre-Approval Strategy is Ready",
    bullets: [
      "Physician-specific loan programs with $0 down",
      "Pre-approval that makes sellers take you seriously",
      "Rate lock strategies that protect you while you search",
      "Student loan treatment that most lenders get wrong",
    ],
  },
  shopper: {
    title: "Your Rate Optimization Strategy",
    bullets: [
      "Side-by-side rate comparison with institutional pricing",
      "Fee analysis — most physicians overpay $3K-$8K in hidden fees",
      "Rate lock timing strategy based on market momentum",
      "Closing cost negotiation playbook",
    ],
  },
  optimizer: {
    title: "Your Savings Scan Results",
    bullets: [
      "Rosie will monitor your rate daily — free, forever",
      "Alert the moment a savings window opens",
      "Breakeven analysis so you never refi too early",
      "ARM adjustment protection for variable-rate holders",
    ],
  },
};

export function ACCOMFunnel() {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    stage: null,
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  function selectPath(stage: Stage) {
    setForm((prev) => ({ ...prev, stage }));
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.firstName || !form.stage || submitting) return;
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/rg/intake/accom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStep(3);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Step 1: Path selection
  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto px-5">
        <p className="text-center text-sm text-neutral-500 mb-6 uppercase tracking-widest font-mono">
          Where are you in your journey?
        </p>
        <div className="grid gap-3">
          {PATHS.map((p) => (
            <button
              key={p.id}
              onClick={() => selectPath(p.id)}
              className="group flex items-center gap-4 w-full text-left rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[color:var(--brand-teal)]/40 transition-all p-5"
            >
              <div className="w-12 h-12 rounded-xl bg-[color:var(--brand-teal)]/10 flex items-center justify-center text-[color:var(--brand-teal-light)] group-hover:bg-[color:var(--brand-teal)]/20 transition-colors">
                <p.icon size={22} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{p.label}</div>
                <div className="text-sm text-neutral-500">{p.sub}</div>
              </div>
              <ArrowRight
                size={18}
                className="text-neutral-600 group-hover:text-[color:var(--brand-teal-light)] transition-colors"
              />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step 2: Contact form
  if (step === 2) {
    const selected = PATHS.find((p) => p.id === form.stage)!;
    return (
      <div className="max-w-md mx-auto px-5">
        <button
          onClick={() => setStep(1)}
          className="text-sm text-neutral-500 hover:text-white mb-4 transition-colors"
        >
          &larr; Back
        </button>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[color:var(--brand-teal)]/10 flex items-center justify-center text-[color:var(--brand-teal-light)]">
              <selected.icon size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                {selected.label}
              </div>
              <div className="text-xs text-neutral-500">{selected.sub}</div>
            </div>
          </div>

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
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[color:var(--brand-teal)] transition-colors"
              />
              <input
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, lastName: e.target.value }))
                }
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[color:var(--brand-teal)] transition-colors"
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
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[color:var(--brand-teal)] transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone (for Rosie alerts)"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[color:var(--brand-teal)] transition-colors"
            />

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[color:var(--brand-teal)] hover:bg-[color:var(--brand-teal-dark)] text-white font-semibold py-3.5 transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Start My Free Scan
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <p className="text-xs text-neutral-600 text-center">
              No credit impact. No obligation. Takes 30 seconds.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Step 3: Value delivery + booking
  const delivery = VALUE_DELIVERY[form.stage!];
  return (
    <div className="max-w-lg mx-auto px-5 animate-fade-in">
      <div className="rounded-2xl border border-[color:var(--brand-teal)]/30 bg-[color:var(--brand-teal)]/5 p-6 mb-6">
        <div className="flex items-center gap-2 text-[color:var(--brand-teal-light)] font-semibold mb-4">
          <CheckCircle size={20} />
          {delivery.title}
        </div>
        <ul className="space-y-3">
          {delivery.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm">
              <CheckCircle
                size={14}
                className="text-[color:var(--brand-teal-light)] flex-shrink-0 mt-0.5"
              />
              <span className="text-neutral-300">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center text-white font-bold text-lg">
          R
        </div>
        <p className="text-neutral-400 text-sm mb-1">
          Rosie is now watching your rate.
        </p>
        <p className="text-white font-semibold mb-5">
          Book a Private Strategy Session with Sean
        </p>
        <a
          href="https://link.seanshallis.com/widget/bookings/usb_20m"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[color:var(--brand-gold)] hover:bg-[color:var(--brand-gold-light)] text-[color:var(--brand-navy)] font-semibold py-3.5 transition-colors"
        >
          <Calendar size={18} />
          Book 20-Minute Strategy Call
        </a>
        <p className="text-xs text-neutral-600 mt-3">
          No cost. No obligation. Just clarity.
        </p>
      </div>

      <p className="text-center text-xs text-neutral-600 mt-6">
        Sean Shallis · Private Wealth Mortgage Strategist · U.S. Bank · NMLS
        #2362814
      </p>
    </div>
  );
}
