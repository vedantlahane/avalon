import { api } from '../lib/api';
import { Email } from '../types';
import { MOCK_EMAILS } from '../data/mockData';
import { emitter } from '../agentSdk';

const AGENT_ID = '42113c8f-b26e-4cce-b179-94074aa9c13a';

export const emailService = {
  getEmails: async (): Promise<Email[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_EMAILS;
    }
    const response = await api.get('/emails');
    return response.data;
  },

  receiveEmail: async (emailData: Email): Promise<Email> => {
    // In a real app, this might be triggered by a webhook
    // For this prototype, we'll trigger the AI analysis whenever a "new" email is processed
    
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

    // Assume result contains summary and sentiment score updates
    return {
      ...emailData,
      summary: (result as any)?.summary || 'Email summarized by AI',
    };
  }
};
