# SEAblings Only

A Next.js 16 community news feed app for ASEAN. The website is a community news feed — read the stories of your country and the region, write comments, suggest topics.

## Tech

- Next.js 16 (App Router), Turbopack, React 19 — pages in `src/app/`.
- Firebase web SDK — email + password accounts (`src/firebase.ts`, `src/providers/AuthProvider.tsx`).
- better-sqlite3 — community posts, comments, suggestions, profiles (`src/lib/db.ts`).

## Pages

- [Landing](http://localhost:3101/) — sign in or create an account.
- [Sign in](http://localhost:3101/sign-in) — email + password (Firebase).
- [Community feed](http://localhost:3101/feed) — the community news feed of ASEAN.
- [Suggestions](http://localhost:3101/suggestions) — suggest a topic, video or event.
- [Profile](http://localhost:3101/profile) — public profile — country, language, bio, picture.
- [Settings](http://localhost:3101/settings) — dark mode, language, change password, delete account.
- [About](http://localhost:3101/about) — what SEAblings Only is.
- [Contact](http://localhost:3101/contact) — how to reach Anthony.
- [Privacy policy](http://localhost:3101/privacy-policy) — what is collected.

## API

- [Feed JSON](http://localhost:3101/api/feed) — round-robin feed of posts.
- [Comments API](http://localhost:3101/api/comments) — comments on posts (POST anonymous comments).
- [Profile API](http://localhost:3101/api/profile) — account profile data.
- [Suggestions API](http://localhost:3101/api/suggestions) — suggestion intake.

## Commands

- `npm run dev` — dev server on port 3101.
- `npm run build` — production build.
- `.venv/bin/python tests/test_mobile.py` — mobile tests (Playwright, headless Chromium).
