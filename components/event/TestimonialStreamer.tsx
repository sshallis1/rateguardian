"use client";

import { Star } from "lucide-react";

// Real Google reviews — 4.9 stars, 31 reviews on Google
const TESTIMONIALS = [
  {
    text: "Sean was referred to us and we are so glad we had the chance to work with him! He was available via text, email, and phone from start to finish and was one of the most responsive professionals we've ever worked with.",
    name: "Vic N.",
    detail: "Homebuyer, NJ",
  },
  {
    text: "I cannot recommend Sean Shallis and his team at U.S. Bank highly enough. Sean was an invaluable partner who exceeded every expectation. No matter the time of day or the complexity of the question, he was always incredibly responsive and ready to help.",
    name: "Michael R.",
    detail: "Homebuyer, Brooklyn",
  },
  {
    text: "Sean is amazing!! He is the physician loan expert and has great communication skills and was fantastic to work with!!!",
    name: "Ashley M.",
    detail: "Physician Client",
  },
  {
    text: "Sean is by far the most knowledgeable loan officer I've ever talked with. He made the convoluted process of home loan very smooth and ensured that we got the best deal. Easily available and responsive to our needs. Overall terrific experience.",
    name: "Verified Client",
    detail: "Google Review",
  },
  {
    text: "Sean took a buyer of mine that no other lender could close, and made it happen! He went the extra mile to make sure the buyers were able to purchase their first home.",
    name: "Verified Agent",
    detail: "Real Estate Partner",
  },
  {
    text: "We just closed our house today. It has been an amazing experience working with Sean. The process was long and challenging, but he made us feel at ease every step of the way. Whenever there was a challenge, he had solutions.",
    name: "Verified Client",
    detail: "Google Review",
  },
  {
    text: "Our experience with Sean and his team was amazing! Right from the start he was on top of his game. Everything was smooth and easy. By far the best home buying experience!!",
    name: "Verified Client",
    detail: "Google Review",
  },
  {
    text: "Sean closed a loan in 21 days for a difficult second home property, had great resources, was communicative, a consummate professional, and appeared to work at any hour when needed.",
    name: "Verified Client",
    detail: "Google Review",
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
