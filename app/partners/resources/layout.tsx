import { UserButton } from "@clerk/nextjs";
import { PartnerGate } from "@/components/partners/PartnerGate";
import { PartnerNav } from "@/components/partners/PartnerNav";

export const metadata = {
  title: "Resources — Partner Portal",
};

export default async function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PartnerGate>
      <div className="min-h-screen bg-neutral-50">
        <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
          <div className="flex items-center justify-between h-14 px-4 md:px-6">
            <div className="flex items-center gap-3">
              <span className="font-bold text-neutral-900 text-sm md:hidden">
                Resources
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--brand-gold)]">
                Partner
              </span>
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
      </div>
    </PartnerGate>
  );
}
