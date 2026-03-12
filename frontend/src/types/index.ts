export type LeadSource = 'website' | 'linkedin' | 'referral' | 'cold-outreach' | 'event' | 'inbound' | 'Website' | 'LinkedIn' | 'Referral' | 'Cold Outreach' | 'Event' | 'Advertisement' | 'Other';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'unqualified' | 'New' | 'Contacted' | 'Qualified' | 'Unqualified' | 'Nurturing';
export type Industry = 'Technology' | 'Healthcare' | 'Finance' | 'Education' | 'Retail' | 'Manufacturing' | 'Consulting' | 'Energy' | 'Other' | 'Real Estate';
export type CompanySize = '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
export type DealStage = 'lead' | 'qualified' | 'discovery' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost' | 'Lead' | 'Qualified' | 'Discovery' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
export type DealPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type ActivityType = 'email' | 'call' | 'meeting' | 'note' | 'demo' | 'Email' | 'Call' | 'Meeting' | 'Note' | 'Task' | 'Demo' | 'Follow-up' | 'Other';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent' | 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'To Do' | 'In Progress' | 'Completed';
export type EmailTemplateCategory = 'Follow-up' | 'Introduction' | 'Proposal' | 'Thank You' | 'Re-engagement' | 'Custom';
export type ActivityOutcome = 'Completed' | 'Pending' | 'Cancelled' | 'No-show' | 'Connected' | 'Left Voicemail' | 'No Answer' | 'Busy' | 'Wrong Number';
export type NotificationType = 'AI' | 'Deal' | 'Task' | 'Email' | 'Contact' | 'System' | 'ai-insight' | 'deal-update' | 'task-due' | 'system';

export interface Company {
  id: string | number;
  name: string;
  industry: string;
  size: string;
  revenue: string;
  website: string;
  healthScore: number;
  contactCount: number;
  dealCount: number;
  totalValue: number;
  createdAt: string;
  updatedAt: string;
  logo?: string;
  domain?: string;
  location?: string;
  linkedinUrl?: string;
  description?: string;
}

export interface CompanyWithStats extends Company {
  activeDealCount: number;
  activeDealValue: number;
  wonDealCount: number;
  totalRevenue: number;
  avgDealSize: number;
}

export interface CompanyInsight {
  health: 'Strong' | 'Steady' | 'At Risk';
  keyInsights: string[];
  opportunityScore: number;
  recommendedStrategy: string;
  similarCompanies: { id: number | string; name: string }[];
}

export interface Contact {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string | Company;
  companyId: string | number;
  title: string;
  jobTitle?: string;
  leadScore: number;
  leadStatus: LeadStatus;
  source: LeadSource;
  leadSource?: LeadSource;
  lastContacted: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  avatarUrl?: string;
  tags: string[];
  owner: string;
  demographicScore: number;
  behavioralScore: number;
  scoreTrend: number;
  scoreBreakdown?: any;
  aiNote?: string;
  address?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  website?: string;
  notes?: string;
  leadCategory?: string;
}

export interface LeadScoreHistory {
  id: number | string;
  contactId: number | string;
  score: number;
  change: number;
  reason: string;
  timestamp: string;
}

export interface Deal {
  id: string | number;
  title: string;
  name: string;
  company: string | Company;
  companyId: string | number;
  contactId: string | number;
  contactName: string;
  contact?: Contact;
  value: number;
  currency: string;
  stage: DealStage;
  probability: number;
  expectedCloseDate: string;
  actualCloseDate?: string;
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  daysInStage: number;
  tags: string[];
  priority: DealPriority;
  competitors: string[];
  owner: string;
  notes?: string;
  aiRiskScore?: number;
  aiInsight?: string;
  lineItems?: LineItem[];
}

export interface LineItem {
  id: number | string;
  dealId: number | string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string | number;
  type: ActivityType;
  title: string;
  description: string;
  contactId: string | number;
  contactName: string;
  contact?: Contact;
  dealId?: string | number;
  deal?: Deal;
  date: string;
  sentiment?: "positive" | "negative" | "neutral" | "urgent" | "Positive" | "Neutral" | "Negative" | "Cautious";
  aiSummary?: string;
  outcome?: ActivityOutcome;
  durationMinutes?: number;
  nextSteps?: string;
  metadata?: any;
  keyPoints?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string | number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  contactId?: string | number;
  contactName?: string;
  contact?: Contact;
  dealId?: string | number;
  dealTitle?: string;
  deal?: Deal;
  isAiSuggested: boolean;
  aiGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Email {
  id: string | number;
  from: string;
  fromName: string;
  to: string;
  subject: string;
  body: string;
  content: string;
  sender: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: string;
  date: string;
  read: boolean;
  isRead: boolean;
  sentiment: "positive" | "negative" | "neutral" | "urgent" | "Positive" | "Neutral" | "Negative" | "Urgent";
  contactId?: string | number;
  contact?: Contact;
  dealId?: string | number;
  dealName?: string;
  threadId: string;
  aiSummary?: string;
  summary?: string;
  isStarred: boolean;
  isAIFlagged: boolean;
  folder: string;
  sentimentScore?: number;
  attachments?: any[];
  keyPoints?: string[];
  intent?: string;
  suggestedActions?: string[];
}

export interface Notification {
  id: string | number;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  timestamp: string;
  actionUrl?: string;
  link?: string;
  actionLabel?: string;
  actionLink?: string;
  secondaryActionLabel?: string;
  secondaryActionLink?: string;
  metadata?: any;
}

export interface EmailTemplate {
  id: number | string;
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

export interface Automation {
  id: number | string;
  name: string;
  description?: string;
  status: string;
  trigger: any;
  conditions: any[];
  actions: any[];
  triggeredCount: number;
  lastRun?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  company?: string;
  isOnboarded: boolean;
  role?: string;
  teamSize?: string;
  revenueTarget?: number;
}

export interface DashboardStats {
  pipelineValue: number;
  pipelineChange: number;
  dealsWon: number;
  dealsWonValue?: number;
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
  goodNews: { id: string; text: string; type: 'success' | 'info' }[];
  needsAttention: { id: string; text: string; type: 'warning' | 'danger'; sentiment?: string }[];
  priorities: { id: string; text: string; actionLabel: string; actionType: 'call' | 'email' | 'meeting'; target?: string }[];
}

export interface LeadScoreDistribution {
  category: 'Hot' | 'Warm' | 'Cool' | 'Cold';
  count: number;
  color: string;
  range: string;
}

export interface LeaderboardRep {
  id: number | string;
  rank: number;
  name: string;
  revenue: number;
  dealsWon: number;
  target: number;
  isCurrentUser?: boolean;
  status: 'success' | 'warning' | 'info';
}

export interface SalesLeaderboard {
  title: string;
  period: 'This Week' | 'This Month' | 'This Quarter' | 'All Time';
  reps: LeaderboardRep[];
  achievements: any[];
  aiCoaching: string;
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
  salesLeaderboard: SalesLeaderboard;
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
