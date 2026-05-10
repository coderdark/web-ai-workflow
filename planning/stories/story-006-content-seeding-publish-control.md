# Story 006: Content Seeding and Publish Control
- status: done
- tag: AFK
- dependencies: []

## User story
As the content owner, I want a manual seeding/update workflow, so that classes can be published without an admin UI.

## Acceptance criteria
- Seed script creates classes/modules/lessons in SQLite.
- Published flag controls visibility in catalog and detail access.
- Unpublished classes are not publicly discoverable.

## Definition of done
- Readme/script notes describe update cadence and checklist usage.
- Weekly manual update workflow is repeatable.

## AI implementation notes
- Prefer deterministic seeds with upsert strategy to avoid duplicate rows.
