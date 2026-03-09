import prisma from '../client';
export const dashboardService = {
    getStats: async () => {
        const [totalRevenue, activeDeals, newLeads, totalContacts] = await Promise.all([
            prisma.deal.aggregate({
                _sum: { value: true },
                where: { stage: 'Closed Won' }
            }),
            prisma.deal.count({
                where: { NOT: { OR: [{ stage: 'Closed Won' }, { stage: 'Closed Lost' }] } }
            }),
            prisma.contact.count({
                where: { leadStatus: 'New' }
            }),
            prisma.contact.count()
        ]);
        // Simple conversion rate calculation
        const wonDeals = await prisma.deal.count({ where: { stage: 'Closed Won' } });
        const totalDeals = await prisma.deal.count();
        const conversionRate = totalDeals > 0 ? (wonDeals / totalDeals) * 100 : 0;
        return {
            totalRevenue: totalRevenue._sum.value || 0,
            activeDeals,
            newLeads,
            conversionRate: parseFloat(conversionRate.toFixed(1)),
            pipelineValue: totalRevenue._sum.value || 0 // Simplified
        };
    }
};
