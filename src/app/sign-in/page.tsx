// src/app/sign-in/page.tsx — Firebase email sign-up / sign-in (click-to-verify link)
"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirebaseApp } from "@/firebase";

const inputClass = "w-full rounded-md border border-border bg-card px-3 py-2 text-foreground placeholder:text-foreground/40";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const auth = getAuth(getFirebaseApp());
    try {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setMsg("Signed in. Check your email — click the verification link to confirm your account.");
      } catch (err: any) {
        if (err?.code === "auth/user-not-found") {
          const { createUserWithEmailAndPassword } = await import("firebase/auth");
          await createUserWithEmailAndPassword(auth, email, password);
          setMsg("Account created. Check your email — click the verification link to confirm your account.");
        } else {
          throw err;
        }
      }
    } catch (err: any) {
      setMsg(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-2">
          <img src="/ASEANAppLogoimage.png" alt="SEAblings Only" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-foreground">SEAblings Only</h1>
        </div>
        <p className="text-sm text-foreground/60 mb-6">Sign in or create an account to comment. Free, email-only.</p>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <label className="text-sm text-foreground/70">
            Email
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </label>
          <label className="text-sm text-foreground/70">
            Password
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
          </label>
          <button type="submit" disabled={busy} className="rounded-md bg-accent px-3 py-2 font-medium text-background hover:bg-accent/90 disabled:opacity-50">
            {busy ? "…" : "Sign in / Sign up"}
          </button>
          {msg && <p className="text-sm text-gold">{msg}</p>}
        </form>
      </div>
    </main>
  );
}
