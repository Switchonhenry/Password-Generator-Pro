const BG_PALETTES = [
  {
    bg: ["#1e1b4b", "#312e81"],
    accent: "#6366f1",
    accent2: "#8b5cf6",
    badgeBg: "rgba(99,102,241,0.35)",
    badgeText: "#c7d2fe",
    boxBorder: "rgba(99,102,241,0.4)",
    slider: "#818cf8",
  },
  {
    bg: ["#1a1a2e", "#16213e"],
    accent: "#0ea5e9",
    accent2: "#38bdf8",
    badgeBg: "rgba(14,165,233,0.3)",
    badgeText: "#bae6fd",
    boxBorder: "rgba(14,165,233,0.4)",
    slider: "#38bdf8",
  },
  {
    bg: ["#0f2027", "#203a43"],
    accent: "#06b6d4",
    accent2: "#22d3ee",
    badgeBg: "rgba(6,182,212,0.3)",
    badgeText: "#a5f3fc",
    boxBorder: "rgba(6,182,212,0.4)",
    slider: "#22d3ee",
  },
  {
    bg: ["#1b2838", "#2a475e"],
    accent: "#3b82f6",
    accent2: "#60a5fa",
    badgeBg: "rgba(59,130,246,0.3)",
    badgeText: "#bfdbfe",
    boxBorder: "rgba(59,130,246,0.4)",
    slider: "#60a5fa",
  },
  {
    bg: ["#0d1b2a", "#1b263b"],
    accent: "#8b5cf6",
    accent2: "#a78bfa",
    badgeBg: "rgba(139,92,246,0.3)",
    badgeText: "#ede9fe",
    boxBorder: "rgba(139,92,246,0.4)",
    slider: "#a78bfa",
  },
  {
    bg: ["#1a0533", "#3b0764"],
    accent: "#d946ef",
    accent2: "#e879f9",
    badgeBg: "rgba(217,70,239,0.3)",
    badgeText: "#f5d0fe",
    boxBorder: "rgba(217,70,239,0.4)",
    slider: "#e879f9",
  },
  {
    bg: ["#052e16", "#14532d"],
    accent: "#22c55e",
    accent2: "#4ade80",
    badgeBg: "rgba(34,197,94,0.3)",
    badgeText: "#bbf7d0",
    boxBorder: "rgba(34,197,94,0.4)",
    slider: "#4ade80",
  },
  {
    bg: ["#431407", "#7c2d12"],
    accent: "#f97316",
    accent2: "#fb923c",
    badgeBg: "rgba(249,115,22,0.3)",
    badgeText: "#fed7aa",
    boxBorder: "rgba(249,115,22,0.4)",
    slider: "#fb923c",
  },
  {
    bg: ["#1c1917", "#44403c"],
    accent: "#a8a29e",
    accent2: "#d6d3d1",
    badgeBg: "rgba(168,162,158,0.25)",
    badgeText: "#f5f5f4",
    boxBorder: "rgba(168,162,158,0.4)",
    slider: "#d6d3d1",
  },
  {
    bg: ["#0c1445", "#1e3a5f"],
    accent: "#38bdf8",
    accent2: "#7dd3fc",
    badgeBg: "rgba(56,189,248,0.3)",
    badgeText: "#e0f2fe",
    boxBorder: "rgba(56,189,248,0.4)",
    slider: "#7dd3fc",
  },
];

const PALETTE = BG_PALETTES[Math.floor(Math.random() * BG_PALETTES.length)];

(function applyTheme() {
  const [c1, c2] = PALETTE.bg;
  document.body.style.background = `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c1} 100%)`;
  document.documentElement.style.setProperty("--accent", PALETTE.accent);
  document.documentElement.style.setProperty("--accent2", PALETTE.accent2);
  document.documentElement.style.setProperty("--badge-bg", PALETTE.badgeBg);
  document.documentElement.style.setProperty("--badge-text", PALETTE.badgeText);
  document.documentElement.style.setProperty("--box-border", PALETTE.boxBorder);
  document.documentElement.style.setProperty("--slider-color", PALETTE.slider);
})();

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!#$%&()*+";

