// src/app/page.tsx — SEAblings Only landing page: a single-screen sign-in entry.
// Everything a visitor needs to sign in is visible without scrolling.
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { lang } = useLanguageStore();
  const m = t(lang);

  // Redirect signed-in users to the feed
  useEffect(() => {
    if (user) {
      router.push("/feed");
    }
  }, [user, router]);

  return (
    <main
      id="main-content"
      className="relative z-10 flex h-dvh flex-col overflow-hidden px-4 py-3 sm:px-6 sm:py-5"
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
            width={56}
            height={56}
            className="h-10 w-10 shrink-0 rounded-md object-cover logo-float sm:h-14 sm:w-14"
          />
          <span className="truncate text-sm font-semibold text-foreground/80 sm:text-base">
            {m.landingTitle}
          </span>
        </div>
        <LanguageSwitcher />
      </header>

      <section className="flex min-h-0 flex-1 items-center justify-center">
        <div className="w-full max-w-md rounded-xl border border-border bg-card/75 p-4 shadow-xl backdrop-blur-sm sm:p-6">
          <h1 className="enter-stagger grad-text text-center text-3xl font-black leading-tight sm:text-4xl">
            {m.landingTitle}
          </h1>
          <p className="enter-stagger delay-1 mt-2 text-center text-sm leading-snug text-foreground/75 sm:text-base">
            {m.landingTagline}
          </p>
          <p className="enter-stagger delay-2 landing-mission mt-2 line-clamp-2 text-center text-xs leading-snug text-foreground/60 sm:text-sm">
            {m.mission}
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
