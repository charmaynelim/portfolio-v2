# Folder Structure

## Complete Directory Layout
```
/
├── public/
│   ├── fonts/
│   │   ├── inter/
│   │   │   ├── inter-medium.woff2
│   │   │   └── inter-medium.woff
│   │   ├── geist-mono/
│   │   │   ├── geist-mono-medium.woff2
│   │   │   └── geist-mono-medium.woff
│   │   └── spectral/
│   │       ├── spectral-regular.woff2
│   │       └── spectral-regular.woff
│   ├── icons/
│   │   └── arrow-left.svg
│   └── images/
│       └── (shared static images)
│
├── src/
│   ├── components/
│   │   ├── global/
│   │   │   ├── SiteHeader.astro
│   │   │   ├── BackArrow.astro
│   │   │   ├── ContentContainer.astro
│   │   │   └── HorizontalDivider.astro
│   │   │
│   │   ├── homepage/
│   │   │   ├── HeroSection.astro
│   │   │   ├── ProjectList.astro
│   │   │   ├── ProjectListItem.astro
│   │   │   └── Footer.astro
│   │   │
│   │   └── blog/
│   │       ├── BlogPostList.astro
│   │       ├── BlogPostListItem.astro
│   │       ├── PostMetadata.astro
│   │       ├── PostTitle.astro
│   │       └── PostBody.astro
│   │
│   ├── content/
│   │   ├── config.ts
│   │   │
│   │   ├── blog/
│   │   │   ├── images/
│   │   │   │   └── (blog post images)
│   │   │   ├── example-post-1.md
│   │   │   └── example-post-2.md
│   │   │
│   │   └── projects/
│   │       ├── images/
│   │       │   └── (project images)
│   │       ├── chinese-app.md
│   │       └── conversations.md
│   │
│   ├── data/
│   │   └── homepage.json
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── HomeLayout.astro
│   │   ├── BlogLayout.astro
│   │   └── ProjectLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── a-chinese-app-for-heritage-learners.astro
│   │   ├── some-conversations-dont-wait.astro
│   │   └── log/
│   │       ├── index.astro
│   │       └── [slug].astro
│   │
│   ├── styles/
│   │   ├── reset.css
│   │   ├── tokens.css
│   │   └── global.css
│   │
│   └── utils/
│       └── helpers.ts
│
├── specs/
│   ├── 00-context.md
│   ├── 01-architecture.md
│   ├── 02-style-guide.md
│   ├── 03-components.md
│   ├── 04-content-model.md
│   ├── 05-folder-structure.md
│   ├── 06-implementation.md
│   └── README.md
│
├── .gitignore
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## Folder Explanations

### `/public`
Static assets served as-is (no processing).
- **`/fonts`**: Self-hosted font files (woff2 + woff fallback)
- **`/icons`**: SVG icons (back arrow)
- **`/images`**: Shared static images (if any)

### `/src/components`
Reusable Astro components organized by scope.
- **`/global`**: Used across multiple page types
- **`/homepage`**: Homepage-specific components
- **`/blog`**: Blog-related components (also used for projects)

### `/src/content`
Markdown files for blog posts and projects (Astro Content Collections).
- **`config.ts`**: Defines content collection schemas
- **`/blog`**: Blog post markdown files + images subfolder
- **`/projects`**: Project markdown files + images subfolder

### `/src/data`
JSON data files (homepage content, social links).

### `/src/layouts`
Page templates that wrap content.
- **`BaseLayout.astro`**: Root layout (HTML structure, fonts, global styles)
- **`HomeLayout.astro`**: Extends BaseLayout, includes Footer
- **`BlogLayout.astro`**: Extends BaseLayout, includes SiteHeader + BackArrow
- **`ProjectLayout.astro`**: Extends BaseLayout, includes SiteHeader + BackArrow

### `/src/pages`
File-based routing (each file = a route).
- **`index.astro`**: Homepage (`/`)
- **`*.astro`**: Static project pages
- **`/log/index.astro`**: Blog index (`/log`)
- **`/log/[slug].astro`**: Dynamic blog post route (`/log/*`)

### `/src/styles`
Global CSS files.
- **`reset.css`**: CSS reset/normalize
- **`tokens.css`**: CSS custom properties (design tokens)
- **`global.css`**: Base styles, typography, utilities

### `/src/utils`
Helper functions (date formatting, etc.).

### `/specs`
Source-of-truth documentation (this directory!).

---

## File Naming Conventions

- **Components:** PascalCase (e.g., `SiteHeader.astro`)
- **Pages:** kebab-case (e.g., `a-chinese-app-for-heritage-learners.astro`)
- **Content:** kebab-case (e.g., `example-post-1.md`)
- **Styles:** kebab-case (e.g., `tokens.css`)
- **Utils:** camelCase (e.g., `helpers.ts`)

---

## Git Ignore

`.gitignore` should include:
```
# Dependencies
node_modules/

# Build output
dist/
.astro/

# Environment variables
.env
.env.local
.env.*.local

# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/
*.sublime-workspace
```
