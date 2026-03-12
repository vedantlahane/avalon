import { Contact, Company, Deal, Email, Task, Activity, Notification } from './models';

// Reference Date: Thursday, March 12, 2026
const NOW = new Date('2026-03-12T09:00:00Z');
const daysAgo = (days: number) => new Date(NOW.getTime() - days * 86400000).toISOString();
const hoursAgo = (hours: number) => new Date(NOW.getTime() - hours * 3600000).toISOString();
const futureDays = (days: number) => new Date(NOW.getTime() + days * 86400000).toISOString();

export const MOCK_COMPANIES: Company[] = [
  { id: "1", name: 'Acme Technologies', industry: 'Technology', size: '501-1000', revenue: '$50M-$100M', website: 'https://acme-tech.com', healthScore: 88, contactCount: 2, dealCount: 2, totalValue: 150000, createdAt: daysAgo(120) },
  { id: "2", name: 'Quantum Finance', industry: 'Finance', size: '1000+', revenue: '$100M-$500M', website: 'https://quantumfinance.com', healthScore: 45, contactCount: 2, dealCount: 2, totalValue: 135000, createdAt: daysAgo(90) },
  { id: "3", name: 'CloudNine Solutions', industry: 'Technology', size: '201-500', revenue: '$1M-$5M', website: 'https://cloudnine.io', healthScore: 75, contactCount: 2, dealCount: 1, totalValue: 45000, createdAt: daysAgo(45) },
  { id: "4", name: 'GreenLeaf Energy', industry: 'Energy', size: '51-200', revenue: '$20M-$50M', website: 'https://greenleaf.energy', healthScore: 92, contactCount: 2, dealCount: 1, totalValue: 95000, createdAt: daysAgo(180) },
  { id: "5", name: 'Beta Inc', industry: 'Other', size: '11-50', revenue: '$1M-$5M', website: 'https://beta.inc', healthScore: 55, contactCount: 1, dealCount: 1, totalValue: 55000, createdAt: daysAgo(60) },
];

export const MOCK_CONTACTS: Contact[] = [
  { id: "1", firstName: 'John', lastName: 'Smith', email: 'john.smith@acme-tech.com', phone: '+1 415 555 0101', company: 'Acme Technologies', companyId: "1", title: 'VP Engineering', leadScore: 88, leadStatus: 'qualified', source: 'referral', lastContacted: daysAgo(7), createdAt: daysAgo(45), tags: ['Champion', 'Technical'] },
  { id: "2", firstName: 'Sarah', lastName: 'Chen', email: 'sarah.chen@quantumfinance.com', phone: '+1 212 555 0202', company: 'Quantum Finance', companyId: "2", title: 'CFO', leadScore: 58, leadStatus: 'contacted', source: 'linkedin', lastContacted: hoursAgo(5), createdAt: daysAgo(30), tags: ['Decision Maker', 'High Value'] },
  { id: "3", firstName: 'Mike', lastName: 'Ross', email: 'mross@cloudnine.io', phone: '+1 206 555 0303', company: 'CloudNine Solutions', companyId: "3", title: 'Head of Product', leadScore: 78, leadStatus: 'qualified', source: 'website', lastContacted: daysAgo(1), createdAt: daysAgo(14), tags: ['Product Focused'] },
  { id: "4", firstName: 'Lisa', lastName: 'Park', email: 'l.park@greenleaf.energy', phone: '+1 303 555 0404', company: 'GreenLeaf Energy', companyId: "4", title: 'Ops Director', leadScore: 95, leadStatus: 'qualified', source: 'event', lastContacted: daysAgo(2), createdAt: daysAgo(60), tags: ['Customer', 'Happy'] },
  { id: "5", firstName: 'David', lastName: 'Kim', email: 'david.kim@acme-tech.com', phone: '+1 415 555 0505', company: 'Acme Technologies', companyId: "1", title: 'VP Engineering', leadScore: 88, leadStatus: 'qualified', source: 'referral', lastContacted: daysAgo(8), createdAt: daysAgo(20), tags: ['Technical'] },
];

export const MOCK_DEALS: Deal[] = [
  { id: "1", title: 'Acme Technologies - Enterprise Plan', value: 120000, stage: 'proposal', probability: 72, contactId: "1", contactName: 'John Smith', company: 'Acme Tech', companyId: "1", expectedCloseDate: '2026-03-15', createdAt: daysAgo(30), lastActivity: daysAgo(7), daysInStage: 12, tags: ['enterprise', 'high-value'] },
  { id: "2", title: 'Quantum Finance - Platform License', value: 80000, stage: 'negotiation', probability: 45, contactId: "2", contactName: 'Sarah Chen', company: 'Quantum Finance', companyId: "2", expectedCloseDate: '2026-03-30', createdAt: daysAgo(45), lastActivity: hoursAgo(5), daysInStage: 15, tags: ['risk-analytics'], aiRiskScore: 45, aiInsight: "Competitor mention detected" },
  { id: "3", title: 'CloudNine Solutions - Integration Package', value: 45000, stage: 'discovery', probability: 55, contactId: "3", contactName: 'Mike Ross', company: 'CloudNine', companyId: "3", expectedCloseDate: '2026-04-15', createdAt: daysAgo(14), lastActivity: daysAgo(1), daysInStage: 5, tags: ['migration'] },
  { id: "4", title: 'GreenLeaf Energy - Core Implementation', value: 95000, stage: 'closed-won', probability: 100, contactId: "4", contactName: 'Maria Garcia', company: 'GreenLeaf', companyId: "4", expectedCloseDate: '2026-02-26', createdAt: daysAgo(60), lastActivity: daysAgo(14), daysInStage: 45, tags: ['sustainability'] },
];

