# Resend Email Integration Setup Guide

Complete guide for setting up email functionality (newsletter + contact form) with Resend on CREATE SOMETHING.

## Prerequisites

- Resend account with verified domain (createsomething.io)
- Resend API key: `re_JbMtKyRz_3n55bLDPciMmZfgaez38WzM7`
- Cloudflare account with D1 database access
- Wrangler CLI installed

## Step 1: Database Setup

Create the required tables in your D1 database:

```bash
# Local development database
npx wrangler d1 execute create-something-db --local --file=scripts/create-email-tables.sql

# Production database
npx wrangler d1 execute create-something-db --file=scripts/create-email-tables.sql
```

This creates two tables:
- `newsletter_subscribers` - Stores email subscribers with unsubscribe tokens
- `contact_submissions` - Stores contact form submissions

## Step 2: Local Development Setup

The `.dev.vars` file is already created with the Resend API key. This file is gitignored for security.

Verify it exists:
```bash
cat .dev.vars
```

Should show:
```
RESEND_API_KEY=re_JbMtKyRz_3n55bLDPciMmZfgaez38WzM7
FROM_EMAIL=hello@createsomething.io
```

## Step 3: Production Environment Variables

Set the Resend API key as a secret in Cloudflare Workers:

```bash
npx wrangler secret put RESEND_API_KEY
# When prompted, enter: re_JbMtKyRz_3n55bLDPciMmZfgaez38WzM7
```

Alternatively, set via Cloudflare Dashboard:
1. Go to https://dash.cloudflare.com
2. Navigate to Workers & Pages > create-something-tanstack
3. Go to Settings > Environment Variables
4. Add secret: `RESEND_API_KEY` = `re_JbMtKyRz_3n55bLDPciMmZfgaez38WzM7`

## Step 4: Email Template Setup (Optional)

If you want to use Resend's template feature (currently we're using inline HTML):

```bash
cd email-templates
chmod +x create-templates.sh
./create-templates.sh
```

This creates three templates in your Resend account:
- `newsletter-welcome` - Welcome email for new subscribers
- `contact-response` - Auto-response for contact form
- `weekly-newsletter` - Template for periodic updates

After creation, publish each template via Resend Dashboard or API.

## Step 5: API Endpoints

Two API endpoints are now available:

### Newsletter Signup: `/api/newsletter`

**Request:**
```typescript
POST /api/newsletter
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully subscribed! Check your email for a welcome message.",
  "emailId": "resend-email-id"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid email format"
}
```

### Contact Form: `/api/contact`

**Request:**
```typescript
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I have a question..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Message sent successfully! You should receive a confirmation email shortly."
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Message is required"
}
```

## Step 6: Frontend Integration

Update your frontend forms to call these endpoints:

**Newsletter Signup Example:**
```typescript
const handleNewsletterSignup = async (email: string) => {
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })

    const data = await response.json()

    if (data.success) {
      // Show success message
      console.log(data.message)
    } else {
      // Show error message
      console.error(data.message)
    }
  } catch (error) {
    console.error('Newsletter signup failed:', error)
  }
}
```

**Contact Form Example:**
```typescript
const handleContactSubmit = async (name: string, email: string, message: string) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    })

    const data = await response.json()

    if (data.success) {
      // Show success message
      console.log(data.message)
    } else {
      // Show error message
      console.error(data.message)
    }
  } catch (error) {
    console.error('Contact form submission failed:', error)
  }
}
```

## Step 7: Testing

### Test Newsletter Signup Locally:
```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Test Contact Form Locally:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## Step 8: Verify Database Storage

Check that submissions are being stored:

```bash
# Check newsletter subscribers
npx wrangler d1 execute create-something-db --local \
  --command="SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC LIMIT 5"

# Check contact submissions
npx wrangler d1 execute create-something-db --local \
  --command="SELECT * FROM contact_submissions ORDER BY submitted_at DESC LIMIT 5"
```

## Email Features

### Newsletter Welcome Email Includes:
- Personalized greeting with subscriber's email
- Overview of what they'll receive
- Link to research methodology
- Example of recent experiment
- Unsubscribe link

### Contact Auto-Response Includes:
- Personalized greeting with their name
- Confirmation of message receipt
- Display of their original message
- Timeline: 24-48 hour response
- Links to methodology, articles, and GitHub
- Automated confirmation note

### Contact Notification Email (to site owner):
- Sender's name and email (with reply-to set)
- Full message content
- Submission timestamp
- Clean formatting for easy reading

## Monitoring

### Check Email Delivery via Resend Dashboard:
1. Go to https://resend.com/emails
2. View delivery status, opens, clicks
3. Check for bounces or spam reports

### Query Newsletter Subscribers:
```bash
npx wrangler d1 execute create-something-db \
  --command="SELECT COUNT(*) as total, SUM(active) as active FROM newsletter_subscribers"
```

### Query Contact Submissions:
```bash
npx wrangler d1 execute create-something-db \
  --command="SELECT status, COUNT(*) as count FROM contact_submissions GROUP BY status"
```

## Unsubscribe Flow (Future Enhancement)

To implement unsubscribe functionality:

1. Create `/api/unsubscribe` endpoint
2. Accept unsubscribe token from URL query param
3. Update `newsletter_subscribers` table:
   - Set `active = 0`
   - Set `unsubscribed_at = datetime('now')`
4. Show confirmation page

## Security Notes

- API key is stored as a secret (not in code)
- `.dev.vars` is gitignored
- Email validation prevents invalid addresses
- SQL injection protection via prepared statements
- XSS protection via HTML escaping in message display

## Troubleshooting

### Emails not sending?
- Check Resend API key is set correctly
- Verify domain is verified in Resend
- Check Resend dashboard for delivery errors
- Review Cloudflare Worker logs

### Database errors?
- Ensure tables are created (run migration script)
- Check D1 binding name matches "DB" in wrangler.toml
- Verify database_id is correct

### Local development not working?
- Ensure `.dev.vars` file exists
- Restart dev server after creating `.dev.vars`
- Check for typos in environment variable names

## Production Deployment Checklist

- [ ] Run database migration in production D1
- [ ] Set RESEND_API_KEY secret in Cloudflare
- [ ] Deploy worker with `npm run build && npx wrangler pages deploy`
- [ ] Test newsletter signup on production URL
- [ ] Test contact form on production URL
- [ ] Verify emails are received
- [ ] Check database for stored submissions
- [ ] Monitor Resend dashboard for delivery

## Rate Limiting (Future Enhancement)

Consider implementing rate limiting to prevent abuse:
- Use Cloudflare KV to track submission counts per IP
- Limit to 3 newsletter signups per hour per IP
- Limit to 5 contact submissions per hour per IP
