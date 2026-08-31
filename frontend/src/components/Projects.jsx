import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Shield } from "lucide-react";
import { useLanguage } from "../context/LanguageProvider";
import { projects } from "../data/projects";
import { SectionLabel } from "./About";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>{t("projects.label")}</SectionLabel>
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">{t("projects.title")}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">{t("projects.description")}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article key={project.titleKey} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.06 }} whileHover={{ y: -7 }} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                  {project.category === "Security" ? <Shield size={20} aria-hidden="true" /> : <Code2 size={20} aria-hidden="true" />}
                </div>
                <ArrowUpRight size={20} className="text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600 dark:text-slate-600 dark:group-hover:text-blue-400" aria-hidden="true" />
              </div>
              <p className="mt-7 font-mono-tech text-[10px] uppercase tracking-[.2em] text-green-700 dark:text-green-400">{project.category}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{t(project.titleKey)}</h3>
              <p className="mt-3 min-h-20 text-sm leading-7 text-slate-600 dark:text-slate-400">{t(project.descriptionKey)}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => <span key={tag} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono-tech text-[10px] text-slate-600 dark:border-white/5 dark:bg-white/5 dark:text-slate-400">{tag}</span>)}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-blue-500 to-green-500 transition-transform duration-500 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
