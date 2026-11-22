// src/app/sign-in/page.tsx — SEAblings Only sign-in page (shared form with the landing page)
"use client";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";
import AuthForm from "@/components/AuthForm";

export default function SignInPage() {
  const { lang } = useLanguageStore();
  const m = t(lang);
  return (
    <main className="min-h-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-2">
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
