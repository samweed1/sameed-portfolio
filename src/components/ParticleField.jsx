import { useRef, useEffect } from "react";

/**
 * ParticleField — animated orbiting "black-hole" particle background.
 * Pure 2D canvas (no Three.js) so it stays fast and battery-friendly on mobile.
 * Particles orbit a central point on elliptical paths (accretion-disk feel),
 * twinkle with depth, and the whole disk drifts/parallaxes toward the cursor.
 * Fully static (single frame) for prefers-reduced-motion users.
 */
export default function ParticleField({
  color = "124,106,250",
  accent = "76,201,168",
  density = 0.00016,
  className,
  style,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), t = 0;
    let particles = [];
    let cx = 0, cy = 0;                 // orbital center
    const mouse = { x: 0, y: 0, active: false };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // center sits right-of-middle, where the hero art space is
      cx = w * 0.66; cy = h * 0.52;
      const count = Math.min(260, Math.max(80, Math.floor(w * h * density)));
      const maxR = Math.min(w, h) * 0.6;
      particles = Array.from({ length: count }, () => {
        const radius = Math.pow(Math.random(), 0.7) * maxR + 20;
        return {
          radius,
          angle: Math.random() * Math.PI * 2,
          speed: (0.08 + (maxR - radius) / maxR * 0.22) / radius * 14, // inner = faster
          z: Math.random() * 0.7 + 0.3,
          tilt: 0.42,                     // vertical squish → disk seen at an angle
          tw: Math.random() * Math.PI * 2,
        };
      });
    };

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      // drift center gently toward cursor for parallax
      let dcx = cx, dcy = cy;
      if (mouse.active) { dcx += (mouse.x - cx) * 0.04; dcy += (mouse.y - cy) * 0.04; }

      // glowing core
      const coreR = Math.min(w, h) * 0.12;
      const g = ctx.createRadialGradient(dcx, dcy, 0, dcx, dcy, coreR);
      g.addColorStop(0, `rgba(${color},0.28)`);
      g.addColorStop(0.5, `rgba(${accent},0.10)`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(dcx, dcy, coreR, 0, Math.PI * 2);
      ctx.fill();

      for (const p of particles) {
        if (!reduce) { p.angle += p.speed * 0.01; p.tw += 0.03; }
        const x = dcx + Math.cos(p.angle) * p.radius;
        const y = dcy + Math.sin(p.angle) * p.radius * p.tilt;
        const twinkle = 0.6 + Math.sin(p.tw) * 0.4;
        const r = p.z * 1.9 * twinkle;
        // particles nearer the front (lower half) brighter
        const depth = 0.25 + (Math.sin(p.angle) + 1) / 2 * 0.75;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${(0.12 + p.z * 0.5) * depth * twinkle})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    build();
    draw();
    if (reduce) cancelAnimationFrame(rafRef.current);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };
    window.addEventListener("resize", build);
    if (!reduce) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [color, accent, density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", ...style }}
    />
  );
}
