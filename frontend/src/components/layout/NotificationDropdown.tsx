import React, { useState, useEffect } from 'react';
import { 
  Bell, Check, Trash2, Filter, 
  Bot, DollarSign, CheckCircle2, 
  Mail, Users, ChevronRight, X
} from 'lucide-react';
import { notificationStore } from '../../lib/notification-store';
import { NotificationType, Notification } from '../../types';
import { formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const typeIcons: Record<NotificationType, React.ReactNode> = {
  AI: <Bot size={16} className="text-purple-600" />,
  Deal: <DollarSign size={16} className="text-green-600" />,
  Task: <CheckCircle2 size={16} className="text-blue-600" />,
  Email: <Mail size={16} className="text-indigo-600" />,
  Contact: <Users size={16} className="text-orange-600" />,
  System: <Bell size={16} className="text-gray-600" />,
};

const typeLabels: Record<NotificationType, string> = {
  AI: 'AI Alert',
  Deal: 'Deal Update',
  Task: 'Task Reminder',
  Email: 'Email Activity',
  Contact: 'Contact Update',
  System: 'System Update',
};

export const NotificationDropdown: React.FC = () => {
  const [state, setState] = useState(notificationStore.getState());
  const [filter, setFilter] = useState<NotificationType | 'All'>('All');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = notificationStore.subscribe(setState);
    return unsubscribe;
  }, []);

  const filteredNotifications = state.notifications.filter(n => 
    filter === 'All' || n.type === filter
  );

  const groupNotifications = (notifications: Notification[]) => {
    const groups: Record<string, Notification[]> = {
      Today: [],
      Yesterday: [],
      Older: [],
    };

    notifications.forEach(n => {
      const date = new Date(n.timestamp);
      if (isToday(date)) groups.Today.push(n);
      else if (isYesterday(date)) groups.Yesterday.push(n);
      else groups.Older.push(n);
    });

    return groups;
  };

  const grouped = groupNotifications(filteredNotifications);

  const handleAction = (n: Notification, isSecondary = false) => {
    const link = isSecondary ? n.secondaryActionLink : n.actionLink || n.link;
    if (link && link !== '#') {
      navigate(link);
      notificationStore.toggleOpen();
      if (!n.isRead) notificationStore.markAsRead(n.id);
    }
  };

  return (
    <div className="flex flex-col max-h-[600px] w-[400px]">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-indigo-600" />
          <h3 className="font-bold text-gray-900">Notifications</h3>
          {state.unreadCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {state.unreadCount}
            </span>
          )}
        </div>
        <button 
          onClick={() => notificationStore.markAllAsRead()}
          className="text-xs text-indigo-600 font-semibold hover:text-indigo-700 hover:bg-indigo-50 px-2 py-1 rounded transition-colors"
        >
          Mark All Read
        </button>
      </div>

      <div className="p-2 border-b border-gray-100 flex items-center gap-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 px-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">Filter:</span>
          {(['All', 'AI', 'Deals', 'Tasks'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f === 'Deals' ? 'Deal' : f === 'Tasks' ? 'Task' : f as any)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                (filter === 'All' && f === 'All') || 
                (filter === 'AI' && f === 'AI') || 
                (filter === 'Deal' && f === 'Deals') || 
                (filter === 'Task' && f === 'Tasks')
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-[300px]">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <Bell size={24} className="text-gray-300" />
            </div>
            <p className="text-gray-500 text-sm">No notifications found</p>
          </div>
        ) : (
          Object.entries(grouped).map(([group, items]) => {
            if (items.length === 0) return null;
            return (
              <div key={group}>
                <div className="bg-gray-50/80 px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-100">
                  {group}
                </div>
                <div className="divide-y divide-gray-50">
                  {items.map(n => (
                    <div 
                      key={n.id}
                      className={`relative p-4 hover:bg-gray-50 transition-all group flex gap-4 ${!n.isRead ? 'bg-indigo-50/30' : ''}`}
                    >
                      {!n.isRead && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600"></div>
                      )}
                      
                      <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        n.type === 'AI' ? 'bg-purple-100' :
                        n.type === 'Deal' ? 'bg-green-100' :
                        n.type === 'Task' ? 'bg-blue-100' :
                        n.type === 'Email' ? 'bg-indigo-100' :
                        'bg-gray-100'
                      }`}>
                        {typeIcons[n.type]}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className={`text-[11px] font-bold uppercase tracking-tight ${
                            n.type === 'AI' ? 'text-purple-600' :
                            n.type === 'Deal' ? 'text-green-600' :
                            n.type === 'Task' ? 'text-blue-600' :
                            n.type === 'Email' ? 'text-indigo-600' :
                            'text-gray-600'
                          }`}>
                            {typeLabels[n.type]}
                          </span>
                          <span className="text-[10px] text-gray-400 whitespace-nowrap">
                            {formatDistanceToNow(new Date(n.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                        <p className={`text-sm leading-snug mb-2 ${!n.isRead ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                          "{n.message}"
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(n.actionLabel || n.link) && (
                            <button 
                              onClick={() => handleAction(n)}
                              className="px-2.5 py-1 bg-white border border-gray-200 rounded text-[11px] font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all"
                            >
                              {n.actionLabel || 'View Details'}
                            </button>
                          )}
                          {n.secondaryActionLabel && (
                            <button 
                              onClick={() => handleAction(n, true)}
                              className="px-2.5 py-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded transition-colors"
                            >
                              {n.secondaryActionLabel}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!n.isRead && (
                          <button 
                            onClick={() => notificationStore.markAsRead(n.id)}
                            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                            title="Mark as read"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        <button 
                          onClick={() => notificationStore.deleteNotification(n.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Dismiss"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      {!n.isRead && (
                        <div className="absolute top-4 right-10">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      <button className="p-3 text-center text-sm font-bold text-indigo-600 border-t border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 group">
        View All Notifications
        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};
