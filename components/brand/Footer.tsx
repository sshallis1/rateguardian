import Link from "next/link";
import { BRAND, GUARDIANS } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="bg-[color:var(--brand-navy)] text-white">
      <div className="mx-auto max-w-6xl px-6 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center text-white font-bold text-sm">
                SS
              </div>
              <div>
                <div className="font-bold text-lg">Sean Shallis</div>
                <div className="text-xs uppercase tracking-widest text-neutral-400">
                  {BRAND.company}
                </div>
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md mb-6">
              30+ years helping over 2,000 families build wealth through smart
              mortgage strategies. The Guardian Family of products are proprietary
              technology tools built by Sean to help you eliminate financial blind spots.
            </p>
            <div className="space-y-1.5 text-sm text-neutral-400">
              <div className="font-semibold text-neutral-300">Mortgage Lending:</div>
              <div>Sean Shallis, Mortgage Loan Originator</div>
              <div>{BRAND.bank} · {BRAND.nmls}</div>
              <div>{BRAND.contact.address}</div>
              <div>{BRAND.contact.city}, {BRAND.contact.state} {BRAND.contact.zip}</div>
              <div className="font-mono">{BRAND.contact.phone}</div>
              <div className="font-mono text-xs">{BRAND.contact.email}</div>
            </div>
          </div>

          {/* Guardian Family */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-500 mb-4">
              Guardian Family
            </h4>
            <ul className="space-y-2.5">
              {GUARDIANS.map((g) => (
                <li key={g.id}>
                  <Link
                    href={g.status === "live" ? g.href : `${g.href}#notify`}
                    className="text-sm text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: g.color }}
                    />
                    {g.name}
                    {g.status !== "live" && (
                      <span className="text-[10px] uppercase text-neutral-500">
                        {g.status}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-500 mb-4">
              About
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Sean&apos;s Story
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Reviews &amp; Testimonials
                </Link>
              </li>
              <li>
                <a
                  href="https://podcasts.apple.com/us/podcast/the-loan-doctor/id1800582767"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  The Loan Doctor Podcast
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/seantshallis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link href="/connect" className="hover:text-white transition-colors">
                  Connect with Sean
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclosures */}
        <div className="mt-12 pt-8 border-t border-white/10 space-y-4">
          <div className="text-[11px] text-neutral-500 leading-relaxed max-w-4xl">
            <p className="mb-3">
              {BRAND.disclosure.site}
            </p>
            <p className="mb-3">
              {BRAND.disclosure.mortgage}
            </p>
            <p>
              {BRAND.disclosure.approval}
            </p>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-white/5">
            <div className="text-xs text-neutral-500">
              &copy; {new Date().getFullYear()} {BRAND.entity} · {BRAND.company}&trade;. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              <Link href="/privacy" className="hover:text-neutral-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-neutral-300 transition-colors">
                Terms &amp; Conditions
              </Link>
              <span>{BRAND.nmls}</span>
              <span>Equal Housing Lender</span>
              <span>Member FDIC</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
