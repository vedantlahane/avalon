import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  BadgeDollarSign, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  Clock
} from 'lucide-react';
import { dashboardService } from '../services/dashboard.service';
import { DashboardStats } from '../types';
import { cn } from '../lib/utils';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dashboardService.getStats().then(data => {
      setStats(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, change: '+12.5%', isUp: true, icon: BadgeDollarSign, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Active Deals', value: stats.activeDeals, change: '+4', isUp: true, icon: Target, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'New Leads', value: stats.newLeads, change: '-2%', isUp: false, icon: Users, color: 'bg-violet-50 text-violet-600' },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%`, change: '+1.2%', isUp: true, icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Alex. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 shadow-sm">
            <Clock size={16} />
            <span>Last 30 Days</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110", card.color)}>
                <card.icon size={22} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                card.isUp ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
              )}>
                {card.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {card.change}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1 font-mono tracking-tight">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Sales Performance Chart Placeholder */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <BarChartIcon size={18} className="text-indigo-500" />
                Pipeline Value
              </h3>
              <div className="flex gap-2">
                {['D', 'W', 'M', 'Y'].map(t => (
                  <button key={t} className={cn(
                    "w-8 h-8 rounded-md text-xs font-bold transition-colors",
                    t === 'M' ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-gray-100"
                  )}>{t}</button>
                ))}
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-4 px-2">
              {[45, 60, 40, 75, 90, 65, 80, 55, 70, 85, 95, 110].map((h, i) => (
                <div key={i} className="flex-1 group relative">
                  <div 
                    className="w-full bg-indigo-100 rounded-t-lg transition-all group-hover:bg-indigo-500" 
                    style={{ height: `${h}%` }}
                  ></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    ${(h * 1000).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Nov</span>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[
                { user: 'Alex Rivers', action: 'moved deal', target: 'Enterprise License', time: '2h ago', icon: Target, color: 'text-indigo-600' },
                { user: 'Sarah Chen', action: 'added contact', target: 'Markus Weber', time: '4h ago', icon: Users, color: 'text-emerald-600' },
                { user: 'System', action: 'generated report', target: 'Monthly Sales Q1', time: '6h ago', icon: Activity, color: 'text-violet-600' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-50", activity.color)}>
                    <activity.icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-bold text-indigo-600">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#1F2937] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-400" />
              AI Insights
            </h3>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  You have <span className="text-indigo-400 font-bold">3 deals</span> that haven't been touched in over 5 days.
                </p>
                <button className="mt-3 text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group">
                  See affected deals <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Sarah's conversion rate is <span className="text-emerald-400 font-bold">15% higher</span> than the team average.
                </p>
                <button className="mt-3 text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group">
                  View Sarah's playbook <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Upcoming Tasks</h3>
            <div className="space-y-3">
              {[
                { title: 'Follow up with John', date: 'Today, 2:00 PM', priority: 'high' },
                { title: 'Prep for demo', date: 'Tomorrow, 10:00 AM', priority: 'medium' },
                { title: 'Review quarterly goals', date: 'Mar 15', priority: 'low' },
              ].map((task, i) => (
                <div key={i} className="group flex items-center justify-between p-3 border border-gray-50 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      task.priority === 'high' ? "bg-red-500" : task.priority === 'medium' ? "bg-amber-500" : "bg-gray-300"
                    )}></div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{task.title}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{task.date}</div>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-indigo-600 transition-all">
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BarChartIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </svg>
);

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const Sparkles = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);
