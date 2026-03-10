import { Context } from 'hono';
import { emailService } from '../services/emailService.js';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';

export const emailController = {
  getEmails: catchAsync(async (c: Context) => {
    const folder = c.req.query('folder');
    const emails = await emailService.getEmails(folder);
    return c.json(emails);
  }),

  getEmailById: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    const email = await emailService.getEmailById(id);
    if (!email) {
      throw new ApiError(404, 'Email not found');
    }
    return c.json(email);
  }),

  toggleStar: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    const email = await emailService.toggleStar(id);
    return c.json(email);
  }),

  markAsRead: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    const email = await emailService.markAsRead(id);
    return c.json(email);
  }),

  generateAiReply: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    const reply = await emailService.generateAiReply(id);
    return c.json({ reply });
  }),

  generateEmail: catchAsync(async (c: Context) => {
    const body = await c.req.json();
    const result = await emailService.generateEmail(body);
    return c.json(result);
  }),

  improveEmail: catchAsync(async (c: Context) => {
    const body = await c.req.json();
    const result = await emailService.improveEmail(body);
    return c.json({ text: result });
  }),

  suggestSubjects: catchAsync(async (c: Context) => {
    const body = await c.req.json();
    const result = await emailService.suggestSubjects(body.context);
    return c.json({ subjects: result });
  }),

  scoreEmail: catchAsync(async (c: Context) => {
    const body = await c.req.json();
    const result = await emailService.scoreEmail(body.content);
    return c.json(result);
  }),

  suggestTime: catchAsync(async (c: Context) => {
    const contactId = c.req.query('contactId') ? parseInt(c.req.query('contactId')!) : undefined;
    const result = await emailService.suggestTime(contactId);
    return c.json(result);
  }),

  sendEmail: catchAsync(async (c: Context) => {
    const body = await c.req.json();
    const result = await emailService.sendEmail(body);
    return c.json(result);
  }),

  updateEmail: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const email = await emailService.updateEmail(id, body);
    return c.json(email);
  }),

  deleteEmail: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    await emailService.deleteEmail(id);
    return c.json({ message: 'Email deleted successfully' });
  }),

  getSentimentSummary: catchAsync(async (c: Context) => {
    const summary = await emailService.getSentimentSummary();
    return c.json(summary);
  }),

  getSentimentTrend: catchAsync(async (c: Context) => {
    const trend = await emailService.getSentimentTrend();
    return c.json(trend);
  }),

  getFlaggedEmails: catchAsync(async (c: Context) => {
    const emails = await emailService.getFlaggedEmails();
    return c.json(emails);
  }),

  getSentimentInsights: catchAsync(async (c: Context) => {
    const insights = await emailService.getSentimentInsights();
    return c.json({ insights });
  }),
};
