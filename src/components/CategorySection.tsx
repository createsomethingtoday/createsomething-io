import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'

interface Category {
  name: string
  slug: string
  count: number
}

interface CategorySectionProps {
  categories: Category[]
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-base md:text-lg font-medium text-white/90">
            Explore Categories
          </h2>
        </motion.div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                className="group block relative p-8 bg-[#111111] border border-white/10 rounded-lg hover:border-white/30 transition-all overflow-hidden"
              >
                {/* Category Name */}
                <div className="relative z-10 mb-4">
                  <h3 className="text-xl font-medium text-white group-hover:text-white/90 transition-colors">
                    {category.name}
                  </h3>
                </div>

                {/* Article Count with Sliding Animation */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="relative h-6 overflow-hidden">
                    <div className="transition-transform duration-300 group-hover:-translate-y-full">
                      <div className="text-base font-medium text-white/60 h-6 flex items-center">
                        {String(category.count).padStart(2, '0')}
                      </div>
                      <div className="text-base font-medium text-white/80 h-6 flex items-center">
                        {String(category.count).padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                  {/* Arrow Icon with Slide Animation */}
                  <div className="relative w-4 h-4 overflow-hidden">
                    <div className="transition-transform duration-300 group-hover:-translate-x-full group-hover:-translate-y-full">
                      <div className="absolute top-0 left-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
                          <path
                            d="M10.6696 6.276L4.93156 12.014L3.98889 11.0713L9.72622 5.33333H4.66956V4H12.0029V11.3333H10.6696V6.276Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="absolute -bottom-full left-full">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
                          <path
                            d="M10.6696 6.276L4.93156 12.014L3.98889 11.0713L9.72622 5.33333H4.66956V4H12.0029V11.3333H10.6696V6.276Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No categories available yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
