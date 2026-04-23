import type { Metadata } from "next";
import { ComingSoonLayout } from "@/components/brand/ComingSoonLayout";
import { GUARDIANS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Project Guardian — Coming Soon",
  description:
    "AI project management for your renovation. From first-walkthrough cost estimate to resale prep — Rosie keeps you on budget, on timeline, and off the 15–20% GC markup.",
};

export default function ProjectGuardianPage() {
  const guardian = GUARDIANS.find((g) => g.id === "project")!;
  return (
    <ComingSoonLayout
      guardian={guardian}
      highlights={[
        "Realistic cost evaluator — know what the project will REALLY cost before you buy or break ground",
        "Budget tracker with variance alerts — Rosie flags every line item creeping past market rate",
        "Contractor management — bids, draws, payments, and performance notes in one place",
        "Document vault — photos per phase, receipts, permits, warranties, insurance, forever",
        "Timeline and milestone tracking — demo, rough, finish, punch list — all visible",
        "Resale prep built in — every upgrade documented from day one, powered by Sean's 10X House Selling Secrets",
        "Financing connection — construction-to-perm, cash-out refi, and HELOC options routed to Sean directly",
      ]}
    />
  );
}
