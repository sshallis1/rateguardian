import { UserButton } from "@clerk/nextjs";
import { PartnerGate } from "@/components/partners/PartnerGate";
import { PartnerNav } from "@/components/partners/PartnerNav";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "Partner Portal",
};

export default async function PartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PartnerGate>
      <PartnerPortalShell>{children}</PartnerPortalShell>
    </PartnerGate>
  );
}

async function PartnerPortalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between h-14 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <span className="font-bold text-neutral-900 text-sm md:hidden">
              Partner Portal
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--brand-gold)]">
              Partner
            </span>
            {user && (
              <span className="text-sm text-neutral-600 hidden sm:inline">
                {user.firstName} {user.lastName}
              </span>
            )}
            <UserButton />
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden md:flex w-56 flex-col border-r border-neutral-200 bg-white p-4 min-h-[calc(100vh-3.5rem)]">
          <PartnerNav />
        </aside>

        <main className="flex-1 p-4 md:p-8 max-w-5xl">{children}</main>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
        <div className="flex justify-around py-2">
          <MobileNavLink href="/partners/dashboard" label="Home" />
          <MobileNavLink href="/partners/training" label="Training" />
          <MobileNavLink href="/partners/resources" label="Resources" />
        </div>
      </nav>
    </div>
  );
}

function MobileNavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="flex flex-col items-center gap-0.5 px-3 py-1 text-xs font-medium text-neutral-600"
    >
      {label}
    </a>
  );
}
