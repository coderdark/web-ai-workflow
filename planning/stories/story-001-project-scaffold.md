---
id: STORY-001
title: Project Scaffold & Toolchain Setup
status: done
type: AFK
---

## User Story
As a developer, I want a fully configured project scaffold, so that the team can start building features immediately without environment friction.

## Acceptance Criteria
- [ ] Vite + React + TypeScript project initialised at repo root (`/client`)
- [ ] TailwindCSS configured with a custom warm earthy palette (`stone`, `amber`, `warm-brown` tokens)
- [ ] React Router v6 installed and a root `<App>` with placeholder routes for all 5 pages
- [ ] Zustand installed and an empty `useProgressStore` stub exists
- [ ] Express server scaffolded at `/server` with `better-sqlite3` installed
- [ ] Vite dev proxy forwards `/api/*` → `http://localhost:3001`
- [ ] `npm run dev` starts both Vite and Express concurrently (via `concurrently`)
- [ ] SQLite DB file created at `/server/db/apextuts.db` on first server start

## Definition of Done
- `npm run dev` starts cleanly with no errors
- Navigating to `http://localhost:5173` renders a placeholder page
- `GET /api/health` returns `{ status: "ok" }`
- TailwindCSS earthy palette tokens are visible in `tailwind.config.js`

## Dependencies
None

## AI Notes
- Use `create-vite` with `react-ts` template
- Tailwind palette suggestion: `stone-50` background, `amber-600` primary accent, `stone-700` text
- Express entry point: `/server/index.js` — use `better-sqlite3` (sync API, no promises needed)
- Concurrently script: `"dev": "concurrently \"npm run dev:client\" \"npm run dev:server\""`
- DB init: create tables on server startup if they don't exist (see data model in grill-me-2026-05-09.md)
