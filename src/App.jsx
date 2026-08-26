import { useState, useEffect, useRef, useCallback } from "react";
import ParticleField from "./components/ParticleField";
import HeroUIPanels from "./components/HeroUIPanels";
import { IMG_FULLER_PATENT, IMG_CORPORATE_BRILLIANCE, IMG_WISION_WORK, IMG_BALTIC_BREEZE, IMG_VIRTUS_LABS, IMG_RBN, IMG_KINGDOM_JOINT_LOGO, IMG_BRANDY_VIBES, IMG_COFFEE_BREAK, IMG_REAWAKEN, IMG_EDIFY, IMG_REC_FILMS, IMG_CZ_CONNECT, IMG_ABS_LOGO, IMG_BRANDED_STORE_LOGO, IMG_EMENAC_LOGO, IMG_MESHWAR_LOGO, IMG_KINGDOM_JOINT_SOCIAL_LOGO, IMG_DESIGNTHRU_LOGO, IMG_ABS_POST1, IMG_ABS_POST2, IMG_ABS_POST3, IMG_ABS_POST4, IMG_ABS_POST5, IMG_BRANDED_POST1, IMG_BRANDED_POST2, IMG_BRANDED_POST3, IMG_EMENAC_POST1, IMG_EMENAC_POST2, IMG_MESHWAR_POST1, IMG_KJ_POST1, IMG_KJ_POST2, IMG_DT_POST1, IMG_DT_POST2, IMG_DT_POST3, IMG_DT_POST4, IMG_DT_POST5, IMG_DT_POST6, IMG_DT_POST7, IMG_SKEWINGS_FULL, IMG_SKEWINGS_S1, IMG_SKEWINGS_S2, IMG_SKEWINGS_S3, IMG_SKEWINGS_S4, IMG_SKEWINGS_S5, IMG_SKEWINGS_S6, IMG_PURE_DIGITAL_FULL, IMG_PURE_DIGITAL_S1, IMG_PURE_DIGITAL_S2, IMG_PURE_DIGITAL_S3, IMG_PURE_DIGITAL_S4, IMG_SIMPLIA_FULL, IMG_SIMPLIA_S1, IMG_SIMPLIA_S2, IMG_SIMPLIA_S3, IMG_SIMPLIA_S4, IMG_SIMPLIA_S5, IMG_SIMPLIA_S6, IMG_SIMPLIA_S7, PHOTO_SRC } from "./assets/images";

