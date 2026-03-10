import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { contactService } from '../services/contact.service';
import { activityService } from '../services/activity.service';
import { dealService } from '../services/deal.service';
import { taskService } from '../services/task.service';
import { emailService } from '../services/email.service';
import { 
  Contact, 
  Activity, 
  Deal, 
  Task, 
  Email,
  ActivityType,
  LeadStatus
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
  Copy,
  PlusCircle,
  TrendingUp,
  Brain,
  Users,
  Tag,
  Search,
  Check,
  Sparkles,
  Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactModal } from '../components/contacts/ContactModal';
import { LeadScoreBadge } from '../components/contacts/LeadScoreBadge';
import { LeadScoreDetails } from '../components/contacts/LeadScoreDetails';
import { EnrichmentResult } from '../types';
import { composerStore } from '../lib/composer-store';

type Tab = 'Activity Timeline' | 'Emails' | 'Deals' | 'Tasks' | 'Notes';

export const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('Activity Timeline');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activityFilter, setActivityFilter] = useState<ActivityType | 'All'>('All');
  
  const [isEnriching, setIsEnriching] = useState(false);
  const [enrichmentResult, setEnrichmentResult] = useState<EnrichmentResult | null>(null);
  const [currentEnrichmentStep, setCurrentEnrichmentStep] = useState(-1);
  const [showEnrichToast, setShowEnrichToast] = useState(false);

  const enrichmentSteps = [
    "Verifying email...",
    "Finding contact information...",
    "Looking up company data...",
    "Analyzing social profiles...",
    "Generating lead score..."
  ];

  useEffect(() => {
    if (id) {
      loadContactData(parseInt(id));
    }
  }, [id]);

  const handleEnrich = async () => {
    if (!contact) return;
    
    setIsEnriching(true);
    setEnrichmentResult(null);
    
    // Animate progress steps
    for (let i = 0; i < enrichmentSteps.length; i++) {
      setCurrentEnrichmentStep(i);
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    try {
      const result = await contactService.enrichContact(contact.email);
      setEnrichmentResult(result);
    } catch (error) {
      console.error('Enrichment failed:', error);
    } finally {
      setIsEnriching(false);
      setCurrentEnrichmentStep(-1);
    }
  };

  const acceptEnrichment = async () => {
    if (!contact || !enrichmentResult) return;

    try {
      const updatedData: Partial<Contact> = {
        firstName: enrichmentResult.firstName || contact.firstName,
        lastName: enrichmentResult.lastName || contact.lastName,
        jobTitle: enrichmentResult.jobTitle || contact.jobTitle,
        phone: enrichmentResult.phone || contact.phone,
        linkedinUrl: enrichmentResult.linkedinUrl || contact.linkedinUrl,
        leadScore: enrichmentResult.suggestedLeadScore || contact.leadScore,
        tags: [...new Set([...contact.tags, ...(enrichmentResult.suggestedTags || [])])]
      };

      const updated = await contactService.updateContact(contact.id, updatedData);
      setContact(updated);
      setEnrichmentResult(null);
      setShowEnrichToast(true);
      setTimeout(() => setShowEnrichToast(false), 3000);
    } catch (error) {
      console.error('Failed to apply enrichment:', error);
    }
  };

  const loadContactData = async (contactId: number) => {
    setIsLoading(true);
    try {
      const [contactData, allActivities, allEmails, allDeals, allTasks] = await Promise.all([
        contactService.getContactById(contactId),
        activityService.getActivities(),
        emailService.getEmails(),
        dealService.getDeals(),
        taskService.getTasks()
      ]);

      if (contactData) {
        setContact(contactData);
        // Filter related data
        setActivities(allActivities.filter(a => a.contactId === contactId));
        setEmails(allEmails.filter(e => e.contactId === contactId));
        setDeals(allDeals.filter(d => d.contactId === contactId));
        setTasks(allTasks.filter(t => t.contactId === contactId));
      }
    } catch (error) {
      console.error('Error loading contact details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (status: LeadStatus) => {
    if (!contact) return;
    try {
      const updated = await contactService.updateContact(contact.id, { leadStatus: status });
      setContact(updated);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getInitials = (first: string, last: string) => `${first[0]}${last[0]}`;
  const getRandomColor = (name: string) => {
    const colors = ['bg-pink-100 text-pink-700', 'bg-purple-100 text-purple-700', 'bg-indigo-100 text-indigo-700', 'bg-blue-100 text-blue-700', 'bg-teal-100 text-teal-700', 'bg-emerald-100 text-emerald-700'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const getStatusColor = (status?: LeadStatus) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Contacted': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'Qualified': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Unqualified': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Nurturing': return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
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
          <p className="text-gray-500 font-medium">Loading contact profile...</p>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Contact not found</h2>
        <Link to="/contacts" className="text-indigo-600 hover:underline mt-4 inline-block font-bold">Back to Contacts</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Link */}
      <button 
        onClick={() => navigate('/contacts')}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold transition-colors group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Contacts</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN - 65% (8/12) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Contact Header */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative">
                <div className={cn(
                  "w-28 h-28 rounded-3xl flex items-center justify-center font-black text-4xl border-4 border-white shadow-2xl relative z-10",
                  getRandomColor(`${contact.firstName}${contact.lastName}`)
                )}>
                  {getInitials(contact.firstName, contact.lastName)}
                  
                  <div className="absolute -bottom-2 -right-2 z-20">
                    <LeadScoreBadge score={contact.leadScore} size="lg" />
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                      {contact.firstName} {contact.lastName}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-lg text-gray-500 font-medium">{contact.jobTitle}</p>
                      <span className="text-gray-300">•</span>
                      {contact.company ? (
                        <Link to={`/companies/${contact.companyId}`} className="text-lg text-indigo-600 font-bold hover:underline flex items-center gap-1.5">
                          <Building2 size={18} />
                          {contact.company.name}
                        </Link>
                      ) : (
                        <span className="text-lg text-gray-400 font-medium">No Company</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative group">
                      <button className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border shadow-sm transition-all hover:shadow-md",
                        getStatusColor(contact.leadStatus)
                      )}>
                        {contact.leadStatus}
                        <ChevronDown size={14} />
                      </button>
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                        {(['New', 'Contacted', 'Qualified', 'Unqualified', 'Nurturing'] as LeadStatus[]).map((status) => (
                          <button
                            key={status}
                            onClick={() => handleUpdateStatus(status)}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all",
                              contact.leadStatus === status ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"
                            )}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl border border-gray-200 transition-all shadow-sm">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => contact && composerStore.open({ contact })}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-indigo-700 transition-all shadow-sm active:scale-95"
                  >
                    <Mail size={18} />
                    <span>Email</span>
                  </button>
                  <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-black hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                    <Phone size={18} />
                    <span>Call</span>
                  </button>
                  <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-black hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                    <Calendar size={18} />
                    <span>Meeting</span>
                  </button>
                  <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-black hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                    <FileText size={18} />
                    <span>Note</span>
                  </button>
                  <button 
                    onClick={handleEnrich}
                    disabled={isEnriching}
                    className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-5 py-2.5 rounded-xl text-sm font-black hover:bg-indigo-100 transition-all shadow-sm active:scale-95"
                  >
                    {isEnriching ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                    <span>Enrich</span>
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-black hover:bg-gray-50 transition-all shadow-sm active:scale-95 ml-auto"
                  >
                    <Edit2 size={18} />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isEnriching && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-indigo-600 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-2xl">
                    <Loader2 size={24} className="animate-spin" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-tight">AI Contact Enrichment in progress...</h4>
                    <p className="text-sm text-indigo-100 font-bold">{enrichmentSteps[currentEnrichmentStep]}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {enrichmentSteps.map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        currentEnrichmentStep >= i ? "bg-white scale-125" : "bg-white/30"
                      )} 
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {enrichmentResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border-2 border-indigo-600 rounded-3xl shadow-2xl p-8 space-y-6 relative overflow-hidden"
              >
                <button 
                  onClick={() => setEnrichmentResult(null)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
                
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-200">
                    <Sparkles size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">AI Enrichment Successful</h3>
                    <p className="text-sm text-indigo-600 font-bold">Found 8 new data points for {contact.firstName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Job Title', value: enrichmentResult.jobTitle },
                    { label: 'Company', value: enrichmentResult.companyName },
                    { label: 'Phone', value: enrichmentResult.phone },
                    { label: 'LinkedIn', value: enrichmentResult.linkedinUrl },
                    { label: 'Location', value: enrichmentResult.location },
                    { label: 'Lead Score', value: enrichmentResult.suggestedLeadScore },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
                        <p className="text-sm font-bold text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {enrichmentResult.suggestedTags?.map(tag => (
                    <span key={tag} className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border border-indigo-100">
                      + {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrichmentResult.recentNews && (
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Recent News / Funding</p>
                      <p className="text-xs font-bold text-gray-900 leading-relaxed">{enrichmentResult.recentNews}</p>
                    </div>
                  )}
                  {enrichmentResult.technologies && (
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Technologies Used</p>
                      <div className="flex flex-wrap gap-2">
                        {enrichmentResult.technologies.map(tech => (
                          <span key={tech} className="bg-white text-gray-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-gray-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button 
                    onClick={acceptEnrichment}
                    className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl text-sm font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                  >
                    Accept and Apply Changes
                  </button>
                  <button 
                    onClick={() => setEnrichmentResult(null)}
                    className="flex-1 bg-white border border-gray-200 text-gray-700 py-4 rounded-2xl text-sm font-black hover:bg-gray-50 transition-all active:scale-95"
                  >
                    Discard Results
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {showEnrichToast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 border border-gray-800"
            >
              <div className="bg-emerald-500 p-1 rounded-full">
                <Check size={16} strokeWidth={4} />
              </div>
              <span className="font-bold">✨ Contact enriched with 8 new data points</span>
            </motion.div>
          )}

          {/* Tab Navigation */}
          <div className="space-y-6">
            <div className="flex items-center border-b border-gray-200 gap-8 overflow-x-auto no-scrollbar">
              {(['Activity Timeline', 'Emails', 'Deals', 'Tasks', 'Notes'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-4 text-sm font-bold transition-all relative whitespace-nowrap",
                    activeTab === tab ? "text-indigo-600" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" 
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === 'Activity Timeline' && (
                  <motion.div 
                    key="timeline"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Filter size={16} className="text-gray-400" />
                        <select 
                          value={activityFilter}
                          onChange={(e) => setActivityFilter(e.target.value as ActivityType | 'All')}
                          className="text-xs font-bold bg-gray-50 border-none outline-none focus:ring-0 rounded-lg px-3 py-1.5 text-gray-600"
                        >
                          <option value="All">All Activities</option>
                          <option value="Email">Emails</option>
                          <option value="Call">Calls</option>
                          <option value="Meeting">Meetings</option>
                          <option value="Note">Notes</option>
                          <option value="Task">Tasks</option>
                        </select>
                      </div>
                      <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition-all shadow-sm active:scale-95">
                        <PlusCircle size={14} />
                        <span>Log Activity</span>
                      </button>
                    </div>

                    <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                      {activities
                        .filter(a => activityFilter === 'All' || a.type === activityFilter)
                        .map((activity) => (
                        <div key={activity.id} className="relative group">
                          <div className="absolute -left-[25px] top-0 w-8 h-8 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-gray-400 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-all z-10 shadow-sm">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm group-hover:shadow-md group-hover:border-indigo-100 transition-all">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-sm font-black text-gray-900">{activity.title}</h4>
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-lg">
                                {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed mb-4">{activity.description}</p>
                            <div className="flex flex-wrap items-center gap-3">
                              {activity.outcome && (
                                <span className={cn(
                                  "text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest border",
                                  activity.outcome === 'Completed' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-yellow-50 text-yellow-700 border-yellow-100"
                                )}>
                                  {activity.outcome}
                                </span>
                              )}
                              {activity.dealId && (
                                <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                                  <TrendingUp size={10} />
                                  Deal Associated
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      {activities.length === 0 && (
                        <div className="text-center py-12 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">No activities recorded</p>
                        </div>
                      )}
                    </div>
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
                        onClick={() => contact && composerStore.open({ contact })}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                      >
                        <Brain size={18} />
                        <span>Compose with AI</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {emails.map((email) => (
                        <div key={email.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{email.subject}</h4>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              {format(new Date(email.timestamp), 'MMM d, h:mm a')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-4">{email.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                                <Check size={12} strokeWidth={3} /> Delivered
                              </span>
                              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-indigo-600">
                                <Users size={12} /> 1 Open
                              </span>
                            </div>
                            <button className="text-xs font-bold text-indigo-600 hover:underline">View Thread</button>
                          </div>
                        </div>
                      ))}
                      {emails.length === 0 && (
                        <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center">
                          <Mail size={48} className="text-gray-200 mb-4" />
                          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">No emails found</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Deals' && (
                  <motion.div 
                    key="deals"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-end">
                      <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-black transition-all shadow-md active:scale-95">
                        <PlusCircle size={18} />
                        <span>Create Deal</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {deals.map((deal) => (
                        <div key={deal.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-sm font-black text-gray-900">{deal.name}</h4>
                              <p className="text-2xl font-black text-indigo-600 mt-1">${deal.value.toLocaleString()}</p>
                            </div>
                            <span className={cn(
                              "text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest border",
                              deal.priority === 'High' ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-gray-50 text-gray-700 border-gray-100"
                            )}>
                              {deal.priority}
                            </span>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                              <span>{deal.stage}</span>
                              <span>{deal.probability}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                              <div 
                                className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                                style={{ width: `${deal.probability}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {deals.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                          <TrendingUp size={48} className="text-gray-200 mx-auto mb-4" />
                          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">No active deals</p>
                        </div>
                      )}
                    </div>
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

                    <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100 shadow-sm overflow-hidden">
                      {tasks.map((task) => (
                        <div key={task.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-all group">
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
                                  {format(new Date(task.dueDate), 'MMM d, yyyy')}
                                </span>
                              )}
                              <span className={cn(
                                "text-[10px] font-black uppercase tracking-widest",
                                task.priority === 'High' ? "text-rose-600" : "text-gray-400"
                              )}>
                                {task.priority}
                              </span>
                              {task.aiGenerated && (
                                <span className="flex items-center gap-1 text-[10px] font-black text-violet-600 uppercase tracking-widest">
                                  <Brain size={10} /> AI Generated
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      {tasks.length === 0 && (
                        <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                          <CheckCircle2 size={48} className="text-gray-200 mx-auto mb-4" />
                          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">All tasks completed</p>
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

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm min-h-[200px]">
                      {contact.notes ? (
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{contact.notes}</p>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                          <FileText size={48} className="text-gray-200 mb-4" />
                          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">No notes available</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - 35% (4/12) */}
        <div className="lg:col-span-4 space-y-8">
          <LeadScoreDetails 
            contact={contact} 
            onRefresh={(updated) => setContact(prev => prev ? { ...prev, ...updated } : null)} 
          />

          {/* Contact Information Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-gray-900 tracking-tight">Contact Info</h3>
              <button className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors">
                <Edit2 size={16} />
              </button>
            </div>

            <div className="space-y-5">
              <div className="space-y-1 group/field">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-between">
                  Email
                  <button className="opacity-0 group-hover/field:opacity-100 transition-opacity">
                    <Copy size={12} />
                  </button>
                </label>
                <p className="text-sm font-bold text-gray-900 break-all">{contact.email}</p>
              </div>
              <div className="space-y-1 group/field">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-between">
                  Phone
                  <button className="opacity-0 group-hover/field:opacity-100 transition-opacity">
                    <Copy size={12} />
                  </button>
                </label>
                <p className="text-sm font-bold text-gray-900">{contact.phone || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lead Source</label>
                <p className="text-sm font-bold text-gray-900">{contact.leadSource || 'Other'}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Address</label>
                <p className="text-sm font-bold text-gray-900 leading-relaxed">{contact.address || 'Not provided'}</p>
              </div>
              <div className="flex items-center gap-4 pt-4">
                {contact.linkedinUrl && (
                  <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 border border-gray-100 rounded-lg text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
                    <Users size={18} />
                  </a>
                )}
                {contact.twitterUrl && (
                  <a href={contact.twitterUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 border border-gray-100 rounded-lg text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
                    <MessageSquare size={18} />
                  </a>
                )}
                {contact.website && (
                  <a href={contact.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 border border-gray-100 rounded-lg text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Related Contacts Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-gray-900 tracking-tight">Related Contacts</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 truncate transition-colors">Jane Doe</p>
                  <p className="text-[10px] text-gray-500 font-medium truncate">CTO at {contact.company?.name || 'Same Company'}</p>
                </div>
                <ChevronLeft size={14} className="rotate-180 text-gray-300" />
              </div>
              <button className="w-full py-2.5 rounded-xl border border-dashed border-gray-200 text-xs font-bold text-gray-400 hover:border-indigo-200 hover:text-indigo-600 transition-all">
                Find more connections
              </button>
            </div>
          </div>

          {/* Tags Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-gray-900 tracking-tight">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {contact.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 shadow-sm">
                  <Tag size={12} className="text-gray-400" />
                  {tag}
                  <button className="text-gray-400 hover:text-rose-500 ml-1">
                    <X size={12} strokeWidth={3} />
                  </button>
                </span>
              ))}
              <button className="flex items-center gap-1.5 bg-indigo-50 border border-dashed border-indigo-200 px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-600 hover:bg-indigo-100 transition-all">
                <Plus size={12} />
                <span>Add Tag</span>
              </button>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                <Brain size={12} className="text-violet-600" /> AI Suggested
              </label>
              <div className="flex flex-wrap gap-2">
                {['Enterprise', 'Decision Maker', 'High Priority'].filter(t => !contact.tags.includes(t)).map(tag => (
                  <button key={tag} className="flex items-center gap-1.5 bg-violet-50 text-violet-700 border border-violet-100 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-violet-100 transition-all shadow-sm">
                    <Plus size={12} />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => id && loadContactData(parseInt(id))}
        contact={contact}
      />
    </div>
  );
};
