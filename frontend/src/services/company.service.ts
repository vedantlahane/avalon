import { api } from '../lib/api';
import { Company, CompanyWithStats } from '../types';
import { MOCK_COMPANIES } from '../data/mockData';

export const companyService = {
  getCompanies: async (): Promise<CompanyWithStats[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_COMPANIES.map(c => ({
        ...c,
        activeDealCount: 2,
        activeDealValue: 150000,
        wonDealCount: 1,
        totalRevenue: 95000,
        avgDealSize: 75000,
        updatedAt: c.createdAt // Fallback
      })) as CompanyWithStats[];
    }
    const response = await api.get('/crm/companies');
    return response.data;
  },

  getCompany: async (id: string | number): Promise<CompanyWithStats> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const company = MOCK_COMPANIES.find(c => c.id.toString() === id.toString());
      if (!company) throw new Error('Company not found');
      return {
        ...company,
        activeDealCount: 2,
        activeDealValue: 150000,
        wonDealCount: 1,
        totalRevenue: 95000,
        avgDealSize: 75000,
        updatedAt: company.createdAt
      } as CompanyWithStats;
    }
    const response = await api.get(`/crm/companies/${id}`);
    return response.data;
  },

  updateCompany: async (id: string | number, companyData: Partial<Company>): Promise<Company> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const index = MOCK_COMPANIES.findIndex(c => c.id.toString() === id.toString());
      if (index === -1) throw new Error('Company not found');
      return { ...MOCK_COMPANIES[index], ...companyData, updatedAt: new Date().toISOString() } as Company;
    }
    const response = await api.patch(`/crm/companies/${id}`, companyData);
    return response.data;
  }
};
