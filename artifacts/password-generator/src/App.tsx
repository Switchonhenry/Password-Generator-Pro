import { useState, useMemo } from "react";

const BG_PALETTES = [
  { bg: ["#1e1b4b","#312e81"], accent: "#6366f1", accent2: "#8b5cf6", badgeBg: "rgba(99,102,241,0.35)",  badgeText: "#c7d2fe", boxBorder: "rgba(99,102,241,0.4)",  slider: "#818cf8" },
  { bg: ["#1a1a2e","#16213e"], accent: "#0ea5e9", accent2: "#38bdf8", badgeBg: "rgba(14,165,233,0.3)",  badgeText: "#bae6fd", boxBorder: "rgba(14,165,233,0.4)",  slider: "#38bdf8" },
  { bg: ["#0f2027","#203a43"], accent: "#06b6d4", accent2: "#22d3ee", badgeBg: "rgba(6,182,212,0.3)",   badgeText: "#a5f3fc", boxBorder: "rgba(6,182,212,0.4)",   slider: "#22d3ee" },
  { bg: ["#1b2838","#2a475e"], accent: "#3b82f6", accent2: "#60a5fa", badgeBg: "rgba(59,130,246,0.3)",  badgeText: "#bfdbfe", boxBorder: "rgba(59,130,246,0.4)",  slider: "#60a5fa" },
  { bg: ["#0d1b2a","#1b263b"], accent: "#8b5cf6", accent2: "#a78bfa", badgeBg: "rgba(139,92,246,0.3)", badgeText: "#ede9fe", boxBorder: "rgba(139,92,246,0.4)", slider: "#a78bfa" },
  { bg: ["#1a0533","#3b0764"], accent: "#d946ef", accent2: "#e879f9", badgeBg: "rgba(217,70,239,0.3)", badgeText: "#f5d0fe", boxBorder: "rgba(217,70,239,0.4)", slider: "#e879f9" },
  { bg: ["#052e16","#14532d"], accent: "#22c55e", accent2: "#4ade80", badgeBg: "rgba(34,197,94,0.3)",  badgeText: "#bbf7d0", boxBorder: "rgba(34,197,94,0.4)",  slider: "#4ade80" },
  { bg: ["#431407","#7c2d12"], accent: "#f97316", accent2: "#fb923c", badgeBg: "rgba(249,115,22,0.3)", badgeText: "#fed7aa", boxBorder: "rgba(249,115,22,0.4)", slider: "#fb923c" },
  { bg: ["#1c1917","#44403c"], accent: "#a8a29e", accent2: "#d6d3d1", badgeBg: "rgba(168,162,158,0.25)",badgeText: "#f5f5f4", boxBorder: "rgba(168,162,158,0.4)",slider: "#d6d3d1" },
  { bg: ["#0c1445","#1e3a5f"], accent: "#38bdf8", accent2: "#7dd3fc", badgeBg: "rgba(56,189,248,0.3)", badgeText: "#e0f2fe", boxBorder: "rgba(56,189,248,0.4)", slider: "#7dd3fc" },
];

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!#$%&()*+";

const i18n = {
  zh: {
    title: "密碼製造器",
    subtitle: "PyPassword Generator",
    placeholder: "點擊「生成密碼」開始...",
    lengthLabel: "密碼長度",
    symbolsLabel: "包含符號",
    symbolsDesc: "! # $ % & ( ) * +",
    generateBtn: "生成密碼",
    strengthLabel: "密碼強度",
    copied: "已複製到剪貼簿",
    weak: "太弱",
    fair: "普通",
    good: "良好",
    strong: "強",
    lang: "EN",
  },
  en: {
    title: "Password Generator",
    subtitle: "PyPassword Generator",
    placeholder: "Tap \"Generate\" to start...",
    lengthLabel: "Password Length",
    symbolsLabel: "Include Symbols",
    symbolsDesc: "! # $ % & ( ) * +",
    generateBtn: "Generate Password",
    strengthLabel: "Strength",
    copied: "Copied to clipboard",
    weak: "Weak",
    fair: "Fair",
    good: "Good",
    strong: "Strong",
    lang: "中文",
  },
};

