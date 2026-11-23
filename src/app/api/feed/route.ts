import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { roundRobinFeed } from "@/lib/equalCoverage";
import { LANGUAGES } from "@/i18n/config";
import { LANGUAGE_BASE } from "@/lib/feedTranslations";
import type { Post, PostTranslation } from "@/lib/types";

function parseTranslations(raw: Post["translations"]): Record<string, PostTranslation> {
  if (!raw) return {};
  if (typeof raw === "object") return raw as Record<string, PostTranslation>;
  try {
    return JSON.parse(raw) as Record<string, PostTranslation>;
  } catch {
    return {};
  }
}

function localizePost(post: Post, lang: string) {
  const translations = parseTranslations(post.translations);
  const chain = [lang, LANGUAGE_BASE[lang], "en"].filter(Boolean) as string[];
  let chosen: PostTranslation | undefined;
  for (const code of chain) {
    if (translations[code]) {
      chosen = translations[code];
      break;
    }
  }
  const { translations: _unused, ...rest } = post;
  return {
    ...rest,
    title: chosen?.title ?? post.title,
    summary: chosen?.summary ?? post.summary,
    originalLanguage: post.language_code,
  };
}

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("lang") ?? "en";
  const lang = LANGUAGES.some((l) => l.code === requested) ? requested : "en";
  const posts = roundRobinFeed(30).map((post) => localizePost(post, lang));
  return NextResponse.json(posts);
}
