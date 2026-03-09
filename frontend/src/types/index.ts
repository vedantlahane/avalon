export type ContactStatus = 'lead' | 'customer' | 'prospect';

export interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
  logo?: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  companyId: string;
  company?: Company;
  status: ContactStatus;
  score: number;
  lastInteraction?: string;
  sentimentScore: number;
  avatar?: string;
}

export type DealStage = 'discovery' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  contactId: string;
  contact?: Contact;
  companyId: string;
  company?: Company;
  closeDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Email {
  id: string;
  sender: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  contactId?: string;
  summary?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  isCompleted: boolean;
  contactId?: string;
  dealId?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface DashboardStats {
  totalRevenue: number;
  activeDeals: number;
  newLeads: number;
  conversionRate: number;
  pipelineValue: number;
}
