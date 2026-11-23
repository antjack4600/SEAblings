import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data", "sea_blings.db");
let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!_db) {
    if (!fs.existsSync(DB_PATH)) { _db = new Database(":memory:"); return _db; }
    _db = new Database(DB_PATH);
    // Ensure tables exist (idempotent).
    _db.exec(`
      CREATE TABLE IF NOT EXISTS profiles (
        uid TEXT PRIMARY KEY,
        username TEXT,
        name TEXT,
        country TEXT,
        language TEXT,
        gender TEXT,
        education TEXT,
        city TEXT,
        date_of_birth TEXT,
        bio TEXT,
        avatar TEXT
      );
      CREATE TABLE IF NOT EXISTS friends (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        liker_uid TEXT NOT NULL,
        liked_uid TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime("now")),
        UNIQUE(liker_uid, liked_uid)
      );
    `);
  }
  return _db;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { uid1, uid2 } = Object.fromEntries(searchParams.entries()) as {
    uid1?: string;
    uid2?: string;
  };
  if (!uid1 || !uid2) return NextResponse.json({ error: "uid1 and uid2 required" }, { status: 400 });
  const db = getDb();
  try {
    const row = db.prepare("SELECT 1 FROM friends WHERE liker_uid = ? AND liked_uid = ?").get(uid1, uid2);
    return NextResponse.json({ isFriend: !!row }, { status: 200 });
  } catch {
    return NextResponse.json({ isFriend: false }, { status: 200 });
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const { likerUid, likedUid } = body;
  if (!likerUid || !likedUid || likerUid === likedUid) return NextResponse.json({ error: "Missing or invalid uids" }, { status: 400 });
  const db = getDb();
  try {
    // Insert or ignore (UNIQUE constraint prevents duplicates).
    db.prepare("INSERT OR IGNORE INTO friends (liker_uid, liked_uid) VALUES (?, ?)").run(likerUid, likedUid);
    // Check if this creates a mutual like (both like each other).
    const mutualRow = db.prepare("SELECT 1 FROM friends WHERE liker_uid = ? AND liked_uid = ?").get(likedUid, likerUid);
    return NextResponse.json({ ok: true, isMutual: !!mutualRow }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}