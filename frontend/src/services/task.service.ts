import { api } from '../lib/api';
import { Task } from '../types';
import { MOCK_TASKS } from '../data/mockData';

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_TASKS as Task[];
    }
    const response = await api.get('/crm/tasks');
    return response.data;
  },

  createTask: async (taskData: Partial<Task>): Promise<Task> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Task;
      return newTask;
    }
    const response = await api.post('/crm/tasks', taskData);
    return response.data;
  },

  updateTask: async (id: string | number, taskData: Partial<Task>): Promise<Task> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const index = MOCK_TASKS.findIndex(t => t.id.toString() === id.toString());
      if (index === -1) throw new Error('Task not found');
      const updatedTask = { ...MOCK_TASKS[index], ...taskData, updatedAt: new Date().toISOString() };
      return updatedTask as Task;
    }
    const response = await api.patch(`/crm/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id: string | number): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return;
    }
    await api.delete(`/crm/tasks/${id}`);
  }
};