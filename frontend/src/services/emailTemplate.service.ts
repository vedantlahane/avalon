import { api } from '../lib/api';
import { EmailTemplate } from '../types';

export const emailTemplateService = {
  getEmailTemplates: async (): Promise<EmailTemplate[]> => {
    const response = await api.get('/email-templates');
    return response.data;
  },

  createEmailTemplate: async (templateData: Partial<EmailTemplate>): Promise<EmailTemplate> => {
    const response = await api.post('/email-templates', templateData);
    return response.data;
  },

  updateEmailTemplate: async (id: number, templateData: Partial<EmailTemplate>): Promise<EmailTemplate> => {
    const response = await api.patch(`/email-templates/${id}`, templateData);
    return response.data;
  },

  deleteEmailTemplate: async (id: number): Promise<void> => {
    await api.delete(`/email-templates/${id}`);
  },

  generateEmailTemplate: async (data: { description: string, tone: string, length: string }): Promise<{ subject: string, body: string }[]> => {
    const response = await api.post('/email-templates/generate', data);
    return response.data.variations;
  }
};
