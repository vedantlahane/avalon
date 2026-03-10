import { Context } from 'hono';
import { emailTemplateService } from '../services/emailTemplateService.js';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';

export const emailTemplateController = {
  getEmailTemplates: catchAsync(async (c: Context) => {
    const templates = await emailTemplateService.getEmailTemplates();
    return c.json(templates);
  }),

  createEmailTemplate: catchAsync(async (c: Context) => {
    const body = await c.req.json();
    const template = await emailTemplateService.createEmailTemplate(body);
    return c.json(template, 201);
  }),

  updateEmailTemplate: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const template = await emailTemplateService.updateEmailTemplate(id, body);
    return c.json(template);
  }),

  deleteEmailTemplate: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    await emailTemplateService.deleteEmailTemplate(id);
    return c.json({ message: 'Email template deleted successfully' });
  }),

  generateTemplate: catchAsync(async (c: Context) => {
    const { description, tone, length } = await c.req.json();
    if (!description) {
      throw new ApiError(400, 'Description is required for AI generation');
    }
    const variations = await emailTemplateService.generateEmailTemplate(description, tone, length);
    return c.json({ variations });
  })
};