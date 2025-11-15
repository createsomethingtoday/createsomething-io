import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { env } from 'cloudflare:workers'
import { Navigation } from '../components/Navigation'
import { HeroSection } from '../components/HeroSection'
import { CategorySection } from '../components/CategorySection'
import { PapersGrid } from '../components/PapersGrid'
import { Footer } from '../components/Footer'
import { mockPapers, mockCategories } from '../data/mockPapers'
import type { Paper } from '../types/paper'

// Server function to fetch papers from D1 database
const getPapersFromDB = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    // Access Cloudflare bindings via cloudflare:workers module
    // Try to use D1, fallback to mock data if unavailable
    if (!env?.DB) {
      console.log('⚠️  No DB binding - using mock data')
      return {
        papers: mockPapers,
        categories: mockCategories
      }
    }

    console.log('✅ Using D1 database')

    // Fetch all published papers
    const result = await env.DB.prepare(`
      SELECT
        id, title, category, content, html_content, reading_time,
        difficulty_level, technical_focus, published_on, excerpt_short,
        excerpt_long, slug, featured, published, is_hidden, archived,
        date, excerpt, description, created_at, updated_at, published_at, ascii_art
      FROM papers
      WHERE published = 1 AND is_hidden = 0 AND archived = 0
      ORDER BY featured DESC, created_at DESC
    `).all()

    const papers = (result.results || []) as Paper[]

    // Get category counts
    const categoryResult = await env.DB.prepare(`
      SELECT
        category,
        COUNT(*) as count
      FROM papers
      WHERE published = 1 AND is_hidden = 0 AND archived = 0
      GROUP BY category
      ORDER BY count DESC
    `).all()

    const categories = (categoryResult.results || []).map((row: any) => ({
      name: row.category.charAt(0).toUpperCase() + row.category.slice(1),
      slug: row.category,
      count: row.count
    }))

    return {
      papers,
      categories
    }
  } catch (error) {
    console.error('Error fetching papers:', error)
    // Fallback to mock data on error
    return {
      papers: mockPapers,
      categories: mockCategories
    }
  }
})

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: async () => await getPapersFromDB()
})

function HomePage() {
  const { papers, categories } = Route.useLoaderData()

  // Split papers for different sections
  const featuredPapers = papers.filter((p) => p.featured).slice(0, 5)
  const latestPapers = papers.slice(0, 12)

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <HeroSection featuredPapers={featuredPapers} />
      <CategorySection categories={categories} />
      <PapersGrid
        papers={latestPapers}
        title="Experiments"
        subtitle="Tracked experiments with real data — time, costs, errors, and learnings"
      />
      <Footer />
    </div>
  )
}