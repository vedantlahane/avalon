import { Contact, Company, Deal, Email, Task, Activity, EmailTemplate, Notification, Automation } from '../types';

// Reference Date: Thursday, March 12, 2026
const NOW = new Date('2026-03-12T09:00:00Z');
const daysAgo = (days: number) => new Date(NOW.getTime() - days * 86400000).toISOString();
const hoursAgo = (hours: number) => new Date(NOW.getTime() - hours * 3600000).toISOString();
const futureDays = (days: number) => new Date(NOW.getTime() + days * 86400000).toISOString();

export const MOCK_COMPANIES: Company[] = [
  {
    id: 1, 
    name: 'Acme Technologies', 
    industry: 'Technology', 
    website: 'https://acme-tech.com',
    domain: 'acme-tech.com',
    size: '501-1000',
    location: 'San Francisco, CA',
    createdAt: daysAgo(120),
    updatedAt: daysAgo(2)
  },
  {
    id: 2, 
    name: 'Quantum Finance', 
    industry: 'Finance', 
    website: 'https://quantumfinance.com',
    domain: 'quantumfinance.com',
    size: '1000+',
    location: 'New York, NY',
    createdAt: daysAgo(90),
    updatedAt: hoursAgo(5)
  },
  {
    id: 3, 
    name: 'CloudNine Solutions', 
    industry: 'Technology', 
    website: 'https://cloudnine.io',
    domain: 'cloudnine.io',
    size: '201-500',
    location: 'Seattle, WA',
    createdAt: daysAgo(45),
    updatedAt: daysAgo(1)
  },
  {
    id: 4, 
    name: 'GreenLeaf Energy', 
    industry: 'Other', 
    website: 'https://greenleaf.energy',
    domain: 'greenleaf.energy',
    size: '51-200',
    location: 'Denver, CO',
    createdAt: daysAgo(180),
    updatedAt: daysAgo(14)
  },
  {
    id: 5, 
    name: 'Beta Inc', 
    industry: 'Other', 
    website: 'https://beta.inc',
    domain: 'beta.inc',
    size: '11-50',
    location: 'Austin, TX',
    createdAt: daysAgo(60),
    updatedAt: daysAgo(14)
  },
  {
    id: 6, 
    name: 'Global Logistics', 
    industry: 'Other', 
    website: 'https://globallogistics.com',
    domain: 'globallogistics.com',
    size: '1000+',
    location: 'Chicago, IL',
    createdAt: daysAgo(200),
    updatedAt: daysAgo(30)
  },
  {
    id: 7, 
    name: 'EduStream', 
    industry: 'Education', 
    website: 'https://edustream.edu',
    domain: 'edustream.edu',
    size: '51-200',
    location: 'Boston, MA',
    createdAt: daysAgo(30),
    updatedAt: daysAgo(5)
  },
  {
    id: 8, 
    name: 'HealthSync', 
    industry: 'Healthcare', 
    website: 'https://healthsync.io',
    domain: 'healthsync.io',
    size: '201-500',
    location: 'San Diego, CA',
    createdAt: daysAgo(15),
    updatedAt: daysAgo(1)
  }
];

