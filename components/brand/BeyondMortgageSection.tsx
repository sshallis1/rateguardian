"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, Download, Headphones, Play, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TenXFormulaModal } from "./TenXFormulaModal";

const AMERICAN_DREAM_VIDEO_ID = "-lFy8Cz74GI";
const PERSONAL_DEV_VIDEO_ID = "fjAScpP2QWs";
const TENX_RE_PODCAST =
  "https://podcasts.apple.com/us/podcast/10x-real-estate-marketing-coaching/id1537824014";

export function BeyondMortgageSection() {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <section className="py-20 md:py-28 bg-[color:var(--brand-cream)]">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[color:var(--brand-gold)] uppercase tracking-widest text-xs font-bold mb-3">
            Beyond the Mortgage
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Wealth, Growth &amp; the Long Game
          </h2>
          <p className="text-lg text-neutral-600">
            A mortgage is just the start. Here&apos;s how Sean helps clients &mdash;
            and the agents and investors who serve them &mdash; build real wealth and
            a life worth financing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <VideoCard
            eyebrow="Build Wealth in Real Estate"
            title="The American Dream — Owning Real Estate"
            description="Why homeownership and real estate remain the most reliable path to multi-generational wealth — and how today's buyers can still win."
            videoId={AMERICAN_DREAM_VIDEO_ID}
            primaryHref={`https://youtu.be/${AMERICAN_DREAM_VIDEO_ID}`}
            primaryLabel="Watch the Presentation"
            secondary={{
              icon: Headphones,
              label: "For Agents & Investors: 10X Real Estate Marketing & Coaching Podcast",
              href: TENX_RE_PODCAST,
            }}
          />

          <VideoCard
            eyebrow="Personal Development"
            title="The 10X Personal Success Formula™"
            description="The mindset, daily practice, and leverage system Sean has used with physicians, agents, and investors to compound wealth, health, and purpose."
            videoId={PERSONAL_DEV_VIDEO_ID}
            primaryHref={`https://youtu.be/${PERSONAL_DEV_VIDEO_ID}`}
            primaryLabel="Watch the Talk"
            accent="gold"
            cta={{
              icon: Download,
              label: "Download the 10X Formula — Free",
              onClick: () => setModalOpen(true),
            }}
          />
        </div>
      </Container>

      <TenXFormulaModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

interface VideoCardProps {
  eyebrow: string;
  title: string;
  description: string;
  videoId: string;
  primaryHref: string;
  primaryLabel: string;
  accent?: "teal" | "gold";
  secondary?: {
    icon: React.ElementType;
    label: string;
    href: string;
  };
  cta?: {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
  };
}

function VideoCard({
  eyebrow,
  title,
  description,
  videoId,
  primaryHref,
  primaryLabel,
  accent = "teal",
  secondary,
  cta,
}: VideoCardProps) {
  const accentColor = accent === "gold" ? "var(--brand-gold)" : "var(--brand-teal)";
  const Icon = accent === "gold" ? Sparkles : Play;

  return (
    <div className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
      <a
        href={primaryHref}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-video block overflow-hidden bg-neutral-900"
        aria-label={primaryLabel}
      >
        <Image
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"
          style={{ background: accentColor }}
        >
          <Icon size={24} className="text-white ml-0.5" fill="currentColor" />
        </div>
      </a>

      <div className="flex-1 flex flex-col p-7">
        <div
          className="uppercase tracking-widest text-xs font-bold mb-2"
          style={{ color: accentColor }}
        >
          {eyebrow}
        </div>
        <h3 className="text-2xl font-bold leading-tight mb-3">{title}</h3>
        <p className="text-neutral-600 leading-relaxed mb-5 flex-1">{description}</p>

        <div className="space-y-3">
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-sm hover:underline"
            style={{ color: accentColor }}
          >
            {primaryLabel}
            <ArrowRight size={14} />
          </a>

          {secondary && (
            <a
              href={secondary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
            >
              <secondary.icon
                size={18}
                className="flex-shrink-0 mt-0.5"
                style={{ color: accentColor }}
              />
              <span className="text-sm text-neutral-700 leading-snug">{secondary.label}</span>
              <ArrowRight size={14} className="flex-shrink-0 mt-1 text-neutral-400" />
            </a>
          )}

          {cta && (
            <button
              type="button"
              onClick={cta.onClick}
              className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-full font-semibold text-sm text-[color:var(--brand-navy)] transition-colors hover:opacity-90"
              style={{ background: accentColor }}
            >
              <cta.icon size={16} />
              {cta.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
