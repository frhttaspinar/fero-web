"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Renders `children` twice: a solid vivid gradient base layer, and a second
 * layer clipped to the same glyphs with a bright streak that sweeps
 * continuously left-to-right. The sweep is a plain CSS keyframe animation
 * (see `animate-shine` in globals.css) rather than a JS-driven tween — a
 * background-position loop like this is compositor-friendly and guaranteed
 * to keep running smoothly regardless of React render churn elsewhere.
 */
export function ShineText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(99,102,241,0.25)]">
        {children}
      </span>
      {!reducedMotion && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-clip-text text-transparent [background-size:200%_auto] animate-shine"
          style={{
            backgroundImage:
              "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.85) 50%, transparent 60%)",
          }}
        >
          {children}
        </span>
      )}
    </span>
  );
}
