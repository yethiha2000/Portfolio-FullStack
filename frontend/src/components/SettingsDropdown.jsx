import { Check, Languages, Moon, Settings, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageProvider";
import { useTheme } from "../context/ThemeProvider";

export default function SettingsDropdown() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const containerRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label={t("settings.open")} aria-expanded={open} aria-haspopup="menu" className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-blue-400">
        <Settings size={18} aria-hidden="true" />
      </button>

      {open && (
        <div role="menu" aria-label={t("settings.title")} className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/15 dark:border-white/10 dark:bg-[#0B0F19] dark:shadow-black/30">
          <p className="px-3 pb-2 pt-1 text-xs font-semibold text-slate-900 dark:text-slate-100">{t("settings.title")}</p>

          <div className="border-t border-slate-200 pt-3 dark:border-white/10">
            <p className="px-3 text-[11px] font-mono-tech uppercase tracking-wider text-slate-500">{t("settings.theme")}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <OptionButton active={theme === "light"} label={t("settings.light")} onClick={() => { setTheme("light"); setOpen(false); }}><Sun size={16} aria-hidden="true" /></OptionButton>
              <OptionButton active={theme === "dark"} label={t("settings.dark")} onClick={() => { setTheme("dark"); setOpen(false); }}><Moon size={16} aria-hidden="true" /></OptionButton>
            </div>
          </div>

          <div className="mt-4 border-t border-slate-200 pt-3 dark:border-white/10">
            <p className="px-3 text-[11px] font-mono-tech uppercase tracking-wider text-slate-500">{t("settings.language")}</p>
            <div className="mt-2 space-y-1">
              <LanguageButton active={language === "en"} label={t("settings.english")} onClick={() => { setLanguage("en"); setOpen(false); }} />
              <LanguageButton active={language === "my"} label={t("settings.burmese")} onClick={() => { setLanguage("my"); setOpen(false); }} />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 px-3 pb-1 text-[10px] text-slate-500 dark:text-slate-600">
            <Languages size={12} aria-hidden="true" />
            <span>EN / MY</span>
          </div>
        </div>
      )}
    </div>
  );
}

function OptionButton({ active, label, onClick, children }) {
  return (
    <button type="button" role="menuitemradio" aria-checked={active} onClick={onClick} className={`flex min-h-10 items-center justify-center gap-2 rounded-xl border px-3 text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 ${active ? "border-blue-500/40 bg-blue-50 text-blue-700 dark:border-blue-400/40 dark:bg-blue-400/10 dark:text-blue-300" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-slate-100"}`}>
      {children}
      {label}
      {active && <Check size={14} aria-hidden="true" />}
    </button>
  );
}

function LanguageButton({ active, label, onClick }) {
  return (
    <button type="button" role="menuitemradio" aria-checked={active} onClick={onClick} className={`flex min-h-10 w-full items-center justify-between rounded-xl px-3 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 ${active ? "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-100"}`}>
      <span>{label}</span>
      {active && <Check size={15} aria-hidden="true" />}
    </button>
  );
}
