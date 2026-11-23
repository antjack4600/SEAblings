// src/app/page.tsx — SEAblings Only landing page: a single-screen sign-in entry.
// Everything a visitor needs to sign in is visible without scrolling.
"use client";
import { useEffect, useState } from "react";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";
import { useAuth } from "@/app/providers/AuthProvider";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";
import AuthForm from "@/components/AuthForm";
import ShaderBackground from "@/components/ShaderBackground";
import AppStoreBadges from "@/components/AppStoreBadges";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const { user } = useAuth();
  const { lang } = useLanguageStore();
  const m = t(lang);
  const [visualHeight, setVisualHeight] = useState<number | null>(null);

  // Redirect signed-in users to the feed. A full navigation avoids Next's
  // client-transition keeping the landing DOM mounted beside the feed.
  useEffect(() => {
    if (user) {
      window.location.replace("/feed");
    }
  }, [user]);

  // iOS Safari does not resize dvh for the virtual keyboard. When the visual
  // viewport shrinks, cap the shell to it and let the form scroll into reach.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      const covered = window.innerHeight - vv.height;
      setVisualHeight(covered > 120 ? Math.round(vv.height) : null);
    };
    update();
    vv.addEventListener("resize", update);
    return () => vv.removeEventListener("resize", update);
  }, []);

  return (
    <main
      id="main-content"
      style={visualHeight !== null ? { height: `${visualHeight}px` } : undefined}
      className="relative z-10 flex h-dvh flex-col overflow-x-hidden overflow-y-auto px-4 py-3 sm:px-6 sm:py-5"
    >
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-card focus:px-2 focus:py-1 focus:text-sm focus:text-foreground"
      >
        {m.skipToMain}
      </a>
      <ShaderBackground />

      <header className="flex shrink-0 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <img
            src="/SEAb lings_Only_logo.svg"
            alt=""
            width={84}
            height={84}
            className="landing-logo h-[60px] w-[60px] shrink-0 rounded-md object-cover logo-float sm:h-[84px] sm:w-[84px]"
          />
          <span className="truncate text-sm font-semibold text-foreground/80 sm:text-base">
            {m.landingTitle}
          </span>
        </div>
        <LanguageSwitcher />
      </header>

      <section className="flex min-h-0 flex-1 justify-center">
        <div className="my-auto w-full max-w-md rounded-xl border border-border bg-card/75 p-4 shadow-xl backdrop-blur-sm sm:p-6">
          <h1 className="enter-stagger grad-text text-center text-3xl font-black leading-tight sm:text-4xl">
            {m.landingTitle}
          </h1>
          <p className="enter-stagger delay-1 mt-2 text-center text-sm leading-snug text-foreground/75 sm:text-base">
            {m.landingTagline}
          </p>
          <p className="enter-stagger delay-2 landing-mission mt-2 line-clamp-2 text-center text-xs leading-snug text-foreground/60 sm:text-sm">
            {m.mission}
          </p>
          <p className="landing-extra mt-3 text-center text-[11px] leading-snug text-foreground/55 sm:text-xs">
            Reporting from Indonesia, Malaysia, Thailand, Vietnam, Myanmar, Laos, Cambodia,
            the Philippines, Brunei and East Timor. Pick one of 17 languages and the feed
            follows you, with translation between members so a story from Manila can be
            discussed in Jakarta. Reading is free and there is no advertising. Explore the{" "}
            <a href="/feed" className="text-gold underline hover:text-gold/90">community feed</a>{" "}
            and our <a href="/about" className="text-gold underline hover:text-gold/90">about</a>{" "}
            page, or send a{" "}
            <a href="/suggestions" className="text-gold underline hover:text-gold/90">suggestion</a>.
            Comments are open to members, and Anthony reviews each suggestion before a story
            goes live. The discussion continues across the region every day.
          </p>
          <div className="enter-stagger delay-3 mt-5">
            <AuthForm />
          </div>
        </div>
      </section>

      <div className="flex shrink-0 flex-col items-center gap-2 pt-1">
        <div className="landing-badges">
          <AppStoreBadges />
        </div>
        <div className="landing-footer w-full">
          <Footer />
        </div>
      </div>
    </main>
  );
}