export const MOCK_CONTACTS: Contact[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@acme-tech.com',
    phone: '+1 415 555 0101',
    jobTitle: 'VP Engineering',
    companyId: 1,
    company: MOCK_COMPANIES[0],
    leadStatus: 'Qualified',
    leadSource: 'Referral',
    leadScore: 88, demographicScore: 40, behavioralScore: 48, scoreTrend: 5,
    tags: ['Champion', 'Technical'],
    owner: 'Me',
    lastContacted: daysAgo(7),
    createdAt: daysAgo(45),
    updatedAt: daysAgo(7)
  },
  {
    id: 2,
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@quantumfinance.com',
    phone: '+1 212 555 0202',
    jobTitle: 'CFO',
    companyId: 2,
    company: MOCK_COMPANIES[1],
    leadStatus: 'Contacted',
    leadSource: 'LinkedIn',
    leadScore: 58, demographicScore: 35, behavioralScore: 23, scoreTrend: -15,
    tags: ['Decision Maker', 'High Value'],
    owner: 'Me',
    lastContacted: hoursAgo(5),
    createdAt: daysAgo(30),
    updatedAt: hoursAgo(5)
  },
  {
    id: 3,
    firstName: 'Mike',
    lastName: 'Ross',
    email: 'mross@cloudnine.io',
    phone: '+1 206 555 0303',
    jobTitle: 'Head of Product',
    companyId: 3,
    company: MOCK_COMPANIES[2],
    leadStatus: 'Qualified',
    leadSource: 'Website',
    leadScore: 78, demographicScore: 38, behavioralScore: 40, scoreTrend: 12,
    tags: ['Product Focused'],
    owner: 'Me',
    lastContacted: daysAgo(1),
    createdAt: daysAgo(14),
    updatedAt: daysAgo(1)
  },
  {
    id: 4,
    firstName: 'Lisa',
    lastName: 'Park',
    email: 'l.park@greenleaf.energy',
    phone: '+1 303 555 0404',
    jobTitle: 'Ops Director',
    companyId: 4,
    company: MOCK_COMPANIES[3],
    leadStatus: 'Qualified',
    leadSource: 'Event',
    leadScore: 95, demographicScore: 40, behavioralScore: 55, scoreTrend: 2,
    tags: ['Customer', 'Happy'],
    owner: 'Me',
    lastContacted: daysAgo(2),
    createdAt: daysAgo(60),
    updatedAt: daysAgo(2)
  },
  {
    id: 5,
    firstName: 'Kevin',
    lastName: 'Baker',
    email: 'kbaker@beta.inc',
    phone: '+1 512 555 0505',
    jobTitle: 'Founder',
    companyId: 5,
    company: MOCK_COMPANIES[4],
    leadStatus: 'Contacted',
    leadSource: 'Cold Outreach',
    leadScore: 42, demographicScore: 30, behavioralScore: 12, scoreTrend: -8,
    tags: ['SMB'],
    owner: 'Me',
    lastContacted: daysAgo(14),
    createdAt: daysAgo(30),
    updatedAt: daysAgo(14)
  },
  {
    id: 6,
    firstName: 'Robert',
    lastName: 'Ford',
    email: 'rford@globallogistics.com',
    phone: '+1 312 555 0606',
    jobTitle: 'Logistics Head',
    companyId: 6,
    company: MOCK_COMPANIES[5],
    leadStatus: 'Nurturing',
    leadSource: 'Website',
    leadScore: 65, demographicScore: 40, behavioralScore: 25, scoreTrend: 0,
    tags: ['Enterprise'],
    owner: 'Me',
    lastContacted: daysAgo(20),
    createdAt: daysAgo(100),
    updatedAt: daysAgo(20)
  },
  {
    id: 7,
    firstName: 'Alice',
    lastName: 'Wong',
    email: 'alice.w@edustream.edu',
    phone: '+1 617 555 0707',
    jobTitle: 'Dean of Technology',
    companyId: 7,
    company: MOCK_COMPANIES[6],
    leadStatus: 'New',
    leadSource: 'LinkedIn',
    leadScore: 72, demographicScore: 35, behavioralScore: 37, scoreTrend: 10,
    tags: ['Academic'],
    owner: 'Me',
    lastContacted: daysAgo(5),
    createdAt: daysAgo(10),
    updatedAt: daysAgo(5)
  },
  {
    id: 8,
    firstName: 'David',
    lastName: 'Miller',
    email: 'dmiller@healthsync.io',
    phone: '+1 619 555 0808',
    jobTitle: 'Security Officer',
    companyId: 8,
    company: MOCK_COMPANIES[7],
    leadStatus: 'Qualified',
    leadSource: 'Referral',
    leadScore: 81, demographicScore: 38, behavioralScore: 43, scoreTrend: 4,
    tags: ['Technical', 'Security'],
    owner: 'Me',
    lastContacted: daysAgo(1),
    createdAt: daysAgo(15),
    updatedAt: daysAgo(1)
  },
  { id: 9, firstName: 'Susan', lastName: 'Ivory', email: 's.ivory@acme-tech.com', phone: '+1 415 555 0909', jobTitle: 'HR Manager', companyId: 1, company: MOCK_COMPANIES[0], leadStatus: 'New', leadSource: 'Website', leadScore: 45, demographicScore: 25, behavioralScore: 20, scoreTrend: 0, tags: [], owner: 'Me', createdAt: daysAgo(5), updatedAt: daysAgo(5) },
  { id: 10, firstName: 'Thomas', lastName: 'Shelby', email: 'tshelby@quantumfinance.com', phone: '+1 212 555 1010', jobTitle: 'Managing Director', companyId: 2, company: MOCK_COMPANIES[1], leadStatus: 'Contacted', leadSource: 'Referral', leadScore: 68, demographicScore: 40, behavioralScore: 28, scoreTrend: 0, tags: ['Decision Maker'], owner: 'Me', createdAt: daysAgo(12), updatedAt: daysAgo(12) },
  { id: 11, firstName: 'Arthur', lastName: 'Morgan', email: 'amorgan@beta.inc', phone: '+1 512 555 1111', jobTitle: 'Ops Lead', companyId: 5, company: MOCK_COMPANIES[4], leadStatus: 'Qualified', leadSource: 'Website', leadScore: 75, demographicScore: 30, behavioralScore: 45, scoreTrend: 8, tags: [], owner: 'Me', createdAt: daysAgo(8), updatedAt: daysAgo(8) },
  { id: 12, firstName: 'John', lastName: 'Marston', email: 'jmarston@globallogistics.com', phone: '+1 312 555 1212', jobTitle: 'Fleet Manager', companyId: 6, company: MOCK_COMPANIES[5], leadStatus: 'Contacted', leadSource: 'Cold Outreach', leadScore: 38, demographicScore: 35, behavioralScore: 3, scoreTrend: 0, tags: [], owner: 'Me', createdAt: daysAgo(25), updatedAt: daysAgo(25) },
  { id: 13, firstName: 'Sadie', lastName: 'Adler', email: 'sadler@cloudnine.io', phone: '+1 206 555 1313', jobTitle: 'DevOps Eng', companyId: 3, company: MOCK_COMPANIES[2], leadStatus: 'New', leadSource: 'Website', leadScore: 55, demographicScore: 35, behavioralScore: 20, scoreTrend: 0, tags: ['Technical'], owner: 'Me', createdAt: daysAgo(3), updatedAt: daysAgo(3) },
  { id: 14, firstName: 'Charles', lastName: 'Smith', email: 'csmith@healthsync.io', phone: '+1 619 555 1414', jobTitle: 'CTO', companyId: 8, company: MOCK_COMPANIES[7], leadStatus: 'Qualified', leadSource: 'LinkedIn', leadScore: 89, demographicScore: 40, behavioralScore: 49, scoreTrend: 15, tags: ['Decision Maker'], owner: 'Me', createdAt: daysAgo(20), updatedAt: daysAgo(20) },
  { id: 15, firstName: 'Dutch', lastName: 'Van', email: 'dvan@edustream.edu', phone: '+1 617 555 1515', jobTitle: 'Professor', companyId: 7, company: MOCK_COMPANIES[6], leadStatus: 'New', leadSource: 'Event', leadScore: 32, demographicScore: 20, behavioralScore: 12, scoreTrend: 0, tags: [], owner: 'Me', createdAt: daysAgo(2), updatedAt: daysAgo(2) },
];

