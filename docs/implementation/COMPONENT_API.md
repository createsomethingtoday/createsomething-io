# Component API Documentation

## PaperCard Component

Modern card component with tilted design, hover effects, and rich metadata display.

### Import

```tsx
import { PaperCard } from '../components/PaperCard'
```

### Props Interface

```typescript
interface PaperCardProps {
  paper: Paper           // Required: Paper data from D1
  rotation?: number      // Optional: Card rotation in degrees (default: 0)
  index?: number         // Optional: Index for animation delay (default: 0)
}
```

### Paper Type

```typescript
interface Paper {
  id: string
  title: string
  category: string
  content: string
  reading_time: number
  difficulty_level?: string      // 'Beginner' | 'Intermediate' | 'Advanced'
  technical_focus?: string       // Comma-separated tags
  excerpt_short?: string
  slug: string
  // ... additional fields
}
```

### Usage Examples

#### Basic Usage

```tsx
<PaperCard paper={paperData} />
```

#### With Rotation

```tsx
<PaperCard
  paper={paperData}
  rotation={-15}  // Tilt left 15 degrees
/>
```

#### In a Grid with Animation Delay

```tsx
{papers.map((paper, index) => (
  <PaperCard
    key={paper.id}
    paper={paper}
    rotation={rotations[index % rotations.length]}
    index={index}
  />
))}
```

### Card Sections

1. **ASCII Art Area** (aspect-[4/3])
   - Black background
   - Placeholder ASCII art (to be generated)
   - Centered pre-formatted text

2. **Content Area** (p-6)
   - Paper title (text-xl, 2-line clamp)
   - Metadata (category, reading time)
   - Difficulty badge with color coding
   - Short excerpt (2-line clamp)
   - Technical tags (first 3 shown)

### Hover Effects

- Scale: 1.05
- Lift: -8px vertical translation
- Border: Brightens to white/30
- Shadow: Increases to 2xl
- Overlay: Gradient appears

### Category Display Names

Automatically mapped:
- `automation` → "Automation"
- `webflow` → "Webflow"
- `development` → "Development"

### Difficulty Colors

- **Beginner**: Green (text-green-400 / bg-green-400)
- **Intermediate**: Yellow (text-yellow-400 / bg-yellow-400)
- **Advanced**: Red (text-red-400 / bg-red-400)

### Rotation Recommendations

Subtle rotations work best:
- Hero cards: -8° to 12°
- Grid cards: -3° to 3°
- Alternating pattern: [-2, 2, -1, 1, -3, 3]

---

## PapersGrid Component

Main layout component with hero section and responsive grid.

### Import

```tsx
import { PapersGrid } from '../components/PapersGrid'
```

### Props Interface

```typescript
interface PapersGridProps {
  papers: Paper[]        // Required: Array of papers from D1
}
```

### Usage

```tsx
function HomePage() {
  const { papers } = Route.useLoaderData()
  return <PapersGrid papers={papers} />
}
```

### Layout Sections

#### 1. Hero Section

- **Papers shown**: First 2 papers
- **Layout**: Scattered/stacked positioning
- **Positioning**:
  - Card 1: left: 10%, top: 5%, rotation: -8deg
  - Card 2: left: 55%, top: 35%, rotation: 12deg
- **Height**: 600px container
- **Max width**: 5xl (64rem)

#### 2. Main Heading

- **Title**: "Create Something"
- **Size**: 6xl (md:8xl)
- **Weight**: Bold (700)
- **Subtitle**: Description of content
- **Spacing**: 20 margin bottom

#### 3. Grid Section

- **Papers shown**: All papers after first 2
- **Layout**: CSS Grid
- **Columns**:
  - Mobile: 1 column
  - Tablet (md): 2 columns
  - Desktop (lg): 4 columns
- **Gap**: 8 (2rem)
- **Background**: Gradient from black to #0a0a0a

#### 4. Section Header

- **Title**: "All Papers"
- **Size**: 4xl (md:5xl)
- **Accent**: White bar (1px h, 24px w, 20% opacity)

#### 5. Footer

- **Border**: Top border (white/10)
- **Padding**: 12 vertical, 6 horizontal
- **Content**: Tech stack attribution

### Empty State

Shown when `papers.length === 0`:
- Document emoji (📄)
- Heading: "No papers yet"
- Message: "Check back soon..."

### Responsive Behavior

#### Mobile (< 768px)
- Single column grid
- Hero cards stack vertically
- Reduced text sizes
- Full-width cards

#### Tablet (768px - 1024px)
- 2-column grid
- Hero cards side-by-side
- Medium text sizes
- Card spacing: 2rem

