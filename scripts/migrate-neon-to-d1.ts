#!/usr/bin/env tsx
/**
 * Migration Script: Neon PostgreSQL → Cloudflare D1
 *
 * This script migrates data from the existing Neon database
 * to Cloudflare D1 for the TanStack Start migration.
 */

import { Client } from 'pg'
import { readFileSync } from 'fs'
import { join } from 'path'

// Database connection (from environment variable)
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
  published_on: string | null
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
  created_at: string
  updated_at: string
  published_at: string | null
}

interface User {
  id: string
  username: string
  email: string
  password_hash: string
  role: string
  created_at: string
  updated_at: string
  last_login: string | null
  preferences: any
}

interface Tag {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

async function migrateFromNeon() {
  console.log('🚀 Starting migration from Neon to D1...\n')

  // Connect to database (force IPv4)
  const dbClient = new Client({
    connectionString: DATABASE_URL,
    // Force IPv4 to avoid ENETUNREACH error
    host: 'db.qiwvtkgbvloqrkiyseyi.supabase.co',
    ssl: { rejectUnauthorized: false }
  })

  try {
    await dbClient.connect()
    console.log('✅ Connected to database\n')

    // 1. Fetch Papers
    console.log('📄 Fetching papers...')
    const papersResult = await dbClient.query<Paper>(`
      SELECT * FROM papers
      ORDER BY created_at ASC
    `)
    console.log(`  Found ${papersResult.rows.length} papers\n`)

    // 2. Fetch Users
    console.log('👤 Fetching users...')
    const usersResult = await dbClient.query<User>(`
      SELECT * FROM users
      ORDER BY created_at ASC
    `)
    console.log(`  Found ${usersResult.rows.length} users\n`)

    // 3. Fetch Tags
    console.log('🏷️  Fetching tags...')
    const tagsResult = await dbClient.query<Tag>(`
      SELECT * FROM tags
      ORDER BY name ASC
    `)
    console.log(`  Found ${tagsResult.rows.length} tags\n`)

    // 4. Fetch Paper Tags
    console.log('🔗 Fetching paper-tag relationships...')
    const paperTagsResult = await dbClient.query(`
      SELECT * FROM paper_tags
    `)
    console.log(`  Found ${paperTagsResult.rows.length} relationships\n`)

    // 5. Fetch Saved Papers
    console.log('💾 Fetching saved papers...')
    const savedPapersResult = await dbClient.query(`
      SELECT * FROM saved_papers
    `)
    console.log(`  Found ${savedPapersResult.rows.length} saved papers\n`)

    // Generate D1 migration SQL
    console.log('🔄 Generating D1 migration SQL...\n')

    const migrationSQL: string[] = []

    // Add transaction wrapper
    migrationSQL.push('BEGIN TRANSACTION;')
    migrationSQL.push('')

    // Clear existing data (optional, remove if appending)
    migrationSQL.push('-- Clear existing data')
    migrationSQL.push('DELETE FROM paper_tags;')
    migrationSQL.push('DELETE FROM saved_papers;')
    migrationSQL.push('DELETE FROM papers;')
    migrationSQL.push('DELETE FROM users;')
    migrationSQL.push('DELETE FROM tags;')
    migrationSQL.push('')

    // Insert Papers
    migrationSQL.push('-- Insert Papers')
    papersResult.rows.forEach(paper => {
      const values = [
        `'${paper.id}'`,
        `'${paper.title.replace(/'/g, "''")}'`,
        `'${paper.category.replace(/'/g, "''")}'`,
        `'${paper.content.replace(/'/g, "''")}'`,
        paper.html_content ? `'${paper.html_content.replace(/'/g, "''")}'` : 'NULL',
        paper.reading_time,
        paper.difficulty_level ? `'${paper.difficulty_level}'` : 'NULL',
        paper.technical_focus ? `'${paper.technical_focus.replace(/'/g, "''")}'` : 'NULL',
        paper.published_on ? `'${paper.published_on}'` : 'NULL',
        paper.excerpt_short ? `'${paper.excerpt_short.replace(/'/g, "''")}'` : 'NULL',
        paper.excerpt_long ? `'${paper.excerpt_long.replace(/'/g, "''")}'` : 'NULL',
        `'${paper.slug.replace(/'/g, "''")}'`,
        paper.featured ? 1 : 0,
        paper.published ? 1 : 0,
        paper.is_hidden ? 1 : 0,
        paper.archived ? 1 : 0,
        paper.date ? `'${paper.date}'` : 'NULL',
        paper.excerpt ? `'${paper.excerpt.replace(/'/g, "''")}'` : 'NULL',
        paper.description ? `'${paper.description.replace(/'/g, "''")}'` : 'NULL',
        paper.thumbnail_image ? `'${paper.thumbnail_image}'` : 'NULL',
        paper.featured_card_image ? `'${paper.featured_card_image}'` : 'NULL',
        paper.featured_image ? `'${paper.featured_image}'` : 'NULL',
        paper.video_walkthrough_url ? `'${paper.video_walkthrough_url}'` : 'NULL',
        paper.interactive_demo_url ? `'${paper.interactive_demo_url}'` : 'NULL',
        paper.resource_downloads ? `'${paper.resource_downloads.replace(/'/g, "''")}'` : 'NULL',
        paper.prerequisites ? `'${paper.prerequisites.replace(/'/g, "''")}'` : 'NULL',
        paper.meta_title ? `'${paper.meta_title.replace(/'/g, "''")}'` : 'NULL',
        paper.meta_description ? `'${paper.meta_description.replace(/'/g, "''")}'` : 'NULL',
        paper.focus_keywords ? `'${paper.focus_keywords.replace(/'/g, "''")}'` : 'NULL',
        `'${paper.created_at}'`,
        `'${paper.updated_at}'`,
        paper.published_at ? `'${paper.published_at}'` : 'NULL'
      ]

      migrationSQL.push(`INSERT INTO papers (
        id, title, category, content, html_content, reading_time, difficulty_level,
        technical_focus, published_on, excerpt_short, excerpt_long, slug, featured,
        published, is_hidden, archived, date, excerpt, description, thumbnail_image,
        featured_card_image, featured_image, video_walkthrough_url, interactive_demo_url,
        resource_downloads, prerequisites, meta_title, meta_description, focus_keywords,
        created_at, updated_at, published_at
      ) VALUES (${values.join(', ')});`)
    })
    migrationSQL.push('')

    // Insert Users
    migrationSQL.push('-- Insert Users')
    usersResult.rows.forEach(user => {
      const values = [
        `'${user.id}'`,
        `'${user.username.replace(/'/g, "''")}'`,
        `'${user.email.replace(/'/g, "''")}'`,
        `'${user.password_hash}'`,
        `'${user.role}'`,
        `'${user.created_at}'`,
        `'${user.updated_at}'`,
        user.last_login ? `'${user.last_login}'` : 'NULL',
        user.preferences ? `'${JSON.stringify(user.preferences).replace(/'/g, "''")}'` : 'NULL'
      ]

      migrationSQL.push(`INSERT INTO users (
        id, username, email, password_hash, role, created_at, updated_at,
        last_login, preferences
      ) VALUES (${values.join(', ')});`)
    })
    migrationSQL.push('')

    // Insert Tags
    migrationSQL.push('-- Insert Tags')
    tagsResult.rows.forEach(tag => {
      const values = [
        `'${tag.id}'`,
        `'${tag.name.replace(/'/g, "''")}'`,
        `'${tag.slug.replace(/'/g, "''")}'`,
        tag.description ? `'${tag.description.replace(/'/g, "''")}'` : 'NULL',
        `'${tag.created_at}'`
      ]

      migrationSQL.push(`INSERT INTO tags (
        id, name, slug, description, created_at
      ) VALUES (${values.join(', ')});`)
    })
    migrationSQL.push('')

    // Insert Paper Tags
    migrationSQL.push('-- Insert Paper Tags')
    paperTagsResult.rows.forEach(pt => {
      migrationSQL.push(`INSERT INTO paper_tags (paper_id, tag_id) VALUES ('${pt.paper_id}', '${pt.tag_id}');`)
    })
    migrationSQL.push('')

    // Insert Saved Papers
    migrationSQL.push('-- Insert Saved Papers')
    savedPapersResult.rows.forEach(sp => {
      const values = [
        `'${sp.user_id}'`,
        `'${sp.paper_id}'`,
        `'${sp.saved_at}'`,
        sp.notes ? `'${sp.notes.replace(/'/g, "''")}'` : 'NULL'
      ]
      migrationSQL.push(`INSERT INTO saved_papers (user_id, paper_id, saved_at, notes) VALUES (${values.join(', ')});`)
    })
    migrationSQL.push('')

    // Commit transaction
    migrationSQL.push('COMMIT;')

    // Write migration SQL file
    const outputPath = join(process.cwd(), 'migration-data.sql')
    const fs = await import('fs/promises')
    await fs.writeFile(outputPath, migrationSQL.join('\n'))

    console.log(`✅ Migration SQL generated: ${outputPath}`)
    console.log('\n📋 Summary:')
    console.log(`  • ${papersResult.rows.length} papers`)
    console.log(`  • ${usersResult.rows.length} users`)
    console.log(`  • ${tagsResult.rows.length} tags`)
    console.log(`  • ${paperTagsResult.rows.length} paper-tag relationships`)
    console.log(`  • ${savedPapersResult.rows.length} saved papers`)
    console.log('\n🎯 Next steps:')
    console.log('  1. Create D1 database: npx wrangler d1 create create-something-db')
    console.log('  2. Run schema: npx wrangler d1 execute create-something-db --file=schema.sql')
    console.log('  3. Import data: npx wrangler d1 execute create-something-db --file=migration-data.sql')
    console.log('  4. Update wrangler.jsonc with the database ID')

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await dbClient.end()
  }
}

// Run migration
migrateFromNeon().catch(console.error)