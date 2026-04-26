import type { Metadata } from "next";
import { ComingSoonLayout } from "@/components/brand/ComingSoonLayout";
import { FUTURE_GUARDIANS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Health Guardian — Coming Soon",
  description:
    "AI that watches your health signals, catches patterns early, and keeps you one step ahead. Coming soon to Guardian Family.",
};

export default function HealthGuardianPage() {
  const guardian = FUTURE_GUARDIANS.find((g) => g.id === "health")!;
  return (
    <ComingSoonLayout
      guardian={guardian}
      previewLabel="How Health Guardian Will Protect You"
      highlights={[
        "Continuously monitor vitals, labs, and wearable data in one unified view",
        "Pattern-match across years of data to catch early warning signs no single doctor would see",
        "Surface preventative opportunities — act before problems become diagnoses",
        "Medication interaction tracking and appointment coordination",
        "Family health dashboard — track spouse, kids, aging parents",
        "Private by design — your health data never leaves your control",
      ]}
    />
  );
}
