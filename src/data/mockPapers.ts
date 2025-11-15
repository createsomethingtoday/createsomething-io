import type { Paper } from '../types/paper'
import mockPapersData from './mockPapers.json'

// Type-safe export of JSON data
export const mockPapers = mockPapersData as Paper[]

// Helper functions
export function getMockPaperBySlug(slug: string): Paper | null {
  return mockPapers.find(p => p.slug === slug) || null
}

export function getMockPapersByCategory(category: string): Paper[] {
  return mockPapers.filter(p => p.category === category)
}

export const mockCategories = [
  { name: 'Development', slug: 'development', count: 0 },
  { name: 'Infrastructure', slug: 'infrastructure', count: 0 },
  { name: 'Automation', slug: 'automation', count: 4 },
  { name: 'Webflow', slug: 'webflow', count: 1 }
]

// ASCII Art Generator
export function getCategoryAsciiArt(category: string): string {
  return `
███████████████████████████████████████
█░░░░░░░░░░░░ ${category.toUpperCase()} ░░░░░░░░░░░█
███████████████████████████████████████
  `.trim()
}
