---
id: STORY-010
title: Global Navigation & Layout Shell
status: done
type: AFK
---

## User Story
As a student, I want consistent navigation across all pages, so that I can move between the catalog, a class, and my progress without getting lost.

## Acceptance Criteria
- [ ] A persistent `<Navbar>` renders on all pages
- [ ] Navbar links: "ApexTuts" logo/wordmark (→ `/`), "Classes" (→ `/classes`), "My Progress" (→ `/progress`)
- [ ] Active route is visually highlighted in the navbar
- [ ] Navbar is responsive — collapses to a hamburger menu on mobile
- [ ] A `<Footer>` renders on all pages with copyright and company name
- [ ] Page layout has a consistent max-width container with horizontal padding
- [ ] Warm earthy palette applied globally

## Definition of Done
- All 5 routes show the same navbar and footer
- Active link is distinguishable from inactive links
- Hamburger menu opens/closes on mobile (375px)
- No layout shift between page navigations

## Dependencies
- STORY-001 (routing, Tailwind)

## AI Notes
- Layout component wraps `<Outlet />` from react-router-dom
- `useLocation()` hook to determine active route for nav highlighting
- Active style: `text-amber-700 font-semibold border-b-2 border-amber-600`
- Max-width container: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- Hamburger state: local `useState` in Navbar (no Zustand needed)
- Footer: minimal — "© 2026 ApexTuts. All rights reserved."
