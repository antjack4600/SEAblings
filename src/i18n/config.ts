// src/i18n/config.ts — language configuration for SEAblings
export interface Language {
  code: string;       // i18n key (en, id, ms, ...)
  name: string;       // endonym (English names)
  label: string;      // label in the dropdown
  locale: string;     // locale for Intl (Intl.NumberFormat, dates)
  flag: string;       // emoji flag
}

// LANGUAGES — list of supported languages.
// Spec: all ASEAN languages (where representable) + user-named ones.
// Limit: 20 or fewer.
export const LANGUAGES: Language[] = [
  { code: "en", name: "English", label: "English", locale: "en-US", flag: "🇺🇸" },
  { code: "id", name: "Bahasa Indonesia", label: "Bahasa Indonesia", locale: "id-ID", flag: "🇮🇩" },
  { code: "ms", name: "Bahasa Melayu", label: "Bahasa Melayu (Malaysia)", locale: "ms-MY", flag: "🇲🇾" },
  { code: "th", name: "ไทย", label: "ไทย (Thai)", locale: "th-TH", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", label: "Tiếng Việt (Vietnamese)", locale: "vi-VN", flag: "🇻🇳" },
  { code: "my", name: "မြန်မာ", label: "မြန်မာ (Burmese)", locale: "my-MM", flag: "🇲🇲" },
  { code: "km", name: "ខ្មែរ", label: "ខ្មែរ (Khmer)", locale: "km-KH", flag: "🇰🇭" },
  { code: "tl", name: "Tagalog", label: "Tagalog (Philippines)", locale: "fil-PH", flag: "🇵🇭" },
  { code: "lo", name: "ລາວ", label: "ລາວ (Lao)", locale: "lo-LA", flag: "🇱🇦" },
  { code: "br", name: "Bahasa Melayu", label: "Bahasa Melayu (Brunei)", locale: "ms-BN", flag: "🇧🇳" },
  { code: "rki", name: "Arakanese", label: "Rakhine (Arakan) (Myanmar)", locale: "my-MM", flag: "🇲🇲" },
  { code: "pt", name: "Português", label: "Português (East Timor)", locale: "pt-PT", flag: "🇹🇱" },
  { code: "tet", name: "Tetum", label: "Tetum (East Timor)", locale: "tet-TL", flag: "🇹🇱" },
  { code: "zh", name: "中文", label: "中文 (Mandarin)", locale: "zh-CN", flag: "🇨🇳" },
  { code: "yue", name: "粤語", label: "粤語 (Cantonese)", locale: "yue-HK", flag: "🇭🇰" },
];

export const DEFAULT_LANGUAGE: Language = LANGUAGES[0]; // English default
