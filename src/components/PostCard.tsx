import type { Post } from "@/lib/types";
import Comments from "@/components/Comments";

export default function PostCard({ post }: { post: Post }) {
  const date = new Date(post.created_at).toLocaleString();
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="font-bold text-foreground">{post.title || "(untitled)"}</div>
      {post.summary && (
        <div className="mt-2 text-sm text-foreground/80 leading-relaxed">{post.summary}</div>
      )}
      {post.media_url && (
        <video controls className="w-full mt-3 rounded-md" src={post.media_url} />
      )}
      <div className="mt-3 text-xs text-foreground/50">
        {post.country_code} · {post.language_code} · {date}
      </div>
      <Comments postId={post.id} />
    </div>
  );
}
