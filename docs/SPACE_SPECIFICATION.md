# createsomething.space - Experimental Layer Specification

## Purpose
Interactive playground for testing ideas, community contributions, and live experiments. The creative sandbox where theory meets practice before production.

---

## Site Structure

### 1. Homepage `/`
**Purpose:** Inspire exploration and showcase the best experiments

**Hero Section:**
```
The playground for AI-native development

Test ideas. Break things. Build in public.
Every experiment here could become tomorrow's methodology.

[Explore Experiments] [Start Building]
```

**Key Sections:**
- **Featured Experiments** - 4-6 curated experiments
- **What's New** - Recent additions
- **Community Highlights** - Best community contributions
- **Quick Start** - Jump into a playground
- **Stats** - Total experiments, contributors, forks

---

### 2. Experiments `/experiments`
**Purpose:** Browse and filter all experiments

**View Options:**
- **Grid View** - Visual cards
- **List View** - Detailed table
- **Timeline View** - Chronological

**Filters:**
- Type: Interactive Demo, Code Playground, Prototype Tool, Research
- Status: Draft, Testing, Validated, Featured
- Technology: Claude Code, Workers AI, D1, R2, etc.
- Author: Community, Research, Client-derived
- Difficulty: Beginner, Intermediate, Advanced

**Sort:**
- Newest
- Most Popular
- Most Forked
- Recently Updated

---

### 3. Experiment Detail `/experiments/:slug`
**Purpose:** Interactive experiment experience

**Structure:**

#### Header Section
- Experiment title
- Author info
- Status badge
- Fork count
- Created/updated dates

#### Interactive Area
- **Live Demo** - Embedded interactive experience
- **Code Editor** - Editable code (if applicable)
- **Terminal Output** - Real-time logs
- **Preview** - Live preview pane

#### Information Tabs
1. **Overview**
   - What it does
   - Why it matters
   - Key learnings

2. **How It Works**
   - Technical explanation
   - Architecture diagram
   - Code walkthrough

3. **Try It**
   - Interactive tutorial
   - Step-by-step guide
   - Example inputs/outputs

4. **Results**
   - Metrics (if tracked)
   - Performance data
   - Validation status

5. **Fork & Remix**
   - Fork this experiment
   - See all forks
   - Community variations

---

### 4. Live Experiments `/experiments/live`
**Purpose:** Instantly playable interactive demos

**Categories:**
- **Claude Code Examples** - Working with AI coding assistant
- **Workers AI Demos** - Edge AI capabilities
- **D1 Experiments** - Database patterns
- **System Patterns** - Architecture explorations

**Example Experiments:**

```typescript
interface LiveExperiment {
  id: string
  title: string
  description: string
  type: 'interactive' | 'playground' | 'demo'
  technologies: string[]
  embedUrl?: string // For iframe embedding
  codeUrl?: string // For code playground
  author: {
    name: string
    github?: string
  }
  stats: {
    views: number
    forks: number
    likes: number
  }
  created_at: string
  updated_at: string
}
```

**Live Experiment Ideas:**

1. **"Claude Code Pair Programming"**
   - Interactive coding session with Claude
   - Real-time code generation
   - Tracks: time saved, code quality, iterations

2. **"Edge AI Image Classification"**
   - Upload image, get instant classification
   - Shows Workers AI performance
   - Tracks: inference time, accuracy, cost

3. **"D1 Performance Tester"**
   - Compare query patterns
   - Visualize performance differences
   - Tracks: query time, data size, optimization gains

4. **"Prompt Engineering Playground"**
   - Test different prompts
   - See outputs side-by-side
   - Tracks: token usage, quality scores

---

### 5. Prototypes `/experiments/prototypes`
**Purpose:** Early-stage tools being tested

**Format:**
- Rougher UX acceptable
- "WIP" badges
- Feedback mechanisms
- Clear disclaimers

**Example Prototypes:**

1. **"Experiment Tracker CLI"**
   - Command-line tool for tracking experiments
   - Install via npm
   - Syncs to .io platform

2. **"AI Code Review Bot"**
   - Automated PR reviews using Claude
   - GitHub integration
   - Customizable rules

3. **"Workers Starter Templates"**
   - Boilerplate generators
   - One-click deploys
   - Best practice patterns

---

### 6. Community `/experiments/community`
**Purpose:** User-submitted experiments

**Submission Flow:**
1. **Propose** - Submit idea/code
2. **Review** - Community feedback
3. **Publish** - Goes live
4. **Feature** - Best ones highlighted

**Community Experiment Card:**
```tsx
<div className="p-6 bg-[#111111] border border-white/10 rounded-lg">
  <div className="flex items-start justify-between mb-4">
    <div>
      <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-white/60">by {author.name}</p>
    </div>
    <span className="px-3 py-1 bg-white/5 text-white/80 text-sm rounded-full">
      {status}
    </span>
  </div>
  <p className="text-white/70 mb-4">{description}</p>
  <div className="flex gap-4 mb-4">
    <div className="flex items-center gap-2 text-white/60">
      <ForkIcon className="w-4 h-4" />
      <span>{forkCount} forks</span>
    </div>
    <div className="flex items-center gap-2 text-white/60">
      <HeartIcon className="w-4 h-4" />
      <span>{likeCount} likes</span>
    </div>
  </div>
  <div className="flex gap-2">
    <Link to={`/experiments/${slug}`} className="button-primary">
      Try It
    </Link>
    <button className="button-secondary">Fork</button>
  </div>
</div>
```

