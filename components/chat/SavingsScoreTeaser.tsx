"use client";

import { Lock, TrendingDown } from "lucide-react";
import Link from "next/link";

interface SavingsScoreTeaserProps {
  captured: boolean;
}

export function SavingsScoreTeaser({ captured }: SavingsScoreTeaserProps) {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        R
      </div>
      <div className="bg-gradient-to-br from-[color:var(--brand-teal)]/5 to-white rounded-2xl rounded-tl-sm border border-[color:var(--brand-teal)]/20 px-5 py-4 shadow-sm max-w-[85%]">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown size={16} className="text-[color:var(--brand-teal)]" />
          <span className="font-semibold text-sm text-neutral-900">
            Your Savings Score Preview
          </span>
        </div>
        <div className="relative">
          <div className="flex items-center gap-4 py-3">
            <div className="text-4xl font-bold font-mono text-[color:var(--brand-teal)] blur-sm select-none">
              73
            </div>
            <div className="text-sm text-neutral-600">
              <p className="font-medium">Potential savings detected</p>
              <p className="text-neutral-400">
                Based on current market rates vs your profile
              </p>
            </div>
          </div>
          {!captured && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-lg">
              <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--brand-teal)]">
                <Lock size={14} />
                Sign up free to see your full score
              </div>
            </div>
          )}
        </div>
        {captured && (
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-[color:var(--brand-teal)] hover:underline"
          >
            Create your free account to unlock full monitoring
          </Link>
        )}
      </div>
    </div>
  );
}
