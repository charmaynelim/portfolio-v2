# Style Guide & Design Tokens

## Color Palette
```css
:root {
  /* Backgrounds */
  --color-bg-primary: #F2F2F2;

  /* Text */
  --color-text-primary: #333333;    /* Headings, links, main UI */
  --color-text-secondary: #666666;  /* Bio paragraph */
  --color-text-tertiary: #8D8D8D;   /* Dates, metadata */
  --color-text-body: #4D4D4D;       /* Blog/project content */

  /* UI Elements */
  --color-divider: #CCCCCC;
}
```

## Typography

### Font Families
```css
:root {
  --font-sans: 'Inter', -apple-system, system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'Courier New', monospace;
  --font-serif: 'Spectral', Georgia, serif;

  --font-weight-medium: 500;
  --font-weight-regular: 400;
}
```

### Type Scale

| Token | Font | Size (Desktop) | Size (Mobile) | Line Height | Weight | Color |
|-------|------|----------------|---------------|-------------|--------|-------|
| `--text-hero` | Inter | 18px | 22px | 125% | Medium | text-primary |
| `--text-bio` | Geist Mono | 14px | 16px | 125% | Medium | text-secondary |
| `--text-project-link` | Inter | 26px | 32px | 125% / 115% | Medium | text-primary |
| `--text-post-title` | Inter | 24px | 24px | 125% | Medium | text-primary |
| `--text-link` | Geist Mono | 14px | 16px | 125% | Medium | text-primary |
| `--text-site-name` | Inter | 12px | 12px | 125% | Medium | text-primary |
| `--text-metadata` | Geist Mono | 10px | 10px | 125% | Medium | text-tertiary |
| `--text-body` | Spectral | 16px | 16px | 1.5 | Regular | text-body |

### CSS Custom Properties (Desktop)
```css
:root {
  /* Hero */
  --font-hero: var(--font-sans);
  --font-size-hero: 18px;
  --line-height-hero: 1.25;
  --font-weight-hero: var(--font-weight-medium);

  /* Bio */
  --font-bio: var(--font-mono);
  --font-size-bio: 14px;
  --line-height-bio: 1.25;
  --font-weight-bio: var(--font-weight-medium);

  /* Project Link */
  --font-project-link: var(--font-sans);
  --font-size-project-link: 26px;
  --line-height-project-link: 1.25;
  --font-weight-project-link: var(--font-weight-medium);

  /* Post Title */
  --font-post-title: var(--font-sans);
  --font-size-post-title: 24px;
  --line-height-post-title: 1.25;
  --font-weight-post-title: var(--font-weight-medium);

  /* Links */
  --font-link: var(--font-mono);
  --font-size-link: 14px;
  --line-height-link: 1.25;
  --font-weight-link: var(--font-weight-medium);

  /* Site Name */
  --font-site-name: var(--font-sans);
  --font-size-site-name: 12px;
  --line-height-site-name: 1.25;
  --font-weight-site-name: var(--font-weight-medium);

  /* Metadata */
  --font-metadata: var(--font-mono);
  --font-size-metadata: 10px;
  --line-height-metadata: 1.25;
  --font-weight-metadata: var(--font-weight-medium);

  /* Body */
  --font-body: var(--font-serif);
  --font-size-body: 16px;
  --line-height-body: 1.5;
  --font-weight-body: var(--font-weight-regular);
}
```

### Mobile Overrides
```css
@media (max-width: 767px) {
  :root {
    --font-size-hero: 22px;
    --font-size-bio: 16px;
    --font-size-project-link: 32px;
    --line-height-project-link: 1.15;
    --font-size-link: 16px;
  }
}
```

## Spacing System
```css
:root {
  /* Container Padding */
  --padding-container-horizontal: 44px;
  --padding-container-vertical: 44px;
  --padding-container-mobile-horizontal: 20px;
  --padding-container-mobile-top: 40px;
  --padding-container-mobile-bottom: 20px;

  /* Vertical Rhythm */
  --spacing-section: 120px;
  --spacing-section-mobile: 80px;

  /* Content Spacing */
  --spacing-paragraph: 12px;
  --spacing-image: 24px;

  /* Footer */
  --spacing-footer-links-mobile: 20px;
  --padding-footer-bottom: 20px;
}
```

## Layout
```css
:root {
  /* Container */
  --max-content-width: 500px;

  /* Icons */
  --icon-back-arrow-size: 20px;

  /* Dividers */
  --divider-height: 1px;
}
```

## Interactive States
```css
:root {
  --opacity-hover: 0.8;
  --opacity-press: 0.8;
}

/* All links underlined */
a {
  text-decoration: underline;
}

/* Desktop hover */
@media (hover: hover) {
  a:hover,
  .interactive:hover {
    opacity: var(--opacity-hover);
  }
}

/* Mobile press */
@media (hover: none) {
  a:active,
  .interactive:active {
    opacity: var(--opacity-press);
  }
}
```

## Responsive Breakpoints
```css
/* Mobile-first approach */
/* Base styles = mobile (0-767px) */

/* Tablet & Desktop */
@media (min-width: 768px) {
  /* Desktop styles here */
}
```

## Accessibility

- All text colors meet WCAG AA contrast standards
- Focus-visible states match hover states
- Semantic HTML with proper heading hierarchy
- External links use `rel="noopener noreferrer"`
