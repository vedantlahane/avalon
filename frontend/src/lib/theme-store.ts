export type Theme = 'light' | 'dark' | 'system';

type Listener = (theme: Theme) => void;
let currentTheme: Theme = (localStorage.getItem('theme') as Theme) || 'system';
const listeners = new Set<Listener>();

const applyTheme = (theme: Theme) => {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
};

// Initial apply
applyTheme(currentTheme);

// Listen for system changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (currentTheme === 'system') {
    applyTheme('system');
  }
});

const notify = () => {
  listeners.forEach(l => l(currentTheme));
};

export const themeStore = {
  getTheme: () => currentTheme,
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    listener(currentTheme);
    return () => {
      listeners.delete(listener);
    };
  },
  setTheme: (theme: Theme) => {
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    applyTheme(theme);
    notify();
  }
};
