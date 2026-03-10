# Avalon API Specification

## Contacts
- `GET /contacts` - List all contacts
- `POST /contacts` - Create a new contact
- `GET /contacts/:id` - Get a contact by id
- `PATCH /contacts/:id` - Update a contact
- `DELETE /contacts/:id` - Soft delete a contact

## Companies
- `GET /companies` - List all companies
- `POST /companies` - Create a new company
- `GET /companies/:id` - Get a company by id
- `PATCH /companies/:id` - Update a company
- `DELETE /companies/:id` - Soft delete a company

## Deals
- `GET /deals` - List all deals
- `POST /deals` - Create a new deal
- `GET /deals/:id` - Get a deal by id
- `PATCH /deals/:id` - Update a deal
- `DELETE /deals/:id` - Soft delete a deal

## Activities
- `GET /activities` - List all activities
- `POST /activities` - Create a new activity
- `PATCH /activities/:id` - Update an activity
- `DELETE /activities/:id` - Soft delete an activity

## Tasks
- `GET /tasks` - List all tasks
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Soft delete a task

## Email Templates
- `GET /email-templates` - List all email templates
- `POST /email-templates` - Create a new email template
- `PATCH /email-templates/:id` - Update an email template
- `DELETE /email-templates/:id` - Soft delete an email template

## Emails
- `GET /emails` - List all emails
- `GET /emails/:id` - Get an email by id
- `PATCH /emails/:id` - Update an email (mark as read, add summary etc)
- `DELETE /emails/:id` - Soft delete an email
