"use client";

import * as React from "react";
import Image from "next/image";
import {
  Stethoscope,
  Building2,
  Users,
  Home,
  Handshake,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Download,
  Calendar,
  Star,
} from "lucide-react";

const PATHS = [
  {
    id: "physician",
    icon: Stethoscope,
    label: "I'm a Physician / Medical Professional",
    sub: "Looking for mortgage guidance, rate check, or lending programs",
    href: "/#what-we-do",
  },
  {
    id: "enterprise",
    icon: Building2,
    label: "I Run a Practice or Health System",
    sub: "Employee homeownership benefits, financial literacy programs",
    href: "/#enterprise",
  },
  {
    id: "referral",
    icon: Handshake,
    label: "I'm a Referral Partner / Vendor",
    sub: "Real estate agents, financial advisors, industry partners",
    href: "/about",
  },
  {
    id: "homeowner",
    icon: Home,
    label: "I'm a Homeowner / Buyer",
    sub: "Rate check, refinance, purchase, or just want to know where I stand",
    href: "/rate-guardian/ask-rosie",
  },
  {
    id: "event",
    icon: Users,
    label: "We Just Met at an Event",
    sub: "Great meeting you! Here's everything in one place",
    href: "/event/accom",
  },
] as const;

export function ConnectRouter() {
  return (
    <main className="min-h-screen bg-[#002855] text-white">
      {/* Header */}
      <div className="max-w-lg mx-auto px-5 pt-10 pb-6 text-center">
        {/* Identity */}
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/20 to-white/5 border-2 border-white/20 flex items-center justify-center">
          <span className="text-2xl font-bold text-white/90">SS</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Sean Shallis</h1>
        <p className="text-sm text-[#14a8ab] font-semibold mb-1">
          Private Wealth Mortgage Strategist
        </p>
        <p className="text-xs text-blue-200/50 mb-4">
          U.S. Bank &middot; National Physician Loan Expert &middot; NMLS
          #2362814
        </p>

        {/* Quick actions */}
        <div className="flex justify-center gap-3 mb-6">
          <a
            href="tel:+19734616955"
            className="flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/[0.12] transition-colors"
          >
            <Phone size={14} className="text-[#14a8ab]" />
            Call
          </a>
          <a
            href="mailto:sean.shallis@usbank.com"
            className="flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/[0.12] transition-colors"
          >
            <Mail size={14} className="text-[#14a8ab]" />
            Email
          </a>
          <a
            href="/vcard/sean.vcf"
            className="flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/[0.12] transition-colors"
          >
            <Download size={14} className="text-[#14a8ab]" />
            Save Contact
          </a>
        </div>
      </div>

      {/* Router — "How did we connect?" */}
      <div className="max-w-lg mx-auto px-5 pb-6">
        <p className="text-xs uppercase tracking-widest text-blue-200/40 font-semibold mb-4 text-center">
          How can I help you?
        </p>

        <div className="space-y-3">
          {PATHS.map((p) => (
            <a
              key={p.id}
              href={p.href}
              className="group flex items-center gap-4 w-full text-left rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[#14a8ab]/50 transition-all p-4"
            >
              <div className="w-11 h-11 rounded-xl bg-[#14a8ab]/15 flex items-center justify-center text-[#14a8ab] group-hover:bg-[#14a8ab]/25 transition-colors flex-shrink-0">
                <p.icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-white">
                  {p.label}
                </div>
                <div className="text-xs text-blue-200/40">{p.sub}</div>
              </div>
              <ArrowRight
                size={16}
                className="text-neutral-600 group-hover:text-[#14a8ab] transition-colors flex-shrink-0"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Book a call CTA */}
      <div className="max-w-lg mx-auto px-5 py-6">
        <a
          href="https://link.seanshallis.com/widget/bookings/usb_20m"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#c8a550] hover:bg-[#e2c172] text-[#002855] font-semibold py-3.5 transition-colors"
        >
          <Calendar size={18} />
          Book a Free 20-Minute Strategy Call
        </a>
      </div>

      {/* Credibility row */}
      <div className="max-w-lg mx-auto px-5 py-4">
        <div className="flex flex-wrap justify-center gap-4 text-center">
          {[
            { value: "30+", label: "Years" },
            { value: "$1B+", label: "Transactions" },
            { value: "1,000+", label: "Families" },
            { value: "#1", label: "Amazon Author" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-lg font-black text-white">{s.value}</div>
              <div className="text-[9px] text-blue-200/30 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rate Guardian badge */}
      <div className="max-w-lg mx-auto px-5 py-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-center gap-4">
          <div className="w-12 h-12 relative flex-shrink-0">
            <Image
              src="/rosie/rate-guardian-logo.png"
              alt="Rate Guardian"
              fill
              className="object-contain"
              sizes="48px"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Rate Guardian AI</p>
            <p className="text-xs text-blue-200/40">
              Free mortgage monitoring that watches your rate 24/7. No other
              loan officer offers this.
            </p>
          </div>
        </div>
      </div>

      {/* Media logos */}
      <div className="max-w-lg mx-auto px-5 py-4 pb-6">
        <p className="text-[10px] text-blue-200/20 text-center mb-3 uppercase tracking-widest">
          As Featured In
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-blue-200/30 font-semibold">
          <span>WSJ</span>
          <span>NYT</span>
          <span>Bloomberg</span>
          <span>CNBC</span>
          <span>HousingWire</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-blue-200/30">
        <p className="flex items-center justify-center gap-1 mb-1">
          <MapPin size={10} />
          1 Main St STE 203, Chatham, NJ 07928
        </p>
        <p>(973) 457-2278 &middot; sean.shallis@usbank.com</p>
        <p className="mt-2 text-blue-200/15">
          Equal Housing Lender. Member FDIC.
        </p>
      </footer>
    </main>
  );
}
