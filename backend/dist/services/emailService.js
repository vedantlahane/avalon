import prisma from '../client.js';
export const emailService = {
    getEmails: async () => {
        return await prisma.email.findMany({
            where: { isDeleted: false },
            include: { contact: true },
            orderBy: { timestamp: 'desc' },
        });
    },
    getEmailById: async (id) => {
        return await prisma.email.findFirst({
            where: { id, isDeleted: false },
            include: { contact: true },
        });
    },
    updateEmail: async (id, data) => {
        return await prisma.email.update({
            where: { id },
            data,
        });
    },
    deleteEmail: async (id) => {
        return await prisma.email.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
};
