import { DashboardStats } from '../types';
import { MOCK_DEALS, MOCK_CONTACTS } from '../data/mockData';

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    // Simulate API call or aggregation
    const totalRevenue = MOCK_DEALS
      .filter(d => d.stage === 'closed-won')
      .reduce((sum, d) => sum + d.value, 0);
    
    const pipelineValue = MOCK_DEALS
      .filter(d => d.stage !== 'closed-lost' && d.stage !== 'closed-won')
      .reduce((sum, d) => sum + d.value, 0);

    return {
      totalRevenue,
      activeDeals: MOCK_DEALS.length,
      newLeads: MOCK_CONTACTS.filter(c => c.status === 'lead').length,
      conversionRate: 24.5, // Mock value
      pipelineValue,
    };
  }
};
