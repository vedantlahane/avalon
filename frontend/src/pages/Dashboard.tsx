import React, { useEffect, useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Users, 
  BadgeDollarSign, 
  Activity as ActivityIcon, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  Calendar,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle2,
  Brain,
  ChevronRight,
  Filter,
  Download
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell,
  PieChart, 
  Pie
} from 'recharts';
import confetti from 'canvas-confetti';
import { dashboardService } from '../services/dashboard.service';
import { DashboardData } from '../types';
import { cn, formatCurrency } from '../lib/utils';
import { format } from 'date-fns';

import { useNavigate } from 'react-router-dom';
import { SalesLeaderboard } from '../components/dashboard/SalesLeaderboard';
import { EmptyState } from '../components/common/EmptyState';
import { DashboardSkeleton } from '../components/common/Skeletons';
import { ErrorState } from '../components/common/ErrorState';
import { useModalStore } from '../lib/modal-store';

import { ActivityTimeline } from '../components/activities/ActivityTimeline';
import { LogActivityModal } from '../components/activities/LogActivityModal';
import { MobileDashboard } from '../components/dashboard/MobileDashboard';
import { HelpTooltip } from '@/components/common/HelpTooltip';

import { 
  RevenueLineChart, 
  PipelineByStageBar, 
  LeadScoreDonut,
  ChartContainer,
  Sparkline
} from '../components/charts';

