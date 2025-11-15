import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { Link } from '@tanstack/react-router'
import { ArrowRight, CheckCircle, XCircle, BarChart3, Clock, DollarSign, AlertTriangle, Bot, Activity, TrendingUp, FileText, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/methodology')({
  component: MethodologyPage,
  head: () => ({
    meta: [
      { title: 'Research Methodology | CREATE SOMETHING' },
      { name: 'description', content: 'How CREATE SOMETHING produces credible knowledge about AI-native development through rigorous experiment tracking, real-time logging, and reproducible results.' },
      { name: 'keywords', content: 'research methodology, experiment tracking, AI-native development, reproducible research, scientific method, Claude Code, systems thinking' },

      // Open Graph
      { property: 'og:title', content: 'Research Methodology | CREATE SOMETHING' },
      { property: 'og:description', content: 'The systematic approach that transforms blog posts into experiments—real-time tracking, precise costs, honest results.' },
      { property: 'og:url', content: 'https://createsomething.io/methodology' },

      // Twitter
      { name: 'twitter:title', content: 'Research Methodology | CREATE SOMETHING' },
      { name: 'twitter:description', content: 'How we transform AI development from "prompting and hoping" into systematic evaluation with reproducible results.' },
    ],
    links: [
      { rel: 'canonical', href: 'https://createsomething.io/methodology' },
    ],
  }),
})

function MethodologyPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Research Methodology
            </h1>

            <p className="text-xl text-white/90 leading-relaxed">
              What makes CREATE SOMETHING different from AI blogs: we don't just document results—we document the <strong>process</strong> of building with AI agents.
            </p>

            <p className="text-lg text-white/70 leading-relaxed">
              Every experiment is tracked with automated logging, real costs from APIs, precise time measurements, and intervention documentation. This transforms anecdotes into reproducible experiments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Process Visual */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              How We Work
            </h2>

            {/* Pipeline Visual */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                {
                  step: '1. Build',
                  title: 'Claude Code',
                  description: 'Work with AI agents as development partners',
                  icon: Bot
                },
                {
                  step: '2. Track',
                  title: 'Auto-Log',
                  description: 'Hooks capture every prompt, error, intervention',
                  icon: Activity
                },
                {
                  step: '3. Analyze',
                  title: 'Real Data',
                  description: 'Actual costs, time, errors from APIs',
                  icon: TrendingUp
                },
                {
                  step: '4. Publish',
                  title: 'Honest Results',
                  description: 'What worked, what didn\'t, and why',
                  icon: FileText
                }
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative p-6 bg-[#111111] border border-white/10 rounded-lg"
                  >
                    <div className="mb-4 text-white/70">
                      <IconComponent className="w-10 h-10" strokeWidth={1.5} />
                    </div>
                    <div className="text-sm text-white/40 mb-2">{item.step}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {item.description}
                    </p>

                    {/* Arrow */}
                    {index < 3 && (
                      <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-white/20">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            <div className="text-center">
              <p className="text-xl text-white/80 font-medium">
                This is research, not blogging.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Track */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Every Experiment Tracked With
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  metric: 'Prompts',
                  description: 'Real-time logging via Claude Code hooks',
                  example: '47 iterations logged'
                },
                {
                  metric: 'Errors',
                  description: 'Precise counts & resolution times',
                  example: '23 errors, avg fix: 8 min'
                },
                {
                  metric: 'Costs',
                  description: 'Token usage + infrastructure from APIs',
                  example: '$18.50 Claude + $8.30 Cloudflare'
                },
                {
                  metric: 'Interventions',
                  description: 'When AI needed human help, and why',
                  example: '12 manual fixes documented'
                },
                {
                  metric: 'Time',
                  description: 'Session duration, not guesswork',
                  example: '26 hours actual vs 120 estimated'
                },
                {
                  metric: 'Architecture',
                  description: 'Decisions made, alternatives considered',
                  example: 'Workflows over Workers (why)'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.metric}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-6 bg-[#111111] border border-white/10 rounded-lg"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.metric}
                  </h3>
                  <p className="text-white/60 text-sm mb-3">
                    {item.description}
                  </p>
                  <code className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">
                    {item.example}
                  </code>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three Tracking Modes */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Three Tracking Modes
            </h2>

            <div className="space-y-6">
              {[
                {
                  mode: 'Real-Time Tracking',
                  tag: 'Ideal',
                  description: 'Start tracking from day one. Get complete data on every iteration, error, and decision.',
                  dataQuality: 'High confidence, precise metrics',
                  useCase: 'New experiments starting from scratch'
                },
                {
                  mode: 'Mid-Flight Tracking',
                  tag: 'Practical',
                  description: 'Start tracking on an in-progress project. Combine real-time data with git history reconstruction.',
                  dataQuality: 'Mixed: estimates for past work, precise for future',
                  useCase: 'Active projects you realize are experiment-worthy'
                },
                {
                  mode: 'Retroactive Documentation',
                  tag: 'Still Valuable',
                  description: 'Document already-deployed projects. Reconstruct from git, APIs, and memory.',
                  dataQuality: 'Lower confidence, acknowledged limitations',
                  useCase: 'Completed projects with production data'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.mode}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-[#111111] border border-white/10 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">
                      {item.mode}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-white/10 text-white/60 rounded">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-white/70 mb-4">
                    {item.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/40">Data Quality:</span>
                      <p className="text-white/60">{item.dataQuality}</p>
                    </div>
                    <div>
                      <span className="text-white/40">Use Case:</span>
                      <p className="text-white/60">{item.useCase}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Why This Matters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Without Tracking
                </h3>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>"I built X with AI" (anecdote)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>No reproducibility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>Can't verify claims</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>Just another AI blog</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  With Tracking
                </h3>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>"I built X: 26 hrs, $27, 78% savings" (data)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>Others can replicate experiments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>Transparent methodology</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>Scientific research platform</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-lg mt-8">
              <p className="text-lg text-white/80 leading-relaxed">
                The tracking methodology transforms "prompting and hoping" into <strong>systematic evaluation with reproducible results</strong>. This is what separates research from blogging.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* For Researchers */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              For Researchers: Use This Methodology
            </h2>

            <p className="text-lg text-white/70 leading-relaxed">
              Want to adopt this approach for your own AI-native development research? The experiment tracking system is available as a Claude Code Skill.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: 'Install the Skill',
                  description: 'Add experiment tracking to your Claude Code setup'
                },
                {
                  step: '2',
                  title: 'Build & Track',
                  description: 'Work with Claude Code while automatic logging captures everything'
                },
                {
                  step: '3',
                  title: 'Generate Papers',
                  description: 'Transform tracked data into reproducible research'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-[#111111] border border-white/10 rounded-lg text-center"
                >
                  <div className="text-3xl font-bold text-white/20 mb-3">{item.step}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="https://github.com/createsomethingtoday/create-something-experiments"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all"
              >
                <span>View on GitHub</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </a>

              <Link
                to="/papers/zoom-transcript-automation-experiment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 font-semibold rounded-full hover:bg-white/20 hover:border-white/30 transition-all"
              >
                <span>See Example Experiment</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Example from Experiment #1 */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Methodology in Action
            </h2>

            <p className="text-lg text-white/70 leading-relaxed">
              Example from <Link to="/papers/zoom-transcript-automation-experiment" className="text-white hover:underline">Experiment #1: Zoom Transcript Automation</Link>
            </p>

            <div className="p-6 bg-[#111111] border border-white/10 rounded-lg">
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-white/5 rounded">
                    <div className="text-2xl font-bold text-white">26</div>
                    <div className="text-xs text-white/40">Hours</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded">
                    <div className="text-2xl font-bold text-white">47</div>
                    <div className="text-xs text-white/40">Errors</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded">
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-xs text-white/40">Interventions</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded">
                    <div className="text-2xl font-bold text-white">78%</div>
                    <div className="text-xs text-white/40">Time Savings</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-white/60">
                    <strong className="text-white">Data sources:</strong> Real-time prompt logging via hooks, Claude Code Analytics API, Cloudflare billing API, git commit history
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-white/60">
                    <strong className="text-white">Reproducibility:</strong> Starting prompt, tracking logs, and architecture decisions documented
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/papers/zoom-transcript-automation-experiment"
                className="inline-flex items-center gap-2 text-white hover:underline"
              >
                Read the full experiment
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default MethodologyPage
