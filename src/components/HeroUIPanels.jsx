import { useState } from "react";

/**
 * HeroUIPanels — floating mini-mockups of real design-tool UI collaged around
 * the hero: Figma (light), Photoshop / Illustrator / Adobe XD (dark), plus a
 * toolbar. Pure CSS/JSX. Hidden on small screens; float off for reduced-motion.
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

const Mono = ({ txt, bg, fg }) => (
  <div style={{ width: 20, height: 20, borderRadius: 5, background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, fontFamily: "'Poppins',sans-serif", flexShrink: 0 }}>{txt}</div>
);

const bar = (w, c = "#c9c9d2") => <div style={{ height: 6, width: w, borderRadius: 3, background: c }} />;

// Light (Figma) panel base
const PANEL = { background: "#fff", border: "1px solid #e6e6ec", borderRadius: 12, boxShadow: "0 20px 50px rgba(0,0,0,0.45)", fontFamily: "'Poppins',sans-serif", color: "#1a1a2e", overflow: "hidden" };
// Dark (Adobe) panel base
const PANEL_D = { background: "#262626", border: "1px solid #3a3a3a", borderRadius: 10, boxShadow: "0 20px 50px rgba(0,0,0,0.55)", fontFamily: "'Poppins',sans-serif", color: "#e8e8ea", overflow: "hidden" };
const label = { fontSize: 9, fontWeight: 600, color: "#8b8a99", letterSpacing: 0.3 };
const labelD = { fontSize: 9, fontWeight: 600, color: "#9a9aa0", letterSpacing: 0.3 };

/* ---------- Figma ---------- */
function LayersPanel() {
  return (
    <div style={{ ...PANEL, width: 188 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 11px", borderBottom: "1px solid #f0f0f4" }}>
        <FigmaLogo s={11} /><span style={{ fontSize: 11, fontWeight: 700 }}>Design Library</span>
      </div>
      <div style={{ display: "flex", gap: 14, padding: "7px 11px", borderBottom: "1px solid #f0f0f4" }}>
        <span style={{ fontSize: 10, fontWeight: 700 }}>File</span>
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
    <div style={{ ...PANEL, width: 198 }}>
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
  const tools = ["↖", "▤", "▢", "✎", "T", "○"];
  return (
    <div style={{ ...PANEL, borderRadius: 14, padding: "7px 9px", display: "flex", gap: 4, alignItems: "center" }}>
      {tools.map((t, i) => (
        <div key={i} style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, background: i === 0 ? "#0d99ff" : "transparent", color: i === 0 ? "#fff" : "#4a4a5a" }}>{t}</div>
      ))}
    </div>
  );
}

/* ---------- Photoshop ---------- */
function PhotoshopPanel() {
  const layers = [["#7C6AFA", "Hero art"], ["#4CC9A8", "Overlay"], ["#F7C948", "Text"], ["#888", "Background"]];
  return (
    <div style={{ ...PANEL_D, width: 182 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 11px", borderBottom: "1px solid #333" }}>
        <Mono txt="Ps" bg="#001E36" fg="#31A8FF" /><span style={{ fontSize: 11, fontWeight: 700 }}>Layers</span>
      </div>
      <div style={{ display: "flex", gap: 6, padding: "8px 11px", borderBottom: "1px solid #333" }}>
        <div style={{ flex: 1, background: "#333", borderRadius: 5, padding: "4px 7px", fontSize: 9, color: "#cfcfd4" }}>Normal ▾</div>
        <div style={{ background: "#333", borderRadius: 5, padding: "4px 7px", fontSize: 9, color: "#cfcfd4" }}>100%</div>
      </div>
      <div style={{ padding: "6px 9px" }}>
        {layers.map(([c, t], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 3px", borderRadius: 4, background: i === 0 ? "#3a3a3a" : "transparent" }}>
            <span style={{ fontSize: 9, opacity: 0.7 }}>👁</span>
            <div style={{ width: 22, height: 16, borderRadius: 3, background: `linear-gradient(135deg, ${c}, ${c}88)` }} />
            <span style={{ fontSize: 10, fontWeight: 500, color: "#dcdce0" }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Illustrator ---------- */
function IllustratorPanel() {
  const swatches = ["#FF9A00", "#E63946", "#7C6AFA", "#4CC9A8", "#F7C948", "#2B2BE5"];
  const row = (l, node) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 }}>
      <span style={labelD}>{l}</span>{node}
    </div>
  );
  return (
    <div style={{ ...PANEL_D, width: 178 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 11px", borderBottom: "1px solid #333" }}>
        <Mono txt="Ai" bg="#1A0000" fg="#FF9A00" /><span style={{ fontSize: 11, fontWeight: 700 }}>Properties</span>
      </div>
      <div style={{ padding: "11px 12px" }}>
        {row("Fill", <div style={{ width: 20, height: 20, borderRadius: 5, background: "#FF9A00", border: "1px solid #555" }} />)}
        {row("Stroke", <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 20, height: 20, borderRadius: 5, background: "#111", border: "1px solid #555" }} /><span style={{ fontSize: 10, color: "#cfcfd4" }}>2 px</span></div>)}
        <div style={{ ...labelD, marginBottom: 6 }}>SWATCHES</div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {swatches.map((c, i) => <div key={i} style={{ width: 18, height: 18, borderRadius: 4, background: c, border: "1px solid #444" }} />)}
        </div>
      </div>
    </div>
  );
}

/* ---------- Adobe XD ---------- */
function XdPanel() {
  const row = (l, node) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 }}>
      <span style={labelD}>{l}</span>{node}
    </div>
  );
  const field = (v) => <div style={{ background: "#333", borderRadius: 5, padding: "4px 9px", fontSize: 10, color: "#cfcfd4" }}>{v}</div>;
  return (
    <div style={{ ...PANEL_D, width: 180 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 11px", borderBottom: "1px solid #333" }}>
        <Mono txt="Xd" bg="#2E001F" fg="#FF61F6" /><span style={{ fontSize: 11, fontWeight: 700 }}>Appearance</span>
      </div>
      <div style={{ padding: "11px 12px" }}>
        {row("Fill", <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 20, height: 20, borderRadius: 5, background: "#FF61F6" }} />{field("FF61F6")}</div>)}
        {row("Border", <div style={{ width: 20, height: 20, borderRadius: 5, background: "#111", border: "1px solid #666" }} />)}
        {row("Corner", field("12"))}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={labelD}>Shadow</span>
          <div style={{ width: 28, height: 16, borderRadius: 9, background: "#FF61F6", position: "relative" }}>
            <span style={{ position: "absolute", top: 2, left: 14, width: 12, height: 12, borderRadius: "50%", background: "#fff" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const ITEMS = [
  { el: <LayersPanel />, pos: { top: "15%", right: "31%" }, dur: 9, delay: 0 },
  { el: <PhotoshopPanel />, pos: { top: "16%", right: "2%" }, dur: 10, delay: 0.6 },
  { el: <IllustratorPanel />, pos: { top: "45%", right: "40%" }, dur: 8.5, delay: 1.1 },
  { el: <AutoLayoutPanel />, pos: { top: "47%", right: "4%" }, dur: 9.5, delay: 0.3 },
  { el: <XdPanel />, pos: { top: "70%", right: "26%" }, dur: 8, delay: 1.4 },
  { el: <Toolbar />, pos: { top: "72%", right: "4%" }, dur: 7.5, delay: 0.9 },
];

export default function HeroUIPanels() {
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches) return null;
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
      <style>{`@keyframes panelFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}`}</style>
      {ITEMS.map((it, i) => (
        <div key={i} style={{ position: "absolute", ...it.pos, pointerEvents: "auto", animation: reduce ? "none" : `panelFloat ${it.dur}s ease-in-out ${it.delay}s infinite` }}>
          {it.el}
        </div>
      ))}
    </div>
  );
}
