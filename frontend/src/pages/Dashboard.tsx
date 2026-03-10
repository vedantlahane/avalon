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
import { dashboardService } from '../services/dashboard.service';
import { DashboardData } from '../types';
import { cn, formatCurrency } from '../lib/utils';
import { format } from 'date-fns';

import { useNavigate } from 'react-router-dom';
import { SalesLeaderboard } from '../components/dashboard/SalesLeaderboard';
import { EmptyState } from '../components/common/EmptyState';
import { DashboardSkeleton } from '../components/common/Skeletons';
import { ErrorState } from '../components/common/ErrorState';

import { ActivityTimeline } from '../components/activities/ActivityTimeline';
import { LogActivityModal } from '../components/activities/LogActivityModal';

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
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const dashboardData = await dashboardService.getDashboardData();
      setData(dashboardData);
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

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning! 👋';
    if (hour < 18) return 'Good afternoon! 👋';
    return 'Good evening! 👋';
  }, []);

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <ErrorState onRetry={fetchData} />;

  if (!data || (data.stats.pipelineValue === 0 && data.activities.length === 0)) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-8 page-fade-in">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">{greeting}</h1>
        <EmptyState
          icon={Users}
          title="Welcome to NexusCRM!"
          description="Your dashboard is currently empty. Start by adding your first contact or deal to unlock AI-powered insights, revenue forecasting, and performance tracking."
          actions={[
            { label: 'Add Contact', onClick: () => navigate('/contacts'), icon: Users },
            { label: 'Create Deal', onClick: () => navigate('/deals'), variant: 'secondary', icon: BadgeDollarSign }
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
          onClick={() => navigate('/deals')}
        />
        <StatCard 
          label="Deals Won"
          value={data.stats.dealsWon}
          change={`+${data.stats.dealsWonChange}`}
          isPositive={true}
          icon={Target}
          color="emerald"
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
          onClick={() => navigate('/deals')}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6 bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-foreground">Revenue Forecast</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary"></span> Actual
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary/40"></span> Predicted
              </span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.revenueForecast}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818CF8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#818CF8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-border" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} className="text-muted-foreground" />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} className="text-muted-foreground" tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)', 
                    color: 'var(--foreground)',
                    borderRadius: '12px', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                  }} 
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Area type="monotone" dataKey="actual" stroke="#818CF8" fill="url(#colorActual)" strokeWidth={3} animationDuration={1500} />
                <Area type="monotone" dataKey="predicted" stroke="#818CF8" strokeOpacity={0.4} strokeDasharray="5 5" fill="none" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-6">Pipeline by Stage</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={data.pipelineByStage}>
                <XAxis type="number" hide />
                <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: 'currentColor' }} className="text-foreground" width={80} />
                <Tooltip 
                  cursor={{ fill: 'var(--muted)', opacity: 0.1 }} 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px' }} 
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {data.pipelineByStage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
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
                <div key={item.id} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <p className="text-sm font-medium">{item.text}</p>
                </div>
              ))}
              <div className="bg-emerald-400/20 backdrop-blur-md rounded-xl p-4 border border-emerald-400/20">
                <p className="text-sm font-medium">{data.aiBriefing.goodNews[0].text}</p>
              </div>
            </div>

            <button className="w-full py-3 bg-white text-primary font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-all ripple">
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
                <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors group cursor-pointer">
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
            <h3 className="text-lg font-bold text-foreground mb-6">Lead Scoring</h3>
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.leadScoreDistribution}
                    cx="50%" cy="50%"
                    innerRadius={60} outerRadius={80}
                    paddingAngle={5} dataKey="count"
                  >
                    {data.leadScoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', border: 'none', borderRadius: '12px' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-foreground">90</span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Leads</span>
              </div>
            </div>
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
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, prefix, suffix, change, isPositive, icon: Icon, color, onClick }) => {
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
      <div className="text-2xl font-bold text-foreground mt-1">
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
      </div>
    </div>
  );
};
