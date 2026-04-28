"use client";

import * as React from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProgressiveCaptureProps {
  intentScore: number;
  messageCount: number;
  onCaptured?: (data: { email: string; firstName?: string; phone?: string }) => void;
}

type Stage = "email" | "name" | "phone" | "done";

export function ProgressiveCapture({
  intentScore,
  messageCount,
  onCaptured,
}: ProgressiveCaptureProps) {
  const [stage, setStage] = React.useState<Stage>("email");
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  // Don't show until threshold met — or if savings teaser already captured email
  const shouldShow = intentScore > 50 || messageCount >= 3;
  if (!shouldShow || stage === "done") return null;

  // After email captured + 2 more messages, show name
  const showName = stage === "name";
  // After strong intent, show phone
  const showPhone = stage === "phone";

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    try {
      await fetch("/api/rg/intake/askrosie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      onCaptured?.({ email });
      setStage("name");
    } catch {
      // Silent
    }
    setSubmitting(false);
  }

  async function submitName(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch("/api/rg/intake/askrosie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });
      onCaptured?.({ email, firstName });
      if (intentScore > 75) {
        setStage("phone");
      } else {
        setStage("done");
      }
    } catch {
      // Silent
    }
    setSubmitting(false);
  }

  async function submitPhone(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch("/api/rg/intake/askrosie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, phone }),
      });
      onCaptured?.({ email, firstName, phone });
      setStage("done");
    } catch {
      // Silent
    }
    setSubmitting(false);
  }

  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        R
      </div>
      <div className="bg-white rounded-2xl rounded-tl-sm border border-neutral-200 px-5 py-4 shadow-sm max-w-[90%] w-full sm:max-w-md">
        {stage === "email" && (
          <>
            <p className="text-neutral-800 text-sm font-medium mb-3">
              Your Savings Score is almost ready. Drop your email and
              Rosie will send it — plus start monitoring your rate daily.
            </p>
            <form onSubmit={submitEmail} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:border-[color:var(--brand-teal)] focus:outline-none"
              />
              <Button type="submit" disabled={submitting || !email.trim()} size="sm">
                {submitting ? <Loader2 size={14} className="animate-spin" /> : "Go"}
              </Button>
            </form>
            <p className="text-xs text-neutral-400 mt-2">
              Free forever. Only goes to Sean.
            </p>
          </>
        )}

        {showName && (
          <>
            <p className="flex items-center gap-2 text-[color:var(--brand-teal)] text-sm font-medium mb-2">
              <CheckCircle size={14} /> Rosie's watching your rate.
            </p>
            <p className="text-neutral-700 text-sm mb-3">
              What's your first name? Sean likes to reach out personally.
            </p>
            <form onSubmit={submitName} className="flex gap-2">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:border-[color:var(--brand-teal)] focus:outline-none"
              />
              <Button type="submit" disabled={submitting} size="sm">
                {submitting ? <Loader2 size={14} className="animate-spin" /> : "Save"}
              </Button>
            </form>
          </>
        )}

        {showPhone && (
          <>
            <p className="flex items-center gap-2 text-[color:var(--brand-teal)] text-sm font-medium mb-2">
              <CheckCircle size={14} /> Thanks, {firstName || "friend"}!
            </p>
            <p className="text-neutral-700 text-sm mb-3">
              Drop your number and Sean will text you directly with your Savings Score.
            </p>
            <form onSubmit={submitPhone} className="flex gap-2">
              <input
                type="tel"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 text-sm focus:border-[color:var(--brand-teal)] focus:outline-none"
              />
              <Button type="submit" disabled={submitting} size="sm">
                {submitting ? <Loader2 size={14} className="animate-spin" /> : "Send"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function CapturedConfirmation({ firstName }: { firstName?: string }) {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        R
      </div>
      <div className="bg-white rounded-2xl rounded-tl-sm border border-neutral-200 px-5 py-4 shadow-sm max-w-[85%]">
        <p className="flex items-center gap-2 text-[color:var(--brand-teal)] font-semibold">
          <CheckCircle size={16} /> You're on Rosie's radar.
        </p>
        <p className="text-neutral-600 text-sm mt-1">
          Sean will reach out personally
          {firstName ? `, ${firstName}` : ""}. In the meantime, Rosie is
          already watching rates for you.
        </p>
      </div>
    </div>
  );
}
