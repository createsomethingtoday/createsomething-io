#!/usr/bin/env tsx
/**
 * Update reading times for all papers based on content length
 * Reading speed: 200 words per minute
 */

import { Client } from 'pg'

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is required')
  process.exit(1)
}

function calculateReadingTime(text: string): number {
  // Remove HTML tags
  const plainText = text.replace(/<[^>]*>/g, ' ')
  // Count words (split by whitespace and filter empty strings)
  const words = plainText.split(/\s+/).filter(word => word.length > 0)
  const wordCount = words.length
  // Calculate minutes (200 words per minute, minimum 1 minute)
  const minutes = Math.max(1, Math.round(wordCount / 200))
  return minutes
}

async function updateReadingTimes() {
  console.log('🚀 Updating reading times for all papers...\n')

  const client = new Client({ connectionString: DATABASE_URL })

  try {
    await client.connect()
    console.log('✅ Connected to database\n')

    // Fetch all papers
    const result = await client.query(`
      SELECT id, title, content, html_content, reading_time
      FROM papers
      ORDER BY created_at DESC
    `)

    const papers = result.rows
    console.log(`📄 Found ${papers.length} papers\n`)

    // Update reading times
    for (const paper of papers) {
      const content = paper.html_content || paper.content || ''
      const newReadingTime = calculateReadingTime(content)

      if (newReadingTime !== paper.reading_time) {
        await client.query(
          'UPDATE papers SET reading_time = $1 WHERE id = $2',
          [newReadingTime, paper.id]
        )
        console.log(`✓ ${paper.title}: ${paper.reading_time} → ${newReadingTime} min`)
      } else {
        console.log(`  ${paper.title}: ${newReadingTime} min (unchanged)`)
      }
    }

    console.log(`\n✅ Reading times updated successfully!`)

  } catch (error) {
    console.error('❌ Update failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

updateReadingTimes().catch(console.error)
