import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, Calendar, Monitor, FileText, 
  Check, Sparkles, ChevronDown, ChevronRight,
  Filter, Plus, Smile, Meh, Frown, AlertTriangle,
  ExternalLink, MessageSquare, Clock, User, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { activityService } from '@/services/activity.service';
import { Activity, ActivityType } from '@/types';
import { Skeleton } from '@/components/common/Skeletons';

interface ActivityTimelineProps {
  contactId?: number;
  dealId?: number;
  onLogClick?: () => void;
  className?: string;
}

const TYPE_CONFIG: Record<string, { icon: any; color: string; bgColor: string; borderColor: string }> = {
  Email: { icon: Mail, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20', borderColor: 'border-blue-100 dark:border-blue-900/30' },
  Call: { icon: Phone, color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20', borderColor: 'border-green-100 dark:border-green-900/30' },
  Meeting: { icon: Calendar, color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20', borderColor: 'border-purple-100 dark:border-purple-900/30' },
  Demo: { icon: Monitor, color: 'text-indigo-500', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20', borderColor: 'border-indigo-100 dark:border-indigo-900/30' },
  Note: { icon: FileText, color: 'text-slate-500', bgColor: 'bg-slate-50 dark:bg-slate-900/20', borderColor: 'border-slate-100 dark:border-slate-800' },
  Task: { icon: Check, color: 'text-emerald-500', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20', borderColor: 'border-emerald-100 dark:border-emerald-900/30' },
  'Follow-up': { icon: Clock, color: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20', borderColor: 'border-orange-100 dark:border-orange-900/30' },
  Other: { icon: Plus, color: 'text-gray-500', bgColor: 'bg-gray-50 dark:bg-gray-900/20', borderColor: 'border-gray-100 dark:border-gray-800' },
  AI: { icon: Sparkles, color: 'text-violet-500', bgColor: 'bg-violet-50 dark:bg-violet-900/20', borderColor: 'border-violet-100 dark:border-violet-900/30' },
  'Deal Update': { icon: TrendingUp, color: 'text-amber-500', bgColor: 'bg-amber-50 dark:bg-amber-900/20', borderColor: 'border-amber-100 dark:border-amber-900/30' },
};

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  contactId,
  dealId,
  onLogClick,
  className
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<ActivityType | 'All'>('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadActivities();
  }, [contactId, dealId, filter]);

  const loadActivities = async () => {
    setIsLoading(true);
    try {
      const data = await activityService.getActivities({ contactId, dealId });
      setActivities(data);
    } catch (error) {
      console.error('Failed to load activities', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredActivities = filter === 'All' 
    ? activities 
    : activities.filter(a => a.type === filter);

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
    emails: activities.filter(a => a.type === 'Email').length,
    calls: activities.filter(a => a.type === 'Call').length,
    meetings: activities.filter(a => a.type === 'Meeting').length,
    demos: activities.filter(a => a.type === 'Demo').length,
    notes: activities.filter(a => a.type === 'Note').length,
  };

  if (isLoading && page === 1) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full rounded-xl" />
        {[1, 2, 3].map(i => (
          <div key={i} className="flex gap-4">
            <Skeleton className="w-10 h-10 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header & Stats */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Activity Timeline</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {stats.total} activities | {stats.emails} emails | {stats.calls} calls | {stats.meetings} meetings
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                <Filter className="w-4 h-4 text-slate-400" />
                {filter}
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-10 hidden group-hover:block overflow-hidden">
                {['All', 'Email', 'Call', 'Meeting', 'Demo', 'Note'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            {onLogClick && (
              <button 
                onClick={onLogClick}
                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
              >
                <Plus className="w-4 h-4" />
                Log
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative space-y-8">
        {/* Central Line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />

        {Object.entries(activityGroups).map(([date, items]) => (
          <div key={date} className="space-y-6 relative">
            {/* Sticky Date Header */}
            <div className="sticky top-0 z-10 py-1 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center relative z-20">
                <Calendar className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex-1 px-4 py-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {date}
              </div>
            </div>

            {/* Activities in this group */}
            <div className="space-y-6 pl-5">
              {items.map((activity) => {
                const config = TYPE_CONFIG[activity.type] || TYPE_CONFIG.Other;
                const isExpanded = expandedId === activity.id;

                return (
                  <div key={activity.id} className="relative pl-10 group">
                    {/* Activity Dot & Icon */}
                    <div className={cn(
                      "absolute left-0 top-0 w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center z-10 transition-transform group-hover:scale-110",
                      config.bgColor
                    )}>
                      <config.icon className={cn("w-4 h-4", config.color)} />
                    </div>

                    {/* Content Card */}
                    <motion.div 
                      layout
                      className={cn(
                        "p-4 bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 cursor-pointer",
                        isExpanded 
                          ? "border-indigo-200 dark:border-indigo-900 shadow-xl" 
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md"
                      )}
                      onClick={() => setExpandedId(isExpanded ? null : activity.id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{activity.title}</h4>
                            {activity.aiSummary && (
                              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 rounded text-[10px] font-bold uppercase tracking-wider">
                                <Sparkles className="w-2.5 h-2.5" /> AI
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {activity.durationMinutes && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {activity.durationMinutes} min
                              </span>
                            )}
                            {activity.outcome && (
                              <span className={cn(
                                "flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
                                activity.outcome === 'Connected' || activity.outcome === 'Completed' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                activity.outcome === 'Pending' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                                "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                              )}>
                                {activity.outcome}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {activity.sentiment && (
                            <div className={cn(
                              "p-1.5 rounded-lg",
                              activity.sentiment === 'Positive' ? "bg-green-50 text-green-600 dark:bg-green-900/20" :
                              activity.sentiment === 'Negative' ? "bg-red-50 text-red-600 dark:bg-red-900/20" :
                              activity.sentiment === 'Cautious' ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20" :
                              "bg-blue-50 text-blue-600 dark:bg-blue-900/20"
                            )}>
                              {activity.sentiment === 'Positive' && <Smile className="w-4 h-4" />}
                              {activity.sentiment === 'Negative' && <Frown className="w-4 h-4" />}
                              {activity.sentiment === 'Neutral' && <Meh className="w-4 h-4" />}
                              {activity.sentiment === 'Cautious' && <AlertTriangle className="w-4 h-4" />}
                            </div>
                          )}
                          <ChevronRight className={cn("w-4 h-4 text-slate-400 transition-transform", isExpanded && "rotate-90")} />
                        </div>
                      </div>

                      <div className="mt-2">
                        <p className={cn(
                          "text-sm text-slate-600 dark:text-slate-400",
                          !isExpanded && "line-clamp-1"
                        )}>
                          {activity.description}
                        </p>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                              {/* Metadata Specifics */}
                              {activity.type === 'Email' && activity.metadata?.subject && (
                                <div className="space-y-1">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject</p>
                                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{activity.metadata.subject}</p>
                                </div>
                              )}

                              {activity.type === 'Meeting' && activity.metadata?.location && (
                                <div className="space-y-1">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <ExternalLink className="w-3 h-3 text-indigo-500" />
                                    {activity.metadata.location}
                                  </p>
                                </div>
                              )}

                              {/* AI Key Points */}
                              {activity.keyPoints && activity.keyPoints.length > 0 && (
                                <div className="p-3 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/20 rounded-xl space-y-2">
                                  <h5 className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles className="w-3 h-3" /> AI Extracted Points
                                  </h5>
                                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                                    {activity.keyPoints.map((point, idx) => (
                                      <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                                        {point}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Next Steps */}
                              {activity.nextSteps && (
                                <div className="space-y-1">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Steps</p>
                                  <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                                    {activity.nextSteps}
                                  </p>
                                </div>
                              )}

                              {/* Action Buttons */}
                              <div className="flex flex-wrap gap-2 pt-2">
                                {activity.type === 'Email' && (
                                  <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors">
                                    <Mail className="w-3 h-3" /> View Email
                                  </button>
                                )}
                                {activity.type === 'Call' && (
                                  <button className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg text-xs font-bold hover:bg-green-100 transition-colors">
                                    <Phone className="w-3 h-3" /> Schedule Follow-up
                                  </button>
                                )}
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
                                  <MessageSquare className="w-3 h-3" /> Add Internal Comment
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {paginatedActivities.length < filteredActivities.length && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            Load More Activities...
          </button>
        </div>
      )}

      {filteredActivities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Filter className="w-8 h-8 text-slate-300 dark:text-slate-600" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">No activities found</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Try changing your filter or log a new activity to get started.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
