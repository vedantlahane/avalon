import { api } from '../lib/api';
import { Deal, DealStage } from '../types';
import { MOCK_DEALS } from '../data/mockData';
import { emitter } from '../agentSdk';
import { differenceInDays } from 'date-fns';

const AGENT_ID = '42113c8f-b26e-4cce-b179-94074aa9c13a';

export const dealService = {
  getDeals: async (): Promise<Deal[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_DEALS;
    }
    const response = await api.get('/deals');
    return response.data;
  },

  updateDealStage: async (dealId: number, stage: DealStage): Promise<Deal> => {
    let updatedDeal: Deal;

    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const deal = MOCK_DEALS.find(d => d.id === dealId);
      if (!deal) throw new Error('Deal not found');
      updatedDeal = { ...deal, stage, updatedAt: new Date().toISOString() };
    } else {
      const response = await api.patch(`/deals/${dealId}`, { stage });
      updatedDeal = response.data;
    }

    // Check for stagnation (simulated here - in real app would be a background task)
    const daysSinceUpdate = differenceInDays(new Date(), new Date(updatedDeal.updatedAt));
    if (daysSinceUpdate > 5) {
      emitter.emit({
        agentId: AGENT_ID,
        event: 'deal_stagnation_alert',
        payload: {
          dealId: updatedDeal.id,
          title: updatedDeal.name,
          stage: updatedDeal.stage,
          daysStagnant: daysSinceUpdate,
        },
        uid: crypto.randomUUID(),
      });
    }

    return updatedDeal;
  },

  createDeal: async (dealData: Partial<Deal>): Promise<Deal> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const newDeal = {
        id: Math.floor(Math.random() * 1000) + 100,
        ...dealData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Deal;
      return newDeal;
    }
    const response = await api.post('/deals', dealData);
    return response.data;
  },

  getDealById: async (id: number): Promise<Deal | undefined> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_DEALS.find(d => d.id === id);
    }
    const response = await api.get(`/deals/${id}`);
    return response.data;
  },

  updateDeal: async (id: number, dealData: Partial<Deal>): Promise<Deal> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const index = MOCK_DEALS.findIndex(d => d.id === id);
      if (index === -1) throw new Error('Deal not found');
      const updatedDeal = { ...MOCK_DEALS[index], ...dealData, updatedAt: new Date().toISOString() };
      return updatedDeal;
    }
    const response = await api.patch(`/deals/${id}`, dealData);
    return response.data;
  },

  deleteDeal: async (id: number): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return;
    }
    await api.delete(`/deals/${id}`);
  }
};