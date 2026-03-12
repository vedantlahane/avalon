import { api } from '../lib/api';
import { Deal } from '../types';
import { MOCK_DEALS } from '../data/mockData';

export const dealService = {
  getDeals: async (): Promise<Deal[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_DEALS as Deal[];
    }
    const response = await api.get('/crm/deals');
    return response.data;
  },

  getDeal: async (id: string | number): Promise<Deal> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const deal = MOCK_DEALS.find(d => d.id.toString() === id.toString());
      if (!deal) throw new Error('Deal not found');
      return deal as Deal;
    }
    const response = await api.get(`/crm/deals/${id}`);
    return response.data;
  },

  createDeal: async (dealData: Partial<Deal>): Promise<Deal> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const newDeal = {
        id: Math.random().toString(36).substr(2, 9),
        ...dealData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Deal;
      return newDeal;
    }
    const response = await api.post('/crm/deals', dealData);
    return response.data;
  },

  updateDeal: async (id: string | number, dealData: Partial<Deal>): Promise<Deal> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const index = MOCK_DEALS.findIndex(d => d.id.toString() === id.toString());
      if (index === -1) throw new Error('Deal not found');
      const updatedDeal = { ...MOCK_DEALS[index], ...dealData, updatedAt: new Date().toISOString() };
      return updatedDeal as Deal;
    }
    const response = await api.patch(`/crm/deals/${id}`, dealData);
    return response.data;
  },

  deleteDeal: async (id: string | number): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return;
    }
    await api.delete(`/crm/deals/${id}`);
  },

  analyzeDeal: async (id: string | number): Promise<{ riskScore: number; insights: string[]; probability: number }> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return {
        riskScore: 45,
        insights: ["Competitor mention detected in recent email", "Decision maker hasn't responded in 7 days", "High engagement from technical team"],
        probability: 72
      };
    }
    const response = await api.post(`/ai/analyze-deal/${id}`);
    return response.data;
  }
};
