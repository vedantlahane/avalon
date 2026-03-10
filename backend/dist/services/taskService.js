import prisma from '../client.js';
export const taskService = {
    getTasks: async () => {
        return await prisma.task.findMany({
            include: {
                contact: true,
                deal: true
            }
        });
    },
    createTask: async (data) => {
        return await prisma.task.create({
            data
        });
    },
    updateTask: async (id, data) => {
        return await prisma.task.update({
            where: { id },
            data
        });
    },
    deleteTask: async (id) => {
        return await prisma.task.update({
            where: { id },
            data: { isDeleted: true }
        });
    }
};
