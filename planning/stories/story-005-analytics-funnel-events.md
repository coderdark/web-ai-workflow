# Story 005: Funnel and Engagement Analytics
- status: done
- tag: AFK
- dependencies: [story-001-catalog-discovery, story-002-class-detail-enrollment, story-003-lesson-player-progress]

## User story
As the product team, I want funnel and lesson event data, so that I can measure conversion and engagement against targets.

## Acceptance criteria
- SQLite event table stores at minimum: event_name, timestamp, class_id, lesson_id (nullable), session_id/visitor key.
- Events captured: page_view, class_detail_view, enroll_click, enrollment_success, lesson_started, lesson_completed.
- Queryable report for conversion funnel is documented.

## Definition of done
- Event insert path is resilient to missing optional fields.
- At least one verification query produces conversion counts.

## AI implementation notes
- Avoid collecting extra PII beyond enrollment email.
- Use consistent event naming constants.
