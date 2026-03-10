import { activityService } from '../services/activityService.js';
import catchAsync from '../utils/catchAsync.js';
export const activityController = {
    getActivities: catchAsync(async (c) => {
        const activities = await activityService.getActivities();
        return c.json(activities);
    }),
    createActivity: catchAsync(async (c) => {
        const data = await c.req.json();
        const activity = await activityService.createActivity(data);
        return c.json(activity, 201);
    }),
    updateActivity: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const data = await c.req.json();
        const activity = await activityService.updateActivity(id, data);
        return c.json(activity);
    }),
    deleteActivity: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        await activityService.deleteActivity(id);
        return c.json({ message: 'Activity deleted successfully' });
    })
};
