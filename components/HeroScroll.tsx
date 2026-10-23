"use client";

import { useEffect, useRef } from "react";
import { easeInOut, prefersReducedMotion, progressOf, smoothstep } from "./scroll";
import styles from "@/app/home.module.css";

const FRAME_COUNT = 100;
const frameSrc = (i: number) => `/home/frames/f${String(i + 1).padStart(3, "0")}.webp`;

/**
 * The scroll-scrubbed hero: a 60-frame image sequence painted on a canvas,
 * with the text slides (children, each marked data-cue="start,end") fading
 * in and out as the section scrolls. The slides are server-rendered.
 */
export default function HeroScroll({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const canvas = canvasRef.current!;
    const reduced = prefersReducedMotion();
    let lastDrawn = -1;

    // First frame first, then the rest, so the hero paints as early as possible.
    const frames: HTMLImageElement[] = [];
    const load = (i: number) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => (lastDrawn = -1);
      img.src = frameSrc(i);
      frames[i] = img;
    };
    load(0);
    frames[0].addEventListener("load", () => { for (let i = 1; i < FRAME_COUNT; i++) load(i); }, { once: true });

    const cues = Array.from(section.querySelectorAll<HTMLElement>("[data-cue]")).map((el) => {
      const [a, b] = el.dataset.cue!.split(",").map(Number);
      el.style.willChange = "opacity, transform";
      return { el, a, b };
    });

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      lastDrawn = -1;
    };

    const drawFrame = (p: number) => {
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1))));
      if (idx === lastDrawn) return;
      const img = frames[idx];
      if (!img || !img.complete || !img.naturalWidth) return;
      const ctx = canvas.getContext("2d")!;
      const cw = canvas.width, ch = canvas.height;
      const zoom = 1.1 - 0.1 * easeInOut(p);
      const nav = document.querySelector("nav");
      const top = nav ? nav.getBoundingClientRect().height * (cw / Math.max(1, canvas.clientWidth)) : 0;
      const ah = ch - top;
      const s = Math.max(cw / img.naturalWidth, ah / img.naturalHeight) * zoom;
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      ctx.fillStyle = "#F4EFE6";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, top + Math.min(0, (ah - dh) * 0.12), dw, dh);
      lastDrawn = idx;
    };

    let raf = 0;
    const tick = () => {
      const hp = progressOf(section) ?? 0;
      drawFrame(hp);
      for (const { el, a, b } of cues) {
        const f = (b - a) * 0.3, mid = (a + b) / 2;
        const fi = a <= 0.001 ? 1 : Math.min(1, Math.max(0, (hp - a) / f));
        const fo = b >= 0.999 ? 1 : Math.min(1, Math.max(0, (b - hp) / f));
        const o = smoothstep(Math.min(fi, fo));
        el.style.opacity = o.toFixed(3);
        el.style.pointerEvents = o > 0.5 ? "auto" : "none";
        if (!reduced) {
          el.style.transform = `translate3d(0,${((hp - mid) * -90).toFixed(1)}px,0)`;
          el.style.filter = `blur(${((1 - o) * 4).toFixed(2)}px)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sizeCanvas);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroStage}>
        <canvas
          ref={canvasRef}
          className={styles.heroCanvas}
          role="img"
          aria-label="A schoolgirl in uniform on her school playground, wearing a red blindfold that she takes off as you scroll"
        />
        <div className={styles.heroShadeX} />
        <div className={styles.heroShadeY} />
        <div className={styles.heroSlides}>{children}</div>
      </div>
    </section>
  );
}
