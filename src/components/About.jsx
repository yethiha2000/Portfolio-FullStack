import { motion } from "framer-motion";
import { BookOpen, Lightbulb, Shield, Users } from "lucide-react";
import { useLanguage } from "../context/LanguageProvider";

export function SectionLabel({ children }) {
  return <p className="font-mono-tech text-xs tracking-[.2em] text-green-700 dark:text-green-400">{children}</p>;
}

export default function About() {
  const { t } = useLanguage();
  const values = [
    [BookOpen, t("about.teach"), t("about.teachText")],
    [Lightbulb, t("about.build"), t("about.buildText")],
    [Shield, t("about.secure"), t("about.secureText")],
    [Users, t("about.mentor"), t("about.mentorText")],
  ];

  return (
    <section id="about" className="px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>{t("about.label")}</SectionLabel>
        <div className="mt-8 grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-7 sm:p-9">
            <p className="font-mono-tech text-sm leading-8 text-slate-600 dark:text-slate-400">
              <span className="text-green-700 dark:text-green-400">01</span> {t("about.principle1")}<br />
              <span className="text-green-700 dark:text-green-400">02</span> {t("about.principle2")}<br />
              <span className="text-green-700 dark:text-green-400">03</span> {t("about.principle3")}<br />
              <span className="text-green-700 dark:text-green-400">04</span> {t("about.principle4")}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{t("about.title")}</h2>
            <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base dark:text-slate-400">{t("about.paragraph1")}</p>
            <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base dark:text-slate-400">{t("about.paragraph2")}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {values.map(([Icon, title, text]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:bg-slate-50 dark:border-white/5 dark:bg-white/[.025] dark:shadow-none dark:hover:border-blue-400/20 dark:hover:bg-white/[.04]">
                  <Icon size={20} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
