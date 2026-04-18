import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  BookOpen,
  Building2,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  HardHat,
  Heart,
  Home,
  MessageCircle,
  Podcast,
  Search,
  Shield,
  Star,
  Stethoscope,
  TrendingDown,
  Users,
  Wallet,
} from "lucide-react";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "ACCOM Resources — Ask Rosie, Reviews, Podcast, and Physician Loan Strategy",
  description:
    "Digital companion page for the ACCOM conference packet: Ask Rosie, book Sean, explore physician loan strategy, reviews, and resources.",
};

const ACTIONS = [
  {
    title: "Ask Rosie",
    body: "Chat about your mortgage, next purchase, refinance questions, or your best next move.",
    href: "/rate-guardian/ask-rosie",
    icon: MessageCircle,
  },
  {
    title: "Book a Free Strategy Call",
    body: "Get a 20-minute review with Sean to map out rates, fees, credits, and product fit.",
    href: "https://link.seanshallis.com/widget/bookings/usb_20m",
    icon: Calendar,
    external: true,
  },
  {
    title: "U.S. Bank Mortgage Page",
    body: "Visit Sean's official mortgage page and physician lending gateway.",
    href: "https://mortgage.usbank.com/nj/chatham/sean-shallis-2362814",
    icon: FileText,
    external: true,
  },
  {
    title: "Start Your Application",
    body: "Ready to move? Start the formal mortgage application process.",
    href: "https://www.usbank.com/home-loans/mortgage/apply.html?client=Blend&referrerId=sean.shallis%40usbank.com",
    icon: Wallet,
    external: true,
  },
  {
    title: "The Loan Doctor Podcast",
    body: "Listen to physician wealth-building and mortgage strategy insights.",
    href: "https://podcasts.apple.com/us/podcast/the-loan-doctor/id1800582767",
    icon: Podcast,
    external: true,
  },
  {
    title: "Google Reviews",
    body: "See what medical professionals are saying about working with Sean.",
    href: "https://www.google.com/search?q=sean+shallis+google+business",
    icon: Search,
    external: true,
  },
  {
    title: "Zillow Reviews",
    body: "Browse more client success stories and outcomes.",
    href: "https://www.zillow.com/lender-profile/SeanShallisUSBank/",
    icon: Star,
    external: true,
  },
];

const USB_PROGRAMS = [
  {
    icon: Stethoscope,
    title: "Physician Home Loans",
    body: "Specialized lending for MDs, DOs, residents, and fellows — tailored underwriting that understands medical careers.",
    href: "https://www.usbank.com/home-loans/mortgage.html",
  },
  {
    icon: HardHat,
    title: "Construction-to-Permanent",
    body: "One-time close financing — interest-only during build, then converts to your permanent mortgage. Fixed or ARM.",
    href: "https://www.usbank.com/home-loans/mortgage/construction-loans.html",
  },
  {
    icon: Shield,
    title: "VA Home Loans",
    body: "No down payment, no PMI for eligible veterans, active duty, and surviving spouses. 30-year fixed available.",
    href: "https://www.usbank.com/home-loans/mortgage/va-mortgages.html",
  },
  {
    icon: Building2,
    title: "Jumbo & High-Balance",
    body: "Loans above $832,750 with competitive rates. 15-, 20-, and 30-year terms, fixed or adjustable.",
    href: "https://www.usbank.com/home-loans/mortgage/jumbo-mortgages.html",
  },
  {
    icon: Home,
    title: "First-Time Homebuyer",
    body: "Down payment assistance up to $17,500, 3% down options, and step-by-step guidance through the process.",
    href: "https://www.usbank.com/home-loans/mortgage/first-time-home-buyers.html",
  },
  {
    icon: Heart,
    title: "Affordable Home Programs",
    body: "American Dream Mortgage and Access Home Loan — up to $10,000-$17,500 in combined assistance for qualifying borrowers.",
    href: "https://www.usbank.com/home-loans/mortgage/affordable-home-loans.html",
  },
  {
    icon: TrendingDown,
    title: "Refinance Options",
    body: "Rate-and-term, cash-out, VA streamline (IRRRL), and jumbo refinance — find the right move for your situation.",
    href: "https://www.usbank.com/home-loans/refinance.html",
  },
  {
    icon: BookOpen,
    title: "Medical Practice Loans",
    body: "Business lending for practice acquisition, equipment financing, and commercial real estate for medical offices.",
    href: "https://www.usbank.com/business-banking/business-lending/practice-financing/medical-practice-loans.html",
  },
];