export const MOCK_DEALS: Deal[] = [
  {
    id: 1,
    name: 'Acme Technologies - Enterprise Plan',
    value: 120000,
    currency: 'USD',
    stage: 'Proposal',
    probability: 72,
    contactId: 1,
    contact: MOCK_CONTACTS[0],
    companyId: 1,
    company: MOCK_COMPANIES[0],
    expectedCloseDate: '2026-03-15',
    priority: 'Critical',
    competitors: ['Competitor X'],
    owner: 'Me',
    notes: 'John Smith is the champion. Great demo 2 weeks ago. CTO review needed before final sign-off.',
    createdAt: daysAgo(30),
    updatedAt: daysAgo(7),
    lineItems: [
      { id: 1, dealId: 1, productName: 'Nexus CRM SaaS License', quantity: 1, unitPrice: 100000, total: 100000, createdAt: daysAgo(30), updatedAt: daysAgo(30) },
      { id: 2, dealId: 1, productName: 'Onboarding & Setup', quantity: 1, unitPrice: 20000, total: 20000, createdAt: daysAgo(30), updatedAt: daysAgo(30) }
    ]
  },
  {
    id: 2,
    name: 'Quantum Finance - Platform License',
    value: 80000,
    currency: 'USD',
    stage: 'Negotiation',
    probability: 45,
    contactId: 2,
    contact: MOCK_CONTACTS[1],
    companyId: 2,
    company: MOCK_COMPANIES[1],
    expectedCloseDate: '2026-03-30',
    priority: 'High',
    competitors: ['CompetitorX'],
    owner: 'Me',
    notes: 'URGENT: Sarah Chen sent a frustrated email about pricing. Sentiment declining. Competition mention: CompetitorX.',
    createdAt: daysAgo(45),
    updatedAt: hoursAgo(5),
  },
  {
    id: 3,
    name: 'CloudNine Solutions - Integration Package',
    value: 45000,
    currency: 'USD',
    stage: 'Discovery',
    probability: 55,
    contactId: 3,
    contact: MOCK_CONTACTS[2],
    companyId: 3,
    company: MOCK_COMPANIES[2],
    expectedCloseDate: '2026-04-15',
    priority: 'Medium',
    competitors: [],
    owner: 'Me',
    notes: 'Demo scheduled for Wednesday Mar 18. Positive initial conversations with Mike Ross.',
    createdAt: daysAgo(14),
    updatedAt: daysAgo(1),
  },
  {
    id: 4,
    name: 'GreenLeaf Energy - Core Implementation',
    value: 95000,
    currency: 'USD',
    stage: 'Closed Won',
    probability: 100,
    contactId: 4,
    contact: MOCK_CONTACTS[3],
    companyId: 4,
    company: MOCK_COMPANIES[3],
    expectedCloseDate: '2026-02-26',
    actualCloseDate: '2026-02-26',
    priority: 'High',
    competitors: [],
    owner: 'Me',
    notes: 'Won 2 weeks ago. AI detected upsell potential for Marketing Module.',
    createdAt: daysAgo(60),
    updatedAt: daysAgo(14),
  },
  {
    id: 5,
    name: 'Beta Inc Growth Deal',
    value: 55000,
    currency: 'USD',
    stage: 'Proposal',
    probability: 38,
    contactId: 5,
    contact: MOCK_CONTACTS[4],
    companyId: 5,
    company: MOCK_COMPANIES[4],
    expectedCloseDate: '2026-04-05',
    priority: 'High',
    competitors: [],
    owner: 'Me',
    notes: 'Stalled deal. Proposal sent 14 days ago. Contact Kevin went silent. AI flagged as at-risk.',
    createdAt: daysAgo(30),
    updatedAt: daysAgo(14),
  },
  {
    id: 6,
    name: 'Global Logistics - Expansion',
    value: 150000,
    currency: 'USD',
    stage: 'Lead',
    probability: 10,
    contactId: 6,
    contact: MOCK_CONTACTS[5],
    companyId: 6,
    company: MOCK_COMPANIES[5],
    expectedCloseDate: '2026-06-01',
    priority: 'Low',
    competitors: [],
    owner: 'Me',
    createdAt: daysAgo(20),
    updatedAt: daysAgo(20),
  },
  { id: 7, name: 'EduStream - LMS Sync', value: 25000, currency: 'USD', stage: 'Qualified', probability: 30, contactId: 7, contact: MOCK_CONTACTS[6], companyId: 7, company: MOCK_COMPANIES[6], expectedCloseDate: '2026-05-15', priority: 'Medium', competitors: [], owner: 'Me', createdAt: daysAgo(10), updatedAt: daysAgo(10) },
  { id: 8, name: 'HealthSync - Security Bundle', value: 65000, currency: 'USD', stage: 'Discovery', probability: 40, contactId: 8, contact: MOCK_CONTACTS[7], companyId: 8, company: MOCK_COMPANIES[7], expectedCloseDate: '2026-05-20', priority: 'High', competitors: [], owner: 'Me', createdAt: daysAgo(5), updatedAt: daysAgo(5) },
  { id: 9, name: 'Acme - HR Module', value: 15000, currency: 'USD', stage: 'Lead', probability: 5, contactId: 9, contact: MOCK_CONTACTS[8], companyId: 1, company: MOCK_COMPANIES[0], expectedCloseDate: '2026-07-01', priority: 'Low', competitors: [], owner: 'Me', createdAt: daysAgo(2), updatedAt: daysAgo(2) },
  { id: 10, name: 'HealthSync - Pilot Program', value: 10000, currency: 'USD', stage: 'Qualified', probability: 25, contactId: 14, contact: MOCK_CONTACTS[13], companyId: 8, company: MOCK_COMPANIES[7], expectedCloseDate: '2026-04-10', priority: 'Medium', competitors: [], owner: 'Me', createdAt: daysAgo(8), updatedAt: daysAgo(8) },
];

