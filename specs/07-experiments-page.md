# Experiments / Play Page (`/more`)

## Overview
A full-width masonry grid page showcasing mixed media (images, videos) with category filtering. Items can either link out to external URLs (new tab) or open in a detail view (lightbox on desktop, bottom sheet on mobile).

**Reference:** See uploaded screenshot — grid-forward layout with left sidebar filters and varied-height tiles.

---

## Route & Navigation

| Route | File | Purpose | Layout |
|-------|------|---------|--------|
| `/more` | `src/pages/more.astro` | Experiments / play grid | MoreLayout |

### Homepage Integration
Add a new entry to the homepage `<ProjectList>`:
```astro
<ProjectList projects={[
  { title: "a chinese app for heritage learners", href: "/a-chinese-app..." },
  { title: "some conversations don't wait", href: "/some-conversations..." },
  { title: "log / writing", href: "/log" },
  { title: "experiments / play", href: "/more" }   // ← NEW
]} />
```

### Navigation Behavior
- Homepage → "experiments / play" → `/more`
- `/more` → Back arrow → Homepage (`/`)
- `/more` → SiteHeader "charmayne" → Homepage (`/`)

---

## Layout

### `MoreLayout.astro`
Extends `BaseLayout`. Unlike other pages, this layout breaks out of the 500px content container to use the full viewport width.

```
BaseLayout.astro
└── MoreLayout.astro (full-width, includes SiteHeader + BackArrow)
```

### Page Structure (Desktop)
```
┌─────────────────────────────────────────────────────────┐
│  ← (back arrow)                            charmayne   │
├────────────┬────────────────────────────────────────────┤
│  more      │                                            │
│            │   ┌──────┐  ┌──────────┐  ┌─────┐         │
│  ALL  ●    │   │      │  │          │  │     │  ┌────┐ │
│  GRAPHICS  │   │      │  │          │  │     │  │    │ │
│  MOTION    │   │      │  │          │  └─────┘  │    │ │
│  DESIGN    │   │      │  └──────────┘  ┌──────┐ │    │ │
│  CODE      │   └──────┘  ┌─────┐      │      │ └────┘ │
│            │   ┌────────┐│     │      │      │         │
│            │   │        ││     │      └──────┘         │
│            │   └────────┘└─────┘                       │
├────────────┴────────────────────────────────────────────┤
│  (no footer on this page)                               │
└─────────────────────────────────────────────────────────┘
```

### Page Structure (Mobile)
```
┌─────────────────────────┐
│  ← (back arrow)         │
│                charmayne│
├─────────────────────────┤
├─────────────────────────┤
│  ┌───────────────────┐ │
│  │                   │ │  ← single-column masonry
│  │                   │ │
│  └───────────────────┘ │
│  ┌───────────────────┐ │
│  │                   │ │
│  │                   │ │
│  └───────────────────┘ │
└─────────────────────────┘
```

---

## Spacing & Layout Tokens

```css
:root {
  /* More Page — Grid */
  --more-sidebar-width: 200px;
  --more-grid-gap: 12px;
  --more-grid-columns: 3;             /* desktop */
  --more-grid-columns-tablet: 3;
  --more-grid-columns-mobile: 1;

  /* More Page — Page Padding */
  --more-padding-horizontal: 44px;
  --more-padding-vertical: 44px;
  --more-padding-mobile-horizontal: 20px;
  --more-padding-mobile-top: 40px;

  /* More Page — Tiles */
  --more-tile-radius: 12px;           /* rounded corners on grid items */

  /* More Page — Filter */
  --more-filter-gap: 12px;            /* gap between filter items */
}
```

### Responsive Breakpoints
| Breakpoint | Columns | Sidebar | Filter Layout |
|------------|---------|---------|---------------|
| ≥1024px | 3 | Left sidebar (fixed) | Vertical list |
| 768–1023px | 3 | Left sidebar (fixed) | Vertical list |
| <768px | 1 | None (removed) | No filtering UI |

---

## Filter Sidebar

