"use client";

import Image from "next/image";

/**
 * Printable CTA Cards — 4 cards per 8.5×11 sheet, double-sided
 *
 * PRINT INSTRUCTIONS:
 * 1. Open /event/accom/cards in Chrome
 * 2. Ctrl+P → Print → Save as PDF
 * 3. Set: Letter size, No margins, Background graphics ON
 * 4. Page 1 = Front side (4 cards), Page 2 = Back side (4 cards)
 * 5. Print double-sided on card stock
 * 6. Cut into 4 cards (each 4.25" × 5.5")
 */

const BENEFITS = [
  "Checks your current rate against today's market",
  "Monitors daily — alerts you when savings appear",
  "Serves individuals, practices & health systems",
  "100% free. No credit check. No obligation.",
];

function CardFront() {
  return (
    <div
      className="flex flex-col items-center justify-center p-6 text-center border border-dashed border-neutral-200 relative overflow-hidden"
      style={{
        width: "4.25in",
        height: "5.5in",
        background: "linear-gradient(180deg, #002855 0%, #001a3a 100%)",
        color: "white",
      }}
    >
      {/* USB red bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#D71E28]" />

      {/* Rosie avatar */}
      <div
        className="mb-3 flex items-center justify-center rounded-full"
        style={{
          width: "64px",
          height: "64px",
          background: "linear-gradient(135deg, #14a8ab, #0e6b6d)",
        }}
      >
        <span className="text-white text-2xl font-bold">R</span>
      </div>

      <div className="text-lg font-bold leading-tight mb-1">
        Is Your Mortgage Rate
      </div>
      <div className="text-lg font-bold leading-tight mb-1 text-[#14a8ab]">
        Costing You Money?
      </div>

      <div className="text-xs opacity-60 mb-4">
        Let Rosie the Rate Guardian find out — free.
      </div>

      {/* QR code */}
      <div className="mb-3 rounded-xl overflow-hidden bg-white p-2" style={{ width: "130px", height: "130px" }}>
        <Image
          src="/qr/accom-scan.png"
          alt="Scan to let Rosie check your rate"
          width={114}
          height={114}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="text-[8px] opacity-40 mb-1">myrateguardian.com</div>

      <div className="text-xs font-semibold text-[#14a8ab]">
        SCAN &middot; CHECK &middot; MONITOR
      </div>

      <div className="text-[10px] opacity-40 mt-2">
        100/0 Guarantee — Zero Obligations. Zero Excuses.
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div
      className="flex flex-col justify-between p-5 border border-dashed border-neutral-200"
      style={{
        width: "4.25in",
        height: "5.5in",
        background: "#faf8f4",
        color: "#002855",
      }}
    >
      {/* Top section */}
      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#D71E28] mb-3">
          What Rosie Does For You
        </div>

        <div className="space-y-2">
          {BENEFITS.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-[#14a8ab] text-xs mt-0.5">&#10003;</span>
              <span className="text-xs leading-tight">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-[#e0ddd5]">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#D71E28] mb-2">
            If There&apos;s an Opportunity
          </div>
          <p className="text-xs leading-relaxed opacity-70">
            Rosie will alert you and Sean will offer a free discovery call to
            walk through your options — no pressure, just clarity.
          </p>
        </div>
      </div>

      {/* Bottom section — Sean's info */}
      <div className="pt-3 mt-2 border-t border-[#e0ddd5]">
        <div className="text-sm font-bold">Sean Shallis</div>
        <div className="text-[10px] opacity-60">
          Private Wealth Mortgage Strategist
        </div>
        <div className="text-[10px] opacity-60">
          U.S. Bank &middot; NMLS #2362814
        </div>
        <div className="text-[10px] opacity-60 mt-1">
          (973) 457-2278 &middot; sean.shallis@usbank.com
        </div>
        <div className="mt-2">
          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#002855] text-white">
            PHYSICIAN LENDING SPECIALIST
          </span>
        </div>
      </div>
    </div>
  );
}

export function PrintableCards() {
  return (
    <div className="bg-white">
      {/* Screen-only instructions */}
      <div className="print:hidden bg-neutral-100 p-6 text-center border-b">
        <h1 className="text-lg font-bold mb-2">
          ACCOM CTA Cards — Print Ready
        </h1>
        <p className="text-sm text-neutral-600 mb-3">
          4 cards per page. Page 1 = Front, Page 2 = Back. Print double-sided on
          card stock, then cut.
        </p>
        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-[#002855] text-white rounded-lg font-semibold text-sm hover:bg-[#001a3a]"
        >
          Print / Save as PDF
        </button>
        <p className="text-xs text-neutral-400 mt-2">
          Settings: Letter size, No margins, Background graphics ON
        </p>
      </div>

      {/* PAGE 1: FRONT SIDE (4 cards) */}
      <div
        className="grid grid-cols-2 grid-rows-2 mx-auto print:m-0"
        style={{ width: "8.5in", height: "11in" }}
      >
        <CardFront />
        <CardFront />
        <CardFront />
        <CardFront />
      </div>

      {/* PAGE 2: BACK SIDE (4 cards) */}
      <div
        className="grid grid-cols-2 grid-rows-2 mx-auto print:m-0 break-before-page"
        style={{ width: "8.5in", height: "11in" }}
      >
        <CardBack />
        <CardBack />
        <CardBack />
        <CardBack />
      </div>
    </div>
  );
}
