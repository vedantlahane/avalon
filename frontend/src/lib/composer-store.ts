import { Contact, Deal } from '../types';

type Listener = (state: any) => void;
let state = {
  isOpen: false,
  to: '',
  contact: null as Contact | null,
  deal: null as Deal | null,
  subject: '',
  initialContent: '',
  replyToId: null as number | null,
};

const listeners = new Set<Listener>();

export const composerStore = {
  getState: () => state,
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  open: (params?: any) => {
    state = { ...state, isOpen: true, ...params };
    listeners.forEach(l => l(state));
  },
  close: () => {
    state = { ...state, isOpen: false, to: '', contact: null, deal: null, subject: '', initialContent: '', replyToId: null };
    listeners.forEach(l => l(state));
  }
};
