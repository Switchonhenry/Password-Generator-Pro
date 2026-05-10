const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!#$%&()*+";

const i18n = {
  zh: {
    title: "密碼製造器",
    placeholder: "點擊「生成密碼」開始...",
    lengthLabel: "密碼長度",
    symbolsLabel: "包含符號",
    generateBtn: "✨ 生成密碼",
    strengthLabel: "密碼強度",
    copied: "已複製到剪貼簿！",
    weak: "太弱", fair: "普通", good: "良好", strong: "強",
    langBtn: "EN",
  },
  en: {
    title: "Password Generator",
    placeholder: 'Click "Generate" to start...',
    lengthLabel: "Password Length",
    symbolsLabel: "Include Symbols",
    generateBtn: "✨ Generate Password",
    strengthLabel: "Strength",
    copied: "Copied to clipboard!",
    weak: "Weak", fair: "Fair", good: "Good", strong: "Strong",
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
  $("lengthLabel").textContent = t.lengthLabel;
  $("symbolsLabel").textContent = t.symbolsLabel;
  $("generateBtn").textContent = t.generateBtn;
  $("strengthLabel").textContent = t.strengthLabel;
  $("langBtn").textContent = t.langBtn;
  document.title = lang === "zh" ? "密碼製造器" : "Password Generator";

  const display = $("passwordDisplay");
  if (!password) {
    display.textContent = t.placeholder;
    display.classList.add("placeholder");
  }
}

function generatePassword(length, symbols) {
  const pool = LETTERS + NUMBERS + (symbols ? SYMBOLS : "");
  let chars = Array.from({ length }, () => pool[Math.floor(Math.random() * pool.length)]);
  if (symbols) {
    const extra = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < extra; i++) {
      chars.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    }
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
  }
  return chars.join("");
}

function getStrength(pw) {
  const t = i18n[lang];
  const score = [/[A-Z]/, /[a-z]/, /[0-9]/, /[!#$%&()*+]/].filter(r => r.test(pw)).length;
  const len = pw.length;
  if (len < 6)              return { label: t.weak,   color: "#ef4444", width: "20%" };
  if (score <= 2 || len < 10) return { label: t.fair, color: "#f97316", width: "45%" };
  if (score === 3 || len < 14) return { label: t.good, color: "#eab308", width: "70%" };
  return                         { label: t.strong,   color: "#22c55e", width: "100%" };
}

function updateStrength() {
  const wrap = $("strengthWrap");
  if (!password) { wrap.style.display = "none"; return; }
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
  $("copyBtn").style.display = "inline-block";
  $("copiedMsg").textContent = "";
  $("copyBtn").textContent = "📋";
  $("copyBtn").classList.remove("copied");
  updateStrength();
});

// Copy
$("copyBtn").addEventListener("click", () => {
  if (!password) return;
  navigator.clipboard.writeText(password).then(() => {
    $("copyBtn").textContent = "✅";
    $("copyBtn").classList.add("copied");
    $("copiedMsg").textContent = i18n[lang].copied;
    setTimeout(() => {
      $("copyBtn").textContent = "📋";
      $("copyBtn").classList.remove("copied");
      $("copiedMsg").textContent = "";
    }, 2000);
  });
});

// Language toggle
$("langBtn").addEventListener("click", () => {
  lang = lang === "zh" ? "en" : "zh";
  password = "";
  $("passwordDisplay").textContent = i18n[lang].placeholder;
  $("passwordDisplay").classList.add("placeholder");
  $("copyBtn").style.display = "none";
  $("strengthWrap").style.display = "none";
  $("copiedMsg").textContent = "";
  applyLang();
});

// Init
applyLang();
