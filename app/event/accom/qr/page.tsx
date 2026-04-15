import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ACCOM QR Codes — Download",
  description: "QR codes for ACCOM conference materials",
};

const QR_CODES = [
  {
    file: "/qr/accom-scan.png",
    label: "Main Booth QR (Simple Scan)",
    url: "shallis-site.vercel.app/event/accom/scan",
    usage: "Print cards, signage, table display",
    primary: true,
  },
  {
    file: "/qr/accom-full.png",
    label: "Full Experience",
    url: "shallis-site.vercel.app/event/accom",
    usage: "For engaged prospects who want the full Rosie story",
    primary: false,
  },
  {
    file: "/qr/booking.png",
    label: "Book Strategy Call",
    url: "link.seanshallis.com/widget/bookings/usb_20m",
    usage: "Direct booking — pitch book, follow-up materials",
    primary: false,
  },
  {
    file: "/qr/ask-rosie.png",
    label: "Ask Rosie Chat",
    url: "shallis-site.vercel.app/rate-guardian/ask-rosie",
    usage: "Chat with Rosie — resource page, collateral",
    primary: false,
  },
];

export default function QRPage() {
  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#002855] mb-2">
          ACCOM Conference — QR Codes
        </h1>
        <p className="text-sm text-neutral-500 mb-8">
          Right-click any QR code → Save Image As to download. All codes include
          UTM tracking (source=accom, medium=qr, campaign=booth).
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {QR_CODES.map((qr) => (
            <div
              key={qr.file}
              className={`rounded-2xl border-2 p-6 ${
                qr.primary
                  ? "border-[#002855] bg-[#002855]/[0.02]"
                  : "border-neutral-200"
              }`}
            >
              {qr.primary && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#D71E28] mb-3">
                  Primary — Use on Cards
                </span>
              )}
              <div className="flex items-start gap-4">
                <Image
                  src={qr.file}
                  alt={qr.label}
                  width={160}
                  height={160}
                  className="rounded-lg border border-neutral-100"
                />
                <div>
                  <h3 className="font-bold text-[#002855] mb-1">{qr.label}</h3>
                  <p className="text-xs text-neutral-500 mb-2 break-all">
                    {qr.url}
                  </p>
                  <p className="text-xs text-neutral-400">{qr.usage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Domain note:</strong> These QR codes currently point to{" "}
            <code className="text-xs">shallis-site.vercel.app</code>. Once you
            wire <strong>myrateguardian.com</strong> in Vercel + GoDaddy, regenerate
            the main booth QR to point to <code className="text-xs">myrateguardian.com</code>.
          </p>
        </div>
      </div>
    </main>
  );
}
