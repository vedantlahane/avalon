import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  TrendingUp, 
  Mail, 
  CheckSquare, 
  BarChart3, 
  Brain, 
  Zap, 
  Settings, 
  HelpCircle 
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Contacts", path: "/contacts" },
  { icon: Building2, label: "Companies", path: "/companies" },
  { icon: TrendingUp, label: "Deals", path: "/deals" },
  { icon: Mail, label: "Inbox", path: "/inbox", count: "3" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Brain, label: "AI Insights", path: "/insights" },
  { icon: Zap, label: "Automations", path: "/automations" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "fixed left-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-in-out flex items-center",
        isHovered ? "w-[240px]" : "w-[64px]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sidebar Capsule */}
      <div 
        className={cn(
          "h-[60vh] w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[32px] shadow-2xl overflow-hidden flex flex-col transition-all duration-300 backdrop-blur-md",
          "dark:bg-black/80 light:bg-white/80"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center h-[64px] flex-shrink-0">
          <div className="w-[32px] h-[32px] bg-[var(--accent)] rounded-[8px] flex items-center justify-center text-white font-bold text-lg">
            N
          </div>
          {isHovered && (
            <span className="ml-3 font-semibold text-[var(--text-primary)] text-lg whitespace-nowrap overflow-hidden">
              NexusCRM
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 flex flex-col gap-2 scrollbar-none">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center min-h-[44px] rounded-full transition-all duration-200 group px-2.5",
                  isActive 
                    ? "bg-[var(--accent-glow)] text-[var(--accent)]" 
                    : "text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-secondary)]"
                )}
              >
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <item.icon size={20} />
                </div>
                {isHovered && (
                  <div className="ml-3 flex items-center flex-1 justify-between overflow-hidden">
                    <span className="text-sm font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                    {item.count && (
                      <span className="bg-[var(--accent)] text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                        {item.count}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-3 border-t border-[var(--border-color)] flex flex-col gap-2">
          <button className="flex items-center h-[44px] rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-hover)] transition-all px-2.5 group">
            <HelpCircle size={20} />
            {isHovered && <span className="ml-3 text-sm font-medium whitespace-nowrap">Help</span>}
          </button>
          <div className="flex items-center h-[44px] rounded-full px-2">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-[12px] font-semibold text-white flex-shrink-0">
              JD
            </div>
            {isHovered && (
              <div className="ml-3 flex flex-col overflow-hidden">
                <span className="text-sm font-medium text-[var(--text-primary)] whitespace-nowrap">John Doe</span>
                <span className="text-[10px] text-[var(--text-muted)] whitespace-nowrap">Admin</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};