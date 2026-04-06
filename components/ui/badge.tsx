import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-neutral-100 text-neutral-800",
        live: "bg-[color:var(--status-success)]/15 text-[color:var(--status-success)] border border-[color:var(--status-success)]/30",
        soon: "bg-[color:var(--status-warning)]/15 text-[color:var(--status-warning)] border border-[color:var(--status-warning)]/30",
        future: "bg-neutral-200 text-neutral-500 border border-neutral-300",
        teal: "bg-[color:var(--brand-teal)]/10 text-[color:var(--brand-teal)] border border-[color:var(--brand-teal)]/20",
        gold: "bg-[color:var(--brand-gold)]/15 text-[color:var(--brand-navy)] border border-[color:var(--brand-gold)]/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
