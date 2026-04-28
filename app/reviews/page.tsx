import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Star,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | Sean Shallis — Physician Mortgage Expert",
  description:
    "Read real reviews from physicians and families who've worked with Sean Shallis at U.S. Bank. 4.8 stars, 25+ reviews. See why doctors trust Sean.",
  openGraph: {
    title: "Client Reviews & Testimonials | Sean Shallis — Physician Mortgage Expert",
    description:
      "Read real reviews from physicians and families who've worked with Sean Shallis at U.S. Bank. 4.8 stars, 25+ reviews. See why doctors trust Sean.",
    type: "website",
    url: "https://seanshallis.com/reviews",
  },
  alternates: {
    canonical: "https://seanshallis.com/reviews",
  },
};

const TESTIMONIALS = [
  {
    quote:
      "I thought my student loans would keep me from buying for years. Sean got me into a zero-down physician loan in 28 days. No PMI. My colleagues couldn\u2019t believe it.",
    name: "Dr. M.P.",
    role: "Internal Medicine, relocating to NJ",
  },
  {
    quote:
      "Sean understood the physician timeline \u2014 I was closing on a house while finishing fellowship. He made it seamless. Rosie\u2019s been watching my rate ever since.",
    name: "Dr. A.K.",
    role: "Cardiology Fellow \u2192 Attending",
  },
  {
    quote:
      "We refinanced with Sean and saved $420/month. His ARM strategy with Rosie monitoring was the move nobody else suggested.",
    name: "Dr. R.S.",
    role: "Orthopedic Surgery, NJ",
  },
  {
    quote:
      "As a resident buying my first home, everyone said wait. Sean showed me the physician loan math and I\u2019m building equity now instead of paying rent.",
    name: "Dr. L.C.",
    role: "Pediatrics, NYC",
  },
  {
    quote:
      "Sean made the convoluted process of a home loan very smooth. He\u2019s easily available and responsive to needs.",
    name: "J.T.",
    role: "First-time Buyer, Chatham NJ",
  },
  {
    quote:
      "The process was long and challenging, but Sean made us feel at ease every step of the way. Whenever there was a challenge, he had solutions.",
    name: "M.R.",
    role: "Refinance Client, Morris County",
  },
  {
    quote:
      "I compared Sean to three online lenders. His rate was competitive AND he actually picks up the phone. That sealed it.",
    name: "Dr. N.P.",
    role: "Anesthesiology, NJ",
  },
  {
    quote:
      "Building a custom home is stressful enough. Sean\u2019s single-close construction loan saved us $12K in double closing costs and he managed the draw schedule personally.",
    name: "K.S.",
    role: "Construction Loan, Summit NJ",
  },
  {
    quote:
      "Cross-country move, new job, tight timeline. Sean closed in 21 days. I didn\u2019t think that was possible.",
    name: "Dr. S.M.",
    role: "Family Medicine, relocating from CA",
  },
];

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)]">
      <SpokeNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(14, 107, 109, 0.12), transparent 50%), radial-gradient(circle at 70% 80%, rgba(200, 165, 80, 0.08), transparent 40%)",
          }}
          aria-hidden
        />
        <Container className="relative py-16 md:py-24 lg:py-28">
          <div className="max-w-3xl">
            <Badge variant="teal" className="mb-6">
              <Star size={12} />
              4.8 Stars &middot; 25+ Reviews
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-6">
              What Physicians &amp; Clients Say About Working with Sean
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8 max-w-2xl">
              Real reviews from real clients. No scripts. No incentives. Just
              honest feedback from families Sean has helped.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Testimonials Grid */}
      <section className="py-16 md:py-24 bg-white border-y border-neutral-200">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-[color:var(--brand-cream)] rounded-2xl p-8 border border-neutral-200 hover:border-[color:var(--brand-teal)] hover:-translate-y-1 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      className="text-[color:var(--brand-gold)] fill-[color:var(--brand-gold)]"
                    />
                  ))}
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-neutral-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="py-12 md:py-16 bg-[color:var(--surface-dark)] text-white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {[
              { stat: "30+", label: "Years" },
              { stat: "$1B+", label: "Transactions" },
              { stat: "1,000+", label: "Families" },
              { stat: "4.8\u2605", label: "Average" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-3xl md:text-4xl font-black text-[color:var(--brand-teal-light)] mb-1">
                  {item.stat}
                </div>
                <div className="text-sm text-neutral-400">{item.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Leave a Review CTA */}
      <section className="py-16 md:py-24 bg-[color:var(--brand-cream)]">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Had a great experience? Share it.
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Your review helps other physicians and families find the right
              mortgage expert.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#google-review"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-[color:var(--brand-teal)] text-white font-semibold hover:bg-[color:var(--brand-teal-dark)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Review on Google
                <ExternalLink size={16} />
              </a>
              <a
                href="https://www.zillow.com/lender-profile/SeanShallisUSBank/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold hover:border-neutral-900 transition-colors"
              >
                Review on Zillow
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="py-20 md:py-24 bg-[color:var(--brand-teal)] text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Ready to see what you qualify for?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              90 seconds with Rosie. No credit impact. No obligation. Or book a
              20-minute strategy call with Sean &mdash; free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-[color:var(--brand-teal)] font-semibold text-base hover:bg-neutral-100 transition-all shadow-xl hover:-translate-y-0.5"
              >
                Ask Rosie
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://link.seanshallis.com/widget/bookings/usb_20m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-white/40 text-white font-semibold text-base hover:border-white transition-colors"
              >
                <Calendar size={16} />
                Book Call
              </a>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
