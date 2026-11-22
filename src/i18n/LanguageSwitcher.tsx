"use client";
import { useEffect, useState } from "react";
import { useLanguageStore } from "@/i18n/store";
import { LANGUAGES } from "@/i18n/config";
import { t } from "@/i18n/t";

export default function LanguageSwitcher() {
  const { lang, setLanguage } = useLanguageStore();
  const m = t(lang);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  void touched;
  return (
    <>
      <label className="sr-only" htmlFor="language-switcher">
        {m.ariaLanguageLabel}
      </label>
      <select
        id="language-switcher"
        value={lang}
        onChange={(e) => setLanguage(e.target.value)}
        className="max-w-[11rem] w-full rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.flag} {l.label}
          </option>
        ))}
      </select>
    </>
  );
}
