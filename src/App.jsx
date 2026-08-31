import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import HeroUIPanels from "./components/HeroUIPanels";
import { PHOTO_SRC } from "./assets/images";
import { C, FONT, RADIUS, SHADOW, PAGE } from "./theme";
import {
  useSmoothScroll, scrollToTop, Reveal, Stagger, StaggerItem,
  SplitWords, PageTransition, Cursor, motion,
} from "./motion";
import {
  logos, socialProjects, uiuxProjects, experience, education,
  services, initialReviews, skills,
} from "./data";

const NAV = ["Home", "Portfolio", "Services", "Reviews", "Contact"];
const EMAIL = "sameed.dawar@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/sameed-dawar-4b3144218";
const BEHANCE = "https://www.behance.net/sameeddawar";

// ═══════════════════════════════════════════════════════════════════════════════
// PRIMITIVES
// ═══════════════════════════════════════════════════════════════════════════════

function Wordmark({ size = 17 }) {
  return (
    <span style={{ fontFamily: FONT.display, fontSize: size + 5, letterSpacing: "-0.2px", color: C.ink, lineHeight: 1 }}>
      Sameed<span style={{ color: C.accent }}>.</span>
    </span>
  );
}

function Btn({ label, primary, onClick, href, external }) {
  const [hov, setHov] = useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "13px 26px", borderRadius: 999, cursor: "pointer",
    fontFamily: FONT.sans, fontWeight: 600, fontSize: 14, letterSpacing: "-0.1px",
    textDecoration: "none", border: "1px solid transparent",
    transition: "transform .3s cubic-bezier(.22,1,.36,1), background .25s, color .25s, border-color .25s",
    transform: hov ? "translateY(-2px)" : "none",
  };
  const style = primary
    ? { ...base, background: hov ? C.accent : C.ink, color: "#fff" }
    : { ...base, background: hov ? C.ink : "transparent", color: hov ? "#fff" : C.ink, borderColor: hov ? C.ink : C.lineStrong };
  const on = { onMouseEnter: () => setHov(true), onMouseLeave: () => setHov(false) };
  if (href) {
    return <a href={href} {...on} style={style} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {label}<span aria-hidden="true" style={{ transform: hov ? "translateX(3px)" : "none", transition: "transform .3s" }}>→</span>
    </a>;
  }
  return <button onClick={onClick} {...on} style={style}>
    {label}<span aria-hidden="true" style={{ transform: hov ? "translateX(3px)" : "none", transition: "transform .3s" }}>→</span>
  </button>;
}

function SectionHead({ index, label, title, lead, align = "left" }) {
  return (
    <div style={{ maxWidth: align === "center" ? 720 : 780, margin: align === "center" ? "0 auto 44px" : "0 0 44px", textAlign: align }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, marginBottom: 18,
        justifyContent: align === "center" ? "center" : "flex-start",
      }}>
        {index && index !== "—" && (
          <>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1.6px", color: C.faint, fontVariantNumeric: "tabular-nums" }}>{index}</span>
            <span style={{ width: 22, height: 1, background: C.lineStrong }} />
          </>
        )}
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1.6px", textTransform: "uppercase", color: C.muted }}>{label}</span>
      </div>
      <h2 style={{
        fontFamily: FONT.display, fontWeight: 400,
        fontSize: "clamp(34px, 5vw, 60px)", lineHeight: 1.02, letterSpacing: "-1px", color: C.ink,
      }}>{title}</h2>
      {lead && <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7, color: C.muted, maxWidth: 560, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>{lead}</p>}
    </div>
  );
}

