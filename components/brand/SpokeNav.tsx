"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GUARDIANS } from "@/lib/brand";
import { Menu, X } from "lucide-react";

interface SpokeNavProps {
  variant?: "light" | "dark";
}

export function SpokeNav({ variant = "light" }: SpokeNavProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = variant === "dark";

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled && !isDark && "glass border-b border-neutral-200/60",
          scrolled && isDark && "glass-dark border-b border-white/10",
          !scrolled && isDark && "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div
                className={cn(
                  "w-9 h-9 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center text-white font-bold text-sm shadow-md"
                )}
              >
                SS
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span
                  className={cn(
                    "font-bold tracking-tight text-base",
                    isDark ? "text-white" : "text-neutral-900"
                  )}
                >
                  Sean Shallis
                </span>
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-widest font-medium",
                    isDark ? "text-neutral-400" : "text-neutral-500"
                  )}
                >
                  Guardian Family
                </span>
              </div>
            </Link>

            {/* Desktop spoke nav */}
            <div className="hidden lg:flex items-center gap-1">
              {GUARDIANS.map((g) => {
                const isLive = g.status === "live";
                const opacity =
                  g.status === "live"
                    ? "opacity-100"
                    : g.status === "soon"
                    ? "opacity-60"
                    : "opacity-30";
                return (
                  <Link
                    key={g.id}
                    href={isLive ? g.href : `${g.href}#notify`}
                    className={cn(
                      "relative px-3 py-2 rounded-lg transition-all group",
                      opacity,
                      "hover:opacity-100"
                    )}
                    title={
                      g.status === "live"
                        ? g.tagline
                        : `${g.name} — Coming Soon`
                    }
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className={cn(
                          "text-xs font-semibold uppercase tracking-wide",
                          isDark ? "text-white" : "text-neutral-800"
                        )}
                      >
                        {g.shortName}
                      </span>
                      <div
                        className="h-[3px] w-full rounded-full transition-all"
                        style={{ backgroundColor: g.color }}
                      />
                    </div>
                    {g.status === "soon" && (
                      <span className="absolute -top-1 -right-1 text-[8px] font-bold text-[color:var(--status-warning)] uppercase">
                        soon
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA + mobile menu */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/rate-guardian/ask-rosie"
                className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold text-sm hover:bg-[color:var(--brand-teal-dark)] transition-colors shadow-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                Ask Rosie
              </Link>
              <button
                aria-label="Menu"
                onClick={() => setMobileOpen((v) => !v)}
                className={cn(
                  "lg:hidden p-2 rounded-lg transition-colors",
                  isDark ? "text-white hover:bg-white/10" : "text-neutral-900 hover:bg-neutral-100"
                )}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            className={cn(
              "lg:hidden border-t",
              isDark
                ? "bg-[color:var(--surface-dark-card)] border-white/10"
                : "bg-white border-neutral-200"
            )}
          >
            <div className="px-6 py-4 space-y-1">
              {GUARDIANS.map((g) => (
                <Link
                  key={g.id}
                  href={g.status === "live" ? g.href : `${g.href}#notify`}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg transition-colors",
                    isDark ? "hover:bg-white/5" : "hover:bg-neutral-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1 h-10 rounded-full"
                      style={{ backgroundColor: g.color }}
                    />
                    <div>
                      <div
                        className={cn(
                          "font-semibold",
                          isDark ? "text-white" : "text-neutral-900"
                        )}
                      >
                        {g.name}
                      </div>
                      <div
                        className={cn(
                          "text-xs",
                          isDark ? "text-neutral-400" : "text-neutral-500"
                        )}
                      >
                        {g.tagline}
                      </div>
                    </div>
                  </div>
                  {g.status === "live" && (
                    <span className="text-[10px] font-bold uppercase text-[color:var(--status-success)]">
                      live
                    </span>
                  )}
                  {g.status === "soon" && (
                    <span className="text-[10px] font-bold uppercase text-[color:var(--status-warning)]">
                      soon
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      {/* Spacer so content sits below fixed nav */}
      <div className="h-16 md:h-20" aria-hidden />
    </>
  );
}
