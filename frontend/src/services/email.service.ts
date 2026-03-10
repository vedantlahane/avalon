import { api } from '../lib/api';
import { Email } from '../types';
import { MOCK_EMAILS } from '../data/mockData';
import { emitter } from '../agentSdk';

const AGENT_ID = '42113c8f-b26e-4cce-b179-94074aa9c13a';

export const emailService = {
  getEmails: async (folder?: string): Promise<Email[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      if (folder === 'Starred') return MOCK_EMAILS.filter(e => e.isStarred);
      if (folder === 'AI Flagged') return MOCK_EMAILS.filter(e => e.isAIFlagged);
      if (folder) return MOCK_EMAILS.filter(e => e.folder === folder);
      return MOCK_EMAILS;
    }
    const response = await api.get('/emails', { params: { folder } });
    return response.data;
  },

  getEmailById: async (id: number): Promise<Email> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const email = MOCK_EMAILS.find(e => e.id === id);
      if (!email) throw new Error('Email not found');
      return email;
    }
    const response = await api.get(`/emails/${id}`);
    return response.data;
  },

  toggleStar: async (id: number): Promise<Email> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const email = MOCK_EMAILS.find(e => e.id === id);
      if (!email) throw new Error('Email not found');
      email.isStarred = !email.isStarred;
      return email;
    }
    const response = await api.patch(`/emails/${id}/star`);
    return response.data;
  },

  markAsRead: async (id: number): Promise<Email> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const email = MOCK_EMAILS.find(e => e.id === id);
      if (!email) throw new Error('Email not found');
      email.isRead = true;
      return email;
    }
    const response = await api.patch(`/emails/${id}/read`);
    return response.data;
  },

  generateAiReply: async (emailId: number): Promise<string> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return "Hi Sarah,\n\nThank you for the update! We are thrilled to hear that the budget has been approved. I'll prepare the implementation timeline document as requested.\n\nRegarding the technical deep-dive, would Tuesday at 10 AM or Wednesday at 2 PM work for you and your CTO?\n\nBest regards,\n[My Name]";
    }
    const response = await api.post(`/emails/${emailId}/generate-reply`);
    return response.data.reply;
  },

  receiveEmail: async (emailData: Email): Promise<Email> => {
    // ... existing implementation
    const result = await emitter.emit({
      agentId: AGENT_ID,
      event: 'incoming_email_analysis',
      payload: {
        emailId: emailData.id,
        sender: emailData.sender,
        content: emailData.content,
      },
      uid: crypto.randomUUID(),
    });

    return {
      ...emailData,
      summary: (result as any)?.summary || 'Email summarized by AI',
    };
  }
};
