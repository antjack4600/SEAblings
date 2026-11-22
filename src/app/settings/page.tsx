// src/app/settings/page.tsx — Settings: dark mode toggle (Light / Dark / System)
"use client";
import { useMode, type Mode } from "@/hooks/useMode";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";

const options: Array<{ value: Mode; labelKey: "optLight" | "optDark" | "optSystem" }> = [
  { value: "light", labelKey: "optLight" },
  { value: "dark", labelKey: "optDark" },
  { value: "system", labelKey: "optSystem" },
];

export default function SettingsPage() {
  const { mode, setMode } = useMode();
  const { lang } = useLanguageStore();
  const m = t(lang);
  return (
    <main className="min-h-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/ASEANAppLogoimage.png" alt="SEAblings Only" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-foreground">{m.settingsTitle}</h1>
          </div>
          <LanguageSwitcher />
        </div>
        <p className="text-sm text-foreground/60 mt-1">{m.settingsDesc}</p>

        <label className="mt-6 block text-sm font-medium text-foreground/70">
          {m.darkModeLabel}
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {m[o.labelKey]}
              </option>
            ))}
          </select>
        </label>

        <p className="mt-6 text-xs text-foreground/40">
          Dark mode applies across every page. Choose System to follow your computer&apos;s setting.
        </p>
      </div>
    </main>
  );
}
