import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, DollarSign, ClipboardList, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { notificationStore } from '@/lib/notification-store';
import { useChat } from '@ai-sdk/react';

export const BottomNav: React.FC = () => {
  const [notificationState, setNotificationState] = React.useState(notificationStore.getState());

  React.useEffect(() => {
    return notificationStore.subscribe(setNotificationState);
  }, []);

  const overdueTasksCount = 3; 
 // Mocking for now, could be derived from task service
  const unreadInsightsCount = 2; // Mocking for now

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Contacts', path: '/contacts' },
    { icon: DollarSign, label: 'Deals', path: '/deals' },
    { icon: ClipboardList, label: 'Tasks', path: '/tasks', badge: overdueTasksCount },
    { icon: Bot, label: 'AI', path: '/ai-insights', badge: unreadInsightsCount },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-background border-t border-border flex items-center justify-around px-2 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )
          }
        >
          {({ isActive }) => (
            <>
              <motion.div
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative"
              >
                <item.icon className={cn("w-6 h-6", isActive && "text-primary")} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </motion.div>
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
