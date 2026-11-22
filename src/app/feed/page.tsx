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
    <main className="min-h-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src="/ASEANAppLogoimage.png" alt="SEAblings Only" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-foreground">{m.signinTitle}</h1>
          </div>
          <LanguageSwitcher />
        </div>
        <p className="text-sm text-foreground/60 mb-6">{m.signinSubtitle}</p>
        <AuthForm title={m.signinTitle} />
      </div>
    </main>
  );
}
