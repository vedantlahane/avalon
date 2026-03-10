import { api } from '../lib/api';
import { Automation, AutomationLog } from '../types';

export const automationService = {
  getAutomations: async (): Promise<Automation[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      const { mockAutomations } = await import('../data/mockData');
      return mockAutomations;
    }
    const response = await api.get('/automations');
    return response.data;
  },

  getAutomationById: async (id: number): Promise<Automation> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      const { mockAutomations } = await import('../data/mockData');
      const automation = mockAutomations.find((a: Automation) => a.id === id);
      if (!automation) throw new Error('Automation not found');
      return automation;
    }
    const response = await api.get(`/automations/${id}`);
    return response.data;
  },

  createAutomation: async (data: Partial<Automation>): Promise<Automation> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      const newAutomation: Automation = {
        id: Math.floor(Math.random() * 1000),
        name: data.name || 'New Automation',
        description: data.description,
        status: 'Active',
        trigger: data.trigger!,
        conditions: data.conditions || [],
        actions: data.actions || [],
        triggeredCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return newAutomation;
    }
    const response = await api.post('/automations', data);
    return response.data;
  },

  updateAutomation: async (id: number, data: Partial<Automation>): Promise<Automation> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      return { id, ...data } as Automation;
    }
    const response = await api.patch(`/automations/${id}`, data);
    return response.data;
  },

  deleteAutomation: async (id: number): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      return;
    }
    await api.delete(`/automations/${id}`);
  },

  getAutomationLogs: async (id: number): Promise<AutomationLog[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      return [
        {
          id: 1,
          automationId: id,
          status: 'Success',
          message: 'Automation triggered successfully',
          timestamp: new Date().toISOString(),
        }
      ];
    }
    const response = await api.get(`/automations/${id}/logs`);
    return response.data;
  },

  testAutomation: async (id: number, sampleData: any): Promise<any> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      return { success: true, message: 'Test completed successfully' };
    }
    const response = await api.post(`/automations/${id}/test`, sampleData);
    return response.data;
  },

  toggleAutomation: async (id: number): Promise<Automation> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      const { mockAutomations } = await import('../data/mockData');
      const automation = mockAutomations.find((a: Automation) => a.id === id);
      if (automation) {
        automation.status = automation.status === 'Active' ? 'Paused' : 'Active';
        return automation;
      }
      throw new Error('Automation not found');
    }
    const response = await api.post(`/automations/${id}/toggle`);
    return response.data;
  },
};
