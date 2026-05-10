---
id: STORY-009
title: My Progress Dashboard
status: done
type: AFK
---

## User Story
As a student, I want a dedicated page showing all my enrolled classes and completion percentages, so that I can see my learning progress at a glance.

## Acceptance Criteria
- [ ] Route `/progress` renders the `ProgressDashboard` component
- [ ] Reads all enrolled classes from Zustand `getAllProgress()`
- [ ] For each enrolled class, fetches class metadata from `GET /api/classes/:id` to display title + difficulty
- [ ] Shows a progress bar per class (e.g. "3 of 5 lessons complete — 60%")
- [ ] Completed classes are visually distinguished (e.g. "✓ Completed" badge)
- [ ] "Continue" button on in-progress classes navigates to the first incomplete lesson
- [ ] Empty state shown if no classes have been enrolled yet, with a CTA to `/classes`
- [ ] Page is responsive

## Definition of Done
- After enrolling in a class and completing 1 lesson, `/progress` shows that class with 1 lesson progress
- Progress bar reflects the correct completion percentage
- Empty state renders correctly for a fresh session

## Dependencies
- STORY-001 (routing)
- STORY-003 (`GET /api/classes/:id`)
- STORY-004 (Zustand getAllProgress)
- STORY-007 (enroll flow must exist)
- STORY-008 (completeLesson must exist)

## AI Notes
- Progress bar: use a simple `<div>` with `width: ${pct}%` in `bg-amber-500` on a `bg-stone-200` track
- Fetch class metadata in parallel for all enrolled class IDs: `Promise.all(ids.map(id => fetch(...)))`
- "Continue" link logic: same as ClassDetail — first lesson where `lessonId` not in `completedLessons`
- If `completedLessons.length === totalLessons`, mark as completed (green badge)
- Empty state: "You haven't started any classes yet. [Browse Classes →]"
