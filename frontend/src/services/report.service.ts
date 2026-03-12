import { api } from '../lib/api';
import { REVENUE_DATA, FUNNEL_DATA, ACTIVITY_DATA, PIPELINE_STAGE_DATA, PIPELINE_COVERAGE, LEAD_SCORE_DATA } from '../data/mockData';

export interface ReportData {
  // ... (keep interface as is)
}

export const reportService = {
  getSalesPerformance: async () => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return {
        revenueOverTime: REVENUE_DATA,
        winLossAnalysis: {
          won: { count: 8, totalValue: 680000, avgSize: 85000, avgCycle: 42 },
          lost: { count: 12, totalValue: 450000, avgSize: 37500, topReason: 'Price too high' },
          lossReasons: [
            { name: 'Price', value: 45 },
            { name: 'Features', value: 25 },
            { name: 'Competitor', value: 20 },
            { name: 'Timing', value: 10 }
          ]
        },
        salesVelocity: {
          current: 42500,
          previous: 38000,
          components: {
            activeDeals: 24,
            avgValue: 65000,
            winRate: 0.45,
            salesCycle: 35
          },
          aiRecommendation: 'Focus on increasing your win rate for deals over $50k to boost velocity by 15%.'
        }
      };
    }
    const response = await api.get('/crm/reports/sales-performance');
    return response.data;
  },

  getPipelineAnalysis: async () => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return {
        funnel: FUNNEL_DATA,
        stageDuration: [
          { stage: 'Lead', days: 5, benchmark: 4 },
          { stage: 'Qualified', days: 8, benchmark: 10 },
          { stage: 'Discovery', days: 15, benchmark: 12 },
          { stage: 'Proposal', days: 12, benchmark: 14 },
          { stage: 'Negotiation', days: 22, benchmark: 10 },
        ],
        pipelineCoverage: {
          ratio: PIPELINE_COVERAGE.current,
          historical: [2.1, 2.3, 2.2, 2.4]
        },
        stageData: PIPELINE_STAGE_DATA
      };
    }
    const response = await api.get('/crm/reports/pipeline-analysis');
    return response.data;
  },

  getActivityReports: async () => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return {
        activityVolume: ACTIVITY_DATA,
        responseTime: {
          average: 45,
          bySource: [
            { time: 15, winRate: 75, source: 'Website' },
            { time: 120, winRate: 35, source: 'LinkedIn' },
            { time: 60, winRate: 55, source: 'Referral' },
            { time: 240, winRate: 20, source: 'Cold Email' },
          ],
          aiInsight: 'Leads responded to within 30 minutes have a 3.5x higher win rate than those responded to after 2 hours.'
        },
        communicationEffectiveness: {
          metrics: { openRate: 0.68, clickRate: 0.24, replyRate: 0.12 },
          bestTemplates: [
            { name: 'Post-Demo Follow Up', rate: '85%' },
            { name: 'Initial Introduction', rate: '42%' },
            { name: 'Enterprise Proposal', rate: '85%' },
          ],
          bestTime: 'Tuesday at 10:00 AM'
        }
      };
    }
    const response = await api.get('/crm/reports/activity-reports');
    return response.data;
  },

  getContactAnalytics: async () => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return {
        leadSourcePerformance: [
          { name: 'Website', value: 45 },
          { name: 'LinkedIn', value: 32 },
          { name: 'Referral', value: 25 },
          { name: 'Event', value: 18 },
          { name: 'Partner', value: 12 },
        ],
        leadScoreDistribution: LEAD_SCORE_DATA
      };
    }
    const response = await api.get('/crm/reports/contact-analytics');
    return response.data;
  },

  getAiInsights: async () => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return {
        predictions: {
          nextQuarterRevenue: 1450000,
          confidence: 0.88
        },
        recommendedFocus: [
          'Prioritize Acme Technologies ($120k) - high engagement detected',
          'Follow up with RetailMax - stalled in Proposal for 12 days',
          'Increase outreach in the Healthcare sector - 25% higher win rate'
        ],
        likelyToClose: [
          { name: 'Acme Enterprise', value: 120000, prob: 0.92 },
          { name: 'BrightPath API', value: 45000, prob: 0.85 },
        ],
        likelyToLose: [
          { name: 'Quantum Finance', value: 80000, reason: 'Negative sentiment' },
          { name: 'EduVerse Classroom', value: 55000, reason: 'Stalled for 15 days' },
        ],
        likelyToChurn: [
          { name: 'John Smith', company: 'Acme', signal: 'Reduced logins' },
          { name: 'Sarah Chen', company: 'Quantum', signal: 'Negative email tone' },
        ]
      };
    }
    const response = await api.get('/crm/reports/ai-insights');
    return response.data;
  },
  queryAi: async (query: string) => {
    const response = await api.post('/crm/reports/ai-query', { query });
    return response.data;
  }
};
