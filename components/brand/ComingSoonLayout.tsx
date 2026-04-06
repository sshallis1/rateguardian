import Link from "next/link";
import type { Guardian } from "@/lib/brand";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { WaitlistForm } from "@/components/brand/WaitlistForm";
import { ArrowLeft, Bell } from "lucide-react";
import * as Icons from "lucide-react";

interface ComingSoonLayoutProps {
  guardian: Guardian;
  highlights: string[];
}

export function ComingSoonLayout({ guardian, highlights }: ComingSoonLayoutProps) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[
    guardian.icon
  ];

  return (
    <main className="min-h-screen bg-[color:var(--surface-dark)] text-white flex flex-col">
      <SpokeNav variant="dark" />

      <section className="flex-1 relative overflow-hidden">
        {/* Glow accents */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: guardian.color }}
          aria-hidden
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: guardian.color }}
          aria-hidden
        />

        <Container className="relative py-20 md:py-28">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Guardian Family
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              {Icon && (
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${guardian.color}20`,
                    color: guardian.color,
                  }}
                >
                  <Icon size={32} />
                </div>
              )}
              <Badge variant="soon">Coming Soon</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-6">
              {guardian.name}
            </h1>
            <p
              className="text-2xl md:text-3xl font-medium mb-8"
              style={{ color: guardian.color }}
            >
              {guardian.tagline}
            </p>
            <p className="text-lg text-neutral-300 leading-relaxed mb-12 max-w-2xl">
              {guardian.description}
            </p>

            {/* Highlights */}
            <div className="mb-12">
              <div className="text-xs uppercase tracking-widest font-bold text-neutral-500 mb-4">
                What {guardian.shortName} Guardian Will Do
              </div>
              <ul className="space-y-3">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-neutral-300"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0"
                      style={{ background: guardian.color }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Waitlist */}
            <div
              id="notify"
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10"
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${guardian.color}20`,
                    color: guardian.color,
                  }}
                >
                  <Bell size={18} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    Be first when {guardian.shortName} Guardian launches
                  </h2>
                  <p className="text-sm text-neutral-400">
                    One email when it goes live. No spam, no fluff.
                  </p>
                </div>
              </div>
              <WaitlistForm guardian={guardian.id} />
            </div>

            {/* Rate Guardian cross-sell */}
            <div className="mt-10 pt-10 border-t border-white/10">
              <p className="text-sm text-neutral-500 mb-3">
                While you wait — Rate Guardian is live right now.
              </p>
              <Link
                href="/rate-guardian/ask-rosie"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-[color:var(--brand-navy)] font-semibold text-sm hover:bg-neutral-100 transition-colors"
              >
                Check My Mortgage Rate — Free
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
