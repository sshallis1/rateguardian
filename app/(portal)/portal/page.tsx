import { getCurrentUser } from "@/lib/auth";
import { GUARDIANS } from "@/lib/brand";
import { getTierLabel, getTierFeatures } from "@/lib/membership";
import { GuardianProductCard } from "@/components/portal/GuardianProductCard";

export const metadata = {
  title: "Dashboard",
};

export default async function PortalDashboard() {
  const user = await getCurrentUser();
  const tier = user?.tier ?? "free";
  const features = getTierFeatures(tier);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
        </h1>
        <p className="text-neutral-500 mt-1">
          {getTierLabel(tier)} plan &middot; {features.maxProjects} project
          {features.maxProjects > 1 ? "s" : ""} included
        </p>
      </div>

      {/* Guardian products grid */}
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Your Guardians
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {GUARDIANS.map((g) => (
            <GuardianProductCard
              key={g.id}
              guardian={g}
              enrolled={g.status === "live"}
            />
          ))}
        </div>
      </div>

      {/* Quick actions */}
      {tier === "free" && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="font-semibold text-amber-900">Upgrade to Pro</h3>
          <p className="text-sm text-amber-700 mt-1">
            Unlock 10 projects, contractor tools, document vault, and data
            export. Full Project Guardian power.
          </p>
          <button
            disabled
            className="mt-4 px-5 py-2.5 rounded-lg bg-amber-600 text-white text-sm font-semibold opacity-60 cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      )}
    </div>
  );
}
