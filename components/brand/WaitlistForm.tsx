"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface WaitlistFormProps {
  guardian: string;
  className?: string;
}

export function WaitlistForm({ guardian, className }: WaitlistFormProps) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, guardian }),
      });
      if (!res.ok) throw new Error("Signup failed");
      setStatus("success");
      setMessage("You're on the list. We'll email you at launch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again or email sean.shallis@usbank.com.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={
          "flex items-center gap-3 rounded-2xl border border-[color:var(--status-success)]/30 bg-[color:var(--status-success)]/10 px-5 py-4 " +
          (className ?? "")
        }
      >
        <div className="w-8 h-8 rounded-full bg-[color:var(--status-success)] flex items-center justify-center">
          <Check size={16} className="text-white" />
        </div>
        <div>
          <div className="font-semibold text-[color:var(--status-success)]">You're on the list</div>
          <div className="text-sm text-neutral-400">{message}</div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={"flex flex-col sm:flex-row gap-3 " + (className ?? "")}
    >
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-neutral-500 focus-visible:border-white/40"
      />
      <Button
        type="submit"
        variant="primary"
        size="default"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Adding…" : "Notify Me"}
      </Button>
      {status === "error" && (
        <div className="text-sm text-[color:var(--status-error)] sm:ml-4">
          {message}
        </div>
      )}
    </form>
  );
}
