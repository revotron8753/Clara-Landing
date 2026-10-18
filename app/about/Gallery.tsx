"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styles from "./about.module.css";

// Photos from public/about/gallery, with their pixel sizes.
const PHOTOS: [number, number][] = [
  [960, 640], [960, 540], [960, 570], [1040, 520], [960, 936],
  [960, 540], [1600, 1066], [1600, 1066], [1280, 720], [1280, 578],
  [578, 1280], [1352, 640], [1040, 520], [1040, 520], [698, 520],
  [578, 1280], [1040, 520], [960, 720], [1495, 1356], [1280, 605],
  [1279, 609], [960, 540], [960, 540], [640, 640], [960, 640],
];

const src = (i: number) => `/about/gallery/camp-${String(i + 1).padStart(2, "0")}.jpg`;

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const n = PHOTOS.length;

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n)),
    [n],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <>
      <div className={styles.masonry}>
        {PHOTOS.map(([w, h], i) => (
          <button key={i} className={styles.tile} onClick={() => setOpen(i)} aria-label={`Open camp photo ${i + 1} of ${n}`}>
            <Image src={src(i)} alt={`Clara school health camp, photo ${i + 1}`} width={w} height={h} sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw" />
          </button>
        ))}
      </div>

      {open !== null && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Camp photo viewer" onClick={() => setOpen(null)}>
          <Image
            src={src(open)}
            alt={`Clara school health camp, photo ${open + 1}`}
            width={PHOTOS[open][0]}
            height={PHOTOS[open][1]}
            sizes="90vw"
            onClick={(e) => e.stopPropagation()}
          />
          <button className={`${styles.lbBtn} ${styles.lbClose}`} onClick={() => setOpen(null)} aria-label="Close" autoFocus>×</button>
          <button className={`${styles.lbBtn} ${styles.lbPrev}`} onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo">‹</button>
          <button className={`${styles.lbBtn} ${styles.lbNext}`} onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo">›</button>
          <div className={styles.lbCount}>{open + 1} / {n}</div>
        </div>
      )}
    </>
  );
}
