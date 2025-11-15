# Email Templates for CREATE SOMETHING

Email templates using Resend API for newsletter and contact form functionality.

## Templates

### 1. Newsletter Welcome (`newsletter-welcome.html`)
Sent immediately when someone subscribes to the newsletter.

**Variables:**
- `{{EMAIL}}` - Subscriber's email address
- `{{UNSUBSCRIBE_URL}}` - Unsubscribe link

### 2. Contact Response (`contact-response.html`)
Automatic confirmation sent when someone fills out the contact form.

**Variables:**
- `{{NAME}}` - Contact's name
- `{{MESSAGE}}` - Their message (quoted in email)

### 3. Weekly Newsletter (`weekly-newsletter.html`)
Template for sending weekly/periodic updates about new experiments.

**Variables:**
- `{{ISSUE_DATE}}` - Date of newsletter
- `{{NEWSLETTER_TITLE}}` - Main headline
- `{{NEWSLETTER_SUBTITLE}}` - Subheading
- `{{INTRO_TEXT}}` - Opening paragraph
- `{{EXPERIMENT_TITLE}}` - Featured experiment title
- `{{EXPERIMENT_DESCRIPTION}}` - Description
- `{{TIME_HOURS}}` - Development time in hours
- `{{ERROR_COUNT}}` - Number of errors encountered
- `{{TOTAL_COST}}` - Total cost in dollars
- `{{SAVINGS_PERCENT}}` - Time savings percentage
- `{{KEY_LEARNING}}` - Main takeaway from experiment
- `{{EXPERIMENT_URL}}` - Link to full paper
- `{{LEARNING_1}}`, `{{LEARNING_2}}` - Additional learnings
- `{{LINK_1_URL}}`, `{{LINK_1_TITLE}}`, `{{LINK_1_DESCRIPTION}}` - First external link
- `{{LINK_2_URL}}`, `{{LINK_2_TITLE}}`, `{{LINK_2_DESCRIPTION}}` - Second external link
- `{{NEXT_EXPERIMENT_TEASER}}` - Preview of upcoming experiment
- `{{UNSUBSCRIBE_URL}}` - Unsubscribe link

## Setup

### 0. Database Setup (Required First)

Create the required database tables before using the email functionality:

```bash
# Local development database
npx wrangler d1 execute create-something-db --local --file=scripts/create-email-tables.sql

# Production database
npx wrangler d1 execute create-something-db --file=scripts/create-email-tables.sql
```

This creates:
- `newsletter_subscribers` table - Stores email subscribers
- `contact_submissions` table - Stores contact form submissions

### 1. Create Templates in Resend (Optional)

Currently, the API endpoints use inline HTML. If you want to use Resend's template feature:

```bash
cd email-templates
./create-templates.sh
```

This will create all three templates in your Resend account using the API.

### 2. Publish Templates

After creation, publish each template to make it available for use:

```bash
# Get template IDs
curl -X GET 'https://api.resend.com/templates' \
  -H 'Authorization: Bearer re_JbMtKyRz_3n55bLDPciMmZfgaez38WzM7' \
  -H 'Content-Type: application/json'

# Publish each template
curl -X POST 'https://api.resend.com/templates/{template_id}/publish' \
  -H 'Authorization: Bearer re_JbMtKyRz_3n55bLDPciMmZfgaez38WzM7' \
  -H 'Content-Type: application/json'
```

### 3. Send Emails

Use the Resend SDK or API to send emails with these templates:

**Newsletter Welcome:**
```typescript
import { Resend } from 'resend';

const resend = new Resend('re_JbMtKyRz_3n55bLDPciMmZfgaez38WzM7');

await resend.emails.send({
  from: 'CREATE SOMETHING <hello@createsomething.io>',
  to: subscriber.email,
  subject: 'Welcome to CREATE SOMETHING',
  template: 'newsletter-welcome',
  variables: {
    EMAIL: subscriber.email,
    UNSUBSCRIBE_URL: `https://createsomething.io/unsubscribe?token=${subscriber.token}`
  }
});
```

**Contact Form Response:**
```typescript
await resend.emails.send({
  from: 'Micah Johnson <hello@createsomething.io>',
  to: contact.email,
  subject: 'Thanks for reaching out',
  template: 'contact-response',
  variables: {
    NAME: contact.name,
    MESSAGE: contact.message
  }
});
```

**Weekly Newsletter:**
```typescript
await resend.emails.send({
  from: 'Micah Johnson <hello@createsomething.io>',
  to: subscribers,
  subject: 'This Week in AI-Native Development',
  template: 'weekly-newsletter',
  variables: {
    ISSUE_DATE: 'January 15, 2025',
    NEWSLETTER_TITLE: 'Building Browser Automation with Claude Code',
    // ... all other variables
  }
});
```

## Design Philosophy

- **Minimalist black background** - Consistent with CREATE SOMETHING brand
- **Monospace font for data** - Technical aesthetic
- **Clear metrics presentation** - Data-driven content
- **Mobile-responsive** - Looks good on all devices
- **Accessible** - Proper contrast ratios and semantic HTML

## Environment Variables

Add to `.dev.vars` (local) and Cloudflare Dashboard (production):

```
RESEND_API_KEY=re_JbMtKyRz_3n55bLDPciMmZfgaez38WzM7
FROM_EMAIL=hello@createsomething.io
```

## Testing Templates

Use Resend's testing tools to preview templates before sending:

1. Log in to Resend dashboard
2. Navigate to Templates
3. Select template and click "Preview"
4. Test with sample data

## Maintenance

When updating templates:

1. Edit the HTML file locally
2. Use the PATCH endpoint to update:

```bash
curl -X PATCH 'https://api.resend.com/templates/{template_id}' \
  -H 'Authorization: Bearer re_JbMtKyRz_3n55bLDPciMmZfgaez38WzM7' \
  -H 'Content-Type: application/json' \
  -d @updated-template.json
```

3. Publish the updated version
4. Test before sending to subscribers
