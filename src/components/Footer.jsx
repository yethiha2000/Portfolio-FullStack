import { Heart, Terminal } from "lucide-react";
import { useLanguage } from "../context/LanguageProvider";

const links = [
  ["nav.about", "#about"],
  ["nav.skills", "#skills"],
  ["nav.projects", "#projects"],
  ["nav.contact", "#contact"],
];

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-100 px-5 py-8 text-slate-600 dark:border-white/10 dark:bg-[#0B0F19] dark:text-slate-400 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3 md:items-start">
        <div>
          <a href="#home" className="inline-flex items-center gap-2 rounded-md font-mono-tech text-sm font-semibold text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-100 dark:focus-visible:ring-blue-400">
            <Terminal size={16} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
            yethiha<span className="text-green-600 dark:text-green-400">@</span>dev
          </a>
          <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">{t("footer.builtWith")}</p>
        </div>

        <nav aria-label={t("footer.quickLinks")}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-300">{t("footer.quickLinks")}</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4 md:grid-cols-2">
            {links.map(([key, href]) => (
              <li key={href}>
                <a href={href} className="inline-flex min-h-10 items-center rounded-md text-slate-600 transition hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:text-white dark:focus-visible:ring-blue-400">{t(key)}</a>
              </li>
            ))}
          </ul>
        </nav>

        
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 dark:border-white/5 dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>© {currentYear} Ye Thiha. {t("footer.copyright")}</p>
        <p>{t("footer.builtWith")}</p>
      </div>
    </footer>
  );
}
