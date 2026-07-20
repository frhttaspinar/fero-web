import type Lenis from "lenis";

// Set by SmoothScrollProvider once Lenis initializes, so any component can
// trigger a smooth programmatic scroll without fighting Lenis's own rAF loop.
export const lenisStore: { instance: Lenis | null } = { instance: null };

export function smoothScrollTo(target: string | HTMLElement) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;

  if (lenisStore.instance) {
    lenisStore.instance.scrollTo(el as HTMLElement);
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