const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const increment = value / totalFrames;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      start += increment;
      if (frame >= totalFrames) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
};

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('This Month');
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const { contactModal, dealModal, taskModal } = useModalStore();
  const navigate = useNavigate();

  const triggerFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const dashboardData = await dashboardService.getDashboardData();
      setData(dashboardData);
      
      // Check if monthly target is hit
      const currentUserRep = dashboardData.salesLeaderboard.reps.find(r => r.isCurrentUser);
      if (currentUserRep && currentUserRep.target >= 100) {
        setTimeout(triggerFireworks, 1000);
      }
      
      setError(null);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard statistics');
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Listen for modal success to refresh data
  useEffect(() => {
    if (!contactModal.isOpen && !dealModal.isOpen && !taskModal.isOpen) {
      fetchData();
    }
  }, [contactModal.isOpen, dealModal.isOpen, taskModal.isOpen]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning! 👋';
    if (hour < 18) return 'Good afternoon! 👋';
    return 'Good evening! 👋';
  }, []);

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <ErrorState onRetry={fetchData} />;

  if (window.innerWidth < 768) {
    if (!data) return <DashboardSkeleton />;
    return <MobileDashboard data={data} onRefresh={fetchData} />;
  }

  if (!data || (data.stats.pipelineValue === 0 && data.activities.length === 0)) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-8 page-fade-in">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">{greeting}</h1>
        <EmptyState
          icon={Users}
          title="Welcome to NexusCRM!"
          description="Your dashboard is currently empty. Start by adding your first contact or deal to unlock AI-powered insights, revenue forecasting, and performance tracking."
          actions={[
            { label: 'Add Contact', onClick: () => contactModal.open(), icon: Users },
            { label: 'Create Deal', onClick: () => dealModal.open(), variant: 'secondary', icon: BadgeDollarSign }
          ]}
          aiTip="NexusCRM uses AI to analyze your activities and predict which deals are most likely to close this month!"
        />
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6 space-y-8 page-fade-in pb-24 md:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{greeting}</h1>
          <p className="text-muted-foreground mt-1">Here's your overview for today, {format(new Date(), 'MMMM d, yyyy')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="hidden lg:flex items-center gap-1 bg-card p-1 rounded-xl border border-border shadow-sm">
            {['This Month', 'This Quarter'].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                  "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                  dateRange === range 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="p-2.5 bg-card border border-border rounded-xl text-muted-foreground hover:bg-muted ripple">
            <Filter size={18} />
          </button>
          <button className="flex items-center px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 shadow-sm transition-all btn-hover ripple">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          label="Pipeline Value"
          value={data.stats.pipelineValue}
          prefix="$"
          change={`+${data.stats.pipelineChange}%`}
          isPositive={true}
          icon={BadgeDollarSign}
          color="indigo"
          sparklineData={[45, 52, 48, 61, 55, 67, 72]}
          onClick={() => navigate('/deals')}
        />
        <StatCard 
          label="Deals Won"
          value={data.stats.dealsWon}
          change={`+${data.stats.dealsWonChange}`}
          isPositive={true}
          icon={Target}
          color="emerald"
          sparklineData={[2, 4, 3, 5, 4, 7, 8]}
          onClick={() => navigate('/deals?stage=Closed%20Won')}
        />
        <StatCard 
          label="Win Rate"
          value={data.stats.winRate}
          suffix="%"
          change={`-${Math.abs(data.stats.winRateChange)}%`}
          isPositive={false}
          icon={TrendingUp}
          color="violet"
          sparklineData={[48, 47, 49, 46, 45, 44, 45]}
          onClick={() => navigate('/reports')}
        />
        <StatCard 
          label="Avg Deal"
          value={data.stats.avgDealSize}
          prefix="$"
          change={`+${data.stats.avgDealSizeChange}%`}
          isPositive={true}
          icon={Users}
          color="amber"
          sparklineData={[58, 60, 59, 62, 61, 63, 62]}
          onClick={() => navigate('/deals')}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6 h-full">
          <ChartContainer
            title="Revenue Forecast"
            subtitle="Monthly revenue with AI-powered predictions"
          >
            <RevenueLineChart data={data.revenueForecast.map(d => ({
              name: d.month,
              actual: d.actual,
              predicted: d.predicted,
              confidenceRange: d.actual ? [d.actual * 0.9, d.actual * 1.1] : [d.predicted! * 0.85, d.predicted! * 1.15]
            }))} />
          </ChartContainer>
        </div>

        <div className="lg:col-span-4 h-full">
          <ChartContainer
            title="Pipeline by Stage"
            subtitle="Current deal distribution across stages"
          >
            <PipelineByStageBar 
              data={data.pipelineByStage.map(d => ({
                name: d.stage,
                value: d.value,
                count: Math.round(d.value / 25000) || 1, // Mocking count for demo
                color: d.color
              }))} 
              onBarClick={(stage) => navigate(`/deals?stage=${encodeURIComponent(stage)}`)}
            />
          </ChartContainer>
        </div>
      </div>

      {/* AI Briefing & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 transition-transform group-hover:scale-110">
                    <Brain size={120} />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <Brain size={24} />
                        AI Daily Briefing
                      </h3>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
                        3 Priority Actions
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {data.aiBriefing.needsAttention.slice(0, 2).map((item) => (
                        <div 
                          key={item.id} 
                          className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 cursor-pointer hover:bg-white/20 transition-colors"
                          onClick={() => navigate('/ai-insights')}
                        >
                          <p className="text-sm font-medium">{item.text}</p>
                        </div>
                      ))}
                      <div 
                        className="bg-emerald-400/20 backdrop-blur-md rounded-xl p-4 border border-emerald-400/20 cursor-pointer hover:bg-emerald-400/30 transition-colors"
                        onClick={() => navigate('/contacts')}
                      >
                        <p className="text-sm font-medium">{data.aiBriefing.goodNews[0].text}</p>
                      </div>
                    </div>
        
                    <button 
                      onClick={() => navigate('/tasks')}
                      className="w-full py-3 bg-white text-primary font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-all ripple"
                    >
                      Review Priority Tasks
                    </button>
                  </div>
                </div>
        
                <SalesLeaderboard data={data.salesLeaderboard} />
              </div>
        
              {/* Activity & Lead Scoring */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-card p-6 rounded-2xl border border-border shadow-sm">
                  <ActivityTimeline 
                    onLogClick={() => setIsActivityModalOpen(true)}
                  />
                </div>
        
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                      <Calendar size={20} className="text-primary" />
                      Upcoming Tasks
                    </h3>
                    <div className="space-y-3">
                      {data.upcomingTasks.slice(0, 5).map(task => (
                        <div 
                          key={task.id} 
                          onClick={() => navigate('/tasks')}
                          className="flex items-center gap-3 p-3 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors group cursor-pointer"
                        >
                          <div className="w-5 h-5 rounded border-2 border-border flex-shrink-0 group-hover:border-primary transition-colors"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-foreground truncate">{task.title}</p>
                            <p className="text-[10px] text-muted-foreground font-medium">Due: {task.dueDate ? format(new Date(task.dueDate), 'MMM d') : 'No date'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <AlertTriangle size={20} className="text-rose-500" />
              Deals at Risk
            </h3>
            <div className="space-y-3">
              {data.dealsAtRisk && data.dealsAtRisk.length > 0 ? (
                data.dealsAtRisk.slice(0, 3).map(deal => (
                  <div 
                    key={deal.id} 
                    onClick={() => navigate(`/deals/${deal.id}`)}
                    className="flex items-center justify-between p-3 rounded-xl border border-rose-100 bg-rose-50/30 hover:bg-rose-50 transition-colors group cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{deal.name}</p>
                      <p className="text-[10px] text-rose-600 font-medium">{deal.stage} • {deal.probability}% probability</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-gray-900">{formatCurrency(deal.value)}</p>
                      <ChevronRight size={14} className="text-rose-300 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground text-xs font-medium">
                  No deals currently at risk. Good job!
                </div>
              )}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <ChartContainer
              title="Lead Scoring"
              subtitle="Distribution of lead quality"
              showExport={false}
            >
              <LeadScoreDonut 
                data={data.leadScoreDistribution.map(d => ({
                  name: d.category,
                  value: d.count,
                  color: d.color,
                  range: d.category === 'Hot' ? '90-100' : d.category === 'Warm' ? '70-89' : d.category === 'Cool' ? '50-69' : '0-49',
                  icon: d.category === 'Hot' ? '🔥' : d.category === 'Warm' ? '🌡️' : d.category === 'Cool' ? '😐' : '❄️'
                }))}
                onSegmentClick={(segment) => navigate(`/contacts?score=${segment}`)}
              />
            </ChartContainer>
          </div>
        </div>
      </div>

      <LogActivityModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        onSuccess={fetchData}
      />
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change: string;
  isPositive: boolean;
  icon: any;
  color: string;
  sparklineData: number[];
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, prefix, suffix, change, isPositive, icon: Icon, color, sparklineData, onClick }) => {
  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-500/10 text-indigo-500',
    emerald: 'bg-emerald-500/10 text-emerald-500',
    violet: 'bg-violet-500/10 text-violet-500',
    amber: 'bg-amber-500/10 text-amber-500',
  };

  return (
    <div 
      className="bg-card p-6 rounded-2xl border border-border shadow-sm card-hover cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2.5 rounded-xl", colorMap[color])}>
          <Icon size={20} />
        </div>
        <div className={cn(
          "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full",
          isPositive ? "text-emerald-500 bg-emerald-500/10" : "text-destructive bg-destructive/10"
        )}>
          {change}
        </div>
      </div>
      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{label}</p>
      <div className="flex items-end justify-between mt-1">
        <div className="text-2xl font-bold text-foreground">
          <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
        </div>
        <div className="pb-1">
          <Sparkline data={sparklineData} width={60} height={24} />
        </div>
      </div>
    </div>
  );
};
