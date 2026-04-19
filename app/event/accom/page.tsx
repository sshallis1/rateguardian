import type { Metadata } from "next";
import { ACCOMFunnel } from "@/components/event/ACCOMFunnel";
import { ACCOMNav } from "@/components/event/ACCOMNav";
import { TestimonialStreamer } from "@/components/event/TestimonialStreamer";
import { BRAND } from "@/lib/brand";
import {
  Shield,
  Star,
  Award,
  Zap,
  Building2,
  GraduationCap,
  Stethoscope,
  Home,
  Landmark,
  Heart,
  CheckCircle,
  ArrowRight,
  Calendar,
  Briefcase,
  Users,
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title:
    "Sean Shallis — U.S. Bank Private Wealth | National Physician Loan Expert",
  description:
    "Private Wealth Mortgage Strategist specializing in physician and medical professional lending. 30+ years, $1B+ in transactions. Backed by U.S. Bank.",
};

export default function ACCOMPage() {
  return (
    <main className="min-h-screen bg-[#002855] text-white">
      <ACCOMNav />

      {/* ========= HERO — Sean's Authority ========= */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 0%, rgba(215, 30, 40, 0.12), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(14, 107, 109, 0.15), transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(0, 40, 85, 0.8), transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />

        <div className="relative max-w-3xl mx-auto px-5 pt-14 pb-10 text-center">
          {/* Event badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#D71E28]/20 border border-[#D71E28]/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff6b6b] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D71E28] animate-pulse" />
            ACCOM 2026
          </div>

          {/* U.S. Bank + Sean Shallis identity */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.25em] text-blue-200/50 font-semibold mb-3">
              U.S. Bank &middot; Private Wealth
            </p>

            {/* Headshot placeholder — initials */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/20 to-white/5 border-2 border-white/20 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-white/90">
                SS
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-4">
            Sean Shallis
          </h1>

          <p className="text-lg sm:text-xl text-blue-200/80 leading-relaxed mb-2 max-w-xl mx-auto font-medium">
            Private Wealth Mortgage Strategist
          </p>
          <p className="text-base sm:text-lg text-[#14a8ab] font-semibold mb-6">
            National Physician Loan Expert
          </p>

          <p className="text-sm sm:text-base text-blue-200/50 leading-relaxed max-w-lg mx-auto mb-8 italic">
            &ldquo;Homeownership isn&apos;t just a transaction &mdash;
            it&apos;s the foundation of legacy and stability.&rdquo;
          </p>

          {/* Key stats row */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
            {[
              { value: "30+", label: "Years" },
              { value: "$1B+", label: "Transactions" },
              { value: "1,000+", label: "Families" },
              { value: "#1", label: "Amazon Author" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {s.value}
                </div>
                <div className="text-[10px] text-blue-200/40 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 rounded-full bg-[#14a8ab] hover:bg-[#0e6b6d] text-white font-semibold px-8 py-3.5 text-base transition-colors"
          >
            See If You&apos;re Overpaying
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ========= WHAT WE DO — Physician Programs ========= */}
      <section className="bg-white text-[#002855] py-14">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#D71E28] mb-3 text-center">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Lending Designed for Medical Professionals
          </h2>
          <p className="text-center text-neutral-600 mb-10 max-w-xl mx-auto">
            Concierge-level mortgage solutions from the 5th largest bank in the
            world — tailored to every stage of your medical career.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Stethoscope,
                title: "Physician Loan Programs",
                desc: "Up to 100% financing, no PMI — designed for MDs, DOs, DMDs, and residents",
              },
              {
                icon: Building2,
                title: "Construction-to-Permanent",
                desc: "Build your dream home or practice facility with a single close loan",
              },
              {
                icon: Landmark,
                title: "Jumbo & Portfolio Loans",
                desc: "High-balance financing for luxury properties and complex transactions",
              },
              {
                icon: Shield,
                title: "VA Loans for Veteran Physicians",
                desc: "Military service + medical career = maximum benefit strategies",
              },
              {
                icon: Home,
                title: "Private Wealth Banking",
                desc: "Full-service access through U.S. Bank's Private Wealth division",
              },
              {
                icon: GraduationCap,
                title: "Student Loan Strategies",
                desc: "Income-based qualification that accounts for your real earning trajectory",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-4 rounded-xl border border-neutral-200 hover:border-[#0e6b6d]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0e6b6d]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-[#0e6b6d]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= WHO WE SERVE — Career Stage ========= */}
      <section className="bg-[#f6f2eb] text-[#002855] py-14">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0e6b6d] mb-3 text-center">
            Who We Serve
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            From Residency to Retirement
          </h2>
          <p className="text-center text-neutral-600 mb-10 max-w-lg mx-auto">
            We align financing with your career stage — because a resident and a
            department chief have very different lending needs.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { stage: "Residents & Fellows", icon: GraduationCap },
              { stage: "Attending Physicians", icon: Stethoscope },
              { stage: "Practice Owners", icon: Briefcase },
              { stage: "Hospital Leadership", icon: Users },
            ].map((item) => (
              <div
                key={item.stage}
                className="text-center p-5 rounded-xl bg-white border border-neutral-200"
              >
                <item.icon
                  size={28}
                  className="mx-auto mb-3 text-[#0e6b6d]"
                />
                <p className="text-sm font-semibold">{item.stage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= THE SEAN SHALLIS DIFFERENCE ========= */}
      <section className="bg-white text-[#002855] py-14">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#D71E28] mb-3 text-center">
            Why Partner With Sean
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
            The Sean Shallis Difference
          </h2>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
            {[
              "30+ years experience | $1B+ in closed transactions",
              "Married to a physician — understands the journey firsthand",
              "Amazon best-selling author: 10X House Selling Secrets",
              "Featured in WSJ, NYT, Bloomberg, CNBC",
              "Host of The Loan Doctor Podcast",
              "HousingWire contributing writer",
              "Trusted by physicians, hospital HR teams, and health systems",
              "Founder of RealtyCoach.app — digital education for agents",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle
                  size={16}
                  className="text-[#0e6b6d] flex-shrink-0 mt-0.5"
                />
                <span className="text-sm text-neutral-700">{point}</span>
              </div>
            ))}
          </div>

          {/* Media logos */}
          <div className="border-t border-neutral-200 pt-8">
            <p className="text-xs text-neutral-400 text-center mb-5 uppercase tracking-widest font-semibold">
              As Featured In
            </p>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-neutral-500 font-semibold">
              {BRAND.mediaLogos.map((logo) => (
                <span
                  key={logo}
                  className="hover:text-[#002855] transition-colors cursor-default"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========= ENTERPRISE — Homeownership Benefits Program ========= */}
      <section className="bg-[#001a3a] text-white py-14 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#c8a550] mb-3 text-center">
            For Health Systems & Medical Groups
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Homeownership & Wealth
            <br />
            Advantage Program
          </h2>
          <p className="text-center text-blue-200/60 mb-10 max-w-lg mx-auto">
            Help your organization attract, retain, and support top talent with
            custom lending solutions — at zero cost to the employer.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: "Staff Financial Literacy",
                desc: "Homeownership education workshops for all employees",
              },
              {
                title: "Relocation Support",
                desc: "Onboarding mortgage support for new hires and recruits",
              },
              {
                title: "Pre-Approval Tools",
                desc: '"Know Before You Go" workshops and lending readiness',
              },
              {
                title: "Ongoing Strategy",
                desc: "Continuous lending support at zero cost to employer",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
              >
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-blue-200/50">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xs text-blue-200/40 mb-2">
              Currently partnering with hospitals, medical groups, and HR teams
              nationwide
            </p>
            <a
              href="https://link.seanshallis.com/widget/bookings/usb_20m"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#c8a550] hover:text-[#e2c172] transition-colors"
            >
              Schedule an Enterprise Consultation
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ========= RATE GUARDIAN / ROSIE — The USP ========= */}
      <section className="relative py-14 border-t border-white/10">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(14, 168, 171, 0.2), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#14a8ab] mb-3">
            And Something No One Else Offers
          </p>

          {/* Rosie logo */}
          <div className="w-24 h-24 mx-auto mb-5 relative">
            <Image
              src="/rosie/rate-guardian-logo.png"
              alt="Rate Guardian"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="96px"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Meet{" "}
            <span className="bg-gradient-to-r from-[#14a8ab] via-[#0e6b6d] to-[#14a8ab] bg-clip-text text-transparent">
              Rosie.
            </span>{" "}
            Your Rate Guardian.
          </h2>

          <p className="text-base text-blue-200/60 leading-relaxed mb-8 max-w-lg mx-auto">
            Rosie is Sean&apos;s proprietary AI that monitors your mortgage rate
            multiple times a day. When a savings window opens, she alerts you —
            and Sean closes it. Free. Forever.
          </p>

          {/* How it works — 3 steps */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8 text-left">
            {[
              {
                n: "01",
                title: "See If You're Overpaying",
                desc: "Quick 30-second check. No credit impact.",
              },
              {
                n: "02",
                title: "Rosie Stands Watch",
                desc: "Monitors rates daily. Alerts you when savings appear.",
              },
              {
                n: "03",
                title: "Sean Closes It",
                desc: "When the window opens, your Private Wealth strategist acts.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="text-2xl font-mono font-bold text-[#14a8ab] mb-2">
                  {s.n}
                </div>
                <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-blue-200/50">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* 100/0 Guarantee */}
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-[#14a8ab]/30 px-6 py-3">
            <div className="text-2xl font-black bg-gradient-to-b from-[#14a8ab] to-[#0e6b6d] bg-clip-text text-transparent leading-none">
              100/0
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-[#14a8ab] uppercase tracking-wider">
                Guarantee
              </div>
              <div className="text-xs text-blue-200/50">
                Zero Obligations. Zero Excuses. Free Forever.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========= LEAD CAPTURE FUNNEL ========= */}
      <section
        id="get-started"
        className="py-12 border-t border-white/10"
      >
        <div className="max-w-3xl mx-auto px-5 text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Ready to See Where You Stand?
          </h2>
          <p className="text-sm text-blue-200/50">
            Free. No credit impact. Takes 30 seconds.
          </p>
        </div>
        <ACCOMFunnel />
      </section>

      {/* ========= TESTIMONIALS ========= */}
      <TestimonialStreamer />

      {/* ========= BOOKING CTA ========= */}
      <section className="bg-[#0e6b6d] py-14">
        <div className="max-w-xl mx-auto px-5 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Book a Free Strategy Call
          </h2>
          <p className="text-white/70 mb-8">
            20 minutes. No obligation. Whether you&apos;re buying, refinancing,
            building, or just want to know where you stand — let&apos;s talk.
          </p>
          <a
            href="https://link.seanshallis.com/widget/bookings/usb_20m"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c8a550] hover:bg-[#e2c172] text-[#002855] font-semibold px-8 py-4 text-base transition-colors"
          >
            <Calendar size={18} />
            Schedule 20-Minute Call
          </a>
          <p className="text-xs text-white/30 mt-4">
            Or call directly: {BRAND.contact.phone}
          </p>
        </div>
      </section>

      {/* ========= FOOTER ========= */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-blue-200/40">
        <p>
          Sean Shallis &middot; Private Wealth Mortgage Strategist &middot;{" "}
          {BRAND.bank} &middot; {BRAND.nmls}
        </p>
        <p className="mt-1">
          {BRAND.contact.phone} &middot; {BRAND.contact.email}
        </p>
        <p className="mt-1">
          <a
            href="https://mortgage.usbank.com/nj-chatham-sean-shallis"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            mortgage.usbank.com/nj-chatham-sean-shallis
          </a>
        </p>
        <p className="mt-2 text-blue-200/20">
          Equal Housing Lender. Member FDIC.
        </p>
      </footer>
    </main>
  );
}
