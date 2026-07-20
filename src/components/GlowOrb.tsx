"use client";

import { motion, useReducedMotion } from "framer-motion";

type GlowOrbProps = {
  className?: string;
  /** "r,g,b" string, e.g. "61,90,254" */
  color?: string;
  size?: number;
  duration?: number;
  delay?: number;
};

export function GlowOrb({
  className = "",
  color = "61,90,254",
  size = 480,
  duration = 9,
  delay = 0,
}: GlowOrbProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[110px] will-change-[opacity,transform] ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(${color},0.4) 0%, rgba(${color},0) 70%)`,
      }}
      initial={{ opacity: 0.5, scale: 1 }}
      animate={
        reducedMotion
          ? { opacity: 0.5, scale: 1 }
          : { opacity: [0.4, 0.75, 0.4], scale: [1, 1.12, 1] }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
