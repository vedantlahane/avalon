import React, { useEffect, useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Users, 
  BadgeDollarSign, 
  Activity as ActivityIcon, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  Clock,
  Calendar,
  Phone,
  Mail,
  MoreVertical,
  AlertTriangle,
  CheckCircle2,
  Brain,
  ChevronRight,
  Filter
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
  Pie,
  Legend
} from 'recharts';
import { dashboardService } from '../services/dashboard.service';
import { DashboardData, Deal, Activity, Task } from '../types';
import { cn, formatCurrency } from '../lib/utils';
import { format } from 'date-fns';

import { useNavigate } from 'react-router-dom';
import { SalesLeaderboard } from '../components/dashboard/SalesLeaderboard';
import { EmptyState } from '../components/common/EmptyState';
import { Layout } from 'lucide-react';

const KPI_CARDS = [
  { id: 'pipeline', label: 'Pipeline Value', icon: BadgeDollarSign, color: 'bg-indigo-50 text-indigo-600', path: '/deals' },
  { id: 'won', label: 'Deals Won', icon: Target, color: 'bg-emerald-50 text-emerald-600', path: '/deals?stage=Won' },
  { id: 'winRate', label: 'Win Rate', icon: TrendingUp, color: 'bg-violet-50 text-violet-600', path: '/reports' },
  { id: 'avgDeal', label: 'Avg Deal Size', icon: Users, color: 'bg-amber-50 text-amber-600', path: '/deals' },
];

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('This Month');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const dashboardData = await dashboardService.getDashboardData();
      setData(dashboardData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Auto-refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning! 👋';
    if (hour < 18) return 'Good afternoon! 👋';
    return 'Good evening! 👋';
  }, []);

  const handleStageClick = (data: any) => {
    if (data && data.stage) {
      navigate(`/deals?stage=${data.stage}`);
    }
  };

  const handleLeadScoreClick = (data: any) => {
    if (data && data.category) {
      navigate(`/contacts?score=${data.category}`);
    }
  };

  if (isLoading && !data) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <div className="h-20 bg-gray-100 rounded-xl w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-100 rounded-2xl"></div>)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-gray-100 rounded-2xl"></div>
          <div className="h-96 bg-gray-100 rounded-2xl"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          <div className="lg:col-span-6 h-96 bg-gray-100 rounded-2xl"></div>
          <div className="lg:col-span-4 h-96 bg-gray-100 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!data || (data.stats.pipelineValue === 0 && data.activities.length === 0)) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{greeting}</h1>
        <EmptyState
          icon={Layout}
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
    <div className="max-w-[1600px] mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{greeting}</h1>
          <p className="text-gray-500 mt-1">Here's your CRM overview for today, {format(new Date('2026-03-06'), 'MMMM d, yyyy')}</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
          {['Today', 'This Week', 'This Month', 'This Quarter', 'Custom'].map(range => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                dateRange === range 
                  ? "bg-indigo-600 text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {range}
            </button>
          ))}
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Top Row - KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pipeline Value */}
        <StatCard 
          label="Pipeline Value"
          value={formatCurrency(data.stats.pipelineValue)}
          change={`↑ ${data.stats.pipelineChange}% vs last month`}
          isPositive={true}
          icon={BadgeDollarSign}
          color="indigo"
          progress={75}
          onClick={() => navigate('/deals')}
        />
        {/* Deals Won */}
        <StatCard 
          label="Deals Won"
          value={data.stats.dealsWon.toString()}
          change={`↑ ${data.stats.dealsWonChange} more than last month`}
          isPositive={true}
          icon={Target}
          color="emerald"
          subValue={`Target: ${data.stats.dealsWonTarget}`}
          onClick={() => navigate('/deals?stage=Closed%20Won')}
        />
        {/* Win Rate */}
        <StatCard 
          label="Win Rate"
          value={`${data.stats.winRate}%`}
          change={`↓ ${Math.abs(data.stats.winRateChange)}% from last month`}
          isPositive={false}
          icon={TrendingUp}
          color="violet"
          subValue={`Industry: ${data.stats.winRateIndustry}%`}
          onClick={() => navigate('/reports')}
        />
        {/* Avg Deal Size */}
        <StatCard 
          label="Avg Deal Size"
          value={formatCurrency(data.stats.avgDealSize)}
          change={`↑ ${data.stats.avgDealSizeChange}% vs last quarter`}
          isPositive={true}
          icon={Users}
          color="amber"
          onClick={() => navigate('/deals')}
        />
      </div>

      {/* Second Row - Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Revenue Forecast</h3>
              <p className="text-sm text-gray-500">Actual vs Predicted revenue</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="text-xs font-medium text-gray-600">Actual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-indigo-300 border border-indigo-500 border-dashed"></div>
                <span className="text-xs font-medium text-gray-600">Predicted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-300 border border-gray-400 border-dashed"></div>
                <span className="text-xs font-medium text-gray-600">Target</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.revenueForecast}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [formatCurrency(Number(value)), '']}
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#9ca3af" 
                  strokeDasharray="5 5" 
                  fill="none" 
                  strokeWidth={2} 
                />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#6366f1" 
                  strokeDasharray="5 5" 
                  fill="none" 
                  strokeWidth={2} 
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorActual)" 
                  strokeWidth={3} 
                />
                <Area 
                  type="monotone" 
                  dataKey="confidenceHigh" 
                  stroke="none" 
                  fill="#6366f1" 
                  fillOpacity={0.05} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Pipeline by Stage</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data.pipelineByStage}
                margin={{ left: 40 }}
                onClick={(e: any) => e && e.activePayload && handleStageClick(e.activePayload[0].payload)}
              >
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="stage" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 500, fill: '#4b5563' }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [formatCurrency(Number(value)), 'Value']}
                />
                <Bar 
                  dataKey="value" 
                  radius={[0, 4, 4, 0]} 
                  barSize={24}
                  className="cursor-pointer"
                >
                  {data.pipelineByStage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-between items-center text-xs text-gray-500 font-medium px-2">
            <span>Stage Name</span>
            <span>Total Value</span>
          </div>
        </div>
      </div>

      {/* Third Row - Briefing & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Daily Briefing */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-indigo-50/30">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Brain size={20} className="text-indigo-600" />
              AI Daily Briefing
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={fetchData}
                className="px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-white rounded-lg transition-colors"
              >
                Refresh insights
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <section>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Good news:</h4>
              <ul className="space-y-3">
                {data.aiBriefing.goodNews.map((item) => (
                  <li key={item.id} className="flex gap-3 text-sm text-gray-700">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Needs attention:</h4>
              <ul className="space-y-3">
                {data.aiBriefing.needsAttention.map((item) => (
                  <li key={item.id} className="flex gap-3 text-sm text-gray-700">
                    <AlertTriangle size={18} className={cn("shrink-0", item.type === 'danger' ? 'text-red-500' : 'text-amber-500')} />
                    <span>{item.text} {item.sentiment && <span className="text-xs font-medium text-gray-400">(sentiment: {item.sentiment})</span>}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Today's priorities:</h4>
              <div className="space-y-3">
                {data.aiBriefing.priorities.map((item, i) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group hover:bg-indigo-50 transition-colors">
                    <div className="flex gap-3 items-center">
                      <span className="text-sm font-bold text-gray-400">{i + 1}.</span>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                        {item.actionType === 'call' ? <Phone size={14} /> : item.actionType === 'email' ? <Mail size={14} /> : <Calendar size={14} />}
                        {item.text}
                      </div>
                    </div>
                    <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:underline">
                      {item.actionLabel} <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mt-4">
              <Brain size={18} />
              Tell me more
            </button>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Activity Feed</h3>
            <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="p-6 flex-1 space-y-6">
            {data.activities.map((activity, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-indigo-600">
                    {getActivityIcon(activity.type)}
                  </div>
                  {i !== data.activities.length - 1 && (
                    <div className="absolute top-10 bottom-[-24px] left-1/2 -translate-x-1/2 w-px bg-gray-100"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-gray-900 leading-tight">
                      <span className="font-bold">{activity.title}</span>
                      {activity.deal && <span> for <span className="font-semibold text-indigo-600">{activity.deal.name}</span></span>}
                    </p>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{formatRelativeTime(activity.date)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales Leaderboard Section */}
      <SalesLeaderboard data={data.salesLeaderboard} />

      {/* Fourth Row - Tables & Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Deals at Risk */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-500" />
            Top Deals at Risk
          </h3>
          <div className="space-y-4">
            {data.dealsAtRisk.map((deal) => (
              <div 
                key={deal.id} 
                className="p-4 rounded-xl border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-all group cursor-pointer"
                onClick={() => navigate(`/deals/${deal.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{deal.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{formatCurrency(deal.value)} • Stalled for 12 days</p>
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                    deal.priority === 'Critical' ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                  )}>
                    {deal.priority}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[11px] text-red-600 font-medium">No activity in 10 days</p>
                  <button className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks & Meetings */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar size={20} className="text-indigo-600" />
            Tasks & Meetings
          </h3>
          <div className="space-y-4">
            {data.upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 rounded-xl border border-transparent hover:bg-gray-50 transition-colors group">
                <div className="mt-1 w-4 h-4 rounded border border-gray-300 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors">
                  <div className="w-2 h-2 rounded-sm bg-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn(
                      "text-[10px] font-bold uppercase",
                      task.dueDate && isOverdue(task.dueDate) ? "text-red-500" : "text-gray-400"
                    )}>
                      {task.dueDate ? format(new Date(task.dueDate), 'MMM d, h:mm a') : 'No due date'}
                    </span>
                    {task.aiGenerated && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-500 uppercase">
                        <Brain size={8} /> AI
                      </span>
                    )}
                  </div>
                </div>
                <button className="text-xs font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Done
                </button>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/tasks')}
            className="w-full py-3 border border-indigo-100 text-indigo-600 font-bold text-sm rounded-xl mt-4 hover:bg-indigo-50 transition-all"
          >
            View all tasks
          </button>
        </div>

        {/* Lead Score Distribution */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Lead Score Distribution</h3>
          <div className="h-[220px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.leadScoreDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  onClick={handleLeadScoreClick}
                  className="cursor-pointer"
                >
                  {data.leadScoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-3xl font-bold text-gray-900">90</span>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Leads</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {data.leadScoreDistribution.map((item) => (
              <div 
                key={item.category} 
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={() => handleLeadScoreClick(item)}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <div>
                  <p className="text-xs font-bold text-gray-700">{item.category} ({item.range})</p>
                  <p className="text-[10px] font-medium text-gray-400">{item.count} contacts</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: any;
  color: 'indigo' | 'emerald' | 'violet' | 'amber';
  progress?: number;
  subValue?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, isPositive, icon: Icon, color, progress, subValue, onClick }) => {
  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    violet: 'bg-violet-50 text-violet-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div 
      className={cn(
        "bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110", colorMap[color])}>
          <Icon size={22} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
          isPositive ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
        )}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1 font-mono tracking-tight">{value}</h3>
        {subValue && <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-wider">{subValue}</p>}
        {progress !== undefined && (
          <div className="mt-4">
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={cn("h-full rounded-full", color === 'indigo' ? 'bg-indigo-600' : 'bg-emerald-600')} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'Email': return <Mail size={18} />;
    case 'Call': return <Phone size={18} />;
    case 'Meeting': return <Calendar size={18} />;
    case 'Task': return <CheckCircle2 size={18} />;
    default: return <ActivityIcon size={18} />;
  }
};

const formatRelativeTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return format(date, 'MMM d');
};

const isOverdue = (dateStr: string) => {
  return new Date(dateStr) < new Date();
};