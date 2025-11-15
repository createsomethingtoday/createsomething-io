import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

interface Env {
  DB: D1Database
  SESSIONS: KVNamespace
  CACHE: KVNamespace
  STORAGE: R2Bucket
  RESEND_API_KEY: string
}

interface ContactRequest {
  name: string
  email: string
  message: string
}

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as ContactRequest
          const { name, email, message } = body

          // Validate inputs
          if (!name || !name.trim()) {
            return json({
              success: false,
              message: 'Name is required'
            }, { status: 400 })
          }

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

          if (!message || !message.trim()) {
            return json({
              success: false,
              message: 'Message is required'
            }, { status: 400 })
          }

          // Access Cloudflare bindings
          const env = (request as any).env as Env

          // Store contact submission in D1 database (optional - create table if needed)
          try {
            await env.DB.prepare(`
              INSERT INTO contact_submissions (name, email, message, submitted_at)
              VALUES (?, ?, ?, datetime('now'))
            `).bind(name, email, message).run()
          } catch (dbError) {
            // Table might not exist - that's okay, we'll still send the emails
            console.warn('Contact submissions table not found - skipping DB insert')
          }

          // Send auto-response to the person who contacted us
          const autoResponsePromise = fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${env.RESEND_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'Micah Johnson <hello@createsomething.io>',
              to: email,
              subject: 'Thanks for reaching out',
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
    .message-box { background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 20px; margin: 30px 0; }
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
      <h1>Thanks for reaching out</h1>

      <p>Hi ${name},</p>

      <p>I've received your message and will get back to you as soon as possible — typically within 24-48 hours.</p>

      <div class="message-box">
        <p style="color: rgba(255, 255, 255, 0.4); font-size: 14px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Your Message:</p>
        <p style="color: rgba(255, 255, 255, 0.9); margin: 0;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
      </div>

      <p>In the meantime, you might be interested in:</p>
      <ul style="color: rgba(255, 255, 255, 0.7); line-height: 1.8;">
        <li><a href="https://createsomething.io/methodology" style="color: rgba(255, 255, 255, 0.9); text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.3);">Our Research Methodology</a> — How we track experiments</li>
        <li><a href="https://createsomething.io/articles" style="color: rgba(255, 255, 255, 0.9); text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.3);">Latest Experiments</a> — Recent builds with real data</li>
        <li><a href="https://github.com/createsomethingtoday/create-something-experiments" style="color: rgba(255, 255, 255, 0.9); text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.3);">Claude Code Skill</a> — Track your own experiments</li>
      </ul>

      <p style="margin-top: 40px;">
        — Micah Johnson<br>
        <span style="color: rgba(255, 255, 255, 0.4); font-size: 14px;">CREATE SOMETHING</span>
      </p>
    </div>

    <div class="footer">
      <p>
        <a href="https://createsomething.io">createsomething.io</a> •
        <a href="https://www.linkedin.com/in/micahryanjohnson/">LinkedIn</a>
      </p>
      <p style="margin-top: 10px;">This is an automated confirmation. I'll reply personally soon.</p>
    </div>
  </div>
</body>
</html>`
            })
          })

          // Send notification to site owner (optional)
          const notificationPromise = fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${env.RESEND_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'CREATE SOMETHING <hello@createsomething.io>',
              to: 'hello@createsomething.io',
              replyTo: email,
              subject: `New Contact Form Submission from ${name}`,
              html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #000; color: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .content { background: #f5f5f5; padding: 20px; border-radius: 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #666; }
    .value { margin-top: 5px; }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin: 0;">New Contact Form Submission</h2>
  </div>

  <div class="content">
    <div class="field">
      <div class="label">From:</div>
      <div class="value">${name} (${email})</div>
    </div>

    <div class="field">
      <div class="label">Message:</div>
      <div class="value">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</div>
    </div>

    <div class="field">
      <div class="label">Submitted:</div>
      <div class="value">${new Date().toUTCString()}</div>
    </div>
  </div>

  <p style="margin-top: 20px; color: #666; font-size: 14px;">Reply directly to this email to respond to ${name}.</p>
</body>
</html>`
            })
          })

          // Wait for both emails to send
          const [autoResponse, notification] = await Promise.all([
            autoResponsePromise,
            notificationPromise
          ])

          if (!autoResponse.ok) {
            const errorData = await autoResponse.json()
            console.error('Resend auto-response error:', errorData)
            return json({
              success: false,
              message: 'Failed to send confirmation email'
            }, { status: 500 })
          }

          if (!notification.ok) {
            const errorData = await notification.json()
            console.error('Resend notification error:', errorData)
            // Continue anyway - auto-response was sent successfully
          }

          return json({
            success: true,
            message: 'Message sent successfully! You should receive a confirmation email shortly.'
          })

        } catch (error) {
          console.error('Contact form error:', error)
          return json({
            success: false,
            message: `Error processing contact form: ${error instanceof Error ? error.message : 'Unknown error'}`
          }, { status: 500 })
        }
      },
    },
  },
})