function Chip({ children, tone = "neutral" }) {
  const tones = {
    neutral: { background: "rgba(14,14,18,0.045)", color: C.muted, border: "1px solid transparent" },
    accent: { background: C.accentSoft, color: C.accent, border: `1px solid ${C.accentLine}` },
    outline: { background: "transparent", color: C.muted, border: `1px solid ${C.line}` },
  };
  return (
    <span style={{
      ...tones[tone], fontSize: 11.5, fontWeight: 500, padding: "4px 11px",
      borderRadius: 999, whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

// Card surface with a hairline that warms to the accent on hover.
function Surface({ children, hov, style = {}, ...rest }) {
  return (
    <div {...rest} style={{
      background: C.surface,
      border: `1px solid ${hov ? C.accentLine : C.line}`,
      borderRadius: RADIUS.lg,
      boxShadow: hov ? SHADOW.hover : SHADOW.rest,
      transform: hov ? "translateY(-4px)" : "none",
      transition: "transform .45s cubic-bezier(.22,1,.36,1), box-shadow .45s, border-color .3s",
      ...style,
    }}>{children}</div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP SHELL
// ═══════════════════════════════════════════════════════════════════════════════

export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menu, setMenu] = useState(false);

  useSmoothScroll();

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrolled(el.scrollTop > 24);
      setProgress((el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.title = "Sameed Bin Dawar — UI & Graphic Designer";
    const setMeta = (name, content, prop) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement("meta"); prop ? el.setAttribute("property", name) : el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Sameed Bin Dawar is a UI & Graphic Designer with 6+ years of experience crafting SaaS products, brand identities, and social media visuals for startups and businesses worldwide.");
    setMeta("keywords", "UI Designer, Graphic Designer, Sameed Bin Dawar, SaaS Design, Brand Identity, Logo Design, Figma, Lahore Designer");
    setMeta("theme-color", "#F6F5F2");
    setMeta("og:title", "Sameed Bin Dawar — UI & Graphic Designer", true);
    setMeta("og:description", "6+ years designing clean, scalable digital products and brand identities. Available for freelance.", true);
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Sameed Bin Dawar — UI & Graphic Designer");
  }, []);

  const go = (p) => { setPage(p); setMenu(false); scrollToTop(); };

  return (
    <div className="grain" style={{ background: C.bg, color: C.ink, minHeight: "100vh", position: "relative" }}>
      <Cursor />

      <a href="#main" style={{
        position: "absolute", left: -9999, top: 8, zIndex: 10001,
        background: C.ink, color: "#fff", padding: "10px 18px", borderRadius: 8, fontSize: 14,
      }} onFocus={e => { e.target.style.left = "16px"; }} onBlur={e => { e.target.style.left = "-9999px"; }}>
        Skip to content
      </a>

      <div style={{ position: "fixed", top: 0, left: 0, height: 2, width: `${progress}%`, background: C.accent, zIndex: 9999, transition: "width .1s linear" }} />

      <Nav page={page} go={go} scrolled={scrolled} menu={menu} setMenu={setMenu} />

      <main id="main" style={{ position: "relative", zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <PageTransition pageKey={page}>
            {page === "home" && <HomePage go={go} />}
            {page === "portfolio" && <PortfolioPage />}
            {page === "services" && <ServicesPage />}
            {page === "reviews" && <ReviewsPage />}
            {page === "contact" && <ContactPage />}
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer go={go} />
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav({ page, go, scrolled, menu, setMenu }) {
  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        background: scrolled ? "rgba(246,245,242,0.78)" : "transparent",
        backdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
        borderBottom: `1px solid ${scrolled ? C.line : "transparent"}`,
        transition: "background .4s, border-color .4s, backdrop-filter .4s",
      }}>
        <div style={{ ...PAGE, display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <button onClick={() => go("home")} aria-label="Go to home"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <Wordmark />
          </button>

          <nav aria-label="Primary" className="desk-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV.map(n => {
              const active = page === n.toLowerCase();
              return (
                <button key={n} onClick={() => go(n.toLowerCase())} style={{
                  background: "none", border: "none", cursor: "pointer", position: "relative",
                  fontFamily: FONT.sans, fontSize: 14, fontWeight: active ? 600 : 450,
                  color: active ? C.ink : C.muted, padding: "8px 14px",
                  transition: "color .25s",
                }}>
                  {n}
                  {active && <motion.span layoutId="nav-dot" style={{
                    position: "absolute", left: "50%", bottom: 1, width: 4, height: 4,
                    borderRadius: "50%", background: C.accent, translateX: "-50%",
                  }} />}
                </button>
              );
            })}
          </nav>

          <div className="desk-nav" style={{ display: "flex" }}>
            <Btn label="Get in touch" primary onClick={() => go("contact")} />
          </div>

          <button className="mob-nav" onClick={() => setMenu(m => !m)} aria-expanded={menu}
            aria-label="Toggle navigation menu" style={{
              display: "none", background: "none", border: `1px solid ${C.lineStrong}`,
              borderRadius: 10, width: 42, height: 42, cursor: "pointer", color: C.ink,
              alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4,
            }}>
            <span style={{ display: "block", width: 16, height: 1.5, background: C.ink, transform: menu ? "translateY(3px) rotate(45deg)" : "none", transition: "transform .3s" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: C.ink, transform: menu ? "translateY(-2px) rotate(-45deg)" : "none", transition: "transform .3s" }} />
          </button>
        </div>
      </header>

      {/* Mobile sheet */}
      <div style={{
        position: "fixed", top: 72, left: 0, right: 0, zIndex: 899,
        background: "rgba(246,245,242,0.98)", backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${C.line}`, padding: "8px clamp(20px,5vw,48px) 20px",
        transform: menu ? "translateY(0)" : "translateY(-115%)",
        opacity: menu ? 1 : 0, pointerEvents: menu ? "auto" : "none",
        transition: "transform .4s cubic-bezier(.22,1,.36,1), opacity .3s",
      }}>
        {NAV.map(n => (
          <button key={n} onClick={() => go(n.toLowerCase())} style={{
            display: "block", width: "100%", textAlign: "left", background: "none", border: "none",
            borderBottom: `1px solid ${C.line}`, padding: "16px 4px", cursor: "pointer",
            fontFamily: FONT.display, fontSize: 26, color: page === n.toLowerCase() ? C.accent : C.ink,
          }}>{n}</button>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desk-nav { display: none !important; }
          .mob-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════════════════════════
function HomePage({ go }) {
  return (
    <>
      <Hero go={go} />
      <About />
      <Experience />
      <Education />
    </>
  );
}

function Hero({ go }) {
  const marquee = [...skills, ...skills];
  return (
    <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Soft colour wash — the light-theme replacement for the old particle field */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", right: "-6%", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,58,255,0.10), transparent 68%)", filter: "blur(20px)", animation: "washDrift 16s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-14%", left: "-8%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,159,110,0.09), transparent 68%)", filter: "blur(20px)", animation: "washDrift 21s ease-in-out infinite reverse" }} />
      </div>

      <div style={{ ...PAGE, position: "relative", zIndex: 3, width: "100%", flex: 1, display: "flex", alignItems: "center", paddingTop: 108, paddingBottom: 44 }}>
        <div className="hero-grid" style={{ width: "100%", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 40, alignItems: "center" }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 9, marginBottom: 26, padding: "6px 14px 6px 10px", borderRadius: 999, border: `1px solid ${C.line}`, background: C.surface, fontSize: 12.5, color: C.inkSoft, fontWeight: 500 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.teal, boxShadow: `0 0 0 3px rgba(14,159,110,0.15)` }} />
              Available for freelance
            </motion.div>

            <h1 style={{
              fontFamily: FONT.display, fontWeight: 400, color: C.ink,
              fontSize: "clamp(48px, 8.2vw, 104px)", lineHeight: 0.94, letterSpacing: "-2.5px", marginBottom: 26,
            }}>
              <SplitWords text="Sameed Bin Dawar" delay={0.12} />
            </h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .55 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
                <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "1.4px", textTransform: "uppercase", color: C.accent }}>UI &amp; Graphic Designer</span>
                <span style={{ width: 28, height: 1, background: C.lineStrong }} />
                <span style={{ fontSize: 14, color: C.muted }}>6+ years</span>
              </div>

              <p style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.75, color: C.inkSoft, maxWidth: 480, marginBottom: 36 }}>
                Need a mobile app, SaaS product, or brand designed? I craft interfaces
                and visuals that look great and work even better.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Btn label="See selected work" primary onClick={() => go("portfolio")} />
                <Btn label="Start a project" onClick={() => go("contact")} />
              </div>
            </motion.div>
          </div>

          <motion.div className="hero-panels" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: .3 }} style={{ position: "relative", minHeight: 400, maxHeight: 460 }}>
            <HeroUIPanels />
          </motion.div>
        </div>
      </div>

      {/* Skills marquee */}
      <div aria-hidden="true" style={{
        position: "relative", zIndex: 3, flexShrink: 0,
        borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
        background: "rgba(255,255,255,0.55)", overflow: "hidden", padding: "14px 0",
      }}>
        <div style={{ display: "flex", width: "max-content", animation: "marquee 34s linear infinite" }}>
          {marquee.map((s, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 26, paddingRight: 26, fontSize: 13, color: C.muted, letterSpacing: ".4px", whiteSpace: "nowrap" }}>
              {s}<span style={{ width: 4, height: 4, borderRadius: "50%", background: C.accentLine }} />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-panels { display: none !important; }
        }
      `}</style>
    </section>
  );
}

function About() {
  return (
    <section style={{ padding: "clamp(80px,10vw,140px) 0", background: C.bgAlt, borderTop: `1px solid ${C.line}` }}>
      <div style={PAGE}>
        <Reveal><SectionHead index="01" label="About" title="Designing with purpose & precision." /></Reveal>

        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "clamp(32px,5vw,72px)", alignItems: "start" }}>
          <Reveal>
            <figure style={{ position: "relative" }}>
              <div style={{ borderRadius: RADIUS.xl, overflow: "hidden", aspectRatio: "4/5", background: C.surfaceSunk, border: `1px solid ${C.line}` }}>
                {PHOTO_SRC
                  ? <img src={PHOTO_SRC} alt="Sameed Bin Dawar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ display: "grid", placeItems: "center", height: "100%", color: C.faint }}>Portrait</div>}
              </div>
              <figcaption style={{
                position: "absolute", left: 18, right: 18, bottom: 18, display: "flex", alignItems: "center", gap: 12,
                background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)",
                border: `1px solid ${C.line}`, borderRadius: RADIUS.md, padding: "12px 16px",
              }}>
                <span style={{ fontFamily: FONT.display, fontSize: 30, lineHeight: 1, color: C.accent }}>6+</span>
                <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.4 }}>years designing<br />products &amp; brands</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.75, color: C.inkSoft, marginBottom: 22 }}>
              I design clean, scalable SaaS products and digital experiences for startups and growing
              businesses around the world. With a background in graphic design and hands-on UI/UX
              experience, I focus on creating products that balance visual quality with real usability —
              not just designs that look good, but experiences that feel intuitive and work seamlessly.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.muted, marginBottom: 36 }}>
              From dashboards and web apps to design systems and brand-focused interfaces, I value
              clarity, consistency, and thoughtful execution. I believe good design should simplify
              things, support business growth, and create a better experience for the people using it.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 34 }}>
              {skills.map(s => <Chip key={s} tone="outline">{s}</Chip>)}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Btn label="LinkedIn" href={LINKEDIN} external />
              <Btn label="Behance" href={BEHANCE} external />
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media (max-width: 900px){ .about-grid{ grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

function Experience() {
  return (
    <section style={{ padding: "clamp(80px,10vw,140px) 0" }}>
      <div style={PAGE}>
        <Reveal><SectionHead index="02" label="Experience" title="Work history" /></Reveal>
        <Stagger style={{ borderTop: `1px solid ${C.line}` }}>
          {experience.map((e, i) => <StaggerItem key={i}><ExperienceRow e={e} n={i + 1} /></StaggerItem>)}
        </Stagger>
      </div>
    </section>
  );
}

function ExperienceRow({ e, n }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="exp-row" style={{
        display: "grid", gridTemplateColumns: "48px 1.1fr 1.4fr auto", gap: 24, alignItems: "baseline",
        padding: "26px 12px", borderBottom: `1px solid ${C.line}`,
        background: hov ? C.surface : "transparent",
        transition: "background .35s, padding-left .35s",
        paddingLeft: hov ? 22 : 12,
      }}>
      <span style={{ fontSize: 12, color: C.faint, fontVariantNumeric: "tabular-nums" }}>{String(n).padStart(2, "0")}</span>
      <div>
        <div style={{ fontFamily: FONT.display, fontSize: 24, lineHeight: 1.15, color: C.ink }}>{e.role}</div>
        <div style={{ fontSize: 13.5, color: C.accent, fontWeight: 500, marginTop: 4 }}>{e.company}</div>
      </div>
      <p style={{ fontSize: 14.5, lineHeight: 1.7, color: C.muted }}>{e.desc}</p>
      <span style={{ fontSize: 12.5, color: C.muted, whiteSpace: "nowrap" }}>{e.period}</span>
      <style>{`@media (max-width: 860px){ .exp-row{ grid-template-columns: 1fr !important; gap:10px !important; } }`}</style>
    </div>
  );
}

function Education() {
  return (
    <section style={{ padding: "clamp(80px,10vw,140px) 0", background: C.bgAlt, borderTop: `1px solid ${C.line}` }}>
      <div style={PAGE}>
        <Reveal><SectionHead index="03" label="Education" title="Academic background" /></Reveal>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 20 }}>
          {education.map((e, i) => <StaggerItem key={i}><EduCard e={e} /></StaggerItem>)}
        </Stagger>
      </div>
    </section>
  );
}

