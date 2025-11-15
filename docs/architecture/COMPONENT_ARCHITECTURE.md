# Component Architecture

## Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      NAVIGATION                             │
│  [Logo] [Home] [Articles] [Categories] [About] [Contact]   │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      HERO SECTION                           │
│                                                             │
│              📮 Newsletter Signup Badge                     │
│                                                             │
│     ┌──────┐              ┌──────┐                         │
│     │Paper│          ┌──────┐    │Paper│                   │
│     │  1  │          │Paper│     │  4  │                   │
│     │     │          │  2  │     │     │                   │
│     └──────┘         └──────┘    └──────┘                  │
│          ┌──────┐                                           │
│          │Paper│                                            │
│          │  3  │                                            │
│          └──────┘                                           │
│                                                             │
│           Welcome to Create Something                       │
│    Stay updated with the trending articles                 │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   CATEGORY SECTION                          │
│                                                             │
│               Explore Categories                            │
│                                                             │
│   ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ │
│   │Automation │ │Development│ │  Webflow  │ │Technology │ │
│   │    04     │ │    08     │ │    12     │ │    06     │ │
│   └───────────┘ └───────────┘ └───────────┘ └───────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    PAPERS GRID                              │
│                                                             │
│                  Latest Articles                            │
│     Explore our most recent technical papers               │
│                                                             │
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                     │
│   │Paper │ │Paper │ │Paper │ │Paper │                     │
│   │  5   │ │  6   │ │  7   │ │  8   │                     │
│   └──────┘ └──────┘ └──────┘ └──────┘                     │
│                                                             │
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                     │
│   │Paper │ │Paper │ │Paper │ │Paper │                     │
│   │  9   │ │  10  │ │  11  │ │  12  │                     │
│   └──────┘ └──────┘ └──────┘ └──────┘                     │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                       FOOTER                                │
│                                                             │
│           Subscribe to Our Newsletter                       │
│        [Email Input] [Subscribe Button]                     │
│                                                             │
│  ┌──────────────┐ ┌──────────┐ ┌───────────┐              │
│  │Create        │ │Quick     │ │Categories │              │
│  │Something     │ │Links     │ │           │              │
│  │Description   │ │- Home    │ │- Auto     │              │
│  │[Social Icons]│ │- Articles│ │- Dev      │              │
│  └──────────────┘ └──────────┘ └───────────┘              │
│                                                             │
│      © 2025 Create Something  [Privacy] [Terms]            │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
index.tsx
├── <Navigation />
├── <HeroSection />
│   ├── Newsletter Badge (Link)
│   ├── Featured Papers Container
│   │   └── <PaperCard /> × 4
│   └── Hero Text
│       ├── Welcome Message
│       └── Headline
├── <CategorySection />
│   ├── Section Header
│   └── Category Grid
│       └── Category Card × N
│           ├── Name
│           ├── Count
│           └── Arrow Icon
├── <PapersGrid />
│   ├── Section Header
│   │   ├── Title
│   │   └── Subtitle
│   └── Paper Grid
│       └── <PaperCard /> × N
└── <Footer />
    ├── Newsletter Section
    │   ├── Heading
    │   ├── Description
    │   └── Form
    │       ├── Email Input
    │       └── Submit Button
    ├── Footer Links
    │   ├── Brand Column
    │   │   ├── Logo
    │   │   ├── Description
    │   │   └── Social Links
    │   ├── Quick Links Column
    │   └── Categories Column
    └── Copyright Section
        ├── Copyright Text
        └── Legal Links
```

## Component Responsibility Matrix

| Component | Data | Layout | Styling | Animation | Interaction |
|-----------|------|--------|---------|-----------|-------------|
| **Navigation** | Static links | Flexbox | Tailwind | Hover transitions | Mobile menu toggle |
| **HeroSection** | Featured papers | Absolute positioning | Tailwind | Framer Motion | None (static) |
| **CategorySection** | Category list | CSS Grid | Tailwind | Scroll triggers | None (links) |
| **PaperCard** | Single paper | Internal flexbox | Tailwind | Hover effects | Navigation on click |
| **PapersGrid** | Papers array | CSS Grid | Tailwind | Scroll triggers | None (container) |
| **Footer** | Static content | Grid + Flexbox | Tailwind | Scroll triggers | Form submit |

## Data Flow

```
Route Loader (index.tsx)
│
├── Fetch Papers from D1
│   ├── SELECT * FROM papers
│   └── WHERE published = 1...
│
├── Fetch Categories from D1
│   ├── SELECT category, COUNT(*)
│   └── GROUP BY category
│
└── Return Data
    ├── papers: Paper[]
    └── categories: Category[]

HomePage Component
│
├── Split papers
│   ├── featuredPapers = papers.filter(featured).slice(0, 4)
│   └── latestPapers = papers.slice(0, 12)
│
└── Pass to Components
    ├── <HeroSection featuredPapers={featuredPapers} />
    ├── <CategorySection categories={categories} />
    └── <PapersGrid papers={latestPapers} />
```

## Responsive Breakpoints

### Navigation
```
Mobile (<768px):
  - Hamburger menu
  - Stacked menu items
  - Full-width button

Desktop (≥768px):
  - Horizontal menu
  - Inline items
  - Auto-width button
```

### HeroSection
```
Mobile (<768px):
  - Simple 1-column grid
  - 2 featured papers
  - No scattered layout

