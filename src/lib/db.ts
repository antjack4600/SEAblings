import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import type { Comment, Post, Suggestion, User } from "./types";

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
        created_at TEXT DEFAULT (datetime('now'))
      );
      CREATE TABLE IF NOT EXISTS users (
        uid TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        display_name TEXT
      );
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER NOT NULL REFERENCES posts(id),
        user_id TEXT,
        body TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      );
      CREATE TABLE IF NOT EXISTS suggestions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        summary TEXT,
        kind TEXT NOT NULL,
        country_code TEXT,
        tags TEXT,
        status TEXT DEFAULT 'draft',
        created_at TEXT DEFAULT (datetime('now'))
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
        created_at TEXT DEFAULT (datetime('now'))
      );
      CREATE TABLE IF NOT EXISTS language_coverage (
        language_code TEXT PRIMARY KEY,
        country_code TEXT NOT NULL,
        weight REAL
      );
    `);
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
