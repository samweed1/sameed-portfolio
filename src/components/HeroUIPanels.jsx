import { useState } from "react";

/**
 * HeroUIPanels — floating mini-mockups of real design-tool UI (Figma-style
 * layers panel, auto-layout properties, toolbar, a properties card) collaged
 * around the hero to show the software Sameed designs in. Pure CSS/JSX.
 * Hidden on small screens; float animation disabled for reduced-motion.
 */

const FigmaLogo = ({ s = 14 }) => (
  <svg width={s} height={s * 1.5} viewBox="0 0 38 57" aria-hidden="true">
    <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
    <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
    <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
    <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
    <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
  </svg>
);

const bar = (w, c = "#c9c9d2") => <div style={{ height: 6, width: w, borderRadius: 3, background: c }} />;
const PANEL = {
  background: "#ffffff", border: "1px solid #e6e6ec", borderRadius: 12,
  boxShadow: "0 20px 50px rgba(0,0,0,0.45)", fontFamily: "'Poppins',sans-serif",
  color: "#1a1a2e", overflow: "hidden",
};
const label = { fontSize: 9, fontWeight: 600, color: "#8b8a99", letterSpacing: 0.3 };

function LayersPanel() {
  return (
    <div style={{ ...PANEL, width: 190 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 11px", borderBottom: "1px solid #f0f0f4" }}>
        <FigmaLogo s={11} />
        <span style={{ fontSize: 11, fontWeight: 700 }}>Design Library</span>
      </div>
      <div style={{ display: "flex", gap: 14, padding: "7px 11px", borderBottom: "1px solid #f0f0f4" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#1a1a2e" }}>File</span>
        <span style={{ fontSize: 10, fontWeight: 500, color: "#a0a0ac" }}>Assets</span>
      </div>
      <div style={{ padding: "8px 11px" }}>
        <div style={{ ...label, marginBottom: 7 }}>PAGES</div>
        {[["📍", "Overview", true], ["🅰", "Typography"], ["✦", "Icons"], ["🗂", "Archive"]].map(([ic, t, on], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, padding: "3px 6px", marginBottom: 2, borderRadius: 5, background: on ? "#e8f2ff" : "transparent" }}>
            <span style={{ fontSize: 9 }}>{ic}</span>
            <span style={{ fontSize: 10, fontWeight: on ? 600 : 500, color: on ? "#0d99ff" : "#5a5a6a" }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutoLayoutPanel() {
  const field = { display: "flex", alignItems: "center", gap: 5, background: "#f4f4f7", borderRadius: 6, padding: "5px 8px", flex: 1 };
  return (
    <div style={{ ...PANEL, width: 200 }}>
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Auto layout</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 9 }}>
          <div style={field}><span style={label}>W</span><span style={{ fontSize: 10, fontWeight: 600 }}>Hug</span></div>
          <div style={field}><span style={label}>H</span><span style={{ fontSize: 10, fontWeight: 600 }}>Fill</span></div>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          {["↓", "→", "↵"].map((a, i) => (
            <div key={i} style={{ width: 30, height: 26, borderRadius: 6, background: i === 1 ? "#0d99ff" : "#f4f4f7", color: i === 1 ? "#fff" : "#5a5a6a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{a}</div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "center" }}>{bar(20)}{bar(14)}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={field}><span style={label}>↔</span><span style={{ fontSize: 10, fontWeight: 600 }}>16</span></div>
          <div style={field}><span style={label}>↕</span><span style={{ fontSize: 10, fontWeight: 600 }}>8</span></div>
        </div>
      </div>
    </div>
  );
}

function Toolbar() {
  const tools = ["↖", "▤", "▢", "✎", "T", "○", "💬"];
  return (
    <div style={{ ...PANEL, borderRadius: 14, padding: "7px 9px", display: "flex", gap: 5, alignItems: "center" }}>
      {tools.map((t, i) => (
        <div key={i} style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, background: i === 0 ? "#0d99ff" : "transparent", color: i === 0 ? "#fff" : "#4a4a5a" }}>{t}</div>
      ))}
      <div style={{ width: 1, height: 20, background: "#e6e6ec", margin: "0 2px" }} />
      <div style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#4a4a5a" }}>{"</>"}</div>
    </div>
  );
}

function PropsCard() {
  const [on, setOn] = useState(true);
  const row = (l, v) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
      <span style={{ fontSize: 10, color: "#8b8a99", fontWeight: 500 }}>{l}</span>
      <div style={{ background: "#f4f4f7", borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 600 }}>{v}</div>
    </div>
  );
  return (
    <div style={{ ...PANEL, width: 186, padding: "12px 13px" }}>
      <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>Notification</div>
      <p style={{ fontSize: 9, color: "#9a9aa6", lineHeight: 1.5, marginBottom: 11 }}>Timely, high-value info for people.</p>
      {row("Mode", "Light")}
      {row("Title", "Title")}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, color: "#8b8a99", fontWeight: 500 }}>Show desc</span>
        <button onClick={() => setOn(o => !o)} aria-label="Toggle" style={{ width: 30, height: 17, borderRadius: 10, border: "none", cursor: "pointer", background: on ? "#0d99ff" : "#d0d0d8", position: "relative", transition: "background 0.2s" }}>
          <span style={{ position: "absolute", top: 2, left: on ? 15 : 2, width: 13, height: 13, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
        </button>
      </div>
    </div>
  );
}

const ITEMS = [
  { el: <LayersPanel />, pos: { top: "8%", right: "31%" }, dur: 9, delay: 0 },
  { el: <AutoLayoutPanel />, pos: { top: "12%", right: "3%" }, dur: 10, delay: 0.7 },
  { el: <PropsCard />, pos: { top: "52%", right: "36%" }, dur: 8.5, delay: 1.2 },
  { el: <Toolbar />, pos: { top: "68%", right: "10%" }, dur: 8, delay: 0.4 },
];

export default function HeroUIPanels() {
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 980px)").matches) return null;
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
      <style>{`@keyframes panelFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}`}</style>
      {ITEMS.map((it, i) => (
        <div key={i} style={{
          position: "absolute", ...it.pos, pointerEvents: "auto",
          animation: reduce ? "none" : `panelFloat ${it.dur}s ease-in-out ${it.delay}s infinite`,
        }}>
          {it.el}
        </div>
      ))}
    </div>
  );
}
