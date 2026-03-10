import { api } from '../lib/api';
import { Company, CompanyWithStats, CompanyInsight } from '../types';
import { MOCK_COMPANIES } from '../data/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const companyService = {
  getCompanies: async (): Promise<CompanyWithStats[]> => {
    if (USE_MOCK) {
      return MOCK_COMPANIES.map(company => ({
        ...company,
        healthScore: company.healthScore || Math.floor(Math.random() * 40) + 60,
        contactCount: Math.floor(Math.random() * 10) + 1,
        activeDealCount: Math.floor(Math.random() * 5),
        activeDealValue: Math.floor(Math.random() * 200000),
        wonDealCount: Math.floor(Math.random() * 10),
        totalRevenue: Math.floor(Math.random() * 500000),
        avgDealSize: Math.floor(Math.random() * 50000),
      }));
    }
    const response = await api.get('/crm/companies');
    return response.data;
  },

  getCompanyById: async (id: number): Promise<CompanyWithStats> => {
    if (USE_MOCK) {
      const company = MOCK_COMPANIES.find(c => c.id === id) || MOCK_COMPANIES[0];
      return {
        ...company,
        healthScore: company.healthScore || 85,
        contactCount: 3,
        activeDealCount: 2,
        activeDealValue: 135000,
        wonDealCount: 5,
        totalRevenue: 95000,
        avgDealSize: 15000,
      };
    }
    const response = await api.get(`/crm/companies/${id}`);
    return response.data;
  },

  getCompanyInsights: async (id: number): Promise<CompanyInsight> => {
    if (USE_MOCK) {
      return {
        health: 'Strong',
        keyInsights: [
          'Growing company (hired 50+ in last quarter)',
          'Recently raised Series B',
          'Expanding to European market',
          'Uses competitor product X'
        ],
        opportunityScore: 85,
        recommendedStrategy: 'Multi-thread approach - engage VP Sales and CTO in addition to current champion. Position as solution for European expansion needs.',
        similarCompanies: [
          { id: 6, name: 'CloudNine Solutions' },
          { id: 9, name: 'TechForward Inc' }
        ]
      };
    }
    const response = await api.get(`/crm/companies/${id}/insights`);
    return response.data;
  },

  createCompany: async (data: Partial<Company>): Promise<Company> => {
    if (USE_MOCK) {
      const newCompany = {
        ...data,
        id: Math.floor(Math.random() * 1000) + 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Company;
      return newCompany;
    }
    const response = await api.post('/crm/companies', data);
    return response.data;
  },

  updateCompany: async (id: number, data: Partial<Company>): Promise<Company> => {
    if (USE_MOCK) {
      const company = MOCK_COMPANIES.find(c => c.id === id) || MOCK_COMPANIES[0];
      return { ...company, ...data, updatedAt: new Date().toISOString() };
    }
    const response = await api.patch(`/crm/companies/${id}`, data);
    return response.data;
  },

  enrichCompany: async (id: number): Promise<Company> => {
    if (USE_MOCK) {
      const company = MOCK_COMPANIES.find(c => c.id === id) || MOCK_COMPANIES[0];
      return {
        ...company,
        description: 'Acme Technologies is a leading provider of cloud-based enterprise solutions, specializing in AI-driven data analytics and infrastructure management.',
        revenue: '$50M - $100M',
        linkedinUrl: 'https://linkedin.com/company/acme-tech',
        updatedAt: new Date().toISOString()
      };
    }
    const response = await api.post(`/crm/companies/${id}/enrich`);
    return response.data;
  },

  bulkEnrich: async (ids: number[]): Promise<{ count: number }> => {
    if (USE_MOCK) {
      return { count: ids.length };
    }
    const response = await api.post('/crm/companies/bulk-enrich', { ids });
    return response.data;
  }
};