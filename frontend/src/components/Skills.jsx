import { motion } from "framer-motion";
import { Code2, GraduationCap, ShieldCheck, Smartphone } from "lucide-react";
import { useLanguage } from "../context/LanguageProvider";
import { SectionLabel } from "./About";

const groups = [
  [Code2, "skills.frontend", ["HTML", "CSS", "JavaScript", "React", "Vite", "Node.js", "Express", "REST APIs", "MongoDB"], "blue"],
  [Smartphone, "skills.mobile", ["React Native", "Expo", "TypeScript", "Mobile UI/UX", "Responsive Design", "Offline-first Apps"], "green"],
  [ShieldCheck, "skills.security", ["Linux", "Networking", "Nmap", "Burp Suite", "OWASP Top 10", "Web Security", "Reconnaissance", "Python Automation"], "green"],
  [GraduationCap, "skills.soft", ["Teaching", "Mentoring", "Communication", "Problem Solving", "Critical Thinking", "Teamwork"], "blue"],
];

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>{t("skills.label")}</SectionLabel>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {groups.map(([Icon, titleKey, skills, color], index) => (
            <motion.div key={titleKey} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className={`glass rounded-3xl p-6 ${color === "green" ? "glow-green" : "glow-blue"}`}>
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-slate-100 p-3 dark:bg-white/5"><Icon size={22} className={color === "green" ? "text-green-700 dark:text-green-400" : "text-blue-600 dark:text-blue-400"} aria-hidden="true" /></div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{t(titleKey)}</h3>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {skills.map((skill) => <span key={skill} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono-tech text-xs text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/5 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/15 dark:hover:text-white">{skill}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
