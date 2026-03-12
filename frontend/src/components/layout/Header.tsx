import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/contacts')) return 'Contacts';
    if (path.startsWith('/companies')) return 'Companies';
    if (path.startsWith('/deals')) return 'Deals';
    if (path === '/inbox') return 'Inbox';
    if (path === '/tasks') return 'Tasks';
    if (path === '/reports') return 'Reports';
    if (path === '/insights') return 'AI Insights';
    if (path === '/automations') return 'Automations';
    if (path === '/settings') return 'Settings';
    return 'NexusCRM AI';
  };

  return (
    <header className="h-[52px] w-full bg-[var(--bg-primary)] border-b border-[var(--border-color)] flex items-center justify-between px-[24px]">
      {/* Left Section */}
      <div className="flex flex-col">
        <h1 className="text-[16px] font-semibold text-[var(--text-primary)] leading-tight">
          {getPageTitle()}
        </h1>
      </div>

      {/* Center Section */}
      <div className="relative w-[320px]">
        <div className="absolute inset-y-0 left-[12px] flex items-center pointer-events-none text-[var(--text-muted)]">
          <Search size={14} />
        </div>
        <input 
          type="text" 
          placeholder="Search or type command..."
          className="w-full h-[36px] bg-transparent border border-[var(--border-color)] rounded-[6px] pl-[36px] pr-[44px] text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-glow)] outline-none transition-all duration-150 ease-in-out"
        />
        <div className="absolute inset-y-0 right-[12px] flex items-center pointer-events-none">
          <span className="px-[6px] py-[2px] bg-transparent border border-[var(--border-color)] rounded-[4px] text-[11px] font-mono text-[var(--text-muted)]">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-[8px]">
        <button 
          onClick={toggleTheme}
          className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="w-[36px] h-[36px] flex items-center justify-center rounded-[6px] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors relative">
          <Bell size={20} />
          <div className="absolute top-[8px] right-[8px] w-[8px] h-[8px] bg-nexus-danger rounded-full border-2 border-[var(--bg-primary)]" />
        </button>
        <div className="w-[32px] h-[32px] rounded-full bg-[var(--accent)] flex items-center justify-center text-[12px] font-semibold text-white ml-[4px]">
          JD
        </div>
      </div>
    </header>
  );
};
