import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { PaperCard } from '../../components/PaperCard'
import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import type { Env } from '../../types/env'
import { mockPapers, mockCategories } from '../../data/mockPapers'

export const Route = createFileRoute('/category/$slug')({
  component: CategoryPage,
  head: ({ loaderData }) => {
    const { category, papers } = loaderData
    const url = `https://createsomething.io/category/${category.slug}`
    const categoryDescriptions: Record<string, string> = {
      automation: 'Learn about automation systems, workflow integrations, and productivity tools. Discover how to build efficient automated solutions.',
      development: 'Modern web development tutorials covering React, Next.js, TanStack, and full-stack development practices.',
      infrastructure: 'Cloud infrastructure, serverless architecture, and edge computing guides. Learn Cloudflare Workers, D1, and modern deployment strategies.',
      webflow: 'Webflow development guides, custom implementations, and no-code solutions for building powerful websites.',
    }

    const description = categoryDescriptions[category.slug] || `Explore our collection of ${papers.length} technical papers on ${category.name}.`

    return {
      meta: [
        { title: `${category.name} Articles | CREATE SOMETHING` },
        { name: 'description', content: description },
        { name: 'keywords', content: `${category.slug}, technical papers, tutorials, ${category.name}` },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: url },
        { property: 'og:title', content: `${category.name} Articles | CREATE SOMETHING` },
        { property: 'og:description', content: description },
        { property: 'og:image', content: 'https://createsomething.io/og-image.png' },
        { property: 'og:site_name', content: 'CREATE SOMETHING' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: url },
        { name: 'twitter:title', content: `${category.name} Articles` },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: 'https://createsomething.io/og-image.png' },
      ],
      links: [
        { rel: 'canonical', href: url },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${category.name} Articles`,
            description: description,
            url: url,
            publisher: {
              '@type': 'Organization',
              name: 'CREATE SOMETHING',
              url: 'https://createsomething.io',
            },
            numberOfItems: papers.length,
          }),
        },
      ],
    }
  },
  loader: async ({ context, params }) => {
    const env = (context as any).env as Env
    const { slug } = params

    console.log('Loading category:', slug)
    console.log('Available categories:', mockCategories.map(c => c.slug))

    // Find category info
    const category = mockCategories.find(c => c.slug === slug)
    if (!category) {
      console.error('Category not found:', slug)
      // Return empty state instead of throwing
      return {
        papers: [],
        category: { name: slug, slug, count: 0 }
      }
    }

    if (!env?.DB) {
      // Use mock data
      console.log('Using mock data for category:', slug)
      const papers = mockPapers.filter(p => p.category === slug && p.published)
      console.log('Found papers:', papers.length)
      return { papers, category }
    }

    try {
      // Fetch from D1 database
      const result = await env.DB.prepare(`
        SELECT * FROM papers
        WHERE category = ? AND published = 1
        ORDER BY created_at DESC
      `).bind(slug).all()

      return {
        papers: result.results || [],
        category
      }
    } catch (error) {
      console.error('Database error:', error)
      // Fallback to mock data
      const papers = mockPapers.filter(p => p.category === slug && p.published)
      return { papers, category }
    }
  }
})

function CategoryPage() {
  const { papers, category } = Route.useLoaderData()

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
              {category.name}
            </h1>
            <p className="text-lg text-white/60">
              {papers.length} {papers.length === 1 ? 'article' : 'articles'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Papers Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {papers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {papers.map((paper, index) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <PaperCard paper={paper} rotation={0} index={index} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">No articles found in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CategoryPage
