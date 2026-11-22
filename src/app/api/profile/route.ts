import { NextResponse } from "next/server";
import { getProfile, upsertProfile, type Profile } from "@/lib/db";

// Profile is client-curated community attributes. The Firebase web SDK cannot verify
// the caller's uid on the server (verifyIdToken is firebase-admin only), so the client
// passes its own uid — identity is asserted by the owner, not verified by the server.
// Fields are whitelisted, string-only, and trimmed.

const PROFILE_KEYS = [
  "username", "name", "country", "language", "gender", "education", "city",
  "date_of_birth", "bio",
] as const;

export async function GET(req: Request) {
  const uid = new URL(req.url).searchParams.get("uid");
  if (!uid) return NextResponse.json({ error: "uid required" }, { status: 400 });
  return NextResponse.json(getProfile(uid) ?? null);
}

export async function POST(req: Request) {
  const input = await req.json().catch(() => null);
  if (!input || typeof input !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const uid = typeof input.uid === "string" && input.uid.trim() !== "" ? input.uid.trim() : null;
  if (!uid) return NextResponse.json({ error: "uid required" }, { status: 400 });

  const allowed: Partial<Profile> = {};
  for (const key of PROFILE_KEYS) {
    const v = (input as Record<string, unknown>)[key];
    if (typeof v === "string" && v.trim() !== "") allowed[key] = v.trim() as Profile[typeof key];
  }
  upsertProfile(uid, allowed);
  return NextResponse.json({ ok: true, profile: getProfile(uid) });
}