function EduCard({ e }) {
  const [hov, setHov] = useState(false);
  return (
    <Surface hov={hov} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: "28px 26px", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        <span style={{ fontSize: 12, color: C.faint, letterSpacing: ".6px" }}>{e.period}</span>
        <span style={{
          fontFamily: FONT.display, fontSize: 26, lineHeight: 1, color: hov ? C.accent : C.ink, transition: "color .3s",
        }}>{e.grade}</span>
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4, color: C.ink, marginBottom: 8 }}>{e.degree}</div>
      <div style={{ fontSize: 13.5, color: C.muted }}>{e.school}</div>
    </Surface>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PORTFOLIO
// ═══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { key: "all", label: "All work" },
  { key: "uiux", label: "UI/UX" },
  { key: "logo", label: "Logo" },
  { key: "social", label: "Social media" },
];

function PortfolioPage() {
  const [tab, setTab] = useState("uiux");
  const [lightbox, setLightbox] = useState(null);

  const all = [
    ...logos.map(l => ({ ...l, category: "logo", type: "logo" })),
    ...socialProjects.map(s => ({ ...s, category: "social", type: "social" })),
  ];
  const filtered = tab === "all" ? all : all.filter(i => i.category === tab);
  const showUIUX = tab === "uiux" || tab === "all";

  const openUIUX = (item) => setLightbox({
    images: [...item.shots, item.full], index: 0, title: item.title, desc: item.desc,
    browser: true, url: item.url, subtitle: item.subtitle, role: item.role,
    highlights: item.highlights, accent: item.color, tallIndex: item.shots.length,
  });
  const openMedia = (item) => setLightbox(item.type === "logo"
    ? { images: [item.img], index: 0, title: item.title, desc: item.desc, light: true }
    : { images: item.posts, index: 0, title: item.title, desc: item.desc });

  return (
    <div style={{ paddingTop: 128, paddingBottom: "clamp(80px,10vw,140px)" }}>
      {lightbox && <Lightbox lightbox={lightbox} setLightbox={setLightbox} />}

      <div style={PAGE}>
        <Reveal>
          <SectionHead index="—" label="Selected work" title="Portfolio"
            lead="Product interfaces, brand marks and social campaigns — six years of client work, grouped by discipline." />
        </Reveal>

        <Reveal>
          <div role="tablist" aria-label="Portfolio filters" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 44, borderBottom: `1px solid ${C.line}`, paddingBottom: 2 }}>
            {TABS.map(t => {
              const on = tab === t.key;
              return (
                <button key={t.key} role="tab" aria-selected={on} onClick={() => setTab(t.key)} style={{
                  background: "none", border: "none", cursor: "pointer", position: "relative",
                  padding: "10px 16px", fontFamily: FONT.sans, fontSize: 14,
                  fontWeight: on ? 600 : 450, color: on ? C.ink : C.muted, transition: "color .25s",
                }}>
                  {t.label}
                  {on && <motion.span layoutId="tab-underline" style={{
                    position: "absolute", left: 12, right: 12, bottom: -2, height: 2, background: C.accent, borderRadius: 2,
                  }} />}
                </button>
              );
            })}
          </div>
        </Reveal>

        {showUIUX && (
          <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: 24, marginBottom: tab === "all" ? 64 : 0 }}>
            {uiuxProjects.map((item, i) => (
              <StaggerItem key={`u${i}`}><UIUXCard item={item} onOpen={() => openUIUX(item)} /></StaggerItem>
            ))}
          </Stagger>
        )}

        {tab !== "uiux" && (
          <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 24 }}>
            {filtered.map((item, i) => (
              <StaggerItem key={`${tab}${i}`}><MediaCard item={item} onOpen={() => openMedia(item)} /></StaggerItem>
            ))}
          </Stagger>
        )}

        <Reveal>
          <div style={{ textAlign: "center", marginTop: 64 }}>
            <Btn label="See more on Behance" href={BEHANCE} external />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ── Browser chrome ────────────────────────────────────────────────────────────
