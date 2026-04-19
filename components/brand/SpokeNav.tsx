"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  ChevronDown,
  Stethoscope,
  Building2,
  Landmark,
  Shield,
  GraduationCap,
  Home,
  Users,
  Calendar,
  BookOpen,
  Mic,
  Award,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";

interface SpokeNavProps {
  variant?: "light" | "dark";
}

const NAV_ITEMS = [
  {
    label: "Lending Programs",
    children: [
      { label: "Physician Loans", desc: "100% financing, no PMI", href: "/#lending", icon: Stethoscope },
      { label: "Construction-to-Permanent", desc: "Single close builds", href: "/#lending", icon: Building2 },
      { label: "Jumbo & Portfolio", desc: "High-balance financing", href: "/#lending", icon: Landmark },
      { label: "VA Loans", desc: "Veteran benefit strategies", href: "/#lending", icon: Shield },
      { label: "Private Wealth Banking", desc: "Full-service U.S. Bank access", href: "/#lending", icon: Home },
      { label: "Student Loan Strategies", desc: "Income-based qualification", href: "/#lending", icon: GraduationCap },
    ],
  },
  {
    label: "Enterprise",
    children: [
      { label: "Health System Partnerships", desc: "Zero cost to employer", href: "/#enterprise", icon: Building2 },
      { label: "Financial Literacy Programs", desc: "Lunch & learns for staff", href: "/#enterprise", icon: BookOpen },
      { label: "Relocation Support", desc: "New hire onboarding", href: "/#enterprise", icon: Users },
    ],
  },
  {
    label: "Rate Guardian",
    children: [
      { label: "How It Works", desc: "AI rate monitoring — free forever", href: "/#rate-guardian", icon: Shield },
      { label: "Ask Rosie", desc: "Free rate check in 90 seconds", href: "/rate-guardian/ask-rosie", icon: MessageCircle },
      { label: "Savings Score", desc: "Your mortgage health number", href: "/#savings-score", icon: Award },
    ],
  },
  {
    label: "About",
    children: [
      { label: "Sean's Story", desc: "30+ years, $1B+ in transactions", href: "/about", icon: Award },
      { label: "The Loan Doctor Podcast", desc: "Helping doctors build wealth", href: "https://link.seanshallis.com/widget/bookings/usb_20m", icon: Mic, external: true },
      { label: "Connect", desc: "Save contact, book a call", href: "/connect", icon: Phone },
    ],
  },
];

export function SpokeNav({ variant = "light" }: SpokeNavProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const dropdownTimeout = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleMouseEnter(label: string) {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  }

  function handleMouseLeave() {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 200);
  }

  const isDark = variant === "dark";

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled && !isDark && "glass border-b border-neutral-200/60",
          scrolled && isDark && "glass-dark border-b border-white/10",
          !scrolled && !isDark && "bg-[color:var(--brand-cream)]",
          !scrolled && isDark && "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-full overflow-hidden relative">
                <Image
                  src="/sean-shallis-headshot.jpg"
                  alt="Sean Shallis"
                  fill
                  className="object-cover"
                  sizes="36px"
                />
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
                  U.S. Bank &middot; Private Wealth
                </span>
              </div>
            </Link>

            {/* Desktop nav with dropdowns */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isDark
                        ? "text-neutral-300 hover:text-white hover:bg-white/5"
                        : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        openDropdown === item.label && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Dropdown */}
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2 w-72 animate-in slide-in-from-top-1 duration-150">
                      <div className="bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
                        <div className="p-2">
                          {item.children.map((child) => {
                            const content = (
                              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[color:var(--brand-cream)] transition-colors cursor-pointer">
                                <div className="w-9 h-9 rounded-lg bg-[color:var(--brand-teal)]/10 flex items-center justify-center flex-shrink-0">
                                  <child.icon
                                    size={18}
                                    className="text-[color:var(--brand-teal)]"
                                  />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-neutral-900">
                                    {child.label}
                                  </div>
                                  <div className="text-xs text-neutral-500">
                                    {child.desc}
                                  </div>
                                </div>
                              </div>
                            );

                            if ("external" in child && child.external) {
                              return (
                                <a
                                  key={child.label}
                                  href={child.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {content}
                                </a>
                              );
                            }

                            return (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => setOpenDropdown(null)}
                              >
                                {content}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA + mobile menu */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://link.seanshallis.com/widget/bookings/usb_20m"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold text-sm hover:bg-[color:var(--brand-teal-dark)] transition-colors shadow-md"
              >
                <Calendar size={14} />
                Book a Call
              </a>
              <button
                aria-label="Menu"
                onClick={() => setMobileOpen((v) => !v)}
                className={cn(
                  "lg:hidden p-2 rounded-lg transition-colors",
                  isDark
                    ? "text-white hover:bg-white/10"
                    : "text-neutral-900 hover:bg-neutral-100"
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
              "lg:hidden border-t max-h-[80vh] overflow-y-auto",
              isDark
                ? "bg-[color:var(--surface-dark-card)] border-white/10"
                : "bg-white border-neutral-200"
            )}
          >
            <div className="px-6 py-4 space-y-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <p
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-widest mb-2 px-3",
                      isDark ? "text-neutral-500" : "text-neutral-400"
                    )}
                  >
                    {item.label}
                  </p>
                  <div className="space-y-0.5">
                    {item.children.map((child) => {
                      const content = (
                        <div
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition-colors",
                            isDark ? "hover:bg-white/5" : "hover:bg-neutral-50"
                          )}
                        >
                          <div className="w-9 h-9 rounded-lg bg-[color:var(--brand-teal)]/10 flex items-center justify-center flex-shrink-0">
                            <child.icon
                              size={18}
                              className="text-[color:var(--brand-teal)]"
                            />
                          </div>
                          <div>
                            <div
                              className={cn(
                                "text-sm font-medium",
                                isDark ? "text-white" : "text-neutral-900"
                              )}
                            >
                              {child.label}
                            </div>
                            <div
                              className={cn(
                                "text-xs",
                                isDark ? "text-neutral-400" : "text-neutral-500"
                              )}
                            >
                              {child.desc}
                            </div>
                          </div>
                        </div>
                      );

                      if ("external" in child && child.external) {
                        return (
                          <a
                            key={child.label}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                          >
                            {content}
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                        >
                          {content}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Mobile CTA */}
              <a
                href="https://link.seanshallis.com/widget/bookings/usb_20m"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[color:var(--brand-teal)] text-white font-semibold py-3 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                <Calendar size={16} />
                Book a Free Strategy Call
              </a>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer */}
      <div className="h-16 md:h-20" aria-hidden />
    </>
  );
}
