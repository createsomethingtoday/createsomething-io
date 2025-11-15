-- Migration: Add ASCII art support to papers table
-- Created: 2025-11-14
-- Description: Adds ascii_art and ascii_thumbnail columns for terminal card display

-- Add ascii_art column for full-size ASCII art
ALTER TABLE papers ADD COLUMN ascii_art TEXT;

-- Add ascii_thumbnail column for smaller ASCII preview
ALTER TABLE papers ADD COLUMN ascii_thumbnail TEXT;

-- Add index for faster queries (optional, since we'll usually fetch with other paper data)
-- CREATE INDEX IF NOT EXISTS idx_papers_ascii_art ON papers(ascii_art) WHERE ascii_art IS NOT NULL;

-- Update comment for tracking
-- ASCII art is generated from paper categories using the ASCII generator service
-- Format: 40 characters wide x 20 lines tall for cards, 20x10 for thumbnails
