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
  const insertClass = db.prepare(
    `INSERT INTO classes (title, description, difficulty, is_featured) VALUES (?, ?, ?, ?)`
  );
  const insertLesson = db.prepare(
    `INSERT INTO lessons (class_id, title, content, order_idx) VALUES (?, ?, ?, ?)`
  );

  insertClass.run('Test AI Class', 'A test class about AI.', 'Beginner', 1);
  const aiClassId = db.prepare('SELECT last_insert_rowid() as id').get().id;
  insertLesson.run(aiClassId, 'Lesson One', '## Lesson One\n\nContent here.', 1);
  insertLesson.run(aiClassId, 'Lesson Two', '## Lesson Two\n\nMore content.', 2);
  insertLesson.run(aiClassId, 'Lesson Three', '## Lesson Three\n\nFinal content.', 3);

  insertClass.run('What is a Skill?', 'Learn what AI skills are.', 'Beginner', 0);
  const skillClassId = db.prepare('SELECT last_insert_rowid() as id').get().id;
  insertLesson.run(skillClassId, 'Skills: Giving AI a Toolbox', '## Skills\n\nContent.', 1);
  insertLesson.run(skillClassId, 'How Skills Work Under the Hood', '## How Skills Work\n\nContent.', 2);
  insertLesson.run(skillClassId, 'Using Skills Effectively', '## Using Skills\n\nContent.', 3);

  insertClass.run('What is an Agent?', 'Learn what AI agents are.', 'Intermediate', 0);
  const agentClassId = db.prepare('SELECT last_insert_rowid() as id').get().id;
  insertLesson.run(agentClassId, 'From Chatbot to Agent: What Changed', '## Chatbot to Agent\n\nContent.', 1);
  insertLesson.run(agentClassId, 'How an Agent Thinks and Acts', '## How Agents Think\n\nContent.', 2);
  insertLesson.run(agentClassId, 'Agents in the Real World', '## Real World Agents\n\nContent.', 3);
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
