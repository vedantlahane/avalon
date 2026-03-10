import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  BadgeDollarSign, 
  Inbox, 
  Mail,
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
  { icon: LayoutDashboard, label: 'Home', path: '/', mobile: true },
  { icon: Users, label: 'Contacts', path: '/contacts', mobile: true },
  { icon: BadgeDollarSign, label: 'Deals', path: '/deals', mobile: true },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks', mobile: true },
  { icon: Bot, label: 'AI', path: '/ai', mobile: true },
  { icon: Building2, label: 'Companies', path: '/companies', mobile: false },
  { icon: Inbox, label: 'Inbox', path: '/inbox', mobile: false },
  { icon: Mail, label: 'Templates', path: '/templates', mobile: false },
  { icon: BarChart3, label: 'Reports', path: '/reports', mobile: false },
  { icon: Settings, label: 'Settings', path: '/settings', mobile: false },
];

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
            {/* Mobile Bottom Navigation */}      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden h-16 flex items-center justify-around px-2 pb-safe">        {navItems.filter(item => item.mobile).map((item) => (          item.path === '/ai' ? (            <button              key={item.path}              onClick={() => window.dispatchEvent(new CustomEvent('toggle-ai-panel'))}              className="flex flex-col items-center justify-center space-y-1 w-full h-full text-xs font-medium text-muted-foreground active:text-primary ripple"            >              <item.icon className="h-5 w-5" />              <span>{item.label}</span>            </button>          ) : (            <NavLink              key={item.path}              to={item.path}              className={({ isActive }) => cn(                "flex flex-col items-center justify-center space-y-1 w-full h-full text-xs font-medium transition-colors ripple",                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"              )}            >              <item.icon className="h-5 w-5" />              <span>{item.label}</span>            </NavLink>          )        ))}      </nav>      {/* Desktop/Tablet Sidebar */}      <aside         className={cn(          "hidden md:flex flex-col bg-sidebar text-sidebar-foreground h-screen transition-all duration-300 ease-in-out relative border-r border-sidebar-border",          isCollapsed ? "w-16" : "w-64"        )}      >        <div className="p-4 flex items-center justify-between">          {!isCollapsed && (            <div className="flex items-center space-x-2">              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">                A              </div>              <span className="text-xl font-bold tracking-tight text-sidebar-foreground transition-colors">                NexusCRM              </span>            </div>          )}          {isCollapsed && (            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">              <Sparkles size={18} className="text-primary-foreground" />            </div>          )}        </div>        <nav className="flex-1 mt-4 px-2 space-y-1 overflow-y-auto scrollbar-hide">          {navItems.map((item) => (            item.path === '/ai' ? (              <button                key={item.path}                onClick={() => window.dispatchEvent(new CustomEvent('toggle-ai-panel'))}                className={cn(                  "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent btn-hover ripple",                  isCollapsed && "justify-center px-0"                )}                title={isCollapsed ? item.label : ''}              >                <item.icon size={20} />                {!isCollapsed && <span className="font-medium">{item.label}</span>}              </button>            ) : (              <NavLink                key={item.path}                to={item.path}                className={({ isActive }) => cn(                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors btn-hover ripple",                  isActive ? "bg-primary text-primary-foreground" : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",                  isCollapsed && "justify-center px-0"                )}                title={isCollapsed ? item.label : ''}              >                <item.icon size={20} />                {!isCollapsed && <span className="font-medium">{item.label}</span>}              </NavLink>            )          ))}        </nav>        <button          onClick={() => setIsCollapsed(!isCollapsed)}          className="absolute -right-3 top-20 bg-primary text-primary-foreground p-1 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-10"        >          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}        </button>                {!isCollapsed && (          <div className="p-4 border-t border-sidebar-border">            <div className="bg-sidebar-accent/50 rounded-lg p-3">              <div className="text-[10px] text-sidebar-foreground/40 font-black mb-1 uppercase tracking-widest">Active Plan</div>              <div className="text-xs font-bold">Enterprise AI</div>            </div>          </div>        )}      </aside>    </>  );};