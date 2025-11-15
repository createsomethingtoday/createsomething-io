# Quick Start Guide

## Landing Page Implementation

This guide will help you run and test the newly implemented landing page based on the Webflow inspiration with an inverse (dark) color scheme.

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Cloudflare account (for deployment)
- D1 database configured

## Installation

```bash
# Install dependencies
npm install

# Or with pnpm
pnpm install
```

## Development

### Start Development Server

```bash
npm run dev
```

The site will be available at: `http://localhost:3000`

### What You'll See

1. **Navigation Header** - Fixed top navigation with logo and menu
2. **Hero Section** - Newsletter badge + scattered featured paper cards
3. **Category Section** - Grid of categories with article counts
4. **Papers Grid** - Latest articles in a responsive grid
5. **Footer** - Newsletter signup + links + social icons

## Database Setup

### Required Tables

The landing page expects a `papers` table with these fields:

```sql
CREATE TABLE papers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  content TEXT,
  html_content TEXT,
  reading_time INTEGER,
  difficulty_level TEXT,
  technical_focus TEXT,
  published_on TEXT,
  excerpt_short TEXT,
  excerpt_long TEXT,
  slug TEXT UNIQUE,
  featured INTEGER DEFAULT 0,
  published INTEGER DEFAULT 0,
  is_hidden INTEGER DEFAULT 0,
  archived INTEGER DEFAULT 0,
  date TEXT,
  excerpt TEXT,
  description TEXT,
  ascii_art TEXT,
  created_at TEXT,
  updated_at TEXT,
  published_at TEXT
);
```

### Sample Data

To see the landing page in action, add some sample papers:

```sql
INSERT INTO papers (
  id, title, category, slug, reading_time, featured, published,
  is_hidden, archived, ascii_art, created_at, updated_at
) VALUES (
  '1',
  'Getting Started with TanStack Start',
  'development',
  'getting-started-tanstack-start',
  5,
  1,
  1,
  0,
  0,
  '   _____ _____ \n  |_   _/ ____|\n    | || (___  \n    | | \\___ \ \n   _| |_____) |\n  |_____|____/ ',
  datetime('now'),
  datetime('now')
);
```

## File Structure

```
src/
├── components/
│   ├── Navigation.tsx       ← New navigation header
│   ├── HeroSection.tsx      ← New hero with featured cards
│   ├── CategorySection.tsx  ← New category browser
│   ├── PaperCard.tsx        ← Updated card design
│   ├── PapersGrid.tsx       ← Updated grid layout
│   └── Footer.tsx           ← New footer component
├── routes/
│   └── index.tsx            ← Updated home page
└── types/
    └── paper.ts             ← Paper interface
```

## Color Scheme

The landing page uses an **inverse** color scheme:

- Background: `#000000` (black)
- Cards: `#111111` (very dark gray)
- Text: `#ffffff` (white)
- Borders: `rgba(255,255,255,0.1)` (subtle white)

See `COLOR_SCHEME_GUIDE.md` for complete details.

## Build for Production

```bash
# Build the application
npm run build

# Preview production build locally
npm run preview
```

## Deploy to Cloudflare

```bash
# Deploy to Cloudflare Workers
npm run deploy

# Or with wrangler CLI
wrangler pages deploy dist/client
```

### Environment Variables

Set these in your Cloudflare dashboard or `.dev.vars`:

```env
# D1 Database binding
DB=<your-d1-database-name>

# KV Namespaces (if needed)
SESSIONS=<your-sessions-kv>
CACHE=<your-cache-kv>

# R2 Bucket (if needed)
STORAGE=<your-r2-bucket>
```

## Testing Checklist

### Visual Testing
- [ ] Navigation appears and is fixed to top
- [ ] Logo and menu items are visible
- [ ] Hero section shows newsletter badge
- [ ] Featured cards appear in scattered layout (desktop)
- [ ] Categories display in grid format
- [ ] Paper cards show in responsive grid
- [ ] Footer appears with all sections

### Responsive Testing
- [ ] Mobile (< 640px): Single column layout
- [ ] Tablet (640-1024px): 2-3 column layout
- [ ] Desktop (> 1024px): 3-4 column layout
- [ ] Navigation collapses to hamburger on mobile
- [ ] Featured cards switch to simple stack on mobile

### Interaction Testing
- [ ] Navigation links work
- [ ] Paper cards link to detail pages
- [ ] Category cards link to category pages
- [ ] Hover effects work on all interactive elements
- [ ] Mobile menu opens and closes
- [ ] Newsletter form can be submitted

### Animation Testing
- [ ] Page loads with staggered animations
- [ ] Scroll triggers fire for categories and grid
- [ ] Hover effects are smooth
- [ ] No layout shifts during animations

## Common Issues & Solutions

### Issue: Cards not displaying
**Solution**: Check D1 database connection and ensure papers exist with `published = 1`

### Issue: Animations not working
**Solution**: Verify Framer Motion is installed: `npm install framer-motion`

### Issue: Styles not applying
**Solution**: Ensure Tailwind CSS v4 is configured correctly in `tailwind.config.ts`

### Issue: ASCII art not showing
**Solution**: Check that papers have `ascii_art` field populated in database

### Issue: Categories empty
**Solution**: Verify papers have `category` field set and are published

## Performance Tips

### Optimize Images
If you add images to paper cards:
```tsx
<img loading="lazy" ... />
```

### Lazy Load Components
For large paper collections:
```tsx
const PapersGrid = lazy(() => import('./PapersGrid'))
```

### Reduce Animation Delays
For faster page loads:
```tsx
transition={{ duration: 0.3 }} // Instead of 0.6
```

## Customization

### Change Colors
Edit Tailwind classes in components:
```tsx
// From black to another color
className="bg-black" → className="bg-[#1a1a2e]"
```

### Modify Grid Columns
In `PapersGrid.tsx`:
```tsx
// Change from 4 to 3 columns max
className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
```

### Adjust Card Rotation
In `PaperCard.tsx`:
```tsx
// Reduce rotation angle
rotation={rotations[index % rotations.length] * 0.5}
```

### Hide Hero Featured Cards
In `index.tsx`:
```tsx
// Don't pass featured papers
<HeroSection featuredPapers={[]} />
```

## Documentation

- `LANDING_PAGE_IMPLEMENTATION.md` - Full implementation details
- `COLOR_SCHEME_GUIDE.md` - Complete color palette and usage
- `COMPONENT_ARCHITECTURE.md` - Component structure and data flow

## Support

### Debug Mode
Enable verbose logging:
```tsx
// In index.tsx loader
console.log('Papers:', papers.length)
console.log('Categories:', categories)
```

### Check Database
Verify data exists:
```sql
SELECT COUNT(*) FROM papers WHERE published = 1;
SELECT category, COUNT(*) FROM papers GROUP BY category;
```

### Inspect Network
Check browser DevTools → Network tab for failed requests

## Next Steps

1. Add more papers to the database
2. Implement category filtering
3. Create individual paper detail pages
4. Set up newsletter email capture
5. Add search functionality
6. Configure SEO meta tags
7. Set up analytics tracking

## Resources

- [TanStack Start Docs](https://tanstack.com/start)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Webflow Inspiration](./inspiration/index.html)

## Success!

If you see the landing page with the dark theme, navigation, hero section, categories, and paper grid - you're all set! The implementation matches the Webflow inspiration with an inverse color scheme for a modern, professional look.
