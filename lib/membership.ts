import type { UserTier } from "./auth";

export interface TierFeatures {
  maxProjects: number;
  costEvaluator: boolean;
  rateMonitoring: boolean;
  askRosie: boolean;
  contractorTools: boolean;
  documentVault: boolean;
  exportData: boolean;
  fullTracking: boolean;
}

const TIER_MAP: Record<UserTier, TierFeatures> = {
  free: {
    maxProjects: 1,
    costEvaluator: true,
    rateMonitoring: true,
    askRosie: true,
    contractorTools: false,
    documentVault: false,
    exportData: false,
    fullTracking: false,
  },
  pro: {
    maxProjects: 10,
    costEvaluator: true,
    rateMonitoring: true,
    askRosie: true,
    contractorTools: true,
    documentVault: true,
    exportData: true,
    fullTracking: true,
  },
};

export function getTierFeatures(tier: UserTier): TierFeatures {
  return TIER_MAP[tier];
}

export function hasAccess(
  tier: UserTier,
  feature: keyof TierFeatures
): boolean {
  return !!TIER_MAP[tier][feature];
}

export function getTierLabel(tier: UserTier): string {
  return tier === "pro" ? "Pro" : "Free";
}

export function getTierColor(tier: UserTier): string {
  return tier === "pro" ? "text-amber-600" : "text-[color:var(--brand-teal)]";
}
