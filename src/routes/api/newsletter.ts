import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

interface Env {
  DB: D1Database
  SESSIONS: KVNamespace
  CACHE: KVNamespace
  STORAGE: R2Bucket
  RESEND_API_KEY: string
}

interface NewsletterRequest {
  email: string
}

export const Route = createFileRoute('/api/newsletter')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as NewsletterRequest
          const { email } = body

          // Validate email
          if (!email || !email.trim()) {
            return json({
              success: false,
              message: 'Email is required'
            }, { status: 400 })
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(email)) {
            return json({
              success: false,
              message: 'Invalid email format'
            }, { status: 400 })
          }

          // Access Cloudflare bindings
          const env = (request as any).env as Env

          // Generate unsubscribe token (simple version - you might want to use crypto.randomUUID())
          const unsubscribeToken = btoa(`${email}:${Date.now()}`)

          // Store subscriber in D1 database (optional - create table if needed)
          try {
            await env.DB.prepare(`
              INSERT OR IGNORE INTO newsletter_subscribers (email, subscribed_at, unsubscribe_token)
              VALUES (?, datetime('now'), ?)
            `).bind(email, unsubscribeToken).run()
          } catch (dbError) {
            // Table might not exist - that's okay, we'll still send the welcome email
            console.warn('Newsletter subscribers table not found - skipping DB insert')
          }

          // Send welcome email via Resend
          const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${env.RESEND_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'CREATE SOMETHING <hello@createsomething.io>',
              to: email,
              subject: 'Welcome to CREATE SOMETHING',
              html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #000000; color: #ffffff; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    .logo { font-size: 24px; font-weight: bold; color: #ffffff; margin-bottom: 10px; }
    .content { line-height: 1.8; }
    .content h1 { font-size: 28px; margin-bottom: 20px; color: #ffffff; }
    .content p { color: rgba(255, 255, 255, 0.7); margin-bottom: 20px; }
    .cta-button { display: inline-block; padding: 14px 32px; background-color: #ffffff; color: #000000; text-decoration: none; border-radius: 50px; font-weight: 600; margin: 30px 0; }
    .cta-button:hover { background-color: rgba(255, 255, 255, 0.9); }
    .footer { margin-top: 60px; padding-top: 30px; border-top: 1px solid rgba(255, 255, 255, 0.1); text-align: center; color: rgba(255, 255, 255, 0.4); font-size: 14px; }
    .footer a { color: rgba(255, 255, 255, 0.6); text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">CREATE SOMETHING</div>
      <p style="color: rgba(255, 255, 255, 0.6); margin: 0;">Systems thinking for AI-native development</p>
    </div>

    <div class="content">
      <h1>Welcome to CREATE SOMETHING</h1>

      <p>Thanks for subscribing, ${email}!</p>

      <p>You're now part of a community focused on <strong>systematic evaluation of AI-native development</strong> — not just blog posts, but tracked experiments with real data.</p>

      <p><strong>What you'll receive:</strong></p>
      <ul style="color: rgba(255, 255, 255, 0.7); line-height: 1.8;">
        <li>New experiment papers with precise metrics (time, costs, interventions)</li>
        <li>Architecture patterns from Claude Code + Cloudflare builds</li>
        <li>Honest assessments of what works (and what doesn't)</li>
        <li>No regular schedule, no marketing — just valuable insights when ready</li>
      </ul>

      <a href="https://createsomething.io/methodology" class="cta-button">See Our Research Methodology</a>

      <p>Recent experiment: Built Zoom transcript automation in 26 hours (78% time savings) — tracked with real-time logging, $26.80 in costs, 47 errors documented.</p>

      <p>Looking forward to sharing what we learn.</p>

      <p style="margin-top: 40px;">
        — Micah Johnson<br>
        <span style="color: rgba(255, 255, 255, 0.4); font-size: 14px;">CREATE SOMETHING</span>
      </p>
    </div>

    <div class="footer">
      <p>
        <a href="https://createsomething.io">createsomething.io</a> •
        <a href="https://createsomething.io/unsubscribe?token=${unsubscribeToken}">Unsubscribe</a>
      </p>
      <p style="margin-top: 10px;">You're receiving this because you subscribed to CREATE SOMETHING</p>
    </div>
  </div>
</body>
</html>`
            })
          })

          if (!resendResponse.ok) {
            const errorData = await resendResponse.json()
            console.error('Resend API error:', errorData)
            return json({
              success: false,
              message: 'Failed to send welcome email'
            }, { status: 500 })
          }

          const resendData = await resendResponse.json()

          return json({
            success: true,
            message: 'Successfully subscribed! Check your email for a welcome message.',
            emailId: resendData.id
          })

        } catch (error) {
          console.error('Newsletter signup error:', error)
          return json({
            success: false,
            message: `Error processing newsletter signup: ${error instanceof Error ? error.message : 'Unknown error'}`
          }, { status: 500 })
        }
      },
    },
  },
})
