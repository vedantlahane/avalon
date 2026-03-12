import { api } from '../lib/api';
import { Contact, EnrichmentResult } from '../types';
import { MOCK_CONTACTS } from '../data/mockData';

export const contactService = {
  getContacts: async (): Promise<Contact[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_CONTACTS as Contact[];
    }
    const response = await api.get('/crm/contacts');
    return response.data;
  },

  getContact: async (id: string | number): Promise<Contact> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const contact = MOCK_CONTACTS.find(c => c.id.toString() === id.toString());
      if (!contact) throw new Error('Contact not found');
      return contact as Contact;
    }
    const response = await api.get(`/crm/contacts/${id}`);
    return response.data;
  },

  createContact: async (contactData: Partial<Contact>): Promise<Contact> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const newContact = {
        id: Math.random().toString(36).substr(2, 9),
        ...contactData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Contact;
      return newContact;
    }
    const response = await api.post('/crm/contacts', contactData);
    return response.data;
  },

  updateContact: async (id: string | number, contactData: Partial<Contact>): Promise<Contact> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const index = MOCK_CONTACTS.findIndex(c => c.id.toString() === id.toString());
      if (index === -1) throw new Error('Contact not found');
      const updatedContact = { ...MOCK_CONTACTS[index], ...contactData, updatedAt: new Date().toISOString() };
      return updatedContact as Contact;
    }
    const response = await api.patch(`/crm/contacts/${id}`, contactData);
    return response.data;
  },

  deleteContact: async (id: string | number): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return;
    }
    await api.delete(`/crm/contacts/${id}`);
  },

  enrichContact: async (email: string): Promise<EnrichmentResult> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return {
        jobTitle: "VP of Engineering",
        linkedinUrl: "https://linkedin.com/in/jsmith",
        companyName: "Acme Technologies",
        companyDomain: "acme-tech.com",
        suggestedLeadScore: 92,
        recentNews: "Acme Technologies raised $50M in Series B funding."
      };
    }
    const response = await api.post('/crm/contacts/enrich', { email });
    return response.data;
  }
};