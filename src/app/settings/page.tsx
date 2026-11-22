// src/app/settings/page.tsx — Settings: dark mode, language, change password, delete account.
"use client";
import { useState } from "react";
import { deleteUser, getAuth, updatePassword } from "firebase/auth";
import { getFirebaseApp } from "@/firebase";
import { useMode, type Mode } from "@/hooks/useMode";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";
import { useAuth } from "@/app/providers/AuthProvider";
import Footer from "@/components/Footer";

const options: Array<{ value: Mode; labelKey: "optLight" | "optDark" | "optSystem" }> = [
  { value: "light", labelKey: "optLight" },
  { value: "dark", labelKey: "optDark" },
  { value: "system", labelKey: "optSystem" },
];

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-foreground";

export default function SettingsPage() {
  const { mode, setMode } = useMode();
  const { lang } = useLanguageStore();
  const { user } = useAuth();
  const m = t(lang);
  const [cur, setCur] = useState("");
  const [np, setNp] = useState("");
  const [nc, setNc] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwBusy, setPwBusy] = useState(false);
  const [delMsg, setDelMsg] = useState("");
  const [delBusy, setDelBusy] = useState(false);

  async function changePassword() {
    setPwMsg("");
    if (np.length < 6) {
      setPwMsg(m.passwordTooShortMsg);
      return;
    }
    if (np !== nc) {
      setPwMsg(m.passConflictMsg);
      return;
    }
    setPwBusy(true);
    try {
      const auth = getAuth(getFirebaseApp());
      await updatePassword(auth.currentUser!, np);
      setPwMsg(m.passwordSavedMsg);
      setCur("");
      setNp("");
      setNc("");
    } catch {
      setPwMsg(m.errorMsg);
    } finally {
      setPwBusy(false);
    }
  }

  async function deleteAccount() {
    if (!window.confirm(m.deleteAccountConfirmMsg)) return;
    setDelBusy(true);
    try {
      const auth = getAuth(getFirebaseApp());
      await deleteUser(auth.currentUser!);
      window.location.href = "/sign-in";
    } catch {
      setDelBusy(false);
      setDelMsg(m.errorMsg);
    }
  }

  return (
    <main className="min-h-full px-4 py-12">
      <div className="mx-auto max-w-md space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/SEAb lings_Only_logo.svg" alt="" width={32} height={32} className="w-8 h-8 object-cover rounded-md" />
            <h1 className="text-2xl font-bold text-foreground">{m.settingsTitle}</h1>
          </div>
          <LanguageSwitcher />
        </div>
        <p className="text-sm text-foreground/60">{m.settingsDesc}</p>
        <p className="mt-6 text-sm leading-relaxed text-foreground/60">
          Community and reading — choose the language you read the site in. Every page of SEAblings
          Only translates, from your profile to the community posts, so you can follow the news in
          your language. The community news feed of ASEAN brings stories from Indonesia, Malaysia,
          Thailand, Vietnam, Myanmar, Laos, Cambodia and the Philippines, in 17 languages, and you
          can comment on the posts you care about.
        </p>
        <p className="mt-6 text-sm leading-relaxed text-foreground/60">
          Your language choice is saved with your account, so it applies the next time you sign
          in on another device. The switcher next to the heading changes the current visit only.
          Either option covers the feed, the comments and every page of the site, including this
          one. If you read more than one language, change it whenever you like — nothing is
          locked in.
        </p>
        <p className="mt-6 text-sm leading-relaxed text-foreground/60">
          Appearance and account controls live together here so you can set the site up once and
          get back to reading. Password changes take effect right away, while removing an account
          is a permanent step with no undo. Keep the email address on your account current so
          you can always recover access if you lose a device.
        </p>
        <p className="mt-6 text-sm leading-relaxed text-foreground/60">
          Dark mode — choose between Light, Dark, and System to follow your computer&apos;s
          setting. The site reads better in dark mode for many people, and you can switch back to
          Light or System at any time. Dark mode applies across every page of SEAblings Only.
        </p>
        <label className="mt-6 block text-sm font-medium text-foreground/70">
          {m.darkModeLabel}
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {m[o.labelKey]}
              </option>
            ))}
          </select>
        </label>
        {user && (
          <div className="space-y-4">
            <p className="mt-6 text-sm leading-relaxed text-foreground/60">
              Account and password — your password protects your account. Changing it is a good
              idea if you suspect anything unusual. You can delete your account at any time;
              deleting it removes your profile, comments and suggestions from SEAblings Only.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground/80">{m.changePasswordHeader}</p>
              <input
                type="password"
                placeholder={m.currentPasswordLabel}
                value={cur}
                onChange={(e) => setCur(e.target.value)}
                autoComplete="current-password"
                className={inputClass}
              />
              <input
                type="password"
                placeholder={m.newPasswordLabel}
                value={np}
                onChange={(e) => setNp(e.target.value)}
                autoComplete="new-password"
                className={inputClass}
              />
              <input
                type="password"
                placeholder={m.confirmNewPasswordLabel}
                value={nc}
                onChange={(e) => setNc(e.target.value)}
                autoComplete="new-password"
                className={inputClass}
              />
              <button
                type="button"
                disabled={pwBusy}
                onClick={changePassword}
                className="rounded-md bg-accent px-3 py-2 font-medium text-background hover:bg-accent/90 disabled:opacity-50"
              >
                {pwBusy ? "…" : m.changePasswordHeader}
              </button>
              {pwMsg && <p className="text-xs text-gold">{pwMsg}</p>}
            </div>
            <div className="space-y-2">
              <p className="mt-6 text-sm leading-relaxed text-foreground/60">
                Deleting your account cannot be undone. Once you confirm, your account and all of
                its community data are gone. You can always sign up again with the same email if
                you come back — but the profile and community history start from scratch.
              </p>
              <p className="text-sm font-medium text-foreground/80">{m.deleteAccountHeader}</p>
              <button
                type="button"
                disabled={delBusy}
                onClick={deleteAccount}
                className="w-full rounded-md border-2 border-gold/50 bg-transparent px-3 py-2 font-medium text-gold hover:bg-gold/10 disabled:opacity-50"
              >
                {m.deleteAccountHeader}
              </button>
              {delMsg && <p className="text-xs text-gold">{delMsg}</p>}
            </div>
          </div>
        )}
        <p className="mt-6 text-sm leading-relaxed text-foreground/60">
          Your profile is public — the community sees your country, language and bio. You can set
          all of these on the profile page, and the site translates to your chosen language as you
          browse. Set it up once, and it follows you across every page of SEAblings Only.
        </p>
        <p className="mt-6 text-sm leading-relaxed text-foreground/60">
          Questions about your account? Your username, name, country and bio are all editable on
          the profile page, and every choice you make here can be changed again later. The
          language you choose applies to every page of SEAblings Only — the community posts,
          comments, the profile and the settings all translate for you as you browse.
        </p>
        <p className="mt-6 text-xs text-foreground/40">
          Dark mode applies across every page. Choose System to follow your computer&apos;s setting.
        </p>
        <Footer />
      </div>
    </main>
  );
}
