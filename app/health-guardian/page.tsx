import type { Metadata } from "next";
import { ComingSoonLayout } from "@/components/brand/ComingSoonLayout";
import { GUARDIANS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Health Guardian — Coming Soon",
  description:
    "AI that watches your health signals, catches patterns early, and keeps you one step ahead. Coming soon to Guardian Family.",
};

export default function HealthGuardianPage() {
  const guardian = GUARDIANS.find((g) => g.id === "health")!;
  return (
    <ComingSoonLayout
      guardian={guardian}
      highlights={[
        "Continuously monitor vitals, labs, and wearable data in one place",
        "Pattern-match across years to catch early warning signs no single doctor would see",
        "Surface preventative opportunities — not just react to problems",
        "Private by design — your health data never leaves your control",
      ]}
    />
  );
}
