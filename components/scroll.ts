// Scroll helpers shared by the animated sections.

/** 0 → 1 progress of a tall (sticky) section as it scrolls past the viewport. */
export function progressOf(section: Element | null): number | null {
  if (!section) return null;
  const r = section.getBoundingClientRect();
  const span = r.height - window.innerHeight;
  if (span <= 0) return 0;
  return Math.max(0, Math.min(1, -r.top / span));
}

export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
export const smoothstep = (t: number) => t * t * (3 - 2 * t);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
