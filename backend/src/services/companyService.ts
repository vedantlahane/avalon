import prisma from '../client.js';
import ApiError from '../utils/ApiError.js';

export const getCompanies = async () => {
  const companies = await prisma.company.findMany({
    where: { isDeleted: false },
    include: {
      contacts: { where: { isDeleted: false } },
      deals: { where: { isDeleted: false } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return companies.map((company: any) => {
    const activeDeals = company.deals.filter((d: any) => !d.stage.includes('Closed'));
    const wonDeals = company.deals.filter((d: any) => d.stage === 'Closed Won');
    
    return {
      ...company,
      contactCount: company.contacts.length,
      activeDealCount: activeDeals.length,
      activeDealValue: activeDeals.reduce((sum: number, d: any) => sum + d.value, 0),
      wonDealCount: wonDeals.length,
      totalRevenue: wonDeals.reduce((sum: number, d: any) => sum + d.value, 0),
      avgDealSize: wonDeals.length > 0 ? wonDeals.reduce((sum: number, d: any) => sum + d.value, 0) / wonDeals.length : 0,
    };
  });
};

export const getCompanyById = async (id: number) => {
  const company = await prisma.company.findUnique({
    where: { id, isDeleted: false },
    include: {
      contacts: { where: { isDeleted: false } },
      deals: { where: { isDeleted: false } },
    },
  });

  if (!company) {
    throw new ApiError(404, 'Company not found');
  }

  const activeDeals = company.deals.filter((d: any) => !d.stage.includes('Closed'));
  const wonDeals = company.deals.filter((d: any) => d.stage === 'Closed Won');

  return {
    ...company,
    contactCount: company.contacts.length,
    activeDealCount: activeDeals.length,
    activeDealValue: activeDeals.reduce((sum: number, d: any) => sum + d.value, 0),
    wonDealCount: wonDeals.length,
    totalRevenue: wonDeals.reduce((sum: number, d: any) => sum + d.value, 0),
    avgDealSize: wonDeals.length > 0 ? wonDeals.reduce((sum: number, d: any) => sum + d.value, 0) / wonDeals.length : 0,
  };
};

export const createCompany = async (data: any) => {
  return await prisma.company.create({
    data: {
      ...data,
      isDeleted: false,
    },
  });
};

export const updateCompany = async (id: number, data: any) => {
  const company = await prisma.company.findUnique({
    where: { id, isDeleted: false },
  });

  if (!company) {
    throw new ApiError(404, 'Company not found');
  }

  return await prisma.company.update({
    where: { id },
    data,
  });
};

export const deleteCompany = async (id: number) => {
  const company = await prisma.company.findUnique({
    where: { id, isDeleted: false },
  });

  if (!company) {
    throw new ApiError(404, 'Company not found');
  }

  return await prisma.company.update({
    where: { id },
    data: { isDeleted: true },
  });
};

export const getCompanyInsights = async (id: number) => {
  const company = await prisma.company.findUnique({
    where: { id, isDeleted: false },
  });

  if (!company) {
    throw new ApiError(404, 'Company not found');
  }

  // Simulated AI insights based on company data
  return {
    health: company.healthScore && company.healthScore > 80 ? 'Strong' : 'Steady',
    keyInsights: [
      `Leading company in the ${company.industry} sector.`,
      company.size === '1000+' ? 'Large enterprise with complex decision-making process.' : 'Growing mid-sized company with agile decision cycle.',
      'Recently increased engagement with technical stakeholders.',
      `Current health score of ${company.healthScore || 75}/100 based on activity frequency.`
    ],
    opportunityScore: company.healthScore || 75,
    recommendedStrategy: company.industry === 'Technology' 
      ? "Focus on technical value proposition and platform integration capabilities."
      : "Highlight operational efficiency and long-term ROI in the current market climate.",
    similarCompanies: await prisma.company.findMany({
      where: { 
        industry: company.industry || undefined, 
        id: { not: id },
        isDeleted: false 
      },
      take: 2,
      select: { id: true, name: true }
    })
  };
};

export const enrichCompany = async (id: number) => {
  const company = await prisma.company.findUnique({
    where: { id, isDeleted: false },
  });

  if (!company) {
    throw new ApiError(404, 'Company not found');
  }

  // Simulated AI enrichment
  const enrichedData = {
    description: `${company.name} is an innovative organization operating in the ${company.industry} industry, known for its commitment to excellence and market leadership.`,
    website: company.website || `https://www.${company.name.toLowerCase().replace(/\s+/g, '')}.com`,
    domain: company.domain || `${company.name.toLowerCase().replace(/\s+/g, '')}.com`,
    healthScore: Math.floor(Math.random() * 30) + 65,
    updatedAt: new Date(),
  };

  return await prisma.company.update({
    where: { id },
    data: enrichedData,
  });
};

export const bulkEnrich = async (ids: number[]) => {
  let count = 0;
  for (const id of ids) {
    try {
      await enrichCompany(id);
      count++;
    } catch (e) {
      console.error(`Failed to enrich company ${id}:`, e);
    }
  }
  return { count };
};
