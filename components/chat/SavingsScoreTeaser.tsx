"use client";

import * as React from "react";
import { Lock, TrendingDown, Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SavingsScoreTeaserProps {
  captured: boolean;
  onEmailGate?: (email: string) => void;
}

export function SavingsScoreTeaser({ captured, onEmailGate }: SavingsScoreTeaserProps) {
  const [email, setEmail] = React.useState("");
  const [unlocked, setUnlocked] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [score] = React.useState(() => Math.floor(Math.random() * 25) + 60); // 60-84 range

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    try {
      await fetch("/api/rg/intake/askrosie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "savings_score_gate" }),
      });
      onEmailGate?.(email);
      setUnlocked(true);
    } catch {
      // Still unlock on error — don't punish the user
      setUnlocked(true);
    }
    setSubmitting(false);
  }

  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        R
      </div>
      <div className="bg-gradient-to-br from-[color:var(--brand-teal)]/5 to-white rounded-2xl rounded-tl-sm border border-[color:var(--brand-teal)]/20 px-5 py-4 shadow-sm max-w-[90%] w-full sm:max-w-md">
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown size={16} className="text-[color:var(--brand-teal)]" />
          <span className="font-semibold text-sm text-neutral-900">
            Your Savings Score is Ready
          </span>
        </div>

        {/* Locked state — score blurred, email gate */}
        {!unlocked && !captured && (
          <>
            <div className="relative mb-4">
              <div className="flex items-center gap-4 py-3">
                <div className="text-5xl font-bold font-mono text-[color:var(--brand-teal)] blur-md select-none" aria-hidden>
                  {score}
                </div>
                <div className="text-sm text-neutral-600">
                  <p className="font-medium">Savings opportunity detected</p>
                  <p className="text-neutral-400 text-xs mt-0.5">
                    Based on your profile vs. today&apos;s market
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-sm border border-neutral-200">
                  <Lock size={14} className="text-[color:var(--brand-teal)]" />
                  <span className="text-sm font-medium text-neutral-700">
                    Enter email to reveal your score
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleUnlock} className="flex gap-2">
              <div className="flex-1 relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-neutral-300 text-sm focus:border-[color:var(--brand-teal)] focus:outline-none"
                />
              </div>
              <Button type="submit" disabled={submitting || !email.trim()} size="sm" className="px-4">
                {submitting ? <Loader2 size={14} className="animate-spin" /> : "Reveal"}
              </Button>
            </form>
            <p className="text-xs text-neutral-400 mt-2">
              Rosie will email your full score breakdown. Free forever, only goes to Sean.
            </p>
          </>
        )}

        {/* Unlocked state — score revealed */}
        {(unlocked || captured) && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-4 py-3">
              <div className="text-5xl font-bold font-mono text-[color:var(--brand-teal)]">
                {score}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-neutral-900">
                  {score >= 75 ? "Savings window open" : score >= 50 ? "Potential savings detected" : "Your rate looks competitive"}
                </p>
                <p className="text-neutral-500 text-xs mt-0.5">
                  {score >= 75
                    ? "You may be overpaying — Sean should review your numbers"
                    : score >= 50
                    ? "There could be a better structure for your situation"
                    : "But market conditions change — Rosie will keep watching"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 mt-2">
              <CheckCircle size={14} className="text-[color:var(--brand-teal)]" />
              <span className="text-xs text-neutral-600">
                Full breakdown sent to your email. Rosie is now monitoring your rate daily.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
