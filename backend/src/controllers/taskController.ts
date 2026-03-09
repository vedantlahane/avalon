import { Context } from 'hono';
import { taskService } from '../services/taskService.js';
import catchAsync from '../utils/catchAsync.js';

export const taskController = {
  getTasks: catchAsync(async (c: Context) => {
    const tasks = await taskService.getTasks();
    return c.json(tasks);
  }),

  createTask: catchAsync(async (c: Context) => {
    const data = await c.req.json();
    const task = await taskService.createTask(data);
    return c.json(task, 201);
  }),

  updateTask: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    const data = await c.req.json();
    const task = await taskService.updateTask(id, data);
    return c.json(task);
  }),

  deleteTask: catchAsync(async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    await taskService.deleteTask(id);
    return c.json({ message: 'Task deleted successfully' });
  })
};
