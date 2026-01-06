# Component Breakdown

## Global Components

### `<SiteHeader>`
**Used on:** Blog index, blog post, project pages
**Responsibility:**
- Displays "charmayne" text as clickable link to homepage
- Positioned top-left of content area
- Hover state: 80% opacity

**Props:**
- None (always links to `/`)

**Example usage:**
```astro
<SiteHeader />
```

---

### `<BackArrow>`
**Used on:** Blog index, blog post, project pages
**Responsibility:**
- Displays left-pointing arrow icon (20x20px)
- Navigates to parent page
- Hover state: 80% opacity

**Props:**
- `href` (string, required): URL to navigate to

**Example usage:**
```astro
<BackArrow href="/" />
<BackArrow href="/log" />
```

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

## Project Components

Project components mirror blog components:
- `<ProjectMetadata>` (same as `<PostMetadata>`)
- `<ProjectTitle>` (same as `<PostTitle>`)
- `<ProjectBody>` (same as `<PostBody>`)

These can be aliases or shared components.
