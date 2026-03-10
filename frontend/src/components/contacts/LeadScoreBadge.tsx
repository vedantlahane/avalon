import React from 'react';
import { cn } from '@/lib/utils';

interface LeadScoreBadgeProps {
  score: number;
  category?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const LeadScoreBadge: React.FC<LeadScoreBadgeProps> = ({ 
  score, 
  category, 
  size = 'md',
  showLabel = true
}) => {
  const getCategoryInfo = (s: number) => {
    if (s >= 90) return { label: 'Hot Lead', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: '🔥' };
    if (s >= 70) return { label: 'Warm Lead', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', icon: '🌡️' };
    if (s >= 50) return { label: 'Cool Lead', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: '😐' };
    if (s >= 25) return { label: 'Cold Lead', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400', icon: '❄️' };
    return { label: 'Unqualified', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-500', icon: '⛔' };
  };

  const info = getCategoryInfo(score);
  const displayLabel = category || info.label;

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm font-medium'
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 rounded-full",
      info.color,
      sizeClasses[size]
    )}>
      <span>{info.icon}</span>
      {showLabel && <span>{displayLabel}</span>}
      <span className="font-bold ml-0.5">{score}</span>
    </div>
  );
};
