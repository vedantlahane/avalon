import prisma from '../client.js';

export const companyService = {
  getCompanies: async () => {
    return await prisma.company.findMany({
      include: {
        _count: {
          select: { contacts: true }
        }
      }
    });
  },

  getCompanyById: async (id: number) => {
    return await prisma.company.findUnique({
      where: { id },
      include: {
        contacts: true,
        deals: true
      }
    });
  },

  createCompany: async (data: any) => {
    return await prisma.company.create({
      data
    });
  },

  updateCompany: async (id: number, data: any) => {
    return await prisma.company.update({
      where: { id },
      data
    });
  },

  deleteCompany: async (id: number) => {
    return await prisma.company.update({
      where: { id },
      data: { isDeleted: true }
    });
  }
};
