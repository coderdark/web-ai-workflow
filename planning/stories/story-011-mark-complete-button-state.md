---
id: STORY-011
title: Mark as Complete Button — Disabled Green State on Click
status: done
type: AFK
---

## User Story
As a student, I want the "Mark as Complete" button to immediately turn green and become disabled when I click it, so that I get instant visual confirmation that the lesson was recorded without the button disappearing or the page reloading.

## Acceptance Criteria
- [ ] Clicking "Mark as Complete" immediately changes the button background to green
- [ ] The button is disabled after clicking (no further clicks possible)
- [ ] The ✓ checkmark is visible with a dark green color
- [ ] The button text changes to "Completed"
- [ ] The transition happens instantly — no page refresh required
- [ ] On revisiting a completed lesson, the button renders in the green disabled state from the start (persisted state from localStorage)
- [ ] The button cursor changes to `not-allowed` when disabled

## Definition of Done
- Clicking the button on an incomplete lesson renders the green disabled state in the same render cycle (Zustand state update triggers re-render)
- Revisiting a completed lesson shows the green disabled button immediately
- No `<div>` swap — a single `<button>` element handles both states via conditional Tailwind classes

## Dependencies
- STORY-001 (scaffold)
- STORY-004 (Zustand completeLesson)
- STORY-008 (LessonViewer — this story modifies it)

## AI Notes

File to change: `client/src/pages/LessonViewer.tsx`

Replace the current conditional block (lines 116–128) that swaps between a `<div>` and a `<button>`, with a single `<button>` that uses conditional classes based on `isCompleted`:

```tsx
<button
  onClick={handleMarkComplete}
  disabled={isCompleted}
  className={`inline-flex items-center gap-2 font-medium px-6 py-2.5 rounded-lg transition-colors
    ${isCompleted
      ? 'bg-green-500 text-white cursor-not-allowed'
      : 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
    }`}
>
  {isCompleted && <span className="text-green-900">✓</span>}
  {isCompleted ? 'Completed' : 'Mark as Complete'}
</button>
```

- `isCompleted` is already derived from Zustand on line 64 — no new state needed
- Zustand's `completeLesson` triggers a synchronous store update which causes an immediate re-render, so the green state appears on the same click with no delay
- The `disabled` HTML attribute prevents double-clicks and removes the button from tab focus when complete
- Test file to update: `client/src/__tests__/LessonViewer.test.tsx` (add tests for disabled state and green class after click)
