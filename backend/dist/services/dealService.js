import prisma from '../client.js';
export const dealService = {
    getDeals: async () => {
        return await prisma.deal.findMany({
            where: { isDeleted: false },
            include: {
                contact: true,
                company: true,
                lineItems: {
                    where: { isDeleted: false }
                }
            }
        });
    },
    getDealById: async (id) => {
        return await prisma.deal.findUnique({
            where: { id },
            include: {
                contact: true,
                company: true,
                activities: {
                    where: { isDeleted: false }
                },
                tasks: {
                    where: { isDeleted: false }
                },
                lineItems: {
                    where: { isDeleted: false }
                }
            }
        });
    },
    createDeal: async (data) => {
        const { lineItems, ...dealData } = data;
        return await prisma.deal.create({
            data: {
                ...dealData,
                lineItems: lineItems && lineItems.length > 0 ? {
                    create: lineItems.map((item) => ({
                        productName: item.productName,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                        total: item.total
                    }))
                } : undefined
            },
            include: {
                lineItems: {
                    where: { isDeleted: false }
                }
            }
        });
    },
    updateDeal: async (id, data) => {
        const { lineItems, ...dealData } = data;
        if (lineItems) {
            // Soft delete all existing line items first
            await prisma.lineItem.updateMany({
                where: { dealId: id },
                data: { isDeleted: true }
            });
        }
        return await prisma.deal.update({
            where: { id },
            data: {
                ...dealData,
                lineItems: lineItems && lineItems.length > 0 ? {
                    create: lineItems.map((item) => ({
                        productName: item.productName,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                        total: item.total
                    }))
                } : undefined
            },
            include: {
                lineItems: {
                    where: { isDeleted: false }
                }
            }
        });
    },
    deleteDeal: async (id) => {
        return await prisma.deal.update({
            where: { id },
            data: { isDeleted: true }
        });
    },
    bulkUpdateDeals: async (ids, data) => {
        return await prisma.deal.updateMany({
            where: { id: { in: ids } },
            data: data
        });
    },
    bulkDeleteDeals: async (ids) => {
        return await prisma.deal.updateMany({
            where: { id: { in: ids } },
            data: { isDeleted: true }
        });
    },
    getForecast: async (timePeriod, category, aiConfidence) => {
        // In a real application, we would use timePeriod and category to filter and group deals
        // For this prototype, we return realistic data matching the UI requirements
        const tableData = [
            { category: 'Qualified', count: 3, value: 180000, weighted: 45000, aiAdjusted: 52000 },
            { category: 'Discovery', count: 2, value: 140000, weighted: 56000, aiAdjusted: 61000 },
            { category: 'Proposal', count: 4, value: 320000, weighted: 192000, aiAdjusted: 175000 },
            { category: 'Negotiation', count: 2, value: 200000, weighted: 160000, aiAdjusted: 168000 },
        ];
        const totals = { count: 11, value: 840000, weighted: 453000, aiAdjusted: 456000 };
        const wonMTD = { count: 1, value: 95000, weighted: 95000, aiAdjusted: 95000 };
        const lostMTD = { count: 1, value: 45000, weighted: 0, aiAdjusted: 0 };
        const chartData = [
            { month: 'Jan', Qualified: 40000, Discovery: 30000, Proposal: 20000, Negotiation: 10000 },
            { month: 'Feb', Qualified: 50000, Discovery: 40000, Proposal: 30000, Negotiation: 20000 },
            { month: 'Mar', Qualified: 60000, Discovery: 50000, Proposal: 40000, Negotiation: 30000 },
            { month: 'Apr', Qualified: 70000, Discovery: 60000, Proposal: 50000, Negotiation: 40000 },
            { month: 'May', Qualified: 80000, Discovery: 70000, Proposal: 60000, Negotiation: 50000 },
            { month: 'Jun', Qualified: 90000, Discovery: 80000, Proposal: 70000, Negotiation: 60000 },
        ];
        const funnelData = [
            { name: 'Lead', value: 100, conversion: '80%' },
            { name: 'Qualified', value: 80, conversion: '60%' },
            { name: 'Discovery', value: 48, conversion: '50%' },
            { name: 'Proposal', value: 24, conversion: '40%' },
            { name: 'Negotiation', value: 10, conversion: '70%' },
            { name: 'Won', value: 7, conversion: '-' },
        ];
        const trendData = [
            { month: 'Oct', revenue: 320000, predicted: null, low: null, high: null },
            { month: 'Nov', revenue: 350000, predicted: null, low: null, high: null },
            { month: 'Dec', revenue: 380000, predicted: null, low: null, high: null },
            { month: 'Jan', revenue: 410000, predicted: null, low: null, high: null },
            { month: 'Feb', revenue: 430000, predicted: null, low: null, high: null },
            { month: 'Mar', revenue: 450000, predicted: 450000, low: 450000, high: 450000 },
            { month: 'Apr', revenue: null, predicted: 480000, low: 460000, high: 500000 },
            { month: 'May', revenue: null, predicted: 510000, low: 480000, high: 540000 },
            { month: 'Jun', revenue: null, predicted: 530000, low: 500000, high: 560000 },
        ];
        const insights = [
            { type: 'trend', text: "You're trending 12% ahead of last quarter. Strong momentum in the Enterprise segment." },
            { type: 'warning', text: "3 deals worth $210K have stalled in Proposal stage for 15+ days. Historical data shows deals stalling here have 40% lower close rate." },
            { type: 'idea', text: "To hit your $500K quarterly target, you need to close 2 more deals worth ~$44K each. Best candidates: 1. BrightPath deal ($60K, 68% prob) 2. CloudNine deal ($45K, 55% prob)" },
            { type: 'forecast', text: "Predicted Q1 Revenue: $480K-$540K. Confidence: 78%" }
        ];
        return {
            tableData,
            totals,
            wonMTD,
            lostMTD,
            chartData,
            funnelData,
            trendData,
            insights
        };
    }
};
