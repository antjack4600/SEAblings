# Design: Vibrant, fully-localized ASEAN landing + feed

Date: 2026-11-23
Status: Approved by standing instruction (no per-task approval check-ins)

## User goals
1. Landing page should "pop": shaders / visual gradients, more visually attractive.
2. Keep the moving logo, make it ~50% larger.
3. Show the flags of all ASEAN nations (or a regional silhouette) so the regional scope is obvious.
4. Make it immediately obvious that all major ASEAN languages are supported and switchable from a dropdown.
5. Changing language must change **everything** on the site, including Terms of Use and all news in the feed.
6. Add a Terms of Use disclaimer about using the 11 ASEAN member-state names/flags.
7. Chosen approach: **authored translations** (no runtime MT API).

## Constraints carried from the previous landing work
- `/` must remain a single viewport at 1365×900, 390×844, 375×667 — no page scroll, no horizontal overflow.
- All sign-in controls visible immediately; virtual-keyboard reachability preserved.
- 17 languages exactly: `id, ms, en, th, vi, my, km, tl, lo, br, rki, pt, tet, zh, yue, ilo, ceb`. No `ta`, no `fr`.
- CSP allowlist, email/name validation, JPEG/PNG avatar behavior unchanged.
- All app files stay inside `/home/anthony/Desktop/ASEAN News Feed App/`; artifacts in `session-artifacts/`, secrets in `.secrets/` mode 600.
- `prefers-reduced-motion` must disable decorative loops.
- Audit gate: 0 failed, score >= 93 (baseline before this change: 93 A / 0 failed / 25 warnings).

## Findings that shape the design
- `useLanguageStore` is per-component `useState`: the switcher re-renders itself only. This is the root cause of "language doesn't change everything."
- `ShaderBackground` exists but is a flat dark-teal sine wave — visually weak.
- Logo is 40px mobile / 56px desktop → +50% = 60px / 84px.
- 11 country flag emojis already exist in `src/i18n/config.ts`; no flag/map image assets exist.
- Only `/privacy-policy` exists as a legal page, and its body is hardcoded English. There is no Terms page and no disclaimer anywhere.
- `/feed` is currently a duplicate sign-in shell, not a news view. The DB has 5 posts, all English, no translation columns. `PostCard` is unused.
- `tet` has no message catalog (silently falls back to English).

## Design decisions

### A. Visual layer (landing only)
- **Shader**: keep the WebGL canvas but replace the fragment shader with layered, slow-flowing aurora ribbons in deep indigo, teal and gold, plus a soft radial glow behind the card and a fine dithering/grain term to avoid banding. Low amplitude, no flashing. CSS gradient fallback if WebGL is unavailable. Reduced-motion renders one static frame (no RAF loop).
- **Logo**: raise the floating logo to 60px mobile / 84px desktop and give it a soft gold/teal glow. To protect the no-scroll invariant, the large mark moves into the hero card above the heading; the compact header keeps a small static 32px mark plus wordmark. Short viewports (`<=700px` height) keep the large mark but continue hiding `.landing-mission`, `.landing-extra`, `.landing-badges`.
- **Regional mark**: a single compact "ASEAN 11" strip of 11 flag chips (🇮🇩 🇲🇾 🇸🇬 🇹🇭 🇻🇳 🇲🇲 🇰🇭 🇱🇦 🇧🇳 🇵🇭 🇹🇱), each with a localized `title`/`aria-label`. A faint decorative SVG archipelago/wave silhouette sits behind the strip. Flags are decorative and marked `aria-hidden` as a group; the accessible summary is one translated sentence.
- **Language discoverability**: header switcher becomes a prominent pill with a globe icon, the current flag + endonym, a "17 languages" count badge, and a native `<select>` (keeps keyboard/a11y behavior). On the landing page the language row is duplicated directly under the flag strip so it is unmissable; both controls share the same global store.

### B. Global language store
- Rewrite `src/i18n/store.ts` as a module-level external store consumed via `useSyncExternalStore`. Same public API (`lang`, `setLanguage`) so all existing call sites keep working. It writes `localStorage`, updates `<html lang>`, and notifies every subscriber on change. Add `tet` to `MESSAGES` (authored core strings), so all 17 codes resolve.
- `LanguageSwitcher` keeps the native select but reads/writes the shared store.

### C. Authored translation content
- Extend `Messages` with keys needed by new/changed UI: language count, ASEAN strip label, feed headings/empty state, terms/privacy section content, footer legal labels.
- Legal content lives in structured catalogs (`src/i18n/legal.ts`) with one record per language: `{ title, intro, sections: [{heading, body}], disclaimer }`. Every one of the 17 languages gets an authored version (fallback chain for closely-related codes only if a full authored version is unavailable, but no English fallback for legal copy).
- New route `/terms` renders the authored Terms of Use for the active language. The ASEAN disclaimer states that country names and flags are used descriptively to describe coverage, do not imply affiliation with or endorsement by any government or ASEAN institution, and that the app is not legal advice.
- `/privacy-policy` is rewritten to render from the same structured legal catalogs.
- Footer, sitemap and `llms.txt` gain `/terms`. Metadata descriptions use translated where feasible.

### D. Localized news feed
- `posts` gains a `translations TEXT` column holding `{ [lang]: { title, summary } }`, added idempotently with `ALTER TABLE` for existing DBs.
- A seed function fills authored `title`/`summary` translations for the 5 existing posts in all 17 languages (fallback chain: exact → related base → English only as a last resort for newly-added posts without authored text).
- `GET /api/feed?lang=xx` returns posts with `title`/`summary` replaced by the localized variant (plus `originalLanguage` for transparency).
- `/feed` becomes a real gate: signed-out users see `AuthForm`; signed-in users see the localized post list. Changing language refetches `/api/feed` and re-renders immediately. `PostCard` is wired up, localized, with `Intl` date formatting using `Language.locale`.

## Non-goals
- No live machine-translation API, no new paid dependency.
- No changes to Firebase auth, validation rules, or avatar handling.
- No change to the 17-language list.

## Verification plan
- `npx tsc --noEmit`, production build.
- Playwright: 3 viewports no-scroll/no-overflow, logo size ~60/84px, 11 flags present, both language controls visible, switching to `my`/`th`/`km` changes headings, footer, Terms body and feed headlines; keyboard reachability.
- `/terms`, `/privacy-policy`, `/feed` language checks across representative scripts (my, th, km, zh, tet).
- `squirrel audit` quick: 0 failed, score >= 93.
- Commit + push; report before/after audit scores and commit hash.
