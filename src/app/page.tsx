// src/app/page.tsx — SEAblings Only landing page (the website entry).
// The website is a community news feed: sign in (email-only, Firebase) and read the community.
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
    <main id="main-content" className="relative min-h-full flex flex-col z-10 px-5 py-10">
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-card focus:px-2 focus:py-1 focus:text-sm focus:text-foreground"
      >
        {m.skipToMain}
      </a>
      <ShaderBackground />
      <div className="flex items-center justify-between pt-6">
        <div className="flex items-center gap-3">
          <img
            src="/SEAb lings_Only_logo.svg"
            alt=""
            width={128}
            height={128}
            className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-md logo-float"
          />
          <span className="text-base font-semibold text-foreground/80">{m.landingTitle}</span>
        </div>
        <LanguageSwitcher />
      </div>
      <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto px-4 gap-7">
        <h1 className="enter-stagger grad-text text-5xl font-black leading-[1.05]">
          {m.landingTitle}
        </h1>
        <p className="enter-stagger delay-1 mt-2 text-lg leading-relaxed text-foreground/75">
          {m.landingTagline}
        </p>
        <p className="enter-stagger delay-2 mt-3 text-base text-foreground/65">
          {m.mission}
        </p>
        <p className="enter-stagger delay-3 mt-4 text-sm leading-relaxed text-foreground/55">
          A community news feed of ASEAN — read and discuss the stories of your country and the
          region, in 17 languages, free to read and join. Posts from Indonesia, Malaysia, Thailand,
          Vietnam, Myanmar, Laos, Cambodia, the Philippines, Brunei and East Timor — in your
          language. Suggest and comment on the community stories that matter to you.
        </p>
        <p className="enter-stagger delay-3 mt-4 text-sm leading-relaxed text-foreground/55">
          The site brings together readers and writers across ASEAN — whether you are here to
          follow the news, share what you know, or start a conversation. Everyone is welcome to
          read the feed, write comments, and participate in the discussion. The site is free to
          join and always open to new posts from across the region — Indonesia, Malaysia,
          Thailand, Vietnam, Myanmar, Laos, Cambodia, the Philippines, Brunei and East Timor,
          in your language.
        </p>
        <p className="enter-stagger delay-3 mt-4 text-sm leading-relaxed text-foreground/55">
          Stories from your region — Indonesia, Malaysia, Thailand, Vietnam, Myanmar, Laos,
          Cambodia, the Philippines, Brunei and East Timor — land in your language every
          day. The community reads and writes in many languages; the site translates so you
          can read the news, join the discussion and share what you find, wherever you are.
        </p>
        <p className="enter-stagger delay-3 mt-4 text-sm leading-relaxed text-foreground/55">
          Getting started is straightforward. Create an account with your email, choose the
          languages you read, and the feed opens to stories from across the region. There is no
          fee and no advertising to wade through. You can follow a country by reading its posts,
          send a topic you care about through the suggestion form, and return to the discussion
          whenever you have something to add.
        </p>
        <p className="enter-stagger delay-3 mt-4 text-sm leading-relaxed text-foreground/55">
          Anthony reviews every suggestion before it appears, so the feed stays focused on real
          stories and events. Comments are open to members, and the site translates between
          languages so a story from Manila can be discussed by someone in Jakarta or Yangon. If
          you care about what is happening in Southeast Asia, this is the place to follow it day
          by day.
        </p>
        <p className="enter-stagger delay-3 mt-4 text-sm leading-relaxed text-foreground/55">
          Read the feed:{" "}
          <a href="/feed" className="underline text-gold hover:text-gold/90">
            → /feed
          </a>
        </p>
        <p className="enter-stagger delay-3 mt-4 text-sm leading-relaxed text-foreground/55">
          SEAblings Only is free to read and free to join — browse, comment, and share. The
          site is open to new posts from across ASEAN, always free to read. The community
          discussion continues across the region — the app is also available on the App Store
          and Google Play.
        </p>
        <div className="enter-stagger delay-3 mt-8">
          <AuthForm />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-10">
        <a href="/suggestions" className="text-sm text-foreground/60 underline hover:text-foreground">Suggestions</a>
        <a href="/settings" className="text-sm text-foreground/60 underline hover:text-foreground">Settings</a>
        <a href="/profile" className="text-sm text-foreground/60 underline hover:text-foreground">Profile</a>
        <a href="/feed" className="text-sm text-foreground/60 underline hover:text-foreground">Feed</a>
        <a href="/about" className="text-sm text-foreground/60 underline hover:text-foreground">About</a>
        <a href="/contact" className="text-sm text-foreground/60 underline hover:text-foreground">Contact</a>
      </div>
      <div className="flex justify-center">
        <AppStoreBadges />
      </div>
      <Footer />
    </main>
  );
}
