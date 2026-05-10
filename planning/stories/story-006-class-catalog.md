---
id: STORY-006
title: Class Catalog Page
status: done
type: AFK
---

## User Story
As a student, I want to browse all available classes in one place, so that I can find a class that matches my interests and skill level.

## Acceptance Criteria
- [ ] Route `/classes` renders the `ClassCatalog` component
- [ ] Fetches `GET /api/classes` and renders one card per class
- [ ] Each card shows: title, short description, difficulty badge, lesson count ("X lessons")
- [ ] Clicking a card navigates to `/classes/:id`
- [ ] Cards that have been enrolled (from Zustand store) show a progress indicator (e.g. "In Progress — 2/5 lessons")
- [ ] Loading skeleton shown during fetch
- [ ] Empty state shown if no classes exist
- [ ] Page is responsive — 1 column on mobile, 2-3 columns on desktop (CSS grid)

## Definition of Done
- `/classes` renders all seeded classes as cards
- Each card links correctly to its detail page
- An enrolled class shows its progress inline on the card
- Layout is not broken at 375px or 1280px

## Dependencies
- STORY-001 (routing)
- STORY-003 (`GET /api/classes`)
- STORY-004 (Zustand progress store, for enrolled status)

## AI Notes
- Card component: `<ClassCard class={...} progress={...} />`
- Use CSS Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- Difficulty badge colors: Beginner=`bg-green-100 text-green-800`, Intermediate=`bg-amber-100 text-amber-800`, Advanced=`bg-red-100 text-red-800`
- Progress indicator only shown if `useProgressStore().getClassProgress(class.id)` returns a result
- Skeleton: 3 gray placeholder cards while loading
