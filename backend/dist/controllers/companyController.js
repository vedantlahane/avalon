import { companyService } from '../services/companyService.js';
import catchAsync from '../utils/catchAsync.js';
export const companyController = {
    getCompanies: catchAsync(async (c) => {
        const companies = await companyService.getCompanies();
        return c.json(companies);
    }),
    getCompanyById: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const company = await companyService.getCompanyById(id);
        if (!company)
            return c.json({ message: 'Company not found' }, 404);
        return c.json(company);
    }),
    createCompany: catchAsync(async (c) => {
        const data = await c.req.json();
        const company = await companyService.createCompany(data);
        return c.json(company, 201);
    }),
    updateCompany: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const data = await c.req.json();
        const company = await companyService.updateCompany(id, data);
        return c.json(company);
    }),
    deleteCompany: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        await companyService.deleteCompany(id);
        return c.json({ message: 'Company deleted successfully' });
    })
};
