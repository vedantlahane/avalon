import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings, Bot, Terminal, Menu, Sun, Moon, Laptop, Plus, User, LogOut, ChevronDown, BarChart3, BookOpen, Activity } from 'lucide-react';
import { NotificationBell } from './NotificationBell';
import { commandPaletteStore } from '../../lib/command-palette-store';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { composerStore } from '../../lib/composer-store';
import { useActivityStore } from '../../lib/activity-store';
import { authService } from '../../services/auth.service';
import { User as UserType } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const navigate = useNavigate();
  const activityStore = useActivityStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Failed to fetch user in header', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    window.location.href = '/auth';
  };

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getThemeIcon = () => {
    if (theme === 'system') return <Laptop size={18} />;
    return isDark ? <Moon size={18} /> : <Sun size={18} />;
  };

  const quickAddItems = [
    { label: 'Activity', icon: <Activity size={16} />, action: () => activityStore.open() },
    { label: 'Contact', icon: <User size={16} />, action: () => navigate('/contacts') },
    { label: 'Deal', icon: <Plus size={16} />, action: () => navigate('/deals') },
    { label: 'Task', icon: <Plus size={16} />, action: () => navigate('/tasks') },
    { label: 'Email', icon: <Plus size={16} />, action: () => composerStore.open() },
  ];

  const userMenuItems = [
    { label: 'My Profile', icon: <User size={16} />, action: () => navigate('/settings') },
    { label: 'Settings', icon: <Settings size={16} />, action: () => navigate('/settings') },
    { label: 'My Performance', icon: <BarChart3 size={16} />, action: () => navigate('/reports') },
    { label: 'Toggle Dark Mode', icon: isDark ? <Sun size={16} /> : <Moon size={16} />, action: toggleTheme },
    { label: 'Help & Documentation', icon: <BookOpen size={16} />, action: () => {} },
    { label: 'Sign Out', icon: <LogOut size={16} />, action: handleLogout, danger: true },
  ];

  const userInitials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'AR';

  return (
    <header className="h-[52px] md:h-[56px] bg-card/80 backdrop-blur-md border-b border-border px-4 flex items-center justify-between sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-3 flex-1">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm group-hover:scale-105 transition-transform text-sm md:text-base">
            N
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-base md:text-lg font-bold tracking-tight text-foreground">NexusCRM</span>
            <div className="px-1 py-0.5 md:px-1.5 md:py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[8px] md:text-[10px] font-black text-indigo-500 uppercase tracking-widest relative overflow-hidden">
              AI
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
        </div>

        <div 
          onClick={() => commandPaletteStore.open()}
          className="relative max-w-md w-full group cursor-pointer hidden md:block"
        >
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-hover:text-primary transition-colors">
            <Search size={16} />
          </div>
          <div className="w-full bg-muted/40 border border-border/50 rounded-xl py-1.5 pl-9 pr-12 text-sm text-muted-foreground flex items-center group-hover:bg-muted group-hover:border-primary/30 transition-all">
            Search contacts, deals, companies... <span className="ml-2 px-1.5 py-0.5 bg-card border border-border rounded text-[10px] font-bold opacity-60">⌘K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-3 ml-4">
        {/* Mobile Search Icon */}
        <button 
          onClick={() => commandPaletteStore.open()}
          className="md:hidden h-9 w-9 flex items-center justify-center rounded-xl text-muted-foreground hover:bg-muted"
        >
          <Search size={20} />
        </button>

        <NotificationBell />
        
        <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>
        
        {/* User Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-muted transition-colors group"
          >
            <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-card group-hover:scale-105 transition-transform text-[10px]">
              {currentUser?.avatar || userInitials}
            </div>
            <ChevronDown size={14} className={cn("text-muted-foreground transition-transform duration-200 hidden md:block", isUserMenuOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {isUserMenuOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:bg-transparent" 
                  onClick={() => setIsUserMenuOpen(false)} 
                />
                <motion.div 
                  initial={window.innerWidth < 768 ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 10 }}
                  animate={window.innerWidth < 768 ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
                  exit={window.innerWidth < 768 ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 10 }}
                  className={cn(
                    "bg-card border border-border shadow-xl z-50 py-1.5 overflow-hidden",
                    window.innerWidth < 768 
                      ? "fixed bottom-0 left-0 right-0 rounded-t-3xl pb-safe" 
                      : "absolute right-0 mt-2 w-56 rounded-xl"
                  )}
                >
                  {/* Mobile Drag Handle */}
                  <div className="md:hidden flex justify-center py-2">
                    <div className="w-12 h-1 bg-muted rounded-full" />
                  </div>

                  <div className="px-6 py-4 md:px-4 md:py-3 border-b border-border mb-1.5">
                    <p className="text-base md:text-sm font-bold text-foreground truncate">{currentUser?.name || 'Alex Rivera'}</p>
                    <p className="text-sm md:text-xs text-muted-foreground mt-0.5 truncate">{currentUser?.email || 'alex@nexus-crm.ai'}</p>
                  </div>
                  
                  <div className="px-2 md:px-0">
                    {userMenuItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          item.action();
                          setIsUserMenuOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-4 md:gap-3 px-4 py-3 md:px-3 md:py-2 text-base md:text-sm transition-colors rounded-xl md:rounded-none",
                          item.danger 
                            ? "text-red-500 hover:bg-red-500/10" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );

};