// Language options for SEAblings Word.
// v1 (§6.4): verified basics — ASEAN official languages + the languages Anthony named
// (Rakhine/Arakan, East Timor's top 2 official — verified: Tetum + Portuguese,
// plus Mandarin and Cantonese).
// NOTE (§6.4, unconfirmed): the exact "top 20 languages spoken in the ASEAN region" list —
// we use a representative sample here; confirm with Anthony (plan SEAblings_Word_plan.md §6.4).
// Each entry maps to an ASEAN country (equal coverage is over the 11 ASEAN countries).
export interface LanguageOption {
  code: string;
  name: string;
  country: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "id", name: "Bahasa Indonesia", country: "indonesia" },
  { code: "ms", name: "Bahasa Melayu (Malay)", country: "malaysia" },
  { code: "en", name: "English", country: "philippines" }, // §6.4 note: English posts attributed to Philippines (official there)
  { code: "th", name: "ไทย (Thai)", country: "thailand" },
  { code: "vi", name: "Tiếng Việt (Vietnamese)", country: "vietnam" },
  { code: "my", name: "မြန်မာ (Burmese)", country: "myanmar" },
  { code: "km", name: "ខ្មែរ (Khmer)", country: "cambodia" },
  { code: "tl", name: "Tagalog", country: "philippines" },
  { code: "lo", name: "ລາວ (Lao)", country: "laos" },
  { code: "br", name: "Bahasa Melayu (Brunei)", country: "brunei" },
  { code: "rki", name: "Rakhine (Arakan)", country: "myanmar" },
  { code: "tet", name: "Tetum", country: "east-timor" },
  { code: "pt", name: "Português (Portuguese)", country: "east-timor" },
  { code: "zh", name: "中文 (Mandarin)", country: "singapore" }, // §6.4 note: Mandarin attributed to Singapore
  { code: "yue", name: "粤语 (Cantonese)", country: "malaysia" },
  { code: "ilo", name: "Ilocano", country: "philippines" }, // Philippines' regional language
  { code: "ceb", name: "Cebuano", country: "philippines" }, // Philippines' regional language
];
