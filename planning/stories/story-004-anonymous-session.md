---
id: STORY-004
title: Anonymous Session & Progress Store (Zustand + localStorage)
status: done
type: AFK
---

## User Story
As a student, I want my progress to be remembered across page visits, so that I can return to where I left off without creating an account.

## Acceptance Criteria
- [ ] On first visit, a UUID v4 is generated and stored in `localStorage` under key `apextuts_session_id`
- [ ] Subsequent visits reuse the existing UUID (never regenerated)
- [ ] Zustand `useProgressStore` exposes:
  - `enroll(classId)` — sets class status to `in_progress` with `enrolled_at` timestamp
  - `completeLesson(classId, lessonId)` — adds lessonId to `completed_lessons` array
  - `getClassProgress(classId)` — returns `{ status, enrolled_at, completed_lessons, completionPct }`
  - `getAllProgress()` — returns all enrolled classes (for `/progress` page)
- [ ] Store is persisted to `localStorage` under key `apextuts_progress` using Zustand `persist` middleware
- [ ] `completionPct` is calculated as `(completed_lessons.length / total_lessons) * 100`

## Definition of Done
- Calling `enroll(1)` then refreshing the page still shows class 1 as enrolled
- Calling `completeLesson(1, 2)` is reflected in `getClassProgress(1).completed_lessons`
- `localStorage` contains both `apextuts_session_id` and `apextuts_progress` keys after interaction

## Dependencies
- STORY-001 (Zustand installed)

## AI Notes
```ts
// localStorage schema
interface ProgressStore {
  sessionId: string
  progress: Record<string, {
    status: 'in_progress' | 'completed'
    enrolledAt: string
    completedLessons: number[]
  }>
  enroll: (classId: number) => void
  completeLesson: (classId: number, lessonId: number) => void
  getClassProgress: (classId: number, totalLessons: number) => { ... }
  getAllProgress: () => Record<string, ...>
}
```
- Use `zustand/middleware` `persist` with `localStorage` storage
- Generate UUID with `crypto.randomUUID()` (available in all modern browsers)
- Class is auto-marked `completed` when `completedLessons.length === totalLessons`
