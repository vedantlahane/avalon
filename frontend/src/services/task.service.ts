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

  getTaskById: async (id: number): Promise<Task> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const task = MOCK_TASKS.find(t => t.id === id);
      if (!task) throw new Error('Task not found');
      return task;
    }
    const response = await api.get(`/tasks/${id}`);
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
  },

  getSuggestions: async (): Promise<any[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return [
        {
          id: 's1',
          title: 'Call Sarah Chen (Quantum Finance)',
          reason: 'Negative email received, deal at risk. Immediate action needed.',
          priority: 'Urgent',
          type: 'call'
        },
        {
          id: 's2',
          title: 'Follow up Acme deal (7 days idle)',
          reason: 'No activity since last demo. Close date approaching.',
          priority: 'High',
          type: 'email'
        },
        {
          id: 's3',
          title: 'Schedule QBR with BrightPath',
          reason: 'Won deal 30 days ago. Time for quarterly business review.',
          priority: 'Medium',
          type: 'meeting'
        },
        {
          id: 's4',
          title: 'Update contact info for 5 leads',
          reason: '5 contacts missing phone or LinkedIn. Enrichment recommended.',
          priority: 'Low',
          type: 'task'
        }
      ];
    }
    const response = await api.get('/tasks/suggestions');
    return response.data;
  }
};
