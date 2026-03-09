import { api } from '../lib/api';
import { Activity } from '../types';
import { MOCK_ACTIVITIES } from '../data/mockData';

export const activityService = {
  getActivities: async (): Promise<Activity[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return MOCK_ACTIVITIES;
    }
    const response = await api.get('/activities');
    return response.data;
  },

  createActivity: async (activityData: Partial<Activity>): Promise<Activity> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const newActivity = {
        id: Math.floor(Math.random() * 1000) + 100,
        ...activityData,
        date: activityData.date || new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Activity;
      return newActivity;
    }
    const response = await api.post('/activities', activityData);
    return response.data;
  },

  updateActivity: async (id: number, activityData: Partial<Activity>): Promise<Activity> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const index = MOCK_ACTIVITIES.findIndex(a => a.id === id);
      if (index === -1) throw new Error('Activity not found');
      const updatedActivity = { ...MOCK_ACTIVITIES[index], ...activityData, updatedAt: new Date().toISOString() };
      return updatedActivity;
    }
    const response = await api.patch(`/activities/${id}`, activityData);
    return response.data;
  },

  deleteActivity: async (id: number): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return;
    }
    await api.delete(`/activities/${id}`);
  }
};
