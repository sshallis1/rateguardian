import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--brand-teal)] text-white hover:bg-[color:var(--brand-teal-dark)] focus-visible:ring-[color:var(--brand-teal)] shadow-md hover:shadow-lg",
        gold:
          "bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] hover:bg-[color:var(--brand-gold-light)] focus-visible:ring-[color:var(--brand-gold)] shadow-md hover:shadow-lg",
        outline:
          "border-2 border-[color:var(--brand-teal)] text-[color:var(--brand-teal)] bg-transparent hover:bg-[color:var(--brand-teal)] hover:text-white",
        ghost:
          "text-[color:var(--text-primary)] hover:bg-neutral-100",
        dark:
          "bg-[color:var(--surface-dark-card)] text-white border border-[color:var(--surface-dark-border)] hover:bg-[color:var(--surface-dark-hover)]",
        link:
          "text-[color:var(--brand-teal)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
