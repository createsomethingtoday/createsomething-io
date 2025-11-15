import { motion } from 'framer-motion'
import { Mail, ArrowRight, BarChart3 } from 'lucide-react'
import { PaperCard } from './PaperCard'
import type { Paper } from '../types/paper'

interface HeroSectionProps {
  featuredPapers: Paper[]
}

export function HeroSection({ featuredPapers }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Signup - Top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <a
            href="#newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white/90 text-sm hover:bg-white/20 hover:border-white/30 transition-all"
          >
            <span>Get weekly updates with our Newsletter</span>
            <Mail className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </motion.div>

        {/* Featured Cards - Horizontal Layout */}
        {featuredPapers.length > 0 && (
          <div className="mt-11 mb-16 hidden md:flex justify-center items-center gap-6 max-w-6xl mx-auto">
            {featuredPapers.slice(0, 3).map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                className="flex-1 max-w-xs"
              >
                <PaperCard paper={paper} rotation={0} index={index} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile Featured Cards - Simple Stack */}
        {featuredPapers.length > 0 && (
          <div className="grid grid-cols-1 gap-6 mb-16 md:hidden">
            {featuredPapers.slice(0, 2).map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <PaperCard paper={paper} rotation={0} index={index} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Hero Text */}
        <div className="text-center space-y-6 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-base md:text-lg font-medium text-white/90"
          >
            CREATE SOMETHING
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            Building systems with AI agents
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto"
          >
            Testing what works when building production systems agentically with LLMs. Papers documenting experiments, proofs, and honest results — what I'm learning about AI-native development
          </motion.p>

          {/* Methodology Call-Out */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-8"
          >
            <a
              href="/methodology"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
            >
              <BarChart3 className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-sm md:text-base">See our research methodology</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black to-[#0a0a0a]" />
    </section>
  )
}
