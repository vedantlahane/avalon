# API Specification

### Email Template Management
- `GET /email-templates` - Get all email templates
- `POST /email-templates` - Create a new email template
- `PATCH /email-templates/:id` - Update an email template
- `DELETE /email-templates/:id` - Delete an email template (soft delete)

### AI Integration
- `POST /ai/chat` - AI Chat Assistant endpoint for CRM queries and insights. Returns a stream of messages.

## Sentiment Analysis
- `GET /emails/sentiment/summary`: Get overall sentiment summary cards data
- `GET /emails/sentiment/trend`: Get sentiment trend data for the last 30 days
- `GET /emails/sentiment/flagged`: Get emails with negative or urgent sentiment
- `GET /contacts/sentiment/breakdown`: Get sentiment breakdown per contact
- `GET /emails/sentiment/insights`: Get AI-generated sentiment insights

## Reports
- `GET /reports/sales-performance`: Get sales performance report data
- `GET /reports/pipeline-analysis`: Get pipeline analysis report data
- `GET /reports/activity-reports`: Get activity report data
- `GET /reports/contact-analytics`: Get contact analytics report data
- `GET /reports/ai-insights`: Get AI-powered insights report data
- `POST /reports/ai-query`: Query report data using natural language
  - Body: `{ query: string }`
  - Response: `{ answer: string, data: any, chartType: string }`

## AI Generation (Optional, can be handled by a generic AI endpoint if needed)
- `POST /ai/generate-template`: Generate email template variations based on prompt
  - Body: `{ description: string, tone: string, length: string }`
  - Response: `{ variations: [{ subject: string, body: string }] }`
