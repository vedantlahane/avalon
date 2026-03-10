import { create } from 'zustand';

interface ActivityStore {
  isOpen: boolean;
  contactId?: number;
  dealId?: number;
  open: (params?: { contactId?: number; dealId?: number }) => void;
  close: () => void;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  isOpen: false,
  contactId: undefined,
  dealId: undefined,
  open: (params) => set({ 
    isOpen: true, 
    contactId: params?.contactId, 
    dealId: params?.dealId 
  }),
  close: () => set({ 
    isOpen: false, 
    contactId: undefined, 
    dealId: undefined 
  }),
}));
