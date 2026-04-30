import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Shield,
  CheckCircle2,
  XCircle,
  Stethoscope,
  GraduationCap,
  Clock,
  DollarSign,
  Calendar,
  AlertTriangle,
  TrendingDown,
  FileText,
  Home,
  Building2,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Physician Mortgage Loans: The Complete 2026 Guide | Sean Shallis",
  description:
    "Everything physicians need to know about doctor mortgage loans in 2026. How they work, who qualifies, costs, pros and cons, and how to compare physician vs. conventional vs. FHA. Written by a 30-year mortgage expert married to a physician.",
  keywords: [
    "physician mortgage loan guide",
    "doctor mortgage loan",
    "physician home loan explained",
    "physician mortgage vs conventional",
    "physician mortgage pros cons",
    "doctor loan requirements",
    "physician mortgage down payment",
    "physician mortgage PMI",
    "how physician mortgage works",
    "physician mortgage student loans",
    "physician mortgage 2026",
    "doctor mortgage guide",
    "medical professional mortgage",
    "physician loan eligibility",
  ],
  openGraph: {
    title: "Physician Mortgage Loans: The Complete 2026 Guide",
    description:
      "Everything doctors need to know before buying a home. How physician loans work, who qualifies, costs, and how to compare options. Written by a 30-year expert.",
    type: "article",
    url: "https://seanshallis.com/physician-loans/guide",
  },
  alternates: {
    canonical: "https://seanshallis.com/physician-loans/guide",
  },
};

