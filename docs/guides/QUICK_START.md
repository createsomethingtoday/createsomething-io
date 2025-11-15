# Quick Start Guide - Modern Card Layout

## What Changed?

### Before (Terminal Interface)
```
├── Terminal window frame
├── Command line interface
├── ASCII art in terminal
└── Text-based navigation
```

### After (Modern Card Layout)
```
├── Hero section with tilted cards
├── Responsive grid layout
├── Modern typography (Inter + JetBrains Mono)
└── Framer Motion animations
```

## File Structure

```
create-something-tanstack/
├── src/
│   ├── components/
│   │   ├── PaperCard.tsx          ✨ NEW - Individual card
│   │   ├── PapersGrid.tsx         ✨ NEW - Grid layout
│   │   ├── Terminal.tsx           ❌ DEPRECATED
│   │   └── TerminalExperience.tsx ❌ DEPRECATED
│   │
│   ├── routes/
│   │   ├── __root.tsx             ♻️  UPDATED - No terminal
│   │   ├── index.tsx              ♻️  UPDATED - D1 loader
│   │   └── api/
│   │       └── terminal.ts        🔧 KEPT - API still works
│   │
│   ├── types/
│   │   └── paper.ts               ✨ NEW - TypeScript types
│   │
│   └── global.css                 ♻️  UPDATED - Modern styles
│
├── schema.sql                     🔧 Database schema
├── seed-data.sql                  🔧 Sample data
├── wrangler.toml                  ✨ NEW - Cloudflare config
│
└── Documentation/
    ├── MODERN_REDESIGN_GUIDE.md   📚 Complete guide
    ├── COMPONENT_API.md           📚 API reference
    └── QUICK_START.md             📚 This file
```

## Setup in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Create D1 Database
```bash
# Create database
wrangler d1 create create-something-db

# Copy the database ID from output
# Update wrangler.toml with the ID
```

### 3. Run Migrations
```bash
# Apply schema
wrangler d1 execute create-something-db --file=./schema.sql

# Load sample data
wrangler d1 execute create-something-db --file=./seed-data.sql
```

### 4. Update wrangler.toml
```toml
[[d1_databases]]
binding = "DB"
database_name = "create-something-db"
database_id = "YOUR_DATABASE_ID_HERE"  # ← Replace this
```

### 5. Start Development
```bash
npm run dev
```

Visit: http://localhost:3000

## What You'll See

### Hero Section
```
┌──────────────────────────────────────┐
│                                      │
│     Create Something                 │
│     Technical papers on...           │
│                                      │
│    ┌─────────┐                      │
│    │ Card 1  │  (rotated -8°)       │
│    │ Paper   │                      │
│    └─────────┘                      │
│         ┌─────────┐                 │
│         │ Card 2  │  (rotated 12°)  │
│         │ Paper   │                 │
│         └─────────┘                 │
│                                      │
└──────────────────────────────────────┘
```

### Grid Section
```
┌─────────────────────────────────────┐
│  All Papers                          │
│  ─────                               │
│                                      │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐   │
│  │ 3  │  │ 4  │  │ 5  │  │ 6  │   │
│  └────┘  └────┘  └────┘  └────┘   │
│                                      │
└─────────────────────────────────────┘
```

## Card Anatomy

```
┌─────────────────────────┐
│                         │
│   ASCII ART AREA        │  ← aspect-[4/3]
│   [Placeholder]         │     Black bg
│                         │     Centered
├─────────────────────────┤
│ Paper Title             │  ← text-xl, bold
│ Category • 15 min read  │  ← text-sm, white/60
│ ● Intermediate          │  ← Difficulty badge
│                         │
│ Short excerpt text      │  ← 2-line clamp
│ describing the paper... │
│                         │
│ [Tag1] [Tag2] [Tag3]    │  ← Technical tags
└─────────────────────────┘
```

## Key Features

### 1. Responsive Design
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 4 columns

### 2. Hover Effects
- Card lifts 8px
- Scales to 105%
- Border brightens
- Shadow increases

### 3. Animations
- Staggered entrance
- Smooth transitions
- GPU-accelerated

### 4. Accessibility
- Semantic HTML
- Keyboard navigation
- High contrast (21:1)
- Screen reader friendly

## Common Tasks

### Add a New Paper

