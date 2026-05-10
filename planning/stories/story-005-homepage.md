---
id: STORY-005
title: Homepage — Hero + Featured Class
status: done
type: AFK
---

## User Story
As a first-time visitor, I want to see a featured class front-and-center on the homepage, so that I immediately understand what ApexTuts offers and can start learning.

## Acceptance Criteria
- [ ] Route `/` renders the `HomePage` component
- [ ] Hero section displays: ApexTuts name/tagline, featured class title + description + difficulty badge
- [ ] A prominent CTA button ("Start Learning" or "Begin Class") navigates to `/classes/:id` for the featured class
- [ ] Below the hero, a short "Browse All Classes" section shows up to 3 class cards linking to `/classes`
- [ ] Page is responsive (mobile + desktop)
- [ ] Warm earthy palette applied (stone/amber tones)
- [ ] Loading state shown while API call is in flight
- [ ] If no featured class exists in DB, hero renders a graceful fallback message

## Definition of Done
- Visiting `/` shows the featured class hero with working CTA
- CTA navigates to the correct class detail page
- Page renders correctly at 375px (mobile) and 1280px (desktop) widths

## Dependencies
- STORY-001 (routing)
- STORY-003 (`GET /api/classes?featured=1`)

## AI Notes
- Fetch `GET /api/classes?featured=1` on mount; store result in local component state (not Zustand — this is server data)
- Hero layout: full-width section, large heading, subtext, amber CTA button
- Tagline suggestion: "AI Education for Everyone — No Tech Background Required"
- Difficulty badge: pill-shaped, color-coded (Beginner=green, Intermediate=amber, Advanced=red)
- Use `react-router-dom` `<Link>` for navigation (no `window.location`)
