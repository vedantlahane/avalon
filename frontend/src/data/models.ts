export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  companyId: string;
  title: string;
  leadScore: number; // 0-100
  leadStatus: "new" | "contacted" | "qualified" | "unqualified";
  source: "website" | "referral" | "linkedin" | "cold-outreach" | "event" | "inbound";
  lastContacted: string; // ISO date
  createdAt: string;
  avatar?: string;
  tags: string[];
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string; // e.g. "50-200"
  revenue: string; // e.g. "$10M-$50M"
  website: string;
  healthScore: number; // 0-100
  contactCount: number;
  dealCount: number;
  totalValue: number;
  createdAt: string;
  logo?: string;
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  companyId: string;
  contactId: string;
  contactName: string;
  value: number;
  stage: "lead" | "qualified" | "discovery" | "proposal" | "negotiation" | "closed-won" | "closed-lost";
  probability: number; // 0-100
  expectedCloseDate: string;
  createdAt: string;
  lastActivity: string;
  daysInStage: number;
  tags: string[];
  aiRiskScore?: number; // 0-100, higher = more risk
  aiInsight?: string;
}

export interface Activity {
  id: string;
  type: "email" | "call" | "meeting" | "demo" | "note";
  title: string;
  description: string;
  contactId: string;
  contactName: string;
  dealId?: string;
  date: string;
  sentiment?: "positive" | "negative" | "neutral" | "urgent";
  aiSummary?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
  contactId?: string;
  contactName?: string;
  dealId?: string;
  dealTitle?: string;
  isAiSuggested: boolean;
  createdAt: string;
}

export interface Email {
  id: string;
  from: string;
  fromName: string;
  to: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
  sentiment: "positive" | "negative" | "neutral" | "urgent";
  contactId?: string;
  threadId: string;
  aiSummary?: string;
}

export interface Notification {
  id: string;
  type: "ai-insight" | "deal-update" | "task-due" | "email" | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}