#### Option 1: Direct SQL
```sql
INSERT INTO papers (
  title, category, content, reading_time,
  difficulty_level, excerpt_short, slug
) VALUES (
  'My New Paper',
  'development',
  'Full content here...',
  12,
  'Intermediate',
  'Short description',
  'my-new-paper'
);
```

#### Option 2: Via Wrangler
```bash
wrangler d1 execute create-something-db \
  --command="INSERT INTO papers (title, category, slug) VALUES ('Test', 'automation', 'test')"
```

### Change Card Rotation

```tsx
// In PapersGrid.tsx, update rotation array:
const rotations = [-2, 2, -1, 1, -3, 3, -2, 2]
//                 ↑ Change these values (-30 to 30)
```

### Customize Colors

```css
/* In global.css */
:root {
  --bg-primary: #000000;      /* Change background */
  --text-primary: #ffffff;    /* Change text */
  --border-primary: rgba(255, 255, 255, 0.1);  /* Change borders */
}
```

### Adjust Grid Columns

```tsx
// In PapersGrid.tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                                            ↑ Change to 3, 5, 6, etc.
```

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Cloudflare
```bash
npm run deploy
```

### Environment Variables
Set in Cloudflare Dashboard:
- D1 Database binding: `DB`
- KV Namespace: `SESSIONS`, `CACHE`
- R2 Bucket: `STORAGE`

## Troubleshooting

### Issue: No papers showing
**Solution**:
```bash
# Check database
wrangler d1 execute create-something-db --command="SELECT * FROM papers"

# Verify published flag
wrangler d1 execute create-something-db --command="UPDATE papers SET published = 1"
```

### Issue: Build fails
**Solution**:
```bash
# Clear cache and rebuild
rm -rf node_modules dist .vite
npm install
npm run build
```

### Issue: Styles not loading
**Solution**:
1. Check `global.css` is imported in `__root.tsx`
2. Verify Tailwind config exists
3. Clear browser cache
4. Check for CSS syntax errors

### Issue: Database not found
**Solution**:
```bash
# List databases
wrangler d1 list

# Check binding in wrangler.toml
# Ensure database_id matches
```

## Development Tips

### 1. Use TypeScript
Every component has full type safety with the `Paper` interface.

### 2. Test Locally
```bash
# Use local D1 database
wrangler dev --local --persist

# Or use remote database
wrangler dev --remote
```

### 3. Debug D1 Queries
```typescript
// Add console.log in loader
const result = await env.DB.prepare(`...`).all()
console.log('Papers:', result.results)
```

### 4. Preview Changes
```bash
# Build and preview
npm run preview
```

### 5. Hot Reload
Development server has hot reload enabled:
- Component changes: Instant
- CSS changes: Instant
- Route changes: Page reload

## Next Steps

1. ✅ Review MODERN_REDESIGN_GUIDE.md for full details
2. ✅ Check COMPONENT_API.md for component docs
3. ✅ Customize colors and spacing
4. ✅ Add your own papers
5. ✅ Deploy to Cloudflare

## Resources

- **TanStack Start**: https://tanstack.com/start
- **Cloudflare D1**: https://developers.cloudflare.com/d1
- **Framer Motion**: https://www.framer.com/motion
- **Tailwind CSS v4**: https://tailwindcss.com

## Support

- GitHub Issues: Report bugs
- Documentation: See `/docs`
- Community: TanStack Discord

---

**Status**: ✅ Production Ready
**Version**: 2.0.0 - Modern Redesign
**Last Updated**: 2025-11-14

---

## Visual Reference

### Color Palette
```
Background:  #000000 ███████████
Secondary:   #0a0a0a ███████████
Tertiary:    #111111 ███████████

Text:        #ffffff ███████████
Muted:       #a0a0a0 ███████████
Subtle:      #666666 ███████████

Beginner:    #4ade80 ███████████
Intermediate:#facc15 ███████████
Advanced:    #f87171 ███████████
```

### Typography Stack
```
Headings:  Inter (700-900)
Body:      Inter (400-600)
Code:      JetBrains Mono (400-600)
```

### Spacing Scale
```
xs:  0.5rem  ────
sm:  1.0rem  ────────
md:  1.5rem  ────────────
lg:  2.0rem  ────────────────
xl:  2.5rem  ──────────────────
2xl: 3.0rem  ────────────────────
```

Happy building! 🚀
