import { Context } from 'hono';
import { dealService } from '../services/dealService.js';
import catchAsync from '../utils/catchAsync.js';

export const dealController = {
  getDeals: catchAsync(async (c: Context) => {
    const deals = await dealService.getDeals();
    return c.json(deals);
  }),

  getDealById: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    const deal = await dealService.getDealById(id);
    if (!deal) return c.json({ message: 'Deal not found' }, 404);
    return c.json(deal);
  }),

  createDeal: catchAsync(async (c: Context) => {
    const data = await c.req.json();
    const deal = await dealService.createDeal(data);
    return c.json(deal, 201);
  }),

  updateDeal: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    const data = await c.req.json();
    const deal = await dealService.updateDeal(id, data);
    return c.json(deal);
  }),

  deleteDeal: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    await dealService.deleteDeal(id);
    return c.json({ message: 'Deal deleted successfully' });
  }),

  getForecast: catchAsync(async (c: Context) => {
    const timePeriod = c.req.query('timePeriod') || 'this_quarter';
    const category = c.req.query('category') || 'stage';
    const aiConfidence = c.req.query('aiConfidence') === 'true';
    
    const forecast = await dealService.getForecast(timePeriod, category, aiConfidence);
    return c.json(forecast);
  })
};
