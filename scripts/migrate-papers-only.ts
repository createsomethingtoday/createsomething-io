#!/usr/bin/env tsx
/**
 * Migration Script: Fetch Papers from Supabase
 * Simplified version that only fetches papers table
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
  slug: string
  excerpt_short: string | null
  excerpt_long: string | null
  reading_time: number
  difficulty_level: string | null
  technical_focus: string | null
  published_on: string | null
  featured: boolean
  published: boolean
  created_at: string
}

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
▒▒░▒▓▓▓ DESIGN ▓▓ BUILD ▓▓▓▓▓▒░▒▒▒`
  }
  return artMap[category] || `\n███ ${category.toUpperCase()} ███\n`
}

async function fetchPapers() {
  console.log('🚀 Fetching papers from Supabase...\n')

  const client = new Client({ connectionString: DATABASE_URL })

  try {
    await client.connect()
    console.log('✅ Connected to database\n')

    // Fetch papers
    console.log('📄 Fetching papers...')
    const result = await client.query<any>(`
      SELECT *
      FROM papers
      WHERE published = true
      ORDER BY created_at DESC
    `)

    const papers = result.rows
    console.log(`  Found ${papers.length} papers\n`)

    // Generate TypeScript mock data
    const mockDataContent = `// Auto-generated from Supabase database
import type { Paper } from '../types/paper'

export const mockPapers: Paper[] = ${JSON.stringify(papers.map(p => ({
  ...p,
  featured: p.featured ? 1 : 0,
  published: p.published ? 1 : 0,
  is_hidden: 0,
  archived: 0,
  ascii_art: generateAsciiArt(p.category)
})), null, 2)}

function generateAsciiArt(category: string): string {
  // Placeholder ASCII art - customize as needed
  return \`
███████████████████████████████████████
█░░░░░░░░░░░░ \${category.toUpperCase()} ░░░░░░░░░░░█
███████████████████████████████████████
  \`.trim()
}

export const mockCategories = [
  { name: 'Development', slug: 'development', count: ${papers.filter(p => p.category === 'development').length} },
  { name: 'Infrastructure', slug: 'infrastructure', count: ${papers.filter(p => p.category === 'infrastructure').length} },
  { name: 'Automation', slug: 'automation', count: ${papers.filter(p => p.category === 'automation').length} },
  { name: 'Webflow', slug: 'webflow', count: ${papers.filter(p => p.category === 'webflow').length} }
]

export function getMockPaperBySlug(slug: string): Paper | null {
  return mockPapers.find(p => p.slug === slug) || null
}

export function getMockPapersByCategory(category: string): Paper[] {
  return mockPapers.filter(p => p.category === category)
}
`

    // Write to mock data file
    const outputPath = join(process.cwd(), 'src/data/mockPapers.ts')
    writeFileSync(outputPath, mockDataContent)

    console.log(`✅ Mock data generated: ${outputPath}`)
    console.log(`\n📊 Summary:`)
    console.log(`  • ${papers.length} papers migrated`)
    console.log(`  • Categories found: ${[...new Set(papers.map(p => p.category))].join(', ')}`)

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

fetchPapers().catch(console.error)
