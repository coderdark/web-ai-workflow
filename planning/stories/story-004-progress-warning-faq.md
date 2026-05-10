# Story 004: Progress Limitation Warning and FAQ
- status: done
- tag: AFK
- dependencies: [story-003-lesson-player-progress]

## User story
As a student, I want transparent messaging about progress limitations, so that I understand data persistence boundaries.

## Acceptance criteria
- Before first lesson start, show warning text:
  "Progress is saved only on this browser and device in v1. Clearing browser data or switching devices will reset progress."
- Same limitation is documented in FAQ/help area.
- Message tone is clear and non-technical.

## Definition of done
- Warning shown once per user/session state policy.
- FAQ entry is reachable from lesson/player context.

## AI implementation notes
- Add a dismiss flag in localStorage to avoid repetitive blocking UX.
