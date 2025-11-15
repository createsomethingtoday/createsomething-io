#!/bin/bash

# Resend API Configuration
RESEND_API_KEY="re_JbMtKyRz_3n55bLDPciMmZfgaez38WzM7"
API_BASE="https://api.resend.com"

echo "🚀 Creating Resend email templates..."
echo ""

# Function to URL encode HTML
urlencode() {
  python3 -c "import sys, urllib.parse as ul; print(ul.quote(sys.stdin.read()))"
}

# Function to escape JSON
escape_json() {
  python3 -c 'import json, sys; print(json.dumps(sys.stdin.read()))'
}

# 1. Newsletter Welcome Template
echo "📧 Creating Newsletter Welcome template..."
NEWSLETTER_HTML=$(cat newsletter-welcome.html | escape_json)

curl -X POST "$API_BASE/templates" \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
  \"name\": \"newsletter-welcome\",
  \"html\": $NEWSLETTER_HTML,
  \"variables\": [
    {
      \"key\": \"UNSUBSCRIBE_URL\",
      \"type\": \"string\",
      \"fallback_value\": \"https://createsomething.io/unsubscribe\"
    }
  ]
}" | python3 -m json.tool

echo ""
echo "---"
echo ""

# 2. Contact Response Template
echo "📧 Creating Contact Response template..."
CONTACT_HTML=$(cat contact-response.html | escape_json)

curl -X POST "$API_BASE/templates" \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
  \"name\": \"contact-response\",
  \"html\": $CONTACT_HTML,
  \"variables\": [
    {
      \"key\": \"NAME\",
      \"type\": \"string\",
      \"fallback_value\": \"there\"
    },
    {
      \"key\": \"MESSAGE\",
      \"type\": \"string\",
      \"fallback_value\": \"Your message\"
    }
  ]
}" | python3 -m json.tool

echo ""
echo "---"
echo ""

# 3. Weekly Newsletter Template
echo "📧 Creating Weekly Newsletter template..."
WEEKLY_HTML=$(cat weekly-newsletter.html | escape_json)

curl -X POST "$API_BASE/templates" \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
  \"name\": \"weekly-newsletter\",
  \"html\": $WEEKLY_HTML,
  \"variables\": [
    {\"key\": \"ISSUE_DATE\", \"type\": \"string\", \"fallback_value\": \"Weekly Update\"},
    {\"key\": \"NEWSLETTER_TITLE\", \"type\": \"string\", \"fallback_value\": \"This Week in AI-Native Development\"},
    {\"key\": \"NEWSLETTER_SUBTITLE\", \"type\": \"string\", \"fallback_value\": \"Experiments, learnings, and honest results\"},
    {\"key\": \"INTRO_TEXT\", \"type\": \"string\", \"fallback_value\": \"Here's what I've been learning this week.\"},
    {\"key\": \"EXPERIMENT_TITLE\", \"type\": \"string\", \"fallback_value\": \"Latest Experiment\"},
    {\"key\": \"EXPERIMENT_DESCRIPTION\", \"type\": \"string\", \"fallback_value\": \"Description\"},
    {\"key\": \"TIME_HOURS\", \"type\": \"number\", \"fallback_value\": 0},
    {\"key\": \"ERROR_COUNT\", \"type\": \"number\", \"fallback_value\": 0},
    {\"key\": \"TOTAL_COST\", \"type\": \"number\", \"fallback_value\": 0},
    {\"key\": \"SAVINGS_PERCENT\", \"type\": \"number\", \"fallback_value\": 0},
    {\"key\": \"KEY_LEARNING\", \"type\": \"string\", \"fallback_value\": \"Key learning\"},
    {\"key\": \"EXPERIMENT_URL\", \"type\": \"string\", \"fallback_value\": \"https://createsomething.io\"},
    {\"key\": \"LEARNING_1\", \"type\": \"string\", \"fallback_value\": \"Learning 1\"},
    {\"key\": \"LEARNING_2\", \"type\": \"string\", \"fallback_value\": \"Learning 2\"},
    {\"key\": \"FEATURED_LINK_URL\", \"type\": \"string\", \"fallback_value\": \"https://createsomething.io\"},
    {\"key\": \"FEATURED_LINK_TITLE\", \"type\": \"string\", \"fallback_value\": \"Read More\"},
    {\"key\": \"FEATURED_LINK_DESC\", \"type\": \"string\", \"fallback_value\": \"Latest content\"},
    {\"key\": \"NEXT_TEASER\", \"type\": \"string\", \"fallback_value\": \"Next experiment preview\"},
    {\"key\": \"UNSUBSCRIBE_URL\", \"type\": \"string\", \"fallback_value\": \"https://createsomething.io/unsubscribe\"}
  ]
}" | python3 -m json.tool

echo ""
echo "---"
echo ""
echo "✅ All templates created!"
echo ""
echo "To publish a template:"
echo "curl -X POST \"$API_BASE/templates/{template_id}/publish\" \\"
echo "  -H \"Authorization: Bearer $RESEND_API_KEY\" \\"
echo "  -H \"Content-Type: application/json\""
echo ""
echo "To list all templates:"
echo "curl -X GET \"$API_BASE/templates\" \\"
echo "  -H \"Authorization: Bearer $RESEND_API_KEY\" \\"
echo "  -H \"Content-Type: application/json\""
