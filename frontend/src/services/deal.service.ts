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
          { category: 'Lead', count: 2, value: 165000, weighted: 16500, aiAdjusted: 18000 },
          { category: 'Qualified', count: 2, value: 35000, weighted: 8750, aiAdjusted: 10000 },
          { category: 'Discovery', count: 2, value: 110000, weighted: 44000, aiAdjusted: 52000 },
          { category: 'Proposal', count: 2, value: 175000, weighted: 105000, aiAdjusted: 98000 },
          { category: 'Negotiation', count: 1, value: 80000, weighted: 64000, aiAdjusted: 36000 },
        ],
        totals: { count: 9, value: 565000, weighted: 238250, aiAdjusted: 214000 },
        wonMTD: { count: 1, value: 95000, weighted: 95000, aiAdjusted: 95000 },
        lostMTD: { count: 1, value: 45000, weighted: 0, aiAdjusted: 0 },
        chartData: [
          { month: 'Oct', Qualified: 40000, Discovery: 30000, Proposal: 20000, Negotiation: 10000 },
          { month: 'Nov', Qualified: 50000, Discovery: 40000, Proposal: 30000, Negotiation: 20000 },
          { month: 'Dec', Qualified: 60000, Discovery: 50000, Proposal: 40000, Negotiation: 30000 },
          { month: 'Jan', Qualified: 70000, Discovery: 60000, Proposal: 50000, Negotiation: 40000 },
          { month: 'Feb', Qualified: 80000, Discovery: 70000, Proposal: 60000, Negotiation: 50000 },
          { month: 'Mar', Qualified: 90000, Discovery: 80000, Proposal: 70000, Negotiation: 60000 },
        ],
        funnelData: [
          { name: 'Lead', value: 100, conversion: '80%' },
          { name: 'Qualified', value: 80, conversion: '60%' },
          { name: 'Discovery', value: 48, conversion: '50%' },
          { name: 'Proposal', value: 24, conversion: '40%' },
          { name: 'Negotiation', value: 10, conversion: '70%' },
          { name: 'Won', value: 8, conversion: '-' },
        ],
        trendData: [
          { month: 'Oct', revenue: 45000, predicted: null, low: null, high: null },
          { month: 'Nov', revenue: 52000, predicted: null, low: null, high: null },
          { month: 'Dec', revenue: 61000, predicted: null, low: null, high: null },
          { month: 'Jan', revenue: 58000, predicted: null, low: null, high: null },
          { month: 'Feb', revenue: 95000, predicted: null, low: null, high: null },
          { month: 'Mar', revenue: 142000, predicted: 142000, low: 142000, high: 142000 },
          { month: 'Apr', revenue: null, predicted: 165000, low: 150000, high: 180000 },
          { month: 'May', revenue: null, predicted: 180000, low: 160000, high: 200000 },
        ],
        insights: [
          { type: 'trend', text: "You're trending 15% ahead of your quarterly target. The GreenLeaf Energy win ($95K) provided a significant boost." },
          { type: 'warning', text: "Quantum Finance ($80K) shows sentiment risk. AI adjusted value down by 55% to reflect current negotiation friction." },
          { type: 'idea', text: "To hit your $150K monthly target, you need to close Acme Technologies ($120K). Best strategy: Deliver implementation timeline by end of today as requested by John Smith." },
          { type: 'forecast', text: "Predicted Q1 Revenue: $420K-$480K. Confidence: 92%" }
        ]
      };
    }
    const response = await api.get('/crm/deals/forecast', {
      params: { timePeriod, category, aiConfidence }
    });
    return response.data;
  }
};