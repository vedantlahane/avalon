# API Specification

### Company Management
- `GET /crm/companies` - Get all companies with stats
- `GET /crm/companies/:id` - Get company by ID with stats
- `GET /crm/companies/:id/insights` - Get AI insights for a company
- `POST /crm/companies` - Create a new company
- `PATCH /crm/companies/:id` - Update a company
- `POST /crm/companies/:id/enrich` - Enrich company data via AI
- `POST /crm/companies/bulk-enrich` - Bulk enrich companies via AI
  - Body: `{ ids: number[] }`

### Email Template Management
- `GET /email-templates` - Get all email templates
- `POST /email-templates` - Create a new email template
- `PATCH /email-templates/:id` - Update an email template
- `DELETE /email-templates/:id` - Delete an email template (soft delete)

### Task Management
- `GET /tasks` - Get all tasks (with contact and deal info)
- `GET /tasks/suggestions` - Get AI suggested tasks based on CRM data
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task (status, priority, etc.)
- `DELETE /tasks/:id` - Soft delete a task

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
