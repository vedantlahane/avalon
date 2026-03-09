import prisma from '../client';
export const activityService = {
    getActivities: async () => {
        return await prisma.activity.findMany({
            include: {
                contact: true,
                deal: true
            }
        });
    },
    createActivity: async (data) => {
        return await prisma.activity.create({
            data
        });
    },
    updateActivity: async (id, data) => {
        return await prisma.activity.update({
            where: { id },
            data
        });
    },
    deleteActivity: async (id) => {
        return await prisma.activity.update({
            where: { id },
            data: { isDeleted: true }
        });
    }
};
