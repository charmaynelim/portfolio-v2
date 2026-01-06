# Implementation Guide

## Build Order (Step-by-Step)

### Phase 1: Project Setup
- [ ] Initialize Astro project: `npm create astro@latest`
- [ ] Install dependencies
- [ ] Set up Git repository
- [ ] Create folder structure (see `05-folder-structure.md`)
- [ ] Add fonts to `/public/fonts` (or configure Google Fonts)
- [ ] Create back arrow SVG icon in `/public/icons`

### Phase 2: Styles & Tokens
- [ ] Create `src/styles/reset.css` (CSS reset)
- [ ] Create `src/styles/tokens.css` (design tokens from `02-style-guide.md`)
- [ ] Create `src/styles/global.css` (base styles, typography)
- [ ] Set up font-face declarations
- [ ] Test typography scale in browser

### Phase 3: Base Layout
- [ ] Create `src/layouts/BaseLayout.astro`
  - HTML structure
  - Meta tags (title, description, OG tags)
  - Link to stylesheets
  - Font preloading
- [ ] Test BaseLayout with placeholder content

### Phase 4: Global Components
- [ ] Build `src/components/global/ContentContainer.astro`
- [ ] Build `src/components/global/HorizontalDivider.astro`
- [ ] Build `src/components/global/SiteHeader.astro`
- [ ] Build `src/components/global/BackArrow.astro`
- [ ] Test components in isolation

### Phase 5: Homepage
- [ ] Create `src/data/homepage.json` (hero, bio, social links)
- [ ] Create `src/layouts/HomeLayout.astro` (extends BaseLayout)
- [ ] Build `src/components/homepage/HeroSection.astro`
- [ ] Build `src/components/homepage/ProjectListItem.astro`
- [ ] Build `src/components/homepage/ProjectList.astro`
- [ ] Build `src/components/homepage/Footer.astro`
- [ ] Create `src/pages/index.astro` (assemble homepage)
- [ ] Test responsive layout (mobile, desktop)
- [ ] Test hover states
- [ ] Test footer sticky positioning

### Phase 6: Content Collections
- [ ] Create `src/content/config.ts` (define blog + project schemas)
- [ ] Create example blog posts in `src/content/blog/`
  - [ ] `example-post-1.md`
  - [ ] `example-post-2.md`
- [ ] Create project content in `src/content/projects/`
  - [ ] `chinese-app.md`
  - [ ] `conversations.md`
- [ ] Add sample images to `/images` subfolders
- [ ] Test content collection queries

### Phase 7: Blog Components
- [ ] Create `src/layouts/BlogLayout.astro` (extends BaseLayout)
- [ ] Build `src/components/blog/PostMetadata.astro`
- [ ] Build `src/components/blog/PostTitle.astro`
- [ ] Build `src/components/blog/PostBody.astro`
- [ ] Build `src/components/blog/BlogPostListItem.astro`
- [ ] Build `src/components/blog/BlogPostList.astro`

### Phase 8: Blog Pages
- [ ] Create `src/pages/log/index.astro` (blog index)
  - Query all blog posts
  - Sort by date
  - Render BlogPostList
- [ ] Create `src/pages/log/[slug].astro` (individual post)
  - Dynamic route
  - Query post by slug
  - Render post content
- [ ] Test blog navigation (index → post → back)
- [ ] Test date formatting
- [ ] Test responsive layout

### Phase 9: Project Pages
- [ ] Create `src/layouts/ProjectLayout.astro` (extends BaseLayout)
- [ ] Create `src/pages/a-chinese-app-for-heritage-learners.astro`
  - Query project content
  - Render with ProjectLayout
- [ ] Create `src/pages/some-conversations-dont-wait.astro`
  - Query project content
  - Render with ProjectLayout
- [ ] Test project navigation (homepage → project → back)
- [ ] Test content rendering

### Phase 10: Polish & Testing
- [ ] Test all internal links
- [ ] Test external links (HeyMax, social links)
- [ ] Test responsive layout on all breakpoints
- [ ] Test hover/press states on all interactive elements
- [ ] Validate HTML (W3C validator)
- [ ] Check accessibility (WAVE, Lighthouse)
- [ ] Test keyboard navigation
- [ ] Check color contrast
- [ ] Optimize images (compression, WebP)
- [ ] Add alt text to all images

