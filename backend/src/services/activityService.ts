import prisma from '../client.js';

export const activityService = {
  getActivities: async () => {
    return await prisma.activity.findMany({
      include: {
        contact: true,
        deal: true
      }
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
