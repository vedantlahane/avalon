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
              "flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-all",
              isActive ? "text-indigo-600" : "text-gray-400 hover:text-gray-500"
            )
          }
        >
          {({ isActive }) => (
            <>
              <motion.div
                whileTap={{ scale: 0.85, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative"
              >
                <item.icon className={cn("w-6 h-6 transition-transform", isActive && "scale-110")} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-background">
                    {item.badge}
                  </span>
                )}
              </motion.div>
              <span className={cn(
                "text-[10px] font-bold leading-none tracking-tight transition-all",
                isActive ? "opacity-100" : "opacity-70"
              )}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-indigo-600"
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
