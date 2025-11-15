-- Insert new tags
INSERT INTO tags (id, name, slug, created_at) VALUES ('tag-006', 'Authentication', 'authentication', '2025-11-15T00:00:00.000Z');
INSERT INTO tags (id, name, slug, created_at) VALUES ('tag-007', 'Edge Functions', 'edge-functions', '2025-11-15T00:00:00.000Z');
INSERT INTO tags (id, name, slug, created_at) VALUES ('tag-008', 'Caching', 'caching', '2025-11-15T00:00:00.000Z');
INSERT INTO tags (id, name, slug, created_at) VALUES ('tag-009', 'Security', 'security', '2025-11-15T00:00:00.000Z');
INSERT INTO tags (id, name, slug, created_at) VALUES ('tag-010', 'Analytics', 'analytics', '2025-11-15T00:00:00.000Z');
INSERT INTO tags (id, name, slug, created_at) VALUES ('tag-011', 'Privacy', 'privacy', '2025-11-15T00:00:00.000Z');
INSERT INTO tags (id, name, slug, created_at) VALUES ('tag-012', 'Data Aggregation', 'data-aggregation', '2025-11-15T00:00:00.000Z');
INSERT INTO tags (id, name, slug, created_at) VALUES ('tag-013', 'Creator Economy', 'creator-economy', '2025-11-15T00:00:00.000Z');

-- Insert Experiment #1: API Key Authentication
INSERT INTO papers (
  id, title, category, content, reading_time, difficulty_level,
  technical_focus, published_on, excerpt_short, excerpt_long, slug, featured,
  published, date, meta_title, meta_description, focus_keywords,
  created_at, updated_at, published_at
) VALUES (
  'f6a7b8c9-0123-4567-fabc-678901234567',
  'API Key Authentication for Edge Functions',
  'authentication',
  'Production-ready API key authentication system optimized for serverless edge functions with 95% cache hit rate and sub-100ms latency. Retroactive metrics: ~22 hours development, $0 costs, 7 errors resolved. Full research paper available.',
  22,
  'Intermediate',
  'API Keys, Edge Functions, Vercel KV, Airtable, SHA256, Caching, Rate Limiting, Next.js',
  '2024-11-15',
  'Production-ready API key authentication system optimized for serverless edge functions with 95% cache hit rate and sub-100ms latency.',
  'Discover how to implement a secure API key authentication system for edge functions using Vercel KV caching. This experiment achieved 95% cache hit rate, reducing Airtable API calls from 1,000/hour to ~50/hour while maintaining sub-100ms authentication latency. Includes retroactive metrics: ~22 hours development time, $0 costs, and 7 major issues resolved.',
  'api-key-authentication-edge-functions',
  1,
  1,
  '2024-11-15',
  'API Key Authentication for Edge Functions | Create Something',
  'Production-ready API key authentication system optimized for serverless edge functions with Vercel KV caching, SHA256 hashing, and scope-based permissions.',
  'API Keys, Edge Functions, Vercel KV, Airtable, SHA256, Authentication, Caching, Rate Limiting, Next.js, Serverless, Security',
  '2025-11-15T00:00:00.000Z',
  '2025-11-15T00:00:00.000Z',
  '2025-11-15T00:00:00.000Z'
);

-- Insert Experiment #2: Privacy-Enhanced Analytics
INSERT INTO papers (
  id, title, category, content, reading_time, difficulty_level,
  technical_focus, published_on, excerpt_short, excerpt_long, slug, featured,
  published, date, meta_title, meta_description, focus_keywords,
  created_at, updated_at, published_at
) VALUES (
  'a7b8c9d0-1234-5678-gabc-789012345678',
  'Privacy-Enhanced Analytics for Creator Marketplaces',
  'analytics',
  'Privacy-first analytics system balancing competitive market intelligence with creator financial privacy through category aggregates. Achieved 73% support request reduction and 77% data freshness improvement. Retroactive metrics: ~18 hours development, $0 costs, 5 errors. Full research paper available.',
  20,
  'Intermediate',
  'Analytics, Privacy, Data Aggregation, Census, Snowflake, Airtable, Next.js, Creator Economy, Automated Insights',
  '2024-11-15',
  'Privacy-first analytics system for creator marketplaces balancing competitive intelligence with financial privacy through category aggregates.',
  'Discover how to build privacy-enhanced analytics for creator marketplaces. This experiment achieved 73% support request reduction and 77% data freshness improvement while protecting individual creator financial data. Demonstrates privacy-preserving competitive intelligence through category aggregation and automated insight generation.',
  'privacy-enhanced-analytics-marketplaces',
  1,
  1,
  '2024-11-15',
  'Privacy-Enhanced Analytics for Creator Marketplaces | Create Something',
  'Privacy-first analytics system balancing competitive market intelligence with creator financial privacy through category aggregates and automated insights.',
  'Analytics, Privacy, Data Aggregation, Census, Snowflake, Airtable, Creator Economy, Marketplace Intelligence, Automated Insights, Next.js',
  '2025-11-15T00:00:00.000Z',
  '2025-11-15T00:00:00.000Z',
  '2025-11-15T00:00:00.000Z'
);

-- Link Experiment #1 to tags
INSERT INTO paper_tags (paper_id, tag_id) VALUES ('f6a7b8c9-0123-4567-fabc-678901234567', 'tag-004');
INSERT INTO paper_tags (paper_id, tag_id) VALUES ('f6a7b8c9-0123-4567-fabc-678901234567', 'tag-005');
INSERT INTO paper_tags (paper_id, tag_id) VALUES ('f6a7b8c9-0123-4567-fabc-678901234567', 'tag-006');
INSERT INTO paper_tags (paper_id, tag_id) VALUES ('f6a7b8c9-0123-4567-fabc-678901234567', 'tag-007');
INSERT INTO paper_tags (paper_id, tag_id) VALUES ('f6a7b8c9-0123-4567-fabc-678901234567', 'tag-008');
INSERT INTO paper_tags (paper_id, tag_id) VALUES ('f6a7b8c9-0123-4567-fabc-678901234567', 'tag-009');

-- Link Experiment #2 to tags
INSERT INTO paper_tags (paper_id, tag_id) VALUES ('a7b8c9d0-1234-5678-gabc-789012345678', 'tag-004');
INSERT INTO paper_tags (paper_id, tag_id) VALUES ('a7b8c9d0-1234-5678-gabc-789012345678', 'tag-005');
INSERT INTO paper_tags (paper_id, tag_id) VALUES ('a7b8c9d0-1234-5678-gabc-789012345678', 'tag-010');
INSERT INTO paper_tags (paper_id, tag_id) VALUES ('a7b8c9d0-1234-5678-gabc-789012345678', 'tag-011');
INSERT INTO paper_tags (paper_id, tag_id) VALUES ('a7b8c9d0-1234-5678-gabc-789012345678', 'tag-012');
INSERT INTO paper_tags (paper_id, tag_id) VALUES ('a7b8c9d0-1234-5678-gabc-789012345678', 'tag-013');
