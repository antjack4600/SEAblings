// src/app/page.tsx — SEAblings Only landing page (the website entry)
// Landing: the website is a community news feed. Users log in (email-only, Firebase) and then see the feed.
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
    <main className="relative min-h-full flex flex-col z-10 px-5 py-10">
      <ShaderBackground />
      <div className="flex items-center justify-between pt-6">
        <div className="flex items-center gap-3">
          <img
            src="/ASEANAppLogoimage.png"
            alt="SEAblings Only"
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md logo-float"
          />
          <span className="text-base font-semibold text-foreground/80">{m.landingTitle}</span>
        </div>
        <LanguageSwitcher />
      </div>
      <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto px-4">
        <h1 className="enter-stagger grad-text text-4xl font-black leading-tight">
          {m.landingTitle}
        </h1>
        <p className="enter-stagger delay-1 mt-5 text-lg leading-relaxed text-foreground/75">
          {m.landingTagline}
        </p>
        <p className="enter-stagger delay-2 mt-3 text-base text-foreground/65">
          {m.mission}
        </p>
        <div className="enter-stagger delay-3 mt-10">
          <AuthForm />
        </div>
      </div>
      <div className="flex justify-center">
        <AppStoreBadges />
      </div>
    </main>
  );
}
