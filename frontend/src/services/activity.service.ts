import { api } from '../lib/api';
import { Activity } from '../types';
import { MOCK_ACTIVITIES } from '../data/mockData';

export const activityService = {
  getActivities: async (filters: { contactId?: string | number; dealId?: string | number } = {}): Promise<Activity[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      let filtered = [...MOCK_ACTIVITIES];
      if (filters.contactId) filtered = filtered.filter(a => a.contactId.toString() === filters.contactId.toString());
      if (filters.dealId) filtered = filtered.filter(a => a.dealId?.toString() === filters.dealId.toString());
      return filtered as Activity[];
    }
    const response = await api.get('/crm/activities', { params: filters });
    return response.data;
  },

  createActivity: async (activityData: Partial<Activity>): Promise<Activity> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const newActivity = {
        id: Math.random().toString(36).substr(2, 9),
        ...activityData,
        date: activityData.date || new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Activity;
      return newActivity;
    }
    const response = await api.post('/crm/activities', activityData);
    return response.data;
  },

  summarizeActivity: async (notes: string, type: string): Promise<{ summary: string; keyPoints: string[]; sentiment: string }> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return {
        summary: "Discussed enterprise pricing and implementation timeline. The client needs CTO approval before proceeding.",
        keyPoints: ["Pricing discussed", "Implementation timeline reviewed", "CTO technical review needed", "Budget approved for Q1"],
        sentiment: "Positive"
      };
    }
    const response = await api.post('/ai/summarize-activity', { notes, type });
    return response.data;
  },

  extractTasks: async (notes: string): Promise<{ tasks: { title: string; dueDate: string; priority: string }[] }> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return {
        tasks: [
          { title: "Schedule technical review with CTO", dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], priority: "High" },
          { title: "Send implementation timeline doc", dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], priority: "Medium" }
        ]
      };
    }
    const response = await api.post('/ai/extract-tasks', { notes });
    return response.data;
  },

  suggestNextSteps: async (notes: string, type: string, currentStage?: string): Promise<{ suggestions: string[]; recommendedStage: string | null; recommendedProbability: number | null }> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return {
        suggestions: ["Schedule CTO meeting within 3 days", "Update deal stage to Negotiation", "Increase win probability to 80%"],
        recommendedStage: "Negotiation",
        recommendedProbability: 80
      };
    }
    const response = await api.post('/ai/suggest-next-steps', { notes, type, currentStage });
    return response.data;
  },

  updateActivity: async (id: string | number, activityData: Partial<Activity>): Promise<Activity> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const index = MOCK_ACTIVITIES.findIndex(a => a.id.toString() === id.toString());
      if (index === -1) throw new Error('Activity not found');
      const updatedActivity = { ...MOCK_ACTIVITIES[index], ...activityData, updatedAt: new Date().toISOString() };
      return updatedActivity as Activity;
    }
    const response = await api.patch(`/crm/activities/${id}`, activityData);
    return response.data;
  },

  deleteActivity: async (id: string | number): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      return;
    }
    await api.delete(`/crm/activities/${id}`);
  }
};