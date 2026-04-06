"use client";

import * as React from "react";
import { GUARDIANS } from "@/lib/brand";

/**
 * Simplified gear visualization for the hero.
 * Central big gear = Rosie/Sean. Orbiting small gears = Guardian spokes.
 * Pure SVG, no external deps.
 */
export function GearVisualization({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-auto"
        aria-label="Guardian Family gear system"
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0e6b6d" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0e6b6d" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="centerGear" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14a8ab" />
            <stop offset="100%" stopColor="#0a4f51" />
          </linearGradient>
        </defs>

        {/* Background glow */}
        <circle cx="250" cy="250" r="240" fill="url(#centerGlow)" />

        {/* Orbit ring */}
        <circle
          cx="250"
          cy="250"
          r="160"
          fill="none"
          stroke="#0e6b6d"
          strokeWidth="1"
          strokeDasharray="2 6"
          opacity="0.3"
        />

        {/* Central gear (Rosie) */}
        <g className="animate-slow-spin" style={{ transformOrigin: "250px 250px" }}>
          <GearPath cx={250} cy={250} outer={90} inner={72} teeth={12} fill="url(#centerGear)" />
          <circle cx="250" cy="250" r="34" fill="#0a4f51" />
          <text
            x="250"
            y="258"
            textAnchor="middle"
            fill="#fff"
            fontSize="22"
            fontWeight="700"
            fontFamily="var(--font-geist-sans)"
            letterSpacing="-0.02em"
          >
            ROSIE
          </text>
        </g>

        {/* Guardian spoke gears */}
        {GUARDIANS.map((g, i) => {
          const angle = (i / GUARDIANS.length) * Math.PI * 2 - Math.PI / 2;
          const cx = 250 + Math.cos(angle) * 170;
          const cy = 250 + Math.sin(angle) * 170;
          const isLive = g.status === "live";
          return (
            <g
              key={g.id}
              opacity={isLive ? 1 : g.status === "soon" ? 0.55 : 0.3}
            >
              <g
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                }}
                className={isLive ? "animate-slow-spin" : ""}
              >
                <GearPath
                  cx={cx}
                  cy={cy}
                  outer={38}
                  inner={28}
                  teeth={10}
                  fill={g.color}
                />
              </g>
              <circle cx={cx} cy={cy} r="14" fill="#09090b" />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fill="#fff"
                fontSize="10"
                fontWeight="700"
                fontFamily="var(--font-geist-sans)"
                letterSpacing="0.05em"
              >
                {g.shortName.toUpperCase()}
              </text>
              {/* Status dot */}
              {isLive && (
                <circle
                  cx={cx + 28}
                  cy={cy - 28}
                  r="5"
                  fill="#22c55e"
                  className="animate-pulse-soft"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function GearPath({
  cx,
  cy,
  outer,
  inner,
  teeth,
  fill,
}: {
  cx: number;
  cy: number;
  outer: number;
  inner: number;
  teeth: number;
  fill: string;
}) {
  const points: [number, number][] = [];
  const total = teeth * 2;
  for (let i = 0; i < total; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (i / total) * Math.PI * 2;
    points.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
  }
  const path =
    "M " +
    points.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" L ") +
    " Z";
  return <path d={path} fill={fill} />;
}
