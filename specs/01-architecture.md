# Architecture & Site Map

## Site Structure
```
/ (Homepage)
├── /a-chinese-app-for-heritage-learners (Project 1)
├── /some-conversations-dont-wait (Project 2)
└── /log (Blog Index)
    └── /log/[slug] (Individual Blog Post)
```

## Pages

| Route | File | Purpose | Layout |
|-------|------|---------|--------|
| `/` | `src/pages/index.astro` | Portfolio homepage with bio and project links | HomeLayout |
| `/a-chinese-app-for-heritage-learners` | `src/pages/a-chinese-app-for-heritage-learners.astro` | Project case study | ProjectLayout |
| `/some-conversations-dont-wait` | `src/pages/some-conversations-dont-wait.astro` | Project case study | ProjectLayout |
| `/log` | `src/pages/log/index.astro` | Blog post listing | BlogLayout |
| `/log/[slug]` | `src/pages/log/[slug].astro` | Individual blog post | BlogLayout |

## Navigation Flow

**Homepage → All other pages:**
- "charmayne" header link (on subpages) → Homepage
- Footer social links (homepage only) → External sites

**Blog navigation:**
- Homepage → "log / writing" link → Blog Index (`/log`)
- Blog Index → Blog post title → Individual post (`/log/[slug]`)
- Blog post → Back arrow → Blog Index
- Blog Index → Back arrow → Homepage

**Project navigation:**
- Homepage → Project title → Project page
- Project page → Back arrow → Homepage

## Astro-Specific Decisions

### Content Collections
- Use Astro Content Collections for blog posts
- Define schema in `src/content/config.ts`
- Benefits: Type safety, automatic slug generation, sorting

### Layouts Hierarchy
```
BaseLayout.astro (HTML structure, fonts, global styles)
├── HomeLayout.astro (includes Footer)
├── BlogLayout.astro (includes SiteHeader + BackArrow)
└── ProjectLayout.astro (includes SiteHeader + BackArrow)
```

### Routing Strategy
- File-based routing in `src/pages/`
- Dynamic route for blog: `src/pages/log/[slug].astro`
- Static routes for projects (could make dynamic later)

### Static Site Generation
- All pages pre-rendered at build time
- No server-side rendering needed
- Deploy as static files

## SEO Strategy
- Unique title and meta description per page
- Open Graph tags for social sharing
- Sitemap auto-generated via `@astrojs/sitemap`
- Structured data (JSON-LD) for blog posts
