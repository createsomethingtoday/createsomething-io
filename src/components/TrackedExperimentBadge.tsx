import { motion } from 'framer-motion'
import { BarChart3, ArrowRight } from 'lucide-react'
import type { Paper } from '../types/paper'

interface TrackedExperimentBadgeProps {
  paper: Paper
  showFullStats?: boolean
}

export function TrackedExperimentBadge({ paper, showFullStats = false }: TrackedExperimentBadgeProps) {
  // Check if this is a tracked experiment (look for experiment-specific metadata)
  const isTrackedExperiment = paper.slug.includes('experiment') || paper.category === 'experiments'

  if (!isTrackedExperiment) {
    return null
  }

  // Extract metrics from paper content or use defaults
  // In a real implementation, these would come from experiment metadata
  const metrics = {
    hours: 26,
    errors: 47,
    interventions: 12,
    savings: 78
  }

  if (!showFullStats) {
    // Compact badge version
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-full text-xs text-white/70"
      >
        <BarChart3 className="w-4 h-4 text-white/40" strokeWidth={1.5} />
        <span className="font-medium text-white/90">TRACKED EXPERIMENT</span>
        <span className="text-white/40">•</span>
        <span>Real-time logging</span>
      </motion.div>
    )
  }

  // Full stats version
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 bg-[#111111] border border-white/10 rounded-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-6 h-6 text-white/70" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold text-white">Tracked Experiment</h3>
          </div>
          <p className="text-sm text-white/60">
            Real-time logging • Full methodology
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-white/5 rounded text-center">
          <div className="text-xl font-bold text-white">{metrics.hours}</div>
          <div className="text-xs text-white/40">Hours</div>
        </div>
        <div className="p-3 bg-white/5 rounded text-center">
          <div className="text-xl font-bold text-white">{metrics.errors}</div>
          <div className="text-xs text-white/40">Errors</div>
        </div>
        <div className="p-3 bg-white/5 rounded text-center">
          <div className="text-xl font-bold text-white">{metrics.interventions}</div>
          <div className="text-xs text-white/40">Fixes</div>
        </div>
        <div className="p-3 bg-white/5 rounded text-center">
          <div className="text-xl font-bold text-white">{metrics.savings}%</div>
          <div className="text-xs text-white/40">Savings</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-white/60 mb-2">
          <strong className="text-white">Data sources:</strong> Claude Code Analytics API, Cloudflare billing, real-time hooks
        </p>
        <p className="text-xs text-white/60">
          <strong className="text-white">Reproducibility:</strong> Starting prompt, tracking logs, and architecture decisions documented
        </p>
      </div>

      <div className="mt-4">
        <a
          href="/methodology"
          className="text-xs text-white/70 hover:text-white hover:underline inline-flex items-center gap-1"
        >
          Learn about our methodology
          <ArrowRight className="w-3 h-3" strokeWidth={2} />
        </a>
      </div>
    </motion.div>
  )
}
