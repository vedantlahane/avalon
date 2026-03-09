import prisma from '../client.js';

export const emailService = {
  getEmails: async () => {
    return await prisma.email.findMany({
      where: { isDeleted: false },
      include: { contact: true },
      orderBy: { timestamp: 'desc' },
    });
  },

  getEmailById: async (id: number) => {
    return await prisma.email.findFirst({
      where: { id, isDeleted: false },
      include: { contact: true },
    });
  },

  updateEmail: async (id: number, data: any) => {
    return await prisma.email.update({
      where: { id },
      data,
    });
  },

  deleteEmail: async (id: number) => {
    return await prisma.email.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
};
