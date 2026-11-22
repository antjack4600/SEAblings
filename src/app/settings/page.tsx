// src/app/settings/page.tsx — Settings: dark mode toggle (Light / Dark / System)
"use client";
import { useMode, type Mode } from "@/hooks/useMode";

const options: Array<{ value: Mode; label: string }> = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System (default)" },
];

export default function SettingsPage() {
  const { mode, setMode } = useMode();
  return (
    <main className="min-h-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-foreground/60 mt-1">Appearance and app settings</p>

        <label className="mt-6 block text-sm font-medium text-foreground/70">
          Dark mode
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <p className="mt-6 text-xs text-foreground/40">
          Dark mode applies across every page. Choose System to follow your computer&apos;s
          setting.
        </p>
      </div>
    </main>
  );
}
