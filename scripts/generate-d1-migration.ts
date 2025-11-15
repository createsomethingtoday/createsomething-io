#!/usr/bin/env tsx
/**
 * Migration Script: Generate D1 SQL from Supabase
 * Fetches papers from Supabase and generates SQL INSERT statements for Cloudflare D1
 */

import { Client } from 'pg'
import { writeFileSync } from 'fs'
import { join } from 'path'

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is required')
  process.exit(1)
}

interface Paper {
  id: string
  title: string
  category: string
  content: string
  html_content: string | null
  reading_time: number
  difficulty_level: string | null
  technical_focus: string | null
  published_at: string | null
  excerpt_short: string | null
  excerpt_long: string | null
  slug: string
  featured: boolean
  published: boolean
  is_hidden: boolean
  archived: boolean
  date: string | null
  excerpt: string | null
  description: string | null
  thumbnail_image: string | null
  featured_card_image: string | null
  featured_image: string | null
  video_walkthrough_url: string | null
  interactive_demo_url: string | null
  resource_downloads: string | null
  prerequisites: string | null
  meta_title: string | null
  meta_description: string | null
  focus_keywords: string | null
  ascii_art: string | null
  ascii_thumbnail: string | null
  created_at: string
  updated_at: string
}

function escapeSQL(value: string | null | undefined): string {
  if (value === null || value === undefined) return 'NULL'
  // Convert to string if not already
  const str = String(value)
  // Escape single quotes by doubling them
  const escaped = str.replace(/'/g, "''")
  return `'${escaped}'`
}

async function generateD1Migration() {
  console.log('🚀 Generating D1 migration SQL from Supabase...\n')

  const client = new Client({ connectionString: DATABASE_URL })

  try {
    await client.connect()
    console.log('✅ Connected to database\n')

    // Fetch papers
    console.log('📄 Fetching papers...')
    const result = await client.query<Paper>(`
      SELECT *
      FROM papers
      WHERE published = true
      ORDER BY created_at DESC
    `)

    const papers = result.rows
    console.log(`  Found ${papers.length} papers\n`)

    // Generate D1 migration SQL
    console.log('🔄 Generating D1 SQL...\n')

    const migrationSQL: string[] = []

    // Add header
    migrationSQL.push('-- Migration: Import Papers from Supabase to Cloudflare D1')
    migrationSQL.push(`-- Generated: ${new Date().toISOString()}`)
    migrationSQL.push('-- Papers: ' + papers.length)
    migrationSQL.push('')

    // Clear existing data
    migrationSQL.push('-- Clear existing papers')
    migrationSQL.push('DELETE FROM papers;')
    migrationSQL.push('')

    // Generate ASCII art function (for reference)
    function generateAsciiArt(category: string): string {
      const artMap: Record<string, string> = {
        development: `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░
░░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░░░
░▓▓▓▓████ DEV ████ CODE ████▓▓░░`,
        infrastructure: `
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓████ EDGE ████████ CDN ████▓▓▓▓▓`,
        automation: `
███████████████████████████████████████
███░░▒▓▓▓ AUTOMATE ▓▓▓▓▓▓▓▓▓▓▓▒░░███`,
        webflow: `
▒▒░▒▓▓▓ DESIGN ▓▓ BUILD ▓▓▓▓▓▒░▒▒▒`,
        dashboard: `
▓▓▓▓████ DATA ████ CHARTS ████▓▓▓▓`
      }
      return artMap[category] || `\n███ ${category.toUpperCase()} ███\n`
    }

    // Insert Papers
    migrationSQL.push('-- Insert Papers')
    papers.forEach((paper, index) => {
      // Generate ASCII art if not present
      const asciiArt = paper.ascii_art || generateAsciiArt(paper.category)

      const columns = [
        'id', 'title', 'category', 'content', 'html_content', 'reading_time',
        'difficulty_level', 'technical_focus', 'published_at', 'excerpt_short',
        'excerpt_long', 'slug', 'featured', 'published', 'is_hidden', 'archived',
        'date', 'excerpt', 'description', 'thumbnail_image', 'featured_card_image',
        'featured_image', 'video_walkthrough_url', 'interactive_demo_url',
        'resource_downloads', 'prerequisites', 'meta_title', 'meta_description',
        'focus_keywords', 'ascii_art', 'ascii_thumbnail', 'created_at', 'updated_at'
      ]

      const values = [
        escapeSQL(paper.id),
        escapeSQL(paper.title),
        escapeSQL(paper.category),
        escapeSQL(paper.content),
        paper.html_content ? escapeSQL(paper.html_content) : 'NULL',
        String(paper.reading_time || 0),
        paper.difficulty_level ? escapeSQL(paper.difficulty_level) : 'NULL',
        paper.technical_focus ? escapeSQL(paper.technical_focus) : 'NULL',
        paper.published_at ? escapeSQL(paper.published_at) : 'NULL',
        paper.excerpt_short ? escapeSQL(paper.excerpt_short) : 'NULL',
        paper.excerpt_long ? escapeSQL(paper.excerpt_long) : 'NULL',
        escapeSQL(paper.slug),
        String(paper.featured ? 1 : 0),
        String(paper.published ? 1 : 0),
        String(paper.is_hidden ? 1 : 0),
        String(paper.archived ? 1 : 0),
        paper.date ? escapeSQL(paper.date) : 'NULL',
        paper.excerpt ? escapeSQL(paper.excerpt) : 'NULL',
        paper.description ? escapeSQL(paper.description) : 'NULL',
        paper.thumbnail_image ? escapeSQL(paper.thumbnail_image) : 'NULL',
        paper.featured_card_image ? escapeSQL(paper.featured_card_image) : 'NULL',
        paper.featured_image ? escapeSQL(paper.featured_image) : 'NULL',
        paper.video_walkthrough_url ? escapeSQL(paper.video_walkthrough_url) : 'NULL',
        paper.interactive_demo_url ? escapeSQL(paper.interactive_demo_url) : 'NULL',
        paper.resource_downloads ? escapeSQL(paper.resource_downloads) : 'NULL',
        paper.prerequisites ? escapeSQL(paper.prerequisites) : 'NULL',
        paper.meta_title ? escapeSQL(paper.meta_title) : 'NULL',
        paper.meta_description ? escapeSQL(paper.meta_description) : 'NULL',
        paper.focus_keywords ? escapeSQL(paper.focus_keywords) : 'NULL',
        escapeSQL(asciiArt),
        paper.ascii_thumbnail ? escapeSQL(paper.ascii_thumbnail) : 'NULL',
        escapeSQL(paper.created_at),
        escapeSQL(paper.updated_at)
      ]

      migrationSQL.push(`-- Paper ${index + 1}: ${paper.title}`)
      migrationSQL.push(`INSERT INTO papers (${columns.join(', ')})`)
      migrationSQL.push(`VALUES (${values.join(', ')});`)
      migrationSQL.push('')
    })

    // Write migration SQL file
    const outputPath = join(process.cwd(), 'migrations', 'supabase-to-d1.sql')
    writeFileSync(outputPath, migrationSQL.join('\n'))

    console.log(`✅ D1 migration SQL generated: ${outputPath}`)
    console.log('\n📋 Summary:')
    console.log(`  • ${papers.length} papers`)
    console.log('\n🎯 Next steps:')
    console.log('  1. Review the migration file: migrations/supabase-to-d1.sql')
    console.log('  2. Apply to local D1: npx wrangler d1 execute create-something-db --local --file=migrations/supabase-to-d1.sql')
    console.log('  3. Apply to production D1: npx wrangler d1 execute create-something-db --remote --file=migrations/supabase-to-d1.sql')

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

generateD1Migration().catch(console.error)
