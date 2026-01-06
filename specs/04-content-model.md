# Content Model

## Blog Posts

### File Location
`src/content/blog/[slug].md`

### Frontmatter Schema
```yaml
---
title: "blog post title"
date: 2025-10-16  # YYYY-MM-DD format
slug: "blog-post-title"  # URL-safe identifier
description: "Optional SEO meta description"  # Optional
draft: false  # Optional, hides from production if true
---
```

### Markdown Body
- Supports standard markdown: headings, paragraphs, links, images
- Images stored relative to blog post file or in shared images directory
- Example:
```markdown
This is the first paragraph.

This is the second paragraph with [a link](https://example.com).

![Alt text](./images/example.jpg)

More content here.
```

### Content Collections Schema (`src/content/config.ts`)
```typescript
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    slug: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

### Querying Blog Posts
```typescript
import { getCollection } from 'astro:content';

// Get all published posts, sorted by date (newest first)
const allPosts = (await getCollection('blog'))
  .filter(post => !post.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
```

### Date Formatting
- Display format: "DD Month YYYY" (e.g., "16 October 2025")
- Helper function:
```typescript
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
```

---

## Projects

### File Location
`src/content/projects/[slug].md`

### Frontmatter Schema
```yaml
---
title: "a chinese app for heritage learners"
slug: "a-chinese-app-for-heritage-learners"  # Must match page route
order: 1  # Display order on homepage (1, 2, 3...)
metadata: "2023 • Product Design"  # Optional metadata line
description: "Optional SEO meta description"  # Optional
---
```

### Markdown Body
- Same markdown support as blog posts
- Images, paragraphs, headings, links, etc.

### Content Collections Schema
```typescript
const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    order: z.number(),
    metadata: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
};
```

### Querying Projects
```typescript
// Get all projects, sorted by order
const allProjects = (await getCollection('projects'))
  .sort((a, b) => a.data.order - b.data.order);
```

---

## Homepage Data

### Option 1: JSON File
`src/data/homepage.json`
```json
{
  "hero": {
    "heading": "charmayne is a founding designer, growth marketer, and builder",
    "bio": "with 0 to 1 experience in product & GTM. Employee #4 at HeyMax who helped scale to 6M+ ARR in SEA. Building at the edges. Based in Singapore (now SF) but hardly stays put."
  },
  "heyMaxUrl": "https://heymax.ai",
  "socialLinks": [
    { "label": "email", "url": "mailto:your@email.com" },
    { "label": "linkedin", "url": "https://linkedin.com/in/yourprofile" },
    { "label": "instagram", "url": "https://instagram.com/yourhandle" },
    { "label": "X", "url": "https://x.com/yourhandle" }
  ]
}
```

### Option 2: Hardcoded in Component
Acceptable for static content that rarely changes.

---

## Images

### Storage
- Blog post images: `src/content/blog/images/`
- Project images: `src/content/projects/images/`
- Shared images: `public/images/`

### Markdown Syntax
```markdown
![Alt text](./images/example.jpg)
```

### Astro Image Component (Recommended)
```astro
---
import { Image } from 'astro:assets';
import exampleImage from './images/example.jpg';
---

<Image src={exampleImage} alt="Alt text" />
```

### Image Requirements
- Alt text required for all images
- Max-width: 500px (content container width)
- Left-aligned
- Spacing: 24px above/below

---

## Icons

### Back Arrow
- File: `public/icons/arrow-left.svg`
- Size: 20x20px
- Color: #333333

### SVG Example
```svg
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```