### Phase 11: SEO & Meta
- [ ] Add unique meta descriptions to all pages
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Configure `@astrojs/sitemap` integration
- [ ] Create `robots.txt`
- [ ] Add structured data (JSON-LD) for blog posts
- [ ] Test social sharing previews

### Phase 12: Deployment
- [ ] Build for production: `npm run build`
- [ ] Test production build locally: `npm run preview`
- [ ] Deploy to Vercel/Netlify/Cloudflare Pages
- [ ] Configure custom domain (if applicable)
- [ ] Test live site
- [ ] Monitor Lighthouse scores

---

## Key Implementation Notes

### Astro Configuration (`astro.config.mjs`)
```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yoursite.com',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
```

### Font Loading Strategy
**Option 1: Self-hosted (Recommended)**
- Download fonts to `/public/fonts`
- Add @font-face declarations in `tokens.css`
- Use `font-display: swap`

**Option 2: Google Fonts**
- Add `<link>` tags in BaseLayout
- Specify `display=swap` parameter

### Image Optimization
- Use Astro's `<Image>` component for automatic optimization
- Images in `/src/content` are processed at build time
- Output formats: WebP with fallbacks
- Lazy loading enabled by default

### CSS Organization
1. **reset.css**: Normalize browser defaults
2. **tokens.css**: CSS custom properties only (no selectors)
3. **global.css**: Base styles, typography, utilities

Import order in BaseLayout:
```astro
<link rel="stylesheet" href="/styles/reset.css">
<link rel="stylesheet" href="/styles/tokens.css">
<link rel="stylesheet" href="/styles/global.css">
```

### Responsive Strategy
- Mobile-first CSS (base styles = mobile)
- Desktop overrides at `@media (min-width: 768px)`
- Use CSS custom properties for responsive values
- Test on real devices (iOS Safari, Android Chrome)

### Performance Targets
- **Lighthouse Performance:** 95+
- **First Contentful Paint:** <1s
- **Largest Contentful Paint:** <2.5s
- **Cumulative Layout Shift:** <0.1
- **Time to Interactive:** <3s

### Accessibility Checklist
- [ ] Semantic HTML (nav, main, article, footer)
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Alt text on all images
- [ ] Focus-visible styles
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA
- [ ] Links have descriptive text (no "click here")
- [ ] External links have `rel="noopener noreferrer"`

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] iOS Safari (iPhone)
- [ ] Android Chrome

---

## Common Pitfalls to Avoid

1. **Forgetting to filter draft posts:**
```typescript
   .filter(post => !post.data.draft)
```

2. **Not sorting blog posts by date:**
```typescript
   .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
```

3. **Missing alt text on images:**
   Always require alt text in markdown and components

4. **Hardcoding URLs:**
   Use relative paths and Astro's built-in routing

5. **Not testing mobile layout:**
   Test early and often on actual devices

6. **Forgetting hover vs. press states:**
   Use `@media (hover: hover)` for desktop, `@media (hover: none)` for mobile

7. **Not preloading fonts:**
   Add `<link rel="preload">` for critical fonts

8. **Incorrect line-height for project links on mobile:**
   Remember: 125% (desktop) vs 115% (mobile)

---

## Useful Commands
```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run astro check

# Format code (if using Prettier)
npm run format
```

---

## Future Enhancements (Post-MVP)

These can be added later without major refactoring:
- [ ] RSS feed for blog (`@astrojs/rss`)
- [ ] Search functionality
- [ ] Reading time estimates
- [ ] Tags/categories for blog posts
- [ ] Dark mode toggle
- [ ] View transitions (Astro supports this)
- [ ] Analytics (Plausible, Fathom, etc.)
- [ ] Newsletter signup form
- [ ] Contact form
- [ ] Related posts suggestions
- [ ] Table of contents for long posts
- [ ] Code syntax highlighting customization
- [ ] Image galleries/lightboxes

---

## Support & Resources

- **Astro Docs:** https://docs.astro.build
- **Astro Discord:** https://astro.build/chat
- **CSS Custom Properties:** https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **Markdown Guide:** https://www.markdownguide.org
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
