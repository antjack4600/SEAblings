// src/app/sign-in/page.tsx — SEAblings Only sign-in page (shared form with the landing page)
"use client";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";
import AuthForm from "@/components/AuthForm";
import Footer from "@/components/Footer";

export default function SignInPage() {
  const { lang } = useLanguageStore();
  const m = t(lang);
  return (
    <main className="min-h-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <img src="/SEAb lings_Only_logo.svg" alt="" width={32} height={32} className="w-8 h-8 object-cover rounded-md" />
            <h1 className="text-2xl font-bold text-foreground">{m.signinTitle}</h1>
          </div>
          <LanguageSwitcher />
        </div>
        <p className="text-sm text-foreground/60 mb-6">{m.signinSubtitle}</p>
        <p className="text-sm text-foreground/60 leading-relaxed">
          SEAblings Only is the community news feed of ASEAN — the news of your country and the
          region, in 17 languages. Sign in or create a free account to comment on the community
          posts. Free, email-only, with a click-to-verify link to confirm your account. Your
          profile follows you across every page of the site, and you can change your language at
          any time.
        </p>
        <p className="text-sm text-foreground/60 mt-6">
          Manage your account — you can change your password from the Settings page, and you can
          delete your account there too. If you forget your password, the forgot-password form
          sends a reset link to your email. Support questions go to AntJack4600@gmail.com — see
          the contact page. Your sign-in is free, your profile is public, and you can edit it
          any time — every profile detail you set here shows on the site.
        </p>
        <p className="text-sm text-foreground/60 leading-relaxed mt-6">
          Creating an account takes one step. Enter your email address and we send a link to
          confirm it — there is no username to invent and no form to post back. Once confirmed,
          you can read every story, join a discussion and choose which language you want the site
          to use. The same account works in the mobile app and here on the web.
        </p>
        <p className="text-sm text-foreground/60 leading-relaxed mt-6">
          A confirmed account also lets you keep a public set of details: the country you know,
          a short introduction and a picture if you want one. Those details appear beside your
          comments so readers have context for what you write. You control them from the profile
          screen and can change them as often as you like.
        </p>
        <p className="text-sm text-foreground/60 leading-relaxed mt-6">
          Use an address you check regularly. Password resets and account notices go there, and
          losing access to the mailbox makes recovery difficult. If you are unsure whether an
          email really came from us, visit this page directly instead of following the link and
          ask through the contact form.
        </p>
        <AuthForm title={m.signinTitle} />
        <Footer />
      </div>
    </main>
  );
}
