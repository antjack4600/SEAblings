"use client";
import { useEffect, useState } from "react";
import { useLanguageStore } from "@/i18n/store";
import { LANGUAGES } from "@/i18n/config";
import { t } from "@/i18n/t";

export default function LanguageSwitcher({
  id = "language-switcher",
}: {
  id?: string;
}) {
  const { lang, setLanguage } = useLanguageStore();
  const m = t(lang);
  const [touched, setTouched] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  void touched;
  return (
    <div className="language-pill">
      <span aria-hidden="true" className="text-sm leading-none">🌐</span>
      <span aria-hidden="true" className="text-sm leading-none">{current.flag}</span>
      <span className="hidden max-w-[6.5rem] truncate text-xs font-medium text-foreground/80 sm:inline">
        {current.label}
      </span>
      <span className="language-count" aria-hidden="true">{m.languageCount}</span>
      <label className="sr-only" htmlFor={id}>
        {m.ariaLanguageLabel}
      </label>
      <select
        id={id}
        value={lang}
        onChange={(e) => {
          setTouched(true);
          setLanguage(e.target.value);
        }}
        className="language-select"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.flag} {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
