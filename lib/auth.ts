import { auth, currentUser } from "@clerk/nextjs/server";

export type UserTier = "free" | "pro";

export async function getCurrentUser() {
  const user = await currentUser();
  if (!user) return null;
  return {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress ?? null,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    tier: getUserTierFromMetadata(user.publicMetadata),
  };
}

export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

export function getUserTierFromMetadata(
  metadata: Record<string, unknown>
): UserTier {
  const tier = metadata?.tier;
  if (tier === "pro") return "pro";
  return "free";
}

export async function getUserTier(): Promise<UserTier> {
  const user = await getCurrentUser();
  return user?.tier ?? "free";
}
