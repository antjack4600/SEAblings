# Vibrant Localized Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the landing page visually vivid with a larger animated logo and ASEAN flag strip, and make a single language switch propagate authored translations across all UI, Terms of Use, Privacy Policy and news feed content.

**Architecture:** Replace the per-component language state with a module-level `useSyncExternalStore` store so every consumer re-renders on one switch. Keep authored content in typed catalogs (`translations.ts` for UI, `legal.ts` for legal prose, `feedTranslations.ts` for posts) and let the API/local DB serve the active language. Keep the landing single-viewport and preserve the existing auth/validation behavior.

**Tech Stack:** Next.js App Router (installed version — read `node_modules/next/dist/docs/` before coding), React `useSyncExternalStore`, TypeScript, Tailwind v4, WebGL fragment shader, better-sqlite3, Playwright, squirrelscan.

**Spec:** `docs/superpowers/specs/2026-11-23-vibrant-localized-landing-design.md`

## Global Constraints
- Single viewport at 1365×900, 390×844, 375×667 on `/`: no vertical or horizontal page scroll, all sign-in controls immediately visible.
- Exact 17 language codes only: `id, ms, en, th, vi, my, km, tl, lo, br, rki, pt, tet, zh, yue, ilo, ceb`. Never `ta`, never `fr`.
- Logo on landing: ~50% larger than current 40px mobile / 56px desktop → 60px / 84px, animated with `logo-float`.
- `prefers-reduced-motion` disables all decorative loops and the shader RAF loop.
- Preserve CSP allowlist, email/name validation, JPEG/PNG avatar behavior, and keyboard reachability with the virtual keyboard.
- Every app file stays under `/home/anthony/Desktop/ASEAN News Feed App/`; browser/debug artifacts in `session-artifacts/`, secrets in `session-artifacts/.secrets/` mode 600. Never print secrets.
- Audit gate: `0 failed`, score `>= 93` with quick audit.
- Legal copy must never fall back to English for any of the 17 codes.

## Review Focus
- Language switch on `/` must re-render the landing, footer and both switchers at once — 17 codes × several consumers. Test: Task 1 asserts subscriber notification; Task 6 asserts DOM text changes for `my`, `th`, `km` after one select event.
- Short viewport + larger logo + flag strip + second language row must still fit one screen. Test: Task 6 Playwright asserts `scrollHeight === innerHeight` at 375×667 and submit button in viewport.
- Legal content must be authored for every code (no English fallback) and include the ASEAN disclaimer. Test: Task 2 asserts `/terms` body differs from English for `my`, `th`, `km`, `zh`, `tet` and contains a disclaimer key in each catalog.
- Feed must show translated headlines for the active language, not raw DB English. Test: Task 3 asserts `/api/feed?lang=vi` returns localized title/summary; Task 4 asserts `/feed` re-renders after a language switch.
- WebGL absence / reduced motion must not leave a blank or flashing background. Test: Task 5 asserts a CSS gradient fallback is present and no RAF loop starts under reduced motion.

---

### Task 1: Global language store and complete catalog coverage

**Files:**
- Modify: `src/i18n/store.ts`
- Modify: `src/i18n/translations.ts`
- Test: `session-artifacts/check_language_store.mjs`

**Interfaces:**
- Consumes: `LANGUAGES` from `src/i18n/config.ts`; `MESSAGES`, `getMessages` in `translations.ts`.
- Produces: `useLanguageStore(): { lang: string; setLanguage(code: string): void }` backed by `useSyncExternalStore`; `getMessages(code)` resolves all 17 codes; `Messages` gains the keys `languageCount`, `aseanLabel`, `feedTitle`, `feedEmpty`, `feedOriginal`, `termsLink`, `privacyLink`, `legalDisclaimer`, `legalIntro`.

- [ ] **Step 1: Write the failing test** — create `session-artifacts/check_language_store.mjs` that imports the compiled store logic via a tiny tsx runner or asserts through the Next dev server: switching language once must change text in two independent components on the same page, and `getMessages("tet")` must not equal English for at least one existing key. Assert `Object.keys(MESSAGES)` contains all 17 codes.
- [ ] **Step 2: Run it to verify it fails** — `NODE_PATH="$PWD/node_modules" node ../session-artifacts/check_language_store.mjs`; expect FAIL on the two-component assertion and on `tet`.
- [ ] **Step 3: Implement the store and catalog gaps** — module-level `listeners: Set<() => void>`, `subscribe`, `getSnapshot` reading `localStorage` validated by `LANGUAGES`; `setLanguage` writes storage, sets `<html lang>`, notifies listeners. Add the 9 new `Messages` keys to the English catalog and to every other catalog (may use existing endonym/localized wording). Author a full `tet` catalog in `MESSAGES`.
- [ ] **Step 4: Run the test and `npx tsc --noEmit`** — expect PASS for the store test and no type errors.
- [ ] **Step 5: Commit** — `git commit -m "feat: make language switching global across all components"`

