import prisma from '../client.js';
export const emailTemplateService = {
    getEmailTemplates: async () => {
        return await prisma.emailTemplate.findMany();
    },
    createEmailTemplate: async (data) => {
        return await prisma.emailTemplate.create({
            data
        });
    },
    updateEmailTemplate: async (id, data) => {
        return await prisma.emailTemplate.update({
            where: { id },
            data
        });
    },
    deleteEmailTemplate: async (id) => {
        return await prisma.emailTemplate.update({
            where: { id },
            data: { isDeleted: true }
        });
    }
};
