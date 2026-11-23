import type { Post } from "@/lib/types";
import Comments from "@/components/Comments";

function formatDate(value: string, locale: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default function PostCard({
  post,
  locale,
  originalLabel,
}: {
  post: Post;
  locale: string;
  originalLabel: string;
}) {
  return (
    <article data-post-card className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <h2 data-post-title className="font-bold text-foreground">{post.title || "(untitled)"}</h2>
      {post.summary && (
        <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{post.summary}</p>
      )}
      {post.media_url && (
        <video controls className="w-full mt-3 rounded-md" src={post.media_url} />
      )}
      <div className="mt-3 text-xs text-foreground/50">
        {post.country_code} · {formatDate(post.created_at, locale)}
        {post.originalLanguage && (
          <span data-post-original className="ml-2 rounded bg-accent/10 px-2 py-0.5">
            {originalLabel}: {post.originalLanguage}
          </span>
        )}
      </div>
      <Comments postId={post.id} />
    </article>
  );
}
