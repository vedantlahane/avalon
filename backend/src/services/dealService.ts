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

  getDealById: async (id: number) => {
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

  createDeal: async (data: any) => {
    return await prisma.deal.create({
      data
    });
  },

  updateDeal: async (id: number, data: any) => {
    return await prisma.deal.update({
      where: { id },
      data
    });
  },

  deleteDeal: async (id: number) => {
    return await prisma.deal.update({
      where: { id },
      data: { isDeleted: true }
    });
  }
};
