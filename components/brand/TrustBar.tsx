import { BRAND } from "@/lib/brand";

interface TrustBarProps {
  variant?: "light" | "dark";
}

export function TrustBar({ variant = "light" }: TrustBarProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={
        isDark
          ? "bg-[color:var(--surface-dark-card)] border-y border-white/5"
          : "bg-white border-y border-neutral-200"
      }
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8 py-8">
        <p
          className={
            "text-center text-[11px] uppercase tracking-[0.2em] font-semibold mb-5 " +
            (isDark ? "text-neutral-500" : "text-neutral-500")
          }
        >
          As Featured In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {BRAND.mediaLogos.map((logo) => (
            <span
              key={logo}
              className={
                "font-serif italic text-lg md:text-xl whitespace-nowrap " +
                (isDark ? "text-neutral-400" : "text-neutral-400")
              }
            >
              {logo}
            </span>
          ))}
        </div>
        <div
          className={
            "mt-6 flex flex-wrap items-center justify-center gap-6 md:gap-10 pt-6 border-t text-center " +
            (isDark ? "border-white/10" : "border-neutral-100")
          }
        >
          <Stat
            value={BRAND.stats.years}
            label="Years Expertise"
            dark={isDark}
          />
          <Divider dark={isDark} />
          <Stat
            value={BRAND.stats.transactions}
            label="Transactions Guided"
            dark={isDark}
          />
          <Divider dark={isDark} />
          <Stat
            value={BRAND.stats.families}
            label="Families Served"
            dark={isDark}
          />
          <Divider dark={isDark} />
          <Stat
            value={BRAND.stats.book}
            label="Amazon Bestseller"
            dark={isDark}
          />
        </div>
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  dark,
}: {
  value: string;
  label: string;
  dark: boolean;
}) {
  return (
    <div className="text-center">
      <div
        className={
          "font-mono font-bold text-2xl md:text-3xl " +
          (dark ? "text-white" : "text-[color:var(--brand-navy)]")
        }
      >
        {value}
      </div>
      <div
        className={
          "text-[10px] uppercase tracking-widest font-medium mt-1 " +
          (dark ? "text-neutral-500" : "text-neutral-500")
        }
      >
        {label}
      </div>
    </div>
  );
}

function Divider({ dark }: { dark: boolean }) {
  return (
    <div
      className={
        "hidden md:block h-8 w-px " +
        (dark ? "bg-white/10" : "bg-neutral-200")
      }
      aria-hidden
    />
  );
}
