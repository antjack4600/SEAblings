// src/components/AseanFlags.tsx — the 11 ASEAN member-state flags.
// Flags are decorative; one authored localized sentence is the accessible summary.
"use client";
import { useLanguageStore } from "@/i18n/store";
import { LANGUAGES } from "@/i18n/config";
import { t } from "@/i18n/t";

const ASEAN = [
  { region: "ID", flag: "🇮🇩" },
  { region: "MY", flag: "🇲🇾" },
  { region: "SG", flag: "🇸🇬" },
  { region: "TH", flag: "🇹🇭" },
  { region: "VN", flag: "🇻🇳" },
  { region: "MM", flag: "🇲🇲" },
  { region: "KH", flag: "🇰🇭" },
  { region: "LA", flag: "🇱🇦" },
  { region: "BN", flag: "🇧🇳" },
  { region: "PH", flag: "🇵🇭" },
  { region: "TL", flag: "🇹🇱" },
];

export default function AseanFlags() {
  const { lang } = useLanguageStore();
  const m = t(lang);
  const locale = LANGUAGES.find((l) => l.code === lang)?.locale ?? "en-US";
  let displayNames: Intl.DisplayNames | null = null;
  try {
    displayNames = new Intl.DisplayNames([locale], { type: "region" });
  } catch {
    displayNames = null;
  }

  return (
    <div className="asean-strip relative mt-3 text-center">
      <svg className="asean-silhouette" viewBox="0 0 320 40" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 30 Q40 8 80 26 T160 18 T240 28 T320 14 L320 40 L0 40 Z" />
      </svg>
      <div data-asean-summary className="relative text-[11px] font-semibold tracking-wide text-gold/90 sm:text-xs">
        {m.aseanLabel}
      </div>
      <div aria-hidden="true" className="relative mt-1 flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
        {ASEAN.map((country) => (
          <span
            key={country.region}
            data-flag-chip
            title={displayNames?.of(country.region) ?? country.region}
            className="asean-chip"
          >
            {country.flag}
          </span>
        ))}
      </div>
    </div>
  );
}
