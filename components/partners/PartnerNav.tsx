"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/partners/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/partners/training", label: "Training Library", icon: GraduationCap },
  { href: "/partners/resources", label: "Resources", icon: FileText },
];

export function PartnerNav() {
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
      <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
        Partner Portal
      </p>
      {NAV_LINKS.map((link) => {
        const isActive =
          link.href === "/partners/dashboard"
            ? pathname === "/partners/dashboard"
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
