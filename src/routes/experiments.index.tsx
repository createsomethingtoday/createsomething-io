import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { env } from 'cloudflare:workers'
import { motion } from 'framer-motion'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { PaperCard } from '../components/PaperCard'
import { mockPapers } from '../data/mockPapers'
import type { Paper } from '../types/paper'

// Server function to fetch all experiments from D1
const getAllExperiments = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    // Try to use D1, fallback to mock data if unavailable
    if (!env?.DB) {
      console.log('⚠️  No DB binding - using mock data')
      return { papers: mockPapers.filter(p => p.published) }
    }

    console.log('✅ Using D1 database for experiments')

    // Fetch all published papers, ordered by featured first, then by created_at DESC
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

    return { papers: (result.results || []) as Paper[] }
  } catch (error) {
    console.error('Error fetching experiments:', error)
    return { papers: mockPapers.filter(p => p.published) }
  }
})

export const Route = createFileRoute('/experiments/')({
  component: ExperimentsIndexPage,
  loader: async () => await getAllExperiments(),
  head: ({ loaderData }) => {
    const { papers } = loaderData

    return {
      meta: [
        { title: `All Experiments (${papers.length}) | CREATE SOMETHING` },
        { name: 'description', content: 'Browse tracked experiments with real data — time, costs, errors, and learnings from building production systems with AI-native development.' },
        { name: 'keywords', content: 'experiments, AI-native development, Claude Code, Cloudflare Workers, tracked experiments, development metrics' },

        // Open Graph
        { property: 'og:title', content: `All Experiments | CREATE SOMETHING` },
        { property: 'og:description', content: `Browse ${papers.length} tracked experiments with real development data.` },
        { property: 'og:url', content: 'https://createsomething.io/experiments' },
        { property: 'og:type', content: 'website' },

        // Twitter
        { name: 'twitter:title', content: 'All Experiments | CREATE SOMETHING' },
        { name: 'twitter:description', content: 'Tracked experiments with real data' },
      ],
      links: [
        { rel: 'canonical', href: 'https://createsomething.io/experiments' },
      ],
    }
  }
})

function ExperimentsIndexPage() {
  // Get the papers data from this route's loader
  const { papers } = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              All Experiments
            </h1>
            <p className="text-lg text-white/60">
              {papers.length} tracked experiments with real data — time, costs, errors, and learnings
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 * index }}
              >
                <PaperCard paper={paper} rotation={0} index={index} />
              </motion.div>
            ))}
          </div>

          {papers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">No experiments available yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ExperimentsIndexPage
