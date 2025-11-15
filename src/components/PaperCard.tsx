import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import type { Paper } from '../types/paper'

interface PaperCardProps {
  paper: Paper
  rotation?: number
  index?: number
}

export function PaperCard({ paper, rotation = 0, index = 0 }: PaperCardProps) {
  // Map category to display name
  const categoryDisplayName = {
    automation: 'Automation',
    webflow: 'Webflow',
    development: 'Development',
  }[paper.category] || paper.category

  // Format date
  const formattedDate = paper.published_at
    ? new Date(paper.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <Link to={`/papers/${paper.slug}`} className="block h-full">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 }
        }}
        className="group h-full"
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <div className="relative h-full bg-[#111111] border border-white/10 rounded-none overflow-hidden transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10">
          {/* Image or ASCII Art */}
          <div className="aspect-[4/3] bg-black border-b border-white/10 flex items-center justify-center p-4 relative overflow-hidden">
            {paper.ascii_art ? (
              <pre className="text-terminal-green text-[0.45rem] leading-[1.1] font-mono select-none opacity-90 group-hover:opacity-100 transition-opacity">
                {paper.ascii_art}
              </pre>
            ) : (
              <div className="text-white/20 text-6xl">
                📄
              </div>
            )}

            {/* Hover Arrow Button */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M10.6696 6.276L4.93156 12.014L3.98889 11.0713L9.72622 5.33333H4.66956V4H12.0029V11.3333H10.6696V6.276Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-2 pb-4 space-y-3">
            {/* Metadata */}
            <div className="flex items-center gap-2 text-xs font-medium text-white/60">
              {formattedDate && (
                <>
                  <span>{formattedDate}</span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                </>
              )}
              <span>{paper.reading_time} min read</span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-medium text-white group-hover:text-white/90 transition-colors line-clamp-2 leading-tight">
              {paper.title}
            </h3>

            {/* Category Badge */}
            <div className="inline-block">
              <div className="relative overflow-hidden">
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-medium text-white/90 group-hover:translate-y-[-100%] transition-transform duration-300">
                  {categoryDisplayName}
                </div>
                <div className="absolute inset-0 px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-medium text-white/90 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300">
                  {categoryDisplayName}
                </div>
              </div>
            </div>
          </div>

          {/* Hover Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
      </motion.article>
    </Link>
  )
}
