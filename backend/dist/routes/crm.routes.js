import { Hono } from 'hono';
import { contactController } from '../controllers/contactController.js';
import { companyController } from '../controllers/companyController.js';
import { dealController } from '../controllers/dealController.js';
import { activityController } from '../controllers/activityController.js';
import { taskController } from '../controllers/taskController.js';
import { emailTemplateController } from '../controllers/emailTemplateController.js';
import { dashboardController } from '../controllers/dashboardController.js';
import { emailController } from '../controllers/emailController.js';
const crmRoutes = new Hono();
// Dashboard
crmRoutes.get('/dashboard/stats', dashboardController.getStats);
// Contacts
crmRoutes.get('/contacts', contactController.getContacts);
crmRoutes.get('/contacts/:id', contactController.getContactById);
crmRoutes.post('/contacts', contactController.createContact);
crmRoutes.patch('/contacts/:id', contactController.updateContact);
crmRoutes.delete('/contacts/:id', contactController.deleteContact);
crmRoutes.post('/contacts/enrich', contactController.enrichContact);
crmRoutes.post('/contacts/bulk-enrich', contactController.bulkEnrichContacts);
// Companies
crmRoutes.get('/companies', companyController.getCompanies);
crmRoutes.get('/companies/:id', companyController.getCompanyById);
crmRoutes.post('/companies', companyController.createCompany);
crmRoutes.patch('/companies/:id', companyController.updateCompany);
crmRoutes.delete('/companies/:id', companyController.deleteCompany);
// Deals
crmRoutes.get('/deals', dealController.getDeals);
crmRoutes.get('/deals/forecast', dealController.getForecast);
crmRoutes.get('/deals/:id', dealController.getDealById);
crmRoutes.post('/deals', dealController.createDeal);
crmRoutes.patch('/deals/:id', dealController.updateDeal);
crmRoutes.delete('/deals/:id', dealController.deleteDeal);
// Activities
crmRoutes.get('/activities', activityController.getActivities);
crmRoutes.post('/activities', activityController.createActivity);
crmRoutes.patch('/activities/:id', activityController.updateActivity);
crmRoutes.delete('/activities/:id', activityController.deleteActivity);
// Tasks
crmRoutes.get('/tasks', taskController.getTasks);
crmRoutes.post('/tasks', taskController.createTask);
crmRoutes.patch('/tasks/:id', taskController.updateTask);
crmRoutes.delete('/tasks/:id', taskController.deleteTask);
// Email Templates
crmRoutes.get('/email-templates', emailTemplateController.getEmailTemplates);
crmRoutes.post('/email-templates', emailTemplateController.createEmailTemplate);
crmRoutes.patch('/email-templates/:id', emailTemplateController.updateEmailTemplate);
crmRoutes.delete('/email-templates/:id', emailTemplateController.deleteEmailTemplate);
// Emails
crmRoutes.get('/emails', emailController.getEmails);
crmRoutes.get('/emails/:id', emailController.getEmailById);
crmRoutes.patch('/emails/:id', emailController.updateEmail);
crmRoutes.delete('/emails/:id', emailController.deleteEmail);
export default crmRoutes;
