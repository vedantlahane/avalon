import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  BadgeDollarSign, 
  Inbox, 
  CheckSquare, 
  BarChart3, 
  Bot, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Contacts', path: '/contacts' },
  { icon: Building2, label: 'Companies', path: '/companies' },
  { icon: BadgeDollarSign, label: 'Deals', path: '/deals' },
  { icon: Inbox, label: 'Inbox', path: '/inbox' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Bot, label: 'AI Assistant', path: '/ai' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "bg-[#1F2937] text-white h-screen transition-all duration-300 ease-in-out flex flex-col relative border-r border-white/10",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
                            <div className="flex items-center space-x-2">
                                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                                    A
                                </div>
                                <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                                    Avalon
                                </span>
                            </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mx-auto">
            <Sparkles size={18} className="text-white" />
          </div>
        )}
      </div>

      <nav className="flex-1 mt-4 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              "hover:bg-white/5",
              isActive ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white",
              isCollapsed && "justify-center px-0"
            )}
            title={isCollapsed ? item.label : ''}
          >
            <item.icon size={20} />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-indigo-500 text-white p-1 rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
      
      {!isCollapsed && (
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">Plan</div>
            <div className="text-sm font-medium">Enterprise AI</div>
          </div>
        </div>
      )}
    </aside>
  );
};
