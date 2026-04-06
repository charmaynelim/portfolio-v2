# Build Phase 2: Sticky Header + Case Study Layout

## Overview
Two changes bundled together:
1. **Sticky header** across all subpages (blog, project, /more, case studies)
2. **Case study layout** — a new dual-column page type for detailed project write-ups

---

# Change 1: Sticky Header

## Description
The back arrow + "charmayne" header bar becomes sticky on desktop (≥768px) across all subpages. On mobile it scrolls normally.

## Implementation

### New Component: `<StickyHeader>`
**File:** `src/components/global/StickyHeader.astro`
**Replaces:** The current pattern of placing `<BackArrow>` and `<SiteHeader>` separately in each layout.

**Responsibility:**
- Wraps back arrow (left) and "charmayne" link (right) in a single `<header>` bar
- `position: sticky; top: 0; z-index: 100` on desktop (≥768px)
- `position: static` on mobile (<768px)
- Solid background: `--color-bg-primary` (#F2F2F2)
- Full viewport width (edge to edge, content padded inside)

**Props:**
- `backHref` (string, required): URL for the back arrow

### Design Token
```css
:root {
  --sticky-header-height: 60px;    /* consistent across all subpages */
}
```

### CSS
```css
.sticky-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--sticky-header-height);
  background: var(--color-bg-primary);
  padding: 0 var(--padding-container-horizontal);
  z-index: 100;
}

@media (min-width: 768px) {
  .sticky-header {
    position: sticky;
    top: 0;
  }
}

@media (max-width: 767px) {
  .sticky-header {
    padding: 0 var(--padding-container-mobile-horizontal);
  }
}
```

### Layout Updates
Replace the separate `<BackArrow>` + `<SiteHeader>` pattern in all layouts with `<StickyHeader>`:

| Layout | Back arrow href | Change |
|--------|----------------|--------|
| `BlogLayout.astro` | `/log` (index) or `/log` (post) | Replace with `<StickyHeader>` |
| `ProjectLayout.astro` | `/` | Replace with `<StickyHeader>` |
| `MoreLayout.astro` | `/` | Replace with `<StickyHeader>` |
| `CaseStudyLayout.astro` (new) | `/` | Use `<StickyHeader>` |

### Downstream Impact: Filter Sidebar on /more
The filter sidebar on `/more` uses `position: sticky`. Its `top` value must account for the sticky header:
```css
.filter-sidebar {
  position: sticky;
  top: var(--sticky-header-height);  /* sits below the header */
}
```

### Downstream Impact: Case Study Left Column
The left column on case study pages uses `position: fixed` (not sticky) to stay out of flow, allowing the content column to center independently:
```css
.case-study-left {
  position: fixed;
  top: calc(var(--sticky-header-height) + var(--cs-padding-vertical));
  left: var(--cs-padding-horizontal);
}
```

---

# Change 2: Case Study Layout

## Overview
A new full-width, dual-column page type for detailed case studies. Left column shows company/product info (sticky), right column contains the case study body with metadata, inline links, and images.

## Route & Content Collection

### New Content Collection: `case-studies`
**Location:** `src/content/case-studies/[slug].md`

This is separate from the existing `src/content/projects/` collection, giving each layout type its own content pool.

### Frontmatter Schema
```yaml
---
title: "Company or Product Name"
slug: "company-name"
subtitle: "Type of work"                    # e.g. "Consumer Product", "B2B SaaS"
order: 1                                     # Display order on homepage
description: "SEO meta description"          # Optional

# Editable metadata columns — labels and values are both customizable
meta1Label: "Role"
meta1Value: "Product Designer"
meta2Label: "Collaborators"
meta2Value: "Hoshi, Alice Cai"               # newline-separated for multiple
meta3Label: "Duration"
meta3Value: "2022 - Present"
meta4Label: "Tools"
meta4Value: "Figma, React"                   # newline-separated for multiple
---
```

### Content Collections Schema
```typescript
const caseStudyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    subtitle: z.string().optional(),
    order: z.number(),
    description: z.string().optional(),
    meta1Label: z.string().optional(),
    meta1Value: z.string().optional(),
    meta2Label: z.string().optional(),
    meta2Value: z.string().optional(),
    meta3Label: z.string().optional(),
    meta3Value: z.string().optional(),
    meta4Label: z.string().optional(),
    meta4Value: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
  'case-studies': caseStudyCollection,   // ← NEW
};
```

### Routing
**File:** `src/pages/case-studies/[slug].astro`
**Route:** `/case-studies/[slug]`

```typescript
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const studies = await getCollection('case-studies');
  return studies.map(study => ({
    params: { slug: study.data.slug },
    props: { study },
  }));
}
```

### Homepage Integration
Case studies appear in the homepage `<ProjectList>` alongside existing projects. The combined list should pull from both collections, sorted by `order`:

```typescript
const projects = await getCollection('projects');
const caseStudies = await getCollection('case-studies');

const allItems = [
  ...projects.map(p => ({ title: p.data.title, href: `/${p.data.slug}`, order: p.data.order })),
  ...caseStudies.map(cs => ({ title: cs.data.title, href: `/case-studies/${cs.data.slug}`, order: cs.data.order })),
].sort((a, b) => a.order - b.order);
```

---

## Layout

### `CaseStudyLayout.astro`
**File:** `src/layouts/CaseStudyLayout.astro`
Extends `BaseLayout`. Full-width layout with `<StickyHeader>`.

```
BaseLayout.astro
├── HomeLayout.astro
├── BlogLayout.astro
├── ProjectLayout.astro
├── MoreLayout.astro
└── CaseStudyLayout.astro              ← NEW (full-width, dual-column)
```

### Page Structure (Desktop ≥768px)
```
┌─────────────────────────────────────────────────────────┐
│  ← (back arrow)                            charmayne   │  ← sticky header
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  Title       │  intro paragraph...                      │
│  subtitle    │                                          │
│              │  ┌─────────┬──────────┬────────┬──────┐  │
│   (sticky)   │  │ ROLE    │ COLLABS  │DURATION│TOOLS │  │
│              │  │ Designer│ Hoshi    │ 2022-  │Figma │  │
│              │  │         │ Alice    │ Present│React │  │
│              │  └─────────┴──────────┴────────┴──────┘  │
│              │                                          │
│              │  ┌────────────────────────────────────┐  │
│              │  │ LINK TEXT                        ↗ │  │
│              │  └────────────────────────────────────┘  │
│              │                                          │
│              │  Section heading                         │
│              │  body text...                            │
│              │                                          │
│              │  ┌────────────────────────────────────┐  │
│              │  │         full-width image            │  │
│              │  └────────────────────────────────────┘  │
│              │                                          │
│              │  more body text...                       │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

### Page Structure (Mobile <768px)
```
┌─────────────────────────┐
│  ← (back arrow)         │
│                charmayne│  ← static (not sticky)
├─────────────────────────┤
│                         │
│  Title                  │
│  subtitle               │
│                         │
│  intro paragraph...     │
│                         │
│  ┌──────────┬─────────┐ │
│  │ ROLE     │ COLLABS │ │  ← 2x2 grid
│  │ Designer │ Hoshi   │ │
│  ├──────────┼─────────┤ │
│  │ DURATION │ TOOLS   │ │
│  │ 2022-    │ Figma   │ │
│  └──────────┴─────────┘ │
│                         │
│  ┌─────────────────┐   │
│  │ LINK TEXT     ↗ │   │
│  └─────────────────┘   │
│                         │
│  Section heading        │
│  body text...           │
│                         │
│  ┌─────────────────────┐│
│  │   full-width image  ││
│  └─────────────────────┘│
│                         │
└─────────────────────────┘
```

---

## Spacing & Layout Tokens

```css
:root {
  /* Case Study — Layout */
  --cs-left-column-width: 200px;
  --cs-column-gap: 80px;
  --cs-content-max-width: 700px;         /* right column max-width */

  /* Case Study — Padding */
  --cs-padding-horizontal: 44px;
  --cs-padding-vertical: 44px;
  --cs-padding-mobile-horizontal: 20px;
  --cs-padding-mobile-top: 40px;

  /* Case Study — Metadata */
  --cs-meta-gap: 24px;                   /* gap between the 4 metadata columns */

  /* Case Study — Inline Links */
  --cs-link-row-padding-vertical: 16px;
}
```

---

## Typography

### Left Column
- **Title (company/product):** Inter Medium, 18px, `--color-text-primary`
- **Subtitle (type of work):** Geist Mono Medium, 12px, `--color-text-tertiary` (#8D8D8D)

### Right Column — Metadata Row
- **Meta labels:** Geist Mono Medium, 12px, uppercase, `--color-text-tertiary` (#8D8D8D)
- **Meta values:** Inter Medium, 14px, `--color-text-primary`
- Multi-value items (e.g. multiple collaborators) render as separate lines within the same column

### Right Column — Body
- **Body text:** Inter Regular, 16px, `--color-text-body` (case study only — blog/project pages keep Spectral)
- **Section headings:** Inter Medium, 18px, `--color-text-primary`
- **Paragraph spacing:** 12px
- **Image spacing:** 24px above/below

### Inline Link Rows
- **Text:** Inter Medium, 18px, `--color-text-primary`
- **Arrow icon (↗):** Right-aligned, `--color-text-primary`
- **Hover:** Text and arrow change to `#8D8D8D`
- **Dividers:** Horizontal divider above and below each link row (`--color-divider`, 1px)
- **Padding:** 16px vertical inside the row
- **Behavior:** Opens in new tab (`target="_blank" rel="noopener noreferrer"`)

---

## Components

### New Components

#### `<CaseStudySidebar>`
**File:** `src/components/case-study/CaseStudySidebar.astro`
**Responsibility:**
- Displays title + subtitle
- `position: fixed` on desktop (pinned to left edge at `--cs-padding-horizontal`, below sticky header), taken out of flow so it doesn't affect content column centering
- On mobile: static, renders at top of page before content

**Props:**
- `title` (string, required)
- `subtitle` (string, optional)

---

#### `<CaseStudyMeta>`
**File:** `src/components/case-study/CaseStudyMeta.astro`
**Responsibility:**
- Renders the 4 metadata columns in a horizontal row
- Each column has a label (uppercase) and value
- Desktop: 4 columns in a row
- Mobile: 2×2 grid

**Props:**
```typescript
{
  meta: {
    label: string;
    value: string;
  }[];  // array of 4 items
}
```

---

#### `<CaseStudyLinkRow>`
**File:** `src/components/case-study/CaseStudyLinkRow.astro`
**Responsibility:**
- Full-width row with text + ↗ arrow icon
- Horizontal dividers above and below
- Opens external URL in new tab
- Hover: text + arrow change to `#8D8D8D`

**Props:**
- `label` (string, required): Display text
- `href` (string, required): External URL

**Usage in Markdown:**
Since this is a custom component inside markdown content, use Astro's MDX support or render these links from frontmatter data. Recommended approach — define links in frontmatter:

```yaml
---
links:
  - label: "azuki.com"
    href: "https://azuki.com"
  - label: "twitter"
    href: "https://twitter.com/azuki"
---
```

Then render them in the page template between the metadata and the body content.

---

#### `<CaseStudyBody>`
**File:** `src/components/case-study/CaseStudyBody.astro`
**Responsibility:**
- Renders markdown content with proper spacing
- Same styling as `<PostBody>`: Spectral 16px, 12px paragraph spacing, 24px image spacing
- Images fill the right column width

**Props:**
- Accepts markdown content (slot)

---

### Modified Components

#### `<StickyHeader>` (new, replaces pattern)
See Change 1 above. Used by all subpage layouts.

---

## Folder Structure Additions

```
src/
├── components/
│   ├── global/
│   │   └── StickyHeader.astro          (NEW)
│   │
│   └── case-study/
│       ├── CaseStudySidebar.astro      (NEW)
│       ├── CaseStudyMeta.astro         (NEW)
│       ├── CaseStudyLinkRow.astro      (NEW)
│       └── CaseStudyBody.astro         (NEW)
│
├── content/
│   └── case-studies/                   (NEW collection)
│       ├── images/
│       └── example-study.md
│
├── layouts/
│   └── CaseStudyLayout.astro           (NEW)
│
└── pages/
    └── case-studies/
        └── [slug].astro                (NEW — dynamic route)
```

---

## Architecture Updates

### Site Map (Updated)
```
/ (Homepage)
├── /a-chinese-app-for-heritage-learners (Project — simple layout)
├── /some-conversations-dont-wait (Project — simple layout)
├── /case-studies/[slug] (Case Study — dual-column layout)  ← NEW
├── /log (Blog Index)
│   └── /log/[slug] (Individual Blog Post)
└── /more (Experiments / Play)
```

### Layout Hierarchy (Updated)
```
BaseLayout.astro
├── HomeLayout.astro
├── BlogLayout.astro        → uses <StickyHeader>
├── ProjectLayout.astro     → uses <StickyHeader>
├── MoreLayout.astro        → uses <StickyHeader>
└── CaseStudyLayout.astro   → uses <StickyHeader>     ← NEW
```

### Content Collections (Updated)
```
src/content/
├── config.ts               (updated — add case-studies collection)
├── blog/
├── projects/
└── case-studies/            ← NEW
```

---

## Implementation Order

### Phase 2a: Sticky Header
1. [ ] Create `--sticky-header-height: 60px` token
2. [ ] Build `<StickyHeader>` component
3. [ ] Replace header pattern in `BlogLayout.astro`
4. [ ] Replace header pattern in `ProjectLayout.astro`
5. [ ] Replace header pattern in `MoreLayout.astro`
6. [ ] Update filter sidebar `top` value on `/more` page
7. [ ] Test sticky behavior on desktop (≥768px)
8. [ ] Test static behavior on mobile (<768px)
9. [ ] Test all subpages still navigate correctly

### Phase 2b: Case Study Layout
10. [ ] Add `case-studies` collection to `src/content/config.ts`
11. [ ] Create example case study markdown in `src/content/case-studies/`
12. [ ] Create `CaseStudyLayout.astro` (full-width, dual-column)
13. [ ] Build `<CaseStudySidebar>` (title + subtitle, sticky on desktop)
14. [ ] Build `<CaseStudyMeta>` (4-column metadata row, 2×2 on mobile)
15. [ ] Build `<CaseStudyLinkRow>` (full-width link with ↗, dividers)
16. [ ] Build `<CaseStudyBody>` (markdown content renderer)
17. [ ] Create `src/pages/case-studies/[slug].astro` (dynamic route)
18. [ ] Update homepage to pull from both `projects` and `case-studies` collections
19. [ ] Test dual-column layout on desktop
20. [ ] Test single-column collapse on mobile
21. [ ] Test metadata 2×2 grid on mobile
22. [ ] Test inline link rows (hover state, new tab)
23. [ ] Test sticky left column on desktop
24. [ ] Test homepage with mixed project types

---

## Spec Updates
Update the following existing spec files to reflect these changes:
- `01-architecture.md` — site map, layout hierarchy
- `02-style-guide.md` — new tokens (sticky header height, case study spacing)
- `03-components.md` — add StickyHeader, case study components
- `04-content-model.md` — add case-studies collection schema
- `05-folder-structure.md` — new folders and files
- `07-experiments-page.md` — note filter sidebar `top` change

---

## Changelog

### 2026-04-06 — Post-implementation refinements
1. **Subtitle + metadata label text size:** 10px → 12px (CaseStudySidebar subtitle, CaseStudyMeta labels)
2. **Body text font:** Changed from Spectral Regular to Inter Regular (`--font-sans`) for case study pages only. Blog and project pages retain Spectral.
3. **Content column centering:** The right content column now centers horizontally on the page via `margin: 0 auto`. The left sidebar uses `position: fixed` (pinned to `--cs-padding-horizontal` from the left edge, below the sticky header) so it is taken out of flow and does not affect the content column's centering. On mobile, the sidebar reverts to normal flow (stacked above content).
4. **Cover image:** Added optional `coverImage` (string) frontmatter field. Renders a full-width header image at the top of the content column, before the metadata row. 100% width, height auto, border-radius 8px, 24px spacing below (via column gap). Skipped if not set.
5. **MP4 video in markdown:** Added remark plugin (`src/plugins/remark-video.mjs`) that transforms `![alt](*.mp4)` image syntax into `<video autoplay muted loop playsinline>` elements. Applies globally to all markdown content (blog posts + case studies). Videos fill 100% width, height auto, same 24px spacing as images. No controls — silent autoplay loop.
6. **Annotations (margin notes):** Added remark plugin (`src/plugins/remark-annotations.mjs`) for handwritten margin notes. Uses `remark-directive` to parse `:::annotation{side="right" arrow="curve-left"}` syntax. Desktop (≥768px): `position: absolute`, floats in the margin outside the content column (left or right based on `data-side`), max-width 200px. Mobile (<768px): `position: static`, inline in flow, centered, 16px font. Font: `--font-handwritten` (Handwritten family with cursive fallback), 18px desktop. Arrow images loaded from `public/images/annotations/[name].png` — gracefully skipped if missing. Applies to both `<CaseStudyBody>` and `<PostBody>`.
   - New files: `src/plugins/remark-annotations.mjs`, `public/images/annotations/` (empty, PNGs added manually), `public/fonts/handwritten/` (font files added manually)
   - New dependency: `remark-directive`
   - New CSS variable: `--font-handwritten` in `tokens.css`
7. **Annotation arrows hidden on mobile:** Arrow images (`display: none`) on screens <768px. Annotation text remains visible.
8. **Annotation per-element positioning:** Text and arrow are independently positionable via CSS custom properties set as inline styles. Frontmatter attributes: `textX`, `textY`, `arrowX`, `arrowY`, `arrowRotate`. Left-side arrows auto-flip vertically (`scaleY(-1)`).
9. **Content lightbox (desktop only):** New `<ContentLightbox>` component (`src/components/global/ContentLightbox.astro`) provides a lightbox for images/videos inside `.post-body` and `.cs-body`. Desktop (≥768px) only — clicking media opens a centered overlay (max 90vw × 85vh, 32px padding). Backdrop rgba(0,0,0,0.5), click to close. Esc to close. Pointer cursor on hoverable media. Videos autoplay muted loop in the lightbox. 200ms fade animation. Scoped to content bodies only — does not affect /more grid items. Included in `BaseLayout.astro` so it's available on all pages.
