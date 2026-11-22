// src/app/privacy-policy/page.tsx — SEAblings Only privacy policy.
"use client";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  const { lang } = useLanguageStore();
  const m = t(lang);
  return (
    <main className="min-h-full px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-5">
        <h1 className="text-3xl font-bold text-foreground">{m.privacyTitle}</h1>
        <p className="text-sm leading-relaxed text-foreground/70">
          This privacy policy describes what SEAblings Only collects, stores and protects for
          people who use the site. It applies to the community news feed, the suggestions intake,
          the comments and the account profiles.
        </p>
        <h2 className="text-xl font-bold text-foreground/80">What we collect</h2>
        <p className="text-sm leading-relaxed text-foreground/70">
          Account data — when you sign in or sign up, your email address is stored by the
          Firebase authentication service, and you may receive a verification email. Your profile
          data — username, name, country, language, gender, education, city, date of birth, bio and
          your profile picture are stored in the SEAblings Only database. Anonymous comments —
          the body text and timestamp of comments on posts are stored, and the account id is not
          shown. Suggestions — the title, summary and kind of every suggestion are stored with
          status "draft" until Anthony reviews them.
        </p>
        <h2 className="text-xl font-bold text-foreground/80">Cookies and tracking</h2>
        <p className="text-sm leading-relaxed text-foreground/70">
          SEAblings Only uses no advertising, analytics or tracking cookies of its own. The
          Firebase sign-in session is stored as an HTTP-only cookie by Firebase itself. The site
          sets no other cookies — no tracking pixels, no third-party requests for analytics.
        </p>
        <h2 className="text-xl font-bold text-foreground/80">Why we collect it</h2>
        <p className="text-sm leading-relaxed text-foreground/70">
          To create and manage your account, show you your public profile, moderate the community,
          and deliver the community news feed. We do not sell your data or share it with third
          parties for advertising or marketing.
        </p>
        <h2 className="text-xl font-bold text-foreground/80">How long we keep it</h2>
        <p className="text-sm leading-relaxed text-foreground/70">
          Your profile and account data stay while your account exists. You can delete your
          account from Settings, which removes your profile, comments and suggestions. Comments
          and posts stay publicly visible for the life of the site unless Anthony removes them.
        </p>
        <h2 className="text-xl font-bold text-foreground/80">Your rights</h2>
        <p className="text-sm leading-relaxed text-foreground/70">
          You can edit your profile details at any time, and you can change your language — the
          whole site translates. You can ask us to delete your account and personal data at any
          time, and you can edit or request correction of inaccurate profile data.
        </p>
        <h2 className="text-xl font-bold text-foreground/80">How to report a concern</h2>
        <p className="text-sm leading-relaxed text-foreground/70">
          Questions or concerns about this policy go to Anthony at{" "}
          <a className="text-gold underline hover:text-gold/90" href="mailto:AntJack4600@gmail.com">
            AntJack4600@gmail.com
          </a>
          .
        </p>
        <Footer />
      </div>
    </main>
  );
}
