"use client";

import * as React from "react";
import { X, Download, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TenXFormulaModalProps {
  open: boolean;
  onClose: () => void;
}

export function TenXFormulaModal({ open, onClose }: TenXFormulaModalProps) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [smsConsent, setSmsConsent] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = React.useState("");
  const [downloadUrl, setDownloadUrl] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/leads/10x-formula", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, smsConsent }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      setDownloadUrl(data.downloadUrl);
      setStatus("success");
    } catch {
      setError("Network error. Try again.");
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tenx-modal-title"
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
        >
          <X size={18} className="text-neutral-600" />
        </button>

        {status === "success" ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[color:var(--brand-teal)]/10 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-[color:var(--brand-teal)]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">You&apos;re all set</h3>
            <p className="text-neutral-600 mb-6">
              Your copy of the <strong>10X Personal Success Formula™</strong> is ready.
              We&apos;ll also text you a link to keep handy.
            </p>
            <a
              href={downloadUrl}
              download
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold hover:bg-[color:var(--brand-teal-dark)] transition-colors"
            >
              <Download size={16} />
              Download the Formula
            </a>
          </div>
        ) : (
          <div className="p-8">
            <div className="text-[color:var(--brand-gold)] uppercase tracking-widest text-xs font-bold mb-2">
              Free Download
            </div>
            <h3 id="tenx-modal-title" className="text-2xl font-bold leading-tight mb-2">
              10X Personal Success Formula™
            </h3>
            <p className="text-sm text-neutral-600 mb-6">
              The mindset and daily practice that Sean uses with physicians, agents, and investors
              to compound wealth, health, and purpose. Enter your info and we&apos;ll text you the link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  autoComplete="given-name"
                />
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  autoComplete="family-name"
                />
              </div>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
              />
              <Input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 555-5555"
                autoComplete="tel"
              />

              <label className="flex items-start gap-3 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-neutral-300 text-[color:var(--brand-teal)] focus:ring-[color:var(--brand-teal)]"
                />
                <span className="text-xs text-neutral-600 leading-relaxed">
                  I agree to receive the download link and occasional follow-ups via SMS and email
                  from Sean Shallis / iMarketingGuru. Msg &amp; data rates may apply. Reply STOP to opt out,
                  HELP for help. Consent is not a condition of any purchase.
                </span>
              </label>

              {status === "error" && error && (
                <div className="text-sm text-[color:var(--status-error)]">{error}</div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending…" : "Send Me the Formula"}
              </Button>

              <p className="text-[10px] text-neutral-500 text-center leading-relaxed">
                We respect your privacy. Your info is used to deliver the download and stays
                inside Sean&apos;s private contact list. No sharing, no selling.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
