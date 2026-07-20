"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Looping ambient background video, sitting beneath the mesh-gradient blobs
 * at low opacity — texture, not a subject. Scale and opacity are tied to how
 * far the section itself has scrolled past (not a timer), so it reads as a
 * slow parallax zoom rather than a plain autoplaying clip.
 */
export function AmbientVideoBackground({
  crop = false,
}: {
  /** Overscales + shifts the frame to crop out the source clip's sparkle
   *  mark in its bottom-right corner — needed on any second placement where
   *  a second copy of the same mark reads as an unintentional watermark. */
  crop?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [0.4, 0.32, 0]);

  if (reducedMotion) return null;

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        style={{ scale, opacity }}
        className={
          crop
            ? "absolute -top-[5%] -left-[5%] h-[135%] w-[135%] object-cover"
            : "h-full w-full object-cover"
        }
      >
        <source src="/hero-ambient.mp4" type="video/mp4" />
      </motion.video>
    </div>
  );
}
