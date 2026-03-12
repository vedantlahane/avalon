import { api } from '../lib/api';
import { Contact, EnrichmentResult } from '../types';
import { MOCK_CONTACTS } from '../data/mockData';
import { emitter } from '../agentSdk';

const AGENT_ID = '42113c8f-b26e-4cce-b179-94074aa9c13a';

export const contactService = {
  getContacts: async (): Promise<Contact[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_CONTACTS;
    }
    const response = await api.get('/crm/contacts');
    return response.data;
  },

  enrichContact: async (email: string): Promise<EnrichmentResult> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const domain = email.split('@')[1];
      
      // Basic mock enrichment based on domain
      const result: EnrichmentResult = {
        firstName: 'John',
        lastName: 'Smith',
        jobTitle: 'VP of Engineering',
        companyName: domain ? domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1) + ' Technologies' : 'Acme Technologies',
        companyDomain: domain || 'acme.com',
        phone: '+1 (555) 234-5678',
        linkedinUrl: `linkedin.com/in/john-smith-${Math.floor(Math.random() * 1000)}`,
        location: 'San Francisco, CA',
        companyIndustry: 'Technology',
        companySize: '201-500',
        suggestedLeadScore: 72,
        suggestedTags: ['Decision Maker', 'Technical', 'Enterprise'],
        recentNews: 'Recently raised $50M in Series C funding led by Sequoia.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Salesforce']
      };
      return result;
    }
    const response = await api.post('/crm/contacts/enrich', { email });
    return response.data;
  },

  bulkEnrichContacts: async (contactIds: number[]): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return;
    }
    await api.post('/crm/contacts/bulk-enrich', { contactIds });
  },

  createContact: async (contactData: Partial<Contact>): Promise<Contact> => {
    let newContact: Contact;
    
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      newContact = {
        id: Math.floor(Math.random() * 1000) + 100,
        ...contactData,
        leadScore: 0,
        tags: [],
        owner: 'Me',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Contact;
    } else {
      const response = await api.post('/crm/contacts', contactData);
      newContact = response.data;
    }

    // Trigger AI Agent
    await emitter.emit({
      agentId: AGENT_ID,
      event: 'new_lead_captured',
      payload: {
        contactId: newContact.id,
        name: `${newContact.firstName} ${newContact.lastName}`,
        email: newContact.email,
        jobTitle: newContact.jobTitle,
      },
      uid: crypto.randomUUID(),
    });

    return newContact;
  },

  getContactById: async (id: number): Promise<Contact | undefined> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_CONTACTS.find(c => c.id === id);
    }
    const response = await api.get(`/crm/contacts/${id}`);
    return response.data;
  },

  updateContact: async (id: number, contactData: Partial<Contact>): Promise<Contact> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const index = MOCK_CONTACTS.findIndex(c => c.id === id);
      if (index === -1) throw new Error('Contact not found');
      const updatedContact = { ...MOCK_CONTACTS[index], ...contactData, updatedAt: new Date().toISOString() };
      return updatedContact;
    }
    const response = await api.patch(`/crm/contacts/${id}`, contactData);
    return response.data;
  },

  deleteContact: async (id: number): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return;
    }
        await api.delete(`/crm/contacts/${id}`);
      },
    
      refreshLeadScore: async (id: number): Promise<Partial<Contact>> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return {
            leadScore: 78,
            leadCategory: 'Hot Lead',
            scoreTrend: 8,
          };
        }
        const response = await api.post(`/crm/contacts/${id}/lead-score/refresh`);
        return response.data;
      },
    
      getLeadScoreHistory: async (id: number): Promise<any[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
          return [
            { id: 1, score: 78, change: 8, reason: 'Attended demo', timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
            { id: 2, score: 70, change: 10, reason: 'Opened proposal email', timestamp: new Date(Date.now() - 86400000 * 4).toISOString() },
            { id: 3, score: 60, change: -2, reason: 'Inactivity decay', timestamp: new Date(Date.now() - 86400000 * 7).toISOString() },
          ];
        }
        const response = await api.get(`/crm/contacts/${id}/lead-score/history`);
        return response.data;
      }
    };
    