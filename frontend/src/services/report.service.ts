import { api } from '../lib/api';

export interface ReportData {
  salesPerformance: {
    revenueOverTime: any[];
    winLossAnalysis: {
      won: any;
      lost: any;
      lossReasons: any[];
    };
    salesVelocity: {
      current: number;
      previous: number;
      components: any;
      aiRecommendation: string;
    };
  };
  pipelineAnalysis: {
    funnel: any[];
    stageDuration: any[];
    pipelineCoverage: {
      ratio: number;
      historical: any[];
    };
  };
  activityReports: {
    activityVolume: any[];
    responseTime: {
      average: number;
      bySource: any[];
      correlation: any[];
      aiInsight: string;
    };
    communicationEffectiveness: {
      metrics: any;
      bestTemplates: any[];
      bestTime: string;
      aiImprovements: string;
    };
  };
  contactAnalytics: {
    leadSourcePerformance: any[];
    leadScoreDistribution: any[];
  };
  aiInsights: {
    predictions: any;
    likelyToClose: any[];
    likelyToLose: any[];
    likelyToChurn: any[];
    recommendedFocus: string[];
  };
}

export const reportService = {
  getSalesPerformance: async () => {
    const response = await api.get('/reports/sales-performance');
    return response.data;
  },
  getPipelineAnalysis: async () => {
    const response = await api.get('/reports/pipeline-analysis');
    return response.data;
  },
  getActivityReports: async () => {
    const response = await api.get('/reports/activity-reports');
    return response.data;
  },
  getContactAnalytics: async () => {
    const response = await api.get('/reports/contact-analytics');
    return response.data;
  },
  getAiInsights: async () => {
    const response = await api.get('/reports/ai-insights');
    return response.data;
  },
  queryAi: async (query: string) => {
    const response = await api.post('/reports/ai-query', { query });
    return response.data;
  }
};
