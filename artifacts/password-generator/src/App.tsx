import { useState, useMemo } from "react";

const BG_PALETTES = [
  ["#1e1b4b", "#312e81"],
  ["#1a1a2e", "#16213e"],
  ["#0f2027", "#203a43"],
  ["#1b2838", "#2a475e"],
  ["#0d1b2a", "#1b263b"],
  ["#1a0533", "#3b0764"],
  ["#052e16", "#14532d"],
  ["#431407", "#7c2d12"],
  ["#1c1917", "#44403c"],
  ["#0c1445", "#1e3a5f"],
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
    generateBtn: "✨ 生成密碼",
    strengthLabel: "密碼強度",
    copied: "已複製到剪貼簿！",
    weak: "太弱",
    fair: "普通",
    good: "良好",
    strong: "強",
    lang: "EN",
  },
  en: {
    title: "Password Generator",
    subtitle: "PyPassword Generator",
    placeholder: "Click \"Generate\" to start...",
    lengthLabel: "Password Length",
    symbolsLabel: "Include Symbols",
    symbolsDesc: "! # $ % & ( ) * +",
    generateBtn: "✨ Generate Password",
    strengthLabel: "Strength",
    copied: "Copied to clipboard!",
    weak: "Weak",
    fair: "Fair",
    good: "Good",
    strong: "Strong",
    lang: "中文",
  },
};

function generatePassword(length: number, useSymbols: boolean): string {
  const pool = LETTERS + NUMBERS + (useSymbols ? SYMBOLS : "");
  let chars = Array.from({ length }, () => pool[Math.floor(Math.random() * pool.length)]);
  if (useSymbols) {
    const extraSymbolCount = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < extraSymbolCount; i++) {
      chars.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    }
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
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

  if (len < 6) return { label: t.weak, color: "#ef4444", width: "20%" };
  if (score <= 2 || len < 10) return { label: t.fair, color: "#f97316", width: "45%" };
  if (score === 3 || len < 14) return { label: t.good, color: "#eab308", width: "70%" };
  return { label: t.strong, color: "#22c55e", width: "100%" };
}

export default function App() {
  const [c1, c2] = useMemo(() => BG_PALETTES[Math.floor(Math.random() * BG_PALETTES.length)], []);
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
      background: `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c1} 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: "1rem",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.15)",
        padding: "2.5rem",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
        position: "relative",
      }}>
        {/* Language Toggle */}
        <button
          onClick={() => { setLang(lang === "zh" ? "en" : "zh"); setPassword(""); setCopied(false); }}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "8px",
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.75rem",
            fontWeight: 600,
            padding: "0.3rem 0.65rem",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          {t.lang}
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🔐</div>
          <h1 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 700, margin: 0 }}>
            {t.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", margin: "0.4rem 0 0" }}>
            {t.subtitle}
          </p>
        </div>

        {/* Password Output */}
        <div style={{
          background: "rgba(0,0,0,0.3)",
          borderRadius: "12px",
          padding: "1rem 1.25rem",
          marginBottom: "1rem",
          minHeight: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <span style={{
            color: password ? "#e0e7ff" : "rgba(255,255,255,0.25)",
            fontFamily: "monospace",
            fontSize: "1.05rem",
            wordBreak: "break-all",
            flex: 1,
            letterSpacing: "0.04em",
          }}>
            {password || t.placeholder}
          </span>
          {password && (
            <button onClick={handleCopy} title="Copy" style={{
              background: copied ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              padding: "0.4rem 0.6rem",
              fontSize: "1rem",
              flexShrink: 0,
              transition: "all 0.2s",
            }}>
              {copied ? "✅" : "📋"}
            </button>
          )}
        </div>

        {/* Strength Bar */}
        {strength && (
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>{t.strengthLabel}</span>
              <span style={{ color: strength.color, fontSize: "0.78rem", fontWeight: 600 }}>{strength.label}</span>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: strength.width,
                background: strength.color,
                borderRadius: "99px",
                transition: "width 0.4s ease, background 0.4s ease",
              }} />
            </div>
          </div>
        )}

        {/* Length Slider */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
            <label style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", fontWeight: 500 }}>
              {t.lengthLabel}
            </label>
            <span style={{
              background: "rgba(99,102,241,0.4)",
              color: "#c7d2fe",
              padding: "0.1rem 0.7rem",
              borderRadius: "99px",
              fontSize: "0.88rem",
              fontWeight: 600,
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
            style={{ width: "100%", accentColor: "#818cf8", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem" }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>4</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>32</span>
          </div>
        </div>

        {/* Symbols Toggle */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "12px",
          padding: "0.85rem 1rem",
          marginBottom: "1.75rem",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.9rem", fontWeight: 500 }}>
              {t.symbolsLabel}
            </div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", marginTop: "0.1rem" }}>
              {t.symbolsDesc}
            </div>
          </div>
          <button
            onClick={() => setUseSymbols(!useSymbols)}
            style={{
              width: "48px",
              height: "26px",
              borderRadius: "99px",
              border: "none",
              cursor: "pointer",
              background: useSymbols ? "#6366f1" : "rgba(255,255,255,0.15)",
              position: "relative",
              transition: "background 0.25s",
              flexShrink: 0,
            }}
          >
            <span style={{
              position: "absolute",
              top: "3px",
              left: useSymbols ? "25px" : "3px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#fff",
              transition: "left 0.25s",
              boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            }} />
          </button>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          style={{
            width: "100%",
            padding: "0.9rem",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.02em",
            boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
            transition: "opacity 0.2s, transform 0.1s",
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = "0.9")}
          onMouseOut={e => (e.currentTarget.style.opacity = "1")}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          {t.generateBtn}
        </button>

        {copied && (
          <p style={{ textAlign: "center", color: "#86efac", fontSize: "0.82rem", marginTop: "0.75rem" }}>
            {t.copied}
          </p>
        )}
      </div>
    </div>
  );
}
