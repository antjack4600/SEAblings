"""SEAblings mobile/tablet tests (Playwright, headless Chromium, mobile viewports).

Run after `npm run dev` is serving on http://localhost:3101:
    python3 test_mobile.py
"""
from __future__ import annotations

import os
import sys

from playwright.sync_api import sync_playwright

APP = os.environ.get("APP_URL", "http://localhost:3101")
MOBILE_VP = {"width": 375, "height": 812}
TABLET_VP = {"width": 768, "height": 1024}

SCREENSHOTS = os.path.normpath(
    os.path.join(os.path.dirname(__file__), "..", "..", "session-artifacts", "screenshots")
)
os.makedirs(SCREENSHOTS, exist_ok=True)


def page_errors(page) -> list:
    errors: list = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(f"console.{m.type}: {m.text}") if m.type == "error" else None)
    return errors


def expect_no_errors(errors):
    assert errors == [], f"Page errors/console errors: {errors}"


def test_feed_page_mobile():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport=MOBILE_VP)
        errors = page_errors(page)
        page.goto(f"{APP}/feed", wait_until="networkidle")
        page.wait_for_timeout(1500)
        assert page.get_by_role("heading", name="SEAblings Only").count() == 1
        # the language switcher is present on the feed page
        assert page.locator("#language-switcher").count() == 1
        page.screenshot(path=f"{SCREENSHOTS}/feed_mobile.png", full_page=True)
        expect_no_errors(errors)
        browser.close()


def test_feed_page_tablet():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport=TABLET_VP)
        errors = page_errors(page)
        page.goto(f"{APP}/feed", wait_until="networkidle")
        page.wait_for_timeout(1500)
        assert page.get_by_role("heading", name="SEAblings Only").count() == 1
        page.screenshot(path=f"{SCREENSHOTS}/feed_tablet.png", full_page=True)
        expect_no_errors(errors)
        browser.close()


def test_signin_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport=MOBILE_VP)
        errors = page_errors(page)
        page.goto(f"{APP}/sign-in", wait_until="networkidle")
        page.wait_for_timeout(1500)
        assert page.get_by_role("textbox", name="Email").count() == 1
        assert page.get_by_role("textbox", name="Password").count() == 1
        assert page.get_by_role("button", name="Sign in / Sign up").count() >= 1
        page.screenshot(path=f"{SCREENSHOTS}/signin_mobile.png", full_page=True)
        expect_no_errors(errors)
        browser.close()


def test_settings_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport=MOBILE_VP)
        errors = page_errors(page)
        page.goto(f"{APP}/settings", wait_until="networkidle")
        page.wait_for_timeout(1500)
        assert page.locator("label", has_text="Dark mode").count() == 1
        page.screenshot(path=f"{SCREENSHOTS}/settings_mobile.png", full_page=True)
        expect_no_errors(errors)
        browser.close()


def test_language_switcher_on_feed():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport=MOBILE_VP)
        errors = page_errors(page)
        page.goto(f"{APP}/feed", wait_until="networkidle")
        page.wait_for_timeout(1200)
        assert page.locator("#language-switcher").count() == 1
        page.select_option("#language-switcher", "vi")
        page.wait_for_timeout(400)
        html_lang = page.evaluate("document.documentElement.lang")
        assert html_lang == "vi", f"expected <html lang='vi'>, got {html_lang!r}"
        page.screenshot(path=f"{SCREENSHOTS}/feed_vietnamese.png", full_page=True)
        expect_no_errors(errors)
        browser.close()


def test_dark_mode_toggle_on_settings():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport=MOBILE_VP)
        errors = page_errors(page)
        page.goto(f"{APP}/settings", wait_until="networkidle")
        page.wait_for_timeout(1200)
        # The dark-mode select is the only one with an option value of "system"
        page.select_option('select:has(option[value="system"])', "light")
        page.wait_for_timeout(400)
        html_class = page.evaluate("document.documentElement.className")
        assert "light" in html_class, f"expected light class on <html>, got: {html_class!r}"
        page.screenshot(path=f"{SCREENSHOTS}/settings_light.png", full_page=True)
        expect_no_errors(errors)
        browser.close()


def test_language_switch_new_languages():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport=MOBILE_VP)
        errors = page_errors(page)
        page.goto(f"{APP}/settings", wait_until="networkidle")
        page.wait_for_timeout(1200)
        # Switch to Ilocano -> <html lang="ilo">
        page.select_option("#language-switcher", "ilo")
        page.wait_for_timeout(400)
        assert page.evaluate("document.documentElement.lang") == "ilo"
        # Switch to Cebuano -> <html lang="ceb">
        page.select_option("#language-switcher", "ceb")
        page.wait_for_timeout(400)
        assert page.evaluate("document.documentElement.lang") == "ceb"
        expect_no_errors(errors)
        browser.close()


def test_feed_filter_lists_new_languages():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport=MOBILE_VP)
        errors = page_errors(page)
        page.goto(f"{APP}/feed", wait_until="networkidle")
        page.wait_for_timeout(1200)
        # The language filter lists the new languages with their country mappings.
        for code, expected in [("ilo", "philippines"), ("ceb", "philippines")]:
            hits = page.locator(f'select option[value="{code}"]').filter(has_text=expected)
            assert hits.count() >= 1, f"feed filter missing option {code} ({expected})"
        # The header switcher also offers the new codes.
        for code in ["ilo", "ceb"]:
            assert page.locator(f"#language-switcher option[value='{code}']").count() == 1
        # Tamil and French are no longer offered.
        assert page.locator("#language-switcher option[value='ta']").count() == 0
        assert page.locator("#language-switcher option[value='fr']").count() == 0
        expect_no_errors(errors)
        browser.close()


if __name__ == "__main__":
    os.makedirs(SCREENSHOTS, exist_ok=True)
    test_feed_page_mobile()
    test_feed_page_tablet()
    test_signin_page()
    test_settings_page()
    test_language_switcher_on_feed()
    test_dark_mode_toggle_on_settings()
    print("ALL MOBILE TESTS PASSED")
