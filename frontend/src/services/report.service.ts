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
        lastAnalyzed: new Date().toISOString(),
        executiveSummary: {
          title: "March Performance & Pipeline Health",
          content: "Your pipeline is currently valued at $1.24M, with a strong focus on the Technology sector. While March revenue is tracking well ($142K vs $150K target), two high-value deals (Acme and Quantum) are at critical stages. Acme ($120K) is highly likely to close if technical validation is completed by March 15th, but Quantum ($80K) shows significant sentiment risk that needs immediate personal intervention.",
          confidence: 92,
          dataPointsCount: 456
        },
        actionItems: [
          { 
            id: '1', 
            priority: 'High', 
            priorityLabel: 'URGENT', 
            action: 'Call Sarah Chen (Quantum Finance)', 
            description: 'Address pricing concerns and CompetitorX comparison raised in her latest email.', 
            type: 'Call', 
            impact: 'High', 
            effort: '15 mins' 
          },
          { 
            id: '2', 
            priority: 'High', 
            priorityLabel: 'High', 
            action: 'Draft implementation timeline for John Smith', 
            description: 'John requested this to proceed with the technical deep-dive and sign-off.', 
            type: 'Email', 
            impact: 'High', 
            effort: '30 mins' 
          },
          { 
            id: '3', 
            priority: 'Medium', 
            priorityLabel: 'Medium', 
            action: 'Prep for CloudNine Demo', 
            description: 'Scheduled for Wednesday at 3:00 PM. Focus on multi-region data sync.', 
            type: 'Meeting', 
            impact: 'Med', 
            effort: '45 mins' 
          },
          { 
            id: '4', 
            priority: 'Low', 
            priorityLabel: 'Low', 
            action: 'Enrich leads from EduStream', 
            description: 'New leads from LinkedIn event need demographic and behavioral scoring.', 
            type: 'Enrichment', 
            impact: 'Low', 
            effort: '5 mins' 
          }
        ],
        dealsAtRisk: [
          { 
            id: 2, 
            name: 'Quantum Finance - Platform License', 
            value: 80000, 
            riskLevel: 'HIGH', 
            riskScore: 88, 
            riskFactors: ['Negative sentiment in recent email', 'CompetitorX mentioned', 'Decision maker silence'], 
            probabilityChange: { from: 68, to: 45 }, 
            suggested: 'Personal outreach from manager or executive to discuss volume discounting.' 
          },
          { 
            id: 5, 
            name: 'Beta Inc Growth Deal', 
            value: 55000, 
            riskLevel: 'MODERATE', 
            riskScore: 62, 
            riskFactors: ['14 days since last contact', 'Proposal stage stalling', 'SMB sector volatility'], 
            probabilityChange: { from: 55, to: 38 }, 
            suggested: 'Send a "Priorities Shifted?" re-engagement email using the stalled deal template.' 
          },
          { 
            id: 1, 
            name: 'Acme Technologies - Enterprise Plan', 
            value: 120000, 
            riskLevel: 'LOW', 
            riskScore: 25, 
            riskFactors: ['Approaching close date', 'Pending technical validation'], 
            probabilityChange: { from: 72, to: 72 }, 
            suggested: 'Confirm technical deep-dive with CTO to maintain March 15th close date.' 
          }
        ],
        opportunities: [
          { 
            type: 'Upsell', 
            title: 'GreenLeaf Energy - Marketing Module', 
            description: "Successful core implementation and high platform usage suggests readiness for the Marketing Module add-on.", 
            actions: ['Draft Upsell Email', 'Share Case Study'] 
          },
          { 
            type: 'Expansion', 
            title: 'CloudNine - Multi-Region Rollout', 
            description: "Initial demo interest in multi-region data sync suggests potential for a larger infrastructure migration deal.", 
            actions: ['Prepare Custom ROI', 'Book Discovery'] 
          }
        ],
        performanceCoaching: {
          strengths: ['High demo-to-proposal conversion rate (65%)', 'Excellent initial response time on inbound leads', 'Strong technical discovery skills'],
          improvements: ['Closing cycles for deals >$50K are 15% longer than average', 'Pricing objection handling in late-stage negotiation'],
          tip: "When facing pricing objections like Sarah's at Quantum, try anchoring the conversation on ROI and long-term TCO before discussing discounts."
        },
        competitorIntelligence: {
          mentions: [
            { name: 'CompetitorX', count: 3, details: [{ contact: 'Sarah Chen', quote: "CompetitorX is offering a similar feature set for 20% less." }] },
            { name: 'Global CRM', count: 1, details: [{ note: "Mentioned briefly in initial Acme discovery as a legacy system." }] }
          ],
          analysis: "CompetitorX is currently aggressive on pricing to win market share in the Finance sector. Emphasizing our AI-native feature set and deeper platform integration is key to defending against their lower-cost modular offerings."
        }
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
