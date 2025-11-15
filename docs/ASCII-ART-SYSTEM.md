# ASCII Art Generation System

**Status**: Production Ready
**Version**: 1.0.0
**Created**: November 14, 2025

---

## Overview

The ASCII Art Generation System provides high-quality, category-specific ASCII art for paper cards in the Create Something Terminal interface. Each paper displays custom ASCII art that visually represents its category using Unicode block characters (░▒▓█).

## Features

- **Category-Specific Templates**: Pre-designed ASCII art for each category
- **Configurable Dimensions**: Support for card (40x20) and thumbnail (20x10) sizes
- **Block Character Set**: Uses `░▒▓█` for optimal visual quality on dark backgrounds
- **Batch Generation**: Process multiple papers simultaneously
- **Database Storage**: ASCII art stored directly in D1 for fast retrieval
- **Zero External Dependencies**: No image processing libraries required

## Architecture

### Components

```
/src/services/ascii-generator.ts    # Core ASCII generation service
/scripts/generate-ascii-art.ts      # CLI tool for batch generation
/scripts/update-seed-ascii.sql      # SQL updates for seed data
/migrations/001_add_ascii_art.sql   # Database migration
```

### Database Schema

```sql
-- Papers table columns
ascii_art TEXT           -- Full-size ASCII art (40x20)
ascii_thumbnail TEXT     -- Thumbnail ASCII art (20x10)
```

## Category Templates

### Automation
```
Represents: Gears and workflow automation
Style: Connected gears with layered blocks
Used for: n8n, automation workflows, scheduled tasks
```

### Development
```
Represents: Code and terminal window
Style: Smiling code face with curly braces
Used for: Full-stack development, coding papers
```

### Infrastructure
```
Represents: Server stacks
Style: Three-tier server architecture
Used for: Terraform, cloud infrastructure, DevOps
```

### Webflow
```
Represents: Design palette
Style: Paint palette with brush
Used for: Webflow projects, no-code development
```

### Default
```
Represents: Document/paper icon
Style: Centered document shape
Used for: Papers without specific category
```

## Usage

### 1. Generate ASCII Art for All Papers

```bash
# Preview mode (doesn't save to database)
npm run generate-ascii -- --preview

# Generate and display SQL statements
npm run generate-ascii
```

### 2. Generate for Specific Paper

```bash
npm run generate-ascii -- --id=a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

### 3. Programmatic Usage

```typescript
import { generateASCIIArt, generateThumbnailASCII } from '@/services/ascii-generator';

// Generate full-size ASCII art
const asciiArt = generateASCIIArt('automation');

// Generate thumbnail
const thumbnail = generateThumbnailASCII('automation');

// Custom configuration
const customArt = generateASCIIArt('development', {
  width: 60,
  height: 30,
  charset: 'blocks',
  style: 'gradient'
});
```

### 4. Batch Generation

```typescript
import { batchGenerateASCII } from '@/services/ascii-generator';

const papers = [
  { id: '1', category: 'automation' },
  { id: '2', category: 'webflow' },
];

const results = batchGenerateASCII(papers);
// Returns: [{ id, category, ascii_art, ascii_thumbnail }, ...]
```

## Configuration

### Default Card Configuration

```typescript
export const CARD_ASCII_CONFIG: ASCIIConfig = {
  width: 40,      // characters wide
  height: 20,     // lines tall
  charset: 'blocks',  // ░▒▓█
  style: 'gradient'
};
```

### Character Sets

```typescript
const CHARSETS = {
  blocks: ['░', '▒', '▓', '█'],      // Best for dark backgrounds
  standard: ['.', ':', '+', '#', '@'], // Classic ASCII
  minimal: [' ', '.', 'o', 'O']       // Minimalist style
};
```

## Integration with Terminal

### Display ASCII in Paper Cards

```typescript
// In TerminalExperience.tsx or PaperCard component
interface Paper {
  id: number;
  title: string;
  category: string;
  ascii_art: string;  // Full ASCII art
  // ... other fields
}

// Render ASCII art
<pre className="font-mono text-xs leading-tight text-terminal-green">
  {paper.ascii_art}
</pre>
```

### Card Hover Effects

```typescript
// Apply category-specific colors on hover
const categoryColor = CATEGORY_COLORS[paper.category];

<div style={{
  color: isHovered ? categoryColor.color : '#00FF00',
  textShadow: isHovered ? `0 0 10px ${categoryColor.glow}` : '0 0 5px rgba(0, 255, 0, 0.3)'
}}>
  {paper.ascii_art}
</div>
```

## Database Operations

### Apply Migration

```bash
# Local development
wrangler d1 execute DB --file=./migrations/001_add_ascii_art.sql

