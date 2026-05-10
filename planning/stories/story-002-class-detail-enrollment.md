# Story 002: Class Detail and Enrollment
- status: done
- tag: AFK
- dependencies: [story-001-catalog-discovery]

## User story
As a visitor, I want a clear class detail page and a lightweight enrollment form, so that I can register with minimal friction.

## Acceptance criteria
- Class detail includes required metadata: title, description, instructor, duration, difficulty, tags, thumbnail.
- Enrollment form collects first name + email only.
- Successful enrollment confirmation is shown.
- Preview classes show waitlist CTA and block real enrollment.

## Definition of done
- Validation errors are clear and non-blocking.
- Enrollment action persists to SQLite.
- Analytics events emitted for enroll click and enroll success.

## AI implementation notes
- Keep form state local; submit via API endpoint/action.
