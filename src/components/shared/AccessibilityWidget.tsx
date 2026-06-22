/**
 * AccessibilityWidget.tsx — Girls Leading Tech
 * Fully inline styles — no Tailwind dependency, works anywhere.
 *
 * Rendered via a React portal directly into document.body so that
 * `position: fixed` is always relative to the viewport — never broken
 * by an ancestor with transform / filter / backdrop-filter / will-change
 * / contain, which would otherwise create a new containing block and
 * silently relocate the widget away from the bottom-left corner.
 */
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// ─── CSS injected once into <head> ───────────────────────────────────────────
const A11Y_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap');

  html.a11y-dark *:not(script):not(style):not(#glt-a11y-widget):not(#glt-a11y-widget *) {
    background-color: #000 !important;
    color: #fff !important;
    border-color: #555 !important;
  }
  html.a11y-dark a:not(#glt-a11y-widget a) { color: #ffff00 !important; }
  html.a11y-dark img { filter: brightness(0.8); }

  html.a11y-light *:not(script):not(style):not(#glt-a11y-widget):not(#glt-a11y-widget *) {
    background-color: #fffff0 !important;
    color: #111 !important;
  }
  html.a11y-light a:not(#glt-a11y-widget a) { color: #00008b !important; text-decoration: underline !important; }

  html.a11y-invert { filter: invert(1) hue-rotate(180deg); }
  html.a11y-invert img, html.a11y-invert video { filter: invert(1) hue-rotate(180deg); }
  html.a11y-invert #glt-a11y-widget { filter: invert(1) hue-rotate(180deg); }

  html.a11y-gray { filter: grayscale(100%); }
  html.a11y-gray #glt-a11y-widget { filter: grayscale(0); }

  html.a11y-links a:not(#glt-a11y-widget a) {
    outline: 3px solid #d955a4 !important;
    outline-offset: 2px !important;
    background: rgba(217,85,164,0.1) !important;
    border-radius: 3px !important;
    text-decoration: underline !important;
  }

  html.a11y-no-motion *,
  html.a11y-no-motion *::before,
  html.a11y-no-motion *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }

  html.a11y-font *:not(#glt-a11y-widget):not(#glt-a11y-widget *) {
    font-family: 'Atkinson Hyperlegible', Arial, sans-serif !important;
    word-spacing: 0.1em !important;
  }

  html.a11y-lh1 *:not(#glt-a11y-widget):not(#glt-a11y-widget *) { line-height: 1.9 !important; }
  html.a11y-lh2 *:not(#glt-a11y-widget):not(#glt-a11y-widget *) { line-height: 2.4 !important; }

  html.a11y-ls1 *:not(#glt-a11y-widget):not(#glt-a11y-widget *) { letter-spacing: 0.06em !important; }
  html.a11y-ls2 *:not(#glt-a11y-widget):not(#glt-a11y-widget *) { letter-spacing: 0.13em !important; }

  html.a11y-cursor, html.a11y-cursor * {
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cpath fill='black' stroke='white' stroke-width='1.5' d='M4 0l16 12-7 1-4 8L4 0z'/%3E%3C/svg%3E") 0 0, auto !important;
  }

  /* widget always renders normally, pinned to viewport via portal */
  #glt-a11y-widget {
    all: initial;
    position: fixed !important;
    bottom: 24px !important;
    left: 24px !important;
    z-index: 2147483647 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 10px !important;
    font-family: system-ui, sans-serif !important;
  }
`;

function injectCSS() {
  if (document.getElementById("glt-a11y-css")) return;
  const s = document.createElement("style");
  s.id = "glt-a11y-css";
  s.textContent = A11Y_CSS;
  document.head.appendChild(s);
}

// ─── State ───────────────────────────────────────────────────────────────────
type Contrast = "none" | "dark" | "light" | "invert";
type St = {
  fontSize: number;
  contrast: Contrast;
  gray: boolean;
  links: boolean;
  noMotion: boolean;
  font: boolean;
  cursor: boolean;
  lineHeight: number;
  letterSpacing: number;
};
const DEF: St = {
  fontSize: 0, contrast: "none", gray: false,
  links: false, noMotion: false, font: false,
  cursor: false, lineHeight: 0, letterSpacing: 0,
};

function applyState(s: St) {
  const h = document.documentElement;
  h.style.fontSize = s.fontSize === 0 ? "" : `${16 + s.fontSize * 2}px`;
  h.classList.toggle("a11y-dark",     s.contrast === "dark");
  h.classList.toggle("a11y-light",    s.contrast === "light");
  h.classList.toggle("a11y-invert",   s.contrast === "invert");
  h.classList.toggle("a11y-gray",     s.gray && s.contrast === "none");
  h.classList.toggle("a11y-links",    s.links);
  h.classList.toggle("a11y-no-motion",s.noMotion);
  h.classList.toggle("a11y-font",     s.font);
  h.classList.toggle("a11y-cursor",   s.cursor);
  h.classList.toggle("a11y-lh1",      s.lineHeight === 1);
  h.classList.toggle("a11y-lh2",      s.lineHeight === 2);
  h.classList.toggle("a11y-ls1",      s.letterSpacing === 1);
  h.classList.toggle("a11y-ls2",      s.letterSpacing === 2);
}

function save(s: St) { try { sessionStorage.setItem("glt-a11y", JSON.stringify(s)); } catch {} }
function load(): St {
  try { const r = sessionStorage.getItem("glt-a11y"); if (r) return { ...DEF, ...JSON.parse(r) }; } catch {}
  return { ...DEF };
}

// ─── Shared style tokens ─────────────────────────────────────────────────────
const PINK = "#d955a4";
const BTN_BASE: React.CSSProperties = {
  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
  gap: 4, padding: "9px 6px", border: "2px solid #e0e0e0", borderRadius: 12,
  background: "#fff", color: "#444", fontSize: 11, fontWeight: 600,
  cursor: "pointer", transition: "all 0.12s", fontFamily: "system-ui, sans-serif",
  lineHeight: 1.2,
};
const BTN_ACTIVE: React.CSSProperties = {
  ...BTN_BASE, background: PINK, color: "#fff", border: `2px solid #000`,
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [st, setSt] = useState<St>(DEF);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true); // ensures document.body exists (SSR-safe)
    injectCSS();
    const saved = load();
    setSt(saved);
    applyState(saved);
  }, []);

  useEffect(() => { applyState(st); save(st); }, [st]);

  useEffect(() => {
    if (!open) return;
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  const patch = (p: Partial<St>) => setSt(s => ({ ...s, ...p }));
  const toggleContrast = (m: Contrast) => patch({ contrast: st.contrast === m ? "none" : m, gray: false });
  const cycle = (key: "lineHeight" | "letterSpacing", max = 2) =>
    patch({ [key]: st[key] >= max ? 0 : st[key] + 1 });
  const reset = () => { setSt({ ...DEF }); applyState({ ...DEF }); save({ ...DEF }); };
  const hasChanges = JSON.stringify(st) !== JSON.stringify(DEF);

  if (!mounted) return null; // avoid SSR mismatch — portal target only exists client-side

  const widget = (
    <div id="glt-a11y-widget" ref={ref}>

      {/* ── Panel ── */}
      {open && (
        <div style={{
          width: 296, background: "#fff", border: "2px solid #000",
          borderRadius: 18, boxShadow: "4px 4px 0 rgba(0,0,0,1)",
          overflow: "hidden", marginBottom: 8,
          fontFamily: "system-ui, sans-serif",
        }}>
          {/* Header */}
          <div style={{ background: PINK, padding: "11px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <AccessIcon size={20} color="#fff" />
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Accessibility</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close accessibility panel"
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 2, display: "flex" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} width={16} height={16}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Text size */}
            <Group label="Text Size">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => patch({ fontSize: Math.max(0, st.fontSize - 1) })}
                  disabled={st.fontSize <= 0}
                  style={{ ...BTN_BASE, flex: 1, flexDirection: "row", fontSize: 14, fontWeight: 900, padding: "9px 0", opacity: st.fontSize <= 0 ? 0.35 : 1 }}
                >A<sup style={{ fontSize: 10 }}>−</sup></button>
                <span style={{ fontSize: 11, color: "#888", width: 54, textAlign: "center" }}>
                  {st.fontSize === 0 ? "Default" : `+${st.fontSize * 2}px`}
                </span>
                <button
                  onClick={() => patch({ fontSize: Math.min(3, st.fontSize + 1) })}
                  disabled={st.fontSize >= 3}
                  style={{ ...BTN_BASE, flex: 1, flexDirection: "row", fontSize: 14, fontWeight: 900, padding: "9px 0", opacity: st.fontSize >= 3 ? 0.35 : 1 }}
                >A<sup style={{ fontSize: 10 }}>+</sup></button>
              </div>
            </Group>

            {/* Contrast */}
            <Group label="Contrast">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                <Btn icon="◑" label="Dark"   active={st.contrast==="dark"}   onClick={() => toggleContrast("dark")} />
                <Btn icon="☀" label="Light"  active={st.contrast==="light"}  onClick={() => toggleContrast("light")} />
                <Btn icon="⊙" label="Invert" active={st.contrast==="invert"} onClick={() => toggleContrast("invert")} />
              </div>
            </Group>

            {/* Display */}
            <Group label="Display">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <Btn icon="◐" label="Grayscale"       active={st.gray}     onClick={() => patch({ gray: !st.gray, contrast: "none" })} />
                <Btn icon="🔗" label="Highlight Links" active={st.links}    onClick={() => patch({ links: !st.links })} />
                <Btn icon="⊗" label="Stop Motion"     active={st.noMotion} onClick={() => patch({ noMotion: !st.noMotion })} />
                <Btn icon="↖" label="Big Cursor"      active={st.cursor}   onClick={() => patch({ cursor: !st.cursor })} />
              </div>
            </Group>

            {/* Reading */}
            <Group label="Reading">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <Btn icon="Aa" label="Readable Font"
                  active={st.font} onClick={() => patch({ font: !st.font })}
                  style={{ gridColumn: "1 / -1" }} />
                <Btn
                  icon="↕"
                  label={st.lineHeight === 0 ? "Line Height" : st.lineHeight === 1 ? "Line Height +" : "Line Height ++"}
                  active={st.lineHeight > 0}
                  onClick={() => cycle("lineHeight")}
                />
                <Btn
                  icon="↔"
                  label={st.letterSpacing === 0 ? "Letter Space" : st.letterSpacing === 1 ? "Letter Space +" : "Letter Space ++"}
                  active={st.letterSpacing > 0}
                  onClick={() => cycle("letterSpacing")}
                />
              </div>
            </Group>

            {/* Reset */}
            {hasChanges && (
              <button onClick={reset} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6, padding: "9px 0", border: "2px solid #ccc", borderRadius: 10,
                background: "#fafafa", fontSize: 12, fontWeight: 600, color: "#555",
                cursor: "pointer", fontFamily: "system-ui, sans-serif",
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={13} height={13}>
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
                </svg>
                Reset all
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close accessibility options" : "Open accessibility options"}
        aria-expanded={open}
        style={{
          width: 52, height: 52, borderRadius: "50%",
          background: PINK, color: "#fff",
          border: "2px solid #000",
          boxShadow: "3px 3px 0 rgba(0,0,0,1)",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}
      >
        <AccessIcon size={24} color="#fff" />
        {hasChanges && (
          <span style={{
            position: "absolute", top: 2, right: 2,
            width: 11, height: 11, borderRadius: "50%",
            background: "#ffed95", border: "1.5px solid #000",
          }} />
        )}
      </button>
    </div>
  );

  // Portal straight into <body> so position:fixed is always relative to the
  // viewport, regardless of any ancestor's transform/filter/backdrop-filter/
  // will-change/contain set by Navbar, Footer, page wrappers, etc.
  return createPortal(widget, document.body);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ margin: "0 0 6px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#aaa", fontFamily: "system-ui, sans-serif" }}>
        {label}
      </p>
      {children}
    </div>
  );
}

function Btn({
  icon, label, active, onClick, style = {},
}: {
  icon: string; label: string; active: boolean;
  onClick: () => void; style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{ ...(active ? BTN_ACTIVE : BTN_BASE), ...style }}
    >
      <span style={{ fontSize: 15 }}>{icon}</span>
      <span style={{ textAlign: "center", lineHeight: 1.3 }}>{label}</span>
    </button>
  );
}

function AccessIcon({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} width={size} height={size}>
      <circle cx="12" cy="4" r="2" />
      <path d="M19 9.5C17.3 9 14.8 8.5 12 8.5S6.7 9 5 9.5L4 11.5c1.8-.4 4.5-.8 8-.8s6.2.4 8 .8L19 9.5z" />
      <path d="M9 11.5l-1.5 9h2l1.5-5 1.5 5 1.5-5 1.5 5h2L16 11.5" />
    </svg>
  );
}