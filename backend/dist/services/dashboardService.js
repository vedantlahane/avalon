import prisma from '../client.js';
export const dashboardService = {
    getStats: async () => {
        const [pipelineStats, wonStats, totalDeals, wonDeals, avgDealSize, pipelineByStage, activities, dealsAtRisk, upcomingTasks, upcomingMeetings, leadScores] = await Promise.all([
            prisma.deal.aggregate({
                _sum: { value: true },
                where: { isDeleted: false, NOT: { OR: [{ stage: 'Closed Won' }, { stage: 'Closed Lost' }] } }
            }),
            prisma.deal.aggregate({
                _sum: { value: true },
                where: { isDeleted: false, stage: 'Closed Won' }
            }),
            prisma.deal.count({ where: { isDeleted: false } }),
            prisma.deal.count({ where: { isDeleted: false, stage: 'Closed Won' } }),
            prisma.deal.aggregate({
                _avg: { value: true },
                where: { isDeleted: false, stage: 'Closed Won' }
            }),
            prisma.deal.groupBy({
                by: ['stage'],
                _count: { id: true },
                _sum: { value: true },
                where: { isDeleted: false }
            }),
            prisma.activity.findMany({
                where: { isDeleted: false },
                orderBy: { date: 'desc' },
                take: 5,
                include: { contact: true }
            }),
            prisma.deal.findMany({
                where: { isDeleted: false, probability: { lt: 30 }, NOT: { OR: [{ stage: 'Closed Won' }, { stage: 'Closed Lost' }] } },
                orderBy: { value: 'desc' },
                take: 5
            }),
            prisma.task.findMany({
                where: { isDeleted: false, status: { not: 'Completed' } },
                orderBy: { dueDate: 'asc' },
                take: 5,
                include: { contact: true }
            }),
            prisma.activity.findMany({
                where: { isDeleted: false, type: 'Meeting', date: { gte: new Date() } },
                orderBy: { date: 'asc' },
                take: 5,
                include: { contact: true }
            }),
            prisma.contact.groupBy({
                by: ['leadCategory'],
                _count: { id: true },
                where: { isDeleted: false }
            })
        ]);
        const winRate = totalDeals > 0 ? (wonDeals / totalDeals) * 100 : 0;
        const leadScoreDistribution = [
            { category: 'Hot', count: 0, color: '#EF4444', range: '90-100' },
            { category: 'Warm', count: 0, color: '#F59E0B', range: '70-89' },
            { category: 'Cool', count: 0, color: '#3B82F6', range: '50-69' },
            { category: 'Cold', count: 0, color: '#64748B', range: '0-49' }
        ];
        leadScores.forEach(ls => {
            if (ls.leadCategory === 'Hot Lead')
                leadScoreDistribution[0].count = ls._count.id;
            if (ls.leadCategory === 'Warm Lead')
                leadScoreDistribution[1].count = ls._count.id;
            if (ls.leadCategory === 'Cool Lead')
                leadScoreDistribution[2].count = ls._count.id;
            if (ls.leadCategory === 'Cold Lead' || ls.leadCategory === 'Unqualified')
                leadScoreDistribution[3].count += ls._count.id;
        });
        return {
            stats: {
                pipelineValue: pipelineStats._sum.value || 0,
                pipelineChange: 12,
                dealsWon: wonDeals,
                dealsWonChange: 3,
                dealsWonTarget: 20,
                winRate: parseFloat(winRate.toFixed(1)),
                winRateChange: 2.5,
                winRateIndustry: 28,
                avgDealSize: avgDealSize._avg.value || 0,
                avgDealSizeChange: 8
            },
            revenueForecast: [
                { month: 'Jan', actual: 45000, predicted: 42000, target: 40000, confidenceHigh: 48000, confidenceLow: 38000 },
                { month: 'Feb', actual: 52000, predicted: 50000, target: 45000, confidenceHigh: 55000, confidenceLow: 45000 },
                { month: 'Mar', actual: wonStats._sum.value || 0, predicted: 55000, target: 50000, confidenceHigh: 62000, confidenceLow: 52000 },
                { month: 'Apr', actual: 0, predicted: 65000, target: 55000, confidenceHigh: 75000, confidenceLow: 55000 },
                { month: 'May', actual: 0, predicted: 78000, target: 60000, confidenceHigh: 88000, confidenceLow: 68000 },
                { month: 'Jun', actual: 0, predicted: 85000, target: 65000, confidenceHigh: 95000, confidenceLow: 75000 },
            ],
            pipelineByStage: pipelineByStage.map(stage => ({
                stage: stage.stage,
                count: stage._count.id,
                value: stage._sum.value || 0,
                color: stage.stage === 'Closed Won' ? '#10B981' : stage.stage === 'Lead' ? '#818CF8' : '#6366F1'
            })),
            aiBriefing: {
                goodNews: [{ id: '1', text: 'You achieved 85% of your monthly goal', type: 'success' }],
                needsAttention: [{ id: '2', text: '3 high-value deals are stuck in Discovery phase', type: 'warning' }],
                priorities: [{ id: '3', text: 'Follow up with key accounts', actionLabel: 'Email', actionType: 'email' }]
            },
            activities,
            dealsAtRisk,
            upcomingTasks,
            upcomingMeetings,
            leadScoreDistribution,
            salesLeaderboard: {
                title: 'Top Sales Reps',
                period: 'This Month',
                reps: [
                    { id: 1, rank: 1, name: 'Alex Johnson', revenue: 125000, dealsWon: 12, target: 100000, isCurrentUser: true, status: 'success' },
                    { id: 2, rank: 2, name: 'Sarah Miller', revenue: 98000, dealsWon: 8, target: 90000, status: 'success' },
                    { id: 3, rank: 3, name: 'Michael Chen', revenue: 82000, dealsWon: 6, target: 100000, status: 'warning' }
                ],
                achievements: [],
                aiCoaching: 'Focus on enterprise accounts this week.'
            }
        };
    }
};
