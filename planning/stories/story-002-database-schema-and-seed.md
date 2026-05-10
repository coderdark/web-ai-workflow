---
id: STORY-002
title: Database Schema & Seed Script
status: done
type: AFK
---

## User Story
As a developer, I want a SQLite schema and seed script, so that the app has real class content to display without needing an admin UI.

## Acceptance Criteria
- [ ] `classes` table created with: `id`, `title`, `description`, `difficulty`, `is_featured`, `created_at`
- [ ] `lessons` table created with: `id`, `class_id` (FK), `title`, `content` (markdown TEXT), `order_idx`, `created_at`
- [ ] Seed script at `/server/db/seed.js` populates at least 1 class with 3+ real AI-topic lessons
- [ ] Seeded class has `is_featured = 1`
- [ ] `difficulty` values constrained to: `'Beginner'`, `'Intermediate'`, `'Advanced'`
- [ ] `npm run seed` runs the seed script and confirms row counts
- [ ] Re-running seed is idempotent (clears and re-inserts, or checks before inserting)

## Definition of Done
- After `npm run seed`, `SELECT * FROM classes` returns at least 1 row
- After `npm run seed`, `SELECT * FROM lessons WHERE class_id = 1` returns at least 3 rows
- Lesson content fields contain valid markdown (headings, paragraphs, code blocks)

## Dependencies
- STORY-001 (scaffold must exist, DB file must be initialised)

## AI Notes
```sql
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
```
- Suggested seed class topic: "Introduction to AI for Everyone" — 3 lessons: (1) What is AI?, (2) How AI Learns, (3) AI in Everyday Life
- Each lesson content should be 200-400 words of real educational markdown
