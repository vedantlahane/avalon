import { Context } from 'hono';
import * as companyService from '../services/companyService.js';
import catchAsync from '../utils/catchAsync.js';

export const getCompanies = catchAsync(async (c: Context) => {
  const companies = await companyService.getCompanies();
  return c.json(companies);
});

export const getCompanyById = catchAsync(async (c: Context) => {
  const id = parseInt(c.req.param('id'));
  const company = await companyService.getCompanyById(id);
  return c.json(company);
});

export const createCompany = catchAsync(async (c: Context) => {
  const data = await c.req.json();
  const company = await companyService.createCompany(data);
  return c.json(company, 201);
});

export const updateCompany = catchAsync(async (c: Context) => {
  const id = parseInt(c.req.param('id'));
  const data = await c.req.json();
  const company = await companyService.updateCompany(id, data);
  return c.json(company);
});

export const deleteCompany = catchAsync(async (c: Context) => {
  const id = parseInt(c.req.param('id'));
  await companyService.deleteCompany(id);
  return c.json({ message: 'Company deleted successfully' });
});

export const getCompanyInsights = catchAsync(async (c: Context) => {
  const id = parseInt(c.req.param('id'));
  const insights = await companyService.getCompanyInsights(id);
  return c.json(insights);
});

export const enrichCompany = catchAsync(async (c: Context) => {
  const id = parseInt(c.req.param('id'));
  const enriched = await companyService.enrichCompany(id);
  return c.json(enriched);
});

export const bulkEnrich = catchAsync(async (c: Context) => {
  const { ids } = await c.req.json();
  const result = await companyService.bulkEnrich(ids);
  return c.json(result);
});

export const companyController = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyInsights,
  enrichCompany,
  bulkEnrich,
};