const i18n = {
  zh: {
    title: "Password Pro",
    subtitle: "值得信賴的安全：100% 本地生成，零數據紀錄。",
    placeholder: "點擊「生成密碼」開始...",
    lengthLabel: "密碼長度",
    symbolsLabel: "包含符號",
    generateBtn: "✨ 生成密碼",
    strengthLabel: "密碼強度",
    copied: "已複製到剪貼簿！",
    weak: "太弱",
    fair: "普通",
    good: "良好",
    strong: "強",
    langBtn: "EN",
  },
  en: {
    title: "Password Pro",
    subtitle: "Security You Can Trust: 100% Local Generation, Zero Data Logs.",
    placeholder: 'Tap "Generate" to start...',
    lengthLabel: "Password Length",
    symbolsLabel: "Include Symbols",
    generateBtn: "✨ Generate Password",
    strengthLabel: "Strength",
    copied: "Copied to clipboard!",
    weak: "Weak",
    fair: "Fair",
    good: "Good",
    strong: "Strong",
    langBtn: "中文",
  },
};

let lang = "zh";
let password = "";
let useSymbols = false;

const $ = (id) => document.getElementById(id);

function applyLang() {
  const t = i18n[lang];
  $("title").textContent = t.title;
  $("subtitle").textContent = t.subtitle;
  $("lengthLabel").textContent = t.lengthLabel;
  $("symbolsLabel").textContent = t.symbolsLabel;
  $("generateBtn").textContent = t.generateBtn;
  $("strengthLabel").textContent = t.strengthLabel;
  $("langBtn").textContent = t.langBtn;
  document.title = "Password Pro";

  const display = $("passwordDisplay");
  if (!password) {
    display.textContent = t.placeholder;
    display.classList.add("placeholder");
  }
}

function showCopied() {
  const msg = $("copiedMsg");
  $("copyIcon").textContent = "✅";
  $("copyIcon").classList.add("copied");
  msg.textContent = i18n[lang].copied;
  msg.classList.add("visible");
  setTimeout(() => {
    $("copyIcon").textContent = "⎘";
    $("copyIcon").classList.remove("copied");
    msg.classList.remove("visible");
  }, 2000);
}

function generatePassword(length, useSymbols) {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!#$%&()*+";
  const pool = letters + numbers + (useSymbols ? symbols : "");

  const chars = [];

  if (useSymbols) {
    chars.push(symbols[Math.floor(Math.random() * symbols.length)]);
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

function getStrength(pw) {
  const t = i18n[lang];
  const score = [/[A-Z]/, /[a-z]/, /[0-9]/, /[!#$%&()*+]/].filter((r) =>
    r.test(pw),
  ).length;
  const len = pw.length;
  if (len < 6) return { label: t.weak, color: "#ff453a", width: "20%" };
  if (score <= 2 || len < 10)
    return { label: t.fair, color: "#ff9f0a", width: "45%" };
  if (score === 3 || len < 14)
    return { label: t.good, color: "#ffd60a", width: "70%" };
  return { label: t.strong, color: "#30d158", width: "100%" };
}

function updateStrength() {
  const wrap = $("strengthWrap");
  if (!password) {
    wrap.style.display = "none";
    return;
  }
  const s = getStrength(password);
  wrap.style.display = "block";
  $("strengthValue").textContent = s.label;
  $("strengthValue").style.color = s.color;
  const fill = $("strengthFill");
  fill.style.width = s.width;
  fill.style.background = s.color;
}

// Slider
const slider = $("lengthSlider");
slider.addEventListener("input", () => {
  $("lengthValue").textContent = slider.value;
});

// Symbol toggle
$("symbolToggle").addEventListener("click", () => {
  useSymbols = !useSymbols;
  const btn = $("symbolToggle");
  btn.dataset.on = String(useSymbols);
  btn.setAttribute("aria-pressed", String(useSymbols));
});

// Generate
$("generateBtn").addEventListener("click", () => {
  password = generatePassword(Number(slider.value), useSymbols);
  const display = $("passwordDisplay");
  display.textContent = password;
  display.classList.remove("placeholder");
  $("copyIcon").style.display = "inline";
  $("copiedMsg").classList.remove("visible");
  $("copyIcon").textContent = "⎘";
  $("copyIcon").classList.remove("copied");
  updateStrength();
});

// Copy on output box click
$("outputBox").addEventListener("click", () => {
  if (!password) return;
  navigator.clipboard.writeText(password).then(showCopied);
});

// Language toggle
$("langBtn").addEventListener("click", () => {
  lang = lang === "zh" ? "en" : "zh";
  password = "";
  $("passwordDisplay").textContent = i18n[lang].placeholder;
  $("passwordDisplay").classList.add("placeholder");
  $("copyIcon").style.display = "none";
  $("strengthWrap").style.display = "none";
  $("copiedMsg").classList.remove("visible");
  applyLang();
});

// Init
applyLang();
