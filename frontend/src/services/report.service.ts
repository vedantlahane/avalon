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
    lastAnalyzed: string;
    executiveSummary: {
      title: string;
      content: string;
      confidence: number;
      dataPointsCount: number;
    };
    actionItems: any[];
    dealsAtRisk: any[];
    opportunities: any[];
    performanceCoaching: {
      strengths: string[];
      improvements: string[];
      tip: string;
    };
    competitorIntelligence: {
      mentions: any[];
      analysis: string;
      strategy: string;
    };
  };
}

export const reportService = {
  getSalesPerformance: async () => {
    const response = await api.get('/crm/reports/sales-performance');
    return response.data;
  },
  getPipelineAnalysis: async () => {
    const response = await api.get('/crm/reports/pipeline-analysis');
    return response.data;
  },
  getActivityReports: async () => {
    const response = await api.get('/crm/reports/activity-reports');
    return response.data;
  },
  getContactAnalytics: async () => {
    const response = await api.get('/crm/reports/contact-analytics');
    return response.data;
  },
  getAiInsights: async () => {
    const response = await api.get('/crm/reports/ai-insights');
    return response.data;
  },
  queryAi: async (query: string) => {
    const response = await api.post('/crm/reports/ai-query', { query });
    return response.data;
  }
};
