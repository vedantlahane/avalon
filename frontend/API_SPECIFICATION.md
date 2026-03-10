# API Specification

### Auth Endpoints
- `GET /auth/me` - Get current user profile
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login with email and password
- `PATCH /auth/onboarding` - Update user onboarding status and personalization data (Authenticated)
  - Body: `{ isOnboarded?: boolean, role?: string, teamSize?: string, revenueTarget?: number }`

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

### Activities
- `GET /activities` - List all activities (query params: `contactId`, `dealId`)
- `POST /activities` - Create new activity
- `PATCH /activities/:id` - Update activity
- `DELETE /activities/:id` - Soft delete activity

### AI
- `POST /ai/chat` - AI Chat assistant (streaming)
- `POST /ai/summarize-activity` - Summarize activity notes and detect sentiment
- `POST /ai/extract-tasks` - Extract tasks from activity notes
- `POST /ai/suggest-next-steps` - Suggest next steps based on activity and deal stage

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

### Lead Scoring
- `POST /crm/contacts/:id/lead-score/refresh` - Force recalculate lead score for a contact
- `GET /crm/contacts/:id/lead-score/history` - Get score history for a contact

### Notification Management
- `GET /notifications` - Get all notifications
- `PATCH /notifications/:id/read` - Mark a notification as read
- `POST /notifications/mark-all-read` - Mark all notifications as read
- `DELETE /notifications/:id` - Soft delete a notification

### Import/Export
- `POST /crm/import/analyze` - Analyze CSV file and return metadata and suggested mapping
  - Body: `FormData` (file: File)
  - Response: `{ fileName: string, rowCount: number, columns: string[], suggestedMapping: Record<string, string> }`
- `POST /crm/import/preview` - Preview data and validation errors
  - Body: `{ data: any[], mapping: Record<string, string> }`
  - Response: `{ summary: { total: number, valid: number, warnings: number, errors: number }, preview: any[], validationErrors: any[] }`
- `POST /crm/import/execute` - Perform the actual import
  - Body: `{ data: any[], mapping: Record<string, string>, duplicateHandling: string }`
  - Response: `{ created: number, updated: number, skipped: number, failed: number }`
- `GET /crm/export` - Export data to various formats
  - Query params: `resource` (contacts|deals|companies), `ids` (comma separated or 'all'), `format` (csv|xlsx|pdf|json), `fields` (comma separated), `includeAiSummary` (boolean)
  - Response: File download
- `POST /crm/contacts/:id/enrich` - Enrich contact with AI data
