"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { progressOf, smoothstep } from "./scroll";
import styles from "@/app/home.module.css";

export type Indicator = { title: string; text: string; icon?: string; iconW?: number; iconH?: number };

/**
 * "360° comprehensive screening": the indicators sit on three faces of a 3D
 * prism that rotates as the section scrolls. All indicator text is rendered
 * on the server; this component only lays out and rotates the faces.
 */
export default function ScreeningRing({ faces }: { faces: Indicator[][] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const ring = ringRef.current!;
    const panels = Array.from(ring.querySelectorAll<HTMLElement>("[data-ring]"));
    const dots = Array.from(dotsRef.current!.children) as HTMLElement[];
    let radius = 300;
    let layoutKey = "";

    const layout = () => {
      const narrow = window.innerWidth < 640;
      if (narrow) {
        const avail = ring.parentElement ? ring.parentElement.clientHeight - 16 : 400;
        ring.style.height = Math.max(200, Math.min(540, avail)) + "px";
      } else {
        ring.style.height = "";
      }
      radius = ring.offsetWidth * 0.2887 + 40;
      panels.forEach((p, i) => {
        p.style.transform = `rotateY(${i * 120}deg) translateZ(${radius}px)`;
      });
    };

    let raf = 0;
    const tick = () => {
      const key = `${ring.offsetWidth}x${ring.parentElement?.clientHeight ?? 0}x${window.innerWidth}`;
      if (key !== layoutKey) { layoutKey = key; layout(); }

      const rp = progressOf(section) ?? 0;
      const st = rp * 2;
      const base = Math.min(1, Math.floor(st));
      const fr = Math.max(0, Math.min(1, (st - base - 0.3) / 0.4));
      const rot = -(base + smoothstep(fr)) * 120;
      ring.style.transform = `translateZ(${-radius}px) rotateY(${rot.toFixed(2)}deg)`;

      const active = Math.round(-rot / 120);
      dots.forEach((d, i) => d.classList.toggle(styles.dotOn, i === active));
      panels.forEach((p, i) => {
        let ang = (i * 120 + rot) % 360;
        if (ang > 180) ang -= 360;
        if (ang < -180) ang += 360;
        const a = Math.min(1, Math.abs(ang) / 90);
        if (a >= 1) {
          p.style.visibility = "hidden";
          p.style.opacity = "0";
          return;
        }
        p.style.visibility = "visible";
        p.style.opacity = smoothstep(1 - a).toFixed(3);
        p.style.filter = `blur(${(a * 2.2).toFixed(2)}px)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  let n = 0;
  return (
    <section ref={sectionRef} id="system" className={styles.system} aria-labelledby="system-title">
      <div className={styles.systemStage}>
        <div className={styles.systemGlow} />
        <header className={styles.systemHead}>
          <h2 id="system-title">What we check in one visit</h2>
        </header>

        <div className={styles.ringViewport}>
          <div ref={ringRef} className={styles.ring}>
            {faces.map((face, f) => (
              <ul key={f} data-ring={f} className={styles.ringFace}>
                {face.map((ind) => {
                  n += 1;
                  return (
                    <li key={ind.title} className={`${styles.ringCard} ${ind.icon ? "" : styles.ringCardAccent}`}>
                      <span className={styles.ringNum}>{String(n).padStart(2, "0")}</span>
                      <h3>{ind.title}</h3>
                      <p>{ind.text}</p>
                      {ind.icon && (
                        <Image src={ind.icon} alt="" width={ind.iconW} height={ind.iconH} className={styles.ringIcon} sizes="180px" />
                      )}
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>

        <div ref={dotsRef} className={styles.ringDots} aria-hidden="true">
          {faces.map((_, i) => <span key={i} className={i === 0 ? styles.dotOn : undefined} />)}
        </div>
        <p className={styles.systemNote}>Every result is saved to the child&apos;s record and compared with the previous year.</p>
      </div>
    </section>
  );
}
