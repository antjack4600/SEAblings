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
    <main className="min-h-full flex flex-col px-5 py-10">
      <div className="flex items-center justify-between pt-6">
        <div className="flex items-center gap-3">
          <img src="/ASEANAppLogoimage.png" alt="SEAblings Only" className="w-8 h-8" />
          <span className="text-base font-semibold text-foreground/80">{m.landingTitle}</span>
        </div>
        <LanguageSwitcher />
      </div>
      <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto px-4">
        <h1 className="text-4xl font-black leading-tight text-foreground">{m.landingTitle}</h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/75">{m.landingTagline}</p>
        <div className="mt-10">
          <AuthForm />
        </div>
      </div>
    </main>
  );
}
