import { motion } from 'framer-motion'
import { PaperCard } from './PaperCard'
import type { Paper } from '../types/paper'

interface PapersGridProps {
  papers: Paper[]
  title?: string
  subtitle?: string
}

export function PapersGrid({ papers, title = 'Latest Articles', subtitle }: PapersGridProps) {
  // Define rotation patterns for cards (subtle tilted effect)
  const rotations = [-1, 1, -0.5, 0.5, -1.5, 1.5, -1, 1]

  return (
    <section className="py-16 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/60 text-lg">{subtitle}</p>
          )}
        </motion.div>

        {/* Responsive Grid - Matches Webflow inspiration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {papers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <PaperCard
                paper={paper}
                rotation={rotations[index % rotations.length]}
                index={index}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {papers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="text-6xl mb-6">📄</div>
            <h3 className="text-2xl font-semibold mb-3 text-white">No papers yet</h3>
            <p className="text-white/60">
              Check back soon for technical content and case studies.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
