// Plain mutable store shared between GSAP ScrollTrigger (DOM-driven) and the
// R3F render loop (rAF-driven). Avoids React re-renders on every scroll tick.
export const scrollState = {
  heroProgress: 0,
};
