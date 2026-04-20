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
                  Guardian Family
                </div>
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md mb-6">
              30+ years helping families build wealth through smart loan
              strategies. Now, Rosie watches your rate 24/7 — so you don't have
              to.
            </p>
            <div className="space-y-1.5 text-sm text-neutral-400">
              <div>{BRAND.bank} · {BRAND.nmls}</div>
              <div>{BRAND.contact.location}</div>
              <div className="font-mono">{BRAND.contact.phone}</div>
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
                  Sean's Story
                </Link>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/seantshallis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Media &amp; Press
                </a>
              </li>
              <li>
                <a
                  href="https://a.co/d/0aP6arT9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  The Book
                </a>
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
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Sean T. Shallis · Guardian Family™. All rights reserved.
          </div>
          <div className="flex gap-4">
            <span>{BRAND.nmls}</span>
            <span>Equal Housing Lender</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