const BROCHURES = [
  {
    title: "Stop Overpaying. Start Building Wealth.",
    body: "The core value proposition — why most physicians overpay $50K-$200K+ and how we fix it.",
    href: "/brochures/stop-overpaying.pdf",
    icon: TrendingDown,
  },
  {
    title: "Strategic Lending for Medical Professionals",
    body: "Full breakdown of physician-specific programs, Rate Guardian monitoring, and who we serve.",
    href: "/brochures/strategic-lending.pdf",
    icon: Stethoscope,
  },
  {
    title: "Your Competitive Advantage",
    body: "The U.S. Bank + Sean Shallis combined value proposition — enterprise banking with boutique strategy.",
    href: "/brochures/competitive-advantage.pdf",
    icon: Shield,
  },
  {
    title: "What Medical Professionals Are Saying",
    body: "Testimonials from physicians, residents, practice owners, and veterans who've worked with Sean.",
    href: "/brochures/testimonials.pdf",
    icon: Users,
  },
  {
    title: "Connect With Sean Shallis",
    body: "QR codes and direct links — book a call, apply, listen to the podcast, read reviews.",
    href: "/brochures/connect-with-sean.pdf",
    icon: MessageCircle,
  },
];

const STRATEGY_PILLARS = [
  {
    icon: Stethoscope,
    title: "Physician-specific lending",
    body: "0% down, no PMI options, student-loan-aware underwriting, and solutions built around medical careers.",
  },
  {
    icon: TrendingDown,
    title: "Rate Guardian monitoring",
    body: "Rosie keeps watching after closing so you never have to wonder if you missed a savings window.",
  },
  {
    icon: BadgeDollarSign,
    title: "Wealth-building loan strategy",
    body: "Lower interest, cleaner fee structure, smarter credits, better timing, and financing aligned with long-term goals.",
  },
  {
    icon: BookOpen,
    title: "Practice and complex financing",
    body: "Construction-to-permanent, jumbo, VA, and wealth-management aligned options when complexity matters.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Sean was referred to us and we are so glad we had the chance to work with him! He was available via text, email, and phone from start to finish and was one of the most responsive professionals we've ever worked with.",
    attribution: "Vic N., Homebuyer, NJ",
  },
  {
    quote:
      "I cannot recommend Sean Shallis and his team at U.S. Bank highly enough. Sean was an invaluable partner who exceeded every expectation. No matter the time of day or the complexity of the question, he was always incredibly responsive and ready to help.",
    attribution: "Michael R., Homebuyer, Brooklyn",
  },
  {
    quote:
      "Sean is amazing!! He is the physician loan expert and has great communication skills and was fantastic to work with!!!",
    attribution: "Ashley M., Physician Client",
  },
  {
    quote:
      "Sean is by far the most knowledgeable loan officer I've ever talked with. He made the convoluted process of home loan very smooth and ensured that we got the best deal.",
    attribution: "Verified Client, Google Review",
  },
];

