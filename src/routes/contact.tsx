import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: 'Contact | CREATE SOMETHING' },
      { name: 'description', content: 'Get in touch about AI-native development research, tracked experiments, or collaboration on building with Claude Code + Cloudflare. Questions about methodology or experiment results? Contact micah@createsomething.io' },
      { name: 'keywords', content: 'contact, AI-native development, Claude Code, experiment collaboration, development research, technical inquiry' },

      // Open Graph
      { property: 'og:title', content: 'Contact | AI-Native Development Research' },
      { property: 'og:description', content: 'Questions about tracked experiments, methodology, or collaboration on AI-native development research.' },
      { property: 'og:url', content: 'https://createsomething.io/contact' },

      // Twitter
      { name: 'twitter:title', content: 'Contact CREATE SOMETHING' },
      { name: 'twitter:description', content: 'Get in touch with us' },
    ],
    links: [
      { rel: 'canonical', href: 'https://createsomething.io/contact' },
    ],
  }),
})

function ContactPage() {
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
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Get in Touch
            </h1>

            <p className="text-lg text-white/70 leading-relaxed">
              Questions about our tracked experiments, methodology, or interested in collaborating on AI-native development research? Let's connect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 bg-[#111111] border border-white/10 rounded-lg hover:border-white/30 transition-all"
            >
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-white/80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <p className="text-white/60 mb-4">
                Questions about experiment methodology, development metrics, or research collaboration? Get in touch.
              </p>
              <a
                href="mailto:micah@createsomething.io"
                className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2"
              >
                micah@createsomething.io
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 bg-[#111111] border border-white/10 rounded-lg hover:border-white/30 transition-all"
            >
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-white/80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Follow Updates</h3>
              <p className="text-white/60 mb-4">
                Stay updated with new tracked experiments and AI-native development research.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/micahryanjohnson/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/createsomethingtoday"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ContactPage
