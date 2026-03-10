import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  Brain,
  TrendingUp,
  Circle,
  Zap
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItem {
  icon: any;
  label: string;
  path: string;
  badge?: number;
  section?: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/', section: 'Navigation' },
  { icon: Users, label: 'Contacts', path: '/contacts', badge: 15, section: 'Navigation' },
  { icon: Building2, label: 'Companies', path: '/companies', badge: 8, section: 'Navigation' },
  { icon: BadgeDollarSign, label: 'Deals', path: '/deals', badge: 10, section: 'Navigation' },
  { icon: Inbox, label: 'Inbox', path: '/inbox', badge: 12, section: 'Navigation' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks', badge: 5, section: 'Navigation' },
  { icon: BarChart3, label: 'Reports', path: '/reports', section: 'Navigation' },
  { icon: Zap, label: 'Automations', path: '/automations', section: 'Navigation' },
  
  { icon: Bot, label: 'AI Assistant', path: '/ai', section: 'AI' },
  { icon: Brain, label: 'AI Insights', path: '/ai-insights', section: 'AI' },
  { icon: TrendingUp, label: 'Sentiment', path: '/sentiment', section: 'AI' },
  
  { icon: Settings, label: 'Settings', path: '/settings', section: 'Settings' },
];

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleToggle = () => setIsMobileOpen(prev => !prev);
    window.addEventListener('toggle-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-sidebar', handleToggle);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const sections = ['Navigation', 'AI', 'Settings'];

  const renderNavItems = (sectionName: string) => {
    return navItems
      .filter(item => item.section === sectionName)
      .map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => cn(
            "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all relative overflow-hidden",
            isActive 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted",
            isCollapsed && "justify-center px-2"
          )}
          title={isCollapsed ? item.label : undefined}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
              )}
              <item.icon className={cn(
                "h-6 w-6 shrink-0 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                !isCollapsed && "mr-3"
              )} />
              {!isCollapsed && (
                <span className="truncate flex-1">{item.label}</span>
              )}
              {!isCollapsed && item.badge && (
                <span className={cn(
                  "ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-colors",
                  isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {item.badge}
                </span>
              )}
              {isCollapsed && item.badge && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border-2 border-sidebar" />
              )}
            </>
          )}
        </NavLink>
      ));
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden h-[64px] flex items-center justify-around px-2 pb-safe">
        {navItems.filter(item => ['Dashboard', 'Contacts', 'Deals', 'Tasks', 'AI Assistant'].includes(item.label)).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center space-y-1 w-full h-full text-[10px] font-bold transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.label.split(' ')[0]}</span>
          </NavLink>
        ))}
      </nav>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[45] md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop/Tablet Sidebar */}
      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 bottom-0 z-[46] md:z-20 bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col h-screen",
          isCollapsed ? "w-[60px]" : "w-[240px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-4 flex items-center h-[56px] border-b border-border/50">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm">
                N
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">NexusCRM</span>
            </div>
          )}
          {isCollapsed && (
            <div className="mx-auto h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm">
              N
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
          {sections.map(section => (
            <div key={section} className="space-y-1">
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 opacity-50">
                  {section}
                </p>
              )}
              {isCollapsed && (
                <div className="h-px bg-border mx-2 mb-4 opacity-50" />
              )}
              {renderNavItems(section)}
            </div>
          ))}

          {!isCollapsed && (
            <div className="pt-4 border-t border-border mt-4">
              <p className="px-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 opacity-50">
                Quick Stats
              </p>
              <div className="px-3 space-y-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Pipeline</span>
                    <span className="font-bold text-foreground">$1.24M</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[65%]" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Won MTD</span>
                  <span className="font-bold text-emerald-500">$95K</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Tasks Due</span>
                  <span className="font-bold text-amber-500">5</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto border-t border-border">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "w-full flex items-center px-4 py-3 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
              isCollapsed && "justify-center px-2"
            )}
          >
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <>
                <ChevronLeft size={18} className="mr-3" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>

        {!isCollapsed && (
          <div className="p-4 bg-muted/30 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                AR
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground truncate">Alex Rivera</p>
                <p className="text-[10px] text-muted-foreground truncate uppercase font-bold tracking-tighter opacity-70">Sales Leader</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