function generatePassword(length: number, useSymbols: boolean): string {
  const pool = LETTERS + NUMBERS + (useSymbols ? SYMBOLS : "");
  const chars: string[] = [];
  if (useSymbols) {
    chars.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  }
  while (chars.length < length) {
    chars.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

function getStrength(password: string, t: typeof i18n.zh): { label: string; color: string; width: string } {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!#$%&()*+]/.test(password);
  const score = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;
  const len = password.length;
  if (len < 6) return { label: t.weak, color: "#ff453a", width: "20%" };
  if (score <= 2 || len < 10) return { label: t.fair, color: "#ff9f0a", width: "45%" };
  if (score === 3 || len < 14) return { label: t.good, color: "#ffd60a", width: "70%" };
  return { label: t.strong, color: "#30d158", width: "100%" };
}

const SF = `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif`;

export default function App() {
  const palette = useMemo(() => BG_PALETTES[Math.floor(Math.random() * BG_PALETTES.length)], []);
  const [c1, c2] = palette.bg;
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [length, setLength] = useState(12);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const t = i18n[lang];

  function handleGenerate() {
    setPassword(generatePassword(length, useSymbols));
    setCopied(false);
  }

  function handleCopy() {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const strength = password ? getStrength(password, t) : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(145deg, ${c1} 0%, ${c2} 60%, ${c1} 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: SF,
      padding: "1.25rem",
    }}>
      {/* Card */}
      <div style={{
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(48px) saturate(180%)",
        WebkitBackdropFilter: "blur(48px) saturate(180%)",
        borderRadius: "32px",
        border: "1px solid rgba(255,255,255,0.18)",
        padding: "2rem 1.75rem 2rem",
        width: "100%",
        maxWidth: "390px",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06) inset",
        position: "relative",
      }}>

        {/* Language pill */}
        <button
          onClick={() => { setLang(lang === "zh" ? "en" : "zh"); setPassword(""); setCopied(false); }}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: "20px",
            color: "rgba(255,255,255,0.75)",
            fontSize: "0.72rem",
            fontWeight: 600,
            padding: "0.28rem 0.75rem",
            cursor: "pointer",
            letterSpacing: "0.06em",
            fontFamily: SF,
          }}
        >
          {t.lang}
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem", paddingTop: "0.25rem" }}>
          <div style={{ fontSize: "3rem", lineHeight: 1, marginBottom: "0.75rem" }}>🔐</div>
          <h1 style={{
            color: "#fff",
            fontSize: "1.65rem",
            fontWeight: 700,
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            {t.title}
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.8rem",
            margin: "0.35rem 0 0",
            letterSpacing: "0.01em",
          }}>
            {t.subtitle}
          </p>
        </div>

        {/* Password Output */}
        <div
          onClick={handleCopy}
          style={{
            background: "rgba(0,0,0,0.22)",
            backdropFilter: "blur(12px)",
            borderRadius: "18px",
            padding: "1rem 1.1rem",
            marginBottom: "0.85rem",
            minHeight: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.6rem",
            border: `1px solid ${palette.boxBorder}`,
            cursor: password ? "pointer" : "default",
            transition: "background 0.15s",
          }}
        >
          <span style={{
            color: password ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.22)",
            fontFamily: `"SF Mono", ui-monospace, monospace`,
            fontSize: "1rem",
            wordBreak: "break-all",
            flex: 1,
            letterSpacing: "0.06em",
            lineHeight: 1.5,
          }}>
            {password || t.placeholder}
          </span>
          {password && (
            <span style={{
              fontSize: "1.1rem",
              flexShrink: 0,
              opacity: copied ? 1 : 0.6,
              transition: "opacity 0.2s",
            }}>
              {copied ? "✅" : "⎘"}
            </span>
          )}
        </div>

        {/* Copied toast */}
        <div style={{
          textAlign: "center",
          fontSize: "0.78rem",
          color: "#30d158",
          marginBottom: copied ? "0.65rem" : "0",
          height: copied ? "1.2em" : "0",
          overflow: "hidden",
          transition: "height 0.2s ease, margin-bottom 0.2s ease",
          letterSpacing: "0.01em",
        }}>
          {t.copied}
        </div>

        {/* Strength Bar */}
        {strength && (
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
              <span style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.74rem", fontWeight: 500 }}>
                {t.strengthLabel}
              </span>
              <span style={{ color: strength.color, fontSize: "0.74rem", fontWeight: 600 }}>
                {strength.label}
              </span>
            </div>
            <div style={{
              height: "4px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "99px",
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                width: strength.width,
                background: strength.color,
                borderRadius: "99px",
                transition: "width 0.45s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease",
                boxShadow: `0 0 8px ${strength.color}88`,
              }} />
            </div>
          </div>
        )}

        {/* Grouped rows container */}
        <div style={{
          background: "rgba(255,255,255,0.06)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.1)",
          overflow: "hidden",
          marginBottom: "1.25rem",
        }}>

          {/* Length Slider row */}
          <div style={{ padding: "1rem 1.1rem 0.9rem" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.7rem",
            }}>
              <span style={{
                color: "rgba(255,255,255,0.88)",
                fontSize: "0.92rem",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}>
                {t.lengthLabel}
              </span>
              <span style={{
                background: palette.badgeBg,
                color: palette.badgeText,
                padding: "0.15rem 0.7rem",
                borderRadius: "99px",
                fontSize: "0.84rem",
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
                minWidth: "2.2em",
                textAlign: "center",
              }}>
                {length}
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: palette.slider,
                cursor: "pointer",
                height: "4px",
              }}
            />
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0.3rem",
            }}>
              <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.68rem" }}>4</span>
              <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.68rem" }}>32</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "0 1.1rem" }} />

          {/* Symbols Toggle row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.9rem 1.1rem",
          }}>
            <div>
              <div style={{
                color: "rgba(255,255,255,0.88)",
                fontSize: "0.92rem",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}>
                {t.symbolsLabel}
              </div>
              <div style={{
                color: "rgba(255,255,255,0.32)",
                fontSize: "0.72rem",
                marginTop: "0.1rem",
                letterSpacing: "0.02em",
              }}>
                {t.symbolsDesc}
              </div>
            </div>

            {/* iOS-spec toggle: 51×31, knob 27px */}
            <button
              onClick={() => setUseSymbols(!useSymbols)}
              aria-pressed={useSymbols}
              style={{
                width: "51px",
                height: "31px",
                borderRadius: "99px",
                border: "none",
                cursor: "pointer",
                background: useSymbols ? palette.accent : "rgba(120,120,128,0.32)",
                position: "relative",
                transition: "background 0.22s ease",
                flexShrink: 0,
                padding: 0,
                boxShadow: useSymbols ? `0 0 14px ${palette.accent}66` : "none",
              }}
            >
              <span style={{
                position: "absolute",
                top: "2px",
                left: useSymbols ? "22px" : "2px",
                width: "27px",
                height: "27px",
                borderRadius: "50%",
                background: "#fff",
                transition: "left 0.22s cubic-bezier(0.34,1.56,0.64,1)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
                display: "block",
              }} />
            </button>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          style={{
            width: "100%",
            padding: "0.95rem",
            background: `linear-gradient(135deg, ${palette.accent}, ${palette.accent2})`,
            color: "#fff",
            border: "none",
            borderRadius: "16px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "-0.01em",
            boxShadow: `0 6px 24px ${palette.accent}55`,
            transition: "opacity 0.15s, transform 0.12s",
            fontFamily: SF,
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = "0.88")}
          onMouseOut={e => (e.currentTarget.style.opacity = "1")}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
          onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          {t.generateBtn}
        </button>

      </div>
    </div>
  );
}
