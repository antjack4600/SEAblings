// src/app/profile/page.tsx — Profile form (per the SEAblings spec):
// country, preferred language, username, name, gender, education, city, date of birth, bio.
// Plus: name validation (letters + spaces only — apostrophes/symbols are rejected) and a
// profile-picture upload (JPEG or PNG, stored on the Firebase account via updateProfile).
"use client";
import { useEffect, useState } from "react";
import { LANGUAGES } from "@/lib/languages";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";
import { useAuth } from "@/app/providers/AuthProvider";
import Footer from "@/components/Footer";

const COUNTRIES = [
  "indonesia", "malaysia", "singapore", "thailand", "vietnam", "myanmar",
  "laos", "cambodia", "philippines", "brunei", "east-timor", "united-states",
];

const inputClass =
  "w-full rounded-md border border-border bg-card px-3 py-2 text-foreground";

// Letters + spaces only: apostrophes and other symbols in names are rejected.
function isValidName(v: string): boolean {
  const t = v.trim();
  return t.length > 0 && /^[\p{L}\s]+$/u.test(t) && /\p{L}/u.test(t);
}

// Letter avatar used when the user has not uploaded a picture yet.
function letterAvatar(name: string): string {
  const ch = (name.trim()[0] ?? "?").toUpperCase();
  const hash = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const colors = ["#e11d48", "#ea580c", "#d97706", "#16a34a", "#0284c7", "#7c3aed", "#6d28a6"];
  const c = colors[hash % colors.length] ?? colors[0];
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">` +
    `<rect width="64" height="64" fill="${c}"/>` +
    `<text x="32" y="42" font-size="32" font-family="sans-serif" fill="#fff" text-anchor="middle" font-weight="bold">${ch}</text>` +
    `</svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

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
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState("");

  useEffect(() => {
    if (!user) return;
    setAvatarPreview(user.photoURL ?? null);
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
          setAvatarPreview(d.avatar ?? user.photoURL ?? null);
        }
      })
      .finally(() => setLoading(false));
  }, [user]);

  async function onAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    setAvatarError("");
    if (!file) return;
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setAvatarError(m.profileAvatarError);
      return;
    }
    const ok = await new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(file);
    });
    if (!ok) {
      setAvatarError(m.profileAvatarError);
      return;
    }
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
    setAvatarPreview(dataUrl);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (!isValidName(name)) {
      setMsg(m.nameInvalidMsg);
      setBusy(false);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ uid: user.uid, username, name, country, language, gender, education, city, date_of_birth: dateOfBirth, bio, avatar: avatarPreview ?? null }),
      });
      setMsg(res.ok ? m.profileSave : m.errorMsg);
    } catch {
      setMsg(m.errorMsg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <img src="/SEAb lings_Only_logo.svg" alt="" width={32} height={32} className="w-8 h-8 object-cover rounded-md" />
            <h1 className="text-2xl font-bold text-foreground">{m.profileTitle}</h1>
          </div>
          <LanguageSwitcher />
        </div>
        {!user ? (
          <div className="mt-6 space-y-3 text-sm text-foreground/70">
            <p>
              Sign in to edit your details —{" "}
              <a href="/sign-in" className="underline text-gold hover:text-gold/90">
                Sign in
              </a>
              .
            </p>
            <p>
              Your details page is your public presence on SEAblings Only — a news feed
              of ASEAN. Sign in and fill in your username, name, country, language and
              other details — everything you add is visible on the site, and the whole
              site translates to the language you pick.
            </p>
            <p>
              Details — the username, name, country, language, gender, education, city,
              date of birth and bio fields show up on this page once signed in. Others
              read them, so share whatever you want — a short friendly bio tells people
              about you and where you come from.
            </p>
            <p>
              Photo — this page accepts a JPEG or PNG upload; a letter avatar is the
              default until you upload one, and it shows across the site.
            </p>
            <p>
              Saving — press Save after changing anything. It is public and persistent:
              once saved, it stays across sessions and can be edited again anytime.
            </p>
            <p>
              Everything you set here is visible to readers — pick a username that is
              easy to find and a language you read in. Only share what you want to share.
            </p>
            <p>
              Every detail is public, so be careful with the country and bio: the people
              who read your page see where you live and what you write. Names with
              accents and special characters are supported, and your bio can say anything
              you want about yourself or your interests — read it as someone you just met.
            </p>
            <p>
              The username is how you show up to readers — others see it next to your
              posts and comments. Choose a name you like; you can change it any time
              here, and every change you make follows you across the site.
            </p>
            <p>
              When you return, the fields are waiting exactly as you left them. A short
              introduction works better than a long list of facts: readers want to know which
              part of the region you know well and what kind of stories you follow. You can edit
              or clear any field later; nothing is fixed in place.
            </p>
            <p>
              Your picture uses a JPEG or PNG file and is checked before it is saved. Until then
              a letter tile stands in for it. Choosing a reading language here changes how the
              site presents itself to you; the switcher at the top of the page does the same for
              a single visit, while this setting travels with your account.
            </p>
            <p>
              Saving is permanent until you make another change. Sign out and back in and the
              same details will be waiting. Take a moment to read the bio as someone you have
              just met — it is the line most readers will remember after your posts.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
            <p className="text-sm text-foreground/60">
              Edit your profile on SEAblings Only — country, language, and community details — then save it. Your profile is public across the site.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-foreground/60">
              Your profile is your public presence on SEAblings Only — the community news feed of
              ASEAN. Fill in your username, name, and other details like your bio and country, then
              save it. Every profile detail you choose to share is public in the community, so pick
              your language carefully — the whole site translates.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-foreground/60">
              Community details — the username, name, country, language, gender, education, city,
              date of birth, and bio fields are set here. The community reads them on your public
              profile, so only share what you are comfortable with. Your profile is public across
              the site — anyone can read it, so make the bio useful and friendly.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-foreground/60">
              Profile picture — choose a profile picture on this page: pick a JPEG or PNG file and
              it uploads to your account, with a letter avatar as the default. Your picture appears
              on your profile and in the community.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-foreground/60">
              Saving your profile — press Save profile after changing anything. The profile is
              public and persistent: once saved, it stays across sessions, and editing it again is
              always possible.
            </p>
            <div className="flex items-center gap-3">
              <img
                src={avatarPreview ?? letterAvatar(user.displayName ?? user.email ?? "?")}
                alt=""
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="flex flex-col gap-1">
                <input
                  id="avatar-input"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={onAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar-input"
                  className="text-xs text-gold underline cursor-pointer hover:opacity-80"
                >
                  {m.profileAvatarLabel}
                </label>
                {avatarError && <p className="text-xs text-gold">{avatarError}</p>}
              </div>
            </div>
            <label className="text-sm text-foreground/70">
              Username
              <input value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} placeholder="e.g. asean_voice" />
            </label>
            <label className="text-sm text-foreground/70">
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Letters and spaces only" />
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
        <Footer />
      </div>
    </main>
  );
}
