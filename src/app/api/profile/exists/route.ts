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
    // Ensure profiles table exists (idempotent).
    _db.exec(`CREATE TABLE IF NOT EXISTS profiles (uid TEXT PRIMARY KEY, name TEXT)`);
  }
  return _db;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");
  if (!uid) return NextResponse.json({ error: "uid required" }, { status: 400 });
  const db = getDb();
  try {
    const row = db.prepare("SELECT 1 FROM profiles WHERE uid = ?").get(uid);
    return NextResponse.json({ exists: !!row }, { status: 200 });
  } catch {
    return NextResponse.json({ exists: false }, { status: 200 });
  }
}