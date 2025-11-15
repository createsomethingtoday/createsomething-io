import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: 'About | CREATE SOMETHING' },
      { name: 'description', content: 'CREATE SOMETHING is a space for systems thinking — exploring how complex systems work, evolve, and scale through real-world technology implementations.' },
      { name: 'keywords', content: 'systems thinking, system architecture, mental models, complexity, design patterns, automation, resilient systems, Micah Johnson' },

      // Open Graph
      { property: 'og:title', content: 'About CREATE SOMETHING | Systems Thinking' },
      { property: 'og:description', content: 'A space for exploring how complex systems work, evolve, and scale through architecture, automation, and design patterns.' },
      { property: 'og:url', content: 'https://createsomething.io/about' },

      // Twitter
      { name: 'twitter:title', content: 'About CREATE SOMETHING' },
      { name: 'twitter:description', content: 'Exploring systems thinking through real-world technology — architecture, automation, and mental models for complexity.' },
    ],
    links: [
      { rel: 'canonical', href: 'https://createsomething.io/about' },
    ],
  }),
})

function AboutPage() {
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
              Hi, I'm Micah Johnson
            </h1>

            <div className="space-y-8">
              {/* Core Identity */}
              <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                <p className="text-xl text-white/90 font-medium">
                  I'm a System Architect, automation builder, and proponent of "less, but better" — focused on how systems work, evolve, and scale.
                </p>

                <p>
                  By day, I architect systems on the <a href="https://webflow.com" className="text-white hover:underline">Webflow</a> Marketplace team, building developer experiences that serve thousands of creators. By night, I'm building the future of workflow automation with <a href="https://workway.co" className="text-white hover:underline" target="_blank" rel="noopener noreferrer">WORKWAY</a> — the first open-source marketplace for TypeScript workflows, running entirely on Cloudflare's edge infrastructure.
                </p>

                <p>
                  I'm also co-founder of <a href="https://halfdozen.co" className="text-white hover:underline" target="_blank" rel="noopener noreferrer">Half Dozen</a>, where we build business operating systems for the live events industry — helping venues, promoters, and agencies orchestrate complex operations through clean system design.
                </p>
              </div>

              {/* Philosophy */}
              <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-4">
                <h3 className="text-xl font-semibold text-white">The experiment</h3>
                <p className="text-white/70 leading-relaxed">
                  I'm building production systems agentically — working with LLMs as actual development partners, not just code generators. CREATE SOMETHING documents what I'm learning through rigorous testing: running experiments, writing papers to prove or disprove approaches, and sharing honest results. Not blog posts about AI, but real data from building real systems with AI agents. What works, what doesn't, and why.
                </p>
              </div>

              {/* Background */}
              <div className="space-y-4 text-white/60 text-base">
                <p>
                  I studied at Texas A&M and earned a UI/UX Design Certification from Boulder Digital Arts. My career has taken me through Webflow development, API integrations, marketplace architecture, and now full-time system design at Webflow — always with a focus on automation and developer experience.
                </p>
                <p>
                  Based in Kennedale, Texas. Available on <a href="https://www.linkedin.com/in/micahryanjohnson/" className="text-white hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a> for collaboration and conversation about systems.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              What You'll Find Here
            </h2>

            <p className="text-lg text-white/70 leading-relaxed">
              Systems thinking applied to real-world challenges — exploring architecture patterns, automation design, mental models for complexity, and the principles that make systems resilient. Each piece examines how systems work through the lens of production implementations, drawing insights that transcend specific technologies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Systems Thinking Themes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'System Architecture',
                  description: 'How systems are designed, structured, and composed — patterns for building resilient, scalable architectures'
                },
                {
                  title: 'Automation & Workflow',
                  description: 'Mental models for automation design, orchestration patterns, and building self-healing systems'
                },
                {
                  title: 'Complexity & Scale',
                  description: 'Understanding emergent behavior, managing complexity, and designing systems that evolve gracefully'
                },
                {
                  title: 'Mental Models',
                  description: 'Frameworks for thinking about systems — from feedback loops to constraint theory to design patterns'
                }
              ].map((topic, index) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-[#111111] border border-white/10 rounded-lg"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-white/60">
                    {topic.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutPage
