import type { Post } from "./types";
import { getDb } from "./db";
import { LANGUAGES } from "./languages";

// Equal per-ASEAN-country coverage (plan §4).
// Derived from the language list: each language maps to one of the ASEAN countries.
export const UNIQUE_COUNTRIES: string[] = [...new Set(LANGUAGES.map((l) => l.country))];

// Round-robin: return the newest posts spread evenly across the ASEAN countries,
// so each country gets an equal share of the feed (plan §4).
export function roundRobinFeed(limit = 30): Post[] {
  const rows = getDb().prepare("SELECT * FROM posts ORDER BY created_at DESC").all() as Post[];
  const byCountry = new Map<string, Post[]>();
  for (const p of rows) {
    if (!UNIQUE_COUNTRIES.includes(p.country_code)) continue;
    const list = byCountry.get(p.country_code) ?? [];
    list.push(p);
    byCountry.set(p.country_code, list);
  }
  const result: Post[] = [];
  for (;;) {
    for (const c of UNIQUE_COUNTRIES) {
      const list = byCountry.get(c) ?? [];
      const next = list.shift();
      if (next) result.push(next);
      if (result.length >= limit) break;
    }
    if (result.length >= limit || UNIQUE_COUNTRIES.every((c) => !(byCountry.get(c)?.length))) break;
  }
  return result.slice(0, limit);
}
