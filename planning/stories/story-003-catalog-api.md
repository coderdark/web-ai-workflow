---
id: STORY-003
title: Class Catalog REST API
status: done
type: AFK
---

## User Story
As the frontend, I want REST API endpoints for classes and lessons, so that React components can fetch catalog data without touching SQLite directly.

## Acceptance Criteria
- [ ] `GET /api/classes` returns all classes with `lesson_count` derived from JOIN
- [ ] `GET /api/classes?featured=1` returns only the featured class (at most 1)
- [ ] `GET /api/classes/:id` returns a single class with its full `lessons` array (ordered by `order_idx`)
- [ ] `GET /api/lessons/:id` returns a single lesson's full content
- [ ] All endpoints return JSON with consistent shape (see AI Notes)
- [ ] 404 returned with `{ error: "Not found" }` when resource doesn't exist
- [ ] CORS headers set so Vite dev server can call the API

## Definition of Done
- `curl http://localhost:3001/api/classes` returns a JSON array
- `curl http://localhost:3001/api/classes/1` includes a `lessons` array
- `curl http://localhost:3001/api/classes?featured=1` returns the featured class
- `curl http://localhost:3001/api/lessons/1` returns lesson with `content` field

## Dependencies
- STORY-001 (Express server)
- STORY-002 (seeded data)

## AI Notes
Response shapes:

```json
// GET /api/classes
[{ "id": 1, "title": "...", "description": "...", "difficulty": "Beginner", "is_featured": 1, "lesson_count": 3 }]

// GET /api/classes/:id
{ "id": 1, "title": "...", "description": "...", "difficulty": "Beginner", "is_featured": 1,
  "lessons": [{ "id": 1, "title": "...", "order_idx": 1 }] }

// GET /api/lessons/:id
{ "id": 1, "class_id": 1, "title": "...", "content": "## Markdown...", "order_idx": 1 }
```

- Use `better-sqlite3` prepared statements
- Add `cors` middleware: `app.use(cors({ origin: 'http://localhost:5173' }))`
- Lesson list in class detail should NOT include `content` (too heavy) — only `id`, `title`, `order_idx`