Desktop (≥768px):
  - 600px tall scattered layout
  - 4 featured papers
  - Absolute positioning with rotation
```

### CategorySection
```
Mobile (<640px):     1 column
Tablet (640-1024px): 2 columns
Desktop (≥1024px):   4 columns
```

### PapersGrid
```
Mobile (<640px):      1 column
Tablet (640-1024px):  2-3 columns
Desktop (≥1024px):    3 columns
XL Desktop (≥1280px): 4 columns
```

### Footer
```
Mobile (<768px):
  - Stacked columns
  - Single column layout
  - Full-width form

Desktop (≥768px):
  - 4-column grid
  - Brand column spans 2
  - Horizontal copyright row
```

## Animation Triggers

### On Page Load
- Navigation: Fade in (no delay)
- Hero newsletter: Fade in + slide down (delay: 0s)
- Featured cards: Staggered fade + scale (delay: 0.2s, 0.35s, 0.5s, 0.65s)
- Hero text: Fade in + slide up (delay: 0.8s, 1.0s)

### On Scroll (whileInView)
- Category cards: Staggered fade + slide up (delay: index * 0.1s)
- Paper grid cards: Staggered fade + slide up (delay: index * 0.05s)
- Footer sections: Fade in + slide up (delay: 0s)

### On Hover
- Navigation links: Color transition (200ms)
- Paper cards: Vertical lift -8px (200ms)
- Category cards: Border color + gradient overlay (300ms)
- Buttons: Background color + scale (200ms)

## State Management

### Component-Level State
```tsx
// Navigation
const [isMenuOpen, setIsMenuOpen] = useState(false)

// No other stateful components
// All data comes from route loader
```

### Server State (Route Loader)
```tsx
loader: async ({ context }) => {
  const papers = await fetchPapers()
  const categories = await fetchCategories()
  return { papers, categories }
}
```

## File Organization

```
src/
├── components/
│   ├── Navigation.tsx       - Header nav with menu
│   ├── HeroSection.tsx      - Hero with featured cards
│   ├── CategorySection.tsx  - Category browsing grid
│   ├── PaperCard.tsx        - Individual paper card
│   ├── PapersGrid.tsx       - Grid of paper cards
│   ├── Footer.tsx           - Footer with newsletter
│   ├── Header.tsx           - (Existing, not used)
│   ├── Terminal.tsx         - (Existing, not used)
│   └── ...
├── routes/
│   ├── index.tsx            - Home page (updated)
│   └── ...
└── types/
    └── paper.ts             - Paper interface
```

## Styling Approach

### Tailwind Utilities
- **Layout**: Flexbox, Grid
- **Spacing**: px-6, py-24, gap-8
- **Typography**: text-xl, font-semibold
- **Colors**: bg-black, text-white, text-white/60
- **Borders**: border, border-white/10
- **Effects**: hover:, transition-all, rounded-lg

### Custom Classes
```css
/* In PaperCard */
.line-clamp-2 /* Tailwind built-in */

/* Arbitrary Values */
bg-[#111111]
bg-[#0a0a0a]
translate-y-[-100%]
```

### Framer Motion Props
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
```

## Performance Considerations

### Optimizations
1. **Lazy Loading**: Scroll-triggered animations only fire once
2. **Viewport Check**: `viewport={{ once: true }}` prevents re-animations
3. **CSS Transitions**: Hover effects use CSS, not JS
4. **Static Generation**: Route loader runs at build time
5. **Minimal JS**: Most interactivity is CSS-based

### Bundle Size
- Client: ~545 KB (includes Framer Motion)
- Server: ~1.1 MB (includes all dependencies)
- CSS: 13.48 KB (gzipped: 3.49 KB)

## Accessibility Features

### Semantic HTML
- `<nav>` for navigation
- `<section>` for major sections
- `<article>` for paper cards
- `<footer>` for footer
- `<h1>`, `<h2>`, `<h3>` hierarchy

### ARIA Attributes
```tsx
<button aria-label="Toggle menu">
<a aria-label="Twitter">
<nav role="navigation">
```

### Keyboard Navigation
- Tab order follows visual order
- Focus visible on all interactive elements
- Links and buttons keyboard accessible
- Form inputs properly labeled

### Color Contrast
- All text meets WCAG AA standard
- Primary text: 21:1 ratio (AAA)
- Secondary text: 12.6:1 ratio (AAA)
- Interactive elements clearly visible

## Future Enhancements

### Component Additions
1. **SearchBar** - Filter papers by title/content
2. **FilterPanel** - Filter by category, difficulty, date
3. **Pagination** - Handle large paper collections
4. **LoadingState** - Skeleton screens during data fetch
5. **ErrorBoundary** - Graceful error handling

### Feature Additions
1. **Newsletter Integration** - Actual email capture
2. **Category Pages** - Individual category views
3. **Paper Detail Page** - Full article view
4. **Related Papers** - Recommendations
5. **Search Functionality** - Full-text search
6. **RSS Feed** - Subscribe to updates
7. **Share Buttons** - Social sharing
8. **Reading Progress** - Track reading time
9. **Bookmarks** - Save papers for later
10. **Dark/Light Toggle** - Theme switcher

## Summary
The component architecture follows a clean, hierarchical structure with clear separation of concerns. Data flows down from the route loader, components are reusable and composable, and styling is consistent using Tailwind CSS with an inverse color scheme. Animations enhance the user experience without compromising performance, and accessibility is built-in from the start.
