import { useState } from "react";

/**
 * HeroTools — floating glass tiles for the design/AI tools Sameed uses.
 * They drift gently (orbit-like) around the hero's right side, tying into the
 * particle background. Hidden on small screens where the hero stacks.
 */
const TOOLS = [
  { name: "Photoshop", bg: "#001E36", fg: "#31A8FF", mono: "Ps", pos: { top: "16%", right: "30%" }, dur: 7, delay: 0 },
  { name: "Illustrator", bg: "#1A0000", fg: "#FF9A00", mono: "Ai", pos: { top: "30%", right: "8%" }, dur: 8.5, delay: 0.6 },
  { name: "Adobe XD", bg: "#2E001F", fg: "#FF61F6", mono: "Xd", pos: { top: "58%", right: "12%" }, dur: 7.8, delay: 1.1 },
  { name: "Figma", bg: "#0f0f14", fg: "#fff", type: "figma", pos: { top: "26%", right: "44%" }, dur: 9, delay: 0.3 },
  { name: "Claude", bg: "#1a1714", fg: "#D97757", type: "claude", pos: { top: "52%", right: "40%" }, dur: 8, delay: 0.9 },
  { name: "Lovable", bg: "#1a0f16", fg: "#FF4D8D", type: "lovable", pos: { top: "70%", right: "28%" }, dur: 7.4, delay: 1.4 },
];

function FigmaMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 38 57" aria-hidden="true">
      <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
      <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
      <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
      <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </svg>
  );
}

function ClaudeMark() {
  // stylised sunburst
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <g stroke="#D97757" strokeWidth="2.1" strokeLinecap="round">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return <line key={i} x1={12} y1={12} x2={12 + Math.cos(a) * 8} y2={12 + Math.sin(a) * 8} />;
        })}
      </g>
    </svg>
  );
}

function LovableMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#FF4D8D" d="M12 21s-7.5-4.9-9.6-9.3C1 8.4 2.6 5 6 5c2 0 3.3 1.2 4 2.4C10.7 6.2 12 5 14 5c3.4 0 5 3.4 3.6 6.7C19.5 16.1 12 21 12 21z" />
    </svg>
  );
}

export default function HeroTools({ dark }) {
  const [hovered, setHovered] = useState(-1);
  // Simple width guard so we don't render over stacked mobile hero
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 860px)").matches) return null;
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
      <style>{`@keyframes toolFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}`}</style>
      {TOOLS.map((t, i) => (
        <div key={t.name}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(-1)}
          style={{
            position: "absolute", ...t.pos, pointerEvents: "auto", cursor: "default",
            animation: reduce ? "none" : `toolFloat ${t.dur}s ease-in-out ${t.delay}s infinite`,
          }}>
          <div style={{
            width: 58, height: 58, borderRadius: 16,
            background: dark ? `${t.bg}` : "rgba(255,255,255,0.9)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
            boxShadow: hovered === i
              ? `0 14px 34px ${t.fg}55, 0 0 0 1px ${t.fg}66`
              : "0 8px 22px rgba(0,0,0,0.35)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "transform 0.28s cubic-bezier(.34,1.56,.64,1), box-shadow 0.28s",
            transform: hovered === i ? "scale(1.14)" : "scale(1)",
          }}>
            {t.type === "figma" ? <FigmaMark />
              : t.type === "claude" ? <ClaudeMark />
              : t.type === "lovable" ? <LovableMark />
              : <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 22, color: t.fg }}>{t.mono}</span>}
          </div>
          {/* tooltip */}
          <div style={{
            position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
            background: dark ? "rgba(13,13,26,0.95)" : "rgba(255,255,255,0.98)",
            color: dark ? "#e8e6ff" : "#1a1a2e",
            border: `1px solid ${dark ? "rgba(124,106,250,0.3)" : "rgba(0,0,0,0.1)"}`,
            padding: "4px 10px", borderRadius: 8, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
            fontFamily: "'Poppins',sans-serif",
            opacity: hovered === i ? 1 : 0, transition: "opacity 0.2s", pointerEvents: "none",
          }}>{t.name}</div>
        </div>
      ))}
    </div>
  );
}
