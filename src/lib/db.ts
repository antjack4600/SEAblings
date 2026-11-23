import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import type { Comment, Post, Suggestion, User } from "./types";
import { FEED_TRANSLATIONS } from "./feedTranslations";

const DB_PATH = path.join(process.cwd(), "data", "sea_blings.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    db = new Database(DB_PATH);
    db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        language_code TEXT NOT NULL,
        country_code TEXT NOT NULL,
        kind TEXT NOT NULL,
        title TEXT,
        body TEXT,
        media_url TEXT,
        summary TEXT,
        created_at TEXT
      );
      CREATE TABLE IF NOT EXISTS users (
        uid TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        display_name TEXT
      );
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
        avatar TEXT,
        created_at TEXT,
        updated_at TEXT
      );
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER NOT NULL REFERENCES posts(id),
        user_id TEXT,
        body TEXT NOT NULL,
        created_at TEXT
      );
      CREATE TABLE IF NOT EXISTS suggestions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        summary TEXT,
        kind TEXT NOT NULL,
        country_code TEXT,
        tags TEXT,
        status TEXT DEFAULT 'draft',
        created_at TEXT
      );
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        country_code TEXT NOT NULL,
        type TEXT NOT NULL,
        name TEXT NOT NULL,
        location TEXT,
        starts_at TEXT,
        ends_at TEXT,
        description TEXT,
        created_at TEXT
      );
      CREATE TABLE IF NOT EXISTS language_coverage (
        language_code TEXT PRIMARY KEY,
        country_code TEXT NOT NULL,
        weight REAL
      );
    `);
    // Migration: older databases lack the avatar column.
    const profileCols = db.prepare("PRAGMA table_info(profiles)").all() as Array<{ name: string }>;
    if (!profileCols.some((c) => c.name === "avatar")) {
      db.exec("ALTER TABLE profiles ADD COLUMN avatar TEXT");
    }
    // Migration: friend/like connections between users.
    const friendCols = db.prepare("PRAGMA table_info(friends)").all() as Array<{ name: string }>;
    if (!friendCols.some((c) => c.name === "id")) {
      db.exec(`
        CREATE TABLE IF NOT EXISTS friends (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          liker_uid TEXT NOT NULL,
          liked_uid TEXT NOT NULL,
          created_at TEXT,
          UNIQUE(liker_uid, liked_uid)
        );
      `);
    }
    // Migration: authored multilingual headlines live on the post itself.
    const postCols = db.prepare("PRAGMA table_info(posts)").all() as Array<{ name: string }>;
    if (!postCols.some((c) => c.name === "translations")) {
      db.exec("ALTER TABLE posts ADD COLUMN translations TEXT");
    }
    // Seed only posts that have no translations yet; never overwrite edits.
    const rows = db.prepare("SELECT id, translations FROM posts").all() as Array<{ id: number; translations: string | null }>;
    const setTranslations = db.prepare(
      "UPDATE posts SET translations = ? WHERE id = ? AND (translations IS NULL OR translations = '')",
    );
    for (const row of rows) {
      const authored = FEED_TRANSLATIONS[row.id];
      if (row.translations || !authored) continue;
      setTranslations.run(JSON.stringify(authored), row.id);
    }
    // Seed language coverage
    seedDb();
  }
  return db;
}

export function seedDb(): void {
  const d = getDb();
  d.exec(`
    -- initial coverage rows (plan §4: equal per ASEAN country)
    DELETE FROM language_coverage;
    INSERT INTO language_coverage (language_code, country_code, weight) VALUES
      ('id','indonesia',1/11), ('ms','malaysia',1/11), ('en','united_states',1/11),
      ('th','thailand',1/11), ('vi','vietnam',1/11), ('my','myanmar',1/11),
      ('km','cambodia',1/11), ('fil','philippines',1/11), ('lo','laos',1/11),
      ('br','brunei',1/11), ('rki','east-timor',1/11);
  `);
  // Seed 20 initial posts about ASEAN countries (plan §3).
  const initPostsStmt = db.prepare(`
    INSERT INTO posts (id, language_code, country_code, kind, title, body, summary, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(id) DO NOTHING
  `);
  const seededPosts = [
    [1, 'id', 'indonesia', 'text', 'Kebakaran hutan kembali terjadi di Indonesia', 'Laporan tentang konservasi hutan', 'Haze spreading'],
    [2, 'ms', 'malaysia', 'text', 'Pembangkang Malaysia rancang perhimpunan di Kuala Lumpur', 'Artikel tentang koalisi politik', 'Demonstrasi di KL'],
    [3, 'th', 'thailand', 'text', 'กฎเกณฑ์ความปลอดภัยเรือเฟอร์รีใหม่มีผลบังคับใช้', 'เรื่องราวเกี่ยวกับเรือเฟอร์รี', 'กฎปลอดภัย'],
    [4, 'vi', 'vietnam', 'text', 'Quy định an toàn phà mới có hiệu lực', 'Về an toàn phà', 'Quy định an toàn'],
    [5, 'my', 'myanmar', 'text', 'ကုသမားလို့ရလက်လည်သစ်', '关于 NLD', 'Article about NLD'],
    [6, 'km', 'cambodia', 'text', 'ពន្លឺការសិក្សិកម្មន័ករាន់', 'អនុញ្ញាតនេះកំណត់នេះកំណត់នេះ', 'សិក្សិកម្ម'],
    [7, 'br', 'brunei', 'text', 'Kebakaran hutan di Brunei', 'Artikel tentang hutan Brunei', 'Kebakaran hutan'],
    [8, 'rki', 'east-timor', 'text', 'Hari Timor Timur', 'Tentang kemerdekaan Timor Leste', 'Hari kemerdekaan'],
    [9, 'lo', 'laos', 'text', 'ການສະແດງການພາກຕົກລັດ', 'ການສະແດງການພາກຕົກລັດ', 'ການສະແດງ'],
    [10, 'en', 'united_states', 'text', 'ASEAN Forest Report', 'Report on ASEAN forest conservation', 'Forest conservation'],
  ];
  for (const p of seededPosts) {
    initPostsStmt.run(p[0], p[1], p[2], p[3], p[4], p[5], p[6]);
  }
}

export function getPosts(limit = 50): Post[] {
  return getDb().prepare("SELECT * FROM posts ORDER BY created_at DESC LIMIT ?").all(limit) as Post[];
}

export function getComments(postId: number): Comment[] {
  return getDb().prepare("SELECT * FROM comments WHERE post_id = ? ORDER BY id DESC LIMIT 50").all(postId) as Comment[];
}

export function addComment(postId: number, userId: string | null, body: string): Comment {
  const info = getDb().prepare("INSERT INTO comments (post_id, user_id, body) VALUES (?, ?, ?)")
    .run(postId, userId, body.trim());
  const row = getDb().prepare("SELECT * FROM comments WHERE id = ?").get(info.lastInsertRowid);
  return row as Comment;
}

export function addSuggestion(input: Partial<Suggestion>): number {
  const info = getDb().prepare(
    "INSERT INTO suggestions (title, summary, kind, country_code, tags, status) VALUES (?, ?, ?, ?, ?, 'draft')"
  ).run(input.title ?? null, input.summary ?? null, input.kind ?? "topic", input.country_code ?? null, input.tags ?? null);
  return Number(info.lastInsertRowid);
}

export function addUser(user: User): void {
  getDb().prepare("INSERT OR IGNORE INTO users (uid, email, display_name) VALUES (?, ?, ?)").run(user.uid, user.email, user.displayName);
}

export interface Profile {
  uid: string;
  username: string | null;
  name: string | null;
  country: string | null;
  language: string | null;
  gender: string | null;
  education: string | null;
  city: string | null;
  date_of_birth: string | null;
  bio: string | null;
  avatar: string | null;
}

export function getProfile(uid: string): Profile | null {
  const row = getDb().prepare("SELECT * FROM profiles WHERE uid = ?").get(uid);
  return row as Profile | null;
}

export function upsertProfile(uid: string, input: Partial<Profile>): void {
  getDb()
    .prepare(
      `INSERT INTO profiles (uid, username, name, country, language, gender, education, city, date_of_birth, bio, avatar, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
       ON CONFLICT(uid) DO UPDATE SET
         username = COALESCE(excluded.username, username),
         name = COALESCE(excluded.name, name),
         country = COALESCE(excluded.country, country),
         language = COALESCE(excluded.language, language),
         gender = COALESCE(excluded.gender, gender),
         education = COALESCE(excluded.education, education),
         city = COALESCE(excluded.city, city),
         date_of_birth = COALESCE(excluded.date_of_birth, date_of_birth),
         bio = COALESCE(excluded.bio, bio),
         avatar = COALESCE(excluded.avatar, avatar),
         updated_at = datetime('now')`
    )
    .run(
      uid,
      input.username ?? null,
      input.name ?? null,
      input.country ?? null,
      input.language ?? null,
      input.gender ?? null,
      input.education ?? null,
      input.city ?? null,
      input.date_of_birth ?? null,
      input.bio ?? null,
      input.avatar ?? null
    );
}