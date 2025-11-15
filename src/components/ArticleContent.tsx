import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import type { Paper } from '../types/paper'

interface ArticleContentProps {
  paper: Paper
}

export function ArticleContent({ paper }: ArticleContentProps) {
  // Use html_content if available (render as HTML), otherwise use markdown content
  const hasHtmlContent = !!paper.html_content
  const contentToRender = paper.html_content || paper.content

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto px-6 py-12"
    >
      {hasHtmlContent ? (
        // Render HTML content directly
        <div
          className="prose prose-invert prose-lg max-w-none [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-6 [&_h1]:mt-12 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-5 [&_h2]:mt-10 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mb-4 [&_h3]:mt-8 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-white [&_h4]:mb-3 [&_h4]:mt-6 [&_p]:text-white/80 [&_p]:leading-relaxed [&_p]:mb-6 [&_a]:text-terminal-green [&_a]:hover:text-white [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_ul]:list-disc [&_ul]:list-inside [&_ul]:text-white/80 [&_ul]:mb-6 [&_ul]:space-y-2 [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:text-white/80 [&_ol]:mb-6 [&_ol]:space-y-2 [&_ol]:ml-4 [&_li]:leading-relaxed [&_pre]:bg-[#1a1a1a] [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-lg [&_pre]:p-6 [&_pre]:mb-6 [&_pre]:overflow-x-auto [&_code]:font-mono [&_code]:text-sm [&_blockquote]:border-l-4 [&_blockquote]:border-white/20 [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-white/70 [&_blockquote]:bg-white/5 [&_blockquote]:rounded-r [&_img]:rounded-lg [&_img]:w-full [&_img]:my-8 [&_img]:border [&_img]:border-white/10 [&_table]:min-w-full [&_table]:border [&_table]:border-white/10 [&_table]:rounded-lg [&_table]:my-6 [&_thead]:bg-white/5 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-white [&_th]:font-semibold [&_th]:border-b [&_th]:border-white/10 [&_td]:px-4 [&_td]:py-3 [&_td]:text-white/80 [&_td]:border-b [&_td]:border-white/5 [&_hr]:border-white/10 [&_hr]:my-8 [&_strong]:font-bold [&_strong]:text-white [&_em]:italic [&_em]:text-white/90"
          dangerouslySetInnerHTML={{ __html: contentToRender }}
        />
      ) : (
        // Render Markdown content through parser
        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
            // Headings
            h1: ({ node, ...props }) => (
              <h1 className="text-4xl font-bold text-white mb-6 mt-12" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl font-bold text-white mb-5 mt-10" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-2xl font-semibold text-white mb-4 mt-8" {...props} />
            ),
            h4: ({ node, ...props }) => (
              <h4 className="text-xl font-semibold text-white mb-3 mt-6" {...props} />
            ),

            // Paragraphs
            p: ({ node, ...props }) => (
              <p className="text-white/80 leading-relaxed mb-6" {...props} />
            ),

            // Links
            a: ({ node, ...props }) => (
              <a
                className="text-terminal-green hover:text-white underline underline-offset-4 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),

            // Lists
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside text-white/80 mb-6 space-y-2 ml-4" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal list-inside text-white/80 mb-6 space-y-2 ml-4" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="leading-relaxed" {...props} />
            ),

            // Code blocks
            pre: ({ node, ...props }) => (
              <pre className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 mb-6 overflow-x-auto" {...props} />
            ),
            code: ({ node, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '')
              const isInline = !match

              if (isInline) {
                return (
                  <code
                    className="bg-white/10 px-2 py-1 rounded text-sm font-mono text-terminal-green"
                    {...props}
                  >
                    {children}
                  </code>
                )
              }

              return (
                <code className={`font-mono text-sm ${className || ''}`} {...props}>
                  {children}
                </code>
              )
            },

            // Blockquotes
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-white/20 pl-6 py-2 my-6 italic text-white/70 bg-white/5 rounded-r"
                {...props}
              />
            ),

            // Images
            img: ({ node, ...props }) => (
              <img
                className="rounded-lg w-full my-8 border border-white/10"
                {...props}
              />
            ),

            // Tables
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border border-white/10 rounded-lg" {...props} />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className="bg-white/5" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th className="px-4 py-3 text-left text-white font-semibold border-b border-white/10" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="px-4 py-3 text-white/80 border-b border-white/5" {...props} />
            ),

            // Horizontal rule
            hr: ({ node, ...props }) => (
              <hr className="border-white/10 my-8" {...props} />
            ),

            // Strong and emphasis
            strong: ({ node, ...props }) => (
              <strong className="font-bold text-white" {...props} />
            ),
            em: ({ node, ...props }) => (
              <em className="italic text-white/90" {...props} />
            ),
          }}
        >
          {contentToRender}
        </ReactMarkdown>
        </div>
      )}

      {/* Prerequisites Section */}
      {paper.prerequisites && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 p-6 bg-white/5 border border-white/10 rounded-lg"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Prerequisites
          </h3>
          <p className="text-white/70">{paper.prerequisites}</p>
        </motion.div>
      )}

      {/* Resource Downloads */}
      {paper.resource_downloads && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 p-6 bg-white/5 border border-white/10 rounded-lg"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Resources
          </h3>
          <div className="prose prose-invert">
            <ReactMarkdown>{paper.resource_downloads}</ReactMarkdown>
          </div>
        </motion.div>
      )}

      {/* Video Walkthrough */}
      {paper.video_walkthrough_url && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 p-6 bg-white/5 border border-white/10 rounded-lg"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Video Walkthrough
          </h3>
          <a
            href={paper.video_walkthrough_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-green hover:text-white underline transition-colors"
          >
            Watch the video tutorial
          </a>
        </motion.div>
      )}

      {/* Interactive Demo */}
      {paper.interactive_demo_url && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-6 p-6 bg-white/5 border border-white/10 rounded-lg"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Interactive Demo
          </h3>
          <a
            href={paper.interactive_demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-green hover:text-white underline transition-colors"
          >
            Try the interactive demo
          </a>
        </motion.div>
      )}
    </motion.article>
  )
}
