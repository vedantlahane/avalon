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
    }
};
