import prisma from '../client.js';

export const activityService = {
  getActivities: async (filters: { contactId?: number; dealId?: number } = {}) => {
    const where: any = { isDeleted: false };
    if (filters.contactId) where.contactId = filters.contactId;
    if (filters.dealId) where.dealId = filters.dealId;

    return await prisma.activity.findMany({
      where,
      include: {
        contact: true,
        deal: true
      },
      orderBy: {
        date: 'desc'
      }
    });
  },

  getActivityById: async (id: number) => {
    return await prisma.activity.findUnique({
      where: { id }
    });
  },

  createActivity: async (data: any) => {
    return await prisma.activity.create({
      data
    });
  },

  updateActivity: async (id: number, data: any) => {
    return await prisma.activity.update({
      where: { id },
      data
    });
  },

  deleteActivity: async (id: number) => {
    return await prisma.activity.update({
      where: { id },
      data: { isDeleted: true }
    });
  }
};