# Production
wrangler d1 execute DB --remote --file=./migrations/001_add_ascii_art.sql
```

### Update Seed Data

```bash
# Apply ASCII art updates
wrangler d1 execute DB --file=./scripts/update-seed-ascii.sql
```

### Query Papers with ASCII Art

```sql
-- Get all papers with ASCII art
SELECT id, title, category, ascii_art
FROM papers
WHERE ascii_art IS NOT NULL;

-- Get specific paper
SELECT * FROM papers WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
```

## Performance Considerations

### Storage
- Full ASCII art: ~1.6 KB per paper (40 chars × 20 lines × 2 bytes)
- Thumbnail: ~400 bytes per paper
- Total for 100 papers: ~200 KB

### Retrieval Speed
- ASCII art stored in database (no external API calls)
- Retrieved with paper data in single query
- No processing required for display

### Caching
```typescript
// ASCII art is static and can be cached indefinitely
const cacheControl = 'public, max-age=31536000, immutable';
```

## Adding New Categories

### 1. Create Template

```typescript
// In src/services/ascii-generator.ts
const CATEGORY_TEMPLATES = {
  // ... existing categories

  yourcategory: `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░YOUR ASCII ART HERE░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
... (20 lines total, 40 chars each)
`
};
```

### 2. Test Template

```bash
npm run generate-ascii -- --preview
```

### 3. Update Database

```sql
UPDATE papers
SET ascii_art = '[your-ascii-art]'
WHERE category = 'yourcategory';
```

## Troubleshooting

### ASCII Art Not Displaying

**Problem**: ASCII art appears garbled or misaligned

**Solutions**:
1. Ensure monospace font is applied: `font-family: 'JetBrains Mono', monospace`
2. Set proper line height: `line-height: 1.2` or `leading-tight` in Tailwind
3. Use `white-space: pre` to preserve formatting
4. Check character encoding (UTF-8 required)

### Database Issues

**Problem**: ASCII art contains broken characters

**Solutions**:
1. Ensure database uses UTF-8 encoding
2. Escape single quotes in SQL: `'` → `''`
3. Use proper SQL escaping functions

### Display Issues

**Problem**: Cards show wrong ASCII art

**Solutions**:
1. Verify category mapping is correct
2. Check database has been updated with ASCII art
3. Clear browser cache
4. Restart development server

## Testing

### Visual Testing

```bash
# Generate preview of all ASCII art
npm run generate-ascii -- --preview

# Test specific category
npm run generate-ascii -- --id=a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

### Validation

```typescript
import { validateASCIIArt, CARD_ASCII_CONFIG } from '@/services/ascii-generator';

const isValid = validateASCIIArt(asciiArt, CARD_ASCII_CONFIG);
// Returns: true if dimensions are correct
```

### Integration Testing

```typescript
// Test ASCII art display in component
const paper = {
  id: 1,
  title: 'Test Paper',
  category: 'automation',
  ascii_art: generateASCIIArt('automation')
};

// Verify rendering
expect(paper.ascii_art.split('\n')).toHaveLength(20);
expect(paper.ascii_art.split('\n')[0]).toHaveLength(40);
```

## Best Practices

### 1. Consistency
- Keep all ASCII art 40 characters wide × 20 lines tall
- Use block characters consistently (░▒▓█)
- Maintain visual hierarchy (lighter to darker)

### 2. Readability
- Ensure ASCII art is recognizable at 12-14px font size
- Avoid overly complex patterns
- Test on both light and dark backgrounds

### 3. Performance
- Generate ASCII art once and store in database
- Don't regenerate on every page load
- Use database-stored values for production

### 4. Maintenance
- Document new category templates
- Version control ASCII art templates
- Test new templates before deploying

## Future Enhancements

### Planned Features
- [ ] Dynamic ASCII art generation from paper images
- [ ] Animated ASCII transitions between cards
- [ ] User-customizable ASCII art styles
- [ ] AI-generated ASCII art based on paper content
- [ ] Multi-color ASCII art support
- [ ] Export ASCII art as SVG

### Optimization Opportunities
- [ ] Lazy load ASCII art for off-screen cards
- [ ] Compress ASCII art using run-length encoding
- [ ] Cache ASCII art in browser localStorage
- [ ] CDN delivery for static ASCII templates

## Resources

### Documentation
- [Unicode Block Characters](https://en.wikipedia.org/wiki/Block_Elements)
- [ASCII Art Techniques](https://en.wikipedia.org/wiki/ASCII_art)
- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)

### Tools
- ASCII Art Generator: `/scripts/generate-ascii-art.ts`
- Database Migration: `/migrations/001_add_ascii_art.sql`
- Service Module: `/src/services/ascii-generator.ts`

### Examples
- View all category templates in source code
- See generated SQL in script output
- Preview ASCII art with `--preview` flag

---

**Maintained by**: Create Something Engineering Team
**Last Updated**: November 14, 2025
**Questions?**: See troubleshooting section or check terminal output
