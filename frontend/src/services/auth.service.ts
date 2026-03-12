import { api } from '../lib/api';
import { User } from '../types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const authService = {
  login: async (email: string, password: string): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const user = {
        id: '1',
        email: email || 'demo@nexuscrm.ai',
        name: 'Demo User',
        avatar: 'DJ',
        isOnboarded: localStorage.getItem('onboarding_completed') === 'true',
      };
      localStorage.setItem('auth_token', 'mock_token');
      localStorage.setItem('logged_in_user', JSON.stringify(user));
      return { user, accessToken: 'mock_access', refreshToken: 'mock_refresh' };
    }
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (data: any): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        name: data.fullName,
        company: data.companyName,
        role: data.role,
        teamSize: data.teamSize,
        isOnboarded: false,
      };
      localStorage.setItem('auth_token', 'mock_token');
      localStorage.setItem('logged_in_user', JSON.stringify(user));
      return { user, accessToken: 'mock_access', refreshToken: 'mock_refresh' };
    }
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    if (USE_MOCK) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('logged_in_user');
      return;
    }
    await api.post('/auth/logout');
    localStorage.removeItem('auth_token');
  },

  forgotPassword: async (email: string): Promise<void> => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }
    await api.post('/auth/forgot-password', { email });
  },

  getCurrentUser: async (): Promise<User> => {
    if (USE_MOCK) {
      const stored = localStorage.getItem('logged_in_user');
      if (stored) return JSON.parse(stored);
      
      const auth_token = localStorage.getItem('auth_token');
      if (!auth_token) throw new Error('Not authenticated');

      return {
        id: '1',
        email: 'demo@nexuscrm.ai',
        name: 'Demo User',
        avatar: 'DJ',
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
      localStorage.setItem('logged_in_user', JSON.stringify(updated));
      if (data.isOnboarded) {
        localStorage.setItem('onboarding_completed', 'true');
      }
      return updated;
    }
    const response = await api.patch('/auth/onboarding', data);
    return response.data.user;
  }
};
