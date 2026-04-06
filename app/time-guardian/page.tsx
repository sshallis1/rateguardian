import type { Metadata } from "next";
import { ComingSoonLayout } from "@/components/brand/ComingSoonLayout";
import { GUARDIANS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Time Guardian — Coming Soon",
  description:
    "AI that guards your attention, decision bandwidth, and execution time — so you spend it where it counts.",
};

export default function TimeGuardianPage() {
  const guardian = GUARDIANS.find((g) => g.id === "time")!;
  return (
    <ComingSoonLayout
      guardian={guardian}
      highlights={[
        "Protect deep-work blocks from meeting creep and notification noise",
        "Score every task against your actual priorities — not your inbox's",
        "Decision-fatigue detection and gentle course-corrections",
        "Designed for high-performers, ADHD professionals, and entrepreneurs",
      ]}
    />
  );
}