### Task 2: Authored legal catalogs, Terms page and translated Privacy Policy

**Files:**
- Create: `src/i18n/legal.ts`, `src/app/terms/page.tsx`, `src/app/terms/layout.tsx`
- Modify: `src/app/privacy-policy/page.tsx`, `src/components/Footer.tsx`, `src/app/sitemap.ts`, `src/app/llms.txt/route.ts`
- Test: `session-artifacts/check_legal_i18n.mjs`

**Interfaces:**
- Consumes: `useLanguageStore`, `t(lang)`.
- Produces: `getLegal(lang): { terms: LegalDocument; privacy: LegalDocument }` where `LegalDocument = { title: string; intro: string; sections: { heading: string; body: string }[]; disclaimer?: string }`; all 17 codes return authored (non-English) prose; `disclaimer` names the 11 ASEAN member states and states flags/names are descriptive, not endorsement, and not legal advice.

- [ ] **Step 1: Write the failing test** — `check_legal_i18n.mjs` starts from the running server, selects `my`, `th`, `km`, `zh`, `tet` on `/`, visits `/terms` and `/privacy-policy`, asserts body text is not the English body and that a disclaimer paragraph is present; asserts `/terms` is in sitemap and `llms.txt`.
- [ ] **Step 2: Run it to verify it fails** — expect FAIL (no `/terms`, English privacy body).
- [ ] **Step 3: Author `src/i18n/legal.ts`** — full `LegalDocument` for terms and privacy for all 17 codes, with identical section structure across languages; include the ASEAN disclaimer in the terms document.
- [ ] **Step 4: Render both pages from the catalog** — `/terms` and `/privacy-policy` use `useLanguageStore()` and `getLegal(lang)`; add translated footer labels and sitemap/llms entries.
- [ ] **Step 5: Run the test, `npx tsc --noEmit` and build** — expect PASS.
- [ ] **Step 6: Commit** — `git commit -m "feat: add authored translated terms and privacy pages"`

### Task 3: Localized feed data layer

**Files:**
- Modify: `src/lib/db.ts`, `src/lib/types.ts`, `src/app/api/feed/route.ts`
- Create: `src/lib/feedTranslations.ts`
- Test: `session-artifacts/check_feed_api.mjs`

**Interfaces:**
- Consumes: existing `Post` type and `getDb()`.
- Produces: `Post.translations?: Record<string, { title: string; summary: string }>` and `Post.originalLanguage?: string`; `GET /api/feed?lang=<code>` returns posts with localized `title`/`summary` and `originalLanguage` set.

- [ ] **Step 1: Write the failing test** — `check_feed_api.mjs` fetches `/api/feed?lang=vi` and `/api/feed?lang=my`, asserts each returned post's `title` is not the hardcoded English sample and `originalLanguage` is present; asserts all 17 codes return HTTP 200.
- [ ] **Step 2: Run it to verify it fails** — expect FAIL (English titles, no `originalLanguage`).
- [ ] **Step 3: Add the storage and seed** — idempotent `translations TEXT` column in `posts`; `feedTranslations.ts` holds authored `{title, summary}` for the 5 seeded posts in all 17 codes; seed only posts missing translations.
- [ ] **Step 4: Localize the API** — read `lang` from search params, validate against `LANGUAGES`, replace `title`/`summary` from `translations[lang]` with fallback chain exact → related base → stored English, add `originalLanguage`.
- [ ] **Step 5: Run the test and typecheck** — expect PASS.
- [ ] **Step 6: Commit** — `git commit -m "feat: serve authored multilingual feed headlines"`

### Task 4: Real localized feed view

**Files:**
- Modify: `src/app/feed/page.tsx`, `src/components/PostCard.tsx`
- Test: `session-artifacts/check_feed_view.mjs`

**Interfaces:**
- Consumes: `useAuth`, `useLanguageStore`, `/api/feed?lang=`, `PostCard`.
- Produces: signed-out `/feed` shows `AuthForm`; signed-in `/feed` fetches and shows localized posts; changing language refetches.

