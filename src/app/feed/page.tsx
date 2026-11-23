// src/app/feed/page.tsx — sign-in gate and localized community news feed.
"use client";
import { useEffect, useState } from "react";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";
import { LANGUAGES } from "@/i18n/config";
import { useAuth } from "@/app/providers/AuthProvider";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";
import AuthForm from "@/components/AuthForm";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import type { Post } from "@/lib/types";

export default function FeedPage() {
  const { user } = useAuth();
  const { lang } = useLanguageStore();
  const m = t(lang);
  const locale = LANGUAGES.find((l) => l.code === lang)?.locale ?? "en-US";
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const controller = new AbortController();
    let active = true;
    setLoading(true);
    fetch(`/api/feed?lang=${encodeURIComponent(lang)}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`feed request failed: ${response.status}`);
        return response.json();
      })
      .then((data: unknown) => {
        if (!active) return;
        setPosts(Array.isArray(data) ? (data as Post[]) : []);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setPosts([]);
        setLoading(false);
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [user, lang]);

  if (!user) {
    return (
      <main className="min-h-full flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">{m.signinTitle}</h1>
            <LanguageSwitcher />
          </div>
          <p className="text-sm text-foreground/60 mb-6">{m.signinSubtitle}</p>
          <AuthForm title={m.signinTitle} />
          <Footer />
        </div>
      </main>
    );
  }

  return (
    <main data-feed className="min-h-full px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-foreground">{m.feedTitle}</h1>
          <LanguageSwitcher />
        </header>
        {loading ? (
          <p className="text-sm text-foreground/60">{m.loading}</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-foreground/60">{m.feedEmpty}</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              locale={locale}
              originalLabel={m.feedOriginal}
            />
          ))
        )}
        <Footer />
      </div>
    </main>
  );
}
