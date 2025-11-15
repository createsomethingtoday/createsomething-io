import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import type { Paper } from '../types/paper'

interface RelatedArticlesProps {
  papers: Paper[]
  currentPaperId: string
}

export function RelatedArticles({ papers, currentPaperId }: RelatedArticlesProps) {
  // Filter out current paper and limit to 4
  const relatedPapers = papers
    .filter(p => p.id !== currentPaperId)
    .slice(0, 4)

  if (relatedPapers.length === 0) {
    return null
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16 border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedPapers.map((paper, index) => (
            <RelatedArticleCard key={paper.id} paper={paper} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

interface RelatedArticleCardProps {
  paper: Paper
  index: number
}

function RelatedArticleCard({ paper, index }: RelatedArticleCardProps) {
  // Map category to display name
  const categoryDisplayName = {
    automation: 'Automation',
    webflow: 'Webflow',
    development: 'Development',
  }[paper.category] || paper.category

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to="/papers/$slug"
        params={{ slug: paper.slug }}
        className="group block h-full"
      >
        <article className="h-full bg-[#111111] border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/30 hover:shadow-lg hover:shadow-white/5">
          {/* ASCII Art Thumbnail */}
          <div className="aspect-[16/9] bg-black border-b border-white/10 flex items-center justify-center p-4">
            {paper.ascii_thumbnail || paper.ascii_art ? (
              <pre className="text-terminal-green text-[0.35rem] sm:text-[0.4rem] leading-[1.1] font-mono select-none opacity-80 group-hover:opacity-100 transition-opacity">
                {paper.ascii_thumbnail || paper.ascii_art}
              </pre>
            ) : (
              <pre className="text-white/50 text-[0.4rem] leading-tight font-mono select-none">
{`
  ╔═════════════╗
  ║   ASCII     ║
  ║ THUMBNAIL   ║
  ╚═════════════╝
`}
              </pre>
            )}
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            {/* Metadata */}
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span className="capitalize">{categoryDisplayName}</span>
              <span className="text-white/20">•</span>
              <span>{formatDate(paper.published_at || paper.date)}</span>
              <span className="text-white/20">•</span>
              <span>{paper.reading_time} min</span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors line-clamp-2 leading-snug">
              {paper.title}
            </h3>

            {/* Excerpt */}
            {paper.excerpt_short && (
              <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">
                {paper.excerpt_short}
              </p>
            )}

            {/* Read More Arrow */}
            <div className="flex items-center gap-2 text-sm text-terminal-green group-hover:gap-3 transition-all">
              <span>Read more</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </article>
      </Link>
    </motion.div>
  )
}
