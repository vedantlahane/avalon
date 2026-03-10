import React, { useState } from 'react';
import { Trophy, TrendingUp, Zap, Target, Flame, Mail, Clock, Brain, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { SalesLeaderboard as SalesLeaderboardType, LeaderboardRep } from '../../types';

interface SalesLeaderboardProps {
  data: SalesLeaderboardType;
}

export const SalesLeaderboard: React.FC<SalesLeaderboardProps> = ({ data }) => {
  const [period, setPeriod] = useState(data.period);

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${rank}.`;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 size={14} className="text-emerald-500" />;
      case 'warning': return <AlertTriangle size={14} className="text-amber-500" />;
      case 'info': return <Zap size={14} className="text-indigo-500" />;
      default: return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
      {/* Leaderboard Card */}
      <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Trophy size={20} className="text-amber-500" />
            Sales Leaderboard - March 2026
          </h3>
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
            {['This Week', 'This Month', 'This Quarter', 'All Time'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p as any)}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                  period === p 
                    ? "bg-white text-indigo-600 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6 flex-1 space-y-5">
          {data.reps.map((rep) => (
            <div 
              key={rep.id} 
              className={cn(
                "p-4 rounded-xl border transition-all",
                rep.isCurrentUser 
                  ? "bg-indigo-50/50 border-indigo-100 ring-1 ring-indigo-500/20 shadow-sm" 
                  : "bg-white border-transparent hover:border-gray-100 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold w-6">{getRankEmoji(rep.rank)}</span>
                  <div>
                    <span className={cn("text-sm font-bold text-gray-900", rep.isCurrentUser && "text-indigo-700")}>
                      {rep.name} {rep.isCurrentUser && "(You)"}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500 font-medium">{rep.dealsWon} deals won</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span className="text-xs text-gray-500 font-medium">Target: {rep.target}%</span>
                      {getStatusIcon(rep.status)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{formatCurrency(rep.revenue)}</span>
                </div>
              </div>
              <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "absolute top-0 left-0 h-full transition-all duration-1000",
                    rep.rank === 1 ? "bg-amber-400" : rep.isCurrentUser ? "bg-indigo-500" : "bg-gray-400"
                  )}
                  style={{ width: `${Math.min(rep.target, 100)}%` }}
                ></div>
                {rep.target > 100 && (
                  <div 
                    className="absolute top-0 left-0 h-full bg-emerald-400/50"
                    style={{ width: `${Math.min(rep.target - 100, 100)}%`, left: '100%' }}
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Badges & AI Coaching */}
      <div className="lg:col-span-4 space-y-8">
        {/* Achievements Badges */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap size={20} className="text-indigo-600" />
            Achievements Badges
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {data.achievements.map((badge) => (
              <div 
                key={badge.id} 
                className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col items-center text-center group hover:bg-white hover:shadow-md transition-all"
              >
                <span className="text-3xl mb-2 transition-transform group-hover:scale-125 duration-300">{badge.icon}</span>
                <span className="text-sm font-bold text-gray-900">{badge.title}</span>
                <span className="text-[10px] font-medium text-gray-500 mt-1">{badge.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Coaching */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4">
            <Brain size={24} className="text-indigo-600 opacity-20 group-hover:opacity-40 transition-opacity" />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Brain size={18} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">AI Coaching</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed italic">
              "🤖 {data.aiCoaching}"
            </p>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-all">
                View Recommendations
              </button>
              <button className="flex-1 py-2 text-xs font-bold text-indigo-600 border border-indigo-100 rounded-lg hover:bg-indigo-50 transition-all">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};