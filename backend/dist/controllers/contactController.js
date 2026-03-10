import { contactService } from '../services/contactService.js';
import { leadScoringService } from '../services/leadScoringService.js';
import catchAsync from '../utils/catchAsync.js';
export const contactController = {
    getContacts: catchAsync(async (c) => {
        const contacts = await contactService.getContacts();
        return c.json(contacts);
    }),
    getContactById: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const contact = await contactService.getContactById(id);
        if (!contact)
            return c.json({ message: 'Contact not found' }, 404);
        // Auto-refresh score if it's been a while or if it's 0 (new contact)
        if (contact.leadScore === 0) {
            await leadScoringService.calculateScore(id);
            const updatedContact = await contactService.getContactById(id);
            return c.json(updatedContact);
        }
        return c.json(contact);
    }),
    createContact: catchAsync(async (c) => {
        const data = await c.req.json();
        const contact = await contactService.createContact(data);
        // Calculate initial lead score
        await leadScoringService.calculateScore(contact.id);
        const enrichedContact = await contactService.getContactById(contact.id);
        return c.json(enrichedContact, 201);
    }),
    updateContact: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const data = await c.req.json();
        await contactService.updateContact(id, data);
        // Recalculate score after update
        await leadScoringService.calculateScore(id);
        const updatedContact = await contactService.getContactById(id);
        return c.json(updatedContact);
    }),
    deleteContact: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        await contactService.deleteContact(id);
        return c.json({ message: 'Contact deleted successfully' });
    }),
    enrichContact: catchAsync(async (c) => {
        const { email } = await c.req.json();
        const result = await contactService.enrichContact(email);
        return c.json(result);
    }),
    bulkEnrichContacts: catchAsync(async (c) => {
        const { contactIds } = await c.req.json();
        await contactService.bulkEnrichContacts(contactIds);
        // Recalculate scores for all enriched contacts
        for (const id of contactIds) {
            await leadScoringService.calculateScore(id);
        }
        return c.json({ message: 'Bulk enrichment and scoring completed' });
    }),
    getSentimentBreakdown: catchAsync(async (c) => {
        const breakdown = await contactService.getSentimentBreakdown();
        return c.json(breakdown);
    }),
    refreshLeadScore: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const result = await leadScoringService.calculateScore(id);
        if (!result)
            return c.json({ message: 'Contact not found' }, 404);
        return c.json(result);
    }),
    getLeadScoreHistory: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const history = await leadScoringService.getScoreHistory(id);
        return c.json(history);
    })
};
