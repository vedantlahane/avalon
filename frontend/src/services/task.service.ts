import { api } from '../lib/api';
import { Task } from '../types';
import { MOCK_TASKS } from '../data/mockData';

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_TASKS;
    }
    const response = await api.get('/tasks');
    return response.data;
  },

  createTask: async (taskData: Partial<Task>): Promise<Task> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const newTask = {
        id: Math.floor(Math.random() * 1000) + 100,
        ...taskData,
        aiGenerated: taskData.aiGenerated || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Task;
      return newTask;
    }
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id: number, taskData: Partial<Task>): Promise<Task> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const index = MOCK_TASKS.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Task not found');
      const updatedTask = { ...MOCK_TASKS[index], ...taskData, updatedAt: new Date().toISOString() };
      return updatedTask;
    }
    const response = await api.patch(`/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return;
    }
    await api.delete(`/tasks/${id}`);
  }
};
