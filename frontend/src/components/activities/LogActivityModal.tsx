import React, { useState, useEffect } from 'react';
import { 
  X, Mail, Phone, Calendar, Monitor, FileText, 
  Search, Check, Sparkles, AlertCircle, TrendingUp, 
  ChevronDown, Plus, User, Briefcase, Clock,
  Smile, Meh, Frown, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toastStore } from '@/lib/toast-store';
import { activityService } from '@/services/activity.service';
import { contactService } from '@/services/contact.service';
import { dealService } from '@/services/deal.service';
import { taskService } from '@/services/task.service';
import { Contact, Deal, ActivityType, ActivityOutcome } from '@/types';

interface LogActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactId?: number;
  dealId?: number;
  onSuccess?: () => void;
}

const ACTIVITY_TYPES: { id: ActivityType; label: string; icon: any; color: string }[] = [
  { id: 'Email', label: 'Email', icon: Mail, color: 'text-blue-500 bg-blue-50' },
  { id: 'Call', label: 'Call', icon: Phone, color: 'text-green-500 bg-green-50' },
  { id: 'Meeting', label: 'Meeting', icon: Calendar, color: 'text-purple-500 bg-purple-50' },
  { id: 'Demo', label: 'Demo', icon: Monitor, color: 'text-indigo-500 bg-indigo-50' },
  { id: 'Note', label: 'Note', icon: FileText, color: 'text-gray-500 bg-gray-50' },
  { id: 'Other', label: 'Other', icon: Plus, color: 'text-slate-500 bg-slate-50' },
];

const CALL_OUTCOMES: ActivityOutcome[] = [
  'Connected', 'Left Voicemail', 'No Answer', 'Busy', 'Wrong Number'
];

