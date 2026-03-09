import { dealService } from '../services/dealService.js';
import catchAsync from '../utils/catchAsync.js';
export const dealController = {
    getDeals: catchAsync(async (c) => {
        const deals = await dealService.getDeals();
        return c.json(deals);
    }),
    getDealById: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const deal = await dealService.getDealById(id);
        if (!deal)
            return c.json({ message: 'Deal not found' }, 404);
        return c.json(deal);
    }),
    createDeal: catchAsync(async (c) => {
        const data = await c.req.json();
        const deal = await dealService.createDeal(data);
        return c.json(deal, 201);
    }),
    updateDeal: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const data = await c.req.json();
        const deal = await dealService.updateDeal(id, data);
        return c.json(deal);
    }),
    deleteDeal: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        await dealService.deleteDeal(id);
        return c.json({ message: 'Deal deleted successfully' });
    })
};
