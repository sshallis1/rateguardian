import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Users,
  Shield,
  DollarSign,
  Search,
  FileText,
  Star,
  CheckCircle,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Pro Access — Project Guardian",
  description:
    "Pro members access vendor referrals, supplier discounts, estimate reviews, and scope optimization support.",
};

const PRO_FEATURES = [
  {
    icon: Users,
    title: "Local Vendor Support",
    desc: "Get connected to vetted local vendors and trades. We maintain relationships with contractors who deliver quality work at fair prices.",
  },
  {
    icon: DollarSign,
    title: "Supplier Discount Pass-Through",
    desc: "In many cases, Pro members can access supplier-direct pricing that bypasses retail and GC markup layers.",
  },
  {
    icon: Search,
    title: "Estimate Review",
    desc: "Upload any contractor estimate and our team will review it against local benchmarks and flag potential savings opportunities.",
  },
  {
    icon: FileText,
    title: "Scope Optimization",
    desc: "Sometimes the smartest savings come from rethinking the scope — refacing vs remodeling, surface refresh vs gut job, phased approach vs all-at-once.",
  },
  {
    icon: Shield,
    title: "Project Decision Support",
    desc: "Get a second opinion before committing to big-ticket scope items. We help homeowners ask the right questions and avoid costly blind spots.",
  },
  {
    icon: Star,
    title: "Priority Rosie Access",
    desc: "Pro members get priority chat support from Rosie with deeper project context and faster response times.",
  },
];

export default function ProPage() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)] text-neutral-900">
      <SpokeNav />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link
              href="/project-guardian"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-900 mb-8 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Project Guardian
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-6">
              <Users size={16} />
              Pro Access
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Want Help Getting
              <br />
              the Price Down?
            </h1>

            <p className="text-xl text-neutral-600 leading-relaxed mb-12">
              Project Guardian Free gives you the tools to understand your
              project. Pro gives you the team and connections to optimize it.
              We typically identify savings opportunities on most renovation
              projects — in many cases, homeowners save thousands.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {PRO_FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-neutral-200 bg-white p-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                    <f.icon size={20} className="text-amber-600" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{f.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* How Pro Works */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">How Pro Works</h2>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    text: "Upload your estimates and project details (free for everyone)",
                  },
                  {
                    step: "2",
                    text: "Rosie flags potential savings and optimization opportunities",
                  },
                  {
                    step: "3",
                    text: 'Ask our team for help: "Can you help me source this cheaper?"',
                  },
                  {
                    step: "4",
                    text: "We connect you with vetted vendors, supplier options, and scope alternatives",
                  },
                  {
                    step: "5",
                    text: "You make the decision — we give you the information to make it smarter",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-amber-700">
                        {s.step}
                      </span>
                    </div>
                    <p className="text-neutral-700 pt-1">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guardrails */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 mb-12">
              <h3 className="font-bold mb-3">What we don&apos;t do</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                {[
                  "We don't guarantee savings — every project is different",
                  "We don't give legal advice or tell you to breach contracts",
                  "We don't claim contractor pricing is wrong without evidence",
                  "We don't make decisions for you — we give you the context to decide smarter",
                ].map((g) => (
                  <div key={g} className="flex items-start gap-2">
                    <CheckCircle
                      size={14}
                      className="text-neutral-400 mt-0.5 flex-shrink-0"
                    />
                    <span>{g}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link
                href="/project-guardian/scan"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-orange-600 text-white font-semibold text-lg hover:bg-orange-700 transition-colors shadow-lg"
              >
                Start Free — Scan an Estimate
                <ArrowRight size={20} />
              </Link>
              <p className="text-sm text-neutral-400 mt-3">
                Free accounts can upload estimates and compare locally.
                Pro unlocks the full team support.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
