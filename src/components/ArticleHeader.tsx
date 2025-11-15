import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { TrackedExperimentBadge } from './TrackedExperimentBadge'
import type { Paper } from '../types/paper'

interface ArticleHeaderProps {
  paper: Paper
}

export function ArticleHeader({ paper }: ArticleHeaderProps) {
  // Map category to display name
  const categoryDisplayName = {
    automation: 'Automation',
    webflow: 'Webflow',
    development: 'Development',
  }[paper.category] || paper.category

  // Map difficulty to visual style
  const difficultyColor = {
    Beginner: 'text-green-400',
    Intermediate: 'text-yellow-400',
    Advanced: 'text-red-400',
  }[paper.difficulty_level || ''] || 'text-white'

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto px-6 py-12"
    >
      {/* ASCII Art Hero */}
      <div className="mb-8 bg-black border border-white/10 rounded-lg overflow-hidden">
        <div className="aspect-[21/9] flex items-center justify-center p-8">
          {paper.ascii_art ? (
            <pre className="text-terminal-green text-[0.7rem] sm:text-[0.9rem] leading-[1.2] font-mono select-none opacity-90">
              {paper.ascii_art}
            </pre>
          ) : (
            <pre className="text-white/70 text-[0.8rem] leading-tight font-mono select-none">
{`
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                           ║
  ║                     [ASCII ART HERO]                      ║
  ║                      PLACEHOLDER                          ║
  ║                                                           ║
  ╚═══════════════════════════════════════════════════════════╝
`}
            </pre>
          )}
        </div>
      </div>

      {/* Category Tag */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded text-sm font-medium text-white/80 uppercase tracking-wider">
          {categoryDisplayName}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
      >
        {paper.title}
      </motion.h1>

      {/* Excerpt */}
      {paper.excerpt_long && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg sm:text-xl text-white/70 mb-8 leading-relaxed max-w-3xl"
        >
          {paper.excerpt_long}
        </motion.p>
      )}

      {/* Metadata Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-wrap items-center gap-6 text-sm text-white/60 border-t border-white/10 pt-6"
      >
        {/* Published Date */}
        {(paper.published_at || paper.date) && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" strokeWidth={1.5} />
            <span>{formatDate(paper.published_at || paper.date)}</span>
          </div>
        )}

        {/* Reading Time */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" strokeWidth={1.5} />
          <span>{paper.reading_time} min read</span>
        </div>

        {/* Difficulty */}
        {paper.difficulty_level && (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${difficultyColor.replace('text-', 'bg-')}`} />
            <span className={difficultyColor}>
              {paper.difficulty_level}
            </span>
          </div>
        )}

        {/* Technical Focus Tags */}
        {paper.technical_focus && (
          <div className="flex items-center gap-2">
            <span className="text-white/40">Tags:</span>
            <div className="flex gap-2">
              {paper.technical_focus.split(',').slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-white/60"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Tracked Experiment Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8"
      >
        <TrackedExperimentBadge paper={paper} showFullStats={true} />
      </motion.div>
    </motion.header>
  )
}
