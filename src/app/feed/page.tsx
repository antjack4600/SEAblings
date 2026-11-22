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
    <main className="min-h-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src="/SEAb lings_Only_logo.svg" alt="" width={32} height={32} className="w-8 h-8 object-cover rounded-md" />
            <h1 className="text-2xl font-bold text-foreground">{m.signinTitle}</h1>
          </div>
          <LanguageSwitcher />
        </div>
        <p className="text-sm text-foreground/60 mb-6">{m.signinSubtitle}</p>
        <p className="text-sm text-foreground/60 leading-relaxed">
          The SEAblings Only community news feed — the latest posts from ASEAN. Read the stories your
          country is talking about, discuss them in the comments, and share what matters to you.
          Posts come from Indonesia, Malaysia, Thailand, Vietnam, Myanmar, Laos, Cambodia, the
          Philippines, Brunei and East Timor, in 17 languages, free to read and join.
        </p>
        <p className="text-sm text-foreground/60 leading-relaxed mt-6">
          Community news — the SEAblings Only feed collects posts from around ASEAN: Indonesia,
          Malaysia, Thailand, Vietnam, Myanmar, Laos, Cambodia, the Philippines, Brunei and East
          Timor. You can suggest new topics and events through the suggestions form — Anthony
          reviews every suggestion before it goes up. Comments are welcome on every post, and
          you can browse by your chosen language. Everything you see is free to read, and
          anything you have to say about it is a welcome part of the discussion.
        </p>
        <p className="text-sm text-foreground/60 leading-relaxed mt-6">
          The community feed shows the latest posts — stories from your region are always among
          the new posts. Posts come from community posters across ASEAN: Indonesia, Malaysia,
          Thailand, Vietnam, Myanmar, Laos, Cambodia, the Philippines, Brunei and East Timor.
          You can comment on any post in the language you choose, and everything you read
          here is free to read, always open to new posts from across the region. If something
          from your country is missing, the suggestions form is the way to ask — Anthony
          reviews every suggestion before it goes up.
        </p>
        <p className="text-sm text-foreground/60 leading-relaxed mt-6">
          When you open the feed you will see the newest posts first. Each entry carries its
          country and language, so you can scan by place or read across the whole region in one
          sitting. Use the switcher at the top of any page to change what you see; the setting
          follows your account and applies to comments as well as posts.
        </p>
        <p className="text-sm text-foreground/60 leading-relaxed mt-6">
          Posts cover politics, social issues, culture and everyday life. A discussion might
          begin with a local report and grow into a comparison across borders, which is where the
          regional view becomes useful. You do not have to agree to take part — adding context
          about what is happening where you live is often more helpful than a quick reaction.
        </p>
        <p className="text-sm text-foreground/60 leading-relaxed mt-6">
          Nothing here is behind a paywall. If a story you expected is missing, send it through
          the suggestions form and Anthony will review it. New readers can join with an email
          address and confirm the account by link.
        </p>
        <AuthForm title={m.signinTitle} />
        <Footer />
      </div>
    </main>
  );
}
