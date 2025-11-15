# createsomething.agency - Practice Layer Specification

## Purpose
Professional services arm applying AI-native development methodologies to real client work. Bridge between research insights and business value.

---

## Site Structure

### 1. Homepage `/`
**Purpose:** Establish credibility and value proposition

**Hero Section:**
```
We build AI-native systems that work

The research from createsomething.io.
Applied to your business reality.

[View Our Work] [Start a Conversation]
```

**Key Sections:**
- **The Approach** - How we work differently (data-driven, tracked experiments)
- **Services Overview** - Consulting, Implementation, Training
- **Recent Work** - 3 featured case studies
- **Client Results** - Metrics from engagements
- **Why Different** - Research-backed, transparent metrics, proven methodologies

---

### 2. Work `/work`
**Purpose:** Showcase client projects and case studies

**Layout:**
- Grid of case study cards
- Filters: Industry, Service Type, Technology
- Search functionality

**Case Study Card:**
```typescript
interface CaseStudy {
  id: string
  client_name: string // "Stealth Startup" or real name
  industry: string
  challenge: string // brief, 1-2 sentences
  solution: string // brief
  results: {
    time_saved?: string
    cost_reduction?: string
    efficiency_gain?: string
    custom_metric?: { label: string; value: string }
  }
  technologies: string[]
  service_type: 'consulting' | 'implementation' | 'training'
  thumbnail: string
  slug: string
}
```

---

### 3. Work Detail `/work/:slug`
**Purpose:** Deep dive into specific client engagement

**Structure:**
1. **Overview**
   - Client industry & context
   - Challenge statement
   - Our approach

2. **The Work**
   - Methodology applied
   - Technologies used
   - Timeline & phases
   - Team composition

3. **Results**
   - Quantitative metrics
   - Qualitative outcomes
   - Client testimonial (if available)

4. **Learnings**
   - What we discovered
   - Links to related experiments on .io
   - Methodologies validated/evolved

5. **Technical Deep Dive** (optional)
   - Architecture decisions
   - Code examples (sanitized)
   - System diagrams

---

### 4. Services `/services`
**Purpose:** Detail service offerings

**Three Core Services:**

#### 4.1 Consulting `/services/consulting`
**For:** Teams exploring AI-native development

**Offering:**
- Strategic assessment of AI adoption opportunities
- Methodology training workshops
- Architecture reviews
- Team enablement programs

**Deliverables:**
- Assessment report with recommendations
- Custom implementation roadmap
- Workshop materials
- Ongoing advisory access

**Engagement Model:**
- Initial consultation (free)
- 4-week assessment sprint
- Ongoing retainer options

#### 4.2 Implementation `/services/implementation`
**For:** Companies ready to build AI-native systems

**Offering:**
- Full-stack development
- Claude Code + Cloudflare stack implementation
- System architecture & design
- Production deployment

**Deliverables:**
- Production-ready system
- Complete documentation
- Team training
- 30-day support period

**Engagement Model:**
- Fixed-scope projects
- Time & materials
- Build-operate-transfer

#### 4.3 Training `/services/training`
**For:** Teams adopting AI-native workflows

**Offering:**
- Claude Code fundamentals
- Cloudflare Workers development
- AI-native development practices
- Tracked experiment methodology

**Deliverables:**
- Workshop series (virtual or in-person)
- Training materials & templates
- Certification program
- Community access

**Engagement Model:**
- Team workshops (half-day, full-day, multi-day)
- Individual coaching
- Asynchronous video courses

---

### 5. Process `/process`
**Purpose:** Explain how we work

**Our Methodology:**

1. **Discovery** (Week 1)
   - Understand business context
   - Identify high-leverage opportunities
   - Define success metrics

2. **Experiment** (Weeks 2-3)
   - Rapid prototyping
   - Tracked experiments
   - Validate assumptions

3. **Build** (Weeks 4-8)
   - Production implementation
   - Iterative delivery
   - Continuous measurement

4. **Evolve** (Ongoing)
   - Performance monitoring
   - Continuous improvement
   - Knowledge transfer

**What Makes Us Different:**
- Everything is tracked (time, costs, errors)
- Research-backed methodologies
- Transparent metrics
- Knowledge flows back to .io

---

### 6. Results `/results`
**Purpose:** Aggregate metrics from client work

**Dashboard View:**
- Total systems built
- Average time to production
- Cost savings delivered
- Client satisfaction score
- Technologies used (chart)
- Industries served (chart)

**Individual Metrics:**
- List of anonymized results
- Sortable/filterable
- Links to relevant case studies

---

