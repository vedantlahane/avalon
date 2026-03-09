import prisma from '../client';
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
    getCompanyById: async (id) => {
        return await prisma.company.findUnique({
            where: { id },
            include: {
                contacts: true,
                deals: true
            }
        });
    },
    createCompany: async (data) => {
        return await prisma.company.create({
            data
        });
    },
    updateCompany: async (id, data) => {
        return await prisma.company.update({
            where: { id },
            data
        });
    },
    deleteCompany: async (id) => {
        return await prisma.company.update({
            where: { id },
            data: { isDeleted: true }
        });
    }
};
