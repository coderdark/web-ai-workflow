---
id: STORY-008
title: Lesson Viewer Page
status: done
type: AFK
---

## User Story
As a student, I want to read a lesson and mark it complete, so that my progress is recorded and I can move to the next lesson.

## Acceptance Criteria
- [ ] Route `/classes/:id/lessons/:lessonId` renders the `LessonViewer` component
- [ ] Fetches `GET /api/lessons/:lessonId` and renders `content` as markdown via `react-markdown`
- [ ] Displays lesson title as a heading above the content
- [ ] "Mark as Complete" button is visible below the content
  - If lesson is already complete: button is disabled/replaced with "✓ Completed" indicator
- [ ] Clicking "Mark as Complete" calls `completeLesson(classId, lessonId)` in Zustand store
- [ ] After marking complete, if there is a next lesson, a "Next Lesson →" button appears/activates
- [ ] "← Previous Lesson" navigation available if not the first lesson
- [ ] Breadcrumb or back link: "← Back to [Class Title]" navigates to `/classes/:id`
- [ ] Sidebar or top navigation shows all lesson titles with completion indicators

## Definition of Done
- Visiting `/classes/1/lessons/1` renders the lesson markdown correctly
- Clicking "Mark as Complete" persists the completion (visible on refresh)
- "Next Lesson" navigates to lesson 2
- Completing all lessons updates class progress to 100%

## Dependencies
- STORY-001 (routing)
- STORY-003 (`GET /api/lessons/:id`, `GET /api/classes/:id`)
- STORY-004 (Zustand completeLesson)

## AI Notes
- Install: `npm install react-markdown remark-gfm`
- Render: `<ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content}</ReactMarkdown>`
- Apply Tailwind typography prose styles to the markdown container: `className="prose prose-stone max-w-none"`
  - Install: `npm install @tailwindcss/typography`
- Lesson nav (prev/next): derived from the class's full lesson list — fetch class once and store in component state
- `useParams()` gives both `:id` (classId) and `:lessonId`
- "Next lesson" order: sort by `order_idx`, find current index, increment
