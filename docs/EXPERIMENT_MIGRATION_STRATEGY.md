# Experiment Migration Strategy

How to transform private experiments from `/Users/micahjohnson/Documents/Github` into public research papers on createsomething.io.

## The Challenge

You have 100+ private experiment folders that need cleanup before going public. This is an **endeavor**, not a one-time task.

## The Valve-Aligned Approach

Don't migrate everything at once. **Gradual public learning strengthens the moat faster than perfect documentation.**

### Phase 1: Quick Wins (Week 1-2)

**Goal:** Get 5-10 experiments published quickly to establish the research archive

**Selection Criteria:**
- Already has a README
- Clear problem/solution
- Minimal cleanup needed
- Demonstrates a pattern others can use

**Process:**
1. Pick an experiment folder
2. Use the **technical-report-writing skill** to generate research paper from codebase
3. Add tracked metrics (even retroactively estimated):
   - Development time: ~X hours
   - API costs: ~$X
   - Error count: ~X errors
   - Key learnings: What worked/didn't work
4. Clean up obvious secrets/credentials
5. Publish as research paper on .io

**Example Command:**
```bash
# Use Claude Code with technical-report-writing skill
# Point it at: /Users/micahjohnson/Documents/Github/HalfDozen/Zoom Clips/
# Ask it to: Generate a research paper for this experiment
```

### Phase 2: Systematic Migration (Month 1-3)

**Goal:** Migrate experiments by category, building patterns

**Categories to Tackle:**
1. **Notion/Database Projects** (Notion Agent, Notion Text Splitter, etc.)
2. **AI/LLM Integrations** (Claude experiments, OpenAI, etc.)
3. **Workflow Automation** (n8n, Zapier, Appmixer, etc.)
4. **Infrastructure** (Cloudflare Workers, Auth0, OAuth, etc.)
5. **Data Processing** (YouTube Transcripts, Fireflies, Zoom, etc.)

**For Each Category:**
1. List all experiments in that category
2. Identify common patterns across them
3. Write 1-2 "pattern papers" synthesizing learnings
4. Publish individual experiment papers
5. Cross-reference them

**Why Categories Matter:**
Patterns across experiments > individual experiments. This is the hermeneutic circle in action.

### Phase 3: Community Contribution (Month 3+)

**Goal:** Turn .space community into experiment contributors

**Process:**
1. Publish experiment template on .space
2. Community forks and tries it
3. Community reports findings
4. Their findings become new research papers on .io
5. You're no longer the only contributor

**This is the Valve model:**
- You're not migrating alone
- Community helps document experiments
- Network effects accelerate the research

## Using the Technical Report Writing Skill

You have access to a skill that converts code to research papers:

```bash
# In Claude Code conversation:
/skill technical-report-writing

# Then provide:
1. Path to experiment folder
2. What the experiment was trying to solve
3. Any context about results (even rough estimates)
```

The skill will:
- Analyze the codebase
- Extract patterns and architecture
- Convert READMEs/comments to technical writing
- Generate IEEE/ACM standard paper format

**You then:**
- Add the metrics (time, costs, errors)
- Add the "What I learned" section
- Clean up any secrets
- Publish to .io database

## Gradual Public Learning > Perfect Documentation

**The Microsoft Trap:** Wait until everything is perfect, then never ship

**The Valve Model:** Ship Linux improvements continuously, build in public

**Your Approach:** Publish experiments as you clean them, build the archive over time

### Why This Works

1. **Interpretive Velocity** — By the time you've published 10, you understand the patterns
2. **Community Input** — Others see experiment #3 and contribute to #4
3. **Network Effects** — Each paper makes the next easier (templates, patterns)
4. **Moat Widening** — Your synthesis across 100+ experiments > competitor's perfect single project

## Recommended Cadence

- **Week 1-2:** 1-2 experiments/day (Quick wins)
- **Month 1-3:** 2-3 experiments/week (Systematic migration)
- **Month 3+:** Community contributes 1-2/week (Network effects)

By Month 3, you have:
- 40-50 published experiments
- 5-10 pattern papers
- Community-contributed experiments starting
- Research archive that demonstrates interpretive velocity

## The Checklist Per Experiment

- [ ] Copy experiment to temp location
- [ ] Remove secrets/credentials (.env files, API keys)
- [ ] Run technical-report-writing skill
- [ ] Add metrics section:
  ```markdown
  ## Tracked Metrics
  - Development Time: ~X hours
  - API Costs: ~$X (Claude/OpenAI/etc.)
  - Errors Encountered: ~X
  - Key Learnings: [3-5 bullet points]
  ```
- [ ] Add "What Worked / What Didn't" section
- [ ] Add "Upstream Contributions" section (if any)
- [ ] Add to D1 database (create seed data entry)
- [ ] Push to .io repo
- [ ] Deploy

## Don't Forget the Hermeneutic Circle

**Part → Whole:** Individual experiment informs broader patterns
**Whole → Part:** Understanding patterns shapes how you document next experiment
**The Circle:** Gets faster with each iteration

By experiment #20, you'll have templates, patterns, and muscle memory.

## Starting Point

Pick your 3 favorite experiments from `/Users/micahjohnson/Documents/Github` and publish them this week.

Not the most polished. Not the most complex. The ones that taught you the most.

**The moat is interpretive velocity, not perfect documentation.**

Start publishing. Start learning in public. Start widening the gap.
