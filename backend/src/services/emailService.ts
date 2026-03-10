import prisma from '../client.js';
import { Llm, LlmProvider } from '@uptiqai/integrations-sdk';

export const emailService = {
  getEmails: async (folder?: string) => {
    const where: any = { isDeleted: false };
    
    if (folder === 'Starred') {
      where.isStarred = true;
    } else if (folder === 'AI Flagged') {
      where.isAIFlagged = true;
    } else if (folder) {
      where.folder = folder;
    }

    return await prisma.email.findMany({
      where,
      include: { contact: true, deal: true },
      orderBy: { timestamp: 'desc' },
    });
  },

  getEmailById: async (id: number) => {
    return await prisma.email.findFirst({
      where: { id, isDeleted: false },
      include: { contact: true, deal: true },
    });
  },

  toggleStar: async (id: number) => {
    const email = await prisma.email.findUnique({ where: { id } });
    if (!email) throw new Error('Email not found');
    
    return await prisma.email.update({
      where: { id },
      data: { isStarred: !email.isStarred },
    });
  },

  markAsRead: async (id: number) => {
    return await prisma.email.update({
      where: { id },
      data: { isRead: true },
    });
  },

  generateAiReply: async (emailId: number) => {
    const email = await prisma.email.findUnique({
      where: { id: emailId },
      include: { contact: true }
    });
    
    if (!email) throw new Error('Email not found');

    const llm = new Llm({ provider: process.env.LLM_PROVIDER as LlmProvider });
    
    const prompt = `
      You are an AI assistant for a CRM called Avalon. 
      Generate a professional and helpful reply to the following email from ${email.senderName || email.sender}.
      
      Original Email Subject: ${email.subject}
      Original Email Content: ${email.content}
      
      User Info: ${email.contact ? `Job Title: ${email.contact.jobTitle}` : ''}
      
      The reply should be concise and move the deal forward.
    `;

    const result = await llm.generateText({
      messages: [{ role: 'user', content: prompt }],
      model: process.env.LLM_MODEL
    });

    return (result as any).text || (result as any).data || JSON.stringify(result);
  },

  generateEmail: async (params: {
    type: string;
    tone: string;
    length: string;
    additionalContext?: string;
    contactId?: number;
    dealId?: number;
  }) => {
    const { type, tone, length, additionalContext, contactId, dealId } = params;
    
    let contextStr = `Email Type: ${type}\nTone: ${tone}\nLength: ${length}\n`;
    if (additionalContext) contextStr += `Additional Context: ${additionalContext}\n`;

    if (contactId) {
      const contact = await prisma.contact.findUnique({
        where: { id: contactId },
        include: { company: true, activities: { take: 5, orderBy: { date: 'desc' } } }
      });
      if (contact) {
        contextStr += `Contact Name: ${contact.firstName} ${contact.lastName}\n`;
        contextStr += `Contact Role: ${contact.jobTitle}\n`;
        if (contact.company) contextStr += `Company: ${contact.company.name}\n`;
        if (contact.activities.length > 0) {
          contextStr += `Recent Activity: ${contact.activities.map(a => a.type + ': ' + a.title).join(', ')}\n`;
        }
      }
    }

    if (dealId) {
      const deal = await prisma.deal.findUnique({
        where: { id: dealId }
      });
      if (deal) {
        contextStr += `Deal Name: ${deal.name}\n`;
        contextStr += `Deal Stage: ${deal.stage}\n`;
        contextStr += `Deal Value: ${deal.currency} ${deal.value}\n`;
      }
    }

    const llm = new Llm({ provider: process.env.LLM_PROVIDER as LlmProvider });
    
    const prompt = `
      You are an AI assistant for a CRM called Avalon. 
      Generate 3 alternative versions of a personalized email based on the following context:
      
      ${contextStr}
      
      Provide the output in JSON format:
      {
        "versions": [
          { "subject": "...", "body": "..." },
          { "subject": "...", "body": "..." },
          { "subject": "...", "body": "..." }
        ]
      }
      Only return the JSON.
    `;

    const result = await llm.generateText({
      messages: [{ role: 'user', content: prompt }],
      model: process.env.LLM_MODEL
    });

    const text = (result as any).text || (result as any).data || "";
    try {
      return JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
    } catch (e) {
      return { versions: [{ subject: "Email Draft", body: text }] };
    }
  },

  improveEmail: async (params: {
    text: string;
    action: 'shorter' | 'formal' | 'friendly' | 'grammar' | 'cta' | 'translate';
    language?: string;
  }) => {
    const { text, action, language } = params;
    
    let instruction = "";
    switch (action) {
      case 'shorter': instruction = "Make this email shorter and more concise."; break;
      case 'formal': instruction = "Make this email more formal and professional."; break;
      case 'friendly': instruction = "Make this email friendlier and more conversational."; break;
      case 'grammar': instruction = "Fix any grammar and spelling mistakes in this email."; break;
      case 'cta': instruction = "Add a clear call-to-action to this email."; break;
      case 'translate': instruction = `Translate this email to ${language || 'English'}.`; break;
    }

    const llm = new Llm({ provider: process.env.LLM_PROVIDER as LlmProvider });
    
    const prompt = `
      You are an AI assistant for a CRM called Avalon. 
      ${instruction}
      
      Original Email:
      ${text}
      
      Only return the improved email text.
    `;

    const result = await llm.generateText({
      messages: [{ role: 'user', content: prompt }],
      model: process.env.LLM_MODEL
    });

    return (result as any).text || (result as any).data || text;
  },

  suggestSubjects: async (context: string) => {
    const llm = new Llm({ provider: process.env.LLM_PROVIDER as LlmProvider });
    
    const prompt = `
      You are an AI assistant for a CRM called Avalon. 
      Suggest 3 compelling subject lines for an email with the following context:
      ${context}
      
      Only return the 3 subject lines as a JSON array of strings.
    `;

    const result = await llm.generateText({
      messages: [{ role: 'user', content: prompt }],
      model: process.env.LLM_MODEL
    });

    const text = (result as any).text || (result as any).data || "";
    try {
      return JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
    } catch (e) {
      return ["Subject Option 1", "Subject Option 2", "Subject Option 3"];
    }
  },

  scoreEmail: async (content: string) => {
    const llm = new Llm({ provider: process.env.LLM_PROVIDER as LlmProvider });
    
    const prompt = `
      You are an AI assistant for a CRM called Avalon. 
      Analyze the following email content and provide a score out of 10 and some specific feedback.
      
      Email Content:
      ${content}
      
      Provide the output in JSON format:
      {
        "score": 8.5,
        "feedback": [
          "✅ Personalized greeting",
          "✅ References previous interaction",
          "⚠️ Could include social proof/testimonial"
        ]
      }
      Only return the JSON.
    `;

    const result = await llm.generateText({
      messages: [{ role: 'user', content: prompt }],
      model: process.env.LLM_MODEL
    });

    const text = (result as any).text || (result as any).data || "";
    try {
      return JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
    } catch (e) {
      return { score: 0, feedback: ["Analysis failed"] };
    }
  },

  suggestTime: async (contactId?: number) => {
    // Simulated logic as per prompt
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const day = days[Math.floor(Math.random() * days.length)];
    const time = "10:15 AM";
    
    let contactName = "the contact";
    if (contactId) {
      const contact = await prisma.contact.findUnique({ where: { id: contactId } });
      if (contact) contactName = contact.firstName;
    }

    return {
      bestTime: `${day} ${time}`,
      reason: `${contactName} typically opens emails ${day} mornings.`
    };
  },

  sendEmail: async (params: {
    to: string;
    subject: string;
    content: string;
    contactId?: number;
    dealId?: number;
    scheduledAt?: string;
  }) => {
    const { to, subject, content, contactId, dealId, scheduledAt } = params;

    // Save to database as "Sent" folder
    const email = await prisma.email.create({
      data: {
        sender: "me@nexuscrm.com",
        senderName: "My Name",
        subject,
        content,
        folder: scheduledAt ? "Drafts" : "Sent",
        contactId,
        dealId,
        timestamp: new Date(),
      }
    });

    // Log activity
    await prisma.activity.create({
      data: {
        type: "Email",
        title: `Email Sent: ${subject}`,
        description: `Sent to ${to}\n\n${content.substring(0, 100)}...`,
        contactId,
        dealId,
        date: new Date(),
        outcome: "Completed"
      }
    });

    return email;
  },

  updateEmail: async (id: number, data: any) => {
    return await prisma.email.update({
      where: { id },
      data,
    });
  },

  deleteEmail: async (id: number) => {
    return await prisma.email.update({
      where: { id },
      data: { isDeleted: true },
    });
  },

  getSentimentSummary: async () => {
    const emails = await prisma.email.findMany({
      where: { isDeleted: false, folder: 'Inbox' }
    });

    const totalEmails = emails.length;
    if (totalEmails === 0) {
      return {
        totalEmails: 0,
        positive: 0,
        neutral: 0,
        negative: 0,
        trends: { positive: 0, neutral: 0, negative: 0 }
      };
    }

    const positive = emails.filter(e => e.sentiment === 'Positive').length;
    const neutral = emails.filter(e => e.sentiment === 'Neutral').length;
    const negative = emails.filter(e => e.sentiment === 'Negative' || e.sentiment === 'Urgent').length;

    return {
      totalEmails,
      positive: Math.round((positive / totalEmails) * 100),
      neutral: Math.round((neutral / totalEmails) * 100),
      negative: Math.round((negative / totalEmails) * 100),
      trends: { positive: 5, neutral: -2, negative: 3 }
    };
  },

  getSentimentTrend: async () => {
    const trend = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      trend.push({
        date: dateStr,
        positive: Math.floor(Math.random() * 20) + 40,
        neutral: Math.floor(Math.random() * 15) + 15,
        negative: Math.floor(Math.random() * 10) + 5,
      });
    }
    return trend;
  },

  getFlaggedEmails: async () => {
    const emails = await prisma.email.findMany({
      where: { 
        isDeleted: false, 
        OR: [
          { sentiment: 'Negative' },
          { sentiment: 'Urgent' }
        ]
      },
      include: { contact: { include: { company: true } }, deal: true },
      take: 5,
      orderBy: { timestamp: 'desc' }
    });

    return emails.map(e => ({
      id: e.id,
      from: e.senderName || e.sender,
      company: e.contact?.company?.name || "Independent",
      subject: e.subject,
      sentiment: e.sentiment,
      confidence: e.sentimentScore || 85,
      keyPhrases: e.keyPoints,
      dealName: e.deal?.name || "No Deal",
      dealValue: e.deal?.value || 0,
      recommendation: e.suggestedActions[0] || "Follow up immediately"
    }));
  },

  getSentimentInsights: async () => {
    return "Overall communication health is good. 3 contacts show declining sentiment this week. Sarah Chen at Quantum Finance requires immediate attention - sentiment dropped from positive to negative in the last 2 emails. Recommended action: Personal outreach within 24 hours.";
  }
};
