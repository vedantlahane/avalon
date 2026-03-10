# API Specification

## Email Templates
- `GET /email-templates`: Get all email templates
- `POST /email-templates`: Create a new email template
  - Body: `{ name: string, subject: string, body: string, category: string, aiGenerated: boolean, variablesCount: number, usedCount: number, avgOpenRate: number }`
- `PATCH /email-templates/:id`: Update an existing email template
  - Body: Partial of create body
- `DELETE /email-templates/:id`: Delete an email template

## AI Generation (Optional, can be handled by a generic AI endpoint if needed)
- `POST /ai/generate-template`: Generate email template variations based on prompt
  - Body: `{ description: string, tone: string, length: string }`
  - Response: `{ variations: [{ subject: string, body: string }] }`
