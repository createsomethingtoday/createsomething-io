# CREATE SOMETHING: Three-Domain Architecture

## Philosophical Foundation (Hermeneutic Circle)

This architecture implements Heidegger's hermeneutic circle as a living system where theory, practice, and exploration continuously inform and transform each other.

```
Research ⟷ Practice ⟷ Experimentation
Theory ⟷ Application ⟷ Discovery
.io ⟷ .agency ⟷ .space
```

## The Three Domains

### 1. createsomething.io - The Knowledge Layer
**"What we know"**

**Purpose:** Research platform documenting AI-native development through tracked experiments

**Core Functions:**
- Publish experiment results with real metrics
- Document methodologies and frameworks
- Share learnings from production systems
- Educational content and papers

**Content Types:**
- Experiments (tracked with time, costs, errors)
- Research papers
- Methodology documentation
- System architecture insights

**Technology:**
- TanStack Start + Cloudflare Workers
- D1 database for experiments
- R2 for assets
- Current implementation (production ready)

**Relationship to Other Domains:**
- **Sends to .agency:** Validated methodologies, frameworks, case study data
- **Receives from .agency:** Real-world application feedback, new problem spaces
- **Sends to .space:** Experimental hypotheses to test
- **Receives from .space:** Validated experiments ready for documentation

---

### 2. createsomething.agency - The Practice Layer
**"What we build"**

**Purpose:** Professional services applying AI-native development to real client work

**Core Functions:**
- Client project showcases
- Consulting services for AI-native adoption
- Implementation partnerships
- Custom system development

**Content Types:**
- Case studies (client work)
- Service offerings
- Project portfolios
- Client testimonials
- Engagement models

**Proposed Structure:**
```
/
├── / (home) - Agency positioning, value proposition
├── /work - Case studies and client projects
├── /services - What we offer
│   ├── /consulting - AI-native development consulting
│   ├── /implementation - Full system builds
│   └── /training - Team enablement
├── /process - How we work
├── /results - Metrics from client engagements
└── /contact - Get in touch
```

**Technology:**
- TanStack Start + Cloudflare Workers (same stack as .io)
- Shared D1 database with .io for case studies
- CMS integration for client work management

**Relationship to Other Domains:**
- **Receives from .io:** Methodologies, frameworks, best practices
- **Sends to .io:** Real-world validation, new insights, anonymized metrics
- **Sends to .space:** Problems that need experimental solutions
- **Receives from .space:** Prototype solutions to implement

---

### 3. createsomething.space - The Experimental Layer
**"What we explore"**

**Purpose:** Interactive playground for testing ideas, community contributions, and live experiments

**Core Functions:**
- Live experimental demos
- Interactive playgrounds
- Community-contributed experiments
- Testing ground for new methodologies
- Open-source sandbox

**Content Types:**
- Interactive experiments
- Code playgrounds
- Live demos
- Community submissions
- Prototype tools

**Proposed Structure:**
```
/
├── / (home) - Experimental showcase, featured demos
├── /experiments - Browse all experiments
│   ├── /live - Interactive demos
│   ├── /prototypes - Early-stage tools
│   └── /community - User contributions
├── /playground - Interactive coding environment
├── /contribute - Submit your own experiment
└── /learn - Tutorials for experimenting
```

**Technology Options:**
1. **Option A: Lightweight & Fast**
   - Astro + Cloudflare Pages
   - Web Containers for live coding
   - R2 for user-submitted experiments

2. **Option B: Full Framework**
   - TanStack Start (consistency with .io/.agency)
   - Workers AI for on-the-fly experiment execution
   - Durable Objects for collaborative features

**Relationship to Other Domains:**
- **Receives from .io:** Hypotheses to test, frameworks to validate
- **Sends to .io:** Validated experiments with data
- **Receives from .agency:** Real problems needing solutions
- **Sends to .agency:** Working prototypes ready for production

---

## Data Flow Architecture

### Shared Resources

```typescript
// Shared D1 Database Schema
interface Experiment {
  id: string
  title: string
  status: 'draft' | 'testing' | 'validated' | 'published'
  domain: 'research' | 'client' | 'community'
  metrics: {
    time: number
    cost: number
    errors: number
  }
  learnings: string[]
  created_at: string
  published_at?: string
}

interface CaseStudy {
  id: string
  client_name: string // or anonymized
  experiment_ids: string[] // links to experiments
  results: {
    business_impact: string
    technical_metrics: object
  }
  published: boolean
}

interface CommunityExperiment {
  id: string
  author: string
  experiment_id: string // links to base experiment
  fork_from?: string
  status: 'submitted' | 'reviewed' | 'featured'
}
```

### API Contracts

```typescript
// .io exposes research data
GET /api/experiments
GET /api/methodology/:slug
GET /api/papers/:slug

// .agency exposes case studies
GET /api/work/:slug
GET /api/services
POST /api/contact

// .space exposes live experiments
GET /api/experiments/live
POST /api/experiments/fork
POST /api/experiments/submit
GET /api/playground/templates
```

---

## The Narrow Waist

The three domains create a "narrow waist" architecture:

```
┌─────────────────────────────────────────────┐
│          Multiple Audiences                  │
│  (Researchers, Clients, Experimenters)      │
└─────────────────┬───────────────────────────┘
                  │
        ┌─────────┼─────────┐
        │    NARROW WAIST   │
        │   (Experiments)   │ ← Shared abstraction
        └─────────┬─────────┘
                  │
┌─────────────────┴───────────────────────────┐
│        Three Domain Implementations         │
│  (.io Research, .agency Practice, .space)  │
└─────────────────────────────────────────────┘
```

**The Narrow Waist = Tracked Experiments**

All three domains produce, consume, and evolve **experiments**. This single abstraction enables:
- Research findings to become client solutions
- Client problems to become research questions
- Community explorations to inform both research and practice

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [x] .io production ready
- [ ] Create .agency scaffolding
- [ ] Create .space scaffolding
- [ ] Define shared database schema
- [ ] Set up domain routing

### Phase 2: Integration (Week 2)
- [ ] Shared D1 database across domains
- [ ] API contracts implemented
- [ ] Cross-domain linking working
- [ ] Consistent design system

### Phase 3: Content & Features (Week 3-4)
- [ ] .agency: First 3 case studies
- [ ] .space: First 5 interactive experiments
- [ ] .io: Updated with cross-domain references
- [ ] Community contribution workflow

### Phase 4: Launch (Week 5)
- [ ] All three domains live
- [ ] Cross-domain navigation
- [ ] Analytics and tracking
- [ ] Public announcement

---

## Design System Consistency

All three domains share:
- Color palette (black background, white text, white/10 borders)
- Typography (same font system)
- Component library (shared across domains)
- Navigation paradigm (consistent header/footer)

**Domain Differentiation:**
- .io: Academic, research-focused, data-heavy
- .agency: Professional, results-oriented, client-focused
- .space: Playful, experimental, community-driven

---

## Success Metrics

### .io (Knowledge Layer)
- Experiments published
- Paper downloads
- Methodology adoption
- Return visitors

### .agency (Practice Layer)
- Client engagements
- Project success rate
- Revenue generated
- Client testimonials

### .space (Experimental Layer)
- Active experiments
- Community contributions
- Forks and remixes
- Engagement time

---

## Next Steps

1. Build .agency scaffolding
2. Build .space scaffolding
3. Implement shared database schema
4. Create first cross-domain experiment flow
5. Launch with 1 case study (.agency) + 1 interactive demo (.space)
