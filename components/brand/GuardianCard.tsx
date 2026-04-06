import Link from "next/link";
import type { Guardian } from "@/lib/brand";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GuardianCardProps {
  guardian: Guardian;
  variant?: "spotlight" | "card";
}

export function GuardianCard({ guardian, variant = "card" }: GuardianCardProps) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[
    guardian.icon
  ];
  const isLive = guardian.status === "live";

  if (variant === "spotlight") {
    return (
      <div
        className="relative overflow-hidden rounded-3xl bg-[color:var(--surface-dark-card)] border border-[color:var(--surface-dark-border)] p-8 md:p-12"
        style={{
          borderLeftWidth: 6,
          borderLeftColor: guardian.color,
        }}
      >
        {/* Glow accent */}
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: guardian.color }}
          aria-hidden
        />

        <div className="relative">
          <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              {Icon && (
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${guardian.color}20`,
                    color: guardian.color,
                  }}
                >
                  <Icon size={28} />
                </div>
              )}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {guardian.name}
                </h3>
                <p
                  className="text-sm font-medium mt-1"
                  style={{ color: guardian.color }}
                >
                  {guardian.tagline}
                </p>
              </div>
            </div>
            {isLive && <Badge variant="live">Live</Badge>}
            {guardian.status === "soon" && <Badge variant="soon">Coming Soon</Badge>}
            {guardian.status === "future" && (
              <Badge variant="future">On the Roadmap</Badge>
            )}
          </div>

          <p className="text-neutral-300 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
            {guardian.description}
          </p>

          <div className="flex flex-wrap gap-3">
            {isLive ? (
              <>
                <Link
                  href={`${guardian.href}/ask-rosie`}
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full font-semibold text-sm transition-all shadow-lg hover:shadow-xl"
                  style={{
                    background: guardian.color,
                    color: "#fff",
                  }}
                >
                  Check My Rate — Free
                  <Icons.ArrowRight size={16} />
                </Link>
                <Link
                  href={guardian.href}
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full font-semibold text-sm border border-white/20 text-white hover:bg-white/5 transition-all"
                >
                  How It Works
                </Link>
              </>
            ) : (
              <Link
                href={`${guardian.href}#notify`}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full font-semibold text-sm border border-white/20 text-white hover:bg-white/5 transition-all"
              >
                Get Notified at Launch
                <Icons.Bell size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Card variant
  return (
    <Link
      href={isLive ? guardian.href : `${guardian.href}#notify`}
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-6 transition-all",
        "bg-[color:var(--surface-dark-card)] border-[color:var(--surface-dark-border)] hover:border-white/20",
        "hover:-translate-y-1 hover:shadow-2xl",
        !isLive && "opacity-80"
      )}
      style={{
        borderTopColor: guardian.color,
        borderTopWidth: 3,
      }}
    >
      {Icon && (
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{
            background: `${guardian.color}20`,
            color: guardian.color,
          }}
        >
          <Icon size={24} />
        </div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xl font-bold text-white">{guardian.name}</h3>
        {isLive && (
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: guardian.color }}
          />
        )}
      </div>
      <p className="text-sm font-medium mb-3" style={{ color: guardian.color }}>
        {guardian.tagline}
      </p>
      <p className="text-sm text-neutral-400 leading-relaxed mb-4">
        {guardian.description}
      </p>
      <div className="flex items-center justify-between">
        {isLive && <Badge variant="live">Live</Badge>}
        {guardian.status === "soon" && <Badge variant="soon">Soon</Badge>}
        {guardian.status === "future" && <Badge variant="future">Future</Badge>}
        <Icons.ArrowRight
          size={16}
          className="text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all"
        />
      </div>
    </Link>
  );
}
