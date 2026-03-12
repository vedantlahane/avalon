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
    initialData?: any;
    open: (id?: number, initialData?: any) => void;
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
    initialData: undefined,
    open: (id, initialData) => set((state) => ({ 
      taskModal: { ...state.taskModal, isOpen: true, taskId: id, initialData } 
    })),
    close: () => set((state) => ({ 
      taskModal: { ...state.taskModal, isOpen: false, taskId: undefined, initialData: undefined } 
    })),
  },
}));
