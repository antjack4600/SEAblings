// src/i18n/store.ts — one shared language store for every SEAblings component.
"use client";
import { useCallback, useEffect, useSyncExternalStore } from "react";
import { LANGUAGES } from "./config";

const STORAGE_KEY = "sea_blings_lang";

let current = "en";
const listeners = new Set<() => void>();

function isSupported(code: string | null): code is string {
  return !!code && LANGUAGES.some((l) => l.code === code);
}

export function readStoredLanguage(): string {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isSupported(stored) ? stored : "en";
}

function applyLanguage(code: string) {
  current = code;
  if (typeof document !== "undefined") {
    document.documentElement.lang = code;
  }
  listeners.forEach((listener) => listener());
}

function setLanguage(code: string) {
  if (!isSupported(code)) return;
  window.localStorage.setItem(STORAGE_KEY, code);
  applyLanguage(code);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return current;
}

function getServerSnapshot() {
  return "en";
}

export function useLanguageStore() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Hydrate once from storage. Every component shares the same snapshot, so a
  // single change re-renders all consumers, not just the component that made it.
  useEffect(() => {
    const stored = readStoredLanguage();
    if (stored !== current) {
      applyLanguage(stored);
    } else if (typeof document !== "undefined") {
      document.documentElement.lang = stored;
    }
  }, []);

  return { lang, setLanguage: useCallback(setLanguage, []) };
}
