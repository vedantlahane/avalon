import { Contact, Company, Deal, Email, Task, Activity, EmailTemplate } from '../types';

export const MOCK_COMPANIES: Company[] = [
  {
    id: 1, 
    name: 'Acme Corp', 
    industry: 'Technology', 
    website: 'https://acme.com',
    domain: 'acme.com',
    size: '501-1000',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2, 
    name: 'Stellar Solutions', 
    industry: 'Consulting', 
    website: 'https://stellar.io',
    domain: 'stellar.io',
    size: '51-200',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3, 
    name: 'Nebula Ventures', 
    industry: 'Finance', 
    website: 'https://nebula.vc',
    domain: 'nebula.vc',
    size: '11-50',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

export const MOCK_CONTACTS: Contact[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@acme.com',
    phone: '+1 234 567 890',
    jobTitle: 'CTO',
    companyId: 1,
    company: MOCK_COMPANIES[0],
    leadStatus: 'Qualified',
    leadSource: 'LinkedIn',
    leadScore: 85,
    tags: ['priority', 'tech'],
    owner: 'Me',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@stellar.io',
    phone: '+1 987 654 321',
    jobTitle: 'VP of Sales',
    companyId: 2,
    company: MOCK_COMPANIES[1],
    leadStatus: 'New',
    leadSource: 'Referral',
    leadScore: 45,
    tags: ['sales'],
    owner: 'Me',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@nebula.vc',
    phone: '+1 555 012 345',
    jobTitle: 'Managing Partner',
    companyId: 3,
    company: MOCK_COMPANIES[2],
    leadStatus: 'Nurturing',
    leadSource: 'Website',
    leadScore: 65,
    tags: ['investor'],
    owner: 'Me',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString()
  },
];

export const MOCK_DEALS: Deal[] = [
  {
    id: 1,
    name: 'Enterprise Software License',
    value: 50000,
    currency: 'USD',
    stage: 'Negotiation',
    contactId: 1,
    contact: MOCK_CONTACTS[0],
    companyId: 1,
    company: MOCK_COMPANIES[0],
    expectedCloseDate: '2026-04-15',
    priority: 'High',
    owner: 'Me',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 2,
    name: 'Cloud Migration Project',
    value: 120000,
    currency: 'USD',
    stage: 'Discovery',
    contactId: 2,
    contact: MOCK_CONTACTS[1],
    companyId: 2,
    company: MOCK_COMPANIES[1],
    expectedCloseDate: '2026-06-01',
    priority: 'Medium',
    owner: 'Me',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

export const MOCK_EMAILS: Email[] = [
  {
    id: 1,
    sender: 'john@acme.com',
    subject: 'Follow up on proposal',
    content: 'Hi, we have reviewed the proposal and it looks good. Let\'s schedule a call for next week.',
    timestamp: new Date().toISOString(),
    isRead: false,
    contactId: 1,
  },
  {
    id: 2,
    sender: 'jane@stellar.io',
    subject: 'Question about pricing',
    content: 'Can you provide more details on the volume discounts?',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    isRead: true,
    contactId: 2,
  },
];

export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: 'Send updated proposal',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    priority: 'High',
    status: 'To Do',
    contactId: 1,
    aiGenerated: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Schedule demo',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    priority: 'Medium',
    status: 'To Do',
    contactId: 2,
    aiGenerated: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 1,
    type: 'Call',
    title: 'Introductory Call',
    description: 'Discussed overall needs and budget.',
    contactId: 1,
    date: new Date(Date.now() - 86400000).toISOString(),
    outcome: 'Completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const MOCK_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 1,
    name: 'Initial Outreach',
    subject: 'Connecting regarding NexusCRM',
    body: 'Hello {{firstName}}, I would like to introduce you to NexusCRM.',
    category: 'Introduction',
    aiGenerated: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];