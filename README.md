# SEAblings Only

Community news feed — ASEAN-region news in 15 languages. **Version 1**: public feed,
email sign-in (click-to-verify), comments, profile, dark mode, multi-language UI.

- **Company:** SEAblings · **App name:** SEAblings Only
- **Repo:** https://github.com/antjack4600/SEAblings (public, branch `main`)
- **Design review + security review:** done (web-design-guidelines, security-review)

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styles | Tailwind v4 (hand-written palette in `globals.css`) |
| Auth | Firebase web SDK — email sign-up, click-to-verify |
| Database | better-sqlite3 — local SQLite (`data/sea_blings.db`, gitignored) |
| i18n | Custom store + 15-language catalog (English-first) |
| Tests | Playwright (Python) — mobile/tablet |
| Dev server | `npm run dev` on **port 3101** |

Notes:
- Translations are best-effort — English is the source catalog; hard scripts
  (Burmese, Khmer, Lao, Arakanese, Tetum, Cantonese) are approximate.
- Local dev runs on port 3101 (dev-machine convention).

## Run locally

```bash
cd app
npm install
npm run dev -p 3101
# Open http://localhost:3101
```

### Pages

| Route | What it is |
|---|---|
| `/` | Landing — login form. Signed-in users are redirected to `/feed` |
| `/sign-in` | Same shared login form (AuthForm) |
| `/feed` | **Focus page** — the feed. Client-fetched posts, optional country/language filter |
| `/settings` | Dark mode (Light / Dark / System) |
| `/profile` | Profile form (spec'd fields, see below) |
| `/suggestions` | Anthony's suggestion intake (v1) |

## Data & seed

- `data/sea_blings.db` — local SQLite dev DB (gitignored).
- `seedDb()` re-seeds `language_coverage` (equal per ASEAN country) — wired to plan §4 tooling.
- 5 sample posts (indonesia, malaysia, philippines, vietnam, cambodia) are pre-seeded locally.
- The feed (`roundRobinFeed()`) returns the newest posts spread evenly across the
  11 ASEAN countries (equal coverage by design).

## API routes

| Route | Method | Behavior | Auth |
|---|---|---|---|
| `/api/feed` | GET | `roundRobinFeed(30)` — newest posts, equal per-ASEAN-country coverage | public |
| `/api/comments` | GET `?postId=` | Comments on a post (`400` if `postId` invalid) | public |
| `/api/comments` | POST `{body, postId, userId?}` | Insert comment (trimmed body → `201`). Anonymous community content | — |
| `/api/suggestions` | GET / POST | Anthony's suggestion intake (drafts) | — |
| `/api/profile` | GET `?uid=` | Profile for `uid`, or `null` (`400` if `uid` missing) | — |
| `/api/profile` | POST `{uid, username?, name?, country?, language?, gender?, education?, city?, date_of_birth?, bio?}` | Upsert (whitelisted string fields, trimmed) → `400` if `uid` missing | — |

Profile note: the Firebase web SDK can't verify the caller's uid on the server
(`verifyIdToken` is firebase-admin only), so the **client passes its own uid** —
identity is asserted by the owner, not server-verified. Fields are whitelisted and string-only.

## i18n

- 15 languages: `en, id, ms, th, vi, my, km, tl, lo, br (reuses Malay), rki, tet, pt, zh, yue`
  (limit was 20; currently 15).
- `LanguageSwitcher` is on **every page**; persists to localStorage key `sea_blings_lang`
  and sets `<html lang>`.
- Key files: `src/i18n/config.ts` (language list), `translations.ts` (message catalogs),
  `store.ts` (state), `t.ts`, `LanguageSwitcher.tsx`.
- `t(lang)` returns the messages object; `getMessages()` merges with English.
- Feed filter: `src/lib/languages.ts` — the `(language, country)` options per language.

## Dark mode

- `/settings`: Light / Dark / System — stored in localStorage key `sea_blings_mode`.
- Applied globally via `html.classList` (`src/hooks/useMode.ts`) + `color-scheme`
  in `globals.css`.

## Security notes

- **No hardcoded secrets**: `.env.local` (mode 600, gitignored) holds only the public
  Firebase web config (`NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`,
  `NEXT_PUBLIC_FIREBASE_PROJECT_ID`).
- **All SQL** (better-sqlite3) is parameterized (`src/lib/db.ts`); profile fields whitelisted.
- **No XSS sinks** — React escapes text; no `dangerouslySetInnerHTML` anywhere in `src/`.
- Dependency audit (2026-11-22): 4 high-severity npm advisories in the firebase ecosystem
  (`@firebase/firestore@4.20.0`, `@firebase/firestore-compat@0.4.18`, `@grpc/grpc-js@1.9.16`,
  `firebase@13.4.0`). **Not reachable in this app** — `src/` imports only `firebase/app` and
  `firebase/auth`; no Firestore or gRPC usage. npm's suggested fix is a major Firebase
  downgrade (`npm audit fix --force`) — needs your review/testing before applying.
- Two server bugs found & fixed during the security review:
  `GET /api/profile` → 500 (now 400/200) and `POST /api/comments` → 500 on bad `postId`
  (now 400). Live-verified against the running dev server.

## Tests

```bash
cd app
.venv/bin/python tests/test_mobile.py
```

Playwright, headless Chromium — **mobile 375×812 + tablet 768×1024**:
- Feed page loads (mobile + tablet), sign-in form, settings page, no page/console errors.
- Language switcher updates `<html lang>` (e.g. → `vi`).
- Dark-mode toggle sets `html` class to `light`.

Setup: `npm install -D @playwright/test && npx playwright install`
(or the app venv: `python3 -m venv .venv && .venv/bin/pip install playwright && .venv/bin/python -m playwright install`).

## Design

- Palette (`globals.css`): dark by default — `--background #0A1B2D`, `--foreground #E8E0D0`,
  `--card #122338`, `--accent #0D9CA8`, `--gold #F2B84B`; `color-scheme` applied natively
  for form controls.
- Feedback colors: `--border`, `--gold` for messages.

## AGENTS.md note (Next.js)

This is Next.js 16 — "not the Next.js you know": read `node_modules/next/dist/docs/`
before writing new server/route code (per the machine's `AGENTS.md`).

## Next steps (after this README)

1. **Preview the site:** http://localhost:3101 (dev server still running).
2. **Decide on the firebase major-downgrade advisory** from the security review.
3. **Commit + push** this README (and anything else) to `origin/main`.
