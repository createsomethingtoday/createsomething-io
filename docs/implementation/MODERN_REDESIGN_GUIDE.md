# Modern Card-Based Redesign Guide

## Overview

This project has been completely redesigned from a terminal-based interface to a modern, award-worthy card-based layout inspired by high-end Webflow templates. The new design features:

- **No terminal elements** - Clean, modern web interface
- **Card-based layout** - Inspired by Webflow Cloud.lab template
- **Tilted/rotated cards** - Dynamic CSS transforms for visual interest
- **Black & white theme** - Inverted Webflow aesthetic
- **ASCII art placeholders** - To be generated in next phase
- **Responsive grid** - Mobile-first approach

## Architecture

### Component Structure

```
src/
├── components/
│   ├── PaperCard.tsx       # Individual paper card component
│   └── PapersGrid.tsx      # Grid layout with hero section
├── routes/
│   ├── __root.tsx          # Root layout (no terminal)
│   └── index.tsx           # Homepage with D1 data fetching
├── types/
│   └── paper.ts            # TypeScript interfaces
└── global.css              # Modern styling (no terminal theme)
```

### Key Components

#### 1. PaperCard.tsx

Modern card component with:
- CSS transform rotations (-15deg to 15deg)
- Hover effects (lift, scale, shadow)
- Metadata display (category, reading time, difficulty)
- ASCII art placeholder (top section)
- Technical tags
- Responsive design

**Props:**
```typescript
interface PaperCardProps {
  paper: Paper           // Paper data from D1
  rotation?: number      // Card rotation in degrees (-30 to 30)
  index?: number         // Index for staggered animations
}
```

**Usage:**
```tsx
<PaperCard
  paper={paperData}
  rotation={-15}
  index={0}
/>
```

#### 2. PapersGrid.tsx

Main layout component featuring:
- Hero section with scattered/stacked cards
- Responsive grid (1/2/4 columns)
- Section headers
- Empty state handling
- Footer

**Props:**
```typescript
interface PapersGridProps {
  papers: Paper[]        // Array of papers from D1
}
```

**Usage:**
```tsx
<PapersGrid papers={allPapers} />
```

## Color Scheme

```css
/* Backgrounds */
--bg-primary: #000000      /* Pure black */
--bg-secondary: #0a0a0a    /* Very dark gray */
--bg-tertiary: #111111     /* Card backgrounds */

/* Text */
--text-primary: #ffffff    /* Pure white */
--text-secondary: #e0e0e0  /* Light gray */
--text-tertiary: #a0a0a0   /* Medium gray */

/* Borders */
--border-primary: rgba(255, 255, 255, 0.1)   /* Subtle borders */
--border-hover: rgba(255, 255, 255, 0.3)     /* Hover state */

/* Shadows */
--shadow-2xl: 0 25px 50px -12px rgba(255, 255, 255, 0.25)
```

## Typography

- **Headings:** Inter (700-900 weight)
- **Body:** Inter (400-600 weight)
- **Code:** JetBrains Mono

### Font Loading
Fonts are loaded from Google Fonts in `global.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
```

## Data Fetching

### D1 Database Integration

The homepage uses TanStack Router's loader pattern to fetch papers:

```typescript
export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    const env = (context as any).env as Env

    const result = await env.DB.prepare(`
      SELECT * FROM papers
      WHERE published = 1 AND is_hidden = 0 AND archived = 0
      ORDER BY featured DESC, created_at DESC
    `).all()

    return { papers: result.results as Paper[] }
  }
})
```

### Environment Setup

1. **Create D1 Database:**
```bash
wrangler d1 create create-something-db
```

2. **Run Migrations:**
```bash
wrangler d1 execute create-something-db --file=./schema.sql
wrangler d1 execute create-something-db --file=./seed-data.sql
```

3. **Update wrangler.toml:**
Replace placeholder IDs with your actual Cloudflare resource IDs.

## Layout Patterns

### Hero Section
- 2 featured cards
- Scattered positioning with rotation
- Absolute positioning for layered effect
- Large format for visual impact

### Grid Section
- 4-column layout on desktop
- 2-column on tablet
- 1-column on mobile
- Alternating rotation angles
- Consistent spacing

## Animation Strategy

### Entrance Animations
- Staggered fade-in for cards
- Delay based on index: `delay: index * 0.1`
- Smooth opacity and y-translation

### Hover Effects
```tsx
whileHover={{
  scale: 1.05,
  y: -8,
  transition: { duration: 0.2 }
}}
```

### Page Transitions
- Smooth fade-in on page load
- CSS animation: `pageEnter 0.4s ease-out`

## Responsive Breakpoints

```css
/* Mobile First */
grid-cols-1              /* Default (mobile) */
md:grid-cols-2           /* 768px+ (tablet) */
lg:grid-cols-4           /* 1024px+ (desktop) */
```

## Development Workflow

### 1. Start Development Server
```bash
npm run dev
```

### 2. Build for Production
```bash
npm run build
```

### 3. Deploy to Cloudflare
```bash
npm run deploy
```

## Component API Reference

### PaperCard

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| paper | Paper | required | Paper data object |
| rotation | number | 0 | Card rotation in degrees |
| index | number | 0 | Index for animation delay |

### PapersGrid

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| papers | Paper[] | required | Array of paper objects |

## Design Inspiration

Based on Webflow Cloud.lab template:
- Monochromatic grayscale (inverted to black/white)
- Tilted card layouts with CSS transforms
- Grid systems: 4-column and 2-column
- Card anatomy: image top, metadata below
- Hero section: scattered/stacked cards
- Typography: Inter + monospace combo
- Spacing: 7.5rem sections, 2.5rem headlines
- Subtle border radius: 6-16px

## Next Steps

### Phase 2: ASCII Art Generation
- Generate unique ASCII art for each paper category
- Implement art caching strategy
- Add art variants for visual diversity

### Phase 3: Interactivity
- Click to view full paper
- Search and filter functionality
- Category navigation
- Reading progress tracking

### Phase 4: Performance
- Image optimization
- Code splitting
- Lazy loading
- Edge caching strategies

## Best Practices

1. **Always use TypeScript** - Full type safety with Paper interface
2. **Leverage TanStack Router** - Server-side data fetching
3. **Mobile-first design** - Start with mobile, enhance for desktop
4. **Framer Motion** - Consistent animations across components
5. **Cloudflare Workers** - Edge-native architecture
6. **D1 Database** - SQLite at the edge

## Troubleshooting

### Database Not Found
```bash
# Check D1 databases
wrangler d1 list

# Verify binding in wrangler.toml
wrangler d1 info create-something-db
```

### Build Errors
```bash
# Clear node_modules and rebuild
rm -rf node_modules
npm install
npm run build
```

### Styling Issues
```bash
# Verify Tailwind is processing
# Check tailwind.config.js
# Ensure @tailwind directives in global.css
```

## Resources

- [TanStack Start Documentation](https://tanstack.com/start)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1)
- [Framer Motion Docs](https://www.framer.com/motion)
- [Tailwind CSS v4 Docs](https://tailwindcss.com)

## License

MIT License - Create Something Agency
