import { activityService } from '../services/activityService.js';
import { leadScoringService } from '../services/leadScoringService.js';
import catchAsync from '../utils/catchAsync.js';
export const activityController = {
    getActivities: catchAsync(async (c) => {
        const activities = await activityService.getActivities();
        return c.json(activities);
    }),
    createActivity: catchAsync(async (c) => {
        const data = await c.req.json();
        const activity = await activityService.createActivity(data);
        // Trigger lead score recalculation
        if (activity.contactId) {
            await leadScoringService.calculateScore(activity.contactId);
        }
        return c.json(activity, 201);
    }),
    updateActivity: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const data = await c.req.json();
        const activity = await activityService.updateActivity(id, data);
        // Trigger lead score recalculation
        if (activity.contactId) {
            await leadScoringService.calculateScore(activity.contactId);
        }
        return c.json(activity);
    }),
    deleteActivity: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const activity = await activityService.getActivityById?.(id);
        await activityService.deleteActivity(id);
        // Trigger lead score recalculation if we have the contactId
        if (activity?.contactId) {
            await leadScoringService.calculateScore(activity.contactId);
        }
        return c.json({ message: 'Activity deleted successfully' });
    })
};
