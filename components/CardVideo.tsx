"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./scroll";

type Props = {
  video: string;
  /** Optional still photo: rendered underneath for SEO / first paint / reduced motion. */
  img?: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Seconds: loop back to the start here instead of at the video's end. */
  loopEnd?: number;
  /** Seconds: skip the opening and loop back to here instead of 0. */
  loopStart?: number;
};

/**
 * Card background video. It loads as the card nears the viewport, plays while
 * the card is on screen, pauses off screen and loops. With a still photo the
 * video fades in over it; without one the video itself is the background
 * (reduced motion: its first frame, not playing).
 */
export default function CardVideo({ video, img, alt, width, height, sizes, className, style, loopEnd, loopStart = 0 }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current!;
    const reduced = prefersReducedMotion();
    if (reduced && img) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && v.preload === "none") { v.preload = "auto"; v.load(); }
          if (reduced) continue;
          if (e.intersectionRatio >= 0.25) v.play().catch(() => {});
          else if (!v.paused) v.pause();
        }
      },
      { threshold: [0, 0.25], rootMargin: "300px 0px 300px 0px" }
    );
    io.observe(v.parentElement!);

    // Optional trimmed range [loopStart, loopEnd], checked every frame so the cut is seamless.
    const toStart = () => { if (loopStart && v.currentTime < loopStart) v.currentTime = loopStart; };
    v.addEventListener("loadedmetadata", toStart);
    let raf = 0;
    const watch = () => {
      if ((loopEnd && v.currentTime >= loopEnd) || v.currentTime < loopStart) v.currentTime = loopStart;
      raf = requestAnimationFrame(watch);
    };
    const onPlay = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(watch); };
    const onPause = () => cancelAnimationFrame(raf);
    const trimmed = !!loopEnd || loopStart > 0;
    if (trimmed) { v.addEventListener("play", onPlay); v.addEventListener("pause", onPause); }
    // A trimmed video can't use the native loop (it would restart at 0), so loop manually.
    const onEnded = () => { v.currentTime = loopStart; v.play().catch(() => {}); };
    if (loopStart > 0) v.addEventListener("ended", onEnded);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("loadedmetadata", toStart);
    };
  }, [img, loopEnd, loopStart]);

  const fill: React.CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%", ...style };
  const shown = img ? playing : true;
  return (
    <>
      {img && (
        <Image src={img} alt={alt} width={width} height={height} sizes={sizes} quality={85} className={className} style={fill} />
      )}
      <video
        ref={ref}
        src={video}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden={img ? "true" : undefined}
        aria-label={img ? undefined : alt}
        role={img ? undefined : "img"}
        tabIndex={-1}
        className={className}
        onPlaying={() => setPlaying(true)}
        style={{ ...fill, opacity: shown ? 1 : 0, transition: "opacity 0.6s ease" }}
      />
    </>
  );
}
