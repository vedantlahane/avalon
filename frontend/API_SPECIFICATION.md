# API Specification

## Auth
- POST /auth/register - Register a new user
- POST /auth/login - Login
- POST /auth/refresh - Refresh tokens
- GET /auth/me - Get current user

## Companies
- GET /companies - List companies
- POST /companies - Create company
- GET /companies/:id - Get company details
- PATCH /companies/:id - Update company
- DELETE /companies/:id - Soft delete company

## Contacts
- GET /contacts - List contacts
- POST /contacts - Create contact
- GET /contacts/:id - Get contact details
- PATCH /contacts/:id - Update contact
- DELETE /contacts/:id - Soft delete contact
- POST /contacts/enrich - Enrich contact data using AI

## Deals
- GET /deals - List deals
- POST /deals - Create deal
- GET /deals/:id - Get deal details
- PATCH /deals/:id - Update deal
- DELETE /deals/:id - Soft delete deal
- GET /deals/forecast - Get deal forecast data

## Emails
- GET /emails - List emails (supports folder query param)
- GET /emails/:id - Get email details
- PATCH /emails/:id/star - Toggle star status
- PATCH /emails/:id/read - Mark as read
- POST /emails/generate - Generate email content using AI
- POST /emails/improve - Improve existing email text using AI
- POST /emails/suggest-subject - Suggest subject lines using AI
- POST /emails/score - Score email content using AI
- POST /emails/suggest-time - Suggest best time to send email
- POST /emails/send - Send an email and log activity
- POST /emails/:id/generate-reply - Generate AI reply

## Tasks
- GET /tasks - List tasks
- POST /tasks - Create task
- PATCH /tasks/:id - Update task
- DELETE /tasks/:id - Soft delete task

## Activities
- GET /activities - List activities
- POST /activities - Log activity

## Dashboard
- GET /dashboard/stats - Get dashboard statistics