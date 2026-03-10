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
  competitors: string[];
  lineItems?: LineItem[];
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface LineItem {
  id: number;
  dealId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
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
  name: string;
  subject: string;
  body: string;
  category: EmailTemplateCategory;
  aiGenerated: boolean;
  variablesCount: number;
  usedCount: number;
  avgOpenRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface Email {
  id: number;
  sender: string;
  senderName?: string;
  senderAvatar?: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  isAIFlagged: boolean;
  folder: 'Inbox' | 'Sent' | 'Drafts' | 'Starred' | 'Trash' | 'AI Generated';
  contactId?: number;
  contact?: Contact;
  dealId?: number;
  dealName?: string;
  sentiment?: 'Positive' | 'Neutral' | 'Negative' | 'Urgent';
  sentimentScore?: number;
  attachments?: { name: string; size: string; type: string }[];
  summary?: string;
  keyPoints?: string[];
  intent?: string;
  suggestedActions?: string[];
}

export interface DashboardStats {
  pipelineValue: number;
  pipelineChange: number;
  dealsWon: number;
  dealsWonChange: number;
  dealsWonTarget: number;
  winRate: number;
  winRateChange: number;
  winRateIndustry: number;
  avgDealSize: number;
  avgDealSizeChange: number;
}

export interface RevenueForecastPoint {
  month: string;
  actual: number;
  predicted: number;
  target: number;
  confidenceHigh: number;
  confidenceLow: number;
}

export interface PipelineStageStats {
  stage: DealStage;
  count: number;
  value: number;
  color: string;
}

export interface AIDailyBriefing {
  goodNews: {
    id: string;
    text: string;
    type: 'success' | 'info';
  }[];
  needsAttention: {
    id: string;
    text: string;
    type: 'warning' | 'danger';
    sentiment?: string;
  }[];
  priorities: {
    id: string;
    text: string;
    actionLabel: string;
    actionType: 'call' | 'email' | 'meeting';
    target?: string;
  }[];
}

export interface LeadScoreDistribution {
  category: 'Hot' | 'Warm' | 'Cool' | 'Cold';
  count: number;
  color: string;
  range: string;
}

export interface DashboardData {
  stats: DashboardStats;
  revenueForecast: RevenueForecastPoint[];
  pipelineByStage: PipelineStageStats[];
  aiBriefing: AIDailyBriefing;
  activities: Activity[];
  dealsAtRisk: Deal[];
  upcomingTasks: Task[];
  upcomingMeetings: Activity[];
  leadScoreDistribution: LeadScoreDistribution[];
}

export interface EnrichmentResult {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  phone?: string;
  linkedinUrl?: string;
  location?: string;
  companyName?: string;
  companyDomain?: string;
  companyIndustry?: Industry;
  companySize?: CompanySize;
  companyDescription?: string;
  leadScore?: number;
  tags?: string[];
  suggestedLeadScore?: number;
  suggestedTags?: string[];
  recentNews?: string;
  technologies?: string[];
}