function BrowserFrame({ url, children, compact = false, style = {} }) {
  return (
    <div style={{
      width: "100%", borderRadius: compact ? 10 : 14, overflow: "hidden",
      background: "#fff", border: `1px solid ${C.line}`,
      boxShadow: compact ? "0 14px 30px -16px rgba(14,14,18,0.35)" : "0 30px 70px -30px rgba(14,14,18,0.45)",
      display: "flex", flexDirection: "column", minHeight: 0, ...style,
    }}>
      <div style={{
        height: compact ? 28 : 36, flexShrink: 0, background: C.surfaceSunk,
        borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center",
        gap: 8, padding: compact ? "0 10px" : "0 12px",
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
            <span key={c} style={{ width: compact ? 7 : 9, height: compact ? 7 : 9, borderRadius: "50%", background: c, display: "block" }} />
          ))}
        </div>
        <div style={{
          flex: 1, height: compact ? 15 : 20, borderRadius: 999, background: "#fff",
          border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center",
          gap: 6, fontSize: compact ? 8.5 : 11, color: C.faint, padding: "0 10px",
          overflow: "hidden", whiteSpace: "nowrap",
        }}>
          <span aria-hidden="true" style={{ fontSize: compact ? 7 : 9 }}>🔒</span>{url}
        </div>
      </div>
      {children}
    </div>
  );
}

// UI/UX card — the full-page design scrolls inside the browser frame on hover.
function UIUXCard({ item, onOpen }) {
  const [hov, setHov] = useState(false);
  const VIEW = 200;
  return (
    <Surface hov={hov}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onOpen} role="button" tabIndex={0}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
      aria-label={`${item.title} — open project gallery`}
      style={{ overflow: "hidden", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>

      <div style={{ position: "relative", padding: "26px 22px 0", background: C.surfaceSunk, borderBottom: `1px solid ${C.line}` }}>
        <BrowserFrame url={item.url} compact style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: "none" }}>
          <div style={{ height: VIEW, overflow: "hidden", background: "#fff" }}>
            <img src={item.full} alt={`${item.title} website design`} loading="lazy" decoding="async"
              style={{
                width: "100%", display: "block",
                transform: hov ? `translateY(calc(-100% + ${VIEW}px))` : "translateY(0)",
                transition: hov ? "transform 9s linear" : "transform .8s cubic-bezier(.22,1,.36,1)",
              }} />
          </div>
        </BrowserFrame>
        <span style={{
          position: "absolute", top: 12, right: 22, background: "rgba(255,255,255,0.92)",
          border: `1px solid ${C.line}`, color: C.muted, fontSize: 11, fontWeight: 500,
          padding: "3px 9px", borderRadius: 999,
        }}>{item.shots.length + 1} screens</span>
      </div>

      <div style={{ padding: "20px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
          <h3 style={{ fontFamily: FONT.display, fontSize: 23, lineHeight: 1.15, color: C.ink }}>{item.title}</h3>
          <span aria-hidden="true" style={{ color: hov ? C.accent : C.faint, transition: "color .3s, transform .3s", transform: hov ? "translate(2px,-2px)" : "none", fontSize: 15 }}>↗</span>
        </div>
        <div style={{ fontSize: 12.5, color: C.accent, fontWeight: 500, margin: "5px 0 10px" }}>{item.subtitle}</div>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: C.muted, marginBottom: 16, flex: 1 }}>
          {item.desc.split(". ")[0]}.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {item.tags.map(t => <Chip key={t}>{t}</Chip>)}
        </div>
      </div>
    </Surface>
  );
}

