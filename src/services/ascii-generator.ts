/**
 * ASCII Art Generator Service
 *
 * Generates ASCII art for paper cards in the terminal interface.
 * Uses block characters (░▒▓█) for high-quality visual representation.
 *
 * Features:
 * - Custom ASCII art templates for different paper categories
 * - Text-based ASCII art generation
 * - Configurable dimensions for card display
 * - Monochrome output optimized for terminal display
 */

// ASCII art configuration for card display
export interface ASCIIConfig {
  width: number;      // characters wide
  height: number;     // lines tall
  charset: 'blocks' | 'standard' | 'minimal';
  style: 'filled' | 'outline' | 'gradient';
}

// Default configuration for card display
export const CARD_ASCII_CONFIG: ASCIIConfig = {
  width: 40,
  height: 20,
  charset: 'blocks',
  style: 'gradient'
};

// Character sets for different styles
const CHARSETS = {
  blocks: ['░', '▒', '▓', '█'],
  standard: ['.', ':', '+', '#', '@'],
  minimal: [' ', '.', 'o', 'O']
};

/**
 * Category-specific ASCII art templates
 * Pre-designed ASCII art for each paper category
 */
const CATEGORY_TEMPLATES = {
  automation: `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░
░░░░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░░░░
░░░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░░░
░░░░░░░░░▒▓▓▓████████▓▓▓▒░░░░░░░░░░░░░
░░░░░░░░░▒▓▓██▓▓▓▓▓▓██▓▓▒░░░░░░░░░░░░░
░░░░░░░░░▒▓▓██▓▓▓▓▓▓██▓▓▒░░░░░░░░░░░░░
░░░░░░░░░▒▓▓▓████████▓▓▓▒░░░░░░░░░░░░░
░░░░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░░░
░░░░░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░░░░
░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░
░░░░░░░▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒░░░░░░░░░░
░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░
░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░
░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░
░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░
░░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░
░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`,

  development: `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░
░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░
░░░░░░░░▓▓▓▓░░░░░░░░░▓▓▓▓▓░░░░░░░░░░░░
░░░░░░░▓▓▓░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░
░░░░░░▓▓▓░░░███░░███░░░░▓▓▓░░░░░░░░░░░
░░░░░░▓▓░░░░███░░███░░░░░▓▓░░░░░░░░░░░
░░░░░░▓▓░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░
░░░░░░▓▓░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░
░░░░░░▓▓░░░███████████░░░▓▓░░░░░░░░░░░
░░░░░░▓▓░░░░███████████░░▓▓░░░░░░░░░░░
░░░░░░░▓▓░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░
░░░░░░░▓▓▓░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░
░░░░░░░░▓▓▓░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░
░░░░░░░░░▓▓▓▓░░░░░░░▓▓▓▓░░░░░░░░░░░░░░
░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░
░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`,

  infrastructure: `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░
░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░
░░░░░░░░▓▓▓░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░
░░░░░░░░▓▓▓░░▒▒▒░░▒▒▒░░░░▓▓▓░░░░░░░░░░
░░░░░░░░▓▓▓░░▒▒▒░░▒▒▒░░░░▓▓▓░░░░░░░░░░
░░░░░░░░▓▓▓░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░
░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░
░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░
░░░░░░░░▓▓▓░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░
░░░░░░░░▓▓▓░░▒▒▒░░▒▒▒░░░░▓▓▓░░░░░░░░░░
░░░░░░░░▓▓▓░░▒▒▒░░▒▒▒░░░░▓▓▓░░░░░░░░░░
░░░░░░░░▓▓▓░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░
░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░
░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░
░░░░░░░░▓▓▓░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░
░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`,

  webflow: `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░▓▓▓▓▓░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░
░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░
░░░░░░░░░▓▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓░░░░░░░░░░░░░
░░░░░░░▓▓▓▓▓▒▒▒▒▒▒▒▒▒▓▓▓▓▓░░░░░░░░░░░░
░░░░░░▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓░░░░░░░░░░░
░░░░░▓▓▓▓▒▒▒▒▒░░░░▒▒▒▒▒▓▓▓▓░░░░░░░░░░░
░░░░▓▓▓▓▒▒▒▒░░░░░░░░▒▒▒▒▓▓▓▓░░░░░░░░░░
░░░▓▓▓▓▒▒▒░░░░░░░░░░░▒▒▒▓▓▓▓░░░░░░░░░░
░░░▓▓▓▓▒▒░░░░░░█░░░░░░▒▒▓▓▓▓░░░░░░░░░░
░░░▓▓▓▓▒▒░░░░░░░░░░░░░▒▒▓▓▓▓░░░░░░░░░░
░░░▓▓▓▓▒▒▒░░░░░░░░░░░▒▒▒▓▓▓▓░░░░░░░░░░
░░░░▓▓▓▓▒▒▒░░░░░░░░░▒▒▒▓▓▓▓░░░░░░░░░░░
░░░░░▓▓▓▓▒▒▒▒░░░░░▒▒▒▒▓▓▓▓░░░░░░░░░░░░
░░░░░░▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓░░░░░░░░░░░░░
░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░
░░░░░░░░░░░░▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`,

  default: `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░
░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░
░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░
░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░
░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░
░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░
░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░
░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░
░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░
░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░
░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░
░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░
░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░
░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`
};

