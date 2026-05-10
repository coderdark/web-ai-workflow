---
id: STORY-012
title: Professional Dark Theme — Slate + Indigo Palette
status: done
type: AFK
---

## User Story
As a visitor or student, I want the ApexTuts website to have a dark, professional look with indigo accents, so that the platform feels polished and trustworthy for a professional learning environment.

## Acceptance Criteria
- [ ] Page background is slate-800 (#1e293b) across all routes
- [ ] Navbar and Footer use slate-900 as their background
- [ ] Cards (ClassCard, ClassDetail lesson list, ProgressDashboard cards) use slate-700
- [ ] All primary buttons (Start Class, Mark as Complete, Browse Classes) use indigo-600 with indigo-500 on hover
- [ ] All links, active nav items, and brand name use indigo-400
- [ ] Primary text (headings) is slate-100; body text is slate-200; muted text is slate-400
- [ ] Borders are slate-600 throughout
- [ ] Difficulty badges are updated for dark backgrounds:
      Beginner → bg-emerald-900 text-emerald-300
      Intermediate → bg-indigo-900 text-indigo-300
      Advanced → bg-red-900 text-red-300
- [ ] Progress bar track is slate-600; fill is indigo-500
- [ ] Homepage hero gradient is from-indigo-900 to-slate-800
- [ ] Loading skeletons use slate-700 animate-pulse
- [ ] Lesson markdown prose uses prose-invert for correct dark-mode rendering
- [ ] Active sidebar lesson in LessonViewer uses bg-indigo-900/50 text-indigo-300
- [ ] tailwind.config.js brand token updated to indigo-based scale
- [ ] index.css body background updated to slate-800 text-slate-200

## Definition of Done
- All 5 routes render with the dark slate/indigo palette — no amber or stone colors visible
- Cards are distinguishable from the page background
- Text is readable at all levels of hierarchy
- All existing 38 tests still pass (no logic changed — pure visual update)

## Dependencies
- STORY-001 (Tailwind config, index.css)
- STORY-010 (Navbar, Footer, Layout)
- STORY-005 through STORY-009 (all pages)

## AI Notes

### 1. tailwind.config.js — update brand token to indigo

Replace the current `brand` color scale with an indigo-based one:

```js
brand: {
  50:  '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  300: '#a5b4fc',
  400: '#818cf8',
  500: '#6366f1',
  600: '#4f46e5',  // ← primary action color
  700: '#4338ca',
  800: '#3730a3',
  900: '#312e81',
},
```

### 2. index.css

```css
body {
  @apply bg-slate-800 text-slate-200;
}
```

### 3. Complete color token mapping (old → new)

| Context | Old | New |
|---|---|---|
| Page background | bg-stone-50 | bg-slate-800 |
| Navbar / Footer bg | bg-stone-100 | bg-slate-900 |
| Navbar / Footer border | border-stone-200 | border-slate-700 |
| Card background | bg-white | bg-slate-700 |
| Card border | border-stone-200 | border-slate-600 |
| Card hover border | hover:border-amber-300 | hover:border-indigo-500 |
| Loading skeleton | bg-stone-100, bg-stone-200 | bg-slate-700 |
| Heading text | text-stone-900 | text-slate-100 |
| Body text | text-stone-800 | text-slate-200 |
| Muted text | text-stone-600 | text-slate-400 |
| Subtle text | text-stone-500 | text-slate-400 |
| Very subtle text | text-stone-400 | text-slate-500 |
| Brand / logo | text-amber-700 | text-indigo-400 |
| Primary button | bg-amber-600 hover:bg-amber-700 | bg-indigo-600 hover:bg-indigo-500 |
| Link / accent text | text-amber-700 | text-indigo-400 |
| Hover link | hover:text-amber-700 | hover:text-indigo-400 |
| Active nav border | border-amber-600 | border-indigo-500 |
| Active nav text | text-amber-700 | text-indigo-400 |
| Hero gradient | from-amber-50 to-stone-100 | from-indigo-900 to-slate-800 |
| Featured class label | text-amber-700 | text-indigo-400 |
| Progress bar track | bg-stone-200 | bg-slate-600 |
| Progress bar fill | bg-amber-500 | bg-indigo-500 |
| Lesson active sidebar | bg-amber-100 text-amber-800 | bg-indigo-900/50 text-indigo-300 |
| Lesson number pill | bg-stone-200 text-stone-500 | bg-slate-600 text-slate-400 |
| Lesson inactive link | hover:bg-stone-100 text-stone-600 | hover:bg-slate-700 text-slate-400 |
| Prose (markdown) | prose-stone | prose-invert |
| Completed lesson badge | bg-green-100 text-green-700 | bg-emerald-900 text-emerald-300 |
| ClassDetail lesson border | border-stone-200 bg-white | border-slate-600 bg-slate-700 |
| ClassDetail lesson hover | hover:border-amber-300 | hover:border-indigo-500 |
| ProgressDashboard card | bg-white border-stone-200 | bg-slate-700 border-slate-600 |
| Mark Complete (active) | bg-indigo-600 (already set from S-011) | no change |

### 4. DifficultyBadge.tsx — dark-safe badge colors

```tsx
const styles: Record<Props['difficulty'], string> = {
  Beginner:     'bg-emerald-900 text-emerald-300',
  Intermediate: 'bg-indigo-900 text-indigo-300',
  Advanced:     'bg-red-900 text-red-300',
};
```

### 5. File checklist — every file that needs changes

- client/tailwind.config.js
- client/src/index.css
- client/src/components/Layout.tsx
- client/src/components/Navbar.tsx
- client/src/components/Footer.tsx
- client/src/components/ClassCard.tsx
- client/src/components/DifficultyBadge.tsx
- client/src/components/ProgressBar.tsx
- client/src/pages/HomePage.tsx
- client/src/pages/ClassCatalog.tsx
- client/src/pages/ClassDetail.tsx
- client/src/pages/LessonViewer.tsx
- client/src/pages/ProgressDashboard.tsx
- client/src/pages/NotFound.tsx

### 6. Tests

No logic changes — all 38 existing tests must continue to pass.
The DifficultyBadge tests assert text content only (not class names), so they pass unchanged.
The LessonViewer tests assert button disabled state and bg-green class, which are unaffected.
Run `npm test` after all file changes to confirm.
