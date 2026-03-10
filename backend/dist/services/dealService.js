import prisma from '../client.js';
export const dealService = {
    getDeals: async () => {
        return await prisma.deal.findMany({
            include: {
                contact: true,
                company: true
            }
        });
    },
    getDealById: async (id) => {
        return await prisma.deal.findUnique({
            where: { id },
            include: {
                contact: true,
                company: true,
                activities: true,
                tasks: true
            }
        });
    },
    createDeal: async (data) => {
        return await prisma.deal.create({
            data
        });
    },
    updateDeal: async (id, data) => {
        return await prisma.deal.update({
            where: { id },
            data
        });
    },
    deleteDeal: async (id) => {
        return await prisma.deal.update({
            where: { id },
            data: { isDeleted: true }
        });
    }
};
