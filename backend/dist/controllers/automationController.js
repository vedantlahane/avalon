import { automationService } from '../services/automationService.js';
import catchAsync from '../utils/catchAsync.js';
export const automationController = {
    getAutomations: catchAsync(async (c) => {
        const automations = await automationService.getAutomations();
        return c.json(automations);
    }),
    getAutomationById: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const automation = await automationService.getAutomationById(id);
        return c.json(automation);
    }),
    createAutomation: catchAsync(async (c) => {
        const data = await c.req.json();
        const automation = await automationService.createAutomation(data);
        return c.json(automation, 201);
    }),
    updateAutomation: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const data = await c.req.json();
        const automation = await automationService.updateAutomation(id, data);
        return c.json(automation);
    }),
    deleteAutomation: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        await automationService.deleteAutomation(id);
        return c.json({ message: 'Automation deleted successfully' });
    }),
    getAutomationLogs: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const logs = await automationService.getAutomationLogs(id);
        return c.json(logs);
    }),
    toggleAutomation: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const automation = await automationService.toggleAutomation(id);
        return c.json(automation);
    }),
    testAutomation: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const sampleData = await c.req.json();
        const result = await automationService.testAutomation(id, sampleData);
        return c.json(result);
    }),
};
