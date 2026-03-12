import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, Calendar, Monitor, FileText, 
  Check, Sparkles, ChevronDown, ChevronRight,
  Filter, Plus, Smile, Meh, Frown, AlertTriangle,
  ExternalLink, MessageSquare, Clock, User, TrendingUp, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { activityService } from '@/services/activity.service';
import { Activity, ActivityType } from '@/types';
import { Skeleton } from '@/components/common/Skeletons';
import { useNavigate } from 'react-router-dom';

interface ActivityTimelineProps {
  contactId?: string | number;
  dealId?: string | number;
  onLogClick?: () => void;
  className?: string;
}

const TYPE_CONFIG: Record<string, { icon: any; color: string; bgColor: string; borderColor: string }> = {
  email: { icon: Mail, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20', borderColor: 'border-blue-100 dark:border-blue-900/30' },
  call: { icon: Phone, color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20', borderColor: 'border-green-100 dark:border-green-900/30' },
  meeting: { icon: Calendar, color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20', borderColor: 'border-purple-100 dark:border-purple-900/30' },
  demo: { icon: Monitor, color: 'text-indigo-500', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20', borderColor: 'border-indigo-100 dark:border-indigo-900/30' },
  note: { icon: FileText, color: 'text-slate-500', bgColor: 'bg-slate-50 dark:bg-slate-900/20', borderColor: 'border-slate-100 dark:border-slate-800' },
  task: { icon: Check, color: 'text-emerald-500', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20', borderColor: 'border-emerald-100 dark:border-emerald-900/30' },
  Other: { icon: Plus, color: 'text-gray-500', bgColor: 'bg-gray-50 dark:bg-gray-900/20', borderColor: 'border-gray-100 dark:border-gray-800' },
};

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  contactId,
  dealId,
  onLogClick,
  className
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string | 'All'>('All');
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => { loadActivities(); }, [contactId, dealId, filter]);

  const loadActivities = async () => {
    setIsLoading(true);
    try {
      const data = await activityService.getActivities({ contactId: contactId?.toString(), dealId: dealId?.toString() });
      setActivities(data);
    } catch (error) {
      console.error('Failed to load activities', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredActivities = filter === 'All' 
    ? activities 
    : activities.filter(a => a.type.toLowerCase() === filter.toLowerCase());

  const paginatedActivities = filteredActivities.slice(0, page * itemsPerPage);

  const groupActivitiesByDate = (activities: Activity[]) => {
    const groups: Record<string, Activity[]> = {};
    activities.forEach(activity => {
      const date = new Date(activity.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      const label = date === today ? 'Today' : date;
      if (!groups[label]) groups[label] = [];
      groups[label].push(activity);
    });
    return groups;
  };

  const activityGroups = groupActivitiesByDate(paginatedActivities);

  const stats = {
    total: activities.length,
    emails: activities.filter(a => a.type.toLowerCase() === 'email').length,
    calls: activities.filter(a => a.type.toLowerCase() === 'call').length,
    meetings: activities.filter(a => a.type.toLowerCase() === 'meeting').length,
  };

  if (isLoading && page === 1) {
    return <Skeleton className="h-40 w-full rounded-xl" />;
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Timeline</h3>
        <div className="flex gap-2">
           <Button variant="ghost" size="sm" onClick={onLogClick}><Plus size={14} /> Log</Button>
        </div>
      </div>

      <div className="relative space-y-8">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--border-color)]" />
        {Object.entries(activityGroups).map(([date, items]) => (
          <div key={date} className="space-y-4 relative">
            <div className="sticky top-0 z-10 py-1 bg-[var(--bg-primary)] flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center relative z-20">
                <Calendar size={14} className="text-[var(--text-muted)]" />
              </div>
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{date}</span>
            </div>

            <div className="space-y-4 pl-5">
              {items.map((activity) => {
                const type = activity.type.toLowerCase();
                const config = TYPE_CONFIG[type] || TYPE_CONFIG.Other;
                const isExpanded = expandedId === activity.id;

                return (
                  <div key={activity.id} className="relative pl-10 group">
                    <div className={cn("absolute left-0 top-0 w-10 h-10 rounded-full border-2 border-[var(--bg-primary)] flex items-center justify-center z-10", config.bgColor)}>
                      <config.icon size={14} className={config.color} />
                    </div>

                    <div 
                      className={cn("p-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)] cursor-pointer hover:border-[var(--accent)] transition-all", isExpanded && "border-[var(--accent)]")}
                      onClick={() => setExpandedId(isExpanded ? null : activity.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-[var(--text-primary)]">{activity.title}</h4>
                          <p className="text-xs text-[var(--text-muted)] mt-1">{activity.description}</p>
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)] font-mono">
                          {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper components if needed
const Button = ({ children, variant, size, onClick }: any) => (
  <button onClick={onClick} className={`px-3 py-1 rounded text-xs ${variant === 'ghost' ? 'hover:bg-slate-100' : ''}`}>{children}</button>
);