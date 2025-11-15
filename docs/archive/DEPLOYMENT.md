# Deployment Guide: TanStack Start + Cloudflare

## Prerequisites

Before deploying, ensure you have:
- Node.js 20+ installed
- Cloudflare account
- Wrangler CLI installed: `npm install -g wrangler`
- Authenticated with Cloudflare: `wrangler login`

## Step 1: Create Cloudflare Resources

### 1.1 Create D1 Database

```bash
# Create the D1 database
npx wrangler d1 create create-something-db

# Note the database_id returned - you'll need it for wrangler.jsonc
```

### 1.2 Initialize Database Schema

```bash
# Run the schema file to create tables
npx wrangler d1 execute create-something-db --file=schema.sql --local

# For production:
npx wrangler d1 execute create-something-db --file=schema.sql --remote
```

### 1.3 Seed Initial Data

```bash
# Generate seed data from static files
tsx scripts/import-static-data.ts

# Import seed data
npx wrangler d1 execute create-something-db --file=seed-data.sql --local

# For production:
npx wrangler d1 execute create-something-db --file=seed-data.sql --remote
```

### 1.4 Create KV Namespaces

```bash
# Create KV namespace for sessions
npx wrangler kv:namespace create SESSIONS
# Note the id returned

# Create KV namespace for cache
npx wrangler kv:namespace create CACHE
# Note the id returned
```

### 1.5 Create R2 Bucket

```bash
# Create R2 bucket for assets
npx wrangler r2 bucket create create-something-assets
```

## Step 2: Configure wrangler.jsonc

Update `wrangler.jsonc` with the IDs from Step 1:

```jsonc
{
  "name": "create-something-terminal",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "create-something-db",
      "database_id": "YOUR_D1_DATABASE_ID_HERE" // <-- Add your D1 ID
    }
  ],
  "kv_namespaces": [
    {
      "binding": "SESSIONS",
      "id": "YOUR_SESSIONS_KV_ID_HERE" // <-- Add your Sessions KV ID
    },
    {
      "binding": "CACHE",
      "id": "YOUR_CACHE_KV_ID_HERE" // <-- Add your Cache KV ID
    }
  ],
  "r2_buckets": [
    {
      "binding": "STORAGE",
      "bucket_name": "create-something-assets"
    }
  ]
}
```

## Step 3: Environment Variables

### 3.1 Set Production Secrets

```bash
# JWT Secret for authentication
npx wrangler secret put JWT_SECRET
# Enter a secure random string when prompted

# Admin password (optional)
npx wrangler secret put ADMIN_PASSWORD
# Enter your admin password when prompted
```

### 3.2 Create .env.local for Development

```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your values
```

## Step 4: Build and Deploy

### 4.1 Install Dependencies

```bash
# Install project dependencies
npm install

# Build the project
npm run build
```

### 4.2 Test Locally

```bash
# Test with local Cloudflare environment
npx wrangler dev

# Visit http://localhost:8787
```

### 4.3 Deploy to Cloudflare Workers

```bash
# Deploy to production
npx wrangler deploy

# Your app will be available at:
# https://create-something-terminal.YOUR_SUBDOMAIN.workers.dev
```

## Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain

```bash
# Add custom domain routing
npx wrangler domains add terminal.createsomething.agency
```

### 5.2 Update DNS Records

In Cloudflare Dashboard:
1. Go to your domain's DNS settings
2. Add CNAME record:
   - Name: `terminal`
   - Target: `create-something-terminal.YOUR_SUBDOMAIN.workers.dev`
   - Proxy status: Proxied (orange cloud)

## Step 6: Migrate Data from Existing System

### 6.1 Export from Neon (if applicable)

```bash
# Set DATABASE_URL environment variable
export DATABASE_URL="postgresql://..."

# Run migration script
tsx scripts/migrate-neon-to-d1.ts

# This creates migration-data.sql
```

### 6.2 Import to D1

```bash
# Import migrated data
npx wrangler d1 execute create-something-db --file=migration-data.sql --remote
```

## Step 7: Monitoring & Maintenance

### 7.1 View Logs

```bash
# Stream live logs
npx wrangler tail

# View recent logs in dashboard
# Visit: https://dash.cloudflare.com/
```

### 7.2 Database Management

```bash
# Query database directly
npx wrangler d1 execute create-something-db --command="SELECT * FROM papers"

# Backup database
npx wrangler d1 backup create create-something-db
```

### 7.3 Update Deployment

```bash
# Make code changes, then:
npm run build
npx wrangler deploy
```

## Troubleshooting

### Common Issues

1. **Database not found**
   - Ensure database_id in wrangler.jsonc matches the ID from Step 1.1
   - Verify database exists: `npx wrangler d1 list`

2. **KV namespace errors**
   - Check KV namespace IDs are correctly set
   - List namespaces: `npx wrangler kv:namespace list`

3. **Build failures**
   - Ensure Node.js version 20+
   - Clear cache: `rm -rf .next node_modules && npm install`

4. **Authentication issues**
   - Verify JWT_SECRET is set: `npx wrangler secret list`
   - Check secret values are correctly encrypted

### Debug Commands

```bash
# Check Worker status
npx wrangler deployments list

# View D1 database info
npx wrangler d1 info create-something-db

# Test KV operations
npx wrangler kv:key put --binding=SESSIONS test "value"
npx wrangler kv:key get --binding=SESSIONS test
```

## Production Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Database schema and data migrated
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Monitoring alerts configured
- [ ] Backup strategy in place
- [ ] Rate limiting configured
- [ ] Error tracking enabled

## Performance Optimization

### Enable Caching

```javascript
// In your route handlers
export const config = {
  runtime: 'edge',
  // Cache responses at edge locations
  cache: {
    revalidate: 60 // seconds
  }
}
```

### Use Durable Objects for WebSocket

For real-time features, uncomment Durable Objects in wrangler.jsonc:

```jsonc
"durable_objects": {
  "bindings": [
    {
      "name": "TERMINAL_SESSIONS",
      "class_name": "TerminalSession",
      "script_name": "create-something-terminal"
    }
  ]
}
```

## Support

For issues or questions:
- GitHub Issues: [your-repo-url]
- Cloudflare Docs: https://developers.cloudflare.com/workers/
- TanStack Start Docs: https://tanstack.com/start/latest

---

**Last Updated**: ${new Date().toISOString()}
**Version**: 1.0.0