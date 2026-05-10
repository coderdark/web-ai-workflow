---
id: STORY-007
title: Class Detail Page — Info & Register
status: done
type: AFK
---

## User Story
As a student, I want to see full details about a class before starting it, so that I can confirm it's right for me and begin with one click.

## Acceptance Criteria
- [ ] Route `/classes/:id` renders the `ClassDetail` component
- [ ] Fetches `GET /api/classes/:id` — displays title, description, difficulty badge, ordered lesson list (titles only)
- [ ] If student has NOT enrolled: shows "Start Class" button (amber, prominent)
- [ ] Clicking "Start Class" calls `enroll(classId)` in Zustand store, then navigates to the first lesson (`/classes/:id/lessons/:firstLessonId`)
- [ ] If student HAS enrolled: button changes to "Continue Learning" and navigates to the first incomplete lesson
- [ ] Lesson list shows a checkmark next to completed lessons (from Zustand store)
- [ ] Lesson list items are clickable — navigate directly to that lesson
- [ ] 404 page shown if class ID doesn't exist

## Definition of Done
- Visiting `/classes/1` shows class info + lesson list
- "Start Class" enrolls the student and navigates to lesson 1
- Returning after completing a lesson shows that lesson checked off in the list
- "Continue Learning" navigates to the first uncompleted lesson, not lesson 1

## Dependencies
- STORY-001 (routing)
- STORY-003 (`GET /api/classes/:id`)
- STORY-004 (Zustand enroll + progress)

## AI Notes
- First incomplete lesson logic: `lessons.find(l => !completedLessons.includes(l.id))` — fallback to last lesson if all done
- Lesson list: ordered `<ol>` with `order_idx`, each item is a `<Link>` to the lesson route
- Completed lessons: prepend a `✓` icon (green) or use a Tailwind `line-through` style subtly
- Use `useParams()` from react-router-dom to get `:id`
