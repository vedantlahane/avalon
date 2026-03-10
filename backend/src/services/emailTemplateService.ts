import prisma from '../client.js';
import { Prisma } from '../generated/prisma/index.js';

export const emailTemplateService = {
  getEmailTemplates: async () => {
    return await prisma.emailTemplate.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' }
    });
  },

  createEmailTemplate: async (data: Prisma.EmailTemplateCreateInput) => {
    return await prisma.emailTemplate.create({
      data
    });
  },

  updateEmailTemplate: async (id: number, data: Prisma.EmailTemplateUpdateInput) => {
    return await prisma.emailTemplate.update({
      where: { id, isDeleted: false },
      data
    });
  },

  deleteEmailTemplate: async (id: number) => {
    return await prisma.emailTemplate.update({
      where: { id },
      data: { isDeleted: true }
    });
  },

  generateEmailTemplate: async (description: string, tone: string, length: string) => {
    // In a real app, this would call an LLM.
    // For now, returning mock variations as per prompt requirements for simulation.
    return [
      {
        subject: `Following up: {{deal_name}} - {{company_name}}`,
        body: `Hi {{first_name}},

I hope you're having a great week. I wanted to follow up on our recent discussion regarding {{deal_name}} and see if you had any further thoughts or questions.

We're excited about the possibility of working with {{company_name}} and helping you achieve your goals.

Let me know if you'd like to schedule a brief call to discuss next steps.

Best regards,
[Your Name]`
      },
      {
        subject: `Quick check-in regarding {{deal_name}}`,
        body: `Hello {{first_name}},

It's been a few days since we last spoke about {{deal_name}} for {{company_name}}. I wanted to circle back and see if there's anything else you need from my side to help move things forward.

I'm available on {{next_step}} if you'd like to chat further.

Best,
[Your Name]`
      },
      {
        subject: `{{company_name}} x Avalon: Next Steps`,
        body: `Hi {{first_name}},

Following up on our conversation about Avalon and how it can benefit {{company_name}}. 

I've attached some additional information that addresses the points we discussed regarding {{deal_name}}.

Would love to hear your thoughts on this when you have a moment.

Cheers,
[Your Name]`
      }
    ];
  }
};