function MediaCard({ item, onOpen }) {
  const [hov, setHov] = useState(false);
  const img = item.type === "logo" ? item.img : item.logo;
  return (
    <Surface hov={hov} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onOpen} role="button" tabIndex={0}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
      aria-label={`${item.title} — open gallery`}
      style={{ overflow: "hidden", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{
        height: 210, position: "relative", overflow: "hidden",
        background: item.type === "logo" ? "#fff" : C.surfaceSunk,
        borderBottom: `1px solid ${C.line}`, padding: item.type === "logo" ? 26 : 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <img src={img} alt={item.title} loading="lazy" decoding="async" style={{
          width: "100%", height: "100%", objectFit: item.type === "logo" ? "contain" : "cover",
          transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform .6s cubic-bezier(.22,1,.36,1)",
        }} />
        <span style={{
          position: "absolute", left: 14, top: 14, background: "rgba(255,255,255,0.92)",
          border: `1px solid ${C.line}`, color: C.muted, fontSize: 11, padding: "3px 9px", borderRadius: 999,
        }}>{item.tags[0]}</span>
        <span style={{
          position: "absolute", right: 14, bottom: 14, background: C.ink, color: "#fff",
          fontSize: 11.5, fontWeight: 500, padding: "6px 12px", borderRadius: 999,
          opacity: hov ? 1 : 0, transform: hov ? "translateY(0)" : "translateY(6px)",
          transition: "opacity .3s, transform .3s",
        }}>{item.type === "social" ? `View ${item.posts?.length} posts` : "View project"}</span>
      </div>
      <div style={{ padding: "18px 20px 22px", flex: 1 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: C.ink, marginBottom: 7 }}>{item.title}</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: C.muted, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {item.tags.map(t => <Chip key={t}>{t}</Chip>)}
        </div>
      </div>
    </Surface>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ lightbox, setLightbox }) {
  const { images, index, title, desc, light, browser, url, tallIndex, subtitle, role, highlights } = lightbox;
  const [current, setCurrent] = useState(index);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setCurrent(c => Math.min(c + 1, images.length - 1));
      if (e.key === "ArrowLeft") setCurrent(c => Math.max(c - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [images.length, setLightbox]);

  const navBtn = (side, disabled, onClick, label, glyph) => (
    <button onClick={onClick} disabled={disabled} aria-label={label} style={{
      position: "absolute", [side]: 14, top: "50%", transform: "translateY(-50%)", zIndex: 3,
      width: 42, height: 42, borderRadius: "50%", cursor: disabled ? "not-allowed" : "pointer",
      background: "rgba(255,255,255,0.94)", border: `1px solid ${C.line}`, color: C.ink,
      fontSize: 17, opacity: disabled ? 0.35 : 1, boxShadow: SHADOW.rest,
    }}>{glyph}</button>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setLightbox(null)}
      role="dialog" aria-modal="true" aria-label={`${title} — project gallery`} style={{
        position: "fixed", inset: 0, zIndex: 9998, background: "rgba(20,20,24,0.45)",
        backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(12px,3vw,32px)",
      }}>
      <motion.div initial={{ opacity: 0, y: 18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()} style={{
          background: C.bg, borderRadius: RADIUS.xl, overflow: "hidden",
          maxWidth: browser ? 1040 : 880, width: "100%", maxHeight: "92vh",
          height: browser ? "92vh" : "auto", display: "flex", flexDirection: "column",
          border: `1px solid ${C.line}`, boxShadow: SHADOW.lift,
        }}>

        <div style={{ padding: "18px 24px", flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, borderBottom: `1px solid ${C.line}`, background: C.surface }}>
          <div>
            <h3 style={{ fontFamily: FONT.display, fontSize: 24, lineHeight: 1.1, color: C.ink }}>{title}</h3>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 4, flexWrap: "wrap" }}>
              {subtitle && <span style={{ fontSize: 12.5, color: C.accent, fontWeight: 500 }}>{subtitle}</span>}
              {images.length > 1 && (
                <span style={{ fontSize: 12, color: C.faint }}>
                  {current + 1} / {images.length}{browser && current === tallIndex ? " · full page" : ""}
                </span>
              )}
            </div>
          </div>
          <button ref={closeRef} onClick={() => setLightbox(null)} aria-label="Close gallery" style={{
            flexShrink: 0, width: 38, height: 38, borderRadius: "50%", cursor: "pointer",
            background: "transparent", border: `1px solid ${C.lineStrong}`, color: C.ink, fontSize: 15,
          }}>✕</button>
        </div>

        <div style={{
          flex: "1 1 auto", minHeight: browser ? 200 : 300, overflow: "hidden", position: "relative",
          background: browser ? C.bgAlt : light ? "#fff" : C.surfaceSunk,
          display: "flex", alignItems: browser ? "stretch" : "center", justifyContent: "center",
          padding: browser ? 18 : light ? 32 : 12,
        }}>
          {browser ? (
            <BrowserFrame url={url}>
              <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden", background: "#fff" }}>
                <img src={images[current]} alt={`${title} — screen ${current + 1}`} style={{ width: "100%", display: "block" }} />
              </div>
            </BrowserFrame>
          ) : (
            <img src={images[current]} alt={title} style={{ maxWidth: "100%", maxHeight: "62vh", objectFit: "contain" }} />
          )}
          {browser && current === tallIndex && (
            <div aria-hidden="true" style={{
              position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)",
              background: "rgba(255,255,255,0.94)", border: `1px solid ${C.line}`, color: C.muted,
              fontSize: 11.5, padding: "6px 13px", borderRadius: 999, pointerEvents: "none", boxShadow: SHADOW.rest,
            }}>scroll to explore the full page ↓</div>
          )}
          {images.length > 1 && (
            <>
              {navBtn("left", current === 0, () => setCurrent(c => Math.max(c - 1, 0)), "Previous image", "‹")}
              {navBtn("right", current === images.length - 1, () => setCurrent(c => Math.min(c + 1, images.length - 1)), "Next image", "›")}
            </>
          )}
        </div>

        {images.length > 1 && (
          <div style={{ display: "flex", gap: 8, padding: "12px 20px", flexShrink: 0, overflowX: "auto", borderTop: `1px solid ${C.line}`, background: C.surface }}>
            {images.map((img, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to screen ${i + 1}`} style={{
                flexShrink: 0, padding: 0, borderRadius: 8, cursor: "pointer", lineHeight: 0,
                border: i === current ? `2px solid ${C.accent}` : `1px solid ${C.line}`,
                opacity: i === current ? 1 : 0.6, background: "#fff", transition: "opacity .2s",
              }}>
                <img src={img} alt="" loading="lazy" decoding="async"
                  style={{ width: 54, height: 54, objectFit: "cover", objectPosition: "top", borderRadius: 6, display: "block" }} />
              </button>
            ))}
          </div>
        )}

        <div style={{ padding: "20px 24px 24px", flexShrink: 0, maxHeight: browser ? "30vh" : "none", overflowY: "auto", borderTop: `1px solid ${C.line}`, background: C.surface }}>
          <p style={{ fontSize: 14.5, lineHeight: 1.75, color: C.inkSoft }}>{desc}</p>
          {highlights && (
            <ul style={{ margin: "16px 0 0", padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "8px 26px" }}>
              {highlights.map(h => (
                <li key={h} style={{ fontSize: 13.5, lineHeight: 1.6, color: C.muted, paddingLeft: 16, position: "relative" }}>
                  <span aria-hidden="true" style={{ position: "absolute", left: 0, color: C.accent }}>—</span>{h}
                </li>
              ))}
            </ul>
          )}
          {role && <div style={{ marginTop: 16, fontSize: 12, color: C.faint, letterSpacing: ".4px" }}>{role}</div>}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICES
// ═══════════════════════════════════════════════════════════════════════════════
function ServicesPage() {
  return (
    <div style={{ paddingTop: 128, paddingBottom: "clamp(80px,10vw,140px)" }}>
      <div style={PAGE}>
        <Reveal>
          <SectionHead index="—" label="What I offer" title="Services"
            lead="Four ways I usually work with clients. Most projects combine two of them." />
        </Reveal>

        <Reveal><FeaturedService /></Reveal>

        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(258px,1fr))", gap: 20, marginTop: 24 }}>
          {services.map((s, i) => <StaggerItem key={i}><ServiceCard s={s} /></StaggerItem>)}
        </Stagger>

        <Reveal>
          <div style={{ marginTop: 64, padding: "clamp(36px,6vw,64px)", background: C.ink, borderRadius: RADIUS.xl, textAlign: "center" }}>
            <h3 style={{ fontFamily: FONT.display, fontSize: "clamp(28px,4vw,44px)", color: "#fff", lineHeight: 1.1, marginBottom: 14 }}>
              Have a project in mind?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.62)", fontSize: 15.5, marginBottom: 30 }}>
              Let&rsquo;s bring it to life with thoughtful design.
            </p>
            <a href={`mailto:${EMAIL}`} style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 999,
              background: "#fff", color: C.ink, fontWeight: 600, fontSize: 14.5, textDecoration: "none",
            }}>Get in touch →</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function FeaturedService() {
  const [hov, setHov] = useState(false);
  return (
    <Surface hov={hov} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ overflow: "hidden" }}>
      <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: "clamp(30px,4vw,48px)" }}>
          <Chip tone="accent">Featured service</Chip>
          <h3 style={{ fontFamily: FONT.display, fontSize: "clamp(30px,3.6vw,46px)", lineHeight: 1.05, color: C.ink, margin: "18px 0 12px" }}>
            UI/UX Design
          </h3>
          <p style={{ fontSize: 15, color: C.accent, fontWeight: 500, marginBottom: 16 }}>&ldquo;Interfaces that feel inevitable.&rdquo;</p>
          <p style={{ fontSize: 14.5, lineHeight: 1.75, color: C.muted, marginBottom: 22 }}>
            End-to-end product design for web and mobile — from wireframes to polished prototypes.
            I turn complexity into clarity through research-backed design decisions.
          </p>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {["Figma", "Adobe XD", "Maze"].map(t => <Chip key={t} tone="outline">{t}</Chip>)}
          </div>
        </div>
        <div style={{ background: C.surfaceSunk, borderLeft: `1px solid ${C.line}`, padding: "clamp(28px,4vw,44px)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 260 }}>
          <BrowserFrame url="dashboard.app" compact>
            <div style={{ padding: 16, display: "grid", gridTemplateColumns: "56px 1fr", gap: 12, background: "#fff" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {[1, .55, .55, .35].map((o, i) => <div key={i} style={{ height: 8, borderRadius: 3, background: i === 0 ? C.accent : "rgba(14,14,18,0.10)", opacity: o }} />)}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <div style={{ height: 34, borderRadius: 7, background: C.accentSoft, border: `1px solid ${C.accentLine}` }} />
                <div style={{ display: "flex", gap: 9 }}>
                  <div style={{ flex: 1, height: 46, borderRadius: 7, background: "rgba(14,14,18,0.05)" }} />
                  <div style={{ flex: 1, height: 46, borderRadius: 7, background: "rgba(14,14,18,0.08)" }} />
                </div>
                <div style={{ height: 8, width: "62%", borderRadius: 3, background: "rgba(14,14,18,0.09)" }} />
                <div style={{ height: 8, width: "44%", borderRadius: 3, background: "rgba(14,14,18,0.07)" }} />
              </div>
            </div>
          </BrowserFrame>
        </div>
      </div>
      <style>{`@media (max-width: 860px){ .feat-grid{ grid-template-columns:1fr !important; } }`}</style>
    </Surface>
  );
}

function ServiceCard({ s }) {
  const [hov, setHov] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <Surface hov={hov} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: "26px 24px", height: "100%", display: "flex", flexDirection: "column" }}>
      <span aria-hidden="true" style={{ fontSize: 26, marginBottom: 16 }}>{s.icon}</span>
      <h3 style={{ fontSize: 16.5, fontWeight: 600, color: C.ink, marginBottom: 6, lineHeight: 1.3 }}>{s.title}</h3>
      <p style={{ fontSize: 13.5, color: C.accent, fontWeight: 500, marginBottom: 12 }}>{s.tagline}</p>
      <p style={{ fontSize: 13.5, lineHeight: 1.7, color: C.muted, marginBottom: 18, flex: 1 }}>{s.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {s.tools.map(t => <Chip key={t}>{t}</Chip>)}
      </div>
      <button onClick={() => setOpen(o => !o)} aria-expanded={open} style={{
        background: "none", border: "none", borderTop: `1px solid ${C.line}`, cursor: "pointer",
        padding: "14px 0 0", width: "100%", textAlign: "left", color: C.ink,
        fontFamily: FONT.sans, fontSize: 13, fontWeight: 500,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        {open ? "Hide deliverables" : "What's included"}
        <span aria-hidden="true" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .3s", color: C.faint }}>⌄</span>
      </button>
      <motion.ul initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: "hidden", listStyle: "none", margin: 0, padding: 0 }}>
        {s.deliverables.map(d => (
          <li key={d} style={{ fontSize: 13, color: C.muted, padding: "7px 0 0", paddingLeft: 15, position: "relative", lineHeight: 1.5 }}>
            <span aria-hidden="true" style={{ position: "absolute", left: 0, color: C.accentLine }}>—</span>{d}
          </li>
        ))}
      </motion.ul>
    </Surface>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// REVIEWS
// ═══════════════════════════════════════════════════════════════════════════════
function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", stars: 5, text: "" });
  const [hovStar, setHovStar] = useState(0);

  const avg = (reviews.reduce((a, r) => a + r.stars, 0) / reviews.length).toFixed(1);
  const five = reviews.filter(r => r.stars === 5).length;

  const submit = () => {
    if (!form.name || !form.text) return;
    setReviews(r => [{ ...form, date: "Just now", emoji: "🙂" }, ...r]);
    setForm({ name: "", role: "", stars: 5, text: "" });
    setShowForm(false);
  };

  const field = {
    width: "100%", padding: "12px 14px", borderRadius: RADIUS.md, border: `1px solid ${C.line}`,
    background: C.surfaceSunk, color: C.ink, fontFamily: FONT.sans, fontSize: 14, outline: "none",
  };
  const lab = { fontSize: 12.5, color: C.muted, display: "block", marginBottom: 7 };

  return (
    <div style={{ paddingTop: 128, paddingBottom: "clamp(80px,10vw,140px)" }}>
      <div style={PAGE}>
        <Reveal><SectionHead index="—" label="Client feedback" title="What clients say" /></Reveal>

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 1, background: C.line, border: `1px solid ${C.line}`, borderRadius: RADIUS.lg, overflow: "hidden", marginBottom: 32 }}>
            {[
              { label: "Average rating", val: avg },
              { label: "Total reviews", val: reviews.length },
              { label: "5-star reviews", val: five },
            ].map(s => (
              <div key={s.label} style={{ background: C.surface, padding: "26px 22px" }}>
                <div style={{ fontFamily: FONT.display, fontSize: 38, lineHeight: 1, color: C.ink }}>{s.val}</div>
                <div style={{ fontSize: 12.5, color: C.muted, marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div style={{ marginBottom: showForm ? 28 : 44 }}>
            <Btn label={showForm ? "Cancel" : "Add your review"} onClick={() => setShowForm(o => !o)} />
          </div>
        </Reveal>

        <motion.div initial={false} animate={{ height: showForm ? "auto" : 0, opacity: showForm ? 1 : 0 }}
          transition={{ duration: .4, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
          <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: RADIUS.lg, padding: "30px", maxWidth: 560, marginBottom: 44 }}>
            <h3 style={{ fontFamily: FONT.display, fontSize: 24, marginBottom: 22, color: C.ink }}>Leave a review</h3>
            {[{ key: "name", label: "Your name", ph: "John Smith" }, { key: "role", label: "Role / company", ph: "Product Manager at XYZ" }].map(f => (
              <div key={f.key} style={{ marginBottom: 16 }}>
                <label style={lab}>{f.label}</label>
                <input value={form[f.key]} onChange={e => setForm(x => ({ ...x, [f.key]: e.target.value }))} placeholder={f.ph} style={field} />
              </div>
            ))}
            <div style={{ marginBottom: 16 }}>
              <label style={lab}>Rating</label>
              <div style={{ display: "flex", gap: 4 }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onMouseEnter={() => setHovStar(n)} onMouseLeave={() => setHovStar(0)}
                    onClick={() => setForm(x => ({ ...x, stars: n }))} aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, padding: 0, color: n <= (hovStar || form.stars) ? "#E8A317" : C.line }}>★</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={lab}>Your review</label>
              <textarea value={form.text} onChange={e => setForm(x => ({ ...x, text: e.target.value }))}
                placeholder="Share your experience..." rows={4} style={{ ...field, resize: "vertical" }} />
            </div>
            <Btn label="Submit" primary onClick={submit} />
          </div>
        </motion.div>

        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: 20 }}>
          {reviews.map((r, i) => <StaggerItem key={i}><ReviewCard r={r} /></StaggerItem>)}
        </Stagger>
      </div>
    </div>
  );
}

function ReviewCard({ r }) {
  const [hov, setHov] = useState(false);
  return (
    <Surface hov={hov} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: "28px 26px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div aria-label={`${r.stars} out of 5`} style={{ fontSize: 14, letterSpacing: 3, marginBottom: 16 }}>
        <span style={{ color: "#E8A317" }}>{"★".repeat(r.stars)}</span>
        <span style={{ color: C.line }}>{"★".repeat(5 - r.stars)}</span>
      </div>
      <p style={{ fontFamily: FONT.display, fontSize: 18, lineHeight: 1.55, color: C.ink, marginBottom: 22, flex: 1 }}>
        &ldquo;{r.text}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid ${C.line}`, paddingTop: 16 }}>
        <span aria-hidden="true" style={{
          width: 38, height: 38, borderRadius: "50%", fontSize: 18, flexShrink: 0,
          background: C.surfaceSunk, border: `1px solid ${C.line}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{r.emoji}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{r.name}</div>
          <div style={{ fontSize: 12, color: C.muted }}>{r.role}</div>
        </div>
        <span style={{ marginLeft: "auto", fontSize: 11.5, color: C.faint, whiteSpace: "nowrap" }}>{r.date}</span>
      </div>
    </Surface>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════════════════════════════════════
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const valid = form.name.trim() && form.email.trim() && form.message.trim();

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    const subject = encodeURIComponent(`New project inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field = {
    width: "100%", padding: "13px 15px", borderRadius: RADIUS.md, border: `1px solid ${C.line}`,
    background: C.surfaceSunk, color: C.ink, fontFamily: FONT.sans, fontSize: 14.5, outline: "none",
  };
  const lab = { fontSize: 12.5, color: C.muted, display: "block", marginBottom: 7 };

  return (
    <div style={{ paddingTop: 150, paddingBottom: "clamp(80px,10vw,140px)" }}>
      <div style={PAGE}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(36px,6vw,80px)", alignItems: "start" }}>
          <Reveal>
            <h1 style={{ fontFamily: FONT.display, fontWeight: 400, fontSize: "clamp(44px,6.5vw,84px)", lineHeight: 0.98, letterSpacing: "-2px", color: C.ink, marginBottom: 26 }}>
              Have a project in mind?
            </h1>
            <p style={{ fontSize: 16.5, lineHeight: 1.75, color: C.muted, marginBottom: 36, maxWidth: 420 }}>
              Let&rsquo;s talk. Whether you have a fully-formed brief or just an idea,
              I&rsquo;d love to hear about your project.
            </p>
            <a href={`mailto:${EMAIL}`} style={{
              display: "inline-block", fontFamily: FONT.display, fontSize: "clamp(20px,2.4vw,30px)",
              color: C.ink, textDecoration: "none", borderBottom: `1px solid ${C.accentLine}`, paddingBottom: 4,
            }}>{EMAIL}</a>
            <div style={{ display: "flex", gap: 10, marginTop: 36, flexWrap: "wrap" }}>
              <Btn label="LinkedIn" href={LINKEDIN} external />
              <Btn label="Behance" href={BEHANCE} external />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: RADIUS.xl, padding: "clamp(26px,4vw,38px)" }}>
              <h2 style={{ fontFamily: FONT.display, fontSize: 26, marginBottom: 24, color: C.ink }}>Send a message</h2>
              <div style={{ marginBottom: 16 }}>
                <label style={lab} htmlFor="cf-name">Your name</label>
                <input id="cf-name" value={form.name} onChange={e => setForm(x => ({ ...x, name: e.target.value }))} placeholder="Jane Doe" style={field} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={lab} htmlFor="cf-email">Your email</label>
                <input id="cf-email" type="email" value={form.email} onChange={e => setForm(x => ({ ...x, email: e.target.value }))} placeholder="jane@company.com" style={field} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={lab} htmlFor="cf-msg">Message</label>
                <textarea id="cf-msg" value={form.message} onChange={e => setForm(x => ({ ...x, message: e.target.value }))} placeholder="Tell me about your project..." rows={5} style={{ ...field, resize: "vertical" }} />
              </div>
              <button type="submit" disabled={!valid} style={{
                width: "100%", padding: "14px 24px", borderRadius: 999, border: "none",
                background: valid ? C.ink : "rgba(14,14,18,0.16)", color: "#fff",
                fontFamily: FONT.sans, fontWeight: 600, fontSize: 14.5,
                cursor: valid ? "pointer" : "not-allowed", transition: "background .25s",
              }}>Send message</button>
              {sent && (
                <p style={{ marginTop: 14, fontSize: 13, color: C.teal, textAlign: "center", lineHeight: 1.6 }}>
                  Your email app should have opened with the message ready to send.
                  If not, email me directly at {EMAIL}.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
      <style>{`@media (max-width: 900px){ .contact-grid{ grid-template-columns:1fr !important; } }`}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════════
function Footer({ go }) {
  return (
    <footer style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${C.line}`, background: C.bgAlt, paddingTop: 56 }}>
      <div style={PAGE}>
        <div className="foot-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 36, paddingBottom: 44 }}>
          <div>
            <Wordmark size={22} />
            <p style={{ marginTop: 14, fontSize: 14.5, lineHeight: 1.7, color: C.muted, maxWidth: 300 }}>
              UI &amp; Graphic Designer. Building products and brands that are clear,
              consistent and pleasant to use.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 11.5, letterSpacing: "1.4px", textTransform: "uppercase", color: C.faint, marginBottom: 14 }}>Pages</div>
            {NAV.map(n => (
              <button key={n} onClick={() => go(n.toLowerCase())} style={{
                display: "block", background: "none", border: "none", padding: "5px 0", cursor: "pointer",
                fontFamily: FONT.sans, fontSize: 14, color: C.muted,
              }}>{n}</button>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11.5, letterSpacing: "1.4px", textTransform: "uppercase", color: C.faint, marginBottom: 14 }}>Elsewhere</div>
            {[["LinkedIn", LINKEDIN], ["Behance", BEHANCE], ["Email", `mailto:${EMAIL}`]].map(([l, h]) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" style={{
                display: "block", padding: "5px 0", fontSize: 14, color: C.muted, textDecoration: "none",
              }}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.line}`, padding: "20px 0 28px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontSize: 12.5, color: C.faint }}>© {new Date().getFullYear()} Sameed Bin Dawar</span>
          <span style={{ fontSize: 12.5, color: C.faint }}>Designed with intention.</span>
        </div>
      </div>
      <style>{`@media (max-width: 760px){ .foot-grid{ grid-template-columns:1fr !important; } }`}</style>
    </footer>
  );
}
