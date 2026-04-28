import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function PartnerGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in?redirect_url=/partners/dashboard");
  }

  if (user.role !== "partner" && user.role !== "admin") {
    redirect("/partners/access-denied");
  }

  return <>{children}</>;
}
