import Link from "next/link";
import { Footer } from "@/components/brand/Footer";

export const metadata = {
  title: "Realtor Partner Program",
  description:
    "Exclusive training, tools, and resources for real estate professionals partnering with Sean Shallis. 200+ hours of coaching content from RealtyCoach.",
};

export default function PartnersLandingPage() {
  return (
    <div className="min-h-screen bg-[color:var(--surface-dark)] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--brand-teal)] via-[color:var(--brand-teal-dark)] to-[color:var(--brand-navy)]" />
        <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-36 text-center">
          <p className="text-sm uppercase tracking-widest text-[color:var(--brand-gold)] font-semibold mb-4">
            Exclusive Partner Access
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Your Unfair Advantage
            <br />
            <span className="text-[color:var(--brand-gold)]">
              Starts Here.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10">
            200+ hours of elite coaching, scripts, systems, and frameworks from
            a former KW MAPS coach who has guided over $1B in transactions.
            Available exclusively to referring partners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/partners/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] font-bold text-lg hover:bg-[color:var(--brand-gold-light)] transition-colors"
            >
              Partner Login
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Partners Get
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "200+ Hours of Training",
              description:
                "From the RealtyCoach vault — scripts, dialogues, listing mastery, lead gen systems, and the Billion Dollar Blind Spot framework.",
              icon: "🎓",
            },
            {
              title: "Proprietary Frameworks",
              description:
                "10X Formula, CP², AIDA Strategic Execution, Success Addiction — frameworks that built six-figure businesses.",
              icon: "🔑",
            },
            {
              title: "Rate Guardian for Clients",
              description:
                "Your clients get free AI mortgage monitoring. When Rosie finds savings, Sean closes it. You get a client for life.",
              icon: "🛡️",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[color:var(--surface-dark-card)] border border-[color:var(--surface-dark-border)] rounded-xl p-6"
            >
              <span className="text-3xl mb-4 block">{item.icon}</span>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-neutral-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="bg-[color:var(--surface-dark-card)] border-y border-[color:var(--surface-dark-border)]"
      >
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            How to Get Access
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="flex-none w-10 h-10 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-lg">Partner with Sean</h3>
                  <p className="text-neutral-400">
                    Actively refer mortgage business and join the Guardian
                    Family network.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex-none w-10 h-10 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-bold text-lg">Get Your Invite</h3>
                  <p className="text-neutral-400">
                    Sean sends you a private access link. Log in with your real
                    estate license number.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex-none w-10 h-10 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-lg">Unlock Everything</h3>
                  <p className="text-neutral-400">
                    200+ hours of training, frameworks, and tools — updated
                    regularly with new content.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[color:var(--surface-dark)] rounded-xl p-8 border border-[color:var(--surface-dark-border)]">
              <p className="text-sm uppercase tracking-wider text-[color:var(--brand-gold)] font-semibold mb-3">
                Who This Is For
              </p>
              <ul className="space-y-3 text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--brand-teal)] mt-1">
                    ✓
                  </span>
                  Licensed real estate agents in NJ, NY, CT, PA
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--brand-teal)] mt-1">
                    ✓
                  </span>
                  Teams looking for a mortgage partner who adds value
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--brand-teal)] mt-1">
                    ✓
                  </span>
                  Agents ready to go from 6 figures to 7
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--brand-teal)] mt-1">
                    ✓
                  </span>
                  Anyone who believes success is a habit, not an accident
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Level Up?</h2>
        <p className="text-lg text-neutral-400 mb-8">
          Already a partner? Log in below. Want to become one? Reach out to
          Sean directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/partners/dashboard"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] font-bold text-lg hover:bg-[color:var(--brand-gold-light)] transition-colors"
          >
            Partner Login
          </Link>
          <Link
            href="/connect"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-[color:var(--brand-teal)] text-[color:var(--brand-teal)] font-bold text-lg hover:bg-[color:var(--brand-teal)]/10 transition-colors"
          >
            Connect with Sean
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
