// src/components/Footer.tsx — footer with internal links: every page links onward
// (dead-end pages, orphan pages and links/internal-links all want outgoing links).
"use client";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";

export default function Footer() {
  const { lang } = useLanguageStore();
  const m = t(lang);
  const linkClass = "underline hover:text-foreground";
  return (
    <footer className="mt-10 border-t border-border pt-4 pb-2">
      <nav aria-label="Site links" className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-foreground/60">
        <a href="/" className={linkClass}>{m.footerHome}</a>
        <a href="/about" className={linkClass}>{m.footerAbout}</a>
        <a href="/suggestions" className={linkClass}>{m.footerSuggestions}</a>
        <a href="/profile" className={linkClass}>{m.footerProfile}</a>
        <a href="/settings" className={linkClass}>{m.footerSettings}</a>
        <a href="/sign-in" className={linkClass}>{m.footerSignIn}</a>
        <a href="/contact" className={linkClass}>{m.footerContact}</a>
        <a href="/privacy-policy" className={linkClass}>{m.footerPrivacyPolicy}</a>
        <a href="/terms" className={linkClass}>{m.termsLink}</a>
      </nav>
    </footer>
  );
}
