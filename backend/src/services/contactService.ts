import prisma from '../client.js';

export const contactService = {
  getContacts: async () => {
    return await prisma.contact.findMany({
      include: {
        company: true
      }
    });
  },

  getContactById: async (id: number) => {
    return await prisma.contact.findUnique({
      where: { id },
      include: {
        company: true,
        activities: true,
        tasks: true,
        deals: true
      }
    });
  },

  createContact: async (data: any) => {
    return await prisma.contact.create({
      data
    });
  },

  updateContact: async (id: number, data: any) => {
    return await prisma.contact.update({
      where: { id },
      data
    });
  },

  deleteContact: async (id: number) => {
    return await prisma.contact.update({
      where: { id },
      data: { isDeleted: true }
    });
  }
};