export const MOCK_EMAILS: Email[] = [
  {
    id: 1,
    sender: 'john.smith@acme-tech.com',
    senderName: 'John Smith',
    senderAvatar: 'JS',
    subject: 'Re: Enterprise Plan Proposal',
    content: `Hi there,

Thanks for sending over the proposal. We've had a chance to look it over and the implementation timeline is our main question now.

How soon can we realistically get the first team onboarded if we sign by Friday?

Also, I'd like to schedule a quick call with our CTO next week for final technical validation.

Best,
John`,
    timestamp: hoursAgo(2),
    isRead: false,
    isStarred: true,
    isAIFlagged: true,
    folder: 'Inbox',
    contactId: 1,
    dealId: 1,
    dealName: 'Acme Enterprise',
    sentiment: 'Positive',
    sentimentScore: 88,
    keyPoints: ['Inquiring about implementation timeline', 'Wants CTO review', 'Positive overall'],
    intent: 'Likely to buy, clarifying logistics',
    suggestedActions: ['Draft timeline response', 'Propose times for CTO call']
  },
  {
    id: 2,
    sender: 'sarah.chen@quantumfinance.com',
    senderName: 'Sarah Chen',
    senderAvatar: 'SC',
    subject: 'Pricing Concerns',
    content: `Hi,

I've been looking at the latest pricing sheet and honestly, it's quite a bit higher than what CompetitorX is offering for a similar feature set.

We were expecting a more competitive offer given the volume we're discussing.

Unless there's some flexibility here, I'm not sure we can move forward this month.

Regards,
Sarah`,
    timestamp: hoursAgo(5),
    isRead: false,
    isStarred: true,
    isAIFlagged: true,
    folder: 'Inbox',
    contactId: 2,
    dealId: 2,
    dealName: 'Quantum Finance',
    sentiment: 'Negative',
    sentimentScore: 32,
    keyPoints: ['Unhappy with pricing', 'Mentions CompetitorX', 'Threatens to stall/cancel'],
    intent: 'Price negotiation or churn risk',
    suggestedActions: ['Call Sarah immediately', 'Discuss discount with manager']
  },
  {
    id: 3,
    sender: 'mross@cloudnine.io',
    senderName: 'Mike Ross',
    senderAvatar: 'MR',
    subject: 'Looking forward to the demo',
    content: `Hey!

Just confirming our demo for Wednesday at 3 PM. I'll have our Head of Infrastructure joining as well.

We're particularly interested in how you handle multi-region data sync.

See you then!
Mike`,
    timestamp: daysAgo(1),
    isRead: true,
    isStarred: false,
    isAIFlagged: false,
    folder: 'Inbox',
    contactId: 3,
    dealId: 3,
    sentiment: 'Positive',
    sentimentScore: 75,
  },
  {
    id: 4,
    sender: 'me@nexuscrm.ai',
    senderName: 'Me',
    subject: 'Follow up: Marketing Module',
    content: `Hi Lisa,

Great to see the success GreenLeaf has been having with the core platform over the last two weeks!

I noticed you're starting to ramp up your outreach campaigns. Have you had a chance to look at our Marketing Module? It integrates directly with the data we're already tracking.

Happy to hop on a 10-minute call to show you how it works.

Best,
Me`,
    timestamp: daysAgo(3),
    isRead: true,
    isStarred: false,
    isAIFlagged: false,
    folder: 'Sent',
    contactId: 4,
    sentiment: 'Neutral',
  },
  {
    id: 5,
    sender: 'system@nexuscrm.ai',
    senderName: 'NexusCRM AI',
    senderAvatar: '🤖',
    subject: 'Welcome to NexusCRM AI',
    content: 'Welcome to your new intelligent CRM. We\'ve already analyzed your initial imports and flagged 3 deals that need attention.',
    timestamp: daysAgo(30),
    isRead: true,
    isStarred: false,
    isAIFlagged: false,
    folder: 'Inbox',
    sentiment: 'Positive',
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: 'Prepare CloudNine demo (Mar 18, 3PM)',
    dueDate: '2026-03-18T15:00:00Z',
    priority: 'High',
    status: 'To Do',
    contactId: 3,
    dealId: 3,
    aiGenerated: false,
    createdAt: NOW.toISOString(),
    updatedAt: NOW.toISOString()
  },
  {
    id: 2,
    title: 'Follow up Acme deal (7 days inactive)',
    dueDate: NOW.toISOString(),
    priority: 'High',
    status: 'To Do',
    contactId: 1,
    dealId: 1,
    aiGenerated: true,
    createdAt: NOW.toISOString(),
    updatedAt: NOW.toISOString()
  },
  {
    id: 3,
    title: 'Review new website leads',
    dueDate: futureDays(1),
    priority: 'Medium',
    status: 'To Do',
    aiGenerated: true,
    createdAt: NOW.toISOString(),
    updatedAt: NOW.toISOString()
  },
  {
    id: 4,
    title: 'Call Sarah Chen (URGENT pricing issue)',
    dueDate: hoursAgo(-1), // Due 1 hour from now
    priority: 'Urgent',
    status: 'To Do',
    contactId: 2,
    dealId: 2,
    aiGenerated: true,
    createdAt: NOW.toISOString(),
    updatedAt: NOW.toISOString()
  },
  {
    id: 5,
    title: 'Draft re-engagement for Beta Inc',
    dueDate: futureDays(1),
    priority: 'Medium',
    status: 'To Do',
    contactId: 5,
    dealId: 5,
    aiGenerated: true,
    createdAt: NOW.toISOString(),
    updatedAt: NOW.toISOString()
  }
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 1,
    type: 'Meeting',
    title: 'Product Demo - Acme',
    description: 'Great demo with John Smith and technical team. 72% probability for closing.',
    contactId: 1,
    dealId: 1,
    date: daysAgo(14),
    outcome: 'Completed',
    createdAt: daysAgo(14),
    updatedAt: daysAgo(14)
  },
  {
    id: 2,
    type: 'Email',
    title: 'Proposal Sent - Acme',
    description: 'Enterprise plan proposal sent to John Smith.',
    contactId: 1,
    dealId: 1,
    date: daysAgo(7),
    outcome: 'Completed',
    createdAt: daysAgo(7),
    updatedAt: daysAgo(7)
  },
  {
    id: 3,
    type: 'Email',
    title: 'Pricing Objection - Quantum',
    description: 'Sarah Chen emailed expressing frustration about pricing vs CompetitorX.',
    contactId: 2,
    dealId: 2,
    date: hoursAgo(5),
    outcome: 'Pending',
    createdAt: hoursAgo(5),
    updatedAt: hoursAgo(5)
  },
  {
    id: 4,
    type: 'Call',
    title: 'Discovery Call - CloudNine',
    description: 'Mike Ross is interested. Qualified lead. Discovery phase started.',
    contactId: 3,
    dealId: 3,
    date: daysAgo(10),
    outcome: 'Completed',
    createdAt: daysAgo(10),
    updatedAt: daysAgo(10)
  },
  {
    id: 5,
    type: 'Email',
    title: 'Contract Won - GreenLeaf',
    description: 'Lisa Park signed the $95K agreement.',
    contactId: 4,
    dealId: 4,
    date: daysAgo(14),
    outcome: 'Connected',
    createdAt: daysAgo(14),
    updatedAt: daysAgo(14)
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: 'AI',
    title: 'URGENT: Deal at Risk',
    message: 'Sarah Chen (Quantum Finance) expressed negative sentiment regarding pricing. Deal probability dropped to 45%.',
    isRead: false,
    timestamp: hoursAgo(4.5),
    actionLabel: 'View Deal',
    actionLink: '/deals/2',
    secondaryActionLabel: 'Email Sarah',
    secondaryActionLink: '/inbox?id=2',
    createdAt: hoursAgo(4.5),
    updatedAt: hoursAgo(4.5),
  },
  {
    id: 2,
    type: 'AI',
    title: 'Inactivity Alert',
    message: 'Acme Technologies deal ($120K) has been inactive for 7 days. Close date is in 3 days.',
    isRead: false,
    timestamp: hoursAgo(1),
    actionLabel: 'Follow Up',
    actionLink: '/deals/1',
    createdAt: hoursAgo(1),
    updatedAt: hoursAgo(1),
  },
  {
    id: 3,
    type: 'Deal',
    title: 'New Opportunity',
    message: 'CloudNine Solutions demo scheduled for Mar 18. High interest detected.',
    isRead: true,
    timestamp: daysAgo(1),
    actionLabel: 'View Deal',
    actionLink: '/deals/3',
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: 4,
    type: 'Task',
    title: 'Overdue Task',
    message: 'Follow up with Kevin (Beta Inc) is now overdue.',
    isRead: false,
    timestamp: hoursAgo(24),
    actionLabel: 'View Tasks',
    actionLink: '/tasks',
    createdAt: hoursAgo(24),
    updatedAt: hoursAgo(24),
  }
];

