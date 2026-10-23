"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./scroll";
import styles from "@/app/home.module.css";

const VIDEO = "/home/owl-fee-countdown.mp4";
const START = 100;
const END = 1;
/** Seconds into the video at which the counter lands on 1% (the owl's "wow"). */
const LAND_AT = 9;
/** Seconds into the video where it pauses and holds: the owl smiling and pointing at the 1%. */
const STOP_AT = 9.55;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * The owl video plus the "1%" figure. When the section scrolls into view the
 * video plays and the number counts down from 100% to 1%, kept in sync with
 * the video's own clock so it lands at LAND_AT seconds. The server-rendered
 * HTML shows the final "1%", so crawlers and no-JS visitors see the real value.
 */
export default function FeeCountdown() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [value, setValue] = useState(END);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    const root = rootRef.current!;
    const video = videoRef.current!;
    if (prefersReducedMotion()) {
      // No animation: show the owl's final, happy frame next to a static "1%".
      video.preload = "auto";
      video.addEventListener("loadedmetadata", () => { video.currentTime = STOP_AT; }, { once: true });
      video.load();
      setLanded(true);
      return;
    }

    setValue(START);
    let raf = 0;
    let started = false;

    const tick = () => {
      const t = Math.min(1, video.currentTime / LAND_AT);
      const v = Math.max(END, Math.round(START - (START - END) * easeInOut(t)));
      setValue(v);
      if (t >= 1) setLanded(true);
      if (video.currentTime >= STOP_AT || video.ended) {
        video.pause();
        video.currentTime = STOP_AT; // hold exactly on the pointing pose
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (started) return;
      started = true;
      video.currentTime = 0;
      video.play().then(
        () => { raf = requestAnimationFrame(tick); },
        () => { setValue(END); setLanded(true); } // autoplay blocked: show the result
      );
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Start loading a little before it's visible, play once it's on screen.
          if (e.isIntersecting && video.preload === "none") { video.preload = "auto"; video.load(); }
          if (e.intersectionRatio >= 0.6) start();
        }
      },
      { threshold: [0, 0.6], rootMargin: "300px 0px 300px 0px" }
    );
    io.observe(root);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const digits = String(value).length;

  return (
    <div ref={rootRef} className={styles.feeCountdown}>
      <video
        ref={videoRef}
        className={styles.feeOwl}
        src={VIDEO}
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className={`${styles.onePct} ${landed ? styles.onePctLanded : ""}`} aria-label="1%">
        <span className={styles.pctDigits} style={{ "--d": digits } as React.CSSProperties} aria-hidden="true">
          {value}
        </span>
        <span className={styles.pctSign} aria-hidden="true">%</span>
      </div>
    </div>
  );
}
