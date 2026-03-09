import { api } from '../lib/api';
import { Contact } from '../types';
import { MOCK_CONTACTS } from '../data/mockData';
import { emitter } from '../agentSdk';

const AGENT_ID = '42113c8f-b26e-4cce-b179-94074aa9c13a';

export const contactService = {
  getContacts: async (): Promise<Contact[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_CONTACTS;
    }
    const response = await api.get('/contacts');
    return response.data;
  },

  createContact: async (contactData: Partial<Contact>): Promise<Contact> => {
    let newContact: Contact;
    
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      newContact = {
        id: Math.random().toString(36).substr(2, 9),
        ...contactData,
        score: 0,
        sentimentScore: 0.5,
      } as Contact;
    } else {
      const response = await api.post('/contacts', contactData);
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
        title: newContact.title,
      },
      uid: crypto.randomUUID(),
    });

    return newContact;
  },

  getContactById: async (id: string): Promise<Contact | undefined> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_CONTACTS.find(c => c.id === id);
    }
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  }
};
