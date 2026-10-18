"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "./scroll";

/**
 * Page-wide scroll effects driven by data attributes on server-rendered markup:
 *   data-reveal="up|left|right"  fade/slide in when scrolled into view
 *   data-tilt="<deg>"            subtle 3D tilt that follows scroll position
 *   data-bar="<percent>"         bar grows to its width when scrolled into view
 * Content is fully present in the HTML; this only animates it.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const reduced = prefersReducedMotion();

    const bars = Array.from(document.querySelectorAll<HTMLElement>("[data-bar]"));
    if (reduced) {
      bars.forEach((el) => (el.style.width = el.dataset.bar + "%"));
      return;
    }

    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let pending = reveals.map((el) => {
      const dir = el.dataset.reveal;
      const from =
        dir === "left" ? "translate3d(-36px,0,0)" : dir === "right" ? "translate3d(36px,0,0)" : "translate3d(0,42px,0)";
      el.style.opacity = "0";
      if (el.hasAttribute("data-tilt")) {
        el.style.transition = "opacity 1s cubic-bezier(0.16,1,0.3,1)";
      } else {
        el.style.transform = from;
        el.style.transition =
          "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)";
      }
      const sibs = Array.from(el.parentElement?.children ?? []).filter((n) => n.hasAttribute("data-reveal"));
      return { el, delay: Math.min(Math.max(0, sibs.indexOf(el)) * 90, 450) };
    });
    let pendingBars = bars;
    const tilts = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]")).map((el) => ({
      el,
      amt: Number(el.dataset.tilt) || 0,
    }));

    let raf = 0;
    const tick = () => {
      const vh = window.innerHeight;
      if (pending.length) {
        pending = pending.filter(({ el, delay }) => {
          const r = el.getBoundingClientRect();
          if (r.top > vh * 0.9 || r.bottom < 0) return true;
          el.style.transitionDelay = delay + "ms";
          el.style.opacity = "1";
          if (!el.hasAttribute("data-tilt")) el.style.transform = "none";
          return false;
        });
      }
      if (pendingBars.length) {
        pendingBars = pendingBars.filter((el) => {
          const r = el.getBoundingClientRect();
          if (r.top > vh * 0.92 || r.bottom < 0) return true;
          el.style.width = el.dataset.bar + "%";
          return false;
        });
      }
      for (const { el, amt } of tilts) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const center = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translate3d(0,${(center * -14).toFixed(1)}px,0) rotateX(${(-center * 9).toFixed(2)}deg) rotateY(${amt}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
