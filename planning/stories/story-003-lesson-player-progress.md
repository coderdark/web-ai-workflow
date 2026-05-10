# Story 003: Lesson Player and Progress
- status: done
- tag: AFK
- dependencies: [story-002-class-detail-enrollment]

## User story
As an enrolled student, I want to open lessons and mark them complete, so that I can track learning progress.

## Acceptance criteria
- Structure supports class -> modules -> lessons.
- Free navigation across lessons is allowed.
- "Mark as complete" updates lesson completion state.
- Progress persists after browser refresh on same device/browser via localStorage.

## Definition of done
- Completion state is reflected in lesson list and progress summary.
- Reload persistence verified manually.
- Analytics events emitted for lesson started/completed.

## AI implementation notes
- Use stable localStorage keys scoped by class ID and lesson ID.
- Keep logic deterministic and idempotent for repeated clicks.
