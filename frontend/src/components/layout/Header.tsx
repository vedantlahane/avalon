import React from 'react';
import { Search, Bell, Settings, Bot, Terminal, Menu, Sun, Moon, Laptop } from 'lucide-react';
import { NotificationBell } from './NotificationBell';
import { commandPaletteStore } from '../../lib/command-palette-store';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

export const Header: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getThemeIcon = () => {
    if (theme === 'system') return <Laptop size={20} />;
    return isDark ? <Moon size={20} /> : <Sun size={20} />;
  };

  return (
    <header className="h-16 bg-card border-b border-border px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden p-2 text-muted-foreground hover:bg-muted rounded-lg">
          <Menu size={20} />
        </button>
        <div 
          onClick={() => commandPaletteStore.open()}
          className="relative max-w-md w-full group cursor-pointer"
        >
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-hover:text-primary transition-colors">
            <Search size={18} />
          </div>
          <div className="w-full bg-muted/50 border border-transparent rounded-xl py-2 pl-10 pr-12 text-sm text-muted-foreground flex items-center group-hover:bg-muted group-hover:border-border transition-all">
            Type <span className="mx-1 px-1.5 py-0.5 bg-card border border-border rounded text-[10px] font-bold">Ctrl K</span> to search...
          </div>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <Terminal size={14} className="text-muted-foreground/30" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-4">
        <button 
          onClick={toggleTheme}
          className="p-2.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all relative group ripple"
          title={`Current theme: ${theme}. Click to cycle.`}
        >
          {getThemeIcon()}
        </button>

        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('toggle-ai-panel'))}
          className="p-2.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all relative group ripple"
          title="AI Assistant"
        >
          <Bot size={20} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary border-2 border-card rounded-full"></span>
        </button>
        
        <NotificationBell />
        
        <div className="h-8 w-px bg-border mx-1 hidden sm:block"></div>
        
        <button className="p-2.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all ripple">
          <Settings size={20} />
        </button>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="hidden md:block text-right">
            <p className="text-xs font-bold text-foreground leading-none">Alex Rivera</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Admin</p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md shadow-primary/20 ring-2 ring-card transition-transform hover:scale-105 cursor-pointer">
            AR
          </div>
        </div>
      </div>
    </header>
  );
};
