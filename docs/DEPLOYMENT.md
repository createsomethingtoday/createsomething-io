# Deployment Guide for CREATE SOMETHING

This guide will walk you through deploying your TanStack Start app to Cloudflare Workers with a custom domain.

## Prerequisites

- Cloudflare account
- Domain `createsomething.io` already added to your Cloudflare account
- Wrangler CLI installed (`npm install -g wrangler`)
- Logged in to Wrangler (`wrangler login`)

## Step 1: Deploy to Cloudflare Workers

First, deploy your Worker:

```bash
cd "/Users/micahjohnson/Documents/Github/Create Something/create-something-tanstack"
npm run build
wrangler deploy
```

This will deploy your app to a `*.workers.dev` subdomain.

## Step 2: Add Custom Domains via Cloudflare Dashboard

### Option A: Using Cloudflare Dashboard (Recommended)

1. **Go to Workers & Pages**
   - Log in to https://dash.cloudflare.com
   - Navigate to **Workers & Pages**
   - Click on your worker: `create-something-tanstack`

2. **Add Custom Domains**
   - Click the **Settings** tab
   - Scroll to **Domains & Routes**
   - Click **Add** next to "Custom Domains"
   - Add: `createsomething.io`
   - Click **Add Domain**
   - Repeat for: `www.createsomething.io`

3. **DNS Records (Automatic)**
   - Cloudflare will automatically create the necessary DNS records
   - If asked, confirm you want to create the DNS records

### Option B: Using Wrangler CLI

Alternatively, you can add custom domains via CLI:

```bash
# Add createsomething.io
wrangler domains add createsomething.io

# Add www.createsomething.io
wrangler domains add www.createsomething.io
```

## Step 3: Verify DNS Configuration

1. Go to your domain's **DNS** settings in Cloudflare Dashboard
2. You should see these records (created automatically):

   ```
   Type: AAAA
   Name: @
   Content: 100:: (Cloudflare Worker placeholder)
   Proxy: Enabled (orange cloud)

   Type: AAAA
   Name: www
   Content: 100:: (Cloudflare Worker placeholder)
   Proxy: Enabled (orange cloud)
   ```

## Step 4: Set up Database and Storage

Before your app works fully, you need to create the required resources:

### Create D1 Database

```bash
# Create D1 database
wrangler d1 create create-something-db

# Copy the database_id from output and update wrangler.toml line 9
# Then create tables
wrangler d1 execute create-something-db --remote --file=./migrations/supabase-to-d1.sql
```

### Create KV Namespaces

```bash
# Create Sessions KV
wrangler kv:namespace create SESSIONS

# Create Cache KV
wrangler kv:namespace create CACHE

# Copy the IDs from output and update wrangler.toml lines 14 and 18
```

### Create R2 Bucket

```bash
# Create R2 bucket
wrangler r2 bucket create create-something-storage
```

## Step 5: Update wrangler.toml

After creating resources, update `wrangler.toml` with the actual IDs:

```toml
[[d1_databases]]
binding = "DB"
database_name = "create-something-db"
database_id = "PASTE-YOUR-DATABASE-ID-HERE"

[[kv_namespaces]]
binding = "SESSIONS"
id = "PASTE-YOUR-SESSIONS-KV-ID-HERE"

[[kv_namespaces]]
binding = "CACHE"
id = "PASTE-YOUR-CACHE-KV-ID-HERE"
```

## Step 6: Deploy Again with Resources

```bash
npm run build
wrangler deploy
```

## Step 7: Test Your Domains

Visit your custom domains:
- https://createsomething.io
- https://www.createsomething.io

Both should now serve your TanStack Start app!

## Troubleshooting

### Domain not working?

1. **Check DNS Propagation**: DNS changes can take a few minutes
   ```bash
   dig createsomething.io
   dig www.createsomething.io
   ```

2. **Verify Worker is deployed**:
   ```bash
   wrangler deployments list
   ```

3. **Check Worker logs**:
   ```bash
   wrangler tail
   ```

### Database not found?

Make sure you've:
1. Created the D1 database
2. Updated the `database_id` in `wrangler.toml`
3. Imported the SQL schema
4. Redeployed with `wrangler deploy`

## Continuous Deployment

To set up automatic deployments via GitHub Actions, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - run: npm install
      - run: npm run build

      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

Add `CLOUDFLARE_API_TOKEN` to your GitHub repository secrets.

## Next Steps

- Set up monitoring with Cloudflare Analytics
- Configure caching rules in Cloudflare
- Set up error tracking (e.g., Sentry)
- Add SSL/TLS settings (already handled by Cloudflare)

## Support

For issues with:
- **TanStack Start**: https://tanstack.com/router/latest/docs/framework/react/start/getting-started
- **Cloudflare Workers**: https://developers.cloudflare.com/workers/
- **Wrangler**: https://developers.cloudflare.com/workers/wrangler/