#### Desktop (1024px+)
- 4-column grid
- Full hero section
- Large text sizes
- Generous spacing

### Animation Patterns

#### Card Entrance
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: index * 0.1 }}
```

#### Section Entrance
```tsx
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
```

#### Hero Card Animation
```tsx
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
```

---

## Data Fetching Pattern

### Route Loader

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

### Component Usage

```typescript
function HomePage() {
  const { papers } = Route.useLoaderData()
  return <PapersGrid papers={papers} />
}
```

---

## Styling Conventions

### Spacing Scale
- sm: 0.5rem (2)
- md: 1rem (4)
- lg: 1.5rem (6)
- xl: 2rem (8)
- 2xl: 2.5rem (10)

### Color Opacity Scale
- 5: rgba(255, 255, 255, 0.05)
- 10: rgba(255, 255, 255, 0.1)
- 20: rgba(255, 255, 255, 0.2)
- 30: rgba(255, 255, 255, 0.3)
- 60: rgba(255, 255, 255, 0.6)
- 70: rgba(255, 255, 255, 0.7)

### Text Sizes
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 4xl: 2.25rem (36px)
- 6xl: 3.75rem (60px)
- 8xl: 6rem (96px)

---

## Performance Considerations

### Image Optimization
- ASCII art is text-based (no images)
- Placeholder uses pre-formatted text
- Future: Cache generated ASCII art

### Animation Performance
- Uses CSS transforms (GPU accelerated)
- Framer Motion for smooth transitions
- `will-change` applied automatically
- Reduced motion respects user preferences

### Data Loading
- Server-side data fetching (TanStack Router loader)
- Edge-optimized (Cloudflare Workers)
- D1 database queries at the edge
- No client-side data fetching overhead

---

## Accessibility

### Keyboard Navigation
- All cards are focusable
- Focus states visible (outline)
- Semantic HTML elements

### Screen Readers
- Proper heading hierarchy (h1, h2, h3)
- Article tags for cards
- Descriptive text for metadata

### Color Contrast
- White text on black: 21:1 (WCAG AAA)
- White/60 on black: Still exceeds AA
- Difficulty colors: High contrast

---

## Browser Support

- **Modern browsers**: Full support
- **Chrome/Edge**: 90+
- **Firefox**: 88+
- **Safari**: 14+

### Required Features
- CSS Grid
- CSS Transforms
- Custom Properties (CSS Variables)
- Intersection Observer (for animations)
- ES2020 JavaScript

---

## Testing

### Component Testing

```tsx
import { render, screen } from '@testing-library/react'
import { PaperCard } from './PaperCard'

test('renders paper title', () => {
  const paper = {
    id: '1',
    title: 'Test Paper',
    category: 'automation',
    reading_time: 10,
    // ... other fields
  }

  render(<PaperCard paper={paper} />)
  expect(screen.getByText('Test Paper')).toBeInTheDocument()
})
```

### Visual Regression Testing
- Recommended: Playwright with screenshots
- Test different viewports
- Test hover states
- Test empty states

---

## Troubleshooting

### Cards Not Appearing
1. Check D1 database connection
2. Verify papers have `published = 1`
3. Check console for errors
4. Verify loader is returning data

### Rotation Not Working
1. Ensure Framer Motion is installed
2. Check rotation value is number
3. Verify CSS transforms are supported
3. Check for conflicting CSS

### Styling Issues
1. Clear Tailwind build cache
2. Verify global.css is imported
3. Check CSS variable definitions
4. Inspect computed styles

---

## Future Enhancements

### Phase 2: ASCII Art
- Generate unique art per category
- Cache art in R2 bucket
- Multiple art variants
- Art customization options

### Phase 3: Interactivity
- Click to view full paper
- Modal/slide-out drawer
- Reading progress indicator
- Share functionality

### Phase 4: Advanced Features
- Search and filter
- Category pages
- Tag navigation
- Bookmarking system
- Reading lists

---

## Related Files

- `/src/components/PaperCard.tsx` - Card component
- `/src/components/PapersGrid.tsx` - Grid layout
- `/src/types/paper.ts` - TypeScript types
- `/src/global.css` - Global styles
- `/src/routes/index.tsx` - Homepage route
- `/schema.sql` - Database schema
- `/wrangler.toml` - Cloudflare config

---

## Support

For questions or issues:
- Check MODERN_REDESIGN_GUIDE.md
- Review TanStack Start docs
- Check Cloudflare Workers docs
- Open GitHub issue

---

**Last Updated**: 2025-11-14
**Version**: 2.0.0 (Modern Redesign)
