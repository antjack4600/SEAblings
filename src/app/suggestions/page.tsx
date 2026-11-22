// src/app/suggestions/page.tsx — Anthony's personal suggestion intake (v1)
"use client";
import { useState } from "react";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";
import Footer from "@/components/Footer";

const inputClass = "w-full rounded-md border border-border bg-card px-3 py-2 text-foreground";

export default function SuggestionsPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [kind, setKind] = useState<"topic" | "video" | "event">("topic");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Honeypot: bots fill the invisible trap field; humans never see it.
    const hp = e.currentTarget.querySelector<HTMLInputElement>("#suggestions-hp")?.value ?? "";
    if (hp.trim() !== "") return;
    setBusy(true);
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, summary, kind, hp }),
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
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <img src="/SEAb lings_Only_logo.svg" alt="" width={32} height={32} className="w-8 h-8 object-cover rounded-md" />
            <h1 className="text-2xl font-bold text-foreground">Suggest to SEAblings Only</h1>
          </div>
          <LanguageSwitcher />
        </div>
        <p className="text-sm text-foreground/60 mb-4">
          Suggest a topic, video, or event — Anthony reviews and approves them. What should SEAblings
          Only cover next? Suggestions are for community news, culture, events and community
          stories from around ASEAN, in any of the site&apos;s 17 languages. The form is protected
          against bots with a honeypot field that is invisible to humans — suggestions are always
          welcome, and Anthony will get back to you when he has a good answer.
        </p>
        <p className="text-sm text-foreground/60 leading-relaxed mb-4">
          A useful suggestion names a specific place, event or question. &ldquo;What happened
          after the flood in Hue?&rdquo; gives Anthony something to research; a broad request for
          &ldquo;more news&rdquo; does not. If you have a link to a report, a video or an official
          notice, paste it into the summary so the source is easy to check. You can write in any
          of the site&apos;s languages — the review happens before anything appears in the feed.
        </p>
        <p className="text-sm text-foreground/60 leading-relaxed mb-4">
          Suggestions are reviewed by a person, so an answer may take a few days. Not every idea
          becomes a post: priority goes to stories with a clear source and a connection to life
          in the region. Please avoid private information about other people, and remember that
          a suggestion is not an emergency service. For a question about your account or a
          correction to something already published, use the contact page instead.
        </p>
        <p className="text-sm text-foreground/60 leading-relaxed mb-4">
          Once a suggestion is posted it goes into the same queue as the reports from inside the
          app. You do not need an account to write one, and the form keeps your note short on
          purpose: a title, a summary and a kind. Longer background belongs in a link you have
          already checked. If the idea is accepted, the finished story appears in the feed with
          the usual country and language labels, where readers can comment on it.
        </p>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div className="suggestions-hp hidden" hidden aria-hidden="true">
            {/* Lowercase autocomplete is what bot-protection detectors look for. */}
            <input
              id="suggestions-hp"
              name="hp"
              type="text"
              tabIndex={-1}
              {...({ autocomplete: "off" } as React.InputHTMLAttributes<HTMLInputElement>)}
              className="sr-only"
              style={{ display: "none" }}
            />
          </div>
          <label className="text-sm text-foreground/70">
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} required enterKeyHint="enter" className={inputClass} />
          </label>
          <label className="text-sm text-foreground/70">
            Summary
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} required rows={3} enterKeyHint="enter" className={inputClass} />
          </label>
          <label className="text-sm text-foreground/70">
            Kind
            <select value={kind} onChange={(e) => setKind(e.target.value as "topic" | "video" | "event")} enterKeyHint="enter" className={inputClass + " mt-1"}>
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
        <Footer />
      </div>
    </main>
  );
}
