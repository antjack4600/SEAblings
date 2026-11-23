"use client";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { getFirebaseApp } from "@/firebase";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";

const inputClass =
  "w-full rounded-md border border-border bg-card px-3 py-2 text-foreground placeholder:text-foreground/40";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthForm({ title }: { title?: string }) {
  const { lang } = useLanguageStore();
  const m = t(lang);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resetBusy, setResetBusy] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Emails are normalized to lowercase; a missing "@" or stray symbols fail validation.
    const emailNorm = email.trim().toLowerCase();
    if (!EMAIL_RE.test(emailNorm)) {
      setMsg(m.validEmailMsg);
      setBusy(false);
      return;
    }
    setBusy(true);
    const auth = getAuth(getFirebaseApp());
    let successMsg = "";
    try {
      try {
        await signInWithEmailAndPassword(auth, emailNorm, password);
        successMsg = m.signedInMsg;
      } catch (err: any) {
        if (err?.code === "auth/user-not-found") {
          await createUserWithEmailAndPassword(auth, emailNorm, password);
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

  async function onForgot(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const emailNorm = email.trim().toLowerCase();
    if (!EMAIL_RE.test(emailNorm)) {
      setResetMsg(m.validEmailMsg);
      return;
    }
    setResetBusy(true);
    try {
      const auth = getAuth(getFirebaseApp());
      await sendPasswordResetEmail(auth, emailNorm);
      setResetMsg(m.resetSentMsg);
    } catch {
      setResetMsg(m.errorMsg);
    } finally {
      setResetBusy(false);
    }
  }

  // noValidate: show the app's localized validation message instead of the browser's English one.
  return (
    <form noValidate onSubmit={onSubmit} method="post" className="flex flex-col gap-3 w-full">
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
      <button type="button" onClick={onForgot} disabled={resetBusy} className="self-start text-xs text-gold underline hover:opacity-80 disabled:opacity-50">
        {m.forgotPasswordLabel}
      </button>
      <div aria-live="polite" aria-atomic="true">
        {msg && (
          <p role="alert" className="text-sm text-gold">
            {msg}
          </p>
        )}
        {resetMsg && (
          <p role="alert" className="text-sm text-gold">
            {resetMsg}
          </p>
        )}
      </div>
    </form>
  );
}
