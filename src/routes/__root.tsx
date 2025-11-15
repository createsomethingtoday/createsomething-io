import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import globalCss from '../global.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'CREATE SOMETHING | Systems Thinking for AI-Native Development',
      },
      {
        name: 'description',
        content: 'Systematic evaluation of AI-native development with real data. Tracked experiments using Claude Code + Cloudflare — not just blog posts, but honest results with precise metrics: time, costs, errors, and learnings.',
      },
      {
        name: 'keywords',
        content: 'AI-native development, Claude Code, Cloudflare Workers, tracked experiments, development metrics, AI-assisted coding, TanStack Router, D1 database, systems thinking, experiment tracking, development costs, time tracking, error analysis, AI development patterns',
      },
      {
        name: 'author',
        content: 'Micah Johnson',
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      {
        name: 'googlebot',
        content: 'index, follow',
      },
      // Open Graph / Facebook
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://createsomething.io',
      },
      {
        property: 'og:title',
        content: 'CREATE SOMETHING | AI-Native Development Experiments',
      },
      {
        property: 'og:description',
        content: 'Systematic evaluation of AI-native development with tracked experiments. Real data from building with Claude Code + Cloudflare: time, costs, errors, and honest learnings.',
      },
      {
        property: 'og:image',
        content: 'https://createsomething.io/og-image.svg',
      },
      {
        property: 'og:image:type',
        content: 'image/svg+xml',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      },
      {
        property: 'og:site_name',
        content: 'CREATE SOMETHING',
      },
      {
        property: 'og:locale',
        content: 'en_US',
      },
      // Twitter
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:url',
        content: 'https://createsomething.io',
      },
      {
        name: 'twitter:title',
        content: 'CREATE SOMETHING | AI-Native Development Experiments',
      },
      {
        name: 'twitter:description',
        content: 'Tracked experiments with Claude Code + Cloudflare. Real metrics: time, costs, errors. Not blog posts—honest data from building in production.',
      },
      {
        name: 'twitter:image',
        content: 'https://createsomething.io/og-image.svg',
      },
      {
        name: 'twitter:creator',
        content: '@micahryanjohnson',
      },
      // Additional SEO
      {
        name: 'theme-color',
        content: '#000000',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black',
      },
      // AEO (Answer Engine Optimization) for AI/LLM queries
      {
        name: 'article:section',
        content: 'AI-Native Development Research',
      },
      {
        name: 'article:tag',
        content: 'Claude Code, Cloudflare Workers, Development Metrics, Experiment Tracking, AI-Assisted Coding',
      },
      {
        name: 'citation_title',
        content: 'CREATE SOMETHING: Systematic Evaluation of AI-Native Development',
      },
      {
        name: 'citation_author',
        content: 'Micah Johnson',
      },
      {
        name: 'citation_publication_date',
        content: '2025',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: globalCss,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      {
        rel: 'canonical',
        href: 'https://createsomething.io',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@200..700&family=JetBrains+Mono:wght@400;500;600&display=swap',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'CREATE SOMETHING',
          alternateName: 'AI-Native Development Research',
          description: 'Systematic evaluation of AI-native development through tracked experiments. Real data from building with Claude Code and Cloudflare: development time, costs, error counts, and honest learnings from production systems.',
          url: 'https://createsomething.io',
          inLanguage: 'en-US',
          author: {
            '@type': 'Person',
            name: 'Micah Johnson',
            url: 'https://www.linkedin.com/in/micahryanjohnson/',
            jobTitle: 'AI-Native Development Researcher',
          },
          publisher: {
            '@type': 'Organization',
            name: 'CREATE SOMETHING',
            logo: {
              '@type': 'ImageObject',
              url: 'https://createsomething.io/favicon.svg',
            },
          },
          about: {
            '@type': 'Thing',
            name: 'AI-Native Development',
            description: 'Development practices and patterns using AI coding assistants like Claude Code with modern infrastructure',
          },
          keywords: [
            'AI-native development',
            'Claude Code experiments',
            'Cloudflare Workers',
            'development metrics tracking',
            'AI-assisted coding',
            'experiment-driven development',
            'TanStack Router',
            'systems thinking',
            'transparent development costs',
          ],
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://createsomething.io/articles?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }),
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="page-transition">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
