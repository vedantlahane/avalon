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
    const response = await api.get('/crm/emails', { params: { folder } });
    return response.data;
  },

  getEmailById: async (id: number): Promise<Email> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const email = MOCK_EMAILS.find(e => e.id === id);
      if (!email) throw new Error('Email not found');
      return email;
    }
    const response = await api.get(`/crm/emails/${id}`);
    return response.data;
  },

  toggleStar: async (id: number): Promise<Email> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const email = MOCK_EMAILS.find(e => e.id === id);
      if (!email) throw new Error('Email not found');
      email.isStarred = !email.isStarred;
      return email;
    }
    const response = await api.patch(`/crm/emails/${id}/star`);
    return response.data;
  },

  markAsRead: async (id: number): Promise<Email> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const email = MOCK_EMAILS.find(e => e.id === id);
      if (!email) throw new Error('Email not found');
      email.isRead = true;
      return email;
    }
    const response = await api.patch(`/crm/emails/${id}/read`);
    return response.data;
  },

  generateAiReply: async (emailId: number): Promise<string> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (emailId === 1) { // John Smith
        return "Hi John,\n\nThanks for the reply! Glad to hear the Enterprise Plan is a good fit. \n\nRegarding the timeline: if we sign by Friday, we can have your core team onboarded by March 23rd. I'll send over a detailed rollout plan shortly.\n\nI'm available next Tuesday at 10 AM or Wednesday at 2 PM to walk through the technical validation with your CTO. Which works best?\n\nBest regards,\n[My Name]";
      }
      if (emailId === 2) { // Sarah Chen
        return "Hi Sarah,\n\nI completely understand your concerns regarding the pricing. We value our partnership with Quantum Finance and I'd like to find a way to make this work for you.\n\nI'm currently speaking with my manager about some flexibility on the volume discounts. Are you free for a quick 10-minute call this afternoon to discuss some options?\n\nBest regards,\n[My Name]";
      }
      return "Hi, thank you for your email. I'll get back to you shortly with more details.\n\nBest regards,\n[My Name]";
    }
    const response = await api.post(`/crm/emails/${emailId}/generate-reply`);
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
            subject: "Next steps: Acme Enterprise Plan Implementation",
            body: "Hi John,\n\nFollowing our conversation, I've attached the detailed implementation timeline for Acme Technologies. We've optimized the rollout to get your core engineering team live within the first two weeks.\n\nSince your Q1 budget is approved, I'd love to finalize the technical validation with your CTO so we can stay on track for a March 15th close.\n\nDoes Tuesday at 10 AM work for that technical deep-dive?\n\nBest regards,\n[Your Name]"
          },
          {
            subject: "Acme Technologies - Proposed Implementation Timeline",
            body: "Hello John,\n\nIt was great to learn that the Enterprise Plan is officially budgeted for Q1! \n\nI've drafted a 6-week implementation plan that addresses the scalability requirements we discussed. To keep us moving toward the March 15th target date, let's get your CTO on a brief technical call.\n\nWould next Wednesday at 2 PM work for you and the team?\n\nCheers,\n[Your Name]"
          }
        ]
      };
    }
    const response = await api.post('/crm/emails/generate', params);
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
    const response = await api.post('/crm/emails/improve', params);
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
    const response = await api.post('/crm/emails/suggest-subject', { context });
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
    const response = await api.post('/crm/emails/score', { content });
    return response.data;
  },

  suggestTime: async (contactId?: number): Promise<{ bestTime: string; reason: string }> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return {
        bestTime: "Tuesday 10:15 AM",
        reason: "John typically opens emails Tuesday-Thursday mornings"
      };
    }
    const response = await api.get('/crm/emails/suggest-time', { params: { contactId } });
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
    const response = await api.post('/crm/emails/send', params);
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
  },

  getSentimentSummary: async (): Promise<{
    totalEmails: number;
    positive: number;
    neutral: number;
    negative: number;
    trends: {
      positive: number;
      neutral: number;
      negative: number;
    };
  }> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return {
        totalEmails: 156,
        positive: 68,
        neutral: 22,
        negative: 10,
        trends: { positive: 5, neutral: -2, negative: 3 }
      };
    }
    const response = await api.get('/crm/emails/sentiment/summary');
    return response.data;
  },

  getSentimentTrend: async (): Promise<any[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        positive: Math.floor(Math.random() * 20) + 40,
        neutral: Math.floor(Math.random() * 15) + 15,
        negative: Math.floor(Math.random() * 10) + 5,
      }));
    }
    const response = await api.get('/crm/emails/sentiment/trend');
    return response.data;
  },

  getFlaggedEmails: async (): Promise<any[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return [
        {
          id: 2,
          from: "Sarah Chen",
          company: "Quantum Finance",
          subject: "Pricing Concerns",
          sentiment: "Negative",
          confidence: 94,
          keyPhrases: ["pricing higher than CompetitorX", "not sure we can move forward", "volume discounts"],
          dealName: "Quantum Finance - Platform License",
          dealValue: 80000,
          recommendation: "Immediate personal call to discuss volume discounting + address CompetitorX comparison"
        }
      ];
    }
    const response = await api.get('/crm/emails/sentiment/flagged');
    return response.data;
  },

  getContactSentimentBreakdown: async (): Promise<any[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return [
        { id: 1, contact: "John S.", company: "Acme", sentiment: "Positive", trend: "up", lastEmail: "2h ago" },
        { id: 2, contact: "Sarah C.", company: "Quantum", sentiment: "Negative", trend: "down", lastEmail: "5h ago" },
        { id: 3, contact: "Mike R.", company: "CloudNine", sentiment: "Positive", trend: "up", lastEmail: "1d ago" },
        { id: 4, contact: "Lisa P.", company: "GreenLeaf", sentiment: "Positive", trend: "stable", lastEmail: "2d ago" },
      ];
    }
    const response = await api.get('/crm/contacts/sentiment/breakdown');
    return response.data;
  },

  getSentimentInsights: async (): Promise<string> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return "Overall communication health is stable, but 2 deals are at risk due to declining sentiment. Sarah Chen (Quantum Finance) is the primary concern with a sharp sentiment drop following a pricing discussion. John Smith (Acme) remains highly positive, inquiring about implementation logistics which indicates high purchase intent.";
    }
    const response = await api.get('/crm/emails/sentiment/insights');
    return response.data.insights;
  },
};
