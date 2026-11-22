// src/i18n/t.ts — translation helper for SEAblings
import { getMessages } from "./translations";

export function t(lang: string) {
  return getMessages(lang);
}
