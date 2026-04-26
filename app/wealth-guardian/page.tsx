import type { Metadata } from "next";
import { ComingSoonLayout } from "@/components/brand/ComingSoonLayout";
import { FUTURE_GUARDIANS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Wealth Guardian — Coming Soon",
  description:
    "Your AI family CFO — tying mortgage, investments, tax strategy, and asset allocation into one continuous plan.",
};

export default function WealthGuardianPage() {
  const guardian = FUTURE_GUARDIANS.find((g) => g.id === "wealth")!;
  return (
    <ComingSoonLayout
      guardian={guardian}
      previewLabel="How Wealth Guardian Will Optimize Your Finances"
      highlights={[
        "Unified view of mortgage, investments, tax positioning, and cash flow",
        "Continuous optimization — not quarterly check-ins with a planner",
        "Cross-signal triggers: rate drop triggers refi, freed cash triggers investment rebalance",
        "Tax-loss harvesting alerts and year-end positioning",
        "Estate planning coordination and asset protection monitoring",
        "Powered by Rosie's brain and Sean's 30 years of private wealth strategy",
      ]}
    />
  );
}
