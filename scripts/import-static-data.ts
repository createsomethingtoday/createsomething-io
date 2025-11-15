#!/usr/bin/env tsx
/**
 * Import Static Paper Data to D1
 *
 * This script converts the static paper data from the
 * existing Next.js app to SQL format for D1 import.
 */

import { writeFileSync } from 'fs'
import { join } from 'path'

// Paper data from existing app
const papersData = [
  {
    id: 1,
    title: "Event-Driven Notion Updates",
    category: "automation",
    slug: "event-driven-notion-updates",
    reading_time: 15,
    difficulty_level: "Intermediate",
    technical_focus: "Google Cloud Functions, Cloud Pub/Sub, Event-Driven Architecture, Notion API, TypeScript",
    published_on: "2024-06-03",
    excerpt_short: "Learn how to build a scalable event-driven system for automating Notion updates using Google Cloud Platform.",
    excerpt_long: "Discover how to create a robust event-driven system that automates Notion updates using Google Cloud Platform. This comprehensive guide covers everything from architecture design to implementation details, complete with code examples and best practices.",
    content: `# Building a Scalable Integration System

## Summary

Think of your Notion workspace as a living, breathing organism. It needs to stay in sync with multiple systems, respond to changes in real-time, and maintain consistency across hundreds or thousands of pages. But here's the thing - manually keeping everything synchronized is like trying to conduct an orchestra with your hands tied behind your back. It's time for automation to take center stage.

## 1. The Challenge: Why Traditional Approaches Fall Short

Picture this: You're a conductor trying to keep an entire orchestra playing in perfect harmony. But instead of using your baton to guide the musicians, you're running around trying to tap each player on the shoulder when it's their turn. That's what managing Notion updates manually feels like.

Every day, you find yourself caught in an endless cycle. You're constantly checking for changes, running from page to page making updates, and hoping nothing breaks in the process. Time slips through your fingers as you try to keep up with the never-ending stream of updates. It's exhausting, inefficient, and worst of all – prone to errors.

## 2. The Solution: Your Notion Autopilot

Imagine having a smart assistant that knows exactly what needs to be done and when. It's like having a sixth sense for your Notion workspace, automatically detecting when changes are needed and keeping everything in perfect sync. This assistant never sleeps, never makes careless mistakes, and scales effortlessly as your organization grows. This isn't science fiction - it's the power of event-driven architecture!

### 2.1 The Recipe for Success

Think of our solution like a gourmet kitchen, where every component plays a crucial role in creating the perfect dish. Cloud Functions serve as your master chefs, ready to handle any order that comes their way. Your Pub/Sub system works like a well-organized kitchen order system, ensuring no request gets lost in the chaos. Cloud Scheduler acts as your reliable sous chef, handling all the routine tasks with precision. And just like a chef's secret recipes, your API keys and sensitive data stay safely locked away in Secret Manager.

### 2.2 How It All Works Together

Picture a busy night at a high-end restaurant. Orders flow in continuously – some are regular menu items (like database updates), others are special requests (custom triggers), and then there are the daily specials (scheduled tasks). The kitchen works like a well-oiled machine, with each station knowing exactly what to do. First, orders are validated to ensure they meet the restaurant's standards. Then, resources are checked to prevent overwhelming any single station. The entire process is coordinated across different stations, with built-in safeguards to handle any issues that arise. Finally, perfect dishes are delivered to delighted customers.

## 3. Making It Work: The Technical Bits

Here's where we'll show just enough code to get you started:

\`\`\`javascript
const notionKitchen = {
  chefs: cloudFunctions({
    expertise: ['database-updates', 'page-creation', 'sync-operations'],
    operatability: '24/7'
  }),
  orderSystem: pubsub({
    reliability: 'at-least-once',
    orderCapacity: 'unlimited'
  }),
  sousChef: cloudScheduler({
    schedule: 'every 5 minutes',
    tasks: ['check-consistency', 'cleanup-old-data']
  }),
  recipeBook: secretManager({
    secrets: ['notion-api-key', 'service-credentials'],
    access: 'need-to-know-basis'
  })
}
\`\`\`

## 4. Running Like a Well-Oiled Machine

### 4.1 Keeping Watch 👀

Our monitoring system works like a smart security camera with a brain. It doesn't just passively record what's happening – it actively analyzes patterns, predicts potential issues, and alerts the right people before small problems become big ones. Just as a good security system learns the difference between a house cat and an intruder, our monitoring learns what's normal for your system and what needs attention.

### 4.2 Staying Cost-Effective 💰

We've built this system to be as efficient as a modern smart home. Just as your smart thermostat learns your preferences and optimizes energy usage, our system automatically scales resources up and down based on actual needs. It's like having a financial advisor for your cloud resources, ensuring you're never paying for more than you need while always having enough capacity to handle peak demands.

## 5. Lessons from the Trenches

Our journey has taught us invaluable lessons about what makes a system truly production-ready. Event-driven architecture has proven to be not just a design choice, but a fundamental advantage, saving teams countless hours of manual work. We've learned that proper monitoring is like having a good immune system – it catches issues early when they're still easy to fix.

But we've also learned what to watch out for. Rate limits aren't just arbitrary numbers – they're more like speed limits on a highway, designed to keep traffic flowing smoothly. We discovered that global state is like building a house of cards – it might look elegant at first, but one wrong move can bring everything crashing down. Through experience, we've learned that retries need to be strategic, not just persistent, and that caching, while powerful, needs to be handled with care.

## 6. The Future is Bright 🚀

• AI-powered updates that learn from patterns
• Cross-database synchronization that just works
• Custom workflows that adapt to your needs
• Integrations with everything you use

## 7. Wrapping Up

Remember: Building a production-grade system isn't about writing perfect code - it's about solving real problems. Start small, iterate fast, and most importantly, have fun building!

### The Impact 📈

• Hours saved per week: 20+
• Manual updates eliminated: 95%
• Team satisfaction: Through the roof
• Error rate: Nearly zero

Remember: The best automation is the one that feels like magic but works like science! 🎩✨`
  },
  {
    id: 2,
    title: "Webflow Development",
    category: "webflow",
    slug: "webflow-development",
    reading_time: 12,
    difficulty_level: "Beginner",
    technical_focus: "Webflow, CSS, Responsive Design, CMS, SEO",
    published_on: "2024-06-03",
    excerpt_short: "A comprehensive case study of building a healthcare website using Webflow's visual development platform.",
    excerpt_long: "Learn how we transformed an outdated healthcare website into a modern, responsive platform using Webflow. This case study covers the complete process from initial assessment to final launch, including mobile optimization and CMS training.",
    content: `# Webflow Development Guide

## Project Overview

In early 2019, our team was approached by a mid-sized business in the healthcare industry who was looking to improve their online presence. Their current website was outdated and not responsive, so they were losing potential customers and patients who were unable to view the site on mobile devices.

## The Challenge

The company had several key requirements:
- Modernize their outdated website
- Ensure mobile responsiveness
- Enable self-service content updates
- Improve patient engagement
- Maintain professional healthcare standards

## Implementation Process

### 1. Discovery & Planning
- Created comprehensive sitemap
- Developed wireframes for all pages
- Established content strategy
- Defined CMS structure

### 2. Design & Development

\`\`\`javascript
const webflowProject = {
  platform: 'Webflow',
  features: [
    'Responsive Design',
    'CMS Integration',
    'SEO Optimization',
    'Performance Tuning'
  ],
  timeline: '6 weeks',
  outcome: '150% increase in mobile conversions'
}
\`\`\`

### 3. Content Migration
- Migrated existing content
- Optimized for SEO
- Trained client team
- Set up maintenance workflows

## Results Achieved

### Key Metrics
• Mobile Traffic: ↑ 200%
• Conversions: ↑ 150%
• Page Speed: ↑ 300%
• Client Satisfaction: 100%

## Key Features Implemented

• **Responsive Design**: Mobile-first approach
• **CMS Integration**: Easy content management
• **SEO Optimization**: Improved search rankings
• **Performance**: Fast loading times
• **Accessibility**: WCAG compliant

## Technical Implementation

The website was built using Webflow's visual development environment, allowing for:

1. **Visual Development**: No-code approach for rapid prototyping
2. **CMS Flexibility**: Dynamic content management
3. **Hosting Integration**: Seamless deployment and hosting
4. **SEO Tools**: Built-in optimization features

## Client Training & Handoff

We provided comprehensive training covering:
- Content updates and publishing
- Image optimization and management
- SEO best practices
- Analytics and performance monitoring

Since launching their new website, our client has been able to update their content themselves without any issues. They've also seen an increase in mobile traffic and conversions, thanks to the responsive design.`
  },
  {
    id: 3,
    title: "API Integration Patterns",
    category: "development",
    slug: "api-integration-patterns",
    reading_time: 18,
    difficulty_level: "Advanced",
    technical_focus: "REST APIs, GraphQL, WebSockets, Authentication, Error Handling",
    published_on: "2024-06-03",
    excerpt_short: "Learn modern API integration patterns and best practices for building scalable applications.",
    excerpt_long: "A comprehensive guide to API integration patterns covering RESTful APIs, GraphQL, real-time communication, authentication strategies, and error handling techniques for production applications.",
    content: `# API Integration Patterns

## Modern Integration Architecture

Building modern applications requires robust API integration strategies. This guide covers essential patterns and best practices for creating scalable, reliable integrations.

## Integration Patterns

### 1. RESTful APIs

\`\`\`javascript
const apiClient = {
  baseURL: 'https://api.example.com',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  },

  async get(endpoint) {
    const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
      headers: this.headers
    });
    return response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    });
    return response.json();
  }
}
\`\`\`

### 2. GraphQL Integration

\`\`\`javascript
const graphqlClient = {
  endpoint: 'https://api.example.com/graphql',

  async query(query, variables = {}) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${token}\`
      },
      body: JSON.stringify({ query, variables })
    });

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data;
  }
}
\`\`\`

## Error Handling Strategies

Robust error handling is crucial for production applications:

### Circuit Breaker Pattern
- Prevents cascading failures
- Provides fallback responses
- Monitors service health

### Retry Logic
- Exponential backoff
- Jitter to prevent thundering herd
- Maximum retry limits

### Fallback Mechanisms
- Cached responses
- Default values
- Graceful degradation

## Best Practices

• **Authentication**: Secure token management
• **Rate Limiting**: Respect API limits
• **Caching**: Optimize performance
• **Error Handling**: Graceful degradation
• **Monitoring**: Track API health

## Implementation Examples

The guide covers practical implementations for:
1. Authentication flows
2. Data synchronization
3. Real-time updates
4. Error recovery
5. Performance optimization

## WebSocket Integration

For real-time applications:

\`\`\`javascript
const wsClient = {
  connection: null,

  connect(url) {
    this.connection = new WebSocket(url);
    this.connection.onopen = this.handleOpen;
    this.connection.onmessage = this.handleMessage;
    this.connection.onerror = this.handleError;
  },

  send(data) {
    if (this.connection.readyState === WebSocket.OPEN) {
      this.connection.send(JSON.stringify(data));
    }
  }
}
\`\`\`

## Security Considerations

- HTTPS everywhere
- Token rotation
- Input validation
- Rate limiting
- CORS configuration

Building robust API integrations requires careful consideration of these patterns and practices to ensure scalable, maintainable applications.`
  },
  {
    id: 4,
    title: "Event Automation",
    category: "automation",
    slug: "event-automation",
    reading_time: 10,
    difficulty_level: "Intermediate",
    technical_focus: "Xano, Jetadmin, API Development, Event Management, Automation",
    published_on: "2024-06-02",
    excerpt_short: "API Development for a coaching business looking to automate the creation of their online events.",
    excerpt_long: "API development for a coaching business can be a great way to automate the creation of online events. By creating an API, businesses can easily connect their coaching software to their website or other online platforms, making it easy to create and manage events without having to manually input data.",
    content: `# Event Automation System

## The Challenge

The coaching business, Conscious Leadership Group (CLG), wanted to automate the creation of online events for their clients. Previously, the process involved manually creating events, sharing information between Eventbrite & Webflow, and creating Zoom meeting links, which was time-consuming and prone to errors.

## The Solution

To automate this process, we at Create Something utilized our Xano instance as the no-code backend and Jetadmin as the internal dashboard.

First, we used Xano to create a RESTful API that would handle the creation, management, and integration of online events. This included defining the endpoints and input/output parameters for each API call, such as creating a new event, sharing information between Eventbrite & Webflow, and creating Zoom meeting links.

## Implementation Details

### API Architecture
- RESTful endpoints for event management
- Integration with Eventbrite API
- Webflow CMS automation
- Zoom meeting creation
- Error handling and validation

### Dashboard Development
Next, we used Jetadmin to create an internal dashboard that would allow the coaching team to easily manage events and share information. This included setting up user roles, defining access permissions, and creating intuitive user interfaces for creating, managing, and tracking events.

### Key Features
- Event creation workflow
- Multi-platform synchronization
- Automated meeting link generation
- User role management
- Real-time status tracking

## Results

Once the API and dashboard were set up, CLG was able to automate the creation of online events. The coaching team could easily create new events and share information between tools, all within the Jetadmin dashboard. This saved them time and reduced the potential for errors, allowing them to focus on providing high-quality coaching services to their clients.

## Technical Benefits

• **Time Savings**: Reduced manual work by 80%
• **Error Reduction**: Eliminated data entry mistakes
• **Scalability**: Handle increased event volume
• **Integration**: Seamless tool connectivity
• **User Experience**: Streamlined workflow

Overall, the use of Xano and Jetadmin allowed the Conscious Leadership Group to automate their online event creation process, improving efficiency and accuracy.`
  },
  {
    id: 5,
    title: "Gmail to Notion Sync",
    category: "automation",
    slug: "gmail-to-notion-sync",
    reading_time: 25,
    difficulty_level: "Advanced",
    technical_focus: "Next.js, Gmail API, Notion API, OAuth, JavaScript, TypeScript",
    published_on: "2024-06-03",
    excerpt_short: "The Next.js app we'll be exploring is designed to sync emails from a Gmail account to Notion databases.",
    excerpt_long: "The Next.js app we'll be exploring is designed to sync emails from a Gmail account to Notion databases. It provides a seamless way to capture email data and store it in a structured format within Notion. The app leverages the power of Next.js, a popular React framework, to build a fast and efficient web application.",
    content: `# Gmail to Notion Sync Application

## 1. Introduction

The Next.js app we'll be exploring is designed to sync emails from a Gmail account to Notion databases. It provides a seamless way to capture email data and store it in a structured format within Notion. The app leverages the power of Next.js, a popular React framework, to build a fast and efficient web application.

## 2. Prerequisites

Before diving into the app's features and functions, ensure that you have the following prerequisites:

• Node.js installed on your machine
• Basic knowledge of Next.js and React
• Familiarity with JavaScript and TypeScript
• A Gmail account with the "log" label configured
• A Notion account with the necessary permissions

## 3. Setting Up the Next.js App

To get started, create a new Next.js app using the following command:

\`\`\`bash
npx create-next-app@latest next-notion-email-sync
\`\`\`

Choose the appropriate options for your project, such as the programming language (JavaScript or TypeScript) and the styling framework (e.g., Tailwind CSS).

Navigate to the project directory:

\`\`\`bash
cd next-notion-email-sync
\`\`\`

Install the required dependencies:

\`\`\`bash
npm install @notionhq/client nookies
\`\`\`

## 4. Configuring Environment Variables

Create a \`.env.local\` file in the root directory of your project and add the following environment variables:

\`\`\`env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback
NOTION_CLIENT_ID=your_notion_client_id
NOTION_CLIENT_SECRET=your_notion_client_secret
NOTION_REDIRECT_URI=http://localhost:3000/api/auth/notion/callback
\`\`\`

Replace the placeholders with your actual values obtained from the Google and Notion developer consoles.

## 5. Implementing Gmail Authentication

Create a new file \`pages/api/auth/login.js\` and add the authentication logic:

\`\`\`javascript
import { getGoogleAuthURL } from '../../../lib/googleAPI';

export default function handler(req, res) {
  const authURL = getGoogleAuthURL();
  res.redirect(authURL);
}
\`\`\`

This API route handles the Gmail authentication process by redirecting the user to the Google authentication URL.

## 6. Syncing Emails from Gmail

The core functionality involves:

### Email Fetching
- Connect to Gmail API
- Filter emails with specific labels
- Extract relevant metadata
- Handle pagination for large volumes

### Data Processing
- Parse email headers
- Extract sender information
- Process email content
- Normalize data format

## 7. Implementing Notion Authentication

Create the Notion authentication flow:

\`\`\`javascript
export const getNotionAuthURL = () => {
  const baseURL = 'https://api.notion.com/v1/oauth/authorize';
  const params = new URLSearchParams({
    client_id: process.env.NOTION_CLIENT_ID,
    response_type: 'code',
    owner: 'user',
    redirect_uri: process.env.NOTION_REDIRECT_URI
  });

  return \`\${baseURL}?\${params.toString()}\`;
};
\`\`\`

## 8. Database Operations

### Creating Records
- Map email fields to Notion properties
- Handle different property types
- Batch operations for efficiency
- Error handling and retry logic

### Updating Records
- Check for existing records
- Update modified fields
- Maintain data consistency
- Track sync status

## 9. Field Mapping Configuration

The application allows users to:
- Select target Notion databases
- Map email fields to database properties
- Configure custom field transformations
- Set up filtering rules

## 10. Error Handling and Edge Cases

Throughout the app, comprehensive error handling includes:
- API rate limiting
- Authentication token refresh
- Network connectivity issues
- Data validation errors
- Graceful fallback mechanisms

## 11. User Interface Components

The app features:
- Clean, intuitive dashboard
- Real-time sync status
- Configuration panels
- Progress indicators
- Error notifications

## 12. Deployment Considerations

For production deployment:
- Environment variable configuration
- SSL certificate setup
- Rate limiting implementation
- Monitoring and logging
- Backup and recovery procedures

## Conclusion

This Gmail to Notion sync application demonstrates the power of integrating modern APIs to create useful automation tools. By following this guide, you can build similar integrations that bridge different platforms and streamline workflows.

Key takeaways:
- OAuth authentication flows
- API integration patterns
- Data transformation techniques
- Error handling strategies
- User experience design`
  }
]

