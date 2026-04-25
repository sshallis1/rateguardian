"use client";

import { TrendingDown, Users, ArrowRight } from "lucide-react";

type CardType = "savings_stat" | "social_proof" | "arm_comparison";

interface ValueInjectionProps {
  type: CardType;
}

const CARDS: Record<CardType, { icon: React.ReactNode; title: string; body: string; cta?: string }> = {
  savings_stat: {
    icon: <TrendingDown size={16} className="text-emerald-600" />,
    title: "Did you know?",
    body: "The average homeowner overpays $47,000+ in interest over their loan. Rosie catches rate drops most people miss.",
  },
  social_proof: {
    icon: <Users size={16} className="text-[color:var(--brand-teal)]" />,
    title: "You're not alone",
    body: "Hundreds of families trust Rosie to watch their rate. Most don't even know they're overpaying until she flags it.",
  },
  arm_comparison: {
    icon: <ArrowRight size={16} className="text-amber-600" />,
    title: "ARM vs Fixed — the hidden math",
    body: "A 5/1 ARM can save $200-500/mo in year one. But without monitoring, you risk rate shock at adjustment. Rosie watches both.",
    cta: "Ask me about ARM strategies",
  },
};

export function ValueInjection({ type }: ValueInjectionProps) {
  const card = CARDS[type];

  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-[color:var(--brand-teal)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        R
      </div>
      <div className="rounded-2xl rounded-tl-sm border border-neutral-200 bg-neutral-50 px-4 py-3 shadow-sm max-w-[85%]">
        <div className="flex items-center gap-2 mb-1">
          {card.icon}
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            {card.title}
          </span>
        </div>
        <p className="text-sm text-neutral-700 leading-relaxed">{card.body}</p>
        {card.cta && (
          <p className="text-xs text-[color:var(--brand-teal)] font-medium mt-2">
            {card.cta}
          </p>
        )}
      </div>
    </div>
  );
}

export function getValueInjectionType(
  messageCount: number,
  signals: string[]
): CardType | null {
  // Show savings stat after 2 messages
  if (messageCount === 2) return "savings_stat";
  // Show social proof after 5 messages
  if (messageCount === 5) return "social_proof";
  // Show ARM comparison when rate/comparison signals detected
  if (
    messageCount >= 3 &&
    (signals.includes("rate_mention") || signals.includes("comparison_shopping"))
  )
    return "arm_comparison";
  return null;
}
