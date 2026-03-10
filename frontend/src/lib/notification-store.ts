import { Notification } from '../types';
import { notificationService } from '../services/notification.service';

type Listener = (state: NotificationState) => void;

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isOpen: boolean;
  isLoading: boolean;
}

let state: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isOpen: false,
  isLoading: false,
};

const listeners = new Set<Listener>();

const notify = () => {
  listeners.forEach(l => l(state));
};

export const notificationStore = {
  getState: () => state,
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  fetchNotifications: async () => {
    state = { ...state, isLoading: true };
    notify();
    try {
      const notifications = await notificationService.getNotifications();
      state = {
        ...state,
        notifications,
        unreadCount: notifications.filter(n => !n.isRead).length,
        isLoading: false,
      };
    } catch (error) {
      console.error('Failed to fetch notifications', error);
      state = { ...state, isLoading: false };
    }
    notify();
  },

  toggleOpen: () => {
    state = { ...state, isOpen: !state.isOpen };
    notify();
  },

  markAsRead: async (id: number) => {
    await notificationService.markAsRead(id);
    const notifications = state.notifications.map(n =>
      n.id === id ? { ...n, isRead: true } : n
    );
    state = {
      ...state,
      notifications,
      unreadCount: notifications.filter(n => !n.isRead).length,
    };
    notify();
  },

  markAllAsRead: async () => {
    await notificationService.markAllAsRead();
    const notifications = state.notifications.map(n => ({ ...n, isRead: true }));
    state = {
      ...state,
      notifications,
      unreadCount: 0,
    };
    notify();
  },

  deleteNotification: async (id: number) => {
    await notificationService.deleteNotification(id);
    const notifications = state.notifications.filter(n => n.id !== id);
    state = {
      ...state,
      notifications,
      unreadCount: notifications.filter(n => !n.isRead).length,
    };
    notify();
  },

  addNotification: (notification: Notification) => {
    const notifications = [notification, ...state.notifications];
    state = {
      ...state,
      notifications,
      unreadCount: notifications.filter(n => !n.isRead).length,
    };
    notify();
  }
};
