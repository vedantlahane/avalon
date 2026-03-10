import { api } from '../lib/api';
import { Notification } from '../types';
import { MOCK_NOTIFICATIONS } from '../data/mockData';

const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    if (useMock) {
      return MOCK_NOTIFICATIONS;
    }
    const response = await api.get('/notifications');
    return response.data;
  },

  markAsRead: async (id: number): Promise<void> => {
    if (useMock) {
      const notification = MOCK_NOTIFICATIONS.find(n => n.id === id);
      if (notification) notification.isRead = true;
      return;
    }
    await api.patch(`/notifications/${id}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
    if (useMock) {
      MOCK_NOTIFICATIONS.forEach(n => n.isRead = true);
      return;
    }
    await api.post('/notifications/mark-all-read');
  },

  deleteNotification: async (id: number): Promise<void> => {
    if (useMock) {
      const index = MOCK_NOTIFICATIONS.findIndex(n => n.id === id);
      if (index !== -1) MOCK_NOTIFICATIONS.splice(index, 1);
      return;
    }
    await api.delete(`/notifications/${id}`);
  }
};
