"use client";

import { useRef } from "react";
import { type MotionValue, useMotionValueEvent } from "framer-motion";

/**
 * The hero's full-bleed backdrop, scrubbed by scroll (Apple product-page
 * style). The video is NOT autoplayed — the parent section pins this to the
 * viewport across a tall scroll track and hands down its 0…1 `scrollYProgress`.
 * That progress is mapped straight onto the clip's timeline (0 → duration; the
 * cinematic clip is exactly 10s, so 0…1 ⇄ 0…10s), so scrolling down winds the
 * shot forward and scrolling back up rewinds it.
 *
 * Performance: the seek is driven off the MotionValue via useMotionValueEvent,
 * writing currentTime on the <video> ref directly — no React state, no
 * re-render per scroll frame. The source clip is exported All-Intra (keyint=1)
 * so every frame is a keyframe, which is what keeps arbitrary seeking smooth.
 */
export function HeroSignatureVideo({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    if (!video) return;

    const { duration } = video;
    if (!duration || !Number.isFinite(duration)) return;

    // Clamp — scroll offsets can momentarily overshoot 0…1 at the extremes.
    const progress = latest < 0 ? 0 : latest > 1 ? 1 : latest;
    const target = progress * duration;

    // Only seek on a meaningful delta so we don't hammer the decoder in place.
    if (Math.abs(video.currentTime - target) > 0.001) {
      video.currentTime = target;
    }
  });

  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero-cinematic.mp4" type="video/mp4" />
      </video>

      {/* Bottom fade into the paper page below, so the cinematic hero eases
          into the light gallery section rather than cutting hard. The dark
          contrast overlay for text legibility lives in AnimatedShaderHero,
          directly beneath the copy. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
