import { createFileRoute } from '@tanstack/react-router'
import { ArticleHeader } from '../components/ArticleHeader'
import { ArticleContent } from '../components/ArticleContent'
import { ShareButtons } from '../components/ShareButtons'
import { RelatedArticles } from '../components/RelatedArticles'
import { getMockPaperBySlug, getMockPapersByCategory } from '../data/mockPapers'
import type { Paper } from '../types/paper'

interface Env {
  DB: D1Database
  SESSIONS: KVNamespace
  CACHE: KVNamespace
  STORAGE: R2Bucket
}

export const Route = createFileRoute('/experiments/$slug')({
  component: ExperimentDetailPage,
  head: ({ loaderData }) => {
    const { paper } = loaderData
    const url = `https://createsomething.io/experiments/${paper.slug}`
    const imageUrl = paper.featured_image || paper.thumbnail_image || 'https://createsomething.io/og-image.png'

    // Calculate word count for schema
    const wordCount = paper.content ? paper.content.split(/\s+/).length : 0

    return {
      meta: [
        { title: `${paper.title} | CREATE SOMETHING` },
        { name: 'description', content: paper.description || paper.excerpt_long || paper.excerpt_short || 'Technical experiment on modern development practices' },
        { name: 'keywords', content: paper.focus_keywords || `${paper.category}, automation, development, tutorial` },
        { name: 'author', content: 'CREATE SOMETHING' },

        // Open Graph - Article
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: url },
        { property: 'og:title', content: paper.title },
        { property: 'og:description', content: paper.description || paper.excerpt_long || paper.excerpt_short || 'Technical experiment on modern development practices' },
        { property: 'og:image', content: imageUrl },
        { property: 'og:site_name', content: 'CREATE SOMETHING' },
        { property: 'article:published_time', content: paper.published_at || paper.created_at },
        { property: 'article:modified_time', content: paper.updated_at },
        { property: 'article:author', content: 'CREATE SOMETHING' },
        { property: 'article:section', content: paper.category },
        { property: 'article:tag', content: paper.category },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: url },
        { name: 'twitter:title', content: paper.title },
        { name: 'twitter:description', content: paper.description || paper.excerpt_short || 'Technical experiment on modern development practices' },
        { name: 'twitter:image', content: imageUrl },
        { name: 'twitter:creator', content: '@createsomething' },
      ],
      links: [
        { rel: 'canonical', href: url },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechnicalArticle',
            headline: paper.title,
            image: imageUrl,
            datePublished: paper.published_at || paper.created_at,
            dateModified: paper.updated_at || paper.created_at,
            author: {
              '@type': 'Organization',
              name: 'CREATE SOMETHING',
              url: 'https://createsomething.io',
            },
            publisher: {
              '@type': 'Organization',
              name: 'CREATE SOMETHING',
              url: 'https://createsomething.io',
              logo: {
                '@type': 'ImageObject',
                url: 'https://createsomething.io/favicon.svg',
              },
            },
            description: paper.description || paper.excerpt_long || paper.excerpt_short,
            articleSection: paper.category,
            wordCount: wordCount,
            timeRequired: `PT${paper.reading_time || 5}M`,
            inLanguage: 'en-US',
            isAccessibleForFree: true,
            educationalUse: 'Tutorial',
            proficiencyLevel: paper.difficulty_level || 'Intermediate',
          }),
        },
      ],
    }
  },
  loader: async ({ context, params }) => {
    try {
      const env = (context as any).env as Env
      const { slug } = params

      // Check if DB is available (production/wrangler dev)
      if (!env?.DB) {
        console.log('⚠️  Running in local dev mode - using mock data for experiment:', slug)
        const paper = getMockPaperBySlug(slug)
        if (!paper) {
          throw new Error('Experiment not found')
        }
        // Get related papers from the same category
        const relatedPapers = getMockPapersByCategory(paper.category)
          .filter(p => p.id !== paper.id)
          .slice(0, 4)

        return {
          paper,
          relatedPapers
        }
      }

      // Fetch the specific paper by slug
      const paperResult = await env.DB.prepare(`
        SELECT
          id, title, category, content, html_content, reading_time,
          difficulty_level, technical_focus, published_on, excerpt_short,
          excerpt_long, slug, featured, published, is_hidden, archived,
          date, excerpt, description, created_at, updated_at, published_at,
          ascii_art, ascii_thumbnail, prerequisites, resource_downloads,
          video_walkthrough_url, interactive_demo_url
        FROM papers
        WHERE slug = ? AND published = 1 AND is_hidden = 0 AND archived = 0
        LIMIT 1
      `).bind(slug).first()

      if (!paperResult) {
        throw new Error('Experiment not found')
      }

      // Fetch related papers from the same category
      const relatedResult = await env.DB.prepare(`
        SELECT
          id, title, category, reading_time, excerpt_short,
          slug, ascii_art, ascii_thumbnail, published_at, date,
          difficulty_level
        FROM papers
        WHERE category = ?
          AND id != ?
          AND published = 1
          AND is_hidden = 0
          AND archived = 0
        ORDER BY RANDOM()
        LIMIT 4
      `).bind(paperResult.category, paperResult.id).all()

      return {
        paper: paperResult as Paper,
        relatedPapers: (relatedResult.results || []) as Paper[]
      }
    } catch (error) {
      console.error('Error fetching experiment:', error)
      throw error
    }
  }
})

function ExperimentDetailPage() {
  const { paper, relatedPapers } = Route.useLoaderData()

  // Generate full URL for sharing
  const fullUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://createsomething.io/experiments/${paper.slug}`

  return (
    <div className="min-h-screen bg-black">
      {/* Article Header */}
      <ArticleHeader paper={paper} />

      {/* Main Content with Sidebar */}
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_80px] gap-12">
          {/* Main Article Content */}
          <div className="min-w-0">
            <ArticleContent paper={paper} />
          </div>

          {/* Sidebar - Share Buttons */}
          <aside className="hidden lg:block">
            <ShareButtons title={paper.title} url={fullUrl} />
          </aside>
        </div>

        {/* Mobile Share Buttons */}
        <div className="lg:hidden px-6 py-8 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Share this article:</h3>
            <div className="flex gap-3">
              <MobileShareButton
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(paper.title)}&url=${encodeURIComponent(fullUrl)}`}
                label="X"
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                }
              />
              <MobileShareButton
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
                label="Facebook"
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 0C4.477 0 0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.879V12.89H5.898V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.989C16.343 19.129 20 14.99 20 10c0-5.523-4.477-10-10-10z" />
                  </svg>
                }
              />
              <MobileShareButton
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`}
                label="LinkedIn"
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.94 5a2 2 0 11-4-.002 2 2 0 014 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <RelatedArticles papers={relatedPapers} currentPaperId={paper.id} />

      {/* Back to Experiments */}
      <div className="w-full max-w-5xl mx-auto px-6 py-12">
        <a
          href="/experiments"
          className="inline-flex items-center gap-2 text-terminal-green hover:text-white transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to all experiments
        </a>
      </div>
    </div>
  )
}

interface MobileShareButtonProps {
  href: string
  label: string
  icon: React.ReactNode
}

function MobileShareButton({ href, label, icon }: MobileShareButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 text-white/60 hover:text-white"
      aria-label={`Share on ${label}`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </a>
  )
}
