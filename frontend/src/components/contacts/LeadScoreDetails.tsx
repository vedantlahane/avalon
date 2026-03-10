import React, { useState, useEffect } from 'react';
import { Contact, LeadScoreHistory } from '@/types';
import { contactService } from '@/services/contact.service';
import { RefreshCw, TrendingUp, TrendingDown, Info, Calendar, History, ArrowUpRight, ArrowDownRight, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface LeadScoreDetailsProps {
  contact: Contact;
  onRefresh?: (updatedContact: Partial<Contact>) => void;
}

export const LeadScoreDetails: React.FC<LeadScoreDetailsProps> = ({ contact, onRefresh }) => {
  const [history, setHistory] = useState<LeadScoreHistory[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'breakdown' | 'history'>('breakdown');

  useEffect(() => {
    fetchHistory();
  }, [contact.id]);

  const fetchHistory = async () => {
    try {
      const data = await contactService.getLeadScoreHistory(contact.id);
      setHistory(data);
    } catch (error) {
      console.error('Failed to fetch lead score history', error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const result = await contactService.refreshLeadScore(contact.id);
      if (onRefresh) onRefresh(result);
      await fetchHistory();
    } catch (error) {
      console.error('Failed to refresh lead score', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getCategoryInfo = (score: number) => {
    if (score >= 90) return { label: 'HOT LEAD', color: 'text-red-500', bg: 'bg-red-500', icon: '🔥' };
    if (score >= 70) return { label: 'WARM LEAD', color: 'text-orange-500', bg: 'bg-orange-500', icon: '🌡️' };
    if (score >= 50) return { label: 'COOL LEAD', color: 'text-blue-500', bg: 'bg-blue-500', icon: '😐' };
    if (score >= 25) return { label: 'COLD LEAD', color: 'text-slate-500', bg: 'bg-slate-500', icon: '❄️' };
    return { label: 'UNQUALIFIED', color: 'text-gray-500', bg: 'bg-gray-500', icon: '⛔' };
  };

  const catInfo = getCategoryInfo(contact.leadScore);

  const chartData = [...history].reverse().map(h => ({
    time: format(new Date(h.timestamp), 'MMM d'),
    score: h.score,
    change: h.change
  }));

  // If no history, show current score
  if (chartData.length === 0) {
    chartData.push({
      time: format(new Date(), 'MMM d'),
      score: contact.leadScore,
      change: 0
    });
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <TrendingUp size={18} />
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">AI Lead Scoring</h3>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors disabled:opacity-50"
          title="Refresh Score"
        >
          <RefreshCw size={18} className={cn(isRefreshing && "animate-spin")} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Main Score Display */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-100 dark:text-slate-700"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={364.4}
                strokeDashoffset={364.4 - (364.4 * contact.leadScore) / 100}
                strokeLinecap="round"
                className={cn("transition-all duration-1000", catInfo.color)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">{contact.leadScore}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Score</span>
            </div>
          </div>
          <div className="text-center">
            <div className={cn("text-xs font-bold uppercase tracking-widest", catInfo.color)}>
              {catInfo.icon} {catInfo.label}
            </div>
            {contact.scoreTrend !== 0 && (
              <div className={cn(
                "flex items-center justify-center gap-1 text-xs mt-1 font-medium",
                contact.scoreTrend > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
              )}>
                {contact.scoreTrend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{contact.scoreTrend > 0 ? '+' : ''}{contact.scoreTrend} this week</span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
          <button
            onClick={() => setActiveTab('breakdown')}
            className={cn(
              "flex-1 py-1.5 text-xs font-medium rounded-md transition-all",
              activeTab === 'breakdown' 
                ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            Score Breakdown
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={cn(
              "flex-1 py-1.5 text-xs font-medium rounded-md transition-all",
              activeTab === 'history' 
                ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            Score History
          </button>
        </div>

        {activeTab === 'breakdown' ? (
          <div className="space-y-4">
            {/* Demographic */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
                <span>Demographic (40%)</span>
                <span>{contact.demographicScore}/40</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <ScoreCriterion 
                  label="Job Title" 
                  value={contact.scoreBreakdown?.demographic.jobTitle || 0} 
                  max={20} 
                />
                <ScoreCriterion 
                  label="Co. Size" 
                  value={contact.scoreBreakdown?.demographic.companySize || 0} 
                  max={15} 
                />
                <ScoreCriterion 
                  label="Industry" 
                  value={contact.scoreBreakdown?.demographic.industry || 0} 
                  max={10} 
                />
                <ScoreCriterion 
                  label="Location" 
                  value={contact.scoreBreakdown?.demographic.location || 0} 
                  max={5} 
                />
              </div>
            </div>

            {/* Behavioral */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
                <span>Behavioral (60%)</span>
                <span>{contact.behavioralScore}/60</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <ScoreCriterion 
                  label="Email" 
                  value={contact.scoreBreakdown?.behavioral.emailEngagement || 0} 
                  max={25} 
                />
                <ScoreCriterion 
                  label="Meeting" 
                  value={contact.scoreBreakdown?.behavioral.meetingAttendance || 0} 
                  max={25} 
                />
                <ScoreCriterion 
                  label="Response" 
                  value={contact.scoreBreakdown?.behavioral.responseTime || 0} 
                  max={15} 
                />
                <ScoreCriterion 
                  label="Recency" 
                  value={contact.scoreBreakdown?.behavioral.recency || 0} 
                  max={15} 
                />
              </div>
            </div>

            {/* Negative Deductions */}
            {contact.scoreBreakdown && contact.scoreBreakdown.negative > 0 && (
              <div className="p-3 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-lg">
                <div className="flex items-center justify-between text-xs font-semibold text-rose-700 dark:text-rose-400">
                  <span className="flex items-center gap-1.5"><ArrowDownRight size={14} /> Negative Deductions</span>
                  <span>-{contact.scoreBreakdown.negative} pts</span>
                </div>
              </div>
            )}

            {/* AI Note */}
            {contact.aiNote && (
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/30 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-900/30">
                    <Bot size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider mb-1">AI Recommendation</h4>
                    <p className="text-sm text-indigo-700 dark:text-indigo-400 leading-relaxed">
                      "{contact.aiNote}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Trend Chart */}
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 text-white p-2 rounded shadow-xl text-[10px] border border-slate-700">
                            <div className="font-bold">{payload[0].payload.time}</div>
                            <div>Score: {payload[0].value}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#scoreGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* History List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
              {history.map((item, idx) => (
                <div key={item.id} className="flex gap-3 relative pb-4 last:pb-0">
                  {idx !== history.length - 1 && (
                    <div className="absolute left-1.5 top-4 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
                  )}
                  <div className={cn(
                    "w-3 h-3 rounded-full mt-1 z-10 border-2 border-white dark:border-slate-800 shadow-sm",
                    item.change >= 0 ? "bg-emerald-500" : "bg-rose-500"
                  )} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{item.reason}</span>
                      <span className="text-[10px] text-slate-400">{format(new Date(item.timestamp), 'MMM d')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={cn(
                        "text-[10px] font-bold px-1 rounded flex items-center gap-0.5",
                        item.change >= 0 
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" 
                          : "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400"
                      )}>
                        {item.change >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                        {item.change > 0 ? '+' : ''}{item.change}
                      </span>
                      <span className="text-[10px] text-slate-400">Score: {item.score}</span>
                    </div>
                  </div>
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-center py-4 text-slate-400 text-xs italic">
                  No score history available yet.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ScoreCriterion: React.FC<{ label: string, value: number, max: number }> = ({ label, value, max }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-medium text-slate-500">{label}</span>
        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{value}/{max}</span>
      </div>
      <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full transition-all duration-500",
            percentage >= 75 ? "bg-indigo-500" : percentage >= 40 ? "bg-indigo-400" : "bg-indigo-300"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
