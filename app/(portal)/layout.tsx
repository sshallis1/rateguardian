import { UserButton } from "@clerk/nextjs";
import { getCurrentUser } from "@/lib/auth";
import { getTierLabel, getTierColor } from "@/lib/membership";
import { PortalNav } from "@/components/portal/PortalNav";

export const metadata = {
  title: "Portal",
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const tier = user?.tier ?? "free";

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between h-14 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <span className="font-bold text-neutral-900 text-sm md:hidden">
              Portal
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-bold uppercase tracking-wider ${getTierColor(tier)}`}
            >
              {getTierLabel(tier)}
            </span>
            <UserButton />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar — desktop */}
        <aside className="hidden md:flex w-56 flex-col border-r border-neutral-200 bg-white p-4 min-h-[calc(100vh-3.5rem)]">
          <PortalNav />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 max-w-5xl">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
        <div className="flex justify-around py-2">
          <MobileNavLink href="/portal" label="Home" />
          <MobileNavLink href="/portal/projects" label="Projects" />
          <MobileNavLink href="/portal/profile" label="Profile" />
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
