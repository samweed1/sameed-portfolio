import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { EASE } from "./theme";

// ── Smooth scroll ─────────────────────────────────────────────────────────────
// Disabled outright when the visitor asks for reduced motion — a hijacked
// scroll is the single most disorienting thing you can do to that user.
export function useSmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.6 });
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    window.__lenis = lenis;
    return () => { cancelAnimationFrame(id); lenis.destroy(); window.__lenis = null; };
  }, [reduce]);
}

export function scrollToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────
export function Reveal({ children, delay = 0, y = 26, once = true, style = {} }) {
  const reduce = useReducedMotion();
  if (reduce) return <div style={style}>{children}</div>;
  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Staggers direct children of a grid/list.
export function Stagger({ children, gap = 0.06, style = {} }) {
  const reduce = useReducedMotion();
  if (reduce) return <div style={style}>{children}</div>;
  return (
    <motion.div
      style={style}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ shown: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, style = {} }) {
  const reduce = useReducedMotion();
  if (reduce) return <div style={style}>{children}</div>;
  return (
    <motion.div
      style={style}
      variants={{
        hidden: { opacity: 0, y: 24 },
        shown: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

// ── Word-by-word display type ─────────────────────────────────────────────────
export function SplitWords({ text, delay = 0, style = {} }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  if (reduce) return <span style={style}>{text}</span>;
  return (
    <span style={{ ...style, display: "inline-block" }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: delay + i * 0.07, ease: EASE }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ── Page transition ───────────────────────────────────────────────────────────
export function PageTransition({ children, pageKey }) {
  const reduce = useReducedMotion();
  if (reduce) return <div>{children}</div>;
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ── Custom cursor ─────────────────────────────────────────────────────────────
// Pointer-fine devices only. It follows, it grows over anything interactive,
// and it never replaces the native cursor's job of showing what is clickable.
export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y, raf, seen = false;

    const move = (e) => {
      x = e.clientX; y = e.clientY;
      if (!seen) {
        seen = true;
        if (dot.current) dot.current.style.opacity = "1";
        if (ring.current) ring.current.style.opacity = "1";
      }
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      const hit = e.target.closest?.("a,button,[role='button'],input,textarea,label");
      if (ring.current) ring.current.dataset.hot = hit ? "1" : "0";
    };
    const loop = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, [reduce]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dot} aria-hidden="true" style={{
        position: "fixed", top: 0, left: 0, width: 6, height: 6, borderRadius: "50%",
        background: "#0E0E12", zIndex: 10000, pointerEvents: "none", opacity: 0,
      }} />
      <div ref={ring} aria-hidden="true" className="cursor-ring" style={{
        position: "fixed", top: 0, left: 0, width: 36, height: 36, borderRadius: "50%",
        border: "1px solid rgba(14,14,18,0.35)", zIndex: 10000, pointerEvents: "none", opacity: 0,
        transition: "width .25s, height .25s, border-color .25s, background .25s",
      }} />
    </>
  );
}

export { motion, useReducedMotion };
