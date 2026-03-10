import { DashboardData, Deal, Activity, Task } from '../types';
import { MOCK_DEALS, MOCK_CONTACTS, MOCK_ACTIVITIES, MOCK_TASKS } from '../data/mockData';

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
        { month: 'Jan', actual: 400000, predicted: 410000, target: 450000, confidenceHigh: 420000, confidenceLow: 400000 },
        { month: 'Feb', actual: 480000, predicted: 460000, target: 450000, confidenceHigh: 480000, confidenceLow: 440000 },
        { month: 'Mar', actual: 520000, predicted: 510000, target: 450000, confidenceHigh: 540000, confidenceLow: 480000 },
        { month: 'Apr', actual: 0, predicted: 550000, target: 500000, confidenceHigh: 600000, confidenceLow: 500000 },
        { month: 'May', actual: 0, predicted: 580000, target: 500000, confidenceHigh: 650000, confidenceLow: 510000 },
        { month: 'Jun', actual: 0, predicted: 620000, target: 500000, confidenceHigh: 700000, confidenceLow: 540000 },
      ],
      pipelineByStage: [
        { stage: 'Lead', count: 12, value: 150000, color: '#9CA3AF' },
        { stage: 'Qualified', count: 8, value: 240000, color: '#3B82F6' },
        { stage: 'Discovery', count: 6, value: 180000, color: '#6366F1' },
        { stage: 'Proposal', count: 4, value: 320000, color: '#8B5CF6' },
        { stage: 'Negotiation', count: 3, value: 210000, color: '#F59E0B' },
        { stage: 'Closed Won', count: 8, value: 500000, color: '#10B981' },
      ],
      aiBriefing: {
        goodNews: [
          { id: '1', text: 'BrightPath deal moved to Proposal ($60K, probability now 65%)', type: 'success' },
          { id: '2', text: '3 new leads added from website', type: 'success' },
          { id: '3', text: 'Email open rate up 12% this week', type: 'info' },
        ],
        needsAttention: [
          { id: '4', text: 'Quantum Finance - negative email received', type: 'warning', sentiment: 'frustrated' },
          { id: '5', text: '2 deals stalled for 10+ days', type: 'warning' },
          { id: '6', text: '3 overdue tasks need completion', type: 'danger' },
        ],
        priorities: [
          { id: '7', text: 'Call Sarah Chen (Quantum) - address concerns', actionLabel: 'Start Call', actionType: 'call', target: 'Sarah Chen' },
          { id: '8', text: 'Follow up Acme deal - send proposal', actionLabel: 'Draft Email', actionType: 'email', target: 'Acme Technologies' },
          { id: '9', text: 'Prepare for CloudNine demo at 3 PM', actionLabel: 'View Meeting', actionType: 'meeting', target: 'CloudNine' },
        ],
      },
      activities: MOCK_ACTIVITIES.slice(0, 10),
      dealsAtRisk: MOCK_DEALS.filter(d => d.priority === 'Critical' || d.priority === 'High').slice(0, 5),
      upcomingTasks: MOCK_TASKS.filter(t => t.status !== 'Completed').slice(0, 5),
      upcomingMeetings: MOCK_ACTIVITIES.filter(a => a.type === 'Meeting' || a.type === 'Demo').slice(0, 3),
      leadScoreDistribution: [
        { category: 'Hot', count: 15, color: '#10B981', range: '80-100' },
        { category: 'Warm', count: 25, color: '#3B82F6', range: '60-79' },
        { category: 'Cool', count: 30, color: '#EAB308', range: '40-59' },
        { category: 'Cold', count: 20, color: '#9CA3AF', range: '0-39' },
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
        aiCoaching: "You're $8K away from hitting your monthly target! The CloudNine deal ($45K, 55% probability) is your best bet. Focus on scheduling the technical review this week.",
      },
    };
  }
};
