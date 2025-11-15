# Scripts: CREATE SOMETHING Database Management

## Adding the Zoom Paper to Production (Cloudflare D1)

The Zoom experiment paper has been added to `mockPapers.ts` for local development. To add it to your production Cloudflare D1 database:

### Option 1: Using Wrangler CLI (Recommended)

```bash
# Navigate to project root
cd /Users/micahjohnson/Documents/Github/Create\ Something/create-something-tanstack

# Execute SQL script against your D1 database
npx wrangler d1 execute YOUR_DATABASE_NAME --file=scripts/add-zoom-paper-to-d1.sql

# Replace YOUR_DATABASE_NAME with your actual D1 database name from wrangler.toml
```

### Option 2: Using Cloudflare Dashboard

1. Go to Cloudflare Dashboard → Workers & Pages → D1
2. Select your CREATE SOMETHING database
3. Click "Console" tab
4. Copy contents of `scripts/add-zoom-paper-to-d1.sql`
5. Paste into console and execute

### Option 3: Using Cloudflare API

```bash
# Get your database ID
DATABASE_ID="your-database-id"
ACCOUNT_ID="your-account-id"
API_TOKEN="your-api-token"

curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data @scripts/add-zoom-paper-to-d1.sql
```

### Verify the Paper Was Added

```bash
# Query the database to verify
npx wrangler d1 execute YOUR_DATABASE_NAME --command="SELECT title, slug FROM papers WHERE slug = 'zoom-transcript-automation-experiment'"
```

Expected output:
```
╔══════════════════════════════════════════════════════════╗
║ title                                          │ slug   ║
╠══════════════════════════════════════════════════════════╣
║ Experiment #1: Building Zoom Transcript...    │ zoo... ║
╚══════════════════════════════════════════════════════════╝
```

### Access the Paper

Once added, the paper will be available at:
- **Local dev:** http://localhost:3000/papers/zoom-transcript-automation-experiment
- **Production:** https://createsomething.io/papers/zoom-transcript-automation-experiment

## What's Been Created

1. **Zoom Paper Added** ✅
   - Added to `src/data/mockPapers.ts` (local dev)
   - SQL script ready in `scripts/add-zoom-paper-to-d1.sql` (production)

2. **Experiment Tracking Skill** ✅
   - Main Skill: `~/.claude/skills/create-something-experiments/SKILL.md`
   - Examples: Real-time + Retroactive + Worker AI tracking
   - Integration guide for @disler's repos

3. **Mid-Flight Tracking Guide** ✅
   - Guide: `~/.claude/skills/create-something-experiments/MID_FLIGHT_TRACKING.md`
   - How to start tracking on active projects
   - Paper structure for partial tracking

## Quick Start: Using the Experiment Tracking Skill

### For a New Project (Real-Time Tracking)

```
I want to build [project] using Claude Code + Cloudflare. Let's track this as CREATE SOMETHING Experiment #2 to document the process.
```

Claude will:
- Initialize `.claude/experiments/[project-name]/`
- Track all prompts, errors, interventions automatically
- Generate paper when done

### For an In-Progress Project (Mid-Flight Tracking)

```
I'm currently building [project] and want to track this as a CREATE SOMETHING experiment from this point forward. We're about 40% complete.
```

Claude will:
- Document current state
- Start tracking from now until completion
- Fetch historical Claude Code usage from Analytics API
- Generate paper with appropriate disclaimers

### For a Deployed Project (Retroactive)

```
I want to write a CREATE SOMETHING paper about [deployed-project]. This is already in production, so we'll need to document it retroactively.
```

Claude will:
- Analyze git history
- Fetch Cloudflare production analytics
- Get Claude Code Analytics API data
- Guide memory-based reconstruction
- Generate paper with clear data limitations noted

## Integration Opportunities (Optional)

See `~/.claude/skills/create-something-experiments/INTEGRATION_OPPORTUNITIES.md` for how to enhance tracking with:

1. **claude-code-hooks-mastery** → Automatic prompt/error/intervention logging via hooks
2. **claude-code-hooks-multi-agent-observability** → Real-time dashboard for experiments
3. **just-prompt** → Multi-model comparative experiments

**Recommended:** Start with hooks (Phase 1) for zero-effort tracking.

## Next Steps

1. **Add Zoom paper to production** (run SQL script above)
2. **Start your next project with tracking** (invoke the Skill on new work)
3. **Optional:** Implement hooks for automatic tracking (see INTEGRATION_OPPORTUNITIES.md)

## Questions?

The Skill will automatically activate when you say things like:
- "Let's track this as a CREATE SOMETHING experiment"
- "Generate a paper about [project]"
- "Document [deployed-project] retroactively"

Claude Code will recognize these patterns and invoke the experiment tracking Skill.
