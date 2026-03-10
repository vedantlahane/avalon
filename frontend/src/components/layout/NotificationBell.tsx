import React, { useEffect, useState, useRef } from 'react';
import { Bell } from 'lucide-react';
import { notificationStore } from '../../lib/notification-store';
import { NotificationDropdown } from './NotificationDropdown';

export const NotificationBell: React.FC = () => {
  const [state, setState] = useState(notificationStore.getState());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = notificationStore.subscribe(setState);
    notificationStore.fetchNotifications();
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (state.isOpen) notificationStore.toggleOpen();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => notificationStore.toggleOpen()}
        className={`p-2 rounded-lg transition-colors relative ${state.isOpen ? 'bg-gray-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
      >
        <Bell size={20} />
        {state.unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white flex items-center justify-center">
            {state.unreadCount > 9 ? '9+' : state.unreadCount}
          </span>
        )}
      </button>

      {state.isOpen && (
        <div className="absolute right-0 mt-2 w-[400px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden transform origin-top-right transition-all">
          <NotificationDropdown />
        </div>
      )}
    </div>
  );
};
