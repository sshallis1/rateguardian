"use client";

import { Star } from "lucide-react";

// Replace these with real Google reviews — keep them short and punchy
const TESTIMONIALS = [
  {
    text: "Sean made the entire process seamless. Knowing Rosie is watching my rate gives me peace of mind.",
    name: "Dr. Sarah K.",
    detail: "Cardiologist, NJ",
  },
  {
    text: "I had no idea I was overpaying until Sean ran the numbers. Saved $312/month within two weeks.",
    name: "Dr. Michael R.",
    detail: "Orthopedic Surgeon, NY",
  },
  {
    text: "Best mortgage experience I've ever had. Sean understands physician finances in a way no other lender does.",
    name: "Dr. Priya L.",
    detail: "Dermatologist, CT",
  },
  {
    text: "The Rate Guardian system is brilliant. I get alerts without having to think about it.",
    name: "Dr. James T.",
    detail: "Emergency Medicine, PA",
  },
  {
    text: "Sean helped us close on our dream home with $0 down. His physician loan expertise is unmatched.",
    name: "Dr. Amanda W.",
    detail: "Pediatrician, NJ",
  },
  {
    text: "I refinanced at exactly the right time thanks to Rosie. Saved over $200K over the life of the loan.",
    name: "Dr. David H.",
    detail: "Anesthesiologist, MA",
  },
  {
    text: "Finally, someone who speaks both medicine and finance. Sean is a true strategic partner.",
    name: "Dr. Lisa C.",
    detail: "OB/GYN, NY",
  },
  {
    text: "I've referred three colleagues to Sean. Every one of them thanked me within a month.",
    name: "Dr. Robert M.",
    detail: "Internal Medicine, NJ",
  },
];

export function TestimonialStreamer() {
  // Double the array for seamless infinite scroll
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative overflow-hidden border-t border-white/10 py-8 bg-[#001a3a]">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#001a3a] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#001a3a] to-transparent z-10" />

      <p className="text-center text-xs text-blue-200/30 uppercase tracking-widest mb-5">
        What Physicians Are Saying
      </p>

      {/* Scrolling track */}
      <div className="flex animate-scroll-left gap-4 w-max">
        {doubled.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="flex-shrink-0 w-[320px] rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors"
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star
                  key={si}
                  size={13}
                  className="fill-[#D71E28] text-[#D71E28]"
                />
              ))}
            </div>
            <p className="text-sm text-blue-100/80 leading-relaxed mb-3">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="text-xs">
              <span className="font-semibold text-white">{t.name}</span>
              <span className="text-blue-200/40 ml-1">&middot; {t.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
