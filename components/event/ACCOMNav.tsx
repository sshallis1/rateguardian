"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronDown,
  FileText,
  Home,
  MessageCircle,
  Scan,
  Star,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Event Home", href: "/event/accom", icon: Home },
  { label: "Free Rate Check", href: "/event/accom/scan", icon: Scan },
  { label: "Ask Rosie", href: "/rate-guardian/ask-rosie", icon: MessageCircle },
  { label: "Resources & Downloads", href: "/event/accom/resources", icon: FileText },
  { label: "Reviews", href: "https://www.google.com/search?q=sean+shallis+google+business", icon: Star, external: true },
];

export function ACCOMNav() {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-[#D71E28] shadow-md" ref={menuRef}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-11">
        <span className="text-xs font-semibold tracking-wide text-white/90">
          U.S. Bank &middot; Private Wealth
        </span>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white transition-colors py-2"
        >
          <Star size={12} className="text-yellow-300" />
          Exclusive Event Access
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="absolute right-0 top-11 w-72 bg-white rounded-b-2xl shadow-2xl border border-[#002855]/10 overflow-hidden animate-in slide-in-from-top-1 duration-200">
          <div className="px-4 pt-4 pb-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D71E28]">
              ACCOM 2026 — Members Only
            </p>
          </div>
          <nav className="pb-2">
            {NAV_ITEMS.map(({ label, href, icon: Icon, external }) => {
              const content = (
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-[#f6f2eb] transition-colors cursor-pointer">
                  <Icon size={16} className="text-[#0e6b6d] shrink-0" />
                  <span className="text-sm font-medium text-[#002855]">{label}</span>
                </div>
              );
              return external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  {content}
                </a>
              ) : (
                <Link key={label} href={href} onClick={() => setOpen(false)}>
                  {content}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-[#002855]/10 px-4 py-3 bg-[#f6f2eb]/50">
            <p className="text-[10px] text-[#002855]/50 text-center">
              Sean Shallis &middot; NMLS #2362814 &middot; U.S. Bank
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
