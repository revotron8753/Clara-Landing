"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./scroll";
import styles from "@/app/home.module.css";

/**
 * Compliance owl: the still photo is always rendered (for SEO and as the
 * fallback); the looping video loads near the viewport and fades in over it
 * once playing, in exactly the same box as the photo.
 */
export default function ComplianceOwl() {
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const box = boxRef.current!;
    const video = videoRef.current!;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && video.preload === "none") { video.preload = "auto"; video.load(); }
          if (e.intersectionRatio >= 0.3) video.play().catch(() => {});
          else if (!video.paused) video.pause();
        }
      },
      { threshold: [0, 0.3], rootMargin: "300px 0px 300px 0px" }
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={boxRef} className={styles.mandateMedia}>
      <Image
        src="/home/clara-owl-health-compliance-checklist.png"
        alt="Clara owl holding a health compliance checklist"
        width={1374}
        height={1145}
        sizes="(max-width: 899px) 92vw, 720px"
        className={playing ? styles.mandatePhotoOff : undefined}
      />
      <video
        ref={videoRef}
        className={`${styles.mandateVideo} ${playing ? styles.mandateVideoOn : ""}`}
        src="/home/clara-owl-health-compliance.mp4"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
      />
    </div>
  );
}