export const LogActivityModal: React.FC<LogActivityModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  contactId: initialContactId,
  dealId: initialDealId
}) => {
  const [activeTab, setActiveTab] = useState<ActivityType>('Email');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAiSummary, setShowAiSummary] = useState(false);

  const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' | 'ai') => {
    toastStore.add({
      type,
      title: type === 'ai' ? 'AI Insights' : type.charAt(0).toUpperCase() + type.slice(1),
      message
    });
  };

  
  // Form State
  const [contactId, setContactId] = useState<number | undefined>(initialContactId);
  const [dealId, setDealId] = useState<number | undefined>(initialDealId);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
  const [duration, setDuration] = useState(15);
  const [outcome, setOutcome] = useState<ActivityOutcome>('Connected');
  const [summary, setSummary] = useState('');
  const [sentiment, setSentiment] = useState<'Positive' | 'Neutral' | 'Negative' | 'Cautious'>('Neutral');
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [nextSteps, setNextSteps] = useState('');
  const [autoCreateTasks, setAutoCreateTasks] = useState(true);
  const [extractedTasks, setExtractedTasks] = useState<{ title: string; dueDate: string; priority: string; selected: boolean }[]>([]);
  
  // Search State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [contactSearch, setContactSearch] = useState('');
  const [dealSearch, setDealSearch] = useState('');

  // Email specific
  const [subject, setSubject] = useState('');

  // Meeting specific
  const [location, setLocation] = useState('');
  const [attendees, setAttendees] = useState<number[]>([]);

  // Demo specific
  const [products, setProducts] = useState<string[]>([]);
  const [engagement, setEngagement] = useState<'High' | 'Medium' | 'Low'>('Medium');

  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  const loadInitialData = async () => {
    try {
      const [allContacts, allDeals] = await Promise.all([
        contactService.getContacts(),
        dealService.getDeals()
      ]);
      setContacts(allContacts);
      setDeals(allDeals);
    } catch (error) {
      console.error('Failed to load data', error);
    }
  };

  const handleAISummarize = async () => {
    if (!summary.trim()) {
      addToast('Please enter some notes first', 'warning');
      return;
    }

    setIsSummarizing(true);
    try {
      const result = await activityService.summarizeActivity(summary, activeTab);
      setKeyPoints(result.keyPoints);
      setSentiment(result.sentiment as any);
      
      const tasksResult = await activityService.extractTasks(summary);
      setExtractedTasks(tasksResult.tasks.map(t => ({ ...t, selected: true })));

      addToast('AI Summary generated!', 'success');
    } catch (error) {
      addToast('AI Summary failed', 'error');
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSubmit = async (saveAndAnother = false) => {
    if (!contactId) {
      addToast('Please select a contact', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const activityData = {
        type: activeTab,
        title: activeTab === 'Call' ? `Call with ${contacts.find(c => c.id === contactId)?.firstName}` : 
               activeTab === 'Email' ? `Email: ${subject}` :
               activeTab === 'Meeting' ? `Meeting: ${summary.slice(0, 30)}...` :
               activeTab === 'Demo' ? `Demo: ${products.join(', ')}` :
               `${activeTab} log`,
        description: summary,
        contactId,
        dealId,
        date: new Date(`${date}T${time}`).toISOString(),
        durationMinutes: duration,
        outcome,
        nextSteps,
        sentiment,
        keyPoints,
        metadata: {
          subject,
          location,
          attendees,
          products,
          engagement
        }
      };

      await activityService.createActivity(activityData);

      // Create tasks if requested
      if (autoCreateTasks && extractedTasks.some(t => t.selected)) {
        await Promise.all(
          extractedTasks.filter(t => t.selected).map(t => 
            taskService.createTask({
              title: t.title,
              dueDate: t.dueDate,
              priority: t.priority as any,
              contactId,
              dealId,
              aiGenerated: true,
              status: 'To Do'
            })
          )
        );
      }

      addToast('Activity logged successfully!', 'success');
      
      if (onSuccess) onSuccess();

      if (saveAndAnother) {
        // Reset form but keep contact/deal if possible
        setSummary('');
        setKeyPoints([]);
        setExtractedTasks([]);
        setNextSteps('');
      } else {
        onClose();
      }
    } catch (error) {
      addToast('Failed to log activity', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {activeTab === 'Call' && <Phone className="w-5 h-5 text-green-500" />}
              {activeTab === 'Email' && <Mail className="w-5 h-5 text-blue-500" />}
              {activeTab === 'Meeting' && <Calendar className="w-5 h-5 text-purple-500" />}
              {activeTab === 'Demo' && <Monitor className="w-5 h-5 text-indigo-500" />}
              {activeTab === 'Note' && <FileText className="w-5 h-5 text-gray-500" />}
              Log {activeTab}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="px-6 py-2 border-b border-slate-200 dark:border-slate-800 flex overflow-x-auto no-scrollbar gap-2">
            {ACTIVITY_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                  activeTab === type.id 
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <type.icon className={cn("w-4 h-4", activeTab === type.id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400")} />
                {type.label}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Contact*</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={contactId || ''}
                    onChange={(e) => setContactId(parseInt(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Select contact...</option>
                    {contacts.map(c => (
                      <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Deal Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Deal</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={dealId || ''}
                    onChange={(e) => setDealId(parseInt(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Link to a deal...</option>
                    {deals.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Date*</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Time & Duration */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Duration (min)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Type Specific Fields */}
            {activeTab === 'Email' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subject Line</label>
                <input
                  type="text"
                  placeholder="Re: Enterprise Plan Proposal"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            )}

            {activeTab === 'Call' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Outcome*</label>
                <div className="flex flex-wrap gap-2">
                  {CALL_OUTCOMES.map(o => (
                    <button
                      key={o}
                      onClick={() => setOutcome(o)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                        outcome === o 
                          ? "bg-indigo-600 text-white border-indigo-600" 
                          : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-400"
                      )}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Meeting' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Location / Link</label>
                <input
                  type="text"
                  placeholder="Zoom, Google Meet, or Physical Office"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            )}

            {/* Common Notes Section */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {activeTab === 'Note' ? 'Note Body' : activeTab === 'Call' ? 'Call Summary' : 'Activity Notes'}
              </label>
              <div className="relative">
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  placeholder={activeTab === 'Call' ? "Discussed pricing..." : "Enter details..."}
                />
                <button
                  onClick={handleAISummarize}
                  disabled={isSummarizing || !summary.trim()}
                  className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-lg shadow-indigo-500/30 disabled:opacity-50 transition-all"
                >
                  {isSummarizing ? (
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  AI Summarize
                </button>
              </div>
            </div>

            {/* AI Insights Section */}
            {(keyPoints.length > 0 || extractedTasks.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-xl space-y-4"
              >
                {keyPoints.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Sparkles className="w-3 h-3" /> Key Discussion Points
                    </h4>
                    <ul className="space-y-1">
                      {keyPoints.map((point, idx) => (
                        <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-indigo-100 dark:border-indigo-900/30">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sentiment:</span>
                    <div className={cn(
                      "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium",
                      sentiment === 'Positive' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                      sentiment === 'Negative' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                      sentiment === 'Cautious' ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    )}>
                      {sentiment === 'Positive' && <Smile className="w-3 h-3" />}
                      {sentiment === 'Negative' && <Frown className="w-3 h-3" />}
                      {sentiment === 'Neutral' && <Meh className="w-3 h-3" />}
                      {sentiment === 'Cautious' && <AlertTriangle className="w-3 h-3" />}
                      {sentiment}
                    </div>
                  </div>
                </div>

                {extractedTasks.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                        <Check className="w-3 h-3" /> Auto-create tasks?
                      </h4>
                      <input 
                        type="checkbox" 
                        checked={autoCreateTasks} 
                        onChange={(e) => setAutoCreateTasks(e.target.checked)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    {autoCreateTasks && (
                      <div className="space-y-2">
                        {extractedTasks.map((task, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                            <input 
                              type="checkbox" 
                              checked={task.selected} 
                              onChange={() => {
                                const newTasks = [...extractedTasks];
                                newTasks[idx].selected = !newTasks[idx].selected;
                                setExtractedTasks(newTasks);
                              }}
                              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{task.title}</p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                <span>Due: {task.dueDate}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span className={cn(
                                  task.priority === 'High' ? "text-red-500" :
                                  task.priority === 'Medium' ? "text-amber-500" :
                                  "text-blue-500"
                                )}>{task.priority}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Next Steps</label>
              <textarea
                value={nextSteps}
                onChange={(e) => setNextSteps(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                placeholder="Follow up on pricing next Tuesday"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-4">
            <button
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              Save & Log Another
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting || !contactId}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-500/30 disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                Save Activity
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
