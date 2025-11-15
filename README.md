# CREATE SOMETHING

**The Knowledge Layer** — AI-native development research with tracked experiments. Real metrics: time, costs, errors.

Built with TanStack Start and Cloudflare Workers.

![Create Something](https://img.shields.io/badge/TanStack-Start-red) ![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-orange) ![Tailwind](https://img.shields.io/badge/Tailwind-v4.1.17-blue)

## Features

- 🚀 **Edge-first Architecture** - Deployed to 300+ Cloudflare locations worldwide
- ⚡ **Blazing Fast** - Sub-50ms response times globally
- 🎨 **Modern Design** - Black/white inverse theme inspired by high-end Webflow sites
- 🔤 **ASCII Art** - Unique ASCII art imagery for each paper
- 📱 **Fully Responsive** - Beautiful on mobile, tablet, and desktop
- ♿ **Accessible** - WCAG AA/AAA compliant with high contrast ratios

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Deploy to Cloudflare
pnpm deploy
```

Visit **http://localhost:3000** to see the app in action!

## Tech Stack

### Core Framework
- **TanStack Start v1.136.1** - Full-stack React framework with file-based routing
- **React 19.2.0** - Latest React with concurrent features
- **TypeScript 5.7.2** - Type-safe development

### Styling
- **Tailwind CSS v4.1.17** - Utility-first CSS framework (locked version)
- **@tailwindcss/vite v4.1.17** - Optimized Vite integration
- **Framer Motion v12** - Smooth animations and transitions

### Runtime & Infrastructure
- **Cloudflare Workers** - Serverless edge computing
- **Cloudflare D1** - SQLite at the edge
- **Cloudflare KV** - Key-value storage for sessions
- **Cloudflare R2** - Object storage (S3-compatible)

### Build Tools
- **Vite v7.2.2** - Next-generation build tool
- **Wrangler v4** - Cloudflare Workers CLI

## Project Structure

```
create-something-tanstack/
├── src/
│   ├── components/          # React components
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── PaperCard.tsx
│   │   ├── PapersGrid.tsx
│   │   ├── CategorySection.tsx
│   │   ├── Footer.tsx
│   │   ├── ArticleHeader.tsx
│   │   ├── ArticleContent.tsx
│   │   ├── ShareButtons.tsx
│   │   └── RelatedArticles.tsx
│   ├── routes/              # File-based routes
│   │   ├── __root.tsx
│   │   ├── index.tsx        # Landing page
│   │   └── papers/
│   │       └── $slug.tsx    # Dynamic paper detail pages
│   ├── types/               # TypeScript definitions
│   ├── services/            # Business logic
│   └── global.css           # Global styles + Tailwind
├── docs/                    # Documentation
│   ├── guides/              # User guides
│   ├── architecture/        # Architecture docs
│   ├── implementation/      # Implementation details
│   └── archive/             # Historical docs
├── inspiration/             # Design inspiration files
├── schema.sql               # D1 database schema
├── seed-data.sql            # Sample data
├── wrangler.jsonc           # Cloudflare Workers config
└── package.json             # Dependencies & scripts
```

## Documentation

📚 **[Full Documentation Index](./docs/README.md)**

### Quick Links

- **[Quick Start Guide](./docs/guides/QUICKSTART.md)** - Get up and running in 5 minutes
- **[ASCII Art Guide](./docs/guides/ASCII-ART-QUICKSTART.md)** - Generate ASCII art for papers
- **[Component Architecture](./docs/architecture/COMPONENT_ARCHITECTURE.md)** - Component structure and patterns
- **[Color Scheme Guide](./docs/implementation/COLOR_SCHEME_GUIDE.md)** - Black/white theme specifications
- **[Deployment Guide](./docs/archive/DEPLOYMENT.md)** - Deploy to Cloudflare Workers

## Development

### Prerequisites

- Node.js 18+ or 20+
- pnpm 8+
- Cloudflare account (for deployment)

### Local Development

```bash
# Install dependencies
pnpm install

# Set up environment variables (optional for local dev)
cp .env.example .env

# Start dev server with mock data
pnpm dev
```

The app will use mock data in local development since Cloudflare bindings aren't available. For full database functionality, use:

```bash
# Set up local D1 database
wrangler d1 create create-something-db
wrangler d1 execute create-something-db --file=./schema.sql
wrangler d1 execute create-something-db --file=./seed-data.sql

# Run with wrangler (includes D1 bindings)
pnpm build
wrangler dev
```

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build locally
pnpm deploy       # Deploy to Cloudflare Workers
pnpm test         # Run tests
```

## Deployment

The app is configured for deployment to Cloudflare Workers. See **[Deployment Guide](./docs/archive/DEPLOYMENT.md)** for detailed instructions.

### One-Command Deploy

```bash
pnpm deploy
```

### Environment Variables

Configure these in the Cloudflare Workers dashboard or `wrangler.jsonc`:

- `ENVIRONMENT` - development | production
- `TERMINAL_VERSION` - App version
- `DEFAULT_THEME` - dark | light

### Database Setup

```bash
# Create D1 database
wrangler d1 create create-something-db

# Get database ID and update wrangler.jsonc

# Initialize schema
wrangler d1 execute create-something-db --file=./schema.sql

# Seed with sample data
wrangler d1 execute create-something-db --file=./seed-data.sql
```

## Configuration

### Tailwind CSS

The project uses **Tailwind CSS v4.1.17** with exact version locking for stability. The configuration is in `tailwind.config.js` with the Vite plugin enabled in `vite.config.ts`.

```javascript
// tailwind.config.js - Custom theme extensions
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'terminal-green': '#00FF00',
        'terminal-cyan': '#00FFFF',
        // ... more custom colors
      },
    },
  },
}
```

### Cloudflare Workers

Workers configuration is in `wrangler.jsonc`:

```jsonc
{
  "name": "create-something-tanstack",
  "main": ".output/server/index.mjs",
  "compatibility_date": "2025-09-02",
  "d1_databases": [...],
  "kv_namespaces": [...],
  "r2_buckets": [...]
}
```

## Performance

- **Initial Load**: ~500ms
- **Time to Interactive**: <2s
- **Bundle Size**: ~1.5MB total
  - CSS: 13.7KB (excellent)
  - Client JS: ~600KB
  - Server JS: ~900KB
- **Lighthouse Score**: 95+ across all metrics

## Browser Support

- Chrome/Edge 111+
- Firefox 128+
- Safari 16.4+
- Modern mobile browsers

## Contributing

This is a personal project, but suggestions and improvements are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See [LICENSE](./LICENSE) for details

## Acknowledgments

- **TanStack Start** - Fantastic full-stack React framework
- **Cloudflare** - Amazing edge platform
- **Tailwind CSS** - Beautiful utility-first CSS
- **Webflow Cloud.lab** - Design inspiration

---

**Built with ❤️ using TanStack Start and Cloudflare Workers**

For questions or issues, please [open an issue](https://github.com/yourusername/create-something-tanstack/issues).
