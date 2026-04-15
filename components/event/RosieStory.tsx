"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  {
    image: "/rosie/rosie-rescued.jpg",
    title: "When we rescued Rosie...",
    body: "She was exhausted, uncertain, and needed protection. We welcomed her into our family and gave her a safe place to heal and grow.",
    cta: null,
    bgColor: "#f0ebe3",
  },
  {
    image: "/rosie/rosie-flock.jpg",
    title: "She found her purpose.",
    body: "Every morning, Rosie circles the property — checking on every chicken, duck, and goat. Not because we asked her to, but because it's who she became.",
    cta: null,
    bgColor: "#e8efe3",
  },
  {
    image: "/rosie/rate-guardian-logo.png",
    title: "Now she protects your mortgage.",
    body: "Just like Rosie guards our family, we guard yours — watching rates, spotting opportunities, and making sure you never overpay.",
    cta: "Meet Rosie",
    bgColor: "#f5f0e8",
  },
];

export function RosieStory() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // Auto-advance every 5 seconds
  React.useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = SLIDES[active];

  return (
    <section className="py-12 bg-[#002855]">
      <div className="max-w-md mx-auto px-5">
        <div
          className="rounded-3xl overflow-hidden bg-white shadow-2xl shadow-black/30"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* Image */}
          <div
            className="relative w-full aspect-[4/3] overflow-hidden transition-colors duration-700"
            style={{ backgroundColor: SLIDES[active].bgColor }}
          >
            {SLIDES.map((s, i) => (
              <div
                key={s.title}
                className="absolute inset-0 transition-opacity duration-700 flex items-center justify-center"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className={
                    s.image.endsWith(".png")
                      ? "object-contain p-6"
                      : "object-cover"
                  }
                  sizes="(max-width: 448px) 100vw, 448px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 pt-5 px-6">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: i === active ? "4rem" : "2rem",
                  backgroundColor:
                    i === active
                      ? "#c8a550"
                      : "rgba(0, 40, 85, 0.15)",
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Text */}
          <div className="px-6 pt-4 pb-6">
            <h3 className="text-2xl font-bold text-[#002855] mb-3 leading-tight min-h-[3.5rem]">
              {slide.title}
            </h3>
            <p className="text-[#002855]/60 leading-relaxed mb-5 min-h-[4.5rem]">
              {slide.body}
            </p>

            {/* CTA button — always visible but changes */}
            <button
              onClick={() => {
                if (active < SLIDES.length - 1) {
                  setActive(active + 1);
                } else {
                  // Scroll down to funnel
                  document
                    .getElementById("accom-funnel")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold py-3.5 transition-all"
              style={{
                backgroundColor:
                  active === SLIDES.length - 1 ? "#c8a550" : "#e8e0d0",
                color: active === SLIDES.length - 1 ? "#002855" : "#002855",
              }}
            >
              {slide.cta || "Continue"}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
