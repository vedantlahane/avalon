import { Context } from 'hono';
import { contactService } from '../services/contactService.js';
import catchAsync from '../utils/catchAsync.js';

export const contactController = {
  getContacts: catchAsync(async (c: Context) => {
    const contacts = await contactService.getContacts();
    return c.json(contacts);
  }),

  getContactById: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    const contact = await contactService.getContactById(id);
    if (!contact) return c.json({ message: 'Contact not found' }, 404);
    return c.json(contact);
  }),

  createContact: catchAsync(async (c: Context) => {
    const data = await c.req.json();
    const contact = await contactService.createContact(data);
    return c.json(contact, 201);
  }),

  updateContact: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    const data = await c.req.json();
    const contact = await contactService.updateContact(id, data);
    return c.json(contact);
  }),

  deleteContact: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    await contactService.deleteContact(id);
    return c.json({ message: 'Contact deleted successfully' });
  }),

  enrichContact: catchAsync(async (c: Context) => {
    const { email } = await c.req.json();
    const result = await contactService.enrichContact(email);
    return c.json(result);
  }),

  bulkEnrichContacts: catchAsync(async (c: Context) => {
    const { contactIds } = await c.req.json();
    await contactService.bulkEnrichContacts(contactIds);
    return c.json({ message: 'Bulk enrichment started' });
  })
};
