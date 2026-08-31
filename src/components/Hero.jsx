
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Code2,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageProvider";
import ProfileCard from "./ProfileCard";

function Typewriter() {
  const { t, language } = useLanguage();

  const roles = t("hero.roles");

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Reset typewriter when language changes
  useEffect(() => {
    setIndex(0);
    setText("");
    setDeleting(false);
  }, [language]);

  useEffect(() => {
    if (!Array.isArray(roles) || roles.length === 0) {
      return;
    }

    const current = roles[index] ?? "";

    // Typing: 75ms per character
    // Deleting: 45ms per character
    // Completed text: wait 1800ms
    const delay = deleting
      ? 45
      : text === current
        ? 1800
        : 75;

    const timer = setTimeout(() => {
      if (!deleting) {
        // Type character by character
        const next = current.slice(0, text.length + 1);

        setText(next);

        // Start deleting after the full role is typed
        if (next === current) {
          setDeleting(true);
        }
      } else {
        // Delete character by character
        const next = current.slice(0, text.length - 1);

        setText(next);

        // Move to the next role
        if (!next) {
          setDeleting(false);
          setIndex((value) => (value + 1) % roles.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, roles]);

  return (
    <span className="font-mono-tech text-blue-600 dark:text-blue-400">
      {text}
      <span
        className="ml-1 animate-pulse text-green-600 dark:text-green-400"
        aria-hidden="true"
      >
        ▋
      </span>
    </span>
  );
}

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="grid-bg relative flex min-h-screen items-center px-5 pb-20 pt-32 sm:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Status Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-2 text-xs text-green-700 dark:border-green-400/20 dark:bg-green-400/5 dark:text-green-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500 dark:bg-green-400" />
            {t("hero.badge")}
          </div>

          {/* Greeting */}
          <p className="mb-4 font-mono-tech text-sm text-slate-600 dark:text-slate-500">
            {t("hero.hello")}
          </p>

          {/* Main Heading */}
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.45] tracking-tight text-slate-900 dark:text-white sm:text-6xl sm:leading-[1.4] lg:text-7xl lg:leading-[1.35]">
  <span className="block pb-2">
    {t("hero.title1")}
  </span>

  <span className="block pb-2 text-slate-600 dark:text-slate-400">
    {t("hero.title2")}
  </span>

  <span className="block bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text pb-2 text-transparent dark:from-blue-400 dark:to-green-400">
    {t("hero.title3")}
  </span>
</h1>

          {/* Character-by-Character Typewriter */}
          <div className="mt-8 min-h-8 text-base sm:text-lg">
            <span className="text-slate-600 dark:text-slate-500">
              {t("hero.imA")}{" "}
            </span>

            <Typewriter />
          </div>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            {t("hero.description")}
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              {t("hero.viewProjects")}

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              {t("hero.contact")}
            </a>
          </div>

          {/* Skill Badges */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Badge
              icon={<GraduationCap size={15} />}
              text={t("hero.teacher")}
            />

            <Badge
              icon={<Code2 size={15} />}
              text={t("hero.developer")}
            />

            <Badge
              icon={<ShieldCheck size={15} />}
              text={t("hero.securityLearner")}
            />
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: 35, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <ProfileCard />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-slate-500 transition hover:text-slate-800 dark:text-slate-600 dark:hover:text-slate-300"
        aria-label={t("hero.scrollAbout")}
      >
        <ArrowDown size={20} className="animate-bounce" />
      </a>
    </section>
  );
}

function Badge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs text-slate-600 transition hover:border-slate-300 hover:bg-slate-200 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:bg-white/5">
      {icon}
      {text}
    </div>
  );
}

