import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-full border border-neutral-300 bg-white px-5 py-2 text-base",
        "placeholder:text-neutral-500",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-teal)] focus-visible:border-[color:var(--brand-teal)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
