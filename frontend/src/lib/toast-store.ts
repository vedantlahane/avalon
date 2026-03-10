import { Notification } from '../types';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'ai';
  title: string;
  message: string;
  actionLabel?: string;
  actionLink?: string;
  secondaryActionLabel?: string;
  secondaryActionLink?: string;
}

type Listener = (toasts: ToastMessage[]) => void;
let toasts: ToastMessage[] = [];
const listeners = new Set<Listener>();

const notify = () => {
  listeners.forEach(l => l([...toasts]));
};

export const toastStore = {
  getToasts: () => toasts,
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  add: (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    toasts = [newToast, ...toasts].slice(0, 3); // Stack max 3 toasts
    notify();

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      toastStore.remove(id);
    }, 5000);
  },
  remove: (id: string) => {
    toasts = toasts.filter(t => t.id !== id);
    notify();
  }
};