---

### 7. Playground `/playground`
**Purpose:** Instant coding environment

**Features:**
- **Code Editor** - Monaco editor with syntax highlighting
- **Multiple Languages** - JavaScript, TypeScript, Python
- **Templates** - Quick start options
- **Live Preview** - Instant results
- **Share** - Permalink to your code
- **Fork** - Start from existing code

**Playground Templates:**

1. **Cloudflare Worker Starter**
   - Basic worker template
   - Fetch event handling
   - Environment variables

2. **Workers AI Example**
   - LLM inference
   - Embeddings generation
   - Image classification

3. **D1 Database Demo**
   - Schema creation
   - CRUD operations
   - Query patterns

4. **Claude Code Integration**
   - API usage examples
   - Prompt engineering
   - Error handling

---

### 8. Contribute `/contribute`
**Purpose:** Enable community submissions

**Submission Form:**
- Experiment title
- Description
- Category/tags
- GitHub repo (optional)
- Live demo URL (optional)
- Code snippet or embed
- Expected outcomes

**Review Process:**
1. Automated checks (code safety, format)
2. Community review (upvotes, comments)
3. Maintainer approval
4. Publication

**Contributor Benefits:**
- Profile page
- Experiment portfolio
- Community recognition
- Potential featured placement

---

### 9. Learn `/learn`
**Purpose:** Tutorials and guides

**Topics:**
- "How to Design a Good Experiment"
- "Using the Playground"
- "Contributing Your Work"
- "Experiment Tracking Methodology"
- "From Prototype to Production"

---

## Design System

### Visual Identity

**Color Palette:**
- Primary: Black (#000000)
- Text: White (#FFFFFF)
- Borders: White/10
- **Accent: Vibrant colors for experimentation**
  - Success: Green (#10B981)
  - Warning: Yellow (#F59E0B)
  - Error: Red (#EF4444)
  - Featured: Blue (#3B82F6)

**Differentiation from .io and .agency:**
- More playful and experimental
- Brighter accent colors
- Interactive elements encouraged
- "Safe to fail" atmosphere
- Less formal language

**Typography:**
- Same base system
- Monospace for code
- Larger code snippets
- Syntax highlighting

---

## Technology Stack

### Option A: Astro + Cloudflare Pages (Recommended)
**Pros:**
- Faster build times
- Better for content-heavy site
- Easy static generation
- Web Containers for live coding

**Stack:**
- Astro for site framework
- React islands for interactive components
- Cloudflare Pages for hosting
- WebContainers for in-browser coding
- R2 for user experiments storage

### Option B: TanStack Start (Consistency)
**Pros:**
- Same stack as .io and .agency
- Easier code sharing
- Consistent developer experience

**Stack:**
- TanStack Start
- Cloudflare Workers
- D1 for experiment metadata
- Workers AI for experiments
- R2 for storage

---

## Key Features

### 1. Interactive Code Execution
- **WebContainers** - Run Node.js in browser
- **Cloudflare Workers Playground** - Test worker code
- **Sandboxed Execution** - Safe code running

### 2. Forking & Remixing
- One-click fork
- Track fork genealogy
- Showcase popular forks
- Diff view between forks

### 3. Real-time Collaboration
- Share live sessions
- Collaborative editing (optional)
- Comments and feedback

### 4. Experiment Tracking
- View count
- Fork count
- Like/star system
- Performance metrics

---

## Content Strategy

### Launch Content (MVP)

**5 Core Experiments:**
1. **"Hello Workers"** - Basic Cloudflare Worker
2. **"Claude Chat"** - Simple Claude API integration
3. **"D1 Todo App"** - CRUD with D1
4. **"Image Classifier"** - Workers AI demo
5. **"Prompt Compare"** - Side-by-side prompt testing

**3 Playground Templates:**
1. Worker starter
2. Workers AI starter
3. Full-stack starter

**Community Guidelines:**
- Code of conduct
- Contribution guidelines
- Review process

---

## Integration with .io and .agency

**From .io:**
- Import experiment hypotheses
- Pull methodology frameworks
- Reference research papers

**To .io:**
- Submit validated experiments
- Contribute metrics and learnings
- Update methodology based on findings

**From .agency:**
- Real client problems to solve
- Production patterns to test
- Edge cases to explore

**To .agency:**
- Working prototypes
- Validated solutions
- Performance data

---

## Community & Moderation

**User Roles:**
- **Visitor** - Browse and try experiments
- **Contributor** - Submit experiments
- **Reviewer** - Review submissions
- **Maintainer** - Approve and feature

**Moderation:**
- Automated code scanning
- Community reporting
- Review queue
- Featured experiment curation

---

## Metrics & Analytics

**Track:**
- Total experiments
- Active users
- Fork count
- Popular experiments
- Contributor growth
- Time in playground

**Goals:**
- 50 experiments in first 3 months
- 10 community contributors
- 1000 unique visitors/month
- 500 playground sessions/month

---

## Security & Safety

**Code Execution:**
- Sandboxed environments
- Rate limiting
- Resource limits
- No direct database access

**User Content:**
- Content scanning
- Virus checking
- Rate limiting on submissions

---

## Next Steps

1. Choose tech stack (Astro vs TanStack)
2. Set up project structure
3. Build playground with WebContainers
4. Create 5 launch experiments
5. Implement forking system
6. Deploy to Cloudflare at createsomething.space