export default function PhysicianLoanGuidePage() {
  return (
    <main className="min-h-screen bg-white">
      <SpokeNav />

      {/* Hero */}
      <section className="bg-[color:var(--brand-cream)] border-b border-neutral-200">
        <Container className="py-16 md:py-24 max-w-4xl">
          <Badge variant="teal" className="mb-6">
            <FileText size={12} />
            Updated for 2026
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
            Physician Mortgage Loans:{" "}
            <span className="text-[color:var(--brand-teal)]">
              The Complete Guide
            </span>
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed mb-6 max-w-3xl">
            Everything you need to know before buying a home as a physician —
            how doctor loans work, who qualifies, what they cost, and whether
            one is right for you. Written by a mortgage expert with 30+ years
            of experience who happens to be married to a physician.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500">
            <span>By Sean Shallis, NMLS #2362814</span>
            <span>·</span>
            <span>20 min read</span>
            <span>·</span>
            <span>Last updated: April 2026</span>
          </div>
        </Container>
      </section>

      {/* Table of Contents */}
      <section className="bg-white border-b border-neutral-200">
        <Container className="py-8 max-w-4xl">
          <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">
            In This Guide
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
            {[
              { label: "What Is a Physician Mortgage Loan?", href: "#what-is" },
              { label: "Who Qualifies?", href: "#who-qualifies" },
              { label: "How Physician Loans Work", href: "#how-it-works" },
              { label: "The Loan Process, Step by Step", href: "#process" },
              { label: "Down Payment & Costs", href: "#costs" },
              { label: "Physician vs. Conventional vs. FHA", href: "#comparison" },
              { label: "Pros and Cons (Honest)", href: "#pros-cons" },
              { label: "Student Loan Treatment", href: "#student-loans" },
              { label: "ARM vs. Fixed Rate", href: "#arm-vs-fixed" },
              { label: "Alternatives to Physician Loans", href: "#alternatives" },
              { label: "How to Choose the Right Lender", href: "#choosing" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[color:var(--brand-teal)] hover:underline py-1"
              >
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Content */}
      <Container className="py-12 md:py-20 max-w-3xl">
        <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-p:leading-relaxed prose-li:text-neutral-700 prose-a:text-[color:var(--brand-teal)] prose-a:no-underline hover:prose-a:underline">

          {/* What Is */}
          <h2 id="what-is" className="scroll-mt-24">What Is a Physician Mortgage Loan?</h2>
          <p>
            A physician mortgage loan is a specialized home loan offered by select
            banks and lenders to doctors and certain medical professionals. The
            core idea: lenders evaluate physicians differently than conventional
            borrowers because they have a strong — but often delayed — earning
            trajectory.
          </p>
          <p>
            This matters because most physicians buy their first home during a
            transition: finishing residency, starting fellowship, or beginning an
            attending role. At that point, savings may be thin, employment history
            is short, and student loan balances make a conventional application
            look worse than the reality.
          </p>
          <p>
            A physician loan is <strong>not automatically better</strong> than a
            conventional loan. It&apos;s another option — and it should be compared
            on rate, fees, structure, and how the lender treats your student debt.
            That&apos;s where having an expert matters.
          </p>

          {/* CTA Card */}
          <div className="not-prose my-10 bg-gradient-to-br from-[color:var(--brand-teal)]/5 to-transparent rounded-2xl border border-[color:var(--brand-teal)]/20 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[color:var(--brand-teal)]/10 flex items-center justify-center flex-shrink-0">
                <Stethoscope size={24} className="text-[color:var(--brand-teal)]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-neutral-900 mb-2">
                  Want the short version?
                </h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Chat with Rosie — she&apos;ll ask about your situation and tell you
                  in 90 seconds whether a physician loan makes sense for you.
                  No forms, no credit impact.
                </p>
                <Link
                  href="/rate-guardian/ask-rosie"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[color:var(--brand-teal)] text-white text-sm font-semibold hover:bg-[color:var(--brand-teal-dark)] transition-colors"
                >
                  Talk to Rosie <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Who Qualifies */}
          <h2 id="who-qualifies" className="scroll-mt-24">Who Qualifies for a Physician Mortgage Loan?</h2>
          <p>
            Eligibility varies by lender. Some programs are narrow (MD and DO
            only), while others extend to a broader range of medical and
            healthcare professionals. Here&apos;s the typical landscape:
          </p>

          <h3>Commonly Accepted (Most Lenders)</h3>
          <ul>
            <li>Medical Doctors (MD)</li>
            <li>Doctors of Osteopathy (DO)</li>
            <li>Doctors of Dental Medicine (DMD) / Dental Surgery (DDS)</li>
            <li>Juris Doctors (JD) — at select lenders</li>
          </ul>

          <h3>Accepted at Some Lenders</h3>
          <ul>
            <li>Optometrists (OD)</li>
            <li>Podiatrists (DPM)</li>
            <li>Veterinarians (DVM)</li>
            <li>PharmD / Registered Pharmacists (RPh)</li>
            <li>Physician Assistants (PA)</li>
            <li>Nurse Practitioners (NP)</li>
            <li>Certified Registered Nurse Anesthetists (CRNA)</li>
            <li>Chiropractors (DCH)</li>
          </ul>

          <p>
            <strong>At U.S. Bank specifically</strong>, the physician loan program
            is available to MDs, DOs, and JDs. If your credential isn&apos;t on that
            list, Sean can often find an alternative program or conventional
            structure that achieves a similar result.
          </p>

          <h3>Career Stage Matters</h3>
          <p>
            Most programs accept physicians at any career stage — resident, fellow,
            or attending. Many allow a <strong>signed employment contract</strong> to
            qualify, even if your start date is weeks or months away. This is one of
            the biggest advantages: you can close on a home before you start your
            new role.
          </p>

          {/* How It Works */}
          <h2 id="how-it-works" className="scroll-mt-24">How Physician Mortgage Loans Work</h2>
          <p>
            Physician loans aren&apos;t standardized. Two lenders can both advertise
            &ldquo;physician loans&rdquo; and have meaningfully different rules.
            Here&apos;s what most programs share:
          </p>

          <h3>Contract-Based Income Qualification</h3>
          <p>
            Many programs let you qualify with a signed employment contract instead
            of a long W-2 history. This is critical for physicians relocating or
            transitioning out of training. You don&apos;t need to wait 6 months at
            your new job to buy.
          </p>

          <h3>Student Loan Treatment</h3>
          <p>
            This is where physician loans diverge the most. Student loans can
            inflate your debt-to-income (DTI) ratio and kill a conventional
            application. Physician programs may evaluate your student debt
            differently — using your actual IBR payment, a percentage of the
            balance, or even excluding deferred loans entirely. The specifics
            vary by lender and can be the difference between approval and denial.
          </p>

          <h3>No PMI on Low Down Payments</h3>
          <p>
            Conventional loans require Private Mortgage Insurance (PMI) when you
            put less than 20% down. Most physician programs waive PMI entirely,
            even at 5% or 10% down. This can save $200-$500/month depending on
            loan size.
          </p>

          <h3>Primary Residence Only</h3>
          <p>
            Nearly all physician programs are limited to owner-occupied primary
            residences. No investment properties, no vacation homes. If you need
            those, Sean can structure conventional or portfolio alternatives.
          </p>

          {/* Process */}
          <h2 id="process" className="scroll-mt-24">The Loan Process, Step by Step</h2>
          <p>
            The process is similar to a conventional mortgage, but the documentation
            and underwriting questions differ.
          </p>
        </div>

        {/* Process Steps - Visual */}
        <div className="not-prose my-10 space-y-6">
          {[
            {
              n: "01",
              icon: Stethoscope,
              title: "Talk to Rosie (or Sean Directly)",
              body: "Tell Rosie about your situation — buying, refinancing, relocating. 90 seconds, no forms, no credit impact. She gives you a Savings Score and Sean follows up personally. Or skip Rosie and book a call directly.",
            },
            {
              n: "02",
              icon: FileText,
              title: "Pre-Approval",
              body: "Sean reviews your employment contract (or W-2s), credit profile, assets, and student loan situation. You get a pre-approval letter that tells sellers you're serious — typically within 24-48 hours.",
            },
            {
              n: "03",
              icon: Home,
              title: "Find Your Home & Make an Offer",
              body: "Shop with confidence knowing exactly what you qualify for. When you find the one, your offer is backed by a U.S. Bank pre-approval.",
            },
            {
              n: "04",
              icon: Shield,
              title: "Underwriting & Appraisal",
              body: "Sean's team orders the appraisal and manages the underwriting process. This is where student loan treatment, contract income, and reserves are verified. Sean handles the complexity — you focus on the move.",
            },
            {
              n: "05",
              icon: DollarSign,
              title: "Close & Move In",
              body: "Sign closing documents, fund the loan, get the keys. Average close time: 30 days. After closing, Rosie starts monitoring your rate — for free, forever.",
            },
          ].map((step) => (
            <div key={step.n} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-[color:var(--brand-teal)] text-white flex items-center justify-center font-mono font-bold text-lg flex-shrink-0">
                  {step.n}
                </div>
                {step.n !== "05" && (
                  <div className="w-0.5 flex-1 bg-neutral-200 mt-2" />
                )}
              </div>
              <div className="pb-6">
                <h3 className="font-bold text-lg text-neutral-900 mb-1">{step.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-p:leading-relaxed prose-li:text-neutral-700 prose-a:text-[color:var(--brand-teal)] prose-a:no-underline hover:prose-a:underline">

          {/* Costs */}
          <h2 id="costs" className="scroll-mt-24">Down Payment & Costs</h2>
          <p>
            Physician loan down payments vary by lender and loan amount. Here&apos;s
            what U.S. Bank offers:
          </p>
        </div>

        {/* Down Payment Table */}
        <div className="not-prose my-8 rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
            <h3 className="font-bold text-neutral-900">U.S. Bank Physician Loan — Down Payment Tiers</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Loan Amount</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Min. Down Payment</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">PMI</th>
              </tr>
            </thead>
            <tbody>
              {[
                { amount: "Up to $1,000,000", down: "5%", pmi: "None" },
                { amount: "Up to $1,500,000", down: "10%", pmi: "None" },
                { amount: "Up to $2,000,000", down: "15%", pmi: "None" },
                { amount: "Maximum: $2,500,000", down: "Varies", pmi: "None" },
              ].map((row) => (
                <tr key={row.amount} className="border-b border-neutral-100 last:border-0">
                  <td className="px-6 py-3 font-medium text-neutral-900">{row.amount}</td>
                  <td className="px-6 py-3 text-[color:var(--brand-teal)] font-semibold">{row.down}</td>
                  <td className="px-6 py-3 text-emerald-600 font-medium">{row.pmi}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500">
            Down payment can be gifted. Min. credit score: 710. Eligible: MD, DO, JD.
            Rates subject to credit approval and program guidelines.
          </div>
        </div>

        <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-p:leading-relaxed prose-li:text-neutral-700 prose-a:text-[color:var(--brand-teal)] prose-a:no-underline hover:prose-a:underline">

          <h3>Other Costs to Expect</h3>
          <ul>
            <li><strong>Closing costs:</strong> Lender fees, appraisal, title insurance, escrow setup. Varies by state and loan size.</li>
            <li><strong>Application fee:</strong> U.S. Bank charges $395, credited toward closing costs.</li>
            <li><strong>Cash reserves:</strong> 3, 6, or 12 months depending on loan amount and property type.</li>
            <li><strong>Monthly payment:</strong> Principal + interest. Taxes and insurance typically escrowed.</li>
          </ul>

          {/* Comparison */}
          <h2 id="comparison" className="scroll-mt-24">Physician Loan vs. Conventional vs. FHA</h2>
          <p>
            Not sure which loan type is right? Here&apos;s how they stack up:
          </p>
        </div>

        {/* Comparison Table */}
        <div className="not-prose my-8 rounded-2xl border border-neutral-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Feature</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[color:var(--brand-teal)] uppercase">Physician Loan</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Conventional</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">FHA</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Min. down payment", phys: "5%", conv: "3-5%", fha: "3.5%" },
                { feature: "PMI required", phys: "No", conv: "Yes (if <20%)", fha: "Yes (for life)" },
                { feature: "Student loan treatment", phys: "Flexible", conv: "Strict", fha: "Strict" },
                { feature: "Employment contract OK", phys: "Yes", conv: "Rarely", fha: "No" },
                { feature: "Max loan amount", phys: "$2.5M+", conv: "$766,550*", fha: "$498,257*" },
                { feature: "Credit score min.", phys: "710", conv: "620", fha: "580" },
                { feature: "Property types", phys: "Primary only", conv: "Any", fha: "Primary only" },
                { feature: "Rate comparison", phys: "Varies", conv: "Often lowest", fha: "Competitive" },
                { feature: "Best for", phys: "Early-career MDs", conv: "Strong credit + savings", fha: "Lower credit scores" },
              ].map((row) => (
                <tr key={row.feature} className="border-b border-neutral-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-neutral-900">{row.feature}</td>
                  <td className="px-4 py-3 text-center text-neutral-700">{row.phys}</td>
                  <td className="px-4 py-3 text-center text-neutral-500">{row.conv}</td>
                  <td className="px-4 py-3 text-center text-neutral-500">{row.fha}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500">
            * Conforming loan limits for 2026 in most areas. Higher in high-cost areas.
            All terms subject to credit approval and program guidelines.
          </div>
        </div>

        <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-p:leading-relaxed prose-li:text-neutral-700 prose-a:text-[color:var(--brand-teal)] prose-a:no-underline hover:prose-a:underline">

          {/* Pros and Cons */}
          <h2 id="pros-cons" className="scroll-mt-24">Pros and Cons of Physician Mortgage Loans (Honest)</h2>
          <p>
            I&apos;m going to be straight with you — because that&apos;s what 30 years
            in this business has taught me. Physician loans solve real problems,
            but they also have tradeoffs most marketplaces won&apos;t tell you about.
          </p>
        </div>

        {/* Pros/Cons Cards */}
        <div className="not-prose my-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-6">
            <h3 className="flex items-center gap-2 font-bold text-emerald-800 mb-4">
              <CheckCircle2 size={20} /> Advantages
            </h3>
            <ul className="space-y-3">
              {[
                "Low down payment options (as little as 5%) without PMI",
                "Qualify with a signed employment contract — no need to wait",
                "Student loans evaluated more favorably than conventional",
                "Higher loan limits for expensive markets",
                "Designed for the physician's unique financial timeline",
                "Rate monitoring with Rosie catches savings opportunities post-close",
              ].map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-sm text-emerald-900">
                  <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-800 mb-4">
              <AlertTriangle size={20} /> Things to Watch
            </h3>
            <ul className="space-y-3">
              {[
                "Rates can be slightly higher than a strong conventional application",
                "Many programs use adjustable-rate structures (ARMs) — know your reset date",
                "Higher loan limits can tempt over-borrowing during career transitions",
                "Limited to primary residence — no investment properties",
                "Higher credit score requirements (710+) than FHA or some conventional",
                "Not all professions qualify at every lender — check eligibility first",
              ].map((con) => (
                <li key={con} className="flex items-start gap-2 text-sm text-amber-900">
                  <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-p:leading-relaxed prose-li:text-neutral-700 prose-a:text-[color:var(--brand-teal)] prose-a:no-underline hover:prose-a:underline">

          {/* Student Loans */}
          <h2 id="student-loans" className="scroll-mt-24">Student Loan Treatment: The Make-or-Break Factor</h2>
          <p>
            This is the #1 reason physician loans exist. A physician with $300K in
            student loans on an IBR payment of $400/month looks very different
            to a conventional underwriter vs. a physician loan underwriter.
          </p>
          <p>
            <strong>Conventional underwriting</strong> may calculate your student
            loan payment as 0.5-1% of the total balance per month — turning that
            $300K into a $1,500-$3,000/month payment for DTI purposes, even if
            you&apos;re actually paying $400.
          </p>
          <p>
            <strong>Physician loan programs</strong> may use your actual IBR
            payment, a lower percentage of balance, or have other flexible
            approaches. The specifics vary by lender — this is one of the biggest
            reasons to work with someone who specializes in physician lending
            rather than a generalist.
          </p>
          <p>
            At U.S. Bank, Sean structures each application based on your specific
            repayment plan and can advise on whether a physician program or
            conventional approach gives you better purchasing power.
          </p>

          {/* ARM vs Fixed */}
          <h2 id="arm-vs-fixed" className="scroll-mt-24">ARM vs. Fixed Rate: The Hidden Decision</h2>
          <p>
            Many physician mortgage programs use adjustable-rate mortgages (ARMs) —
            5/1, 7/1, or 10/1 structures where the rate is fixed for an initial
            period, then adjusts annually.
          </p>
          <p>
            <strong>The conventional wisdom</strong> says ARMs are risky because of
            2008. That&apos;s partially true — but it misses the context.
          </p>
          <p>
            <strong>The reality</strong>: An ARM with active monitoring is a
            different product than an ARM you forget about. Most physicians
            refinance within 5-7 years anyway (career moves, income changes,
            rate drops). If someone is watching your rate and timing the
            refinance, the ARM saves you money during the years you hold it.
          </p>
          <p>
            That&apos;s exactly what Rosie does. She monitors your rate multiple
            times a day and alerts you when a refinance window opens — well
            before your ARM adjusts. The ARM becomes the smart play, not the
            risky one, because you have a guardian watching.
          </p>

          {/* Alternatives */}
          <h2 id="alternatives" className="scroll-mt-24">Alternatives to a Physician Mortgage Loan</h2>
          <p>
            A physician loan isn&apos;t the default answer. Depending on your profile,
            other options may be better:
          </p>
          <ul>
            <li>
              <strong>Conventional loan:</strong> If you have strong credit, stable
              income history, and 20%+ down, conventional can beat physician loan
              rates. Even with 10-15% down, the math sometimes favors conventional
              + temporary PMI over a physician program.
            </li>
            <li>
              <strong>VA loan:</strong> If you&apos;re a veteran physician, the VA loan
              is truly $0 down with no PMI — and it&apos;s not a physician-specific
              program, it&apos;s your earned military benefit. Sean is a veteran himself
              and can help maximize both benefits.{" "}
              <Link href="/va-loans">Learn about VA loans →</Link>
            </li>
            <li>
              <strong>FHA loan:</strong> Lower credit score requirements (580+) but
              comes with mortgage insurance for the life of the loan. Rarely the
              best option for physicians.
            </li>
            <li>
              <strong>Piggyback (80/10/10):</strong> First mortgage at 80% LTV +
              second loan at 10% to avoid PMI + 10% down. More complex but can
              be effective in specific situations.
            </li>
            <li>
              <strong>Refinance later:</strong> Some physicians use a physician
              loan early, then refinance into conventional once income stabilizes
              and equity builds. Rosie monitors for the right window automatically.
            </li>
          </ul>

          {/* Choosing */}
          <h2 id="choosing" className="scroll-mt-24">How to Choose the Right Lender</h2>
          <p>
            This is where most physicians go wrong. They compare rates on a
            marketplace, pick the lowest number, and hope for the best. Here&apos;s
            what actually matters:
          </p>
          <ol>
            <li>
              <strong>Compare total cost, not just rate.</strong> Rate + fees +
              credits + PMI (or lack thereof) = your real cost. A 0.125% lower
              rate with $3,000 more in fees isn&apos;t a better deal.
            </li>
            <li>
              <strong>Ask how they treat your student loans.</strong> This is the
              single biggest variable in physician lending. Get it in writing.
            </li>
            <li>
              <strong>Ask if they portfolio the loan.</strong> Lenders who sell
              your loan after closing have no incentive to help you later. U.S. Bank
              portfolios physician loans — the relationship continues.
            </li>
            <li>
              <strong>Ask about rate renegotiation.</strong> Some lenders (including
              U.S. Bank) let you renegotiate your rate if market rates drop before
              funding. Most don&apos;t.
            </li>
            <li>
              <strong>Ask who you&apos;ll work with.</strong> Will you talk to a
              dedicated loan officer, or get routed to whoever&apos;s available? At
              U.S. Bank, you work with Sean personally — from application to close
              and beyond.
            </li>
          </ol>

          {/* FAQ */}
          <h2 id="faq" className="scroll-mt-24">Frequently Asked Questions</h2>
        </div>

        {/* FAQ Accordions */}
        <div className="not-prose my-8 space-y-4">
          {[
            {
              q: "Can I qualify with $300K+ in student loans?",
              a: "Yes. The key is how the lender calculates your student loan payment for DTI purposes. Physician programs typically use your actual monthly payment (IBR/PAYE) rather than a percentage of the total balance. Sean evaluates each situation individually to find the best approach.",
            },
            {
              q: "I'm still in residency. Can I buy now?",
              a: "Yes. With a signed employment contract for your attending role, you can qualify based on your future salary — not your resident income. Many physicians buy 60-90 days before starting.",
            },
            {
              q: "What are the down payment requirements at U.S. Bank?",
              a: "5% down on loans up to $1M, 10% on loans up to $1.5M, 15% on loans up to $2M. Maximum loan amount is $2.5M. No PMI on any tier. Down payment can be gifted. Minimum credit score: 710.",
            },
            {
              q: "Is a physician loan better than conventional?",
              a: "It depends on your profile. If you have 20% down, strong credit, and stable W-2 income, conventional may offer a better rate. If you're early career with student loans and less savings, a physician loan removes friction that conventional can't. Sean compares both for every client.",
            },
            {
              q: "Should I get a fixed rate or ARM?",
              a: "It depends on how long you plan to stay. If you're likely to move or refinance within 7 years, an ARM saves money during the fixed period. The risk is forgetting about the adjustment — which is why Rosie monitors your rate and alerts you before the reset hits.",
            },
            {
              q: "Can I use a physician loan for investment property?",
              a: "No. Physician loans are limited to primary residences. For investment properties, Sean can structure conventional or portfolio financing through U.S. Bank.",
            },
            {
              q: "How long does closing take?",
              a: "Average is 30 days from contract to close. Sean's team has a physician-specific processing lane that moves faster than typical retail banking.",
            },
            {
              q: "What's the difference between you and a marketplace like LeverageRx?",
              a: "A marketplace collects your info and sells it to multiple lenders who cold-call you. You work with whoever answers first. With Sean, you work with one expert — personally — from first conversation through close and beyond. Plus Rosie monitors your rate forever. You're not a lead. You're a client.",
            },
            {
              q: "Is the AI rate monitoring really free?",
              a: "Yes. Zero cost, forever. Rosie monitors rates multiple times a day and alerts you when savings windows open. No subscription, no hidden fees. Sean built it because physicians are too busy to track rates themselves.",
            },
            {
              q: "Do you work in my state?",
              a: "Sean is licensed nationwide. U.S. Bank physician loan programs are available in all 50 states with the same terms and white-glove service.",
            },
          ].map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-neutral-200 bg-[color:var(--brand-cream)] overflow-hidden"
            >
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-bold text-neutral-900 hover:text-[color:var(--brand-teal)] transition-colors">
                {faq.q}
                <ArrowRight size={16} className="text-neutral-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-5 text-sm text-neutral-600 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        {/* Author Box */}
        <div className="not-prose my-12 bg-[color:var(--brand-cream)] rounded-2xl border border-neutral-200 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              SS
            </div>
            <div>
              <h3 className="font-bold text-neutral-900">About the Author</h3>
              <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                Sean Shallis is a Mortgage Loan Originator (NMLS #2362814) at
                U.S. Bank with 30+ years of experience and over $1B in closed
                transactions. He&apos;s married to a physician, a U.S. Army veteran,
                an Amazon #1 best-selling author, and the creator of Rate Guardian
                AI. He built Rosie because physicians deserve someone watching
                out for them — even when they&apos;re too busy to watch for themselves.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Link
                  href="/rate-guardian/ask-rosie"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color:var(--brand-teal)] text-white text-sm font-semibold hover:bg-[color:var(--brand-teal-dark)] transition-colors"
                >
                  Talk to Rosie <ArrowRight size={14} />
                </Link>
                <a
                  href="https://link.seanshallis.com/widget/bookings/usb_20m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-neutral-300 text-neutral-700 text-sm font-semibold hover:border-neutral-900 transition-colors"
                >
                  <Calendar size={14} />
                  Book a Call with Sean
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Closing CTA */}
      <section className="py-20 md:py-24 bg-[color:var(--brand-teal)] text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Stethoscope className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Ready to see what you qualify for?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              90 seconds with Rosie. No credit impact. No obligation.
              Or book a 20-minute strategy call with Sean — free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-[color:var(--brand-teal)] font-semibold text-base hover:bg-neutral-100 transition-all shadow-xl hover:-translate-y-0.5"
              >
                Check My Rate Now
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://link.seanshallis.com/widget/bookings/usb_20m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full border-2 border-white/40 text-white font-semibold text-base hover:border-white transition-colors"
              >
                <Calendar size={16} />
                Book Strategy Call
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      <section className="py-10 bg-[color:var(--brand-cream)] border-t border-neutral-200">
        <Container>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/physician-loans" className="text-[color:var(--brand-teal)] hover:underline font-medium">
              Physician Loans by State
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/va-loans" className="text-[color:var(--brand-teal)] hover:underline font-medium">
              VA Loans
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/construction-loans" className="text-[color:var(--brand-teal)] hover:underline font-medium">
              Construction Loans
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/reviews" className="text-[color:var(--brand-teal)] hover:underline font-medium">
              Client Reviews
            </Link>
            <span className="text-neutral-300">|</span>
            <Link href="/about" className="text-[color:var(--brand-teal)] hover:underline font-medium">
              About Sean
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
