import { Contact, Company, Deal, Email, Task } from '../types';

export const MOCK_COMPANIES: Company[] = [
  { id: '1', name: 'Acme Corp', industry: 'Technology', website: 'https://acme.com' },
  { id: '2', name: 'Stellar Solutions', industry: 'Logistics', website: 'https://stellar.io' },
  { id: '3', name: 'Nebula Ventures', industry: 'Finance', website: 'https://nebula.vc' },
];

export const MOCK_CONTACTS: Contact[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@acme.com',
    phone: '+1 234 567 890',
    title: 'CTO',
    companyId: '1',
    status: 'customer',
    score: 85,
    lastInteraction: new Date().toISOString(),
    sentimentScore: 0.8,
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@stellar.io',
    phone: '+1 987 654 321',
    title: 'VP of Sales',
    companyId: '2',
    status: 'lead',
    score: 45,
    lastInteraction: new Date(Date.now() - 86400000 * 2).toISOString(),
    sentimentScore: 0.5,
  },
  {
    id: '3',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@nebula.vc',
    phone: '+1 555 012 345',
    title: 'Managing Partner',
    companyId: '3',
    status: 'prospect',
    score: 65,
    lastInteraction: new Date(Date.now() - 86400000 * 5).toISOString(),
    sentimentScore: 0.7,
  },
];

export const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    title: 'Enterprise Software License',
    value: 50000,
    stage: 'negotiation',
    contactId: '1',
    companyId: '1',
    closeDate: '2026-04-15',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: '2',
    title: 'Cloud Migration Project',
    value: 120000,
    stage: 'discovery',
    contactId: '2',
    companyId: '2',
    closeDate: '2026-06-01',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

export const MOCK_EMAILS: Email[] = [
  {
    id: '1',
    sender: 'john@acme.com',
    subject: 'Follow up on proposal',
    content: 'Hi, we have reviewed the proposal and it looks good. Let\'s schedule a call for next week.',
    timestamp: new Date().toISOString(),
    isRead: false,
    contactId: '1',
  },
  {
    id: '2',
    sender: 'jane@stellar.io',
    subject: 'Question about pricing',
    content: 'Can you provide more details on the volume discounts?',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    isRead: true,
    contactId: '2',
  },
];

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Send updated proposal',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    isCompleted: false,
    contactId: '1',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Schedule demo',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    isCompleted: false,
    contactId: '2',
    priority: 'medium',
  },
];
