#!/usr/bin/env node
/**
 * ASCII Art Generator Script
 *
 * Generates ASCII art for all papers in the database and updates the records.
 * Can be run locally or against the remote Cloudflare D1 database.
 *
 * Usage:
 *   npm run generate-ascii         # Generate for all papers
 *   npm run generate-ascii --id=123 # Generate for specific paper
 *   npm run generate-ascii --preview # Preview without saving
 */

import { generateASCIIArt, generateThumbnailASCII, batchGenerateASCII } from '../src/services/ascii-generator';

// Paper data interface
interface Paper {
  id: string;
  title: string;
  category: string;
  slug: string;
}

// Sample papers from seed data
const SAMPLE_PAPERS: Paper[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    title: 'Event-Driven Notion Updates',
    category: 'automation',
    slug: 'event-driven-notion-updates'
  },
  {
    id: 'b2c3d4e5-f678-9012-bcde-f23456789012',
    title: 'Webflow Development',
    category: 'webflow',
    slug: 'webflow-development'
  },
  {
    id: 'c3d4e5f6-7890-1234-cdef-345678901234',
    title: 'Terraform Infrastructure',
    category: 'infrastructure',
    slug: 'terraform-infrastructure'
  },
  {
    id: 'd4e5f6a7-8901-2345-def0-456789012345',
    title: 'Full-Stack Development',
    category: 'development',
    slug: 'full-stack-development'
  },
  {
    id: 'e5f6a7b8-9012-3456-ef01-567890123456',
    title: 'n8n Workflow Automation',
    category: 'automation',
    slug: 'n8n-workflow-automation'
  }
];

/**
 * Generate ASCII art for all papers
 */
function generateAllASCII(preview = false): void {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║          ASCII ART GENERATOR FOR PAPER CARDS                 ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');

  const results = batchGenerateASCII(SAMPLE_PAPERS);

  results.forEach((result, index) => {
    const paper = SAMPLE_PAPERS[index];
    console.log(`\n[${ index + 1 }/${ results.length }] Processing: ${paper.title}`);
    console.log(`Category: ${paper.category}`);
    console.log(`ID: ${paper.id}`);
    console.log('─'.repeat(80));
    console.log('\nGenerated ASCII Art (40x20):');
    console.log('┌' + '─'.repeat(40) + '┐');
    result.ascii_art.split('\n').forEach(line => {
      console.log('│' + line + '│');
    });
    console.log('└' + '─'.repeat(40) + '┘');

    if (preview) {
      console.log('\n✓ Preview mode - not saving to database');
    } else {
      console.log('\n✓ ASCII art generated successfully');
      console.log('  → Ready to be added to database');
    }
  });

  console.log('\n' + '═'.repeat(80));
  console.log(`\n✓ Generated ASCII art for ${results.length} papers`);

  if (!preview) {
    console.log('\nNext steps:');
    console.log('1. Copy the generated SQL statements to update the database');
    console.log('2. Run: npm run update-seed-data');
    console.log('3. Deploy: npm run deploy');
  }

  // Generate SQL update statements
  console.log('\n' + '═'.repeat(80));
  console.log('SQL UPDATE STATEMENTS:');
  console.log('═'.repeat(80) + '\n');

  results.forEach((result, index) => {
    const paper = SAMPLE_PAPERS[index];
    const escapedASCII = result.ascii_art.replace(/'/g, "''");
    const escapedThumbnail = result.ascii_thumbnail?.replace(/'/g, "''") || '';

    console.log(`-- Update ASCII art for: ${paper.title}`);
    console.log(`UPDATE papers SET`);
    console.log(`  ascii_art = '${escapedASCII}',`);
    if (escapedThumbnail) {
      console.log(`  ascii_thumbnail = '${escapedThumbnail}',`);
    }
    console.log(`  updated_at = CURRENT_TIMESTAMP`);
    console.log(`WHERE id = '${paper.id}';`);
    console.log('');
  });
}

/**
 * Generate ASCII for a specific paper by ID
 */
function generateForPaper(paperId: string): void {
  const paper = SAMPLE_PAPERS.find(p => p.id === paperId);

  if (!paper) {
    console.error(`Error: Paper with ID ${paperId} not found`);
    process.exit(1);
  }

  console.log(`\nGenerating ASCII art for: ${paper.title}`);
  console.log(`Category: ${paper.category}\n`);

  const asciiArt = generateASCIIArt(paper.category);
  const thumbnail = generateThumbnailASCII(paper.category);

  console.log('Full ASCII Art (40x20):');
  console.log(asciiArt);
  console.log('\nThumbnail ASCII Art (20x10):');
  console.log(thumbnail);

  console.log('\n✓ ASCII art generated successfully');
}

/**
 * Display usage information
 */
function showHelp(): void {
  console.log(`
ASCII Art Generator for Create Something Terminal

Usage:
  npm run generate-ascii              Generate for all papers
  npm run generate-ascii -- --id=ID   Generate for specific paper
  npm run generate-ascii -- --preview Preview without saving
  npm run generate-ascii -- --help    Show this help message

Examples:
  npm run generate-ascii
  npm run generate-ascii -- --id=a1b2c3d4-e5f6-7890-abcd-ef1234567890
  npm run generate-ascii -- --preview

Options:
  --id=ID      Generate ASCII art for a specific paper ID
  --preview    Preview generated ASCII without saving to database
  --help       Show this help message

Notes:
  - ASCII art is generated based on paper category
  - Full card size: 40 characters wide x 20 lines tall
  - Thumbnail size: 20 characters wide x 10 lines tall
  - Uses block characters (░▒▓█) for best visual quality
  `);
}

/**
 * Main execution
 */
function main(): void {
  const args = process.argv.slice(2);

  // Check for help flag
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  // Check for specific paper ID
  const idArg = args.find(arg => arg.startsWith('--id='));
  if (idArg) {
    const paperId = idArg.split('=')[1];
    generateForPaper(paperId);
    return;
  }

  // Check for preview mode
  const preview = args.includes('--preview');

  // Generate for all papers
  generateAllASCII(preview);
}

// Run the script
main();