### 7. About `/about`
**Purpose:** Team & philosophy

**Sections:**
- **Who We Are** - Micah Johnson + collaborators
- **Why We Exist** - Bridge research and practice
- **Our Philosophy** - Systems thinking, AI-native, transparency
- **The Ecosystem** - How .agency fits with .io and .space

---

### 8. Contact `/contact`
**Purpose:** Start engagement conversations

**Form Fields:**
- Name
- Email
- Company
- Service interest (dropdown)
- Project timeline
- Message
- Budget range (optional)

**CTA Variations:**
- "Start a Conversation"
- "Schedule a Consultation"
- "Request a Proposal"

---

## Design System

### Visual Identity

**Color Palette:**
- Primary: Black (#000000)
- Text: White (#FFFFFF)
- Borders: White/10 (rgba(255, 255, 255, 0.1))
- Accent: White/80 for hover states

**Differentiation from .io:**
- Slightly warmer tone (subtle)
- More polished, professional
- Results-oriented imagery
- Client-focused language

**Typography:**
- Same font system as .io
- Slightly larger body text for readability
- Bolder headings for impact

### Components

**Case Study Card:**
```tsx
<div className="p-6 bg-[#111111] border border-white/10 rounded-lg hover:border-white/30 transition-all">
  <div className="text-sm text-white/60 mb-2">{industry}</div>
  <h3 className="text-xl font-semibold text-white mb-4">{client_name}</h3>
  <p className="text-white/70 mb-4">{challenge}</p>
  <div className="flex gap-4 mb-4">
    {results.map(metric => (
      <div>
        <div className="text-2xl font-bold text-white">{metric.value}</div>
        <div className="text-sm text-white/60">{metric.label}</div>
      </div>
    ))}
  </div>
  <Link to={`/work/${slug}`} className="text-white hover:text-white/80">
    View Case Study →
  </Link>
</div>
```

**Service Card:**
```tsx
<div className="p-8 bg-[#111111] border border-white/10 rounded-lg">
  <h3 className="text-2xl font-semibold text-white mb-2">{serviceName}</h3>
  <p className="text-white/60 mb-6">{description}</p>
  <ul className="space-y-3 mb-8">
    {offerings.map(item => (
      <li className="flex items-start gap-3">
        <CheckIcon className="w-5 h-5 text-white/80 mt-1" />
        <span className="text-white/70">{item}</span>
      </li>
    ))}
  </ul>
  <Link to={`/services/${slug}`} className="button">
    Learn More
  </Link>
</div>
```

---

## Technology Stack

- **Framework:** TanStack Start (consistency with .io)
- **Hosting:** Cloudflare Workers
- **Database:** D1 (shared with .io)
- **Storage:** R2 for case study assets
- **CMS:** Optional headless CMS for case study management

---

## Content Strategy

### Launch Content (MVP)

**Required for Launch:**
1. **3 Case Studies**
   - 1 consulting engagement
   - 1 implementation project
   - 1 training program

2. **Service Pages** (all 3)
   - Complete descriptions
   - Pricing/engagement models
   - Example deliverables

3. **Process Page**
   - Methodology overview
   - Timeline examples
   - Success metrics

**Phase 2 Content:**
- Blog/Insights section
- Client testimonials page
- Team profiles
- FAQ

---

## SEO & Marketing

**Primary Keywords:**
- AI-native development services
- Claude Code consulting
- Cloudflare Workers implementation
- AI development training

**Target Audience:**
- CTOs and engineering leaders
- Product teams exploring AI
- Companies modernizing infrastructure
- Startups building AI-first products

**Content Marketing:**
- Link to experiments on .io
- Share case studies on LinkedIn
- Technical blog posts
- Speaking engagements

---

## Metrics & Analytics

**Track:**
- Contact form submissions
- Service page views
- Case study engagement
- Time on site
- Referral sources

**Goals:**
- 10 qualified leads/month
- 2 client engagements/quarter
- 80% client satisfaction
- 3 case studies published/quarter

---

## Integration with .io and .space

**From .io:**
- Link to validated methodologies
- Reference published experiments
- Pull experiment data for case studies

**To .io:**
- Contribute learnings as new experiments
- Provide real-world validation data
- Submit anonymized metrics

**From .space:**
- Use prototypes in client work
- Test experimental solutions

**To .space:**
- Submit client problems for experimentation
- Contribute production patterns

---

## Next Steps

1. Set up TanStack Start project for .agency
2. Create shared component library
3. Build first 3 case study pages
4. Implement contact form with email integration
5. Deploy to Cloudflare Workers at createsomething.agency
