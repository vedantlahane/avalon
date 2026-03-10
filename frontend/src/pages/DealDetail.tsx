import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { dealService } from '../services/deal.service';
import { activityService } from '../services/activity.service';
import { taskService } from '../services/task.service';
import { emailService } from '../services/email.service';
import { 
  Deal, 
  Activity, 
  Task, 
  Email,
  ActivityType,
  DealStage,
  DealPriority
} from '../types';
import { 
  Mail, 
  Phone, 
  Calendar, 
  FileText, 
  Edit2, 
  ChevronLeft,
  ChevronDown,
  X,
  MoreVertical,
  Building2,
  ExternalLink,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  MessageSquare,
  AlertCircle,
  PlusCircle,
  TrendingUp,
  Brain,
  Users,
  Tag,
  Check,
  Zap,
  Trash2,
  ChevronRight,
  Target,
  ArrowRight,
  Package
} from 'lucide-react';
import { cn } from '../lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { composerStore } from '../lib/composer-store';

import { ActivityTimeline } from '../components/activities/ActivityTimeline';
import { LogActivityModal } from '../components/activities/LogActivityModal';

type Tab = 'Activity' | 'Emails' | 'Tasks' | 'Notes' | 'Files';

import confetti from 'canvas-confetti';

export const DealDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('Activity');
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };
  
  useEffect(() => {
    if (id) {
      loadDealData(parseInt(id));
    }
  }, [id]);

  const loadDealData = async (dealId: number) => {
    setIsLoading(true);
    try {
      const [dealData, allActivities, allEmails, allTasks] = await Promise.all([
        dealService.getDealById(dealId),
        activityService.getActivities(),
        emailService.getEmails(),
        taskService.getTasks()
      ]);

      if (dealData) {
        setDeal(dealData);
        // Filter related data
        setActivities(allActivities.filter(a => a.dealId === dealId));
        setEmails(allEmails.filter(e => e.contactId === dealData.contactId));
        setTasks(allTasks.filter(t => t.dealId === dealId));
      }
    } catch (error) {
      console.error('Error loading deal details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStage = async (stage: DealStage) => {
    if (!deal) return;
    try {
      const updated = await dealService.updateDealStage(deal.id, stage);
      setDeal(updated);
      if (stage === 'Closed Won') {
        triggerConfetti();
      }
    } catch (error) {
      console.error('Error updating stage:', error);
    }
  };

  const stages: DealStage[] = ['Lead', 'Qualified', 'Discovery', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

  const getStageStatus = (stage: DealStage) => {
    const currentIndex = stages.indexOf(deal?.stage || 'Lead');
    const stageIndex = stages.indexOf(stage);

    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'Email': return <Mail size={16} />;
      case 'Call': return <Phone size={16} />;
      case 'Meeting': return <Calendar size={16} />;
      case 'Note': return <FileText size={16} />;
      case 'Task': return <CheckCircle2 size={16} />;
      default: return <MessageSquare size={16} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          <p className="text-gray-500 font-medium">Loading deal details...</p>
        </div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Deal not found</h2>
        <Link to="/deals" className="text-indigo-600 hover:underline mt-4 inline-block font-bold">Back to Pipeline</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="space-y-6">
        <button 
          onClick={() => navigate('/deals')}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Pipeline</span>
        </button>

        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{deal.name}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                  {deal.company && (
                    <Link to={`/companies/${deal.companyId}`} className="text-gray-600 font-bold hover:text-indigo-600 flex items-center gap-1.5">
                      <Building2 size={16} />
                      {deal.company.name}
                    </Link>
                  )}
                  <span className="text-gray-300">•</span>
                  {deal.contact && (
                    <Link to={`/contacts/${deal.contactId}`} className="text-gray-600 font-bold hover:text-indigo-600 flex items-center gap-1.5">
                      <Users size={16} />
                      {deal.contact.firstName} {deal.contact.lastName}
                    </Link>
                  )}
                  <span className="text-gray-300">•</span>
                  <div className="text-gray-500 font-medium flex items-center gap-1.5">
                    <Calendar size={16} />
                    Created {format(new Date(deal.createdAt), 'MMM d')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                <div className="px-6 py-2 text-center border-r border-gray-200">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Value</p>
                  <p className="text-xl font-black text-gray-900">${deal.value.toLocaleString()}</p>
                </div>
                <div className="px-6 py-2 text-center border-r border-gray-200">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Stage</p>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            i <= stages.indexOf(deal.stage) ? "bg-indigo-600" : "bg-gray-200"
                          )} 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-black text-indigo-600 ml-1">{deal.stage}</span>
                  </div>
                </div>
                <div className="px-6 py-2 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Probability</p>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${deal.probability}%` }}
                      />
                    </div>
                    <span className="text-sm font-black text-emerald-600">{deal.probability}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-4">
              <div className="flex justify-between items-center overflow-x-auto no-scrollbar pb-2">
                {stages.map((stage, idx) => {
                  const status = getStageStatus(stage);
                  return (
                    <div key={stage} className="flex items-center group">
                      <button 
                        onClick={() => handleUpdateStage(stage)}
                        disabled={status === 'current'}
                        className="flex flex-col items-center gap-2 relative min-w-[100px] hover:scale-105 active:scale-95 transition-transform disabled:scale-100"
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center transition-all border-2 z-10",
                          status === 'completed' ? "bg-emerald-500 border-emerald-500 text-white" :
                          status === 'current' ? "bg-white border-indigo-600 text-indigo-600 shadow-lg shadow-indigo-100" :
                          "bg-white border-gray-200 text-gray-400"
                        )}>
                          {status === 'completed' ? <Check size={18} strokeWidth={3} /> : <span className="text-xs font-black">{idx + 1}</span>}
                        </div>
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest",
                          status === 'completed' ? "text-emerald-600" :
                          status === 'current' ? "text-indigo-600" :
                          "text-gray-400"
                        )}>
                          {stage}
                        </span>
                      </button>
                      {idx < stages.length - 1 && (
                        <div className={cn(
                          "w-12 h-[2px] -mt-6",
                          status === 'completed' ? "bg-emerald-500" : "bg-gray-100"
                        )} />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-100">
                <button 
                  onClick={() => deal && composerStore.open({ deal, contact: deal.contact })}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                >
                  <Mail size={18} />
                  <span>Email</span>
                </button>
                <button 
                  onClick={() => setIsActivityModalOpen(true)}
                  className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-black hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                >
                  <Phone size={18} />
                  <span>Log Call</span>
                </button>
                <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-black hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                  <Calendar size={18} />
                  <span>Schedule</span>
                </button>
                <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-black hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                  <FileText size={18} />
                  <span>Note</span>
                </button>
                <div className="flex-1" />
                <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-black hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                  <Edit2 size={18} />
                  <span>Edit</span>
                </button>
                <button className="flex items-center gap-2 bg-white border border-rose-100 text-rose-600 px-5 py-2.5 rounded-xl text-sm font-black hover:bg-rose-50 transition-all shadow-sm active:scale-95">
                  <Trash2 size={18} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN - 60% */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm min-h-[600px] flex flex-col">
            {/* Tab Nav */}
            <div className="flex items-center border-b border-gray-100 px-8 gap-8">
              {(['Activity', 'Emails', 'Tasks', 'Notes', 'Files'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "py-5 text-sm font-black uppercase tracking-widest transition-all relative",
                    activeTab === tab ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="dealTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" 
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-8 flex-1">
              <AnimatePresence mode="wait">
                {activeTab === 'Activity' && (
                  <motion.div 
                    key="activity"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    <ActivityTimeline 
                      dealId={deal.id} 
                      onLogClick={() => setIsActivityModalOpen(true)}
                    />
                  </motion.div>
                )}

                {activeTab === 'Emails' && (
                  <motion.div 
                    key="emails"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-end">
                      <button 
                        onClick={() => deal && composerStore.open({ deal, contact: deal.contact })}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                      >
                        <Brain size={18} />
                        <span>Compose with AI</span>
                      </button>
                    </div>
                    {emails.length === 0 ? (
                      <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                        <Mail size={48} className="text-gray-200 mx-auto mb-4" />
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">No emails found</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {emails.map(email => (
                          <div key={email.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{email.subject}</h4>
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                {format(new Date(email.timestamp), 'MMM d')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2">{email.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'Tasks' && (
                  <motion.div 
                    key="tasks"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-end">
                      <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-indigo-700 transition-all shadow-md active:scale-95">
                        <Plus size={18} />
                        <span>Add Task</span>
                      </button>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-3xl divide-y divide-gray-50 overflow-hidden shadow-sm">
                      {tasks.map(task => (
                        <div key={task.id} className="p-5 flex items-center gap-4 hover:bg-gray-50 transition-all group">
                          <button className="w-6 h-6 rounded-lg border-2 border-gray-200 flex items-center justify-center text-white hover:border-indigo-600 transition-all">
                            <Check size={14} strokeWidth={4} className="opacity-0 group-hover:opacity-20 transition-opacity" />
                          </button>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900">{task.title}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              {task.dueDate && (
                                <span className={cn(
                                  "text-[10px] font-bold flex items-center gap-1",
                                  new Date(task.dueDate) < new Date() ? "text-rose-500" : "text-gray-400"
                                )}>
                                  <Clock size={10} />
                                  {format(new Date(task.dueDate), 'MMM d')}
                                </span>
                              )}
                              <span className={cn(
                                "text-[10px] font-black uppercase tracking-widest",
                                task.priority === 'High' ? "text-rose-600" : "text-gray-400"
                              )}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {tasks.length === 0 && (
                        <div className="text-center py-20 bg-gray-50/50">
                          <CheckCircle2 size={48} className="text-gray-200 mx-auto mb-4" />
                          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">No active tasks</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'Notes' && (
                  <motion.div 
                    key="notes"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-end">
                      <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-black transition-all shadow-md active:scale-95">
                        <FileText size={18} />
                        <span>Add Note</span>
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 min-h-[300px]">
                      {deal.notes ? (
                        <p className="text-sm text-gray-600 font-medium leading-relaxed whitespace-pre-wrap">{deal.notes}</p>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <MessageSquare size={48} className="text-gray-200 mb-4" />
                          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">No notes for this deal</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Files' && (
                  <motion.div 
                    key="files"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-end">
                      <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-indigo-700 transition-all shadow-md active:scale-95">
                        <Plus size={18} />
                        <span>Upload File</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center text-center group cursor-pointer hover:border-indigo-200 transition-all">
                        <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 mb-3 group-hover:scale-110 transition-transform">
                          <FileText size={24} />
                        </div>
                        <p className="text-xs font-bold text-gray-900 truncate w-full">Proposal_v2.pdf</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">1.2 MB</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center text-center group cursor-pointer hover:border-indigo-200 transition-all">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 mb-3 group-hover:scale-110 transition-transform">
                          <FileText size={24} />
                        </div>
                        <p className="text-xs font-bold text-gray-900 truncate w-full">ROI_Calculator.xlsx</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">450 KB</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - 40% */}
        <div className="lg:col-span-4 space-y-8">
          {/* Card 1: AI Deal Analysis */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <Brain size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 tracking-tight">AI Deal Analysis</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Win Probability: {deal.probability}%</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                      style={{ width: `${deal.probability}%` }}
                    />
                  </div>
                  <p className="text-xs font-bold text-indigo-600 text-center uppercase tracking-wider">
                    "Above average for this stage"
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp size={12} className="text-emerald-600" /> Deal Health: Good
                  </label>
                  <ul className="space-y-1.5">
                    <li className="text-xs font-bold text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-emerald-500 rounded-full" /> Active engagement (last activity 2d ago)
                    </li>
                    <li className="text-xs font-bold text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-emerald-500 rounded-full" /> Stakeholder identified
                    </li>
                    <li className="text-xs font-bold text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-emerald-500 rounded-full" /> Budget confirmed
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2">
                    <AlertCircle size={12} /> Risk Factors
                  </label>
                  <ul className="space-y-1.5">
                    <li className="text-xs font-bold text-rose-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-rose-500 rounded-full" /> Competitor mentioned in last call
                    </li>
                    <li className="text-xs font-bold text-rose-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-rose-500 rounded-full" /> Decision maker not yet engaged
                    </li>
                    <li className="text-xs font-bold text-rose-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-rose-500 rounded-full" /> Timeline pressure (closes in 14d)
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Target size={12} className="text-indigo-600" /> Next Best Actions
                  </label>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all group/btn">
                      <span className="text-xs font-bold text-gray-700">1. Schedule meeting with CTO</span>
                      <PlusCircle size={14} className="text-gray-300 group-hover/btn:text-indigo-500 transition-colors" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all group/btn">
                      <span className="text-xs font-bold text-gray-700">2. Send competitive comparison</span>
                      <Mail size={14} className="text-gray-300 group-hover/btn:text-indigo-500 transition-colors" />
                    </button>
                  </div>
                </div>

                <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={14} className="text-indigo-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">Similar Deals</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-gray-600">Beta Inc ($95K)</span>
                      <span className="text-emerald-600">Won in 38 days</span>
                    </li>
                    <li className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-gray-600">Gamma LLC ($110K)</span>
                      <span className="text-emerald-600">Won in 52 days</span>
                    </li>
                    <li className="pt-2 border-t border-indigo-100/50 flex items-center justify-between text-[11px] font-black uppercase tracking-wider">
                      <span className="text-indigo-400">Average close time</span>
                      <span className="text-indigo-700">45 days</span>
                    </li>
                    <li className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider">
                      <span className="text-indigo-400">Current Progress</span>
                      <span className="text-emerald-600 flex items-center gap-1">Day 31 <Check size={10} strokeWidth={4} /></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Deal Information */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-gray-900 tracking-tight">Deal Information</h3>
              <button className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors">
                <Edit2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expected Close</label>
                <p className="text-sm font-bold text-gray-900">
                  {deal.expectedCloseDate ? format(new Date(deal.expectedCloseDate), 'MMM d, yyyy') : 'Not set'}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Priority</label>
                <div className={cn(
                  "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-black uppercase border",
                  deal.priority === 'Critical' ? "bg-rose-50 text-rose-700 border-rose-100" :
                  deal.priority === 'High' ? "bg-orange-50 text-orange-700 border-orange-100" :
                  "bg-blue-50 text-blue-700 border-blue-100"
                )}>
                  {deal.priority}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deal Owner</label>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">ME</div>
                  <p className="text-sm font-bold text-gray-900">{deal.owner}</p>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Currency</label>
                <p className="text-sm font-bold text-gray-900">{deal.currency}</p>
              </div>
            </div>

            {deal.lineItems && deal.lineItems.length > 0 && (
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Package size={12} /> Products
                </label>
                <div className="space-y-2">
                  {deal.lineItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="font-bold text-gray-700">{item.productName}</span>
                      <span className="font-black text-indigo-600">${item.total.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {deal.competitors && deal.competitors.length > 0 && (
              <div className="pt-6 border-t border-gray-100 space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap size={12} className="text-orange-500" /> Competitors
                </label>
                <div className="flex flex-wrap gap-2">
                  {deal.competitors.map(comp => (
                    <span key={comp} className="bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg text-[10px] font-black uppercase text-gray-600">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Contact & Company */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-gray-900 tracking-tight">Contact & Company</h3>
            
            <div className="space-y-6">
              {deal.contact && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group cursor-pointer hover:border-indigo-200 transition-all" onClick={() => navigate(`/contacts/${deal.contactId}`)}>
                  <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm">
                    {deal.contact.firstName[0]}{deal.contact.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{deal.contact.firstName} {deal.contact.lastName}</p>
                    <p className="text-xs text-gray-500 font-bold truncate">{deal.contact.jobTitle}</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>
              )}

              {deal.company && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group cursor-pointer hover:border-indigo-200 transition-all" onClick={() => navigate(`/companies/${deal.companyId}`)}>
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-indigo-600 border border-gray-100 shadow-sm">
                    <Building2 size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{deal.company.name}</p>
                    <p className="text-xs text-gray-500 font-bold truncate">{deal.company.industry} • {deal.company.size}</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>
              )}
                        </div>
                      </div>
                    </div>
                  </div>
            
                  <LogActivityModal 
                    isOpen={isActivityModalOpen}
                    onClose={() => setIsActivityModalOpen(false)}
                    dealId={deal.id}
                    contactId={deal.contactId || undefined}
                    onSuccess={() => id && loadDealData(parseInt(id))}
                  />
                </div>
              );
            };
            