### Behavior
- "ALL" is the default active filter — shows every item
- Clicking a category filters the grid to items that include that category (items can belong to multiple categories)
- Active filter is visually distinguished: `--color-text-primary` (#333333) with underline
- Inactive filters use `--color-text-tertiary` (#8D8D8D)
- Filtering is client-side (no page reload) with **staggered fade animation**: non-matching items fade out simultaneously (~150ms), then matching items fade in with a 30ms staggered delay per item (~200ms) with a subtle scale from 0.95→1

### Typography
- Filter heading ("more"): Inter Medium, 18px, lowercase, `--color-text-primary`
- Filter items: Geist Mono Medium, 14px, `--color-text-tertiary` (#8D8D8D)
- Active item: `--color-text-primary` (#333333) with underline

### Mobile Filter Bar
On mobile (<768px), the filter sidebar is **removed entirely** — no filtering UI is shown. All items display in a single-column grid.

### Categories
Defined in the JSON data file. The filter UI auto-generates from unique categories across all items. Suggested initial categories:
- `all` (always present, shows everything)
- `graphics`
- `motion`
- `illustration`
- `experiments`

You can change/add categories freely by editing the JSON.

---

## Masonry Grid

### Implementation
Use CSS `columns` for a pure-CSS masonry approach (no JS library needed):
```css
.masonry-grid {
  columns: var(--more-grid-columns);
  column-gap: var(--more-grid-gap);
}

.masonry-grid-item {
  break-inside: avoid;
  margin-bottom: var(--more-grid-gap);
  border-radius: var(--more-tile-radius);
  overflow: hidden;                    /* clips media to rounded corners */
}
```

**Why CSS columns over JS masonry:**
- Zero JS overhead, works with static rendering
- Good browser support in modern evergreen browsers
- Items flow top-to-bottom, left-to-right (matches reference)

**Alternative (if ordering matters):** If you need strict left-to-right, top-to-bottom ordering (like the reference), use a lightweight JS masonry library or CSS Grid with `grid-template-rows: masonry` (currently Firefox-only, so CSS columns is the safer bet).

### Grid Items
Each item in the grid is a tile that can be:
1. **Image** — `<img>` with natural aspect ratio preserved
2. **Video** — `<video>` with poster frame, autoplay muted loop (or click-to-play)

All tiles have **rounded corners** (`border-radius: 12px`) with `overflow: hidden` to clip media to the shape. Each tile has an optional external-link icon (top-right arrow, like the reference) if the item links externally.

### Hover State
- Desktop: slight scale-up or opacity shift (0.9 opacity on hover)
- External link icon appears/becomes more visible on hover
- Cursor: `pointer` for all interactive items

---

## Item Interaction

### External Link Items
- Clicking opens `externalUrl` in a new tab (`target="_blank" rel="noopener noreferrer"`)
- External link icon (↗) visible in the top-right corner of the tile
- Icon: small arrow SVG, semi-transparent background pill (like reference)

### Detail View Items (no external URL)
- **Desktop:** Opens a centered **lightbox/modal**
- **Mobile (<768px):** Opens a **bottom sheet** that slides up

### Lightbox (Desktop)
```
┌─────────────────────────────────────────────┐
│                                         ✕   │
│                                             │
│         ┌───────────────────────┐           │
│         │                       │           │
│         │   image or video      │           │
│         │                       │           │
│         └───────────────────────┘           │
│         Optional Title                      │
│         Optional body text in Spectral      │
│                                             │
└─────────────────────────────────────────────┘
  ↑ backdrop overlay (black, ~50% opacity)
```

- **Backdrop:** `rgba(0, 0, 0, 0.5)`, click to close
- **Close button:** ✕ icon top-right corner of modal
- **Inner padding:** 32px
- **Media:** Fills 100% of the modal content width (minus padding), `max-height: 70vh`, `object-fit: contain`
- **Title (optional):** Inter Medium, 18px, `--color-text-primary` (on white/light modal bg)
- **Body (optional):** Spectral Regular, 16px, `--color-text-body`
- **Animation:** Fade in (opacity 0→1, ~200ms ease)
- **Keyboard:** `Esc` to close, focus-trap within modal

### Bottom Sheet (Mobile)
```
┌─────────────────────────┐
│                         │  ← backdrop (tap to close)
│                         │
├─────────────────────────┤
│  ─── (drag handle)      │  ← sheet
│                         │
│  ┌───────────────────┐  │
│  │ image or video    │  │
│  └───────────────────┘  │
│  Optional Title         │
│  Optional body text     │
│                         │
└─────────────────────────┘
```

- **Drag handle:** Small horizontal bar at top center (cosmetic, not draggable for MVP)
- **Close → media spacing:** 16px between the close icon row and the media asset
- **Backdrop:** Same as lightbox
- **Animation:** Slide up from bottom (~300ms ease-out)
- **Max height:** 85vh, scrollable if content overflows
- **Close:** Tap backdrop, or swipe down (stretch goal)

### Cursor-following Hover Tooltip (Desktop)

A single shared tooltip element follows the cursor when hovering over grid items that have `hoverHeader` and/or `hoverNote` data. If both fields are null/missing, no tooltip appears for that item.

**Tooltip content:**
- `hoverHeader` — Inter Medium 14px, `--color-text-primary`
- `hoverNote` — Geist Mono Regular 14px, `--color-text-secondary`

**Tooltip design:**
- White background (`#ffffff`), `border-radius: 8px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.1)`
- Padding: `12px 16px`, max-width: `260px`
- `pointer-events: none` so it doesn't interfere with clicks
- Only shown on desktop (`@media (hover: hover)`)

**Behavior:**
- `mouseenter` → populate content, show tooltip with fade in (~150ms opacity transition)
- `mousemove` → update `left`/`top` to follow cursor, offset ~12px right and 12px below
- `mouseleave` → fade out tooltip (~150ms)
- Viewport edge detection: flips to left of cursor if near right edge, flips above cursor if near bottom edge

---

## Data Model

### File Location
`src/data/more-items.json`

### Schema
```json
[
  {
    "id": "001",
    "type": "image",
    "src": "/images/more/experiment-01.jpg",
    "alt": "Description of the image",
    "category": ["graphics"],
    "externalUrl": null,
    "title": null,
    "body": null
  },
  {
    "id": "002",
    "type": "video",
    "src": "/images/more/motion-piece.mp4",
    "poster": "/images/more/motion-piece-poster.jpg",
    "alt": "Short motion piece",
    "category": ["motion"],
    "externalUrl": "https://vimeo.com/...",
    "title": null,
    "body": null
  },
  {
    "id": "003",
    "type": "image",
    "src": "/images/more/design-exploration.png",
    "alt": "Design exploration for a product",
    "category": ["experiments"],
    "externalUrl": null,
    "title": "design exploration",
    "body": "A short paragraph about this piece, rendered in Spectral."
  }
]
```

### TypeScript Interface
```typescript
interface MoreItem {
  id: string;
  type: 'image' | 'video';
  src: string;                    // path to media file
  poster?: string;                // video poster frame (optional)
  alt: string;                    // required for accessibility
  category: string | string[];     // filter category key(s) — supports multi-category tagging
  externalUrl?: string | null;    // if set, item links externally
  title?: string | null;          // optional, shown in detail view
  body?: string | null;           // optional, shown in detail view
  hoverHeader?: string | null;    // optional, shown in cursor tooltip on desktop hover
  hoverNote?: string | null;      // optional, shown below hoverHeader in tooltip
}
```

### Image Storage
All media for this page lives in:
```
public/images/more/
├── experiment-01.jpg
├── motion-piece.mp4
├── motion-piece-poster.jpg
└── ...
```

Using `public/` (not `src/content/`) because these are standalone assets, not markdown-driven content. They're referenced by path in the JSON.

---

## Components

### New Components

#### `<FilterSidebar>`
**File:** `src/components/more/FilterSidebar.astro` (+ inline `<script>` for interactivity)
**Responsibility:**
- Renders the category filter list (desktop sidebar only)
- Manages active filter state (client-side JS)
- Hidden entirely on mobile (<768px) — no filtering UI on mobile
- Dispatches a custom event or directly manipulates grid item visibility

**Props:**
- `categories` (string[], required): List of unique category values, auto-derived from items

---

#### `<MasonryGrid>`
**File:** `src/components/more/MasonryGrid.astro`
**Responsibility:**
- Renders the CSS-columns masonry layout
- Contains all `<GridItem>` components
- Responds to filter changes by showing/hiding items

**Props:**
- `items` (MoreItem[], required)

---

#### `<GridItem>`
**File:** `src/components/more/GridItem.astro`
**Responsibility:**
- Renders a single masonry tile (image or video)
- Shows external link icon if `externalUrl` is set
- Handles click: external link → new tab, otherwise → open detail view
- Outputs `data-category` as comma-separated string (e.g. `data-category="design,code"`) for multi-category filtering

**Props:**
- `item` (MoreItem, required)

---

#### `<DetailModal>`
**File:** `src/components/more/DetailModal.astro` (+ `<script>` for open/close logic)
**Responsibility:**
- Desktop: centered modal with backdrop
- Mobile: bottom sheet with backdrop
- Renders media (image or video), optional title, optional body text
- Close on: backdrop click, ✕ button, `Esc` key
- Focus trap for accessibility

**Props:**
- None (populated dynamically via JS when an item is clicked)

---

### Modified Components

#### Homepage `<ProjectList>` / `homepage.json`
Add a new entry:
```json
{ "title": "experiments / play", "href": "/more" }
```
This item should render identically to the existing project links — same typography, divider, and hover state.

---

## Folder Structure Additions

```
src/
├── components/
│   └── more/
│       ├── FilterSidebar.astro
│       ├── MasonryGrid.astro
│       ├── GridItem.astro
│       └── DetailModal.astro
│
├── data/
│   ├── homepage.json          (modified — add new link)
│   └── more-items.json        (NEW)
│
├── layouts/
│   └── MoreLayout.astro       (NEW — full-width variant)
│
└── pages/
    └── more.astro             (NEW)

public/
└── images/
    └── more/                  (NEW — media assets)
```

---

## Architecture Updates

### Site Map (Updated)
```
/ (Homepage)
├── /a-chinese-app-for-heritage-learners (Project 1)
├── /some-conversations-dont-wait (Project 2)
├── /log (Blog Index)
│   └── /log/[slug] (Individual Blog Post)
└── /more (Experiments / Play)              ← NEW
```

### Layout Hierarchy (Updated)
```
BaseLayout.astro
├── HomeLayout.astro
├── BlogLayout.astro
├── ProjectLayout.astro
└── MoreLayout.astro                        ← NEW (full-width)
```

---

## Client-Side JavaScript

This page requires minimal JS for:
1. **Filtering** — staggered fade animation: fade out non-matching items (~150ms), then stagger-fade-in matching items (30ms delay per item, 200ms duration, scale 0.95→1)
2. **Modal/Bottom Sheet** — open, close, populate content dynamically
3. **Responsive detection** — determine whether to show lightbox or bottom sheet (use `matchMedia` for `max-width: 767px`)

All JS should be scoped within Astro `<script>` tags (island-style, no framework needed).

### Filtering Logic (Pseudocode)
```javascript
// Category matching — items can have multiple categories (comma-separated in data-category)
const itemCategories = item.dataset.category.split(',');
const matches = category === 'all' || itemCategories.includes(category);

// Phase 1: Fade out non-matching items simultaneously (~150ms)
toHide.forEach(item => {
  item.style.transition = 'opacity 150ms ease, transform 150ms ease';
  item.style.opacity = '0';
  item.style.transform = 'scale(0.95)';
});

// Phase 2 (after 150ms): Hide faded items, then stagger-fade-in matching items
setTimeout(() => {
  toHide.forEach(item => item.style.display = 'none');
  toShow.forEach((item, i) => {
    item.style.display = '';
    item.style.opacity = '0';
    item.style.transform = 'scale(0.95)';
    setTimeout(() => {
      item.style.transition = 'opacity 200ms ease, transform 200ms ease';
      item.style.opacity = '1';
      item.style.transform = 'scale(1)';
    }, i * 30);  // 30ms stagger per item
  });
}, 150);
```

---

## Accessibility

- All images have `alt` text (required in data model)
- Modal has `role="dialog"`, `aria-modal="true"`, `aria-label`
- Focus is trapped inside modal when open
- `Esc` key closes modal
- Filter buttons are `<button>` elements with `aria-pressed` state
- Videos have poster frames and are keyboard-accessible
- External links have `rel="noopener noreferrer"` and visually indicated with icon

---

## Implementation Order

1. [ ] Create `src/data/more-items.json` with 4–6 sample items
2. [ ] Create `MoreLayout.astro` (full-width variant of BaseLayout)
3. [ ] Build `FilterSidebar.astro` (desktop sidebar only, hidden on mobile)
4. [ ] Build `GridItem.astro` (single tile, image/video, external link icon)
5. [ ] Build `MasonryGrid.astro` (CSS columns layout)
6. [ ] Build `DetailModal.astro` (lightbox + bottom sheet)
7. [ ] Create `src/pages/more.astro` (assemble page)
8. [ ] Wire up filtering JS
9. [ ] Wire up modal/bottom sheet JS
10. [ ] Add "experiments / play" link to homepage `ProjectList`
11. [ ] Add images/videos to `public/images/more/`
12. [ ] Test responsive layout (mobile 1-col, tablet 3-col, desktop 4-col)
13. [ ] Test filter behavior
14. [ ] Test modal + bottom sheet on all breakpoints
15. [ ] Test keyboard navigation and accessibility
16. [ ] Test external links open in new tab

---

## Future Enhancements
- Drag-to-dismiss on mobile bottom sheet
- Lazy loading for images/videos below the fold
- Infinite scroll or "load more" for large collections
- Shuffle/randomize order option
- Tag-based multi-select filtering

---

## Changelog

### v2 — 2026-04-05

1. **Filter heading renamed:** "FILTER" (uppercase) → "more" (lowercase)
2. **Filter button colors:** Inactive buttons now use `--color-text-tertiary` (#8D8D8D); active stays `--color-text-primary` (#333333) with underline
3. **Mobile filter removed:** Filter sidebar/bar hidden entirely on mobile (<768px) — all items shown, no filtering UI
4. **Mobile grid single-column:** Changed from 2-column to 1-column masonry on mobile
5. **Staggered filter animation:** Replaced instant show/hide with two-phase animation — non-matching items fade out simultaneously (~150ms), then matching items fade in with 30ms staggered delay per item (~200ms) and subtle scale 0.95→1
6. **Lightbox padding:** Inner padding changed from 24px to 32px; media fills 100% of modal content width (minus padding)
7. **Bottom sheet spacing:** Added 16px spacing between close icon row and media asset

### v3 — 2026-04-05

1. **Multi-category support:** `category` field in `more-items.json` changed from `string` to `string | string[]` — items can now belong to multiple categories (e.g. `["design", "code"]`)
2. **GridItem data attribute:** `data-category` now outputs comma-separated values (e.g. `data-category="design,code"`)
3. **Filtering logic:** Updated to split `data-category` by comma and use `.includes()` — an item matches if *any* of its categories match the active filter

### v4 — 2026-04-05

1. **Desktop grid columns:** Reduced from 4 to 3 columns (`--more-grid-columns: 3`). Desktop and tablet now share the same 3-column layout

### v5 — 2026-04-05

1. **Cursor-following hover tooltip:** Added a shared tooltip element that follows the cursor on desktop when hovering grid items. Content sourced from two new optional fields: `hoverHeader` (Inter Medium 14px) and `hoverNote` (Geist Mono Regular 14px). White background, 8px radius, subtle box-shadow. Fades in/out at 150ms, stays 12px offset from cursor, flips at viewport edges. Desktop only (`@media (hover: hover)`), `pointer-events: none`
