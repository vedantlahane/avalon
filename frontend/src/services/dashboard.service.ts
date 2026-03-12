import { DashboardData } from '../types';
import { MOCK_DEALS, MOCK_ACTIVITIES, MOCK_TASKS } from '../data/mockData';

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    // Simulate API call
    return {
      stats: {
        pipelineValue: 1245000,
        pipelineChange: 12,
        dealsWon: 8,
        dealsWonChange: 3,
        dealsWonTarget: 12,
        winRate: 45,
        winRateChange: -5,
        winRateIndustry: 38,
        avgDealSize: 62500,
        avgDealSizeChange: 8,
      },
      revenueForecast: [
        { month: 'Oct', actual: 45000, predicted: 42000, target: 50000, confidenceHigh: 48000, confidenceLow: 42000 },
        { month: 'Nov', actual: 52000, predicted: 45000, target: 50000, confidenceHigh: 55000, confidenceLow: 48000 },
        { month: 'Dec', actual: 61000, predicted: 52000, target: 60000, confidenceHigh: 65000, confidenceLow: 58000 },
        { month: 'Jan', actual: 58000, predicted: 61000, target: 60000, confidenceHigh: 62000, confidenceLow: 55000 },
        { month: 'Feb', actual: 95000, predicted: 58000, target: 70000, confidenceHigh: 98000, confidenceLow: 92000 },
        { month: 'Mar', actual: 142000, predicted: 150000, target: 150000, confidenceHigh: 155000, confidenceLow: 135000 },
        { month: 'Apr', actual: 0, predicted: 165000, target: 150000, confidenceHigh: 180000, confidenceLow: 150000 },
      ],
      pipelineByStage: [
        { stage: 'Lead', count: 2, value: 165000, color: '#94a3b8' },
        { stage: 'Qualified', count: 2, value: 35000, color: '#6366f1' },
        { stage: 'Discovery', count: 2, value: 110000, color: '#8b5cf6' },
        { stage: 'Proposal', count: 2, value: 175000, color: '#a855f7' },
        { stage: 'Negotiation', count: 1, value: 80000, color: '#ec4899' },
        { stage: 'Closed Won', count: 1, value: 95000, color: '#10b981' },
      ],
      aiBriefing: {
        goodNews: [
          { id: '1', text: 'Won GreenLeaf Energy deal ($95K) 2 weeks ago', type: 'success' },
          { id: '2', text: 'New hot lead detected: Alice Wong (EduStream, score: 72)', type: 'success' },
          { id: '3', text: 'Mike Ross (CloudNine) scheduled demo for Wednesday 3 PM', type: 'info' },
        ],
        needsAttention: [
          { id: '4', text: 'Acme Technologies ($120K) - 7 days inactive, needs follow-up', type: 'warning' },
          { id: '5', text: 'Quantum Finance ($80K) - Sarah Chen pricing concerns (sentiment drop)', type: 'danger' },
          { id: '6', text: 'Beta Inc ($55K) - proposal sent 14 days ago, currently stalled', type: 'warning' },
        ],
        priorities: [
          { id: '7', text: 'Call Sarah Chen (Quantum) - address pricing concerns URGENTLY', actionLabel: 'Start Call', actionType: 'call', target: 'Sarah Chen' },
          { id: '8', text: 'Follow up Acme deal - send implementation timeline to John Smith', actionLabel: 'Draft Email', actionType: 'email', target: 'Acme Technologies' },
          { id: '9', text: 'Prepare for CloudNine demo - Wednesday Mar 18 at 3:00 PM', actionLabel: 'View Meeting', actionType: 'meeting', target: 'CloudNine' },
        ],
      },
      activities: MOCK_ACTIVITIES.slice(0, 10),
      dealsAtRisk: MOCK_DEALS.filter(d => ['Acme Technologies - Enterprise Plan', 'Quantum Finance - Platform License', 'Beta Inc Growth Deal'].includes(d.name)),
      upcomingTasks: MOCK_TASKS.filter(t => t.status !== 'Completed').slice(0, 5),
      upcomingMeetings: [
        { id: 99, type: 'Meeting', title: 'CloudNine Demo', description: 'Technical walkthrough with Mike Ross', date: '2026-03-18T15:00:00Z', contactId: 3, dealId: 3, outcome: 'Scheduled' } as any
      ],
      leadScoreDistribution: [
        { category: 'Hot', count: 12, color: '#ef4444', range: '90-100' },
        { category: 'Warm', count: 35, color: '#f59e0b', range: '70-89' },
        { category: 'Cool', count: 29, color: '#6366f1', range: '50-69' },
        { category: 'Cold', count: 24, color: '#94a3b8', range: '0-49' },
      ],
      salesLeaderboard: {
        title: 'Sales Leaderboard - March 2026',
        period: 'This Month',
        reps: [
          { id: 1, rank: 1, name: 'Alex Johnson', revenue: 185000, dealsWon: 8, target: 120, status: 'success' },
          { id: 2, rank: 2, name: 'You (Demo User)', revenue: 142000, dealsWon: 6, target: 95, isCurrentUser: true, status: 'info' },
          { id: 3, rank: 3, name: 'Maria Garcia', revenue: 128000, dealsWon: 5, target: 85, status: 'info' },
          { id: 4, rank: 4, name: 'David Kim', revenue: 98000, dealsWon: 4, target: 65, status: 'warning' },
          { id: 5, rank: 5, name: 'Lisa Wang', revenue: 76000, dealsWon: 3, target: 51, status: 'warning' },
        ],
        achievements: [
          { id: '1', icon: '🔥', title: 'Hot Streak', description: '3 deals won in a row' },
          { id: '2', icon: '📧', title: 'Email Pro', description: '90%+ open rate this month' },
          { id: '3', icon: '⚡', title: 'Speed Demon', description: 'Fastest deal close (12 days)' },
          { id: '4', icon: '🎯', title: 'Sharpshooter', description: '60%+ win rate' },
        ],
        aiCoaching: "You're only $8K away from hitting your monthly target! The Acme Technologies deal ($120K) is in Proposal stage and very close. Following up on the implementation timeline John requested could seal the win before March 15.",
      },
    };
  }
};