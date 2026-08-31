import { Menu, Terminal, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageProvider";
import SettingsDropdown from "./SettingsDropdown";

const links = [
  ["about", "#about"],
  ["skills", "#skills"],
  ["projects", "#projects"],
  ["contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4">
      <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl border border-slate-200/80 bg-white/95 dark:border-white/10 dark:bg-[#0B0F19]/95 px-4 py-3 shadow-lg shadow-slate-950/10 backdrop-blur-xl sm:px-5">
        <a href="#home" className="flex items-center gap-2 rounded-md font-mono-tech text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
          <Terminal size={18} className="text-blue-400" aria-hidden="true" />
          <span>yethiha<span className="text-green-400">@</span>dev</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map(([key, href]) => (
            <a key={href} href={href} className="rounded-md px-2 py-2 text-sm text-slate-600 transition dark:text-slate-400 hover:text-slate-950 dark:hover:bg-white/5 dark:hover:bg-white/5 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              {t(`nav.${key}`)}
            </a>
          ))}
          <SettingsDropdown />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <SettingsDropdown />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-lg p-2 text-slate-700 transition dark:text-slate-300 hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/5 dark:hover:bg-white/5 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#0B0F19] p-3 shadow-xl shadow-slate-950/20 backdrop-blur-xl md:hidden">
          {links.map(([key, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm text-slate-700 transition dark:text-slate-300 hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/5 dark:hover:bg-white/5 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              {t(`nav.${key}`)}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
