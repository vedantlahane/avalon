import { api } from '../lib/api';
import { User } from '../types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const authService = {
  getCurrentUser: async (): Promise<User> => {
    if (USE_MOCK) {
      const stored = localStorage.getItem('onboarding_user');
      if (stored) return JSON.parse(stored);
      
      return {
        id: '1',
        email: 'demo@nexus-crm.ai',
        name: 'Demo User',
        isOnboarded: localStorage.getItem('onboarding_completed') === 'true',
      };
    }
    const response = await api.get('/auth/me');
    return response.data.user;
  },

  updateOnboarding: async (data: Partial<User>): Promise<User> => {
    if (USE_MOCK) {
      const user = await authService.getCurrentUser();
      const updated = { ...user, ...data };
      localStorage.setItem('onboarding_user', JSON.stringify(updated));
      if (data.isOnboarded) {
        localStorage.setItem('onboarding_completed', 'true');
      }
      return updated;
    }
    const response = await api.patch('/auth/onboarding', data);
    return response.data.user;
  }
};
