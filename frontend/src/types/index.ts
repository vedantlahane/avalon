export type LeadSource = 'Website' | 'LinkedIn' | 'Referral' | 'Cold Outreach' | 'Event' | 'Advertisement' | 'Other';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Unqualified' | 'Nurturing';
export type Industry = 'Technology' | 'Healthcare' | 'Finance' | 'Education' | 'Retail' | 'Manufacturing' | 'Consulting' | 'Real Estate' | 'Other';
export type CompanySize = '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
export type DealStage = 'Lead' | 'Qualified' | 'Discovery' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
export type DealPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type ActivityType = 'Email' | 'Call' | 'Meeting' | 'Note' | 'Task' | 'Demo' | 'Follow-up';
export type ActivityOutcome = 'Completed' | 'Pending' | 'Cancelled' | 'No-show';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'To Do' | 'In Progress' | 'Completed';
export type EmailTemplateCategory = 'Follow-up' | 'Introduction' | 'Proposal' | 'Thank You' | 'Re-engagement' | 'Custom';

export interface Company {
  id: number;
  name: string;
  domain?: string;
  industry?: Industry;
  size?: CompanySize;
  revenue?: string;
  location?: string;
  website?: string;
  linkedinUrl?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  companyId?: number;
  company?: Company;
  leadSource?: LeadSource;
  leadStatus?: LeadStatus;
  leadScore: number;
  tags: string[];
  address?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  website?: string;
  notes?: string;
  lastContacted?: string;
  owner: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: number;
  name: string;
  value: number;
  currency: string;
  stage: DealStage;
  probability?: number;
  contactId?: number;
  contact?: Contact;
  companyId?: number;
  company?: Company;
  expectedCloseDate?: string;
  actualCloseDate?: string;
  lossReason?: string;
  priority: DealPriority;
  notes?: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: number;
  type: ActivityType;
  title: string;
  description?: string;
  contactId?: number;
  contact?: Contact;
  dealId?: number;
  deal?: Deal;
  date: string;
  durationMinutes?: number;
  outcome?: ActivityOutcome;
  nextSteps?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority: TaskPriority;
  status: TaskStatus;
  contactId?: number;
  contact?: Contact;
  dealId?: number;
  deal?: Deal;
  aiGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmailTemplate {
  id: number;
  name?: string;
  subject?: string;
  body?: string;
  category?: EmailTemplateCategory;
  aiGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Email {
  id: number;
  sender: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  contactId?: number;
  summary?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  activeDeals: number;
  newLeads: number;
  conversionRate: number;
  pipelineValue: number;
}