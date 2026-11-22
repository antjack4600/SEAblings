// src/app/page.tsx — SEAblings Only feed: language selector + client-fetched posts
"use client";
import { useEffect, useState } from "react";
import type { Post } from "@/lib/types";
import { LANGUAGES } from "@/lib/languages";
import PostCard from "@/components/PostCard";

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("");

  useEffect(() => {
    fetch("/api/feed")
      .then((r) => r.json())
      .then((d) => setPosts(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = lang ? posts.filter((p) => p.language_code === lang) : posts;

  return (
    <main className="flex flex-col min-h-full">
      <div className="w-full max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src="/ASEANAppLogoimage.png" alt="SEAblings Only" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-foreground">SEAblings Only</h1>
          </div>
          <a href="/settings" className="text-sm text-foreground/60 hover:underline">
            Settings
          </a>
        </div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">
          Language
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-foreground placeholder:text-foreground/40"
          >
            <option value="">All languages</option>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name} ({l.country})
              </option>
            ))}
          </select>
        </label>
        {loading ? (
          <p className="mt-6 text-foreground/60">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="mt-6 text-foreground/60">No posts yet.</p>
        ) : (
          <div className="mt-6 space-y-2">
            {filtered.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
