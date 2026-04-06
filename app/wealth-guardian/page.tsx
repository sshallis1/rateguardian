import type { Metadata } from "next";
import { ComingSoonLayout } from "@/components/brand/ComingSoonLayout";
import { GUARDIANS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Wealth Guardian — Coming Soon",
  description:
    "Your AI family CFO — tying mortgage, investments, tax strategy, and asset allocation into one continuous plan.",
};

export default function WealthGuardianPage() {
  const guardian = GUARDIANS.find((g) => g.id === "wealth")!;
  return (
    <ComingSoonLayout
      guardian={guardian}
      highlights={[
        "Unified view of mortgage, investments, tax positioning, and cash flow",
        "Continuous optimization — not quarterly check-ins",
        "Cross-signal triggers (rate drop → refi cash → investment rebalance)",
        "Powered by Rosie's brain and Sean's 30 years of private wealth strategy",
      ]}
    />
  );
}
