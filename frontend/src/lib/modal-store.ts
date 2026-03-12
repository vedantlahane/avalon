import { create } from 'zustand';

interface ModalStore {
  contactModal: {
    isOpen: boolean;
    contactId?: number;
    open: (id?: number) => void;
    close: () => void;
  };
  dealModal: {
    isOpen: boolean;
    dealId?: number;
    initialStage?: string;
    open: (id?: number, stage?: string) => void;
    close: () => void;
  };
  taskModal: {
    isOpen: boolean;
    taskId?: number;
    open: (id?: number) => void;
    close: () => void;
  };
}

export const useModalStore = create<ModalStore>((set) => ({
  contactModal: {
    isOpen: false,
    contactId: undefined,
    open: (id) => set((state) => ({ 
      contactModal: { ...state.contactModal, isOpen: true, contactId: id } 
    })),
    close: () => set((state) => ({ 
      contactModal: { ...state.contactModal, isOpen: false, contactId: undefined } 
    })),
  },
  dealModal: {
    isOpen: false,
    dealId: undefined,
    initialStage: undefined,
    open: (id, stage) => set((state) => ({ 
      dealModal: { ...state.dealModal, isOpen: true, dealId: id, initialStage: stage } 
    })),
    close: () => set((state) => ({ 
      dealModal: { ...state.dealModal, isOpen: false, dealId: undefined, initialStage: undefined } 
    })),
  },
  taskModal: {
    isOpen: false,
    taskId: undefined,
    open: (id) => set((state) => ({ 
      taskModal: { ...state.taskModal, isOpen: true, taskId: id } 
    })),
    close: () => set((state) => ({ 
      taskModal: { ...state.taskModal, isOpen: false, taskId: undefined } 
    })),
  },
}));