export default function ACCOMResourcesPage() {
  return (
    <main className="min-h-screen bg-[#f6f2eb] text-[#002855]">
      <div className="bg-[#D71E28] py-2 px-5 text-center text-xs font-semibold tracking-wide text-white/90">
        ACCOM 2026 &middot; Conference Resource Hub
      </div>
      <section className="border-b border-[#002855]/10 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-14">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D71E28] mb-4">
              Loan Doctor / ACCOM Resource Page
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">
              Start with Rosie.
              <br />
              <span className="text-[#0e6b6d]">Stay for the strategy.</span>
            </h1>
            <p className="text-lg text-[#002855]/75 leading-relaxed max-w-3xl mb-8">
              If you have a mortgage, ask Rosie whether you&apos;re overpaying. If you
              don&apos;t, Rosie and Sean will walk you through the process of getting the
              lowest rate, the least bank fees, and the highest lender credits.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0e6b6d] px-6 py-4 font-semibold text-white transition-colors hover:bg-[#0b5658]"
              >
                <MessageCircle size={18} />
                Ask Rosie About Your Mortgage
              </Link>
              <a
                href="https://link.seanshallis.com/widget/bookings/usb_20m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#002855] px-6 py-4 font-semibold text-white transition-colors hover:bg-[#001a3a]"
              >
                <Calendar size={18} />
                Book a Free Strategy Call
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-5 py-12">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D71E28] mb-3">
            Quick access
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Conference packet, now digital.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ACTIONS.map(({ title, body, href, icon: Icon, external }) => {
            const card = (
              <div className="rounded-3xl border border-[#002855]/10 bg-white p-6 h-full shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <Icon size={20} className="text-[#0e6b6d] mb-4" />
                <div className="font-semibold text-lg mb-2">{title}</div>
                <p className="text-sm text-[#002855]/65 leading-relaxed mb-5">{body}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0e6b6d]">
                  Open
                  <ArrowRight size={14} />
                </span>
              </div>
            );
            return external ? (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer">
                {card}
              </a>
            ) : (
              <Link key={title} href={href}>
                {card}
              </Link>
            );
          })}
        </div>
      </section>
      <section className="bg-white border-y border-[#002855]/10">
        <div className="max-w-6xl mx-auto px-5 py-14">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D71E28] mb-3">
              Presentation Materials
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Your conference packet — downloadable.
            </h2>
            <p className="text-[#002855]/65 mt-3 max-w-2xl">
              Everything from the printed folder, available as a PDF you can save, share, or forward to a colleague.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {BROCHURES.map(({ icon: Icon, title, body, href }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-3xl border border-[#002855]/10 bg-[#fcfcfb] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md group"
              >
                <Icon size={20} className="text-[#0e6b6d] mb-4" />
                <div className="font-semibold text-lg mb-2">{title}</div>
                <p className="text-sm text-[#002855]/65 leading-relaxed mb-4">{body}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0e6b6d] group-hover:gap-3 transition-all">
                  Download PDF
                  <Download size={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#f6f2eb] border-b border-[#002855]/10">
        <div className="max-w-6xl mx-auto px-5 py-14">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D71E28] mb-3">
              U.S. Bank Lending Programs
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold">
              The 5th largest bank in America — working for you.
            </h2>
            <p className="text-[#002855]/65 mt-3 max-w-2xl">
              Explore our full suite of lending products. Each link takes you to the official U.S. Bank product page with current rates, eligibility, and details.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {USB_PROGRAMS.map(({ icon: Icon, title, body, href }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-3xl border border-[#002855]/10 bg-[#fcfcfb] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md group"
              >
                <Icon size={20} className="text-[#0e6b6d] mb-4" />
                <div className="font-semibold text-lg mb-2">{title}</div>
                <p className="text-sm text-[#002855]/65 leading-relaxed mb-4">{body}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0e6b6d] group-hover:gap-3 transition-all">
                  View on U.S. Bank
                  <ExternalLink size={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#002855] text-white">
        <div className="max-w-6xl mx-auto px-5 py-14">
          <div className="max-w-3xl mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#14a8ab] mb-3">
              What makes this different
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Not just a loan. A proven and personal wealth-building loan strategy.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {STRATEGY_PILLARS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-6"
              >
                <Icon size={20} className="text-[#14a8ab] mb-4" />
                <div className="font-semibold text-lg mb-2">{title}</div>
                <p className="text-sm text-blue-100/70 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white border-y border-[#002855]/10">
        <div className="max-w-6xl mx-auto px-5 py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D71E28] mb-3">
            What medical professionals are saying
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            Real results. Real impact.
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.attribution}
                className="rounded-3xl border border-[#002855]/10 bg-[#fcfcfb] p-6 shadow-sm"
              >
                <div className="flex gap-1 text-[#D71E28] mb-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={14} className="fill-current" />
                  ))}
                </div>
                <p className="text-[#002855]/80 leading-relaxed mb-4">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="text-sm font-semibold text-[#002855]">{item.attribution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="max-w-6xl mx-auto px-5 py-8 text-center text-xs text-[#002855]/55">
        <p>
          {BRAND.name} &middot; Private Wealth Mortgage Strategist &middot; {BRAND.bank} &middot; {BRAND.nmls}
        </p>
        <p className="mt-1">
          {BRAND.contact.phone} &middot; {BRAND.contact.email}
        </p>
      </footer>
    </main>
  );
}
