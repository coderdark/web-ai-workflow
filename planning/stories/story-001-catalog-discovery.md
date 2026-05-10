# Story 001: Catalog Discovery
- status: done
- tag: AFK
- dependencies: []

## User story
As a prospective student, I want to browse and filter classes, so that I can quickly find a relevant AI class.

## Acceptance criteria
- Catalog route renders published classes only.
- Search by title/description works.
- Filter by topic and difficulty works and can be combined.
- Preview classes are visibly labeled "Preview Class".

## Definition of done
- Implemented with React Router route and responsive UI.
- Backed by SQLite query including published flag.
- Manual test cases for search/filter combinations pass.

## AI implementation notes
- Build reusable filter state in component/local state.
- Keep Zustand out unless shared cross-route state is needed.
