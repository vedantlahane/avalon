import { useEffect } from 'react';
import { notificationStore } from '../lib/notification-store';
import { toastStore } from '../lib/toast-store';
import { NotificationType } from '../types';

const NEW_NOTIFICATIONS = [
  {
    type: 'AI' as NotificationType,
    title: 'AI Insight',
    message: 'John Smith just opened your email for the 3rd time. Strike while it\'s hot!',
    actionLabel: 'View Email',
    actionLink: '/inbox?id=1',
    secondaryActionLabel: 'Draft Follow-up',
    secondaryActionLink: '/inbox?compose=true&to=1',
  },
  {
    type: 'Deal' as NotificationType,
    title: 'Deal Update',
    message: 'Acme Enterprise Plan moved to Negotiation stage (Win probability increased to 72%)',
    actionLabel: 'View Deal',
    actionLink: '/deals/1',
  },
  {
    type: 'Task' as NotificationType,
    title: 'Task Reminder',
    message: 'Follow up with Sarah Chen is due in 30 minutes',
    actionLabel: 'View Task',
    actionLink: '/tasks',
  },
];

export const useNotificationSimulator = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      // 10% chance to add a new notification every 30 seconds
      if (Math.random() < 0.1) {
        const template = NEW_NOTIFICATIONS[Math.floor(Math.random() * NEW_NOTIFICATIONS.length)];
        const id = Math.floor(Math.random() * 10000) + 100;
        
        const newNotification = {
          ...template,
          id,
          isRead: false,
          timestamp: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        notificationStore.addNotification(newNotification);
        
        // Also show a toast for important events
        toastStore.add({
          type: template.type === 'AI' ? 'ai' : 'info',
          title: template.title,
          message: template.message,
          actionLabel: template.actionLabel,
          actionLink: template.actionLink,
          secondaryActionLabel: template.secondaryActionLabel,
          secondaryActionLink: template.secondaryActionLink,
        });

        // Optional: play sound
        // new Audio('/notification.mp3').play().catch(() => {});
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);
};