export const MOCK_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 1,
    name: 'Re-engagement: Stalled Deal',
    subject: 'Still interested in {{deal_name}}?',
    body: `Hi {{first_name}},

I wanted to circle back on our last conversation regarding {{deal_name}}. We haven't heard from you in a while and wanted to see if your priorities have shifted.

Is there anything else you need from my side to move this forward?

Best,
[Your Name]`,
    category: 'Re-engagement',
    aiGenerated: true,
    variablesCount: 2,
    usedCount: 15,
    avgOpenRate: 35,
    createdAt: daysAgo(60),
    updatedAt: daysAgo(60)
  },
  {
    id: 2,
    name: 'Pricing Objection Response',
    subject: 'Addressing your concerns about {{company_name}} pricing',
    body: `Hi {{first_name}},

I understand your concerns regarding the investment for {{deal_name}}. We value our partnership with {{company_name}} and I'd like to discuss how we can make this work.

Could we jump on a quick call this afternoon to find a solution that works for both of us?

Best,
[Your Name]`,
    category: 'Proposal',
    aiGenerated: true,
    variablesCount: 2,
    usedCount: 5,
    avgOpenRate: 92,
    createdAt: daysAgo(10),
    updatedAt: daysAgo(10)
  }
];

export const mockAutomations: Automation[] = [
  {
    id: 1,
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
  { name: 'Oct', actual: 45000, prevValue: 42000 },
  { name: 'Nov', actual: 52000, prevValue: 45000 },
  { name: 'Dec', actual: 61000, prevValue: 52000 },
  { name: 'Jan', actual: 58000, prevValue: 61000 },
  { name: 'Feb', actual: 95000, prevValue: 58000 }, // Win: GreenLeaf
  { name: 'Mar', actual: 142000, target: 150000, prevValue: 95000 }, // Current month
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
  { name: 'Proposal', value: 175000, count: 2, color: '#a855f7' }, // Acme ($120K) + Beta ($55K)
  { name: 'Negotiation', value: 80000, count: 1, color: '#ec4899' }, // Quantum ($80K)
  { name: 'Won', value: 95000, count: 1, color: '#10b981' }, // GreenLeaf ($95K)
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