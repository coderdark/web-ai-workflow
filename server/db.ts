import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

const dataDir = path.resolve(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
const db = new Database(path.join(dataDir, 'apextuts.db'))

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      short_description TEXT NOT NULL,
      instructor TEXT NOT NULL,
      duration TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      topic_tags TEXT NOT NULL,
      thumbnail TEXT NOT NULL,
      published INTEGER NOT NULL DEFAULT 0,
      is_preview INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS modules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      sort_order INTEGER NOT NULL,
      FOREIGN KEY(class_id) REFERENCES classes(id)
    );
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      module_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      video_url TEXT,
      download_url TEXT,
      sort_order INTEGER NOT NULL,
      FOREIGN KEY(module_id) REFERENCES modules(id)
    );
    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_id INTEGER NOT NULL,
      first_name TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_name TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      class_id INTEGER,
      lesson_id INTEGER,
      session_key TEXT NOT NULL
    );
  `)
}

export { db }
