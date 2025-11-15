import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      {/* Newsletter Section */}
      <section id="newsletter" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay updated with new experiments
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Get notified when new research is published. Real metrics, tracked experiments, honest learnings from building with AI.
            </p>

            {/* Newsletter Form */}
            <form className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-[#111111] border border-white/10 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="group px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer Links */}
      <div className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="text-2xl font-bold text-white mb-4">
                CREATE SOMETHING
              </div>
              <p className="text-white/60 text-sm max-w-md mb-6">
                AI-native development research with tracked experiments. Every paper includes real metrics: time, costs, errors, and learnings.
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/createsomethingtoday"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
                  aria-label="GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/micahryanjohnson/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-white/60 hover:text-white text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/experiments" className="text-white/60 hover:text-white text-sm transition-colors">
                    All Experiments
                  </Link>
                </li>
                <li>
                  <Link to="/methodology" className="text-white/60 hover:text-white text-sm transition-colors">
                    Methodology
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-white/60 hover:text-white text-sm transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white/60 hover:text-white text-sm transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* The Ecosystem */}
            <div>
              <h3 className="text-white font-semibold mb-4">The Ecosystem</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://createsomething.space" className="text-white/60 hover:text-white text-sm transition-colors">
                    .space → Try Experiments
                  </a>
                </li>
                <li>
                  <a href="https://createsomething.agency" className="text-white/60 hover:text-white text-sm transition-colors">
                    .agency → Get Help
                  </a>
                </li>
                <li>
                  <a href="https://github.com/createsomethingtoday" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-sm transition-colors">
                    GitHub → View Source
                  </a>
                </li>
                <li>
                  <Link to="/methodology" className="text-white/60 hover:text-white text-sm transition-colors">
                    Methodology
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Micah Johnson. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
