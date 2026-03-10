import { taskService } from '../services/taskService.js';
import catchAsync from '../utils/catchAsync.js';
export const taskController = {
    getTasks: catchAsync(async (c) => {
        const tasks = await taskService.getTasks();
        return c.json(tasks);
    }),
    createTask: catchAsync(async (c) => {
        const data = await c.req.json();
        const task = await taskService.createTask(data);
        return c.json(task, 201);
    }),
    updateTask: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        const data = await c.req.json();
        const task = await taskService.updateTask(id, data);
        return c.json(task);
    }),
    deleteTask: catchAsync(async (c) => {
        const id = parseInt(c.req.param('id'));
        await taskService.deleteTask(id);
        return c.json({ message: 'Task deleted successfully' });
    })
};
