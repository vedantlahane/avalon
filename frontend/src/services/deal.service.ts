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
    const response = await api.get('/crm/deals');
    return response.data;
  },

  updateDealStage: async (dealId: number, stage: DealStage): Promise<Deal> => {
    let updatedDeal: Deal;

    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const deal = MOCK_DEALS.find(d => d.id === dealId);
      if (!deal) throw new Error('Deal not found');
      updatedDeal = { ...deal, stage, updatedAt: new Date().toISOString() };
    } else {
      const response = await api.patch(`/crm/deals/${dealId}`, { stage });
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
        competitors: dealData.competitors || [],
        lineItems: dealData.lineItems || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Deal;
      return newDeal;
    }
    const response = await api.post('/crm/deals', dealData);
    return response.data;
  },

  getDealById: async (id: number): Promise<Deal | undefined> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_DEALS.find(d => d.id === id);
    }
    const response = await api.get(`/crm/deals/${id}`);
    return response.data;
  },

  updateDeal: async (id: number, dealData: Partial<Deal>): Promise<Deal> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const index = MOCK_DEALS.findIndex(d => d.id === id);
      if (index === -1) throw new Error('Deal not found');
      const updatedDeal = { ...MOCK_DEALS[index], ...dealData, updatedAt: new Date().toISOString() };
      return updatedDeal;
    }
    const response = await api.patch(`/crm/deals/${id}`, dealData);
    return response.data;
  },

  deleteDeal: async (id: number): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return;
    }
    await api.delete(`/crm/deals/${id}`);
  },

  bulkUpdateDeals: async (ids: number[], data: Partial<Deal>): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return;
    }
    await api.post('/crm/deals/bulk-update', { ids, data });
  },

  bulkDeleteDeals: async (ids: number[]): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return;
    }
    await api.post('/crm/deals/bulk-delete', { ids });
  },

  getForecastData: async (timePeriod: string, category: string, aiConfidence: boolean): Promise<any> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      // Return mock forecast data
      return {
        tableData: [
          { category: 'Qualified', count: 3, value: 180000, weighted: 45000, aiAdjusted: 52000 },
          { category: 'Discovery', count: 2, value: 140000, weighted: 56000, aiAdjusted: 61000 },
          { category: 'Proposal', count: 4, value: 320000, weighted: 192000, aiAdjusted: 175000 },
          { category: 'Negotiation', count: 2, value: 200000, weighted: 160000, aiAdjusted: 168000 },
        ],
        totals: { count: 11, value: 840000, weighted: 453000, aiAdjusted: 456000 },
        wonMTD: { count: 1, value: 95000, weighted: 95000, aiAdjusted: 95000 },
        lostMTD: { count: 1, value: 45000, weighted: 0, aiAdjusted: 0 },
        chartData: [
          { month: 'Jan', Qualified: 40000, Discovery: 30000, Proposal: 20000, Negotiation: 10000 },
          { month: 'Feb', Qualified: 50000, Discovery: 40000, Proposal: 30000, Negotiation: 20000 },
          { month: 'Mar', Qualified: 60000, Discovery: 50000, Proposal: 40000, Negotiation: 30000 },
          { month: 'Apr', Qualified: 70000, Discovery: 60000, Proposal: 50000, Negotiation: 40000 },
        ],
        funnelData: [
          { name: 'Lead', value: 100, conversion: '80%' },
          { name: 'Qualified', value: 80, conversion: '60%' },
          { name: 'Discovery', value: 48, conversion: '50%' },
          { name: 'Proposal', value: 24, conversion: '40%' },
          { name: 'Negotiation', value: 10, conversion: '70%' },
          { name: 'Won', value: 7, conversion: '-' },
        ],
        trendData: [
          { month: 'Oct', revenue: 320000, predicted: null, low: null, high: null },
          { month: 'Nov', revenue: 350000, predicted: null, low: null, high: null },
          { month: 'Dec', revenue: 380000, predicted: null, low: null, high: null },
          { month: 'Jan', revenue: 410000, predicted: null, low: null, high: null },
          { month: 'Feb', revenue: 430000, predicted: null, low: null, high: null },
          { month: 'Mar', revenue: 450000, predicted: 450000, low: 450000, high: 450000 },
          { month: 'Apr', revenue: null, predicted: 480000, low: 460000, high: 500000 },
          { month: 'May', revenue: null, predicted: 510000, low: 480000, high: 540000 },
          { month: 'Jun', revenue: null, predicted: 530000, low: 500000, high: 560000 },
        ],
        insights: [
          { type: 'trend', text: "You're trending 12% ahead of last quarter. Strong momentum in the Enterprise segment." },
          { type: 'warning', text: "3 deals worth $210K have stalled in Proposal stage for 15+ days. Historical data shows deals stalling here have 40% lower close rate." },
          { type: 'idea', text: "To hit your $500K quarterly target, you need to close 2 more deals worth ~$44K each. Best candidates: 1. BrightPath deal ($60K, 68% prob) 2. CloudNine deal ($45K, 55% prob)" },
          { type: 'forecast', text: "Predicted Q1 Revenue: $480K-$540K. Confidence: 78%" }
        ]
      };
    }
    const response = await api.get('/crm/deals/forecast', {
      params: { timePeriod, category, aiConfidence }
    });
    return response.data;
  }
};