- [ ] **Step 1: Write the failing test** — Playwright signs in with the stored password file (silently), goes to `/feed`, asserts post cards render; selects `vi`, asserts at least one headline changes; selects `my`, asserts another change.
- [ ] **Step 2: Run it to verify it fails** — expect FAIL (no post cards).
- [ ] **Step 3: Implement the gate and list** — signed-out → AuthForm; signed-in → `useEffect` fetch on `lang` change with abort guard, loading/empty states from `t(lang)`, `PostCard` receives localized post and `Language.locale` for `Intl.DateTimeFormat`.
- [ ] **Step 4: Run the test and typecheck** — expect PASS.
- [ ] **Step 5: Commit** — `git commit -m "feat: show a localized news feed after sign-in"`

### Task 5: Richer shader, larger floating logo, motion safety

**Files:**
- Modify: `src/components/ShaderBackground.tsx`, `src/app/globals.css`
- Test: `session-artifacts/check_visual_layer.mjs`

**Interfaces:**
- Consumes: none.
- Produces: `ShaderBackground` with layered aurora shader + CSS gradient fallback + reduced-motion static frame; `.logo-float` scale via explicit 60px/84px sizes and glow utility class `.landing-logo`.

- [ ] **Step 1: Write the failing test** — Playwright asserts the landing `<img>` logo bounding box is 60px at 390×844 and 84px at 1365×900, computed `animation-name` includes `float`, shader canvas exists, and `prefers-reduced-motion: reduce` context yields `animation-name: none` and no continuous canvas repaint.
- [ ] **Step 2: Run it to verify it fails** — expect FAIL on size assertions.
- [ ] **Step 3: Upgrade the shader and styles** — multi-band flowing gradient with radial glow and subtle grain; if WebGL unavailable keep the CSS gradient on the wrapper; reduced motion draws once and skips `requestAnimationFrame`. Add `.landing-logo { filter: drop-shadow(...) }` and the new sizes in `page.tsx` (Task 6 wires markup).
- [ ] **Step 4: Run the test and typecheck** — expect PASS.
- [ ] **Step 5: Commit** — `git commit -m "feat: add vivid shader and larger floating logo"`

### Task 6: ASEAN flag strip, prominent language control, single-screen composition

**Files:**
- Create: `src/components/AseanFlags.tsx`
- Modify: `src/app/page.tsx`, `src/i18n/LanguageSwitcher.tsx`, `src/app/globals.css`
- Test: `session-artifacts/check_vibrant_localized.js`

**Interfaces:**
- Consumes: `LANGUAGES`, `getLegal`, `useLanguageStore`, `.landing-logo`, `ShaderBackground`.
- Produces: `AseanFlags` renders 11 flag chips with localized accessible summary; `LanguageSwitcher` renders a globe pill with "17 languages" badge; landing keeps single-viewport.

- [ ] **Step 1: Write the failing test** — Playwright at 1365×900, 390×844, 375×667 asserts: no vertical/horizontal overflow, sign-in button visible, 11 flag chips, 2 language selects, large logo sizes, and after selecting `my` the heading, footer, terms link and flag-summary all change; repeat for `th` and `km`.
- [ ] **Step 2: Run it to verify it fails** — expect FAIL on flag chips and second select.
- [ ] **Step 3: Implement the components and compose the landing** — `AseanFlags` with the 11 country codes and `title` attributes; switcher pill; landing hero with large logo, heading, tagline, flag strip, second switcher, compact mission/extra copy, form; short-screen rules hide secondary copy but keep logo, flags and form within the viewport.
- [ ] **Step 4: Run the test, simulate virtual keyboard, and typecheck** — expect PASS at all three viewports with keyboard reachability.
- [ ] **Step 5: Commit** — `git commit -m "feat: add ASEAN flags and obvious language switching to landing"`

### Task 7: Full verification gate

**Files:**
- Test only: all `session-artifacts/check_*.mjs` and existing `tests/test_mobile.py`.

- [ ] **Step 1: Run `npx tsc --noEmit` and production build** with `NEXT_PUBLIC_SITE_URL=http://localhost:3100`.
- [ ] **Step 2: Restart `:3100` and run every browser check** — single-screen, about copy, sign-in smoke, language store, legal, feed API, feed view, visual layer, vibrant landing.
- [ ] **Step 3: Run `squirrel audit http://localhost:3100 --format llm --level quick --refresh`** — require `<summary ... failed="0"/>` and overall `>= 93`.
- [ ] **Step 4: Fix any regression and re-run the affected check before proceeding.**

### Task 8: Integrate

- [ ] **Step 1: Confirm clean working tree intent with `git status --short` and `git diff --stat`.**
- [ ] **Step 2: Push** — `git push origin main`; confirm `git rev-list --left-right --count origin/main...HEAD` is `0 0`.
- [ ] **Step 3: Report** before/after audit scores, commit hashes, verification evidence.
