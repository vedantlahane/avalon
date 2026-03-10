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
  }
};
