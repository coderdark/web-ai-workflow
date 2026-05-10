import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function createSchema(db) {
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS classes (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title       TEXT NOT NULL,
      description TEXT NOT NULL,
      difficulty  TEXT NOT NULL CHECK(difficulty IN ('Beginner','Intermediate','Advanced')),
      is_featured INTEGER DEFAULT 0,
      created_at  TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS lessons (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      class_id   INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
      title      TEXT NOT NULL,
      content    TEXT NOT NULL,
      order_idx  INTEGER NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

export function seedTestData(db) {
  db.prepare(`INSERT INTO classes (title, description, difficulty, is_featured)
    VALUES (?, ?, ?, ?)`).run(
    'Test AI Class',
    'A test class about AI.',
    'Beginner',
    1
  );
  const classId = db.prepare('SELECT last_insert_rowid() as id').get().id;

  const insertLesson = db.prepare(
    `INSERT INTO lessons (class_id, title, content, order_idx) VALUES (?, ?, ?, ?)`
  );
  insertLesson.run(classId, 'Lesson One', '## Lesson One\n\nContent here.', 1);
  insertLesson.run(classId, 'Lesson Two', '## Lesson Two\n\nMore content.', 2);
  insertLesson.run(classId, 'Lesson Three', '## Lesson Three\n\nFinal content.', 3);
}

let _db;

export function getDb() {
  if (!_db) {
    const dbPath = process.env.DB_PATH || join(__dirname, 'apextuts.db');
    _db = new Database(dbPath);
    createSchema(_db);
  }
  return _db;
}

export function initDb() {
  return getDb();
}
