"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import type { Comment } from "@/lib/types";

export default function Comments({ postId }: { postId: number }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`/api/comments?postId=${postId}`)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setComments(d);
      })
      .catch(() => {});
  }, [postId]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      setMsg("Sign in to comment.");
      return;
    }
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ postId, userId: user.uid, body: text }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok) {
        setText("");
        setComments((c) => [data, ...c]);
        setMsg("");
      } else {
        setMsg(data?.error ?? "Failed to comment.");
      }
    } catch {
      setMsg("Failed to comment.");
    }
  }

  return (
    <div className="mt-3 space-y-2">
      {comments.length > 0 && (
        <ul className="space-y-1">
          {comments.map((c) => (
            <li key={c.id} className="text-sm text-foreground/70">
              {c.body}
            </li>
          ))}
        </ul>
      )}
      {user ? (
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comment…"
            className="flex-1 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-foreground/40"
          />
          <button
            type="submit"
            className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-background hover:bg-accent/90"
          >
            Add
          </button>
        </form>
      ) : (
        <div className="text-xs text-foreground/50">Sign in to comment.</div>
      )}
      {msg && <p className="text-xs text-gold">{msg}</p>}
    </div>
  );
}
