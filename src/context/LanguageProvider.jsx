import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "../locales/en.json";
import my from "../locales/my.json";

const STORAGE_KEY = "teacher-dev-portfolio-language";

const dictionaries = {
  en,
  my,
};

const LanguageContext = createContext(null);

function getInitialLanguage() {
  if (typeof window === "undefined") {
    return "en";
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved === "en" || saved === "my") {
      return saved;
    }
  } catch {
    // localStorage may be unavailable.
  }

  return "en";
}

function getValue(dictionary, key) {
  return key.split(".").reduce((value, part) => {
    return value?.[part];
  }, dictionary);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage errors.
    }

    document.documentElement.lang = language === "my" ? "my" : "en";
  }, [language]);

  const value = useMemo(() => {
    const dictionary = dictionaries[language] ?? dictionaries.en;

    const t = (key, fallback) => {
      const translated = getValue(dictionary, key);

      /*
       * Return strings, arrays, and objects.
       * This is important for hero.roles.
       */
      if (
        typeof translated === "string" ||
        Array.isArray(translated) ||
        (translated !== null &&
          typeof translated === "object")
      ) {
        return translated;
      }

      const englishFallback = getValue(dictionaries.en, key);

      if (
        typeof englishFallback === "string" ||
        Array.isArray(englishFallback) ||
        (englishFallback !== null &&
          typeof englishFallback === "object")
      ) {
        return englishFallback;
      }

      return fallback ?? key;
    };

    return {
      language,
      setLanguage,
      t,
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}