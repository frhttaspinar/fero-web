"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

type Star = {
  top: number; // %
  left: number; // %
  length: number; // px
  duration: number; // s — full cycle (travel is the first ~15% of this)
  delay: number; // s, negative to desync the loop
  color: string; // "r,g,b"
};

const COLORS = [
  "96,165,250", // soft blue
  "167,139,250", // lilac
  "253,186,116", // pale orange
];

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    top: Math.random() * 55,
    left: 40 + Math.random() * 60,
    length: 90 + Math.random() * 70,
    duration: 3.5 + Math.random() * 2.5,
    delay: -Math.random() * 6,
    color: COLORS[i % COLORS.length],
  }));
}

/**
 * Fast diagonal streaks (top-right → bottom-left) with a fading tail,
 * crossing the frame in well under a second, then going quiet for a random
 * few seconds before the next one — pure CSS keyframes (see globals.css),
 * so any number of these cost nothing beyond compositor work.
 *
 * Randomized per instance, so — like Particles before it — this must only
 * ever be loaded via `next/dynamic(..., { ssr: false })` from its parent.
 */
export default function ShootingStars({ count = 7 }: { count?: number }) {
  const reducedMotion = useReducedMotion();
  const stars = useMemo(() => generateStars(count), [count]);

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="shooting-star"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              height: s.length,
              background: `linear-gradient(to bottom, rgba(${s.color},0) 0%, rgba(${s.color},0.9) 75%, rgba(255,255,255,0.95) 100%)`,
              boxShadow: `0 0 8px rgba(${s.color},0.6)`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
              "--tx": "-360px",
              "--ty": "360px",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
