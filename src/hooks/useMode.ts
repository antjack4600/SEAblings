"use client";
import { useEffect, useState } from "react";

export type Mode = "dark" | "light" | "system";

const STORAGE_KEY = "sea_blings_mode";

function apply(mode: Mode) {
  const root = document.documentElement;
  if (mode === "light") {
    root.classList.add("light");
    root.classList.remove("dark");
  } else {
    root.classList.remove("light");
    if (mode === "system" && !window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("light");
    }
  }
}

export function useMode() {
  const [mode, setModeState] = useState<Mode>("dark");

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Mode | null) ?? "dark";
    setModeState(saved);
    apply(saved);
  }, []);

  const setMode = (next: Mode) => {
    localStorage.setItem(STORAGE_KEY, next);
    setModeState(next);
    apply(next);
  };

  return { mode, setMode };
}