export const MOCK_TASKS: Task[] = [
  { id: "1", title: 'Prepare CloudNine demo', status: 'todo', priority: 'high', dueDate: futureDays(2), contactId: "3", contactName: "Mike Ross", dealId: "3", isAiSuggested: false, createdAt: NOW.toISOString() },
  { id: "2", title: 'Follow up Acme deal', status: 'todo', priority: 'high', dueDate: NOW.toISOString(), contactId: "1", contactName: "John Smith", dealId: "1", isAiSuggested: true, createdAt: NOW.toISOString() },
  { id: "4", title: 'Call Sarah Chen (URGENT pricing issue)', status: 'todo', priority: 'urgent', dueDate: hoursAgo(-1), contactId: "2", contactName: "Sarah Chen", dealId: "2", isAiSuggested: true, createdAt: NOW.toISOString() },
];

export const MOCK_EMAILS: Email[] = [
  { id: "1", from: 'john.smith@acme-tech.com', fromName: 'John Smith', to: 'me@nexuscrm.ai', subject: 'Re: Enterprise Plan Proposal', body: 'Excited to move forward with the implementation. Can we schedule a kickoff next week?', date: hoursAgo(2), read: false, sentiment: 'positive', threadId: 't1' },
  { id: "2", from: 'sarah.chen@quantumfinance.com', fromName: 'Sarah Chen', to: 'me@nexuscrm.ai', subject: 'Pricing Concerns', body: "We've received a competitive offer from Salesforce that's 30% lower. Need to discuss.", date: hoursAgo(5), read: false, sentiment: 'urgent', threadId: 't2' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "1", type: 'ai-insight', title: 'URGENT: Deal at Risk', message: 'Sarah Chen (Quantum Finance) expressed negative sentiment regarding pricing.', read: false, createdAt: hoursAgo(4.5), actionUrl: '/deals/2' },
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "1",
    type: 'meeting',
    title: 'Product Demo - Acme',
    description: 'Great demo with John Smith and technical team. 72% probability for closing.',
    contactId: "1",
    contactName: "John Smith",
    dealId: "1",
    date: daysAgo(14),
  },
];

export const mockAutomations = [
  {
    id: "1",
    name: 'At-Risk Deal Alert',
    description: 'Alert when a deal has no activity for 7 days',
    status: 'Active',
    trigger: { type: 'AI Detects Risk', config: { riskType: 'Inactivity' } },
    conditions: [{ field: 'lastActivityDays', operator: 'greater than', value: '7' }],
    actions: [
      { id: '1', type: 'Send Notification', config: { message: 'AI: Deal at risk' } },
      { id: '2', type: 'Create Task', config: { title: 'Follow up', priority: 'Urgent' } }
    ],
    triggeredCount: 8,
    lastRun: hoursAgo(1),
    createdAt: daysAgo(30),
    updatedAt: daysAgo(30)
  }
];

export const REVENUE_DATA = [
  { name: 'Jan', actual: 58000, prevValue: 61000 },
  { name: 'Feb', actual: 95000, prevValue: 58000 },
  { name: 'Mar', actual: 142000, target: 150000, prevValue: 95000 },
  { name: 'Apr', predicted: 165000, confidenceRange: [150000, 180000], target: 150000, prevValue: 142000 },
  { name: 'May', predicted: 180000, confidenceRange: [160000, 200000], target: 150000, prevValue: 165000 },
];

export const FUNNEL_DATA = [
  { name: 'Lead', value: 100, count: 100, color: '#6366f1' },
  { name: 'Qualified', value: 65, count: 65, color: '#8b5cf6' },
  { name: 'Discovery', value: 40, count: 40, color: '#a855f7' },
  { name: 'Proposal', value: 25, count: 25, color: '#d946ef' },
  { name: 'Negotiation', value: 15, count: 15, color: '#ec4899' },
  { name: 'Won', value: 8, count: 8, color: '#10b981' },
];

export const LEAD_SCORE_DATA = [
  { name: 'Hot', value: 12, color: '#ef4444', range: '90-100', icon: '🔥' },
  { name: 'Warm', value: 35, color: '#f59e0b', range: '70-89', icon: '🌡️' },
  { name: 'Cool', value: 29, color: '#6366f1', range: '50-69', icon: '😐' },
  { name: 'Cold', value: 24, color: '#94a3b8', range: '0-49', icon: '❄️' },
];

export const PIPELINE_STAGE_DATA = [
  { name: 'Lead', value: 165000, count: 2, color: '#94a3b8' },
  { name: 'Qualified', value: 35000, count: 2, color: '#6366f1' },
  { name: 'Discovery', value: 110000, count: 2, color: '#8b5cf6' },
  { name: 'Proposal', value: 175000, count: 2, color: '#a855f7' },
  { name: 'Negotiation', value: 80000, count: 1, color: '#ec4899' },
  { name: 'Won', value: 95000, count: 1, color: '#10b981' },
  { name: 'Lost', value: 45000, count: 1, color: '#ef4444' },
];

export const ACTIVITY_DATA = [
  { name: 'W1', emails: 15, calls: 8, meetings: 4, demos: 2 },
  { name: 'W2', emails: 22, calls: 12, meetings: 5, demos: 3 },
  { name: 'W3', emails: 18, calls: 15, meetings: 8, demos: 4 },
  { name: 'W4', emails: 25, calls: 10, meetings: 6, demos: 2 },
  { name: 'W5', emails: 20, calls: 14, meetings: 10, demos: 5 },
];

export const PIPELINE_COVERAGE = {
  current: 2.4,
  target: 3.0,
  recommendation: 'Add $180K to pipeline to reach healthy 3x coverage'
};