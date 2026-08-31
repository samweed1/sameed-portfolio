// ── Design tokens ─────────────────────────────────────────────────────────────
// A single light theme. Separation comes from hairlines, elevation and space —
// not from glow, which is what the old dark theme leaned on.

export const C = {
  // ground
  bg: "#F6F5F2",          // warm paper
  bgAlt: "#EFEEE9",       // banded sections
  surface: "#FFFFFF",
  surfaceSunk: "#FAF9F7",

  // ink
  ink: "#0E0E12",
  inkSoft: "#3A3A44",
  muted: "#6E6E7A",
  faint: "#9A9AA6",

  // lines
  line: "rgba(14,14,18,0.10)",
  lineStrong: "rgba(14,14,18,0.20)",

  // accent
  accent: "#4A3AFF",
  accentSoft: "rgba(74,58,255,0.08)",
  accentLine: "rgba(74,58,255,0.28)",

  // legacy names still referenced by extracted data
  purple: "#4A3AFF",
  teal: "#0E9F6E",
  tealDeep: "#0B7C56",

  linkedin: "#0077B5",
  behance: "#1769FF",
  instagram: "#E1306C",
};

export const FONT = {
  display: "'Instrument Serif', Georgia, serif",
  sans: "'Inter', system-ui, -apple-system, sans-serif",
};

export const RADIUS = { sm: 8, md: 12, lg: 18, xl: 26 };

export const SHADOW = {
  rest: "0 1px 2px rgba(14,14,18,0.04)",
  hover: "0 18px 40px -18px rgba(14,14,18,0.28)",
  lift: "0 28px 60px -24px rgba(14,14,18,0.32)",
};

export const EASE = [0.22, 1, 0.36, 1];

// Page gutter used by every section so vertical rhythm stays consistent.
export const PAGE = { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(20px, 5vw, 48px)" };
