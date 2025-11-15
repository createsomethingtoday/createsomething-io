import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { mockCategories } from '../data/mockPapers'
import type { Env } from '../types/env'

export const Route = createFileRoute('/categories')({
  component: CategoriesPage,
  loader: async ({ context }) => {
    const env = (context as any).env as Env

    if (!env?.DB) {
      return { categories: mockCategories }
    }

    try {
      const result = await env.DB.prepare(`
        SELECT
          category,
          COUNT(*) as count
        FROM papers
        WHERE published = 1 AND is_hidden = 0 AND archived = 0
        GROUP BY category
        ORDER BY count DESC
      `).all()

      const categories = (result.results || []).map((row: any) => ({
        name: row.category.charAt(0).toUpperCase() + row.category.slice(1),
        slug: row.category,
        count: row.count
      }))

      return { categories }
    } catch (error) {
      console.error('Database error:', error)
      return { categories: mockCategories }
    }
  }
})

function CategoriesPage() {
  const { categories } = Route.useLoaderData()

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
              Browse by Category
            </h1>
            <p className="text-lg text-white/60">
              Explore our technical papers organized by topic
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="group block relative p-8 bg-[#111111] border border-white/10 rounded-lg hover:border-white/30 transition-all overflow-hidden min-h-[160px]"
                >
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-2xl font-semibold text-white group-hover:text-white/90 transition-colors">
                      {category.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="text-base font-medium text-white/60 group-hover:text-white/80 transition-colors">
                        {category.count} {category.count === 1 ? 'article' : 'articles'}
                      </div>

                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-white/60 group-hover:text-white/90 transition-all group-hover:translate-x-1"
                      >
                        <path
                          d="M10.6696 6.276L4.93156 12.014L3.98889 11.0713L9.72622 5.33333H4.66956V4H12.0029V11.3333H10.6696V6.276Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.div>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">No categories available yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CategoriesPage
