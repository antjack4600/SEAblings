# Single-screen sign-in landing — design

Date: 2026-11-23

## Intent

The homepage (`/`) should feel like a social-network login entry: everything a visitor needs to sign in is visible at once, with no page scrolling. The long marketing copy currently makes the page 1,962px tall on a 900px desktop viewport and 2,490px on an 844px phone.

## Goals

- `document.documentElement.scrollHeight <= window.innerHeight` at 1365×900, 390×844 and 375×667.
- Logo, site name, language switcher, headline, tagline, email/password/forgot/sign-in controls all visible without scrolling.
- No horizontal overflow; no console errors; sign-in validation still works.
- Production squirrel audit remains at 0 failed.

## Non-goals / anti-goals

- No changes to Firebase auth, CSP, database, languages, dependencies, or other routes' behavior.
- No hidden text or internal scroll panes used purely to game the audit.
- No internal scrolling of the landing page on short screens.

## Constraints

- The previous brief required ≥300 words on `/` to satisfy `content/word-count`. A login entry cannot honestly carry that much visible copy. The rule docs explicitly note that login pages are short by design and are skipped when `noindex`; making the homepage `noindex` would harm discovery, so the chosen remedy is a documented `min_words = 150` option in `squirrel.toml`. Other pages already exceed 300 words and are unaffected.
- Root layout sets `html.h-full` / `body.min-h-full`; the landing page will use `h-dvh` with `overflow-hidden` on its own `main` to avoid depending on ancestor heights.
- Next.js 16 local docs in `node_modules/next/dist/docs/01-app/01-getting-started/` were read (`03-layouts-and-pages.md`, `11-css.md`); no deprecated APIs are needed.
- Any artifact from this project stays under `/home/anthony/Desktop/ASEAN News Feed App/`.

## Approaches considered

1. **Pure sign-in splash (chosen).** One compact card with only sign-in essentials plus a small link row; long copy moves to `/about`. Matches Facebook/Instagram/X-style login entries. Cost: audit word-count option must be documented.
2. **Splash plus collapsed About panel.** Keeps 300+ words in a click-to-expand section and may avoid the audit option, but adds visual clutter to the login screen and is closer to hiding text than approach 1.
3. **Fixed viewport with internal scroll pane.** Page itself does not scroll, but visitors still scroll inside the card; this contradicts the request.

## Implementation decisions

- `src/app/page.tsx`: rewrite as a `100dvh` flex column — compact header, centered sign-in card, compact footer link row. Keep skip link, `ShaderBackground`, existing `AuthForm`, `LanguageSwitcher`, and reduced-motion behavior.
- `src/app/about/page.tsx`: fold the unique factual details from the removed homepage paragraphs into the existing About content (no duplicate paragraphs).
- `src/app/globals.css`: add small utilities for the compact card and short-viewport hiding of secondary elements.
- `squirrel.toml`: add `[rule_options."content/word-count"] min_words = 150` with an explanatory comment.
- On very short viewports, hide the mission line and app badges rather than allowing a scrollbar; the sign-in controls are never hidden.

## Verification

1. `npx tsc --noEmit`.
2. `NEXT_PUBLIC_SITE_URL=http://localhost:3100 npm run build`, restart prod on `:3100`.
3. Playwright at 1365×900, 390×844 and 375×667: measure `scrollHeight` vs `innerHeight`, check horizontal overflow, capture console errors, confirm the form and invalid-email message work, save a screenshot under `session-artifacts/`.
4. `squirrel audit http://localhost:3100 --format llm --level quick --refresh`: expect 0 failed, score near 93. Document any remaining warning.
5. Commit and push.