// Generate UUID from index for consistency
function generateUUID(index: number): string {
  // Generate consistent UUIDs for each paper
  const uuids = [
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890', // Paper 1
    'b2c3d4e5-f678-9012-bcde-f23456789012', // Paper 2
    'c3d4e5f6-7890-1234-cdef-345678901234', // Paper 3
    'd4e5f6a7-8901-2345-defa-456789012345', // Paper 4
    'e5f6a7b8-9012-3456-efab-567890123456'  // Paper 5
  ]
  return uuids[index] || `generated-${index}-0000-0000-000000000000`
}

// Convert to D1 SQL format
function generateD1SQL(): string {
  const sql: string[] = []

  // Add header
  sql.push('-- Static Paper Data Import for D1')
  sql.push('-- Generated from existing Create Something papers')
  sql.push('')
  sql.push('BEGIN TRANSACTION;')
  sql.push('')

  // Clear existing papers (optional)
  sql.push('-- Clear existing papers (uncomment if needed)')
  sql.push('-- DELETE FROM papers;')
  sql.push('')

  // Insert papers
  sql.push('-- Insert Papers')
  papersData.forEach((paper, index) => {
    const uuid = generateUUID(index)
    const now = new Date().toISOString()

    // Generate HTML content from markdown
    const htmlContent = paper.content
      .replace(/'/g, "''") // Escape single quotes
      .replace(/\n/g, '\\n') // Preserve newlines

    const values = [
      `'${uuid}'`, // id
      `'${paper.title.replace(/'/g, "''")}'`, // title
      `'${paper.category}'`, // category
      `'${paper.content.replace(/'/g, "''").replace(/\n/g, '\\n')}'`, // content
      `'${htmlContent}'`, // html_content (same as content for now)
      paper.reading_time || 10, // reading_time
      paper.difficulty_level ? `'${paper.difficulty_level}'` : 'NULL', // difficulty_level
      paper.technical_focus ? `'${paper.technical_focus.replace(/'/g, "''")}'` : 'NULL', // technical_focus
      paper.published_on ? `'${paper.published_on}'` : 'NULL', // published_on
      paper.excerpt_short ? `'${paper.excerpt_short.replace(/'/g, "''")}'` : 'NULL', // excerpt_short
      paper.excerpt_long ? `'${paper.excerpt_long.replace(/'/g, "''")}'` : 'NULL', // excerpt_long
      `'${paper.slug}'`, // slug
      0, // featured
      1, // published
      0, // is_hidden
      0, // archived
      paper.published_on ? `'${paper.published_on}'` : 'NULL', // date
      paper.excerpt_short ? `'${paper.excerpt_short.replace(/'/g, "''")}'` : 'NULL', // excerpt
      paper.excerpt_long ? `'${paper.excerpt_long.replace(/'/g, "''")}'` : 'NULL', // description
      'NULL', // thumbnail_image
      'NULL', // featured_card_image
      'NULL', // featured_image
      'NULL', // video_walkthrough_url
      'NULL', // interactive_demo_url
      'NULL', // resource_downloads
      'NULL', // prerequisites
      `'${paper.title.replace(/'/g, "''")} | Create Something'`, // meta_title
      paper.excerpt_short ? `'${paper.excerpt_short.replace(/'/g, "''")}'` : 'NULL', // meta_description
      paper.technical_focus ? `'${paper.technical_focus.replace(/'/g, "''")}'` : 'NULL', // focus_keywords
      `'${now}'`, // created_at
      `'${now}'`, // updated_at
      `'${now}'` // published_at
    ]

    sql.push(`INSERT INTO papers (
  id, title, category, content, html_content, reading_time, difficulty_level,
  technical_focus, published_on, excerpt_short, excerpt_long, slug, featured,
  published, is_hidden, archived, date, excerpt, description, thumbnail_image,
  featured_card_image, featured_image, video_walkthrough_url, interactive_demo_url,
  resource_downloads, prerequisites, meta_title, meta_description, focus_keywords,
  created_at, updated_at, published_at
) VALUES (
  ${values.join(',\n  ')}
);`)
    sql.push('')
  })

  // Create sample tags
  sql.push('-- Insert Sample Tags')
  const tags = [
    { id: 'tag-001', name: 'Automation', slug: 'automation' },
    { id: 'tag-002', name: 'Webflow', slug: 'webflow' },
    { id: 'tag-003', name: 'Development', slug: 'development' },
    { id: 'tag-004', name: 'API', slug: 'api' },
    { id: 'tag-005', name: 'Next.js', slug: 'nextjs' }
  ]

  tags.forEach(tag => {
    sql.push(`INSERT INTO tags (id, name, slug, created_at) VALUES ('${tag.id}', '${tag.name}', '${tag.slug}', '${new Date().toISOString()}');`)
  })
  sql.push('')

  // Link papers to tags
  sql.push('-- Link Papers to Tags')
  sql.push(`INSERT INTO paper_tags (paper_id, tag_id) VALUES ('${generateUUID(0)}', 'tag-001');`) // Event-Driven Notion Updates
  sql.push(`INSERT INTO paper_tags (paper_id, tag_id) VALUES ('${generateUUID(1)}', 'tag-002');`) // Webflow Development
  sql.push(`INSERT INTO paper_tags (paper_id, tag_id) VALUES ('${generateUUID(2)}', 'tag-003');`) // API Integration Patterns
  sql.push(`INSERT INTO paper_tags (paper_id, tag_id) VALUES ('${generateUUID(2)}', 'tag-004');`) // API Integration Patterns
  sql.push(`INSERT INTO paper_tags (paper_id, tag_id) VALUES ('${generateUUID(3)}', 'tag-001');`) // Event Automation
  sql.push(`INSERT INTO paper_tags (paper_id, tag_id) VALUES ('${generateUUID(4)}', 'tag-001');`) // Gmail to Notion Sync
  sql.push(`INSERT INTO paper_tags (paper_id, tag_id) VALUES ('${generateUUID(4)}', 'tag-005');`) // Gmail to Notion Sync
  sql.push('')

  // Create demo user
  sql.push('-- Create Demo User')
  sql.push(`INSERT INTO users (
  id, username, email, password_hash, role, created_at, updated_at
) VALUES (
  'demo-user-001',
  'demo',
  'demo@createsomething.agency',
  'demo-hash', -- This should be properly hashed in production
  'user',
  '${new Date().toISOString()}',
  '${new Date().toISOString()}'
);`)
  sql.push('')

  sql.push('COMMIT;')

  return sql.join('\n')
}

// Generate and save SQL file
const sqlContent = generateD1SQL()
const outputPath = join(process.cwd(), 'seed-data.sql')
writeFileSync(outputPath, sqlContent)

console.log('✅ D1 seed data generated successfully!')
console.log(`📄 Output file: ${outputPath}`)
console.log('\n📊 Summary:')
console.log(`  • ${papersData.length} papers`)
console.log(`  • 5 tags`)
console.log(`  • 1 demo user`)
console.log('\n🎯 Next steps:')
console.log('  1. Create D1 database: npx wrangler d1 create create-something-db')
console.log('  2. Run schema: npx wrangler d1 execute create-something-db --file=schema.sql')
console.log('  3. Seed data: npx wrangler d1 execute create-something-db --file=seed-data.sql')
console.log('  4. Update wrangler.jsonc with the database ID')