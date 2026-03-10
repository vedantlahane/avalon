type Listener = (isOpen: boolean) => void;
let isOpen = false;
const listeners = new Set<Listener>();

export const commandPaletteStore = {
  getIsOpen: () => isOpen,
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  open: () => {
    isOpen = true;
    listeners.forEach(l => l(isOpen));
  },
  close: () => {
    isOpen = false;
    listeners.forEach(l => l(isOpen));
  },
  toggle: () => {
    isOpen = !isOpen;
    listeners.forEach(l => l(isOpen));
  }
};
