"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { MeshGradientBackground } from "@/components/MeshGradientBackground";

type CommandLine = { text: string; tone?: "success" };

const COMMANDS: CommandLine[] = [
  { text: "npx create-expo-app premium-app" },
  { text: "cd premium-app" },
  { text: "eas build --platform ios --local" },
  { text: "deploying via antigravity-cli...", tone: "success" },
];

// [start, end] of the section's scroll progress over which each line fades
// 0 → 1. Scrolling down reveals them in order; scrolling up rewinds them.
const REVEAL_RANGES: [number, number][] = [
  [0.1, 0.2],
  [0.3, 0.4],
  [0.5, 0.6],
  [0.7, 0.8],
];

// Clamped linear ramp — the same shape as useTransform(p, [a, b], [0, 1]).
// We map on the main thread off a state copy of scrollYProgress rather than
// binding a scroll MotionValue straight to `style`: under Lenis smooth scroll
// framer's scroll-linked style binding trails the real progress, leaving the
// earlier lines stuck part-faded. Reading the value into state keeps every
// line exactly in step with the scrubbed scroll position.
function revealOpacity(progress: number, [start, end]: [number, number]) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

/**
 * A scroll-scrubbed macOS terminal. Nothing plays on its own: the section is a
 * tall (300vh) track with a pinned, sticky viewport, and each command line's
 * opacity is mapped straight onto the section's `scrollYProgress`. Scrolling
 * down types the lines in one by one; scrolling back up erases them in reverse.
 */
export function TerminalReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", setProgress);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-paper">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-8">
        <MeshGradientBackground />

        <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-black/10 bg-[#0c0c10] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-3.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-xs text-white/40">
              premium-app — zsh
            </span>
          </div>

          <div className="min-h-[220px] space-y-2 p-6 font-mono text-sm leading-relaxed sm:text-base">
            {COMMANDS.map((cmd, i) => {
              const isSuccess = cmd.tone === "success";
              return (
                <div
                  key={i}
                  style={{ opacity: revealOpacity(progress, REVEAL_RANGES[i]) }}
                  className="text-white/70"
                >
                  {!isSuccess && <span className="text-emerald-400">~ $</span>}{" "}
                  <span className={isSuccess ? "text-emerald-300" : ""}>
                    {cmd.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
