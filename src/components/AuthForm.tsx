// src/components/AuthForm.tsx — shared sign-in / sign-up form (Firebase email)
"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirebaseApp } from "@/firebase";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";

const inputClass =
  "w-full rounded-md border border-border bg-card px-3 py-2 text-foreground placeholder:text-foreground/40";

export default function AuthForm({ title }: { title?: string }) {
  void title; // optional page label; the form labels itself via translations
  const { lang } = useLanguageStore();
  const m = t(lang);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const auth = getAuth(getFirebaseApp());
    let successMsg = "";
    try {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        successMsg = m.signedInMsg;
      } catch (err: any) {
        if (err?.code === "auth/user-not-found") {
          const { createUserWithEmailAndPassword } = await import("firebase/auth");
          await createUserWithEmailAndPassword(auth, email, password);
          successMsg = m.signupMsg;
        } else {
          throw err;
        }
      }
    } catch {
      setMsg(m.errorMsg);
      setBusy(false);
      return;
    }
    setMsg(successMsg);
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full">
      <label className="text-sm text-foreground/70">
        {m.email}
        <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
      </label>
      <label className="text-sm text-foreground/70">
        {m.password}
        <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
      </label>
      <button type="submit" disabled={busy} className="min-h-[44px] rounded-md bg-accent px-3 py-2 font-medium text-background hover:bg-accent/90 disabled:opacity-50">
        {busy ? "…" : m.signinButton}
      </button>
      {msg && (
        <p role="alert" className="text-sm text-gold">
          {msg}
        </p>
      )}
    </form>
  );
}
