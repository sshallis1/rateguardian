import { UserProfile } from "@clerk/nextjs";
import { getCurrentUser } from "@/lib/auth";
import { getTierLabel, getTierColor, getTierFeatures } from "@/lib/membership";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();
  const tier = user?.tier ?? "free";
  const features = getTierFeatures(tier);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Profile</h1>
        <p className="text-neutral-500 mt-1">
          Manage your account and membership
        </p>
      </div>

      {/* Tier info */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-500">Current Plan</p>
            <p className={`text-xl font-bold ${getTierColor(tier)}`}>
              {getTierLabel(tier)}
            </p>
          </div>
          <div className="text-right text-sm text-neutral-500">
            <p>
              {features.maxProjects} project
              {features.maxProjects > 1 ? "s" : ""}
            </p>
            <p>
              {features.contractorTools
                ? "Full tools access"
                : "Basic tools"}
            </p>
          </div>
        </div>
      </div>

      {/* Clerk profile */}
      <UserProfile />
    </div>
  );
}
