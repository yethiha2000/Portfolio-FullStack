import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageProvider";
import { SectionLabel } from "./About";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState("idle");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to send your message.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>{t("contact.label")}</SectionLabel>

        <div className="mt-8 grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-7 sm:p-9"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-green-400/10 dark:text-green-400">
              <ShieldCheck size={23} aria-hidden="true" />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
              {t("contact.title")}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {t("contact.description")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <SocialLink
                href="https://github.com/"
                icon={<Github size={17} />}
                label="GitHub"
              />
              <SocialLink
                href="https://www.linkedin.com/"
                icon={<Linkedin size={17} />}
                label="LinkedIn"
              />
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-7 sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t("contact.name")}
                placeholder={t("contact.namePlaceholder")}
                name="name"
                type="text"
              />
              <Field
                label={t("contact.email")}
                placeholder={t("contact.emailPlaceholder")}
                name="email"
                type="email"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-medium text-slate-700 dark:text-slate-400"
              >
                {t("contact.message")}
              </label>

              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows="6"
                placeholder={t("contact.messagePlaceholder")}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-600 dark:hover:border-white/20 dark:focus:border-blue-400/50 dark:focus:ring-blue-400/10"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              <Send size={17} aria-hidden="true" />
              {status === "sending" ? t("contact.sending") : t("contact.send")}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`mt-4 text-center text-xs ${
                status === "error"
                  ? "text-red-600 dark:text-red-400"
                  : status === "success"
                    ? "text-green-700 dark:text-green-400"
                    : "text-slate-500 dark:text-slate-600"
              }`}
            >
              {status === "success"
                ? t("contact.success")
                : status === "error"
                  ? t("contact.error")
                  : t("contact.formNote")}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-blue-400"
    >
      {icon}
      {label}
    </a>
  );
}

function Field({ label, placeholder, name, type }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-medium text-slate-700 dark:text-slate-400"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={name}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-600 dark:hover:border-white/20 dark:focus:border-blue-400/50 dark:focus:ring-blue-400/10"
      />
    </div>
  );
}
