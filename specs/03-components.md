# Component Breakdown

## Global Components

### `<StickyHeader>`
**Used on:** All subpages (blog, project, more, case studies)
**File:** `src/components/global/StickyHeader.astro`
**Responsibility:**
- Wraps back arrow (left) and "charmayne" link (right) in a single header bar
- `position: sticky; top: 0; z-index: 100` on desktop (≥768px)
- `position: static` on mobile (<768px)
- Solid background: `--color-bg-primary` (#F2F2F2)
- Height: `--sticky-header-height` (60px)

**Props:**
- `backHref` (string, required): URL for the back arrow

**Example usage:**
```astro
<StickyHeader backHref="/" />
<StickyHeader backHref="/log" />
```

---

### `<ContentLightbox>`
**Used on:** All pages (included in BaseLayout)
**File:** `src/components/global/ContentLightbox.astro`
**Responsibility:**
- Desktop-only (≥768px) lightbox for images/videos inside content bodies
- Targets `.post-body` and `.cs-body` media only (not /more grid items)
- Click image/video to open centered overlay (max 90vw × 85vh, 32px padding)
- Backdrop: rgba(0,0,0,0.5), click to close
- Esc to close, pointer cursor on hoverable media
- Videos autoplay muted loop in lightbox
- 200ms fade animation
- Single shared DOM element, populated dynamically

---

### `<SiteHeader>` (legacy)
**Note:** Replaced by `<StickyHeader>` in all layouts. Retained for reference.

---

### `<BackArrow>` (legacy)
**Note:** Replaced by `<StickyHeader>` in all layouts. Retained for reference.

---

### `<ContentContainer>`
**Used on:** All pages
**Responsibility:**
- Wraps page content with max-width (500px)
- Applies responsive padding:
  - Desktop: 44px all sides
  - Mobile: 20px horizontal, 40px top, 20px bottom
- Centers content horizontally

**Props:**
- Accepts children (slot)

**Example usage:**
```astro
<ContentContainer>
  <!-- Page content here -->
</ContentContainer>
```

---

### `<HorizontalDivider>`
**Used on:** Homepage project list, blog index
**Responsibility:**
- Renders 1px horizontal line
- Color: #CCCCCC

**Props:**
- None

**Example usage:**
```astro
<HorizontalDivider />
```

---

## Homepage Components

### `<HeroSection>`
**Used on:** Homepage only
**Responsibility:**
- Displays hero heading and bio paragraph
- Includes inline link to HeyMax (opens in new tab)
- Typography matches design tokens

**Props:**
- `heading` (string, required)
- `bio` (string, required)
- `heyMaxUrl` (string, required)

**Example usage:**
```astro
<HeroSection
  heading="charmayne is a founding designer, growth marketer, and builder"
  bio="with 0 to 1 experience in product & GTM..."
  heyMaxUrl="https://heymax.ai"
/>
```

---

### `<ProjectList>`
**Used on:** Homepage only
**Responsibility:**
- Renders list of project/blog links
- Each item separated by horizontal divider
- Fetches project order from content collections

**Props:**
- `projects` (array of objects, required)
```typescript
  {
    title: string;
    href: string;
  }[]
```

**Example usage:**
```astro
<ProjectList projects={[
  { title: "a chinese app for heritage learners", href: "/a-chinese-app..." },
  { title: "some conversations don't wait", href: "/some-conversations..." },
  { title: "log / writing", href: "/log" }
]} />
```

---

### `<ProjectListItem>`
**Used by:** `<ProjectList>`
**Responsibility:**
- Single clickable project row
- Hover state: 80% opacity
- Typography: Inter Medium 26px (desktop) / 32px (mobile)

**Props:**
- `title` (string, required)
- `href` (string, required)

---

### `<Footer>`
**Used on:** Homepage only
**Responsibility:**
- Social links: email, linkedin, instagram, X
- Responsive layout: horizontal (desktop) → vertical (mobile)
- Sticky at bottom on desktop with 20px bottom padding
- All links underlined with hover state

**Props:**
- `links` (array of objects, required)
```typescript
  {
    label: string;
    url: string;
  }[]
```

**Example usage:**
```astro
<Footer links={[
  { label: "email", url: "mailto:..." },
  { label: "linkedin", url: "https://..." },
  { label: "instagram", url: "https://..." },
  { label: "X", url: "https://..." }
]} />
```

---

## Blog Components

### `<BlogPostList>`
**Used on:** Blog index page
**Responsibility:**
- Renders list of blog posts with dates and titles
- Sorted by date (newest first)
- Each item separated by horizontal divider

**Props:**
- `posts` (array of blog post objects, required)
```typescript
  {
    slug: string;
    title: string;
    date: Date;
  }[]
```

**Example usage:**
```astro
<BlogPostList posts={allPosts} />
```

---

### `<BlogPostListItem>`
**Used by:** `<BlogPostList>`
**Responsibility:**
- Single blog post row with date and title
- Full row clickable, links to `/log/[slug]`
- Hover state: 80% opacity
- Date format: "DD Month YYYY"

**Props:**
- `slug` (string, required)
- `title` (string, required)
- `date` (Date, required)

---

### `<PostMetadata>`
**Used on:** Blog post and project pages
**Responsibility:**
- Displays date or project metadata above title
- Typography: Geist Mono 10px, color #8D8D8D
- Format: "DD Month YYYY" or custom string

**Props:**
- `text` (string, required)

**Example usage:**
```astro
<PostMetadata text="16 October 2025" />
<PostMetadata text="2023 • Product Design" />
```

---

### `<PostTitle>`
**Used on:** Blog post and project pages
**Responsibility:**
- Displays post or project title
- Typography: Inter Medium 24px
- Multi-line wrapping supported

**Props:**
- `title` (string, required)

**Example usage:**
```astro
<PostTitle title="blog post title 1, but this is a longer title..." />
```

---

### `<PostBody>`
**Used on:** Blog post and project pages
**Responsibility:**
- Renders markdown content with proper spacing
- Typography: Spectral Regular 16px
- Paragraph spacing: 12px
- Image spacing: 24px above/below
- Images: full content width, left-aligned

**Props:**
- Accepts markdown content (slot or processed HTML)

**Example usage:**
```astro
<PostBody>
  <Content />  <!-- Astro's markdown content component -->
</PostBody>
```

---

## Case Study Components

### `<CaseStudySidebar>`
**File:** `src/components/case-study/CaseStudySidebar.astro`
**Responsibility:**
- Displays title + subtitle
- Sticky on desktop (top = `--sticky-header-height`), static on mobile
- On mobile: renders at top of page before content

**Props:**
- `title` (string, required)
- `subtitle` (string, optional)

---

### `<CaseStudyMeta>`
**File:** `src/components/case-study/CaseStudyMeta.astro`
**Responsibility:**
- Renders metadata columns in a horizontal row
- Each column has a label (uppercase, Geist Mono 10px) and value (Inter Medium 14px)
- Desktop: columns in a row
- Mobile: 2×2 grid

**Props:**
- `meta` (array of `{ label: string; value: string }`)

---

### `<CaseStudyLinkRow>`
**File:** `src/components/case-study/CaseStudyLinkRow.astro`
**Responsibility:**
- Full-width row with text + ↗ arrow icon
- Horizontal dividers above and below
- Opens external URL in new tab
- Hover: text + arrow fade to 50% opacity

**Props:**
- `label` (string, required): Display text
- `href` (string, required): External URL

---

### `<CaseStudyBody>`
**File:** `src/components/case-study/CaseStudyBody.astro`
**Responsibility:**
- Renders markdown content with proper spacing
- Spectral 16px body, Inter Medium 18px section headings
- 12px paragraph spacing, 24px image spacing

**Props:**
- Accepts markdown content (slot)

---

## Project Components

Project components mirror blog components:
- `<ProjectMetadata>` (same as `<PostMetadata>`)
- `<ProjectTitle>` (same as `<PostTitle>`)
- `<ProjectBody>` (same as `<PostBody>`)

These can be aliases or shared components.
