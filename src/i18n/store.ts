// src/i18n/store.ts — active language store for SEAblings (client)
"use client";
import { useCallback, useEffect, useState } from "react";
import { LANGUAGES } from "./config";

const STORAGE_KEY = "sea_blings_lang";

function isSupported(code: string | null): code is string {
  return !!code && LANGUAGES.some((l) => l.code === code);
}

export function readStoredLanguage(): string {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isSupported(stored) ? stored : "en";
}

export function useLanguageStore() {
  const [lang, setLang] = useState<string>("en");

  useEffect(() => {
    const code = readStoredLanguage();
    setLang(code);
    document.documentElement.lang = code;
  }, []);

  const setLanguage = useCallback((code: string) => {
    window.localStorage.setItem(STORAGE_KEY, code);
    setLang(code);
    document.documentElement.lang = code;
  }, []);

  return { lang, setLanguage };
}
