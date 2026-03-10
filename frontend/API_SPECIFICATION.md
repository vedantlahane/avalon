# API Specification

## Email Templates
- `GET /email-templates`: Get all email templates
- `POST /email-templates`: Create a new email template
  - Body: `{ name: string, subject: string, body: string, category: string, aiGenerated: boolean, variablesCount: number, usedCount: number, avgOpenRate: number }`
- `PATCH /email-templates/:id`: Update an existing email template
  - Body: Partial of create body
- `DELETE /email-templates/:id`: Delete an email template

## Sentiment Analysis
- `GET /emails/sentiment/summary`: Get overall sentiment summary cards data
- `GET /emails/sentiment/trend`: Get sentiment trend data for the last 30 days
- `GET /emails/sentiment/flagged`: Get emails with negative or urgent sentiment
- `GET /contacts/sentiment/breakdown`: Get sentiment breakdown per contact
- `GET /emails/sentiment/insights`: Get AI-generated sentiment insights

## AI Generation (Optional, can be handled by a generic AI endpoint if needed)
- `POST /ai/generate-template`: Generate email template variations based on prompt
  - Body: `{ description: string, tone: string, length: string }`
  - Response: `{ variations: [{ subject: string, body: string }] }`
