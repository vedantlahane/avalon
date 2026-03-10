import { useState, useEffect } from 'react';
import { themeStore, Theme } from '../lib/theme-store';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(themeStore.getTheme());

  useEffect(() => {
    return themeStore.subscribe(setTheme);
  }, []);

  return {
    theme,
    setTheme: themeStore.setTheme,
    isDark: theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  };
}
