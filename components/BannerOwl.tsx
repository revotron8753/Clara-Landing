"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./scroll";
import styles from "@/app/home.module.css";

const VIDEO = "/home/owl-banner-jump.mp4";
/** The owl leaves the frame after ~8.1s, so only 0–7.9s is used, on a loop. */
const LOOP_END = 7.9;

// The video's background is pure white (255) and the owl's coat never goes above
// ~241, so pixels are keyed out by brightness: fully transparent at 253+, fully
// opaque at 243 and below. Edge pixels that are part owl, part white are darker
// than that threshold, so the matte is also eroded by ~5 video pixels (min of
// the alpha around each pixel) to remove the thin light outline they'd leave.
const VERT = `attribute vec2 p; varying vec2 uv;
void main(){ uv = vec2(p.x * .5 + .5, .5 - p.y * .5); gl_Position = vec4(p, 0., 1.); }`;
const FRAG = `precision mediump float; varying vec2 uv; uniform sampler2D t; uniform vec2 px;
float key(vec2 q){ vec3 c = texture2D(t, q).rgb; return 1. - smoothstep(243. / 255., 253. / 255., min(c.r, min(c.g, c.b))); }
void main(){
  vec3 c = texture2D(t, uv).rgb;
  float raw = key(uv);
  float a = raw;
  vec2 r1 = px * 2.5, r2 = px * 5.;
  a = min(a, key(uv + vec2(r1.x, 0.))); a = min(a, key(uv - vec2(r1.x, 0.)));
  a = min(a, key(uv + vec2(0., r1.y))); a = min(a, key(uv - vec2(0., r1.y)));
  a = min(a, key(uv + r1 * .7071)); a = min(a, key(uv - r1 * .7071));
  a = min(a, key(uv + vec2(r1.x, -r1.y) * .7071)); a = min(a, key(uv + vec2(-r1.x, r1.y) * .7071));
  a = min(a, key(uv + vec2(r2.x, 0.))); a = min(a, key(uv - vec2(r2.x, 0.)));
  a = min(a, key(uv + vec2(0., r2.y))); a = min(a, key(uv - vec2(0., r2.y)));
  vec3 rgb = raw > .001 ? clamp((c - (1. - raw)) / raw, 0., 1.) : vec3(0.);
  gl_FragColor = vec4(rgb * a, a);
}`;

/** The animated owl on the "India's first" banner, composited over the background photo. */
export default function BannerOwl() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const video = videoRef.current!;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true });
    if (!gl) return; // no WebGL: banner shows without the owl

    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const pxLoc = gl.getUniformLocation(prog, "px");
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
      if (w && h && (canvas.width !== w || canvas.height !== h)) { canvas.width = w; canvas.height = h; }
    };
    const draw = () => {
      if (video.readyState < 2) return;
      resize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(pxLoc, 1 / (video.videoWidth || 3840), 1 / (video.videoHeight || 2160)); // erosion measured in video pixels
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      setVisible(true);
    };

    let raf = 0;
    // Reduced motion: show one still frame (the owl pointing at the heading).
    const still = () => {
      video.pause();
      video.addEventListener("seeked", draw, { once: true });
      video.currentTime = LOOP_END;
    };
    const loop = () => {
      if (video.currentTime >= LOOP_END || video.ended) {
        video.currentTime = 0; // loop back before the owl leaves the frame
        if (video.paused) video.play().catch(() => {});
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      cancelAnimationFrame(raf);
      video.play().then(() => { raf = requestAnimationFrame(loop); }, still);
    };
    const pause = () => { cancelAnimationFrame(raf); video.pause(); };

    const reduced = prefersReducedMotion();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && video.preload === "none") {
            video.preload = "auto";
            video.load();
            // Show the first frame as soon as it's ready (or the final pose for reduced motion).
            video.addEventListener("loadeddata", () => { if (reduced) still(); else draw(); }, { once: true });
          }
          if (reduced) continue;
          // Loop while the banner is on screen, pause when it isn't (like the compliance video).
          if (e.intersectionRatio >= 0.4) { if (video.paused) play(); }
          else if (!video.paused) pause();
        }
      },
      { threshold: [0, 0.4], rootMargin: "300px 0px 300px 0px" }
    );
    io.observe(canvas.parentElement!);
    window.addEventListener("resize", draw);
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener("resize", draw); };
  }, []);

  return (
    <div className={styles.bannerOwlBox}>
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className={`${styles.bannerOwl} ${visible ? styles.bannerOwlOn : ""}`}
        role="img"
        aria-label="Clara's doctor owl mascot jumping and pointing to the heading"
      />
      <video ref={videoRef} src={VIDEO} muted playsInline preload="none" className={styles.bannerOwlSrc} aria-hidden="true" tabIndex={-1} />
    </div>
  );
}