// ── Logo SVG ─────────────────────────────────────────────────────────────────
const LogoSVG = ({ height = 36, dark = true }) => {
  const fontSize = height * 0.72;
  return (
    <span style={{
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 900,
      fontSize: fontSize,
      letterSpacing: "-1px",
      background: `linear-gradient(135deg, #7C6AFA, #4CC9A8)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      lineHeight: 1,
    }}>SBD</span>
  );
};



// ── Hook: scroll reveal ────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Hook: media query ──────────────────────────────────────────────────────────
function useMediaQuery(query) {
  const [match, setMatch] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}

// ── Reveal wrapper ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

// ── Color tokens ───────────────────────────────────────────────────────────────
const C = {
  purple: "#7C6AFA",
  teal: "#4CC9A8",
  tealDeep: "#1F8F72",
  darkBg: "#0d0d1a",
  darkCard: "#13132a",
  darkBorder: "rgba(124,106,250,0.18)",
  lightBg: "#f5f5ff",
  lightCard: "#ffffff",
  lightBorder: "rgba(124,106,250,0.22)",
  textDark: "#e8e6ff",
  textMuted: "#8b8aaa",
  linkedin: "#0077B5",
  behance: "#1769FF",
  instagram: "#E1306C",
};

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home");
  const [scrollPct, setScrollPct] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollPct(pct);
      setNavScrolled(el.scrollTop > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.title = "Sameed Bin Dawar — UI & Graphic Designer";
    const setMeta = (name, content, prop) => {
      let el = document.querySelector(prop ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!el) { el = document.createElement("meta"); prop ? el.setAttribute("property", name) : el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Sameed Bin Dawar is a UI & Graphic Designer with 6+ years of experience crafting SaaS products, brand identities, and social media visuals for startups and businesses worldwide.");
    setMeta("keywords", "UI Designer, Graphic Designer, Sameed Bin Dawar, SaaS Design, Brand Identity, Logo Design, Figma, Lahore Designer");
    setMeta("og:title", "Sameed Bin Dawar — UI & Graphic Designer", true);
    setMeta("og:description", "6+ years designing clean, scalable digital products and brand identities. Available for freelance.", true);
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Sameed Bin Dawar — UI & Graphic Designer");
  }, []);

  const bg = dark ? C.darkBg : C.lightBg;
  const card = dark ? C.darkCard : C.lightCard;
  const border = dark ? C.darkBorder : C.lightBorder;
  const text = dark ? C.textDark : "#1a1a2e";
  const muted = dark ? C.textMuted : "#5a5a7a";

  const navLinks = ["Home", "Portfolio", "Services", "Reviews", "Contact"];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: bg, color: text, minHeight: "100vh", transition: "background 0.35s, color 0.35s" }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');*{box-sizing:border-box;margin:0;padding:0;}body{overflow-x:hidden;}::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-track{background:${bg};}::-webkit-scrollbar-thumb{background:${C.purple};border-radius:3px;}@media (prefers-reduced-motion: reduce){*{animation-duration:0.001ms !important;animation-iteration-count:1 !important;transition-duration:0.001ms !important;}}`}</style>

      {/* Global animated background (orbiting particles behind all sections) */}
      <ParticleField style={{ position: "fixed", opacity: dark ? 0.7 : 0.42, zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
      {/* Scroll progress bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, height: 3, zIndex: 9999,
        width: `${scrollPct}%`,
        background: `linear-gradient(90deg, ${C.purple}, ${C.teal})`,
        transition: "width 0.1s"
      }} />

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 3, left: 0, right: 0, zIndex: 999,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%", height: 64,
        background: navScrolled ? (dark ? "rgba(13,13,26,0.82)" : "rgba(245,245,255,0.82)") : "transparent",
        backdropFilter: navScrolled ? "blur(18px)" : "none",
        borderBottom: navScrolled ? `1px solid ${border}` : "none",
        transition: "background 0.4s, backdrop-filter 0.4s",
      }}>
        <button onClick={() => setPage("home")} aria-label="Go to home" style={{ background: "none", border: "none", cursor: "pointer" }}>
          <LogoSVG height={32} dark={dark} />
        </button>

        {/* Dark toggle (shared) */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {navLinks.map(n => (
              <button key={n} onClick={() => { setPage(n.toLowerCase()); setMobileOpen(false); }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: page === n.toLowerCase() ? C.purple : text,
                  fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 14,
                  padding: "6px 14px", borderRadius: 8,
                  borderBottom: page === n.toLowerCase() ? `2px solid ${C.purple}` : "2px solid transparent",
                  transition: "color 0.2s, border-color 0.2s",
                }}>
                {n}
              </button>
            ))}
            <button onClick={() => setDark(d => !d)} aria-label="Toggle dark mode" style={{
              background: dark ? "rgba(124,106,250,0.15)" : "rgba(124,106,250,0.1)",
              border: `1px solid ${border}`, borderRadius: 20, cursor: "pointer",
              padding: "6px 14px", color: text, fontSize: 14, fontFamily: "'Poppins', sans-serif",
              transition: "all 0.2s", marginLeft: 8,
            }}>
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        )}

        {/* Mobile controls */}
        {isMobile && (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => setDark(d => !d)} aria-label="Toggle dark mode" style={{
              background: dark ? "rgba(124,106,250,0.15)" : "rgba(124,106,250,0.1)",
              border: `1px solid ${border}`, borderRadius: 20, cursor: "pointer",
              padding: "6px 12px", color: text, fontSize: 15, fontFamily: "'Poppins', sans-serif",
            }}>{dark ? "☀️" : "🌙"}</button>
            <button onClick={() => setMobileOpen(o => !o)} aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen} style={{
              background: "none", border: `1px solid ${border}`, borderRadius: 10, cursor: "pointer",
              width: 40, height: 40, color: text, fontSize: 18, display: "flex",
              alignItems: "center", justifyContent: "center",
            }}>{mobileOpen ? "✕" : "☰"}</button>
          </div>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && (
        <div style={{
          position: "fixed", top: 67, left: 0, right: 0, zIndex: 998,
          background: dark ? "rgba(13,13,26,0.97)" : "rgba(245,245,255,0.97)",
          backdropFilter: "blur(18px)", borderBottom: `1px solid ${border}`,
          display: "flex", flexDirection: "column", padding: "8px 5%",
          transform: mobileOpen ? "translateY(0)" : "translateY(-120%)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "transform 0.32s cubic-bezier(.34,1.2,.64,1), opacity 0.32s",
        }}>
          {navLinks.map(n => (
            <button key={n} onClick={() => { setPage(n.toLowerCase()); setMobileOpen(false); window.scrollTo(0, 0); }}
              style={{
                background: "none", border: "none", cursor: "pointer", textAlign: "left",
                color: page === n.toLowerCase() ? C.purple : text,
                fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 16,
                padding: "14px 8px", borderBottom: `1px solid ${border}`,
              }}>
              {n}
            </button>
          ))}
        </div>
      )}

      {/* Page router */}
      {page === "home" && <HomePage dark={dark} card={card} border={border} text={text} muted={muted} bg={bg} setPage={setPage} />}
      {page === "portfolio" && <PortfolioPage dark={dark} card={card} border={border} text={text} muted={muted} bg={bg} />}
      {page === "services" && <ServicesPage dark={dark} card={card} border={border} text={text} muted={muted} bg={bg} />}
      {page === "reviews" && <ReviewsPage dark={dark} card={card} border={border} text={text} muted={muted} bg={bg} />}
      {page === "contact" && <ContactPage dark={dark} card={card} border={border} text={text} muted={muted} bg={bg} />}

      {/* Footer */}
      <Footer dark={dark} card={card} border={border} text={text} muted={muted} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function HomePage({ dark, card, border, text, muted, bg, setPage }) {
  return (
    <div>
      <HeroSection dark={dark} text={text} muted={muted} bg={bg} setPage={setPage} />
      <AboutSection dark={dark} card={card} border={border} text={text} muted={muted} bg={bg} />
      <ExperienceSection dark={dark} card={card} border={border} text={text} muted={muted} />
      <EducationSection dark={dark} card={card} border={border} text={text} muted={muted} />
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function HeroSection({ dark, text, muted, bg, setPage }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const anim = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  });

  return (
    <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", padding: "120px 5% 80px", overflow: "hidden" }}>
      {/* Floating software-UI panels */}
      <HeroUIPanels />
      {/* Blobs */}
      <div style={{ position: "absolute", top: "10%", right: "8%", width: 420, height: 420, borderRadius: "60% 40% 30% 70% / 50% 60% 40% 50%", background: "radial-gradient(circle, rgba(124,106,250,0.18) 0%, transparent 70%)", filter: "blur(40px)", animation: "blobFloat 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "25%", width: 280, height: 280, borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", background: "radial-gradient(circle, rgba(76,201,168,0.15) 0%, transparent 70%)", filter: "blur(30px)", animation: "blobFloat 10s ease-in-out infinite reverse" }} />
      <div style={{ position: "absolute", top: "40%", left: "3%", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,106,250,0.1) 0%, transparent 70%)", filter: "blur(20px)" }} />
      <style>{`@keyframes blobFloat{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(15px,-20px) scale(1.05);}}@keyframes scrollBounce{0%,100%{transform:translateY(0);}50%{transform:translateY(8px);}}`}</style>

      <div style={{ maxWidth: 760, position: "relative", zIndex: 2 }}>
        <div style={{ ...anim(0.1), display: "inline-block", background: `linear-gradient(135deg, rgba(124,106,250,0.15), rgba(76,201,168,0.15))`, border: `1px solid rgba(124,106,250,0.3)`, borderRadius: 20, padding: "6px 16px", fontSize: 13, color: dark ? C.teal : C.tealDeep, fontWeight: 500, marginBottom: 24 }}>
          ✦ Available for freelance
        </div>
        <h1 style={{ ...anim(0.2), fontSize: "clamp(42px, 7vw, 82px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 16 }}>
          Sameed Bin<br />
          <span style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Dawar</span>
        </h1>
        <p style={{ ...anim(0.3), fontSize: "clamp(16px, 2.2vw, 22px)", color: C.purple, fontWeight: 600, marginBottom: 20, letterSpacing: 1 }}>
          UI &amp; Graphic Designer
        </p>
        <p style={{ ...anim(0.4), fontSize: "clamp(14px, 1.6vw, 17px)", color: muted, maxWidth: 560, lineHeight: 1.7, marginBottom: 36 }}>
          Need a mobile app, SaaS product, or brand designed? I craft interfaces and visuals that look great and work even better.
        </p>

        <div style={{ ...anim(0.5), display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 28 }}>
          <a href="https://www.behance.net/sameeddawar" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <Btn primary label="View My Work" />
          </a>
          <Btn label="Get in Touch" onClick={() => window.location.href = "mailto:sameed.dawar@gmail.com"} />
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.5, animation: "scrollBounce 2s ease-in-out infinite" }}>
        <div style={{ width: 1, height: 40, background: `linear-gradient(${C.purple}, transparent)` }} />
        <span style={{ fontSize: 11, color: muted, letterSpacing: 2 }}>SCROLL</span>
      </div>
    </section>
  );
}

function Btn({ label, primary, onClick, href }) {
  const [hov, setHov] = useState(false);
  const [press, setPress] = useState(false);
  // "juice": springy press + hover lift
  const scale = press ? 0.94 : hov ? 1.04 : 1;
  const lift = press ? 0 : hov ? -2 : 0;
  const base = {
    padding: "13px 28px", borderRadius: 12, fontFamily: "'Poppins', sans-serif",
    fontWeight: 600, fontSize: 15, cursor: "pointer", border: "none",
    transition: "transform 0.18s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s",
    display: "inline-block", textDecoration: "none",
    transform: `translateY(${lift}px) scale(${scale})`,
  };
  const handlers = {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => { setHov(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    onClick,
  };
  if (primary) {
    return <button {...handlers}
      style={{ ...base, background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, color: "#fff", boxShadow: hov ? `0 8px 28px rgba(124,106,250,0.5)` : `0 4px 16px rgba(124,106,250,0.3)` }}>{label}</button>;
  }
  return <button {...handlers}
    style={{ ...base, background: "transparent", color: C.purple, border: `1.5px solid ${C.purple}`, boxShadow: hov ? `0 8px 24px rgba(124,106,250,0.25)` : "none" }}>{label}</button>;
}

function SocialBtn({ color, href, icon, label }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 24,
        background: hov ? color : "transparent", border: `1.5px solid ${color}`,
        color: hov ? "#fff" : color, textDecoration: "none", fontWeight: 600, fontSize: 14,
        fontFamily: "'Poppins', sans-serif", transition: "all 0.25s",
        transform: hov ? "scale(1.05)" : "none",
      }}>
      <span style={{ fontWeight: 800, fontSize: 13 }}>{icon}</span>{label}
    </a>
  );
}

// ── Draggable skill tag (spring-back on release) ───────────────────────────────
function DraggableTag({ label, dark }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);
  const start = useRef({ x: 0, y: 0 });

  const onDown = (e) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setDrag(true);
    start.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!drag) return;
    setPos({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
  };
  const onUp = () => { setDrag(false); setPos({ x: 0, y: 0 }); };

  return (
    <span
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      style={{
        padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500,
        background: dark ? "rgba(124,106,250,0.1)" : "rgba(124,106,250,0.08)",
        border: `1px solid rgba(124,106,250,0.25)`, color: C.purple,
        cursor: drag ? "grabbing" : "grab", userSelect: "none", touchAction: "none",
        display: "inline-block",
        transform: `translate(${pos.x}px, ${pos.y}px) scale(${drag ? 1.12 : 1})`,
        transition: drag ? "transform 0.02s" : "transform 0.5s cubic-bezier(.34,1.56,.64,1)",
        boxShadow: drag ? "0 10px 24px rgba(124,106,250,0.35)" : "none",
        position: "relative", zIndex: drag ? 5 : 1,
      }}
    >{label}</span>
  );
}

