// No prisma import needed for now as we use simulated data for the prototype

export const reportService = {
  getSalesPerformance: async () => {
    // In a real app, this would involve complex aggregations.
    // We'll simulate data based on existing DB content where possible, or use reasonable defaults.
    
    // Revenue Over Time (Last 12 months)
    const revenueOverTime = [
      { month: 'Apr 25', actual: 320000, lastYear: 280000, predicted: null },
      { month: 'May 25', actual: 350000, lastYear: 310000, predicted: null },
      { month: 'Jun 25', actual: 380000, lastYear: 330000, predicted: null },
      { month: 'Jul 25', actual: 420000, lastYear: 360000, predicted: null },
      { month: 'Aug 25', actual: 450000, lastYear: 390000, predicted: null },
      { month: 'Sep 25', actual: 480000, lastYear: 410000, predicted: null },
      { month: 'Oct 25', actual: 510000, lastYear: 440000, predicted: null },
      { month: 'Nov 25', actual: 550000, lastYear: 470000, predicted: null },
      { month: 'Dec 25', actual: 610000, lastYear: 520000, predicted: null },
      { month: 'Jan 26', actual: 580000, lastYear: 510000, predicted: null },
      { month: 'Feb 26', actual: 640000, lastYear: 550000, predicted: null },
      { month: 'Mar 26', actual: 680000, lastYear: 590000, predicted: 680000 },
      { month: 'Apr 26', actual: null, lastYear: 620000, predicted: 720000 },
      { month: 'May 26', actual: null, lastYear: 650000, predicted: 760000 },
      { month: 'Jun 26', actual: null, lastYear: 690000, predicted: 810000 },
    ];

    const lossReasons = [
      { name: 'Budget', value: 30 },
      { name: 'Competitor', value: 25 },
      { name: 'Timing', value: 20 },
      { name: 'No decision', value: 15 },
      { name: 'Other', value: 10 },
    ];

    return {
      revenueOverTime,
      winLossAnalysis: {
        won: { count: 8, totalValue: 645000, avgSize: 80625, avgCycle: 42 },
        lost: { count: 10, totalValue: 820000, topReason: 'Budget' },
        lossReasons
      },
      salesVelocity: {
        current: 2450,
        previous: 2180,
        components: {
          activeDeals: 25,
          avgValue: 85000,
          winRate: 0.45,
          salesCycle: 38
        },
        aiRecommendation: "To increase velocity by 20%, focus on reducing sales cycle. Your Discovery → Proposal transition takes 12 days vs 7-day benchmark."
      }
    };
  },

  getPipelineAnalysis: async () => {
    const funnel = [
      { value: 100, name: 'Lead', label: '100%', count: 100, stageValue: 1200000 },
      { value: 65, name: 'Qualified', label: '65%', count: 65, stageValue: 845000 },
      { value: 40, name: 'Discovery', label: '62%', count: 40, stageValue: 620000 },
      { value: 25, name: 'Proposal', label: '63%', count: 25, stageValue: 480000 },
      { value: 15, name: 'Negotiation', label: '60%', count: 15, stageValue: 320000 },
      { value: 8, name: 'Won', label: '53%', count: 8, stageValue: 210000 },
    ];

    const stageDuration = [
      { stage: 'Lead', days: 4, benchmark: 3 },
      { stage: 'Qualified', days: 12, benchmark: 8 },
      { stage: 'Discovery', days: 15, benchmark: 10 },
      { stage: 'Proposal', days: 10, benchmark: 7 },
      { stage: 'Negotiation', days: 7, benchmark: 5 },
    ];

    return {
      funnel,
      stageDuration,
      pipelineCoverage: {
        ratio: 2.4,
        historical: [
          { m: 'Oct', v: 2.1 },
          { m: 'Nov', v: 2.3 },
          { m: 'Dec', v: 2.8 },
          { m: 'Jan', v: 2.5 },
          { m: 'Feb', v: 2.2 },
          { m: 'Mar', v: 2.4 },
        ]
      }
    };
  },

  getActivityReports: async () => {
    return {
      activityVolume: [
        { week: 'W1', Emails: 45, Calls: 20, Meetings: 8, Demos: 4, Notes: 15 },
        { week: 'W2', Emails: 52, Calls: 25, Meetings: 12, Demos: 6, Notes: 18 },
        { week: 'W3', Emails: 38, Calls: 18, Meetings: 10, Demos: 5, Notes: 12 },
        { week: 'W4', Emails: 65, Calls: 32, Meetings: 15, Demos: 8, Notes: 25 },
      ],
      responseTime: {
        average: 15.5,
        bySource: [
          { source: 'Website', time: 5, winRate: 65 },
          { source: 'LinkedIn', time: 15, winRate: 42 },
          { source: 'Referral', time: 30, winRate: 38 },
          { source: 'Cold Outreach', time: 120, winRate: 22 },
          { source: 'Events', time: 240, winRate: 15 },
        ],
        aiInsight: "Leads contacted within 5 minutes have 3x higher conversion rate than those contacted after 30 minutes."
      },
      communicationEffectiveness: {
        metrics: { openRate: 0.68, clickRate: 0.24, replyRate: 0.18 },
        bestTemplates: [
          { name: 'Post-Demo Follow Up', rate: '72%' },
          { name: 'Enterprise Proposal', rate: '68%' },
          { name: 'Quick Intro', rate: '45%' },
        ],
        bestTime: 'Tuesday 10:15 AM',
        aiImprovements: "Personalize the first sentence based on the contact's recent LinkedIn activity to increase open rates by 15%."
      }
    };
  },

  getContactAnalytics: async () => {
    return {
      leadSourcePerformance: [
        { name: 'LinkedIn', value: 45, revenue: 180000, rate: 12 },
        { name: 'Website', value: 35, revenue: 240000, rate: 18 },
        { name: 'Referral', value: 25, revenue: 320000, rate: 25 },
        { name: 'Event', value: 20, revenue: 150000, rate: 10 },
        { name: 'Cold Outreach', value: 15, revenue: 90000, rate: 8 },
      ],
      leadScoreDistribution: [
        { name: 'Week 1', hot: 20, warm: 30, cool: 35, cold: 15 },
        { name: 'Week 2', hot: 25, warm: 35, cool: 25, cold: 15 },
        { name: 'Week 3', hot: 30, warm: 40, cool: 20, cold: 10 },
        { name: 'Week 4', hot: 35, warm: 45, cool: 15, cold: 5 },
      ]
    };
  },

  getAiInsights: async () => {
    return {
      predictions: {
        nextQuarterRevenue: 1850000,
        confidence: 0.78,
        momentum: 0.12
      },
      likelyToClose: [
        { name: 'Acme Enterprise', value: 120000, prob: 0.82 },
        { name: 'Quantum Analytics', value: 85000, prob: 0.78 },
        { name: 'BrightPath Sync', value: 45000, prob: 0.75 },
      ],
      likelyToLose: [
        { name: 'RetailMax E-comm', value: 120000, reason: 'Stalled 18d' },
        { name: 'EduVerse Learning', value: 55000, reason: 'Competitor' },
        { name: 'CloudNine Migr.', value: 60000, reason: 'No activity 10d' },
      ],
      likelyToChurn: [
        { name: 'Sarah Chen', company: 'Acme', signal: 'Sentiment Drop' },
        { name: 'Jessica Williams', company: 'RetailMax', signal: 'Unresponsive' },
        { name: 'Michael Rodriguez', company: 'BrightPath', signal: 'Delayed Sign-off' },
      ],
      recommendedFocus: [
        'Enterprise segment is trending 12% above forecast',
        'Healthcare deals have a 15% higher close rate this month',
        'Leads from Web Events convert 2x faster than average'
      ]
    };
  }
};
