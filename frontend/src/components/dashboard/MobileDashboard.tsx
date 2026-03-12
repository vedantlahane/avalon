import React, { useState } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  BadgeDollarSign, 
  Users, 
  Brain, 
  ClipboardList, 
  Calendar, 
  AlertTriangle,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { DashboardData } from '@/types';
import { formatCurrency, cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { Sparkline } from '../charts';

interface MobileDashboardProps {
  data: DashboardData;
  onRefresh: () => Promise<void>;
}

export const MobileDashboard: React.FC<MobileDashboardProps> = ({ data, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();
  const pullControls = useAnimation();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  const onPanEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 100) {
      handleRefresh();
    }
  };

  return (
    <div className="flex flex-col space-y-6 px-4 pb-24 pt-4 overflow-x-hidden">
      {/* Pull to refresh indicator */}
      <motion.div 
        className="flex justify-center h-0 overflow-visible"
        animate={isRefreshing ? { height: 40 } : { height: 0 }}
      >
        <RefreshCw className={cn("text-primary w-6 h-6", isRefreshing && "animate-spin")} />
      </motion.div>

      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {new Date().getHours() < 12 ? 'Good morning! 👋' : new Date().getHours() < 18 ? 'Good afternoon! 👋' : 'Good evening! 👋'}
        </h1>
        <p className="text-muted-foreground text-sm">{format(new Date(), 'MMMM d, yyyy')}</p>
      </div>

      {/* KPI Grid (2x2) */}
      <div className="grid grid-cols-2 gap-3">
        <KPICard 
          title="Pipeline" 
          value={formatCurrency(data.stats.pipelineValue)} 
          change={`↑ ${data.stats.pipelineChange}%`} 
          icon={BadgeDollarSign}
          color="indigo"
          sparklineData={[45, 52, 48, 61, 55, 67, 72]}
          onClick={() => navigate('/deals')}
        />
        <KPICard 
          title="Won MTD" 
          value={formatCurrency(data.stats.dealsWonValue || 95000)} 
          change={`${data.stats.dealsWon || 8} deals`} 
          icon={Target}
          color="emerald"
          sparklineData={[2, 4, 3, 5, 4, 7, 8]}
          onClick={() => navigate('/deals')}
        />
        <KPICard 
          title="Win Rate" 
          value={`${data.stats.winRate}%`} 
          change={`${data.stats.winRateChange > 0 ? '↑' : '↓'} ${Math.abs(data.stats.winRateChange)}%`} 
          icon={TrendingUp}
          color="violet"
          sparklineData={[48, 47, 49, 46, 45, 44, 45]}
          onClick={() => navigate('/reports')}
        />
        <KPICard 
          title="Avg Deal" 
          value={formatCurrency(data.stats.avgDealSize)} 
          change={`↑ ${data.stats.avgDealSizeChange}%`} 
          icon={Users}
          color="amber"
          sparklineData={[58, 60, 59, 62, 61, 63, 62]}
          onClick={() => navigate('/deals')}
        />
      </div>

      {/* AI Daily Briefing */}
      <DashboardSection 
        title="AI Daily Briefing" 
        icon={Brain} 
        onSeeAll={() => navigate('/ai-insights')}
        color="primary"
      >
        <div className="space-y-3">
          {data.aiBriefing.needsAttention.slice(0, 2).map((item, i) => (
            <div 
              key={i} 
              onClick={() => navigate('/ai-insights')}
              className="flex items-start gap-3 p-3 bg-red-500/5 rounded-xl border border-red-500/10 active:bg-red-500/10 transition-colors"
            >
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-foreground leading-tight">{item.text}</p>
            </div>
          ))}
          <div 
            onClick={() => navigate('/contacts')}
            className="flex items-start gap-3 p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 active:bg-emerald-500/10 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-foreground leading-tight">{data.aiBriefing.goodNews[0]?.text || "2 new hot leads this week"}</p>
          </div>
          <div 
            onClick={() => navigate('/contacts')}
            className="flex items-start gap-3 p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 active:bg-blue-500/10 transition-colors"
          >
            <Users className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-foreground leading-tight">Call Sarah Chen (urgent)</p>
          </div>
        </div>
      </DashboardSection>

      {/* Today's Tasks */}
      <DashboardSection 
        title="Today's Tasks" 
        icon={ClipboardList} 
        onSeeAll={() => navigate('/tasks')}
        color="amber"
      >
        <div className="space-y-2">
          {data.upcomingTasks.slice(0, 3).map((task, i) => (
            <div 
              key={i} 
              onClick={() => navigate('/tasks')}
              className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl active:bg-muted/50 transition-colors"
            >
              <div className={cn(
                "w-2 h-2 rounded-full",
                i === 0 ? "bg-red-500" : i === 1 ? "bg-orange-500" : "bg-yellow-500"
              )} />
              <p className="text-xs font-bold text-foreground truncate flex-1">{task.title}</p>
            </div>
          ))}
        </div>
      </DashboardSection>

      {/* Upcoming */}
      <DashboardSection 
        title="Upcoming" 
        icon={Calendar} 
        color="violet"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs font-bold text-foreground">CloudNine Demo</p>
              <p className="text-[10px] text-muted-foreground">3:00 PM today</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs font-bold text-foreground">Team Standup</p>
              <p className="text-[10px] text-muted-foreground">9:00 AM tomorrow</p>
            </div>
          </div>
        </div>
      </DashboardSection>

      {/* Deals at Risk */}
      <DashboardSection 
        title="Deals at Risk" 
        icon={BadgeDollarSign} 
        onSeeAll={() => navigate('/deals')}
        color="red"
      >
        <div className="space-y-3">
          {data.dealsAtRisk && data.dealsAtRisk.length > 0 ? (
            data.dealsAtRisk.slice(0, 3).map((deal, i) => (
              <div 
                key={i} 
                onClick={() => navigate(`/deals/${deal.id}`)}
                className="flex items-center justify-between p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl active:scale-95 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs font-bold text-foreground truncate max-w-[150px]">{deal.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-foreground">{formatCurrency(deal.value)}</p>
                  <p className="text-[10px] text-rose-500 font-bold">{deal.probability}% probability</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground text-[10px] font-medium">
              No deals currently at risk.
            </div>
          )}
        </div>
      </DashboardSection>
    </div>
  );
};

const KPICard: React.FC<{ 
  title: string; 
  value: string; 
  change: string; 
  icon: any; 
  color: string;
  sparklineData: number[];
  onClick: () => void;
}> = ({ title, value, change, icon: Icon, color, sparklineData, onClick }) => {
  const colors: Record<string, string> = {
    indigo: 'bg-indigo-500/10 text-indigo-500',
    emerald: 'bg-emerald-500/10 text-emerald-500',
    violet: 'bg-violet-500/10 text-violet-500',
    amber: 'bg-amber-500/10 text-amber-500',
  };

  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-card p-4 rounded-2xl border border-border shadow-sm space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className={cn("p-1.5 rounded-lg", colors[color])}>
          <Icon size={16} />
        </div>
        <span className="text-[10px] font-bold text-emerald-500">{change}</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{title}</p>
          <p className="text-lg font-bold text-foreground mt-0.5">{value}</p>
        </div>
        <div className="pb-1">
          <Sparkline data={sparklineData} width={40} height={16} />
        </div>
      </div>
    </motion.div>
  );
};

const DashboardSection: React.FC<{ 
  title: string; 
  icon: any; 
  onSeeAll?: () => void;
  children: React.ReactNode;
  color: string;
}> = ({ title, icon: Icon, onSeeAll, children, color }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card p-4 rounded-2xl border border-border shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={cn("w-5 h-5", `text-${color}-500`)} />
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
        </div>
        {onSeeAll && (
          <button 
            onClick={onSeeAll}
            className="text-[10px] font-bold text-primary flex items-center gap-0.5"
          >
            See All <ChevronRight size={12} />
          </button>
        )}
      </div>
      {children}
    </motion.div>
  );
};