// ── About ──────────────────────────────────────────────────────────────────────
function AboutSection({ dark, card, border, text, muted, bg }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const skills = ["UI/UX Design", "Creative Direction", "Social Media Visuals", "Visual Design", "Brand Identity", "Figma", "Adobe XD", "Illustrator", "Photoshop"];

  return (
    <section style={{ padding: "100px 5%", background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
      <SectionLabel label="About Me" dark={dark} />
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: isMobile ? 36 : 60, alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>

        {/* Photo card */}
        <Reveal>
          <div style={{ position: "relative", maxWidth: 380 }}>
            {/* Decorative ring */}
            <div style={{ position: "absolute", inset: -16, borderRadius: 28, border: `2px dashed rgba(124,106,250,0.25)` }} />
            <div style={{ position: "absolute", inset: -32, borderRadius: 36, border: `1px dashed rgba(76,201,168,0.15)` }} />
            <div style={{
              borderRadius: 24, overflow: "hidden", position: "relative",
              background: `linear-gradient(135deg, rgba(124,106,250,0.3), rgba(76,201,168,0.2))`,
              border: `1px solid ${border}`, aspectRatio: "4/5",
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
            }}>
              {PHOTO_SRC
                ? <img src={PHOTO_SRC} alt="Sameed Bin Dawar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <>
                  <div style={{ fontSize: 80, opacity: 0.6 }}>👤</div>
                  <p style={{ color: muted, fontSize: 13, marginTop: 8 }}>Profile Photo</p>
                </>
              }
              {/* Badge */}
              <div style={{
                position: "absolute", bottom: 20, left: 20, right: 20,
                background: dark ? "rgba(13,13,26,0.88)" : "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)", borderRadius: 14, padding: "12px 16px",
                border: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 10,
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${C.purple},${C.teal})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: text }}>6+ Years</div>
                  <div style={{ fontSize: 12, color: muted }}>Experience</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal delay={0.15}>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 24 }}>
            Designing with <span style={{ background: `linear-gradient(135deg,${C.purple},${C.teal})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>purpose &amp; precision.</span>
          </h2>
          <p style={{ color: muted, lineHeight: 1.8, marginBottom: 18, fontSize: 15 }}>
            I design clean, scalable SaaS products and digital experiences for startups and growing businesses around the world. With a background in graphic design and hands-on UI/UX experience, I focus on creating products that balance visual quality with real usability — not just designs that look good, but experiences that feel intuitive and work seamlessly.
          </p>
          <p style={{ color: muted, lineHeight: 1.8, marginBottom: 32, fontSize: 15 }}>
            From dashboards and web apps to design systems and brand-focused interfaces, I value clarity, consistency, and thoughtful execution. I believe good design should simplify things, support business growth, and create a better experience for the people using it.
          </p>

          {/* Skills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
            {skills.map(s => (
              <DraggableTag key={s} label={s} dark={dark} />
            ))}
          </div>

          {/* Social */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <SocialBtn color={C.linkedin} href="https://www.linkedin.com/in/sameed-dawar-4b3144218" icon="in" label="LinkedIn" />
            <SocialBtn color={C.behance} href="https://www.behance.net/sameeddawar" icon="Bē" label="Behance" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Experience ─────────────────────────────────────────────────────────────────
function ExperienceSection({ dark, card, border, text, muted }) {
  const exp = [
    { role: "UI Designer", company: "Redmath", period: "May 2024–Present", desc: "Currently working full-time as a UI Designer at Redmath, Lahore. Focused on crafting clean, user-centered interfaces using Figma.", color: C.purple },
    { role: "Art Director", company: "DesignThru", period: "Apr 2023–Apr 2024", desc: "Specialized in creating and delivering visual content across a variety of mediums, ensuring cohesive alignment with branding strategies and project objectives.", color: C.teal },
    { role: "SR. Graphic Designer", company: "Starlet Shoes", period: "Jan 2023–Aug 2023", desc: "Created visual content that communicates messages effectively. Led design projects collaborating with cross-functional teams and mentored junior designers.", color: "#F7C948" },
    { role: "Graphic Designer", company: "Kingdom Joint", period: "Mar 2019–Dec 2022", desc: "Handled visual conceptualization, branding and identity, and digital marketing strategy across print and digital mediums.", color: "#FF6B6B" },
    { role: "Graphic Designer", company: "Emenac Travel UK", period: "Jan 2020–Oct 2020", desc: "Designed visual content for diverse mediums ensuring alignment with branding. Produced logos, brochures, and digital graphics.", color: "#4FC3F7" },
    { role: "Videographer", company: "Anokhay Digital", period: "Nov 2019–Sep 2020", desc: "Captured and produced compelling video content. Handled full production pipeline from camera operation to post-production.", color: "#FF8C42" },
  ];

  return (
    <section style={{ padding: "100px 5%" }}>
      <SectionLabel label="Experience" dark={dark} />
      <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, marginBottom: 60, maxWidth: 1100, margin: "0 auto 60px" }}>Work History</h2>
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
        {/* Line */}
        <div style={{ position: "absolute", left: 18, top: 0, bottom: 0, width: 2, background: `linear-gradient(${C.purple}, ${C.teal})`, opacity: 0.3 }} />

        {exp.map((e, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{ display: "flex", gap: 32, marginBottom: 44, position: "relative" }}>
              {/* Dot */}
              <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: "50%", background: e.color, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, boxShadow: `0 0 16px ${e.color}55`, fontSize: 16 }}>
                ✦
              </div>
              <div style={{ flex: 1, background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "20px 24px", transition: "border-color 0.2s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: text }}>{e.role}</div>
                    <div style={{ fontSize: 14, color: e.color, fontWeight: 600 }}>{e.company}</div>
                  </div>
                  <span style={{ fontSize: 12, color: muted, background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", padding: "4px 12px", borderRadius: 20, alignSelf: "flex-start" }}>{e.period}</span>
                </div>
                <p style={{ color: muted, fontSize: 14, lineHeight: 1.7 }}>{e.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Education ──────────────────────────────────────────────────────────────────
function EducationSection({ dark, card, border, text, muted }) {
  const edu = [
    { degree: "Level-5 & BA in Graphic Design and Management", school: "Warnborough College", period: "2014–2018", grade: "A+", color: C.purple },
    { degree: "Level-3, Design and Applied Arts", school: "Warnborough College", period: "2012–2014", grade: "A", color: C.teal },
    { degree: "O-Levels, Computer Science", school: "Jawahir Al-Riyadh", period: "2010–2012", grade: "B", color: "#F7C948" },
  ];

  return (
    <section style={{ padding: "80px 5% 120px", background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
      <SectionLabel label="Education" dark={dark} />
      <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, marginBottom: 48, maxWidth: 1100, margin: "0 auto 48px" }}>Academic Background</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px,1fr))", gap: 24, maxWidth: 1000, margin: "0 auto" }}>
        {edu.map((e, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <EduCard e={e} card={card} border={border} text={text} muted={muted} dark={dark} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function EduCard({ e, card, border, text, muted, dark }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: card, border: `1px solid ${hov ? e.color : border}`,
      borderRadius: 20, padding: "28px 24px", position: "relative", overflow: "hidden",
      transition: "all 0.3s", transform: hov ? "translateY(-4px)" : "none",
      boxShadow: hov ? `0 12px 32px ${e.color}33` : "none",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: e.color, borderRadius: "4px 4px 0 0" }} />
      <div style={{ position: "absolute", top: 20, right: 20, width: 44, height: 44, borderRadius: 12, background: `${e.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: e.color }}>
        {e.grade}
      </div>
      <div style={{ fontSize: 11, color: e.color, fontWeight: 600, letterSpacing: 1, marginBottom: 10 }}>🎓 {e.period}</div>
      <div style={{ fontWeight: 700, fontSize: 15, color: text, marginBottom: 8, paddingRight: 50, lineHeight: 1.4 }}>{e.degree}</div>
      <div style={{ fontSize: 13, color: muted }}>{e.school}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PORTFOLIO PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function PortfolioPage({ dark, card, border, text, muted, bg }) {
  const [activeTab, setActiveTab] = useState("all");
  const [lightbox, setLightbox] = useState(null); // { images, index, title, desc }

  const logos = [
    { title: "Fuller Patent", desc: "A sophisticated 3D lettermark crafted in gold for a patent law firm. The isometric FP monogram communicates precision, authority, and trust — exactly what you want when protecting intellectual property.", tags: ["Logo", "Lettermark", "Gold"], color: "#C9A84C", img: IMG_FULLER_PATENT },
    { title: "The Corporate Brilliance", desc: "A clean, minimal TCB monogram that speaks the language of corporate elegance. The interlocking letterforms create a mark that feels polished, trustworthy, and built to last on any boardroom wall.", tags: ["Logo", "Monogram", "Corporate"], color: "#333333", img: IMG_CORPORATE_BRILLIANCE },
    { title: "Wision Work", desc: "A typographic WW lettermark where form meets function. The fine linework and two-tone palette give this identity a sharp, architectural feel — modern enough for tech, refined enough for consulting.", tags: ["Logo", "Typography", "Linework"], color: "#4FC3F7", img: IMG_WISION_WORK },
    { title: "Baltic Breeze", desc: "An illustrative hexagonal mark blending urban skyline with natural landscape — trees, mountains, and a rising sun. It captures the spirit of a place where nature and modernity coexist beautifully.", tags: ["Logo", "Illustrative", "Nature"], color: "#5B8FA8", img: IMG_CZ_CONNECT },
    { title: "VirtusLabs", desc: "Two overlapping pill shapes in a grayscale palette create an abstract mark that feels both scientific and forward-thinking. Simple, distinctive, and highly versatile across digital and physical applications.", tags: ["Logo", "Abstract", "Tech"], color: "#555555", img: IMG_VIRTUS_LABS },
    { title: "RBN — Raised By Numbers", desc: "A bold, data-driven brand identity for a financial content platform. The 3D ribbon mark in a warm-to-cool gradient communicates growth, momentum, and the energy of numbers in motion.", tags: ["Logo", "3D", "Finance"], color: "#E84C1E", img: IMG_RBN },
    { title: "Brandy Vibes", desc: "A neon-lit bag icon glowing with electric pink energy. Designed for a women's accessories brand, this mark captures the thrill of the night out — bold, unapologetic, and completely unforgettable.", tags: ["Logo", "Neon", "Fashion"], color: "#E040FB", img: IMG_BALTIC_BREEZE },
    { title: "Coffee Break", desc: "A minimal, two-colour wordmark anchored by a coffee bean icon — clean, bold capital letters that work as hard as your morning espresso. Designed for a coffee bar that means business.", tags: ["Logo", "Minimal", "Cafe"], color: "#C0842A", img: IMG_COFFEE_BREAK },
    { title: "Reawaken", desc: "A strong navy wordmark with a hidden R letterform — clean, professional, and quietly clever. The mark communicates renewal and confidence, making it ideal for a coaching or wellness-focused brand.", tags: ["Logo", "Wordmark", "Minimal"], color: "#0D2B3E", img: IMG_REAWAKEN },
    { title: "Edify Productions", desc: "A dynamic film-and-media mark combining camera film reels with bold geometric shapes. The play button and filmstrip elements immediately communicate creativity, production quality, and visual storytelling.", tags: ["Logo", "Media", "Geometric"], color: "#E85D04", img: IMG_EDIFY },
    { title: "REC Films", desc: "A high-contrast wordmark pairing a bold red circle with a cinematic clapperboard — instantly recognisable and packed with energy. Simple enough to work anywhere, strong enough to never be forgotten.", tags: ["Logo", "Film", "Bold"], color: "#E63946", img: IMG_REC_FILMS },
  ];

  const socialProjects = [
    {
      title: "ABS Shoes",
      desc: "Built a complete Instagram identity for Pakistan's rising luxury footwear brand. From feed posts to stories and highlight covers, every touchpoint was designed to feel premium, consistent, and scroll-stopping — helping grow the account to 23K+ followers.",
      color: "#1a1a1a", tags: ["Social Media", "Fashion", "Instagram"],
      logo: IMG_ABS_LOGO,
      posts: [IMG_ABS_POST1, IMG_ABS_POST2, IMG_ABS_POST3, IMG_ABS_POST4, IMG_ABS_POST5],
    },
    {
      title: "A Branded Store",
      desc: "Created a cohesive social media presence for a multi-brand retail outlet carrying Starlet and Bella. The content strategy balanced product showcasing with seasonal campaigns, building a feed that felt curated, on-trend, and shoppable.",
      color: "#2A9D8F", tags: ["Social Media", "Retail", "Multi-brand"],
      logo: IMG_BRANDED_STORE_LOGO,
      posts: [IMG_BRANDED_POST1, IMG_BRANDED_POST2, IMG_BRANDED_POST3],
    },
    {
      title: "Emenac Travel UK",
      desc: "Designed eye-catching social media campaigns for a London-based travel agency. Each post was crafted to inspire wanderlust and drive bookings — from Maldives beach escapes to Umrah packages — with bold typography and vibrant destination visuals.",
      color: "#E63946", tags: ["Social Media", "Travel", "Campaign"],
      logo: IMG_EMENAC_LOGO,
      posts: [IMG_EMENAC_POST1, IMG_EMENAC_POST2],
    },
    {
      title: "Meshwar Wahid",
      desc: "Developed social media content for a Saudi-based delivery company, including Keeta recruitment campaigns. The visuals were bold, bilingual, and designed to attract both customers and freelance delivery partners across the region.",
      color: "#F4A261", tags: ["Social Media", "Delivery", "Freelance"],
      logo: IMG_MESHWAR_LOGO,
      posts: [IMG_MESHWAR_POST1],
    },
    {
      title: "Kingdom Joint",
      desc: "Managed the full social media visual identity for a fast-casual shawarma restaurant. From Facebook banners to Instagram reels thumbnails, the content captured the brand's bold, street-food personality and kept the audience hungry for more.",
      color: "#E63946", tags: ["Social Media", "Food", "Restaurant"],
      logo: IMG_KINGDOM_JOINT_SOCIAL_LOGO,
      posts: [IMG_KJ_POST1, IMG_KJ_POST2],
    },
    {
      title: "DesignThru",
      desc: "As Art Director at DesignThru, I led the creative direction for their own social media — crafting thought-leadership content, campaign visuals, and brand storytelling pieces that positioned the agency as a bold, ideas-first creative powerhouse.",
      color: "#F7C948", tags: ["Social Media", "Agency", "Art Direction"],
      logo: IMG_DESIGNTHRU_LOGO,
      posts: [IMG_DT_POST1, IMG_DT_POST2, IMG_DT_POST3, IMG_DT_POST4, IMG_DT_POST5, IMG_DT_POST6, IMG_DT_POST7],
    },
  ];

  const uiuxProjects = [
    {
      title: "Pure Digital Marketing",
      subtitle: "Digital marketing agency for plumbers",
      url: "puredigitalmarketing.com",
      color: "#1E3A8A",
      tags: ["UI/UX", "Web Design", "Lead Gen"],
      desc: "A full-page website design for a Tampa agency that markets exclusively to plumbers and other home-service trades. The brief was blunt: the old site looked like a generic template and buried the enquiry form. I rebuilt the page around a single conversion goal — the contact form sits inside the hero, visible before any scroll, with trust badges (Google Partner, Expertise, BestSearch) placed immediately below it so credibility lands before the pitch does.",
      highlights: [
        "Form-in-hero layout so the primary action never needs a scroll",
        "Deep-navy and white system built for contrast and quick scanning",
        "Services shown as a 7-icon grid instead of a wall of paragraphs",
        "A real before/after lead-volume panel doing the persuading, not adjectives",
      ],
      role: "UI Design · Web Design · Visual System",
      cover: IMG_PURE_DIGITAL_S1,
      shots: [IMG_PURE_DIGITAL_S1, IMG_PURE_DIGITAL_S2, IMG_PURE_DIGITAL_S3, IMG_PURE_DIGITAL_S4],
      full: IMG_PURE_DIGITAL_FULL,
    },
    {
      title: "Simplia",
      subtitle: "Web design service company",
      url: "simplia.com",
      color: "#E5322D",
      tags: ["UI/UX", "Web Design", "Agency"],
      desc: "A landing page for a web design service that sells speed — 24-hour delivery, unlimited revisions, cancel anytime. The design had to feel confident without shouting, so I used a restrained red-and-cream palette with soft circular shapes carrying the eye down the page, and let one bold accent colour do the work that five colours usually get asked to do.",
      highlights: [
        "Layered device mockup in the hero showing real output, not a stock photo",
        "Four-step process section using oversized numerals as the visual anchor",
        "Guarantees turned into a scannable icon row — the actual reason people buy",
        "Full-bleed red bands used as rhythm markers between calm white sections",
      ],
      role: "UI Design · Web Design · Brand Application",
      cover: IMG_SIMPLIA_S1,
      shots: [IMG_SIMPLIA_S1, IMG_SIMPLIA_S2, IMG_SIMPLIA_S3, IMG_SIMPLIA_S4, IMG_SIMPLIA_S5, IMG_SIMPLIA_S6, IMG_SIMPLIA_S7],
      full: IMG_SIMPLIA_FULL,
    },
    {
      title: "Skewings",
      subtitle: "Flight & travel booking platform",
      url: "skewings.com",
      color: "#2E86F0",
      tags: ["UI/UX", "Travel", "Booking"],
      desc: "A booking site for flights and travel packages, designed to feel like the trip rather than the transaction. Photography carries the page and the interface gets out of its way — rounded cards, generous whitespace, and one blue accent used consistently for anything clickable. The booking path stays visible throughout, from the hero CTA down to the destination cards.",
      highlights: [
        "Editorial hero with a stepped progress rail hinting at the booking flow",
        "Destination cards with location, rating, and a single obvious tap target",
        "OTA trust row (Tripadvisor, Trivago, Expedia, Booking.com) placed above the fold-break",
        "Stats and testimonials used as proof blocks between the visual sections",
      ],
      role: "UI/UX Design · Web Design · Visual System",
      cover: IMG_SKEWINGS_S1,
      shots: [IMG_SKEWINGS_S1, IMG_SKEWINGS_S2, IMG_SKEWINGS_S3, IMG_SKEWINGS_S4, IMG_SKEWINGS_S5, IMG_SKEWINGS_S6],
      full: IMG_SKEWINGS_FULL,
    },
  ];

  const allItems = [
    ...logos.map(l => ({ ...l, category: "logo", type: "logo" })),
    ...socialProjects.map(s => ({ ...s, category: "social", type: "social" })),
  ];

  const tabs = [
    { key: "all", label: "All Work", icon: "✦" },
    { key: "uiux", label: "UI/UX", icon: "🎛️" },
    { key: "logo", label: "Logo", icon: "🏷️" },
    { key: "social", label: "Social Media", icon: "📱" },
  ];

  const filtered = activeTab === "all" ? allItems
    : activeTab === "uiux" ? []
    : allItems.filter(i => i.category === activeTab);

  const openUIUX = (item) => {
    setLightbox({
      images: [...item.shots, item.full],
      index: 0,
      title: item.title,
      desc: item.desc,
      browser: true,
      url: item.url,
      subtitle: item.subtitle,
      role: item.role,
      highlights: item.highlights,
      accent: item.color,
      tallIndex: item.shots.length,
    });
  };

  const openLightbox = (item) => {
    if (item.type === "logo") {
      setLightbox({ images: [item.img], index: 0, title: item.title, desc: item.desc, light: true });
    } else {
      setLightbox({ images: item.posts, index: 0, title: item.title, desc: item.desc });
    }
  };

  return (
    <div style={{ padding: "120px 5% 80px" }}>
      {/* Lightbox */}
      {lightbox && (
        <Lightbox lightbox={lightbox} setLightbox={setLightbox} dark={dark} />
      )}

      <Reveal>
        <div style={{ maxWidth: 1100, margin: "0 auto 40px" }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: dark ? C.teal : C.tealDeep, fontWeight: 600, marginBottom: 10 }}>SELECTED WORK</div>
          <h1 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900 }}>Portfolio</h1>
        </div>
      </Reveal>

      {/* Tabs */}
      <Reveal>
        <div style={{ maxWidth: 1100, margin: "0 auto 48px", display: "flex", flexWrap: "wrap", gap: 10 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              style={{
                padding: "10px 22px", borderRadius: 24, fontFamily: "'Poppins',sans-serif",
                fontWeight: 600, fontSize: 14, cursor: "pointer", border: "none",
                background: activeTab === t.key ? `linear-gradient(135deg, ${C.purple}, ${C.teal})` : dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                color: activeTab === t.key ? "#fff" : muted,
                boxShadow: activeTab === t.key ? `0 4px 16px rgba(124,106,250,0.4)` : "none",
                transition: "all 0.25s", transform: activeTab === t.key ? "translateY(-2px)" : "none",
              }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* UI/UX grid */}
      {activeTab === "uiux" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 24, maxWidth: 1100, margin: "0 auto 60px" }}>
          {uiuxProjects.map((item, i) => (
            <Reveal key={`uiux-${i}`} delay={i * 0.06}>
              <UIUXProjectCard item={item} dark={dark} card={card} border={border} text={text} muted={muted} onOpen={() => openUIUX(item)} />
            </Reveal>
          ))}
        </div>
      )}

      {/* Grid */}
      {activeTab !== "uiux" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 24, maxWidth: 1100, margin: "0 auto 60px" }}>
          {filtered.map((item, i) => (
            <Reveal key={`${activeTab}-${i}`} delay={i * 0.05}>
              <PortfolioCard item={item} dark={dark} card={card} border={border} text={text} muted={muted} onOpen={() => openLightbox(item)} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <a href="https://www.behance.net/sameeddawar" target="_blank" rel="noreferrer"
            style={{ display: "inline-block", padding: "14px 32px", borderRadius: 14, background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "'Poppins', sans-serif" }}>
            🎨 See More on Behance
          </a>
        </div>
      </Reveal>
    </div>
  );
}

function Lightbox({ lightbox, setLightbox, dark }) {
  const { images, index, title, desc, light, browser, url, accent, tallIndex, subtitle, role, highlights } = lightbox;
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setCurrent(c => Math.min(c + 1, images.length - 1));
      if (e.key === "ArrowLeft") setCurrent(c => Math.max(c - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length, setLightbox]);

  return (
    <div onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label={`${title} — project gallery`} style={{
      position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      backdropFilter: "blur(8px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: dark ? "#13132a" : "#fff", borderRadius: 24, overflow: "hidden",
        maxWidth: browser ? 1000 : 860, width: "100%", maxHeight: "92vh", height: browser ? "92vh" : "auto", display: "flex", flexDirection: "column",
        border: `1px solid rgba(124,106,250,0.3)`,
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(124,106,250,0.15)" }}>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: 18, color: dark ? "#e8e6ff" : "#1a1a2e" }}>{title}</h3>
            {subtitle && <div style={{ fontSize: 12, color: accent || C.teal, fontWeight: 600, marginTop: 2 }}>{subtitle}</div>}
            {images.length > 1 && <span style={{ fontSize: 12, color: C.teal }}>{current + 1} / {images.length}{browser && current === tallIndex ? " · full page" : ""}</span>}
          </div>
          <button onClick={() => setLightbox(null)} aria-label="Close gallery" style={{ background: "rgba(124,106,250,0.15)", border: "none", borderRadius: 10, color: C.purple, width: 36, height: 36, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        {/* Image */}
        <div style={{
          flex: "1 1 auto", minHeight: browser ? 200 : 300, overflow: "hidden", position: "relative",
          background: browser ? (dark ? "#0d0d1c" : "#eceaf6") : light ? "#ffffff" : "#000",
          display: "flex", alignItems: browser ? "stretch" : "center", justifyContent: "center",
          padding: browser ? 18 : light ? 32 : 0,
        }}>
          {browser ? (
            <BrowserFrame url={url} accent={accent}>
              <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden", background: "#fff", WebkitOverflowScrolling: "touch" }}>
                <img src={images[current]} alt={`${title} — screen ${current + 1}`}
                  style={{ width: "100%", display: "block" }} />
              </div>
              {current === tallIndex && (
                <div aria-hidden="true" style={{
                  position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)",
                  background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 11, fontWeight: 600,
                  padding: "5px 12px", borderRadius: 20, backdropFilter: "blur(4px)", pointerEvents: "none",
                }}>scroll to explore the full page ↓</div>
              )}
            </BrowserFrame>
          ) : (
            <img src={images[current]} alt={title} style={{ maxWidth: "100%", maxHeight: "60vh", objectFit: "contain" }} />
          )}
          {images.length > 1 && (
            <>
              <button onClick={() => setCurrent(c => Math.max(c - 1, 0))} disabled={current === 0}
                aria-label="Previous image" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 2, background: "rgba(124,106,250,0.7)", border: "none", borderRadius: "50%", width: 44, height: 44, color: "#fff", fontSize: 20, cursor: current === 0 ? "not-allowed" : "pointer", opacity: current === 0 ? 0.3 : 1 }}>‹</button>
              <button onClick={() => setCurrent(c => Math.min(c + 1, images.length - 1))} disabled={current === images.length - 1}
                aria-label="Next image" style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", zIndex: 2, background: "rgba(124,106,250,0.7)", border: "none", borderRadius: "50%", width: 44, height: 44, color: "#fff", fontSize: 20, cursor: current === images.length - 1 ? "not-allowed" : "pointer", opacity: current === images.length - 1 ? 0.3 : 1 }}>›</button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div style={{ display: "flex", gap: 8, padding: "12px 20px", flexShrink: 0, overflowX: "auto", borderTop: "1px solid rgba(124,106,250,0.1)" }}>
            {images.map((img, i) => (
              <img key={i} src={img} alt="" loading="lazy" decoding="async" onClick={() => setCurrent(i)}
                style={{ width: 56, height: 56, objectFit: "cover", objectPosition: "top", borderRadius: 8, cursor: "pointer", border: i === current ? `2px solid ${C.purple}` : "2px solid transparent", opacity: i === current ? 1 : 0.5, flexShrink: 0, background: "#fff" }} />
            ))}
          </div>
        )}

        {/* Description */}
        <div style={{ padding: "16px 24px 20px", borderTop: "1px solid rgba(124,106,250,0.1)", overflowY: "auto", flexShrink: 0, maxHeight: browser ? "30vh" : "none" }}>
          <p style={{ color: dark ? "#8b8aaa" : "#5a5a7a", fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
          {highlights && (
            <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "6px 20px" }}>
              {highlights.map(h => (
                <li key={h} style={{ color: dark ? "#8b8aaa" : "#5a5a7a", fontSize: 13, lineHeight: 1.6, paddingLeft: 16, position: "relative" }}>
                  <span aria-hidden="true" style={{ position: "absolute", left: 0, color: accent || C.teal }}>▸</span>{h}
                </li>
              ))}
            </ul>
          )}
          {role && <div style={{ marginTop: 12, fontSize: 12, color: dark ? "#6e6d8c" : "#7a7a96", fontWeight: 600, letterSpacing: 0.3 }}>{role}</div>}
        </div>
      </div>
    </div>
  );
}

function BrowserFrame({ url, accent, children, compact = false }) {
  return (
    <div style={{
      width: "100%", borderRadius: compact ? 10 : 12, overflow: "hidden",
      background: "#1c1c2b", boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      border: "1px solid rgba(255,255,255,0.12)", display: "flex", flexDirection: "column",
      minHeight: 0,
    }}>
      <div style={{
        height: compact ? 26 : 34, flexShrink: 0, background: "linear-gradient(#2b2b3d,#22222f)",
        display: "flex", alignItems: "center", gap: 8, padding: compact ? "0 10px" : "0 12px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
            <span key={c} style={{ width: compact ? 7 : 9, height: compact ? 7 : 9, borderRadius: "50%", background: c, display: "block" }} />
          ))}
        </div>
        <div style={{
          flex: 1, height: compact ? 14 : 18, borderRadius: 20, background: "rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
          fontSize: compact ? 8 : 10, color: "rgba(255,255,255,0.55)", fontFamily: "'Poppins',sans-serif",
          padding: "0 10px", overflow: "hidden", whiteSpace: "nowrap",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent || "#4CC9A8", flexShrink: 0 }} />
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

function UIUXProjectCard({ item, dark, card, border, text, muted, onOpen }) {
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const onMove = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 6, ry: px * 6 });
  };
  const reset = () => { setHov(false); setTilt({ rx: 0, ry: 0 }); };
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={reset} onMouseMove={onMove}
      onClick={onOpen} role="button" tabIndex={0}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
      aria-label={`${item.title} — open project gallery`}
      style={{
        background: card, border: `1px solid ${hov ? item.color : border}`,
        borderRadius: 20, overflow: "hidden", cursor: "pointer",
        transition: hov ? "border-color 0.3s, box-shadow 0.3s" : "transform 0.5s cubic-bezier(.34,1.4,.64,1), border-color 0.3s, box-shadow 0.3s",
        transform: `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${hov ? -6 : 0}px)`,
        boxShadow: hov ? `0 16px 40px ${item.color}44` : "none",
      }}>
      <div style={{
        height: 214, position: "relative", overflow: "hidden", padding: "30px 18px 0",
        background: `radial-gradient(circle at 40% 30%, ${item.color}bb, ${item.color}44)`,
      }}>
        <BrowserFrame url={item.url} accent="#ffffff" compact>
          <div style={{ height: 158, overflow: "hidden", background: "#fff" }}>
            <img src={item.cover} alt={`${item.title} website design`} loading="lazy" decoding="async"
              style={{ width: "100%", display: "block", transform: hov ? "translateY(-14px)" : "none", transition: "transform 0.6s ease" }} />
          </div>
        </BrowserFrame>
        <span style={{ position: "absolute", top: 6, right: 14, background: "rgba(0,0,0,0.45)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 10, backdropFilter: "blur(4px)" }}>
          {item.shots.length + 1} screens
        </span>
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 2, color: text }}>{item.title}</h3>
        <div style={{ fontSize: 12, color: item.color, fontWeight: 600, marginBottom: 8 }}>{item.subtitle}</div>
        <p style={{ fontSize: 13, color: muted, lineHeight: 1.6, marginBottom: 12 }}>
          {item.desc.split(". ")[0]}.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {item.tags.map(t => (
            <span key={t} style={{ fontSize: 11, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", color: muted, padding: "3px 10px", borderRadius: 8 }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioCard({ item, dark, card, border, text, muted, onOpen }) {
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const previewImg = item.type === "logo" ? item.img : item.logo;

  const onMove = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 8, ry: px * 8 });   // max 8deg tilt (kinetic feel)
  };
  const reset = () => { setHov(false); setTilt({ rx: 0, ry: 0 }); };

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={reset} onMouseMove={onMove}
      onClick={onOpen} style={{
        background: card, border: `1px solid ${hov ? item.color : border}`,
        borderRadius: 20, overflow: "hidden", cursor: "pointer",
        transition: hov ? "border-color 0.3s, box-shadow 0.3s" : "transform 0.5s cubic-bezier(.34,1.4,.64,1), border-color 0.3s, box-shadow 0.3s",
        transformStyle: "preserve-3d",
        transform: `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${hov ? -6 : 0}px)`,
        boxShadow: hov ? `0 16px 40px ${item.color}44` : "none",
      }}>
      {/* Image preview */}
      <div style={{
        height: 200, position: "relative", overflow: "hidden",
        background: item.type === "logo" ? "#ffffff" : `radial-gradient(circle at 40% 40%, ${item.color}33, ${item.color}11)`,
        padding: item.type === "logo" ? 22 : 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {previewImg
          ? <img src={previewImg} alt={item.title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: item.type === "logo" ? "contain" : "cover", transition: "transform 0.4s", transform: hov ? "scale(1.05)" : "scale(1)" }} />
          : <span style={{ fontSize: 56 }}>{item.emoji || "🎨"}</span>
        }
        {/* Hover overlay */}
        <div style={{
          position: "absolute", inset: 0, background: "rgba(124,106,250,0.75)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hov ? 1 : 0, transition: "opacity 0.3s",
        }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "'Poppins',sans-serif" }}>
            {item.type === "social" ? `👁 View ${item.posts?.length} Posts` : "👁 View Project"}
          </span>
        </div>
        <span style={{ position: "absolute", top: 14, left: 14, background: `${item.color}dd`, color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 10 }}>
          {item.tags[0]}
        </span>
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: text }}>{item.title}</h3>
        <p style={{ fontSize: 13, color: muted, lineHeight: 1.6, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {item.tags.map(t => (
            <span key={t} style={{ fontSize: 11, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", color: muted, padding: "3px 10px", borderRadius: 8 }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICES PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function ServicesPage({ dark, card, border, text, muted, bg }) {
  const services = [
    { title: "Brand Identity & Logo Design", tagline: "Brands people remember.", desc: "Distinctive visual identities that resonate with your audience and stand out in a crowded market. From logo systems to brand guidelines.", tools: ["Illustrator", "Photoshop", "Figma"], color: "#FF6B6B", icon: "🏷️",
      deliverables: ["Primary & secondary logos", "Color palette & typography", "Brand guidelines PDF", "Social media kit", "Business card & letterhead"] },
    { title: "Social Media Visuals", tagline: "Content that stops the scroll.", desc: "Scroll-stopping social content crafted for maximum engagement and brand consistency across all platforms.", tools: ["Photoshop", "Illustrator", "Figma"], color: C.teal, icon: "📱",
      deliverables: ["Feed posts & stories", "Campaign banners", "Template sets", "Highlight covers", "Carousel layouts"] },
    { title: "Graphic Design", tagline: "Visuals that communicate clearly.", desc: "From marketing materials to editorial layouts, clear and compelling visuals that deliver your message effectively.", tools: ["Photoshop", "Illustrator", "InDesign"], color: "#F7C948", icon: "🎨",
      deliverables: ["Brochures & flyers", "Posters & banners", "Email templates", "Presentations", "Print-ready files"] },
    { title: "Web Design", tagline: "Websites that work as good as they look.", desc: "Pixel-perfect web designs ready for developer handoff, optimized for conversion and usability.", tools: ["Figma", "Adobe XD", "Photoshop"], color: "#FF8C42", icon: "🖥️",
      deliverables: ["Landing page design", "Multi-page layouts", "Mobile responsive", "Design system", "Dev handoff ready"] },
  ];

  return (
    <div style={{ padding: "120px 5% 80px" }}>
      <Reveal>
        <div style={{ maxWidth: 1100, margin: "0 auto 56px" }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: dark ? C.teal : C.tealDeep, fontWeight: 600, marginBottom: 10 }}>WHAT I OFFER</div>
          <h1 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900 }}>Services</h1>
        </div>
      </Reveal>

      {/* Featured hero card: UI/UX */}
      <Reveal>
        <div style={{ maxWidth: 1100, margin: "0 auto 40px" }}>
          <UIUXHero dark={dark} card={card} border={border} text={text} muted={muted} />
        </div>
      </Reveal>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 24, maxWidth: 1100, margin: "0 auto 60px" }}>
        {services.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <ServiceCard s={s} dark={dark} card={card} border={border} text={text} muted={muted} />
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal>
        <div style={{ textAlign: "center", padding: "40px 24px", background: card, borderRadius: 24, border: `1px solid ${border}`, maxWidth: 600, margin: "0 auto" }}>
          <p style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: text }}>Have a project in mind?</p>
          <p style={{ color: muted, marginBottom: 24, fontSize: 15 }}>Let's bring it to life with thoughtful design.</p>
          <a href="mailto:sameed.dawar@gmail.com" style={{
            display: "inline-block", padding: "13px 30px", borderRadius: 12,
            background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`,
            color: "#fff", fontWeight: 600, fontSize: 15, textDecoration: "none", fontFamily: "'Poppins',sans-serif",
          }}>Get in Touch</a>
        </div>
      </Reveal>
    </div>
  );
}

function UIUXHero({ dark, card, border, text, muted }) {
  const [hov, setHov] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: card, border: `1px solid ${hov ? C.purple : border}`,
      borderRadius: 24, overflow: "hidden", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      transition: "all 0.3s", boxShadow: hov ? `0 16px 48px ${C.purple}33` : "none",
    }}>
      {/* Visual */}
      <div style={{
        background: `radial-gradient(circle at 40% 40%, rgba(124,106,250,0.4), rgba(76,201,168,0.2))`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, minHeight: 260,
        position: "relative",
      }}>
        <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", border: "1px dashed rgba(124,106,250,0.3)" }} />
        <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", border: "1px dashed rgba(76,201,168,0.3)" }} />
        🎛️
      </div>
      {/* Text */}
      <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,106,250,0.12)", border: "1px solid rgba(124,106,250,0.25)", borderRadius: 20, padding: "5px 14px", fontSize: 12, color: C.purple, fontWeight: 600, width: "fit-content", marginBottom: 16 }}>
          ⭐ Featured Service
        </div>
        <h2 style={{ fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 800, marginBottom: 10, color: text }}>UI/UX Design</h2>
        <p style={{ color: C.purple, fontStyle: "italic", fontWeight: 600, marginBottom: 14, fontSize: 15 }}>"Interfaces that feel inevitable."</p>
        <p style={{ color: muted, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
          End-to-end product design for web and mobile — from wireframes to polished prototypes. I turn complexity into clarity through research-backed design decisions.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Figma", "Adobe XD", "Maze"].map(t => (
            <span key={t} style={{ fontSize: 12, background: "rgba(124,106,250,0.12)", color: C.purple, padding: "4px 12px", borderRadius: 10, fontWeight: 500 }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ s, dark, card, border, text, muted }) {
  const [hov, setHov] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: card, border: `1px solid ${hov ? s.color : border}`,
      borderRadius: 20, overflow: "hidden", transition: "all 0.3s",
      transform: hov ? "translateY(-4px)" : "none",
      boxShadow: hov ? `0 12px 32px ${s.color}33` : "none",
    }}>
      <div style={{ height: 4, background: s.color }} />
      <div style={{ padding: "24px" }}>
        <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
        <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: text }}>{s.title}</h3>
        <p style={{ color: s.color, fontStyle: "italic", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{s.tagline}</p>
        <p style={{ color: muted, fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{s.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {s.tools.map(t => (
            <span key={t} style={{ fontSize: 11, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", color: muted, padding: "3px 10px", borderRadius: 8 }}>{t}</span>
          ))}
        </div>
        <button onClick={() => setOpen(o => !o)} style={{
          background: "none", border: `1px solid ${s.color}55`, borderRadius: 8, color: s.color,
          padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins',sans-serif",
          width: "100%", textAlign: "left", transition: "background 0.2s",
        }}>
          {open ? "▲ Hide Deliverables" : "▼ What's Included"}
        </button>
        {open && (
          <ul style={{ marginTop: 12, paddingLeft: 18, color: muted, fontSize: 13, lineHeight: 2 }}>
            {s.deliverables.map(d => <li key={d}>{d}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// REVIEWS PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const INITIAL_REVIEWS = [
  { name: "Ahmed Al-Rashid", role: "CEO, TechVentures", stars: 5, text: "Sameed delivered outstanding UI work for our SaaS platform. His attention to detail, clean design language, and ability to translate complex flows into simple interfaces was remarkable. Highly recommend working with him.", date: "Mar 2025", emoji: "👔" },
  { name: "Sarah Mitchell", role: "Product Manager, Orbit Co.", stars: 5, text: "One of the best designers I've collaborated with. Sameed has a rare ability to balance aesthetics with usability. He brought our dashboard to life with a design system that the entire team loves using.", date: "Jan 2025", emoji: "💼" },
  { name: "Usman Tariq", role: "Founder, Starlet Shoes", stars: 5, text: "Sameed redesigned our entire brand identity and the results were beyond our expectations. From the logo to social media templates, everything felt cohesive and premium.", date: "Aug 2023", emoji: "👟" },
  { name: "Priya Sharma", role: "Marketing Director, DesignThru", stars: 5, text: "Working with Sameed as our Art Director was a game-changer. His visual direction was always on-brand, creative, and high-impact. Our engagement rates went up significantly.", date: "Apr 2024", emoji: "📊" },
  { name: "James O'Connor", role: "CTO, Emenac Travel UK", stars: 4, text: "Sameed was professional, responsive, and delivered quality work consistently. His design sensibility made a huge difference to our travel platform.", date: "Oct 2020", emoji: "✈️" },
  { name: "Fatima Zahra", role: "Creative Lead, Kingdom Joint", stars: 5, text: "A truly versatile designer. Sameed handled everything from illustration to digital marketing visuals with the same level of care and excellence.", date: "Dec 2022", emoji: "🎨" },
];

function ReviewsPage({ dark, card, border, text, muted, bg }) {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", stars: 5, text: "" });
  const [hovStar, setHovStar] = useState(0);

  const avg = (reviews.reduce((a, r) => a + r.stars, 0) / reviews.length).toFixed(1);
  const fivestar = reviews.filter(r => r.stars === 5).length;

  const submit = () => {
    if (!form.name || !form.text) return;
    setReviews(r => [{ ...form, date: "Just now", emoji: "🙂" }, ...r]);
    setForm({ name: "", role: "", stars: 5, text: "" });
    setShowForm(false);
  };

  return (
    <div style={{ padding: "120px 5% 80px" }}>
      <Reveal>
        <div style={{ maxWidth: 1100, margin: "0 auto 48px" }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: dark ? C.teal : C.tealDeep, fontWeight: 600, marginBottom: 10 }}>CLIENT FEEDBACK</div>
          <h1 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, marginBottom: 40 }}>What Clients Say</h1>

          {/* Stats */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 36 }}>
            {[
              { label: "Average Rating", val: `${avg} ★`, color: "#F7C948" },
              { label: "Total Reviews", val: reviews.length, color: dark ? C.teal : C.tealDeep },
              { label: "5-Star Reviews", val: fivestar, color: C.purple },
            ].map(s => (
              <div key={s.label} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "18px 28px", minWidth: 160, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 12, color: muted, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Add review button */}
          <button onClick={() => setShowForm(o => !o)} style={{
            background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, border: "none", borderRadius: 12,
            color: "#fff", padding: "12px 24px", fontFamily: "'Poppins',sans-serif", fontWeight: 600,
            fontSize: 14, cursor: "pointer", marginBottom: showForm ? 24 : 0,
          }}>
            ✦ {showForm ? "Cancel" : "Add Your Review"}
          </button>

          {/* Form */}
          {showForm && (
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: "32px", maxWidth: 560 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 24, fontSize: 18, color: text }}>Leave a Review</h3>
              {[
                { key: "name", label: "Your Name", ph: "John Smith" },
                { key: "role", label: "Role / Company", ph: "Product Manager at XYZ" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, color: muted, display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input value={form[f.key]} onChange={e => setForm(x => ({ ...x, [f.key]: e.target.value }))}
                    placeholder={f.ph} style={{
                      width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid ${border}`,
                      background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", color: text,
                      fontFamily: "'Poppins',sans-serif", fontSize: 14, outline: "none",
                    }} />
                </div>
              ))}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: muted, display: "block", marginBottom: 6 }}>Rating</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} onMouseEnter={() => setHovStar(n)} onMouseLeave={() => setHovStar(0)}
                      onClick={() => setForm(x => ({ ...x, stars: n }))}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: 26, color: n <= (hovStar || form.stars) ? "#F7C948" : muted }}>
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, color: muted, display: "block", marginBottom: 6 }}>Your Review</label>
                <textarea value={form.text} onChange={e => setForm(x => ({ ...x, text: e.target.value }))}
                  placeholder="Share your experience..." rows={4}
                  style={{
                    width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid ${border}`,
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", color: text,
                    fontFamily: "'Poppins',sans-serif", fontSize: 14, outline: "none", resize: "vertical",
                  }} />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={submit} style={{
                  background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, border: "none", borderRadius: 10,
                  color: "#fff", padding: "11px 24px", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer",
                }}>Submit</button>
                <button onClick={() => setShowForm(false)} style={{
                  background: "transparent", border: `1px solid ${border}`, borderRadius: 10,
                  color: muted, padding: "11px 24px", fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 14, cursor: "pointer",
                }}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </Reveal>

      {/* Review cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
        {reviews.map((r, i) => (
          <Reveal key={i} delay={(i % 3) * 0.08}>
            <ReviewCard r={r} card={card} border={border} text={text} muted={muted} dark={dark} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ r, card, border, text, muted, dark }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: card, border: `1px solid ${hov ? "rgba(247,201,72,0.4)" : border}`,
      borderRadius: 20, padding: "28px 24px", transition: "all 0.3s",
      transform: hov ? "translateY(-5px)" : "none",
      boxShadow: hov ? "0 12px 36px rgba(247,201,72,0.15)" : "none",
    }}>
      {/* Stars */}
      <div style={{ fontSize: 18, color: "#F7C948", marginBottom: 14, letterSpacing: 2 }}>
        {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}
      </div>
      <p style={{ color: muted, fontStyle: "italic", lineHeight: 1.7, fontSize: 14, marginBottom: 20 }}>
        &ldquo;{r.text}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%", fontSize: 22,
          background: "rgba(124,106,250,0.12)", display: "flex", alignItems: "center", justifyContent: "center",
          border: "2px solid rgba(124,106,250,0.2)",
        }}>{r.emoji}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: text }}>{r.name}</div>
          <div style={{ fontSize: 12, color: muted }}>{r.role}</div>
        </div>
        <span style={{ marginLeft: "auto", fontSize: 11, color: muted }}>{r.date}</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function ContactPage({ dark, card, border, text, muted, bg }) {
  return (
    <div style={{ padding: "120px 5% 80px", textAlign: "center" }}>
      <Reveal>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(32px,5vw,64px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
            Have a project<br />
            <span style={{ background: `linear-gradient(135deg,${C.purple},${C.teal})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>in mind?</span>
          </h1>
          <p style={{ color: muted, fontSize: 16, lineHeight: 1.7, marginBottom: 56 }}>
            Let's talk. Whether you have a fully-formed brief or just an idea, I'd love to hear about your project.
          </p>
        </div>
      </Reveal>

      <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", maxWidth: 700, margin: "0 auto 80px" }}>
        {[
          { icon: "✉️", label: "Email", val: "sameed.dawar@gmail.com", href: "mailto:sameed.dawar@gmail.com", color: C.purple },
        ].map(c => (
          <Reveal key={c.label} delay={0.1}>
            <ContactTile c={c} card={card} border={border} text={text} muted={muted} dark={dark} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <ContactForm dark={dark} card={card} border={border} text={text} muted={muted} />
      </Reveal>
    </div>
  );
}

function ContactForm({ dark, card, border, text, muted }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const valid = form.name.trim() && form.email.trim() && form.message.trim();

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    const subject = encodeURIComponent(`New project inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:sameed.dawar@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field = {
    width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${border}`,
    background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", color: text,
    fontFamily: "'Poppins',sans-serif", fontSize: 14, outline: "none",
  };
  const lab = { fontSize: 13, color: muted, display: "block", marginBottom: 6, textAlign: "left" };

  return (
    <form onSubmit={submit} style={{
      background: card, border: `1px solid ${border}`, borderRadius: 24,
      padding: "32px", maxWidth: 560, margin: "0 auto 80px", textAlign: "left",
    }}>
      <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: 18, color: text, textAlign: "center" }}>Send a message</h3>
      <div style={{ marginBottom: 16 }}>
        <label style={lab}>Your Name</label>
        <input value={form.name} onChange={e => setForm(x => ({ ...x, name: e.target.value }))} placeholder="Jane Doe" style={field} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={lab}>Your Email</label>
        <input type="email" value={form.email} onChange={e => setForm(x => ({ ...x, email: e.target.value }))} placeholder="jane@company.com" style={field} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={lab}>Message</label>
        <textarea value={form.message} onChange={e => setForm(x => ({ ...x, message: e.target.value }))} placeholder="Tell me about your project..." rows={4} style={{ ...field, resize: "vertical" }} />
      </div>
      <button type="submit" disabled={!valid} style={{
        width: "100%", background: valid ? `linear-gradient(135deg, ${C.purple}, ${C.teal})` : "rgba(124,106,250,0.3)",
        border: "none", borderRadius: 12, color: "#fff", padding: "13px 24px",
        fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15,
        cursor: valid ? "pointer" : "not-allowed",
      }}>Send Message</button>
      {sent && (
        <p style={{ marginTop: 14, fontSize: 13, color: C.teal, textAlign: "center" }}>
          Your email app should have opened with the message ready to send. If not, email me directly at sameed.dawar@gmail.com.
        </p>
      )}
    </form>
  );
}

function ContactTile({ c, card, border, text, muted, dark }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={c.href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        background: card, border: `2px solid ${hov ? c.color : border}`,
        borderRadius: 24, padding: "36px 40px", textDecoration: "none", minWidth: 240,
        transition: "all 0.3s", transform: hov ? "translateY(-6px)" : "none",
        boxShadow: hov ? `0 16px 40px ${c.color}33` : "none",
      }}>
      <div style={{ fontSize: 36 }}>{c.icon}</div>
      <div style={{ fontSize: 13, color: muted, fontWeight: 500 }}>{c.label}</div>
      <div style={{ fontWeight: 700, fontSize: 15, color: hov ? c.color : text }}>{c.val}</div>
    </a>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════════
function Footer({ dark, card, border, text, muted }) {
  return (
    <footer style={{
      borderTop: `1px solid ${border}`, padding: "32px 5%",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
      background: dark ? "rgba(13,13,26,0.8)" : "rgba(245,245,255,0.9)",
    }}>
      <LogoSVG height={28} dark={dark} />
      <p style={{ color: muted, fontSize: 13 }}>
        © {new Date().getFullYear()} Sameed Bin Dawar — Designed with intention.
      </p>
      <div style={{ display: "flex", gap: 16 }}>
        {[
          { href: "https://www.linkedin.com/in/sameed-dawar-4b3144218", color: C.linkedin, label: "in" },
          { href: "https://www.behance.net/sameeddawar", color: C.behance, label: "Bē" },
          { href: "mailto:sameed.dawar@gmail.com", color: C.purple, label: "✉" },
        ].map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
            style={{
              width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              background: `${l.color}22`, color: l.color, textDecoration: "none", fontWeight: 700, fontSize: 14,
              border: `1px solid ${l.color}44`, transition: "background 0.2s",
            }}>{l.label}</a>
        ))}
      </div>
    </footer>
  );
}

// ── Section label helper ───────────────────────────────────────────────────────
function SectionLabel({ label, dark = true }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto 12px" }}>
      <span style={{ fontSize: 11, letterSpacing: 3, color: dark ? C.teal : C.tealDeep, fontWeight: 700 }}>{label.toUpperCase()}</span>
    </div>
  );
}