/**
 * Generate ASCII art for a paper based on its category
 */
export function generateASCIIArt(
  category: string,
  config: ASCIIConfig = CARD_ASCII_CONFIG
): string {
  const normalizedCategory = category.toLowerCase();
  const template = CATEGORY_TEMPLATES[normalizedCategory as keyof typeof CATEGORY_TEMPLATES]
    || CATEGORY_TEMPLATES.default;

  return template.trim();
}

/**
 * Generate text-based ASCII art from a string
 * Useful for creating custom ASCII from paper titles
 */
export function generateTextASCII(
  text: string,
  config: ASCIIConfig = CARD_ASCII_CONFIG
): string {
  const chars = CHARSETS[config.charset];
  const lines: string[] = [];

  // Create a simple text banner
  const maxWidth = Math.min(text.length, config.width - 4);
  const padding = Math.floor((config.width - maxWidth - 4) / 2);

  // Top border
  lines.push(chars[0].repeat(config.width));
  lines.push(chars[0].repeat(config.width));

  // Add spacing
  for (let i = 0; i < Math.floor(config.height / 3); i++) {
    lines.push(chars[0].repeat(config.width));
  }

  // Text content
  const displayText = text.substring(0, maxWidth).toUpperCase();
  const textLine = chars[0].repeat(padding) +
                   chars[3].repeat(2) +
                   ' ' + displayText + ' ' +
                   chars[3].repeat(2) +
                   chars[0].repeat(padding);
  lines.push(textLine.padEnd(config.width, chars[0]));

  // Bottom spacing
  for (let i = 0; i < config.height - lines.length - 2; i++) {
    lines.push(chars[0].repeat(config.width));
  }

  // Bottom border
  lines.push(chars[0].repeat(config.width));
  lines.push(chars[0].repeat(config.width));

  return lines.join('\n');
}

/**
 * Create a gradient ASCII pattern
 */
export function generateGradientASCII(
  direction: 'horizontal' | 'vertical' | 'diagonal',
  config: ASCIIConfig = CARD_ASCII_CONFIG
): string {
  const chars = CHARSETS[config.charset];
  const lines: string[] = [];

  for (let y = 0; y < config.height; y++) {
    let line = '';
    for (let x = 0; x < config.width; x++) {
      let intensity: number;

      switch (direction) {
        case 'horizontal':
          intensity = x / config.width;
          break;
        case 'vertical':
          intensity = y / config.height;
          break;
        case 'diagonal':
          intensity = (x + y) / (config.width + config.height);
          break;
        default:
          intensity = 0;
      }

      const charIndex = Math.floor(intensity * (chars.length - 1));
      line += chars[charIndex];
    }
    lines.push(line);
  }

  return lines.join('\n');
}

/**
 * Get ASCII art for thumbnail display (smaller version)
 */
export function generateThumbnailASCII(
  category: string
): string {
  const thumbnailConfig: ASCIIConfig = {
    width: 20,
    height: 10,
    charset: 'blocks',
    style: 'filled'
  };

  return generateASCIIArt(category, thumbnailConfig);
}

/**
 * Validate ASCII art dimensions
 */
export function validateASCIIArt(ascii: string, config: ASCIIConfig): boolean {
  const lines = ascii.split('\n');

  if (lines.length !== config.height) {
    return false;
  }

  for (const line of lines) {
    if (line.length !== config.width) {
      return false;
    }
  }

  return true;
}

/**
 * Get all available categories with ASCII art
 */
export function getAvailableCategories(): string[] {
  return Object.keys(CATEGORY_TEMPLATES).filter(cat => cat !== 'default');
}

/**
 * Batch generate ASCII art for multiple papers
 */
export interface PaperASCIIData {
  id: string;
  category: string;
  ascii_art: string;
  ascii_thumbnail?: string;
}

export function batchGenerateASCII(
  papers: Array<{ id: string; category: string }>
): PaperASCIIData[] {
  return papers.map(paper => ({
    id: paper.id,
    category: paper.category,
    ascii_art: generateASCIIArt(paper.category),
    ascii_thumbnail: generateThumbnailASCII(paper.category)
  }));
}

/**
 * Export functions for use in scripts
 */
export default {
  generateASCIIArt,
  generateTextASCII,
  generateGradientASCII,
  generateThumbnailASCII,
  validateASCIIArt,
  getAvailableCategories,
  batchGenerateASCII,
  CARD_ASCII_CONFIG,
  CATEGORY_TEMPLATES
};
