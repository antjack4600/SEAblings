// src/app/suggestions/page.tsx — Anthony's personal suggestion intake (v1)
"use client";
import { useState } from "react";

const inputClass = "w-full rounded-md border border-border bg-card px-3 py-2 text-foreground";

export default function SuggestionsPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [kind, setKind] = useState<"topic" | "video" | "event">("topic");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, summary, kind }),
      });
      setMsg(res.ok ? "Saved. Anthony reviews suggestions in the app (plan §3)." : "Failed to save.");
      if (res.ok) {
        setTitle("");
        setSummary("");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-2">
          <img src="/ASEANAppLogoimage.png" alt="SEAblings Only" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-foreground">Suggest to SEAblings Only</h1>
        </div>
        <p className="text-sm text-foreground/60 mb-4">Suggest a topic, video, or event — Anthony reviews and approves them.</p>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <label className="text-sm text-foreground/70">
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} required className={inputClass} />
          </label>
          <label className="text-sm text-foreground/70">
            Summary
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} required rows={3} className={inputClass} />
          </label>
          <label className="text-sm text-foreground/70">
            Kind
            <select value={kind} onChange={(e) => setKind(e.target.value as "topic" | "video" | "event")} className={inputClass + " mt-1"}>
              <option value="topic">Topic</option>
              <option value="video">Video</option>
              <option value="event">Event (carnival/festival location/time)</option>
            </select>
          </label>
          <button type="submit" disabled={busy} className="rounded-md bg-accent px-3 py-2 font-medium text-background hover:bg-accent/90 disabled:opacity-50">
            {busy ? "…" : "Save suggestion"}
          </button>
          {msg && <p className="text-sm text-gold">{msg}</p>}
        </form>
      </div>
    </main>
  );
}
