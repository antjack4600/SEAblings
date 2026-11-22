// src/app/profile/page.tsx — Profile form (per the SEAblings spec):
// country, preferred language, username, name, gender, education, city, date of birth, bio.
"use client";
import { useEffect, useState } from "react";
import { LANGUAGES } from "@/lib/languages";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";
import { useAuth } from "@/app/providers/AuthProvider";

const COUNTRIES = [
  "indonesia", "malaysia", "singapore", "thailand", "vietnam", "myanmar",
  "laos", "cambodia", "philippines", "brunei", "east-timor", "united-states",
];

const inputClass =
  "w-full rounded-md border border-border bg-card px-3 py-2 text-foreground";

export default function ProfilePage() {
  const { user } = useAuth();
  const { lang } = useLanguageStore();
  const m = t(lang);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [city, setCity] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bio, setBio] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/profile?uid=${encodeURIComponent(user.uid)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d) {
          setUsername(d.username ?? "");
          setName(d.name ?? "");
          setCountry(d.country ?? "");
          setLanguage(d.language ?? "");
          setGender(d.gender ?? "");
          setEducation(d.education ?? "");
          setCity(d.city ?? "");
          setDateOfBirth(d.date_of_birth ?? "");
          setBio(d.bio ?? "");
        }
      })
      .finally(() => setLoading(false));
  }, [user]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ uid: user.uid, username, name, country, language, gender, education, city, date_of_birth: dateOfBirth, bio }),
      });
      setMsg(res.ok ? m.profileSave : m.errorMsg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <img src="/ASEANAppLogoimage.png" alt="SEAblings Only" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-foreground">{m.profileTitle}</h1>
          </div>
          <LanguageSwitcher />
        </div>
        {!user ? (
          <p className="mt-6 text-foreground/70">Sign in to edit your profile.</p>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
            <label className="text-sm text-foreground/70">
              Username
              <input value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} placeholder="e.g. asean_voice" />
            </label>
            <label className="text-sm text-foreground/70">
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
            </label>
            <label className="text-sm text-foreground/70">
              Country
              <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass + " mt-1"}>
                <option value="">Select country</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c.replaceAll("-", " ").toUpperCase()}</option>
                ))}
              </select>
            </label>
            <label className="text-sm text-foreground/70">
              Preferred language
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className={inputClass + " mt-1"}>
                <option value="">Select language</option>
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>{l.name}</option>
                ))}
              </select>
            </label>
            <label className="text-sm text-foreground/70">
              Gender
              <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputClass + " mt-1"}>
                <option value="">Not set</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="text-sm text-foreground/70">
              Education
              <input value={education} onChange={(e) => setEducation(e.target.value)} className={inputClass} placeholder="e.g. Bachelor's, High School" />
            </label>
            <label className="text-sm text-foreground/70">
              City
              <input value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
            </label>
            <label className="text-sm text-foreground/70">
              Date of birth
              <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className={inputClass + " mt-1"} />
            </label>
            <label className="text-sm text-foreground/70">
              Bio
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className={inputClass} placeholder="Tell us a bit about yourself" />
            </label>
            <button type="submit" disabled={busy} className="rounded-md bg-accent px-3 py-2 font-medium text-background hover:bg-accent/90 disabled:opacity-50">
              {busy ? "…" : m.profileSave}
            </button>
            {msg && <p className="text-sm text-gold">{msg}</p>}
          </form>
        )}
        {loading && <p className="mt-4 text-foreground/60">{m.loading}</p>}
      </div>
    </main>
  );
}
