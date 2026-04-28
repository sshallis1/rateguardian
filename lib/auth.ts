import { auth, currentUser } from "@clerk/nextjs/server";

export type UserTier = "free" | "pro";
export type UserRole = "consumer" | "partner" | "admin";

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
    role: getUserRoleFromMetadata(user.publicMetadata),
    licenseNumber: (user.publicMetadata?.licenseNumber as string) ?? null,
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

export function getUserRoleFromMetadata(
  metadata: Record<string, unknown>
): UserRole {
  const role = metadata?.role;
  if (role === "partner") return "partner";
  if (role === "admin") return "admin";
  return "consumer";
}

export async function requirePartnerAccess() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  if (user.role !== "partner" && user.role !== "admin") {
    throw new Error("Partner access required");
  }
  return user;
}
