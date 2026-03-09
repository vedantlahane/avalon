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

  updateDealStage: async (dealId: string, stage: DealStage): Promise<Deal> => {
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
          title: updatedDeal.title,
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
        id: Math.random().toString(36).substr(2, 9),
        ...dealData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Deal;
      return newDeal;
    }
    const response = await api.post('/deals', dealData);
    return response.data;
  }
};
