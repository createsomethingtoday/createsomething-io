# CREATE SOMETHING

**The Knowledge Layer** — AI-native development research with tracked experiments. Real metrics: time, costs, errors.

Built with TanStack Start and Cloudflare Workers.

![Create Something](https://img.shields.io/badge/TanStack-Start-red) ![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-orange) ![Tailwind](https://img.shields.io/badge/Tailwind-v4.1.17-blue)

## What This Is

This is the research layer of the CREATE SOMETHING ecosystem. Every experiment is tracked with:

- **Development Time** — How long did it actually take?
- **API Costs** — What did Claude Code API calls cost?
- **Error Count** — How many errors occurred?
- **Learnings** — What worked, what didn't, what surprised us?

No cherry-picking. No post-hoc rationalization. Just honest data from building with AI.

## The Hermeneutic Circle

This repository is part of a three-domain architecture based on Heidegger's hermeneutic circle:

- **[createsomething.io](https://createsomething.io)** (this repo) → Research & Experiments
- **[createsomething.agency](https://createsomething.agency)** → Professional Services
- **[createsomething.space](https://createsomething.space)** → Community Playground

Parts inform the whole. The whole informs the parts. The circle accelerates understanding.

## Features

- 📊 **Experiment Tracking** — Every paper includes real metrics from development
- 📝 **Research Papers** — Detailed writeups with code examples and learnings
- 🔍 **Searchable Archive** — Filter by category, difficulty, technical focus
- 📈 **Pattern Recognition** — Emerging patterns across 100+ experiments
- 🎨 **ASCII Art** — Unique generative art for each paper
- ⚡ **Edge-first** — Deployed globally via Cloudflare Workers

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

Visit **http://localhost:3000** to browse the research.

## Project Structure

```
createsomething-io/
├── src/
│   ├── routes/
│   │   ├── index.tsx              # Research homepage
│   │   ├── papers/$slug.tsx       # Individual experiments
│   │   └── methodology.tsx        # Research methodology
│   ├── components/
│   │   ├── PapersGrid.tsx         # Experiment browsing
│   │   ├── CategorySection.tsx    # Research categories
│   │   └── TrackedExperimentBadge.tsx
│   └── services/
│       └── ascii-generator.ts     # ASCII art generation
├── db/
│   ├── schema.sql                 # Experiment database schema
│   └── seed-data.sql              # Research papers data
└── docs/
    ├── METHODOLOGY_IMPLEMENTATION.md
    └── THREE_DOMAIN_ARCHITECTURE.md
```

## Tech Stack

- **TanStack Start v1.136** — Full-stack React framework
- **Cloudflare Workers** — Edge deployment
- **Cloudflare D1** — SQLite database (shared across all domains)
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Styling

## Research Methodology

Every experiment follows a consistent methodology:

1. **Hypothesis** — What are we testing?
2. **Implementation** — Build with Claude Code, track everything
3. **Metrics** — Collect real data (time, costs, errors)
4. **Analysis** — What did we learn?
5. **Publication** — Share findings on createsomething.io

See [`/methodology`](./docs/METHODOLOGY_IMPLEMENTATION.md) for full details.

## Contributing Research

Have an AI-native development experiment to share?

1. **Track metrics** during development (time, costs, errors)
2. **Document learnings** — What worked? What failed?
3. **Submit via issue** with your findings
4. **We'll help** format it into a research paper

Radical transparency strengthens the moat through interpretive velocity.

## The Practice Layer

Need help applying these findings to your business?

→ **[createsomething.agency](https://createsomething.agency)** — Professional services applying this research to real client work.

## The Experimental Layer

Want to fork an experiment and try it yourself?

→ **[createsomething.space](https://createsomething.space)** — Community playground for breaking things and learning.

## License

MIT License - See [LICENSE](./LICENSE) for details

---

**Built with TanStack Start and Cloudflare Workers**

For questions: [open an issue](https://github.com/createsomethingtoday/createsomething-io/issues)
