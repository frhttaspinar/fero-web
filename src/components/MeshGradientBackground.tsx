"use client";

import { motion, useReducedMotion } from "framer-motion";

type Blob = {
  className: string;
  color: string; // "r,g,b"
  size: number;
  duration: number;
  delay?: number;
  range: number; // px of drift
};

const BLOBS: Blob[] = [
  { className: "-left-32 -top-32", color: "96,165,250", size: 620, duration: 22, range: 60 },
  { className: "-right-40 top-10", color: "167,139,250", size: 560, duration: 26, delay: 2, range: 70 },
  { className: "bottom-[-160px] left-1/4", color: "253,186,116", size: 520, duration: 24, delay: 4, range: 50 },
  { className: "bottom-[-100px] right-1/5", color: "129,140,248", size: 460, duration: 20, delay: 1, range: 55 },
];

/**
 * Slow-drifting, blurred colour blobs behind hero content — the "Apple /
 * Stripe" light-mode alternative to a dark hero: never static, never a flat
 * white box, but airy rather than moody. Pure Framer Motion transforms
 * (translate + scale), so it stays compositor-cheap even at large blur radii.
 */
export function MeshGradientBackground({ className = "" }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[110px] ${b.className}`}
          style={{
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, rgba(${b.color},0.55) 0%, rgba(${b.color},0) 72%)`,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [0, b.range, -b.range * 0.6, 0],
                  y: [0, -b.range * 0.7, b.range * 0.5, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={{
            duration: b.duration,
            delay: b.delay ?? 0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
