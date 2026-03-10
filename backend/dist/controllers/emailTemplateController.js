import { emailTemplateService } from '../services/emailTemplateService.js';
import catchAsync from '../utils/catchAsync.js';
export const emailTemplateController = {
    getEmailTemplates: catchAsync(async (c) => {
        const templates = await emailTemplateService.getEmailTemplates();
        return c.json(templates);
    }),
    createEmailTemplate: catchAsync(async (c) => {
        const data = await c.req.json();
        const template = await emailTemplateService.createEmailTemplate(data);
        return c.json(template, 201);
    }),
    updateEmailTemplate: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const data = await c.req.json();
        const template = await emailTemplateService.updateEmailTemplate(id, data);
        return c.json(template);
    }),
    deleteEmailTemplate: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        await emailTemplateService.deleteEmailTemplate(id);
        return c.json({ message: 'Email template deleted successfully' });
    })
};
