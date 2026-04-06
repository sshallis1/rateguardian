"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SavingsScoreProps {
  score: number; // 0-100
  monthlySavings?: number;
  subtitle?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SavingsScore({
  score,
  monthlySavings,
  subtitle,
  className,
  size = "md",
}: SavingsScoreProps) {
  // Clamp
  const pct = Math.max(0, Math.min(100, score));

  // Color bucket (like Credit Karma)
  const color =
    pct >= 75
      ? "var(--status-success)"
      : pct >= 40
      ? "var(--brand-gold)"
      : "var(--status-error)";

  const label =
    pct >= 75
      ? "Huge Opportunity"
      : pct >= 40
      ? "Worth a Look"
      : "You're in Good Shape";

  // Circle geometry
  const sizeMap = {
    sm: { dim: 160, r: 66, stroke: 10, label: "text-xs", num: "text-4xl" },
    md: { dim: 240, r: 100, stroke: 14, label: "text-sm", num: "text-6xl" },
    lg: { dim: 320, r: 136, stroke: 18, label: "text-base", num: "text-7xl" },
  } as const;
  const { dim, r, stroke, label: labelClass, num } = sizeMap[size];

  const circumference = 2 * Math.PI * r;
  const dashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div
        className="relative"
        style={{ width: dim, height: dim }}
        aria-label={`Savings score ${pct} out of 100`}
      >
        <svg
          className="-rotate-90"
          width={dim}
          height={dim}
          viewBox={`0 0 ${dim} ${dim}`}
        >
          {/* Track */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={r}
            strokeWidth={stroke}
            stroke="currentColor"
            className="text-neutral-200"
            fill="none"
          />
          {/* Progress */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={r}
            strokeWidth={stroke}
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            fill="none"
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className={cn("font-mono font-bold leading-none", num)} style={{ color }}>
            {pct}
          </div>
          <div
            className={cn(
              "uppercase tracking-widest font-semibold mt-2 text-neutral-500",
              labelClass
            )}
          >
            Savings Score
          </div>
        </div>
      </div>

      <div className="text-center space-y-1">
        <div className="font-semibold text-lg" style={{ color }}>
          {label}
        </div>
        {monthlySavings !== undefined && monthlySavings > 0 && (
          <div className="text-sm text-neutral-600">
            Potential savings:{" "}
            <span className="font-mono font-bold text-neutral-900">
              ${monthlySavings.toLocaleString()}/mo
            </span>
          </div>
        )}
        {subtitle && (
          <div className="text-xs text-neutral-500 max-w-xs">{subtitle}</div>
        )}
      </div>
    </div>
  );
}
