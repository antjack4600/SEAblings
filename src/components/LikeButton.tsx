"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";

const inputClass =
  "rounded-md border border-border bg-card/75 px-3 py-1.5 text-sm text-gold hover:bg-card/80 disabled:opacity-50";

export default function LikeButton({ targetUid: targetUidProp }: { targetUid?: string }) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [busy, setBusy] = useState(false);
  const targetUid = targetUidProp || "";

  useEffect(() => {
    // Check initial like status
    if (targetUid && user?.uid) {
      fetch(`/api/friends?uid1=${encodeURIComponent(user.uid)}&uid2=${encodeURIComponent(targetUid)}`)
        .then((r) => r.json())
        .then((d) => setIsLiked(d.isFriend))
        .catch(() => setIsLiked(false));
    }
  }, [targetUid, user?.uid]);

  async function handleLike() {
    if (!user?.uid || !targetUid || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/friends", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ likerUid: user.uid, likedUid: targetUid }),
      });
      const d = await res.json();
      setIsLiked(d.isMutual);
    } catch {
      // ignored
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      disabled={busy}
      className={inputClass}
      onClick={handleLike}
    >
      {busy ? "…" : isLiked ? "Liked" : "Like"}
    </button>
  );
}