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

  generateEmail: async (params: {
    type: string;
    tone: string;
    length: string;
    additionalContext?: string;
    contactId?: number;
    dealId?: number;
  }): Promise<{ versions: { subject: string; body: string }[] }> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return {
        versions: [
          {
            subject: "Quick follow-up: Acme Enterprise Plan next steps",
            body: "Hi John,\n\nGreat speaking with you yesterday about the Enterprise Plan for Acme Technologies. I wanted to follow up on the key points we discussed.\n\nAs mentioned, I've attached the detailed implementation timeline showing a 6-week rollout plan. Given your Q1 budget approval, I'd love to schedule a technical deep-dive with your CTO to address the integration requirements.\n\nI'm also happy to offer our early-commitment discount of 15% if we can finalize by end of March.\n\nWould Thursday at 2 PM work for a 30-minute call with your technical team?\n\nBest regards,\n[Your Name]"
          },
          {
            subject: "Acme Technologies - Enterprise Plan Implementation",
            body: "Hello John,\n\nFollowing our conversation regarding the Enterprise Plan, I've drafted a preliminary implementation timeline for Acme Technologies. \n\nWe can definitely work within your Q1 budget constraints. I recommend we jump on a call with your CTO to finalize the technical requirements. If we move forward this month, I can secure a 15% discount for you.\n\nAre you available later this week for a brief technical discussion?\n\nCheers,\n[Your Name]"
          },
          {
            subject: "Enterprise Plan: Next steps for Acme",
            body: "Hi John, following up on our demo. I've attached the 6-week rollout plan we discussed. Since your Q1 budget is ready, let's get your CTO on a technical deep-dive call to handle the integration. I can also include a 15% discount if we sign by March 31st.\n\nDoes Thursday at 2 PM work?\n\nBest,\n[Your Name]"
          }
        ]
      };
    }
    const response = await api.post('/emails/generate', params);
    return response.data;
  },

  improveEmail: async (params: {
    text: string;
    action: 'shorter' | 'formal' | 'friendly' | 'grammar' | 'cta' | 'translate';
    language?: string;
  }): Promise<string> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return params.text + "\n\n(AI Improved: " + params.action + ")";
    }
    const response = await api.post('/emails/improve', params);
    return response.data.text;
  },

  suggestSubjects: async (context: string): Promise<string[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return [
        "Quick follow-up: Acme Enterprise Plan next steps",
        "Acme Technologies - Enterprise Plan Implementation",
        "Enterprise Plan: Next steps for Acme"
      ];
    }
    const response = await api.post('/emails/suggest-subject', { context });
    return response.data.subjects;
  },

  scoreEmail: async (content: string): Promise<{ score: number; feedback: string[] }> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return {
        score: 8.5,
        feedback: [
          "✅ Personalized greeting",
          "✅ References previous interaction",
          "✅ Clear call-to-action",
          "✅ Appropriate length",
          "⚠️ Could include social proof/testimonial"
        ]
      };
    }
    const response = await api.post('/emails/score', { content });
    return response.data;
  },

  suggestTime: async (contactId?: number): Promise<{ bestTime: string; reason: string }> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return {
        bestTime: "Tuesday 10:15 AM",
        reason: "John typically opens emails Tuesday-Thursday mornings"
      };
    }
    const response = await api.get('/emails/suggest-time', { params: { contactId } });
    return response.data;
  },

  sendEmail: async (params: {
    to: string;
    subject: string;
    content: string;
    contactId?: number;
    dealId?: number;
    scheduledAt?: string;
  }): Promise<Email> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        id: Math.floor(Math.random() * 10000),
        sender: "me@nexuscrm.com",
        senderName: "My Name",
        subject: params.subject,
        content: params.content,
        timestamp: new Date().toISOString() as any,
        isRead: true,
        isStarred: false,
        isAIFlagged: false,
        folder: params.scheduledAt ? "Drafts" : "Sent",
        contactId: params.contactId,
        dealId: params.dealId,
      } as any;
    }
    const response = await api.post('/emails/send', params);
    return response.data;
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
