import type { Metadata } from "next";
import { ComingSoonLayout } from "@/components/brand/ComingSoonLayout";
import { GUARDIANS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Trade Guardian — Coming Soon",
  description:
    "AI that filters the financial fog — tracking sentiment, weighting signals, and surfacing real opportunities. Coming soon.",
};

export default function TradeGuardianPage() {
  const guardian = GUARDIANS.find((g) => g.id === "trade")!;
  return (
    <ComingSoonLayout
      guardian={guardian}
      previewLabel="How Trade Guardian Will Work"
      highlights={[
        "Filter market noise from real signal across 45+ trusted sources",
        "Quantitative 4-lens conviction scoring on every position idea",
        "Position-sizing recommendations with built-in risk management",
        "Decay modeling — conviction fades if thesis doesn't play out",
        "Sector rotation detection and macro regime classification",
        "Built on Sean's 30 years of market cycle experience and CIO-level methodology",
      ]}
    />
  );
}
