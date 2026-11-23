# Single-screen sign-in landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/` a one-viewport social-style sign-in entry with no page scrolling.

**Architecture:** Rewrite the client landing page as a `h-dvh` flex column: compact header, centered sign-in card, compact footer links. Move the removed long-form copy into the existing `/about` page. Adjust the squirrel word-count option because a login entry is short by design. Verify with headless Chromium at three viewports and a fresh production audit.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS 4, Playwright, squirrelscan.

**Spec:** `docs/superpowers/specs/2026-11-23-single-screen-landing-design.md`

## Global Constraints

- All project files stay under `/home/anthony/Desktop/ASEAN News Feed App/`.
- Never print or commit secrets; do not change Firebase config, CSP allowlist, auth logic, 17-language set, DB schema, or dependencies.
- Production server: `:3100` built with `NEXT_PUBLIC_SITE_URL=http://localhost:3100 npm run build`; dev `:3101` stays off during verification.
- Required result: no landing-page scroll at 1365×900, 390×844, 375×667; no console errors; no horizontal overflow; prod audit 0 failed.

## Review Focus

- Short viewports (375×667 with mobile keyboard): sign-in controls must stay reachable with no page scroll — pinned by the 375×667 assertion in Task 1.
- Language switcher with the longest translation (Myanmar): header must not wrap into the card — pinned by a header-height assertion in Task 1.
- Invalid email entry: `Please enter a valid email address (name@example.com).` must still appear — pinned by the form assertion in Task 1.
- Signed-in visitor: redirect to `/feed` must still occur — pinned by inspecting the existing `useEffect` plus a post-build smoke check in Task 4.
- Audit regression from losing ~400 words on `/`: pinned by the Task 4 squirrel run.

---

### Task 1: One-screen landing layout and browser check

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Create: `session-artifacts/check_single_screen.js` (outside the git repo, inside the project folder)

**Interfaces:**
- Consumes: existing `AuthForm`, `LanguageSwitcher`, `ShaderBackground`, `AppStoreBadges`, `Footer`, `t(lang)` and `useAuth()`.
- Produces: `/` with `scrollHeight <= innerHeight` at the three target viewports.

- [ ] **Step 1: Write the browser check** in `session-artifacts/check_single_screen.js`: launch headless Chromium, visit `http://localhost:3100/`, for each of 1365×900, 390×844, 375×667 assert `document.documentElement.scrollHeight <= window.innerHeight + 1`, `document.documentElement.scrollWidth <= window.innerWidth + 1`, a visible `form` with email/password inputs and a submit button, and zero console error messages. Also assert the invalid-email message after submitting `not-an-email` + a password.

- [ ] **Step 2: Run it against the current page** with `cd "/home/anthony/Desktop/ASEAN News Feed App/app" && NODE_PATH="$PWD/node_modules" node "../session-artifacts/check_single_screen.js"`. Expected: FAIL on the scroll assertion at all three viewports.

- [ ] **Step 3: Rewrite `src/app/page.tsx`** as a `main` with `h-dvh overflow-hidden` and three regions: (a) compact header with a ≤56px logo, site name and `LanguageSwitcher`; (b) centered card with `h1`, `m.landingTagline`, one short mission line, and `AuthForm`; (c) compact footer link row with the existing internal links plus `AppStoreBadges`, hidden at short heights via a CSS utility. Keep the skip link, `ShaderBackground`, reduced-motion classes, and the `/feed` redirect effect unchanged. Remove the seven long paragraphs.

- [ ] **Step 4: Add compact-viewport CSS** to `src/app/globals.css`: a `.landing-compact` rule inside `@media (max-height: 700px)` hiding the mission line and badges, and any needed small-screen sizing. Keep all existing keyframes and the reduced-motion block.

- [ ] **Step 5: Rebuild and restart prod**: `npx tsc --noEmit`, `NEXT_PUBLIC_SITE_URL=http://localhost:3100 npm run build`, kill the old `:3100` server and start `npx next start -p 3100`.

- [ ] **Step 6: Run the browser check again.** Expected: PASS at all three viewports with zero console errors. Save a screenshot to `session-artifacts/seablings_login_single_screen.png`.

- [ ] **Step 7: Commit** `src/app/page.tsx`, `src/app/globals.css`, the spec/plan docs and the verification script.

### Task 2: Preserve the substantive copy on /about

**Files:**
- Modify: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: the removed homepage paragraphs' unique facts (17 languages, 10 named countries, translation between languages, no ads, App Store/Google Play availability, suggestion review by Anthony).
- Produces: `/about` with no duplicate paragraphs and ≥300 words.

- [ ] **Step 1: Fold unique facts** from the removed homepage copy into the existing paragraphs in `src/app/about/page.tsx` (or add at most two new paragraphs). Do not paste the seven paragraphs verbatim; do not repeat facts already stated there.

- [ ] **Step 2: Verify** with a text extraction over the rendered `/about` page: word count ≥300 and no exact duplicate sentence from the old landing copy.

- [ ] **Step 3: Commit** the `/about` change.

### Task 3: Document the audit word-count option

**Files:**
- Modify: `squirrel.toml`

**Interfaces:**
- Consumes: spec constraint that a login-style homepage cannot carry 300+ visible words.
- Produces: audit config with a documented `min_words` override.

- [ ] **Step 1: Add** to `squirrel.toml`:

```toml
# The homepage is now a sign-in entry like other social sites; its visible
# copy is intentionally short. Other pages still exceed 300 words.
[rule_options."content/word-count"]
min_words = 150
```

- [ ] **Step 2: Verify** the TOML parses and the existing `security/form-captcha` disable remains intact.

- [ ] **Step 3: Commit** the config change.

### Task 4: Full verification and push

**Files:**
- Test: `session-artifacts/check_single_screen.js` (from Task 1)

**Interfaces:**
- Consumes: all prior tasks, running prod server on `:3100`.
- Produces: verified, pushed `main`.

- [ ] **Step 1: Run gates**: `npx tsc --noEmit`, `NEXT_PUBLIC_SITE_URL=http://localhost:3100 npm run build`, `.venv/bin/python tests/test_mobile.py`, `node ../session-artifacts/check_single_screen.js`. All must pass.

- [ ] **Step 2: Run audit**: `squirrel audit http://localhost:3100 --format llm --level quick --refresh`. Expected: 0 failed, score near 93. Record the exact score and any new warnings.

- [ ] **Step 3: Browser smoke check**: sign in with the throwaway/master account on `:3100`, confirm redirect to `/feed`, sign out, return to `/`, confirm no scroll. Never echo the password.

- [ ] **Step 4: Commit any remaining changes and push** to `origin/main`; report the commit hash and before/after audit scores.
