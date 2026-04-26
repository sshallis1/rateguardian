import type { Metadata } from "next";
import { ComingSoonLayout } from "@/components/brand/ComingSoonLayout";
import { FUTURE_GUARDIANS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Time Guardian — Coming Soon",
  description:
    "AI that guards your attention, decision bandwidth, and execution time — so you spend it where it counts.",
};

export default function TimeGuardianPage() {
  const guardian = FUTURE_GUARDIANS.find((g) => g.id === "time")!;
  return (
    <ComingSoonLayout
      guardian={guardian}
      previewLabel="How Time Guardian Will Protect Your Focus"
      highlights={[
        "Protect deep-work blocks from meeting creep and notification noise",
        "Score every task against your actual priorities — not your inbox's",
        "Decision-fatigue detection and gentle course-corrections throughout the day",
        "Calendar intelligence — flag overcommitment before it happens",
        "Weekly execution review — what moved the needle vs what didn't",
        "Designed for high-performers, entrepreneurs, and ADHD professionals",
      ]}
    />
  );
}
