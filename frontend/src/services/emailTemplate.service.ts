import { api } from '../lib/api';
import { EmailTemplate } from '../types';
import { MOCK_EMAIL_TEMPLATES } from '../data/mockData';

export const emailTemplateService = {
  getEmailTemplates: async (): Promise<EmailTemplate[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_EMAIL_TEMPLATES;
    }
    const response = await api.get('/email-templates');
    return response.data;
  },

  createEmailTemplate: async (templateData: Partial<EmailTemplate>): Promise<EmailTemplate> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const newTemplate = {
        id: Math.floor(Math.random() * 1000) + 100,
        ...templateData,
        aiGenerated: templateData.aiGenerated || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as EmailTemplate;
      return newTemplate;
    }
    const response = await api.post('/email-templates', templateData);
    return response.data;
  },

  updateEmailTemplate: async (id: number, templateData: Partial<EmailTemplate>): Promise<EmailTemplate> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const index = MOCK_EMAIL_TEMPLATES.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Email template not found');
      const updatedTemplate = { ...MOCK_EMAIL_TEMPLATES[index], ...templateData, updatedAt: new Date().toISOString() };
      return updatedTemplate;
    }
    const response = await api.patch(`/email-templates/${id}`, templateData);
    return response.data;
  },

  deleteEmailTemplate: async (id: number): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return;
    }
    await api.delete(`/email-templates/${id}`);
  }
};
