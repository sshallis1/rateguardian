"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, User, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/projects", label: "Projects", icon: FolderKanban },
  { href: "/portal/profile", label: "Profile", icon: User },
];

export function PortalNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      <Link
        href="/"
        className="flex items-center gap-2 px-3 py-2 mb-4 text-sm font-bold text-[color:var(--brand-teal)]"
      >
        <Shield size={18} />
        Guardian Family
      </Link>
      {NAV_LINKS.map((link) => {
        const isActive =
          link.href === "/portal"
            ? pathname === "/portal"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-[color:var(--brand-teal)]/10 text-[color:var(--brand-teal)]"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            )}
          >
            <link.icon size={18} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
