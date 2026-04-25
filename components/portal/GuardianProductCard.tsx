import Link from "next/link";
import {
  Home,
  Heart,
  TrendingUp,
  Clock,
  Gem,
  Hammer,
  ArrowRight,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Guardian } from "@/lib/brand";
import { Card, CardContent } from "@/components/ui/card";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Home,
  Heart,
  TrendingUp,
  Clock,
  Gem,
  Hammer,
};

interface GuardianProductCardProps {
  guardian: Guardian;
  enrolled?: boolean;
}

export function GuardianProductCard({
  guardian,
  enrolled = false,
}: GuardianProductCardProps) {
  const Icon = ICON_MAP[guardian.icon] ?? Home;
  const isAvailable = guardian.status === "live";

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all",
        isAvailable
          ? "hover:shadow-md hover:border-neutral-300"
          : "opacity-60"
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", `${guardian.borderClass} border bg-white`)}
          >
            <Icon size={20} className={guardian.textClass} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-neutral-900">
                {guardian.name}
              </h3>
              {enrolled && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-[color:var(--brand-teal)] bg-[color:var(--brand-teal)]/10 px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
              {!isAvailable && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-500 mt-1">{guardian.tagline}</p>
            {isAvailable ? (
              <Link
                href={
                  guardian.id === "project"
                    ? "/portal/projects"
                    : guardian.href
                }
                className="inline-flex items-center gap-1 text-sm font-medium mt-3 transition-colors"
                style={{ color: guardian.color }}
              >
                {enrolled ? "Open" : "Get Started"}
                <ArrowRight size={14} />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 text-sm text-neutral-400 mt-3">
                <Lock size={14} />
                Notify me when available
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
