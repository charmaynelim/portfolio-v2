# Bug Fixes

## Portfolio Homepage

### Layout
- [x] Content container: left-aligned on desktop (currently centered)
- [x] Content container: full width on desktop (currently max-width 500px)
- [x] Hero section div: max-width 410px

### Footer
- [x] Footer links: remove default underline, only underline on hover/press
- [x] Footer links container: opaque background with color #F2F2F2
- [x] Footer links: add actual URLs that open in new tab
  - email → mailto:charmayne.lrs@gmail.com
  - linkedin → https://www.linkedin.com/in/charmayne-lim/
  - instagram → http://instagram.com/longformcharm
  - X → https://x.com/shortformcharm

### Project List
- [x] Add HorizontalDivider below "log / writing" item (currently missing)

### Content
- [x] Update bio text in homepage.json to: "with 0 to 1 experience in product & GTM. Employee #4 at HeyMax who helped scale to 6M+ ARR in SEA. Building at the edges. Based in Singapore (now SF) but hardly stays put."

---

## Global Components

### SiteHeader
- [x] "charmayne" link: remove underline (should not be underlined even though it's a link)
- [x] Margin below site header: 65px (currently 24px)

### BackArrow
- [x] Icon color: #333333

---

## Blog Post Page

### Spacing
- [x] Spacing between back arrow and metadata date: 40px
- [x] Margin below metadata date: 24px (currently 8px)

### Typography
- [x] H2 headers: font-size 20px, margin-top 16px

---

## Blog Index Page

### Spacing
- [x] Spacing between back arrow and blog list: 40px
- [x] Margin below metadata date in list items: 16px (currently 8px)
- [x] Margin below divider before next blog post: 40px

### Dividers
- [x] Add HorizontalDivider below last blog post item (currently missing)

---

## Reference
- Spacing values: specs/02-style-guide.md
- Content: specs/04-content-model.md
- Component specs: specs/03-components.md

---

## 💬 PROMPTS FOR CLAUDE CODE

### **Prompt 1: Homepage Fixes**
```
Read bugs.md and fix all items under "Portfolio Homepage" section.

Key changes:
1. ContentContainer on desktop: left-aligned, full width (remove max-width constraint)
2. Hero section: max-width 410px
3. Footer: remove default underline, add opaque background #F2F2F2, add actual links with target="_blank"
4. Add missing divider below "log / writing"
5. Update bio copy in homepage.json to match bugs.md exactly

Check off each item in bugs.md as completed.
```

---

### **Prompt 2: Global Component Fixes**
```
Read bugs.md and fix all items under "Global Components" section.

Changes:
1. SiteHeader: remove underline from "charmayne" link, set margin-bottom: 65px
2. BackArrow: ensure icon color is #333333

Check off items in bugs.md as completed.
```

---

### **Prompt 3: Blog Page Fixes**
```
Read bugs.md and fix all items under "Blog Post Page" and "Blog Index Page" sections.

Blog Post Page:
- Arrow to metadata spacing: 40px
- Metadata margin-bottom: 24px
- H2: font-size 20px, margin-top 16px

Blog Index Page:
- Arrow to list spacing: 40px
- Metadata margin-bottom: 16px
- Divider to next item spacing: 40px
- Add missing divider after last item

Check off items in bugs.md as completed.
```

---

### **Prompt 4: Final Verification**
```
All bugs.md items should now be complete. Please:

1. Verify each checkbox is marked complete
2. Test the following in browser:
   - Homepage: left-aligned, full width on desktop
   - Footer: underline only on hover, opaque background, links work
   - All dividers present (including last items)
   - Back arrow color correct
   - All spacing matches bugs.md values
3. Report any remaining issues.
```
