import { Context } from 'hono';
import { dashboardService } from '../services/dashboardService.js';
import catchAsync from '../utils/catchAsync.js';

export const dashboardController = {
  getStats: catchAsync(async (c: Context) => {
    const stats = await dashboardService.getStats();
    return c.json(stats);
  })
};
