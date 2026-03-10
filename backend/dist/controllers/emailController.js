import { emailService } from '../services/emailService.js';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';
export const emailController = {
    getEmails: catchAsync(async (c) => {
        const folder = c.req.query('folder');
        const emails = await emailService.getEmails(folder);
        return c.json(emails);
    }),
    getEmailById: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const email = await emailService.getEmailById(id);
        if (!email) {
            throw new ApiError(404, 'Email not found');
        }
        return c.json(email);
    }),
    toggleStar: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const email = await emailService.toggleStar(id);
        return c.json(email);
    }),
    markAsRead: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const email = await emailService.markAsRead(id);
        return c.json(email);
    }),
    generateAiReply: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const reply = await emailService.generateAiReply(id);
        return c.json({ reply });
    }),
    updateEmail: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const body = await c.req.json();
        const email = await emailService.updateEmail(id, body);
        return c.json(email);
    }),
    deleteEmail: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        await emailService.deleteEmail(id);
        return c.json({ message: 'Email deleted successfully' });
    }),
};
