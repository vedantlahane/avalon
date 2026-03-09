import { api } from '../lib/api';
import { Company } from '../types';
import { MOCK_COMPANIES } from '../data/mockData';

export const companyService = {
  getCompanies: async (): Promise<Company[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_COMPANIES;
    }
    const response = await api.get('/companies');
    return response.data;
  },

  getCompanyById: async (id: number): Promise<Company | undefined> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_COMPANIES.find(c => c.id === id);
    }
    const response = await api.get(`/companies/${id}`);
    return response.data;
  },

  createCompany: async (companyData: Partial<Company>): Promise<Company> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const newCompany = {
        id: Math.floor(Math.random() * 1000) + 100,
        ...companyData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Company;
      return newCompany;
    }
    const response = await api.post('/companies', companyData);
    return response.data;
  },

  updateCompany: async (id: number, companyData: Partial<Company>): Promise<Company> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const index = MOCK_COMPANIES.findIndex(c => c.id === id);
      if (index === -1) throw new Error('Company not found');
      const updatedCompany = { ...MOCK_COMPANIES[index], ...companyData, updatedAt: new Date().toISOString() };
      return updatedCompany;
    }
    const response = await api.patch(`/companies/${id}`, companyData);
    return response.data;
  },

  deleteCompany: async (id: number): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return;
    }
    await api.delete(`/companies/${id}`);
  }
};
