import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Building2, Globe, MapPin, Users, Briefcase, 
  TrendingUp, DollarSign, Activity, Brain, 
  ChevronLeft, ChevronRight, Plus, Edit2, Mail, Phone,
  ExternalLink, Calendar, CheckCircle2, AlertCircle,
  MoreVertical, Info, Clock, ArrowRight, Target, Lightbulb, Rocket, Zap
} from 'lucide-react';
import { companyService } from '../services/company.service';
import { contactService } from '../services/contact.service';
import { dealService } from '../services/deal.service';
import { activityService } from '../services/activity.service';
import { CompanyWithStats, CompanyInsight, Contact, Deal, Activity as CRMActivity } from '../types';
import { cn } from '../lib/utils';

export const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanyWithStats | null>(null);
  const [insights, setInsights] = useState<CompanyInsight | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activities, setActivities] = useState<CRMActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'deals' | 'activities' | 'notes'>('overview');

  useEffect(() => {
    if (id) {
      loadData(parseInt(id));
    }
  }, [id]);

  const loadData = async (companyId: number) => {
    setIsLoading(true);
    try {
      const [companyData, insightsData, allContacts, allDeals, allActivities] = await Promise.all([
        companyService.getCompanyById(companyId),
        companyService.getCompanyInsights(companyId),
        contactService.getContacts(),
        dealService.getDeals(),
        activityService.getActivities()
      ]);

      setCompany(companyData);
      setInsights(insightsData);
      
      // Filter related data
      setContacts(allContacts.filter(c => c.companyId === companyId));
      setDeals(allDeals.filter(d => d.companyId === companyId));
      
      // Filter activities for this company (via its contacts)
      const companyContactIds = allContacts.filter(c => c.companyId === companyId).map(c => c.id);
      setActivities(allActivities.filter(a => a.contactId && companyContactIds.includes(a.contactId)));
      
    } catch (error) {
      console.error('Failed to load company detail:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnrich = async () => {
    if (!id) return;
    try {
      const updated = await companyService.enrichCompany(parseInt(id));
      setCompany(prev => prev ? { ...prev, ...updated } : null);
      alert('Company profile enriched successfully!');
    } catch (error) {
      console.error('Enrichment failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Company not found</h2>
        <button 
          onClick={() => navigate('/companies')}
          className="mt-6 text-indigo-600 font-bold flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          Back to Companies
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Navigation */}
      <button 
        onClick={() => navigate('/companies')}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors font-medium"
      >
        <ChevronLeft size={18} />
        Back to Companies
      </button>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Main Info) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleEnrich}
                  className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all"
                >
                  <Brain size={18} />
                  Enrich
                </button>
                <button className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center text-indigo-600 shrink-0">
                <Building2 size={48} />
              </div>
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900">{company.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
                      <Zap size={12} />
                      {company.industry}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
                      <Users size={12} />
                      {company.size} employees
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                      <MapPin size={16} />
                      {company.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 text-indigo-600 hover:underline font-bold text-sm"
                  >
                    <Globe size={16} />
                    {company.website?.replace('https://', '')}
                    <ExternalLink size={14} />
                  </a>
                  {company.linkedinUrl && (
                    <a 
                      href={company.linkedinUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 text-indigo-600 hover:underline font-bold text-sm"
                    >
                      <Info size={16} />
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-2xl w-fit">
            {(['overview', 'contacts', 'deals', 'activities', 'notes'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2 rounded-xl text-sm font-bold transition-all capitalize",
                  activeTab === tab 
                    ? "bg-white text-indigo-600 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            {activeTab === 'overview' && (
              <div className="space-y-10">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Company Description</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {company.description || "Acme Technologies is a leading provider of cloud-based enterprise solutions, specializing in AI-driven data analytics and infrastructure management."}
                  </p>
                </div>

                {/* Key Metrics */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Key Performance Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3 text-gray-400 mb-2">
                        <Users size={20} />
                        <span className="text-xs font-bold uppercase tracking-wider">Contacts</span>
                      </div>
                      <p className="text-2xl font-black text-gray-900">{company.contactCount}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3 text-indigo-400 mb-2">
                        <TrendingUp size={20} />
                        <span className="text-xs font-bold uppercase tracking-wider">Active Deals</span>
                      </div>
                      <p className="text-2xl font-black text-gray-900">{company.activeDealCount}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3 text-green-400 mb-2">
                        <CheckCircle2 size={20} />
                        <span className="text-xs font-bold uppercase tracking-wider">Won Deals</span>
                      </div>
                      <p className="text-2xl font-black text-gray-900">{company.wonDealCount}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3 text-amber-400 mb-2">
                        <DollarSign size={20} />
                        <span className="text-xs font-bold uppercase tracking-wider">Revenue</span>
                      </div>
                      <p className="text-2xl font-black text-gray-900">${(company.totalRevenue / 1000).toFixed(1)}K</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Recent Activities</h3>
                    <button 
                      onClick={() => setActiveTab('activities')}
                      className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      View Timeline
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {activities.slice(0, 3).map(activity => (
                      <div key={activity.id} className="flex gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                          activity.type === 'Call' ? "bg-blue-50 text-blue-600" :
                          activity.type === 'Meeting' ? "bg-purple-50 text-purple-600" :
                          "bg-emerald-50 text-emerald-600"
                        )}>
                          {activity.type === 'Call' ? <Phone size={18} /> : 
                           activity.type === 'Meeting' ? <Calendar size={18} /> : 
                           <Mail size={18} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-gray-900">{activity.title}</h4>
                            <span className="text-xs text-gray-400 font-medium">
                              {new Date(activity.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-1">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                    {activities.length === 0 && (
                      <div className="text-center py-10 bg-gray-50 rounded-2xl">
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">No activities logged yet</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent News */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Recent Industry Insights</h3>
                  <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl relative overflow-hidden group">
                    <Brain className="absolute -bottom-4 -right-4 w-32 h-32 text-indigo-100 group-hover:scale-110 transition-transform duration-500" />
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-indigo-200 text-indigo-800 text-[10px] font-black rounded uppercase tracking-tighter">AI Curated News</span>
                        <span className="text-indigo-400 text-xs font-bold">Today</span>
                      </div>
                      <p className="text-indigo-900 font-bold leading-snug">
                        {company.name} recently announced their Series B funding round, raising $24M to expand their operations into the European market.
                      </p>
                      <button className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                        Read Analysis <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Key Stakeholders</h3>
                  <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-sm transition-all">
                    <Plus size={18} />
                    Add Contact
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contacts.map(contact => (
                    <div 
                      key={contact.id} 
                      onClick={() => navigate(`/contacts/${contact.id}`)}
                      className="p-5 border border-gray-100 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer bg-white group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 font-bold text-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors uppercase">
                          {contact.firstName[0]}{contact.lastName[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                            {contact.firstName} {contact.lastName}
                          </h4>
                          <p className="text-xs text-gray-500 font-medium truncate uppercase tracking-wider">{contact.jobTitle}</p>
                        </div>
                        <ChevronRight size={18} className="text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                      <Users size={48} className="text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-bold uppercase tracking-widest">No contacts found for this company</p>
                      <button className="mt-4 text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline">+ Create first contact</button>
                    </div>
                  )}
                </div>

                {/* Org Chart Visualization Placeholder */}
                {contacts.length > 1 && (
                  <div className="mt-12 p-8 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4 text-gray-400">
                      <Zap size={20} />
                      <h4 className="text-sm font-bold uppercase tracking-widest">Org Hierarchy View</h4>
                    </div>
                    <div className="flex flex-col items-center gap-8 py-4">
                      <div className="p-4 bg-white border border-indigo-200 rounded-xl shadow-sm min-w-[200px] relative after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:h-8 after:w-0.5 after:bg-indigo-200">
                        <p className="text-xs font-black text-indigo-600 uppercase mb-1">Executive</p>
                        <p className="font-bold text-gray-900">{contacts.find(c => c.jobTitle?.includes('CEO') || c.jobTitle?.includes('VP'))?.firstName || contacts[0].firstName} {contacts.find(c => c.jobTitle?.includes('CEO') || c.jobTitle?.includes('VP'))?.lastName || contacts[0].lastName}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{contacts.find(c => c.jobTitle?.includes('CEO') || c.jobTitle?.includes('VP'))?.jobTitle || contacts[0].jobTitle}</p>
                      </div>
                      <div className="flex gap-8">
                        {contacts.filter((_, i) => i > 0).slice(0, 2).map((c, i) => (
                          <div key={i} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm min-w-[200px]">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Direct Report</p>
                            <p className="font-bold text-gray-900">{c.firstName} {c.lastName}</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{c.jobTitle}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'deals' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Associated Deals</h3>
                  <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-sm transition-all">
                    <Plus size={18} />
                    Create Deal
                  </button>
                </div>

                {/* Pipeline Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Active Pipeline</p>
                      <p className="text-2xl font-black text-gray-900">${(company.activeDealValue / 1000).toFixed(1)}K</p>
                    </div>
                    <TrendingUp className="text-indigo-400" size={32} />
                  </div>
                  <div className="bg-green-50/50 p-6 rounded-3xl border border-green-50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Won Business</p>
                      <p className="text-2xl font-black text-gray-900">${(company.totalRevenue / 1000).toFixed(1)}K</p>
                    </div>
                    <DollarSign className="text-green-400" size={32} />
                  </div>
                  <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Avg Deal Size</p>
                      <p className="text-2xl font-black text-gray-900">${(company.avgDealSize / 1000).toFixed(1)}K</p>
                    </div>
                    <Zap className="text-amber-400" size={32} />
                  </div>
                </div>

                <div className="space-y-4">
                  {deals.map(deal => (
                    <div 
                      key={deal.id} 
                      onClick={() => navigate(`/deals/${deal.id}`)}
                      className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-gray-100 rounded-3xl hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer bg-white group gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white",
                          deal.stage.includes('Won') ? "bg-green-500" : deal.stage.includes('Lost') ? "bg-red-500" : "bg-indigo-600"
                        )}>
                          <Briefcase size={24} />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {deal.name}
                          </h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs font-bold text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded uppercase tracking-wider">{deal.stage}</span>
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{deal.probability}% Prob.</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8 text-right">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deal Value</p>
                          <p className="text-lg font-black text-gray-900">${deal.value.toLocaleString()}</p>
                        </div>
                        <ChevronRight size={20} className="text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                  {deals.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                      <Briefcase size={48} className="text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-bold uppercase tracking-widest">No deals associated with this company</p>
                      <button className="mt-4 text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline">+ New Opportunity</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Communication History</h3>
                  <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-sm transition-all">
                    <Plus size={18} />
                    Log Activity
                  </button>
                </div>

                <div className="relative pl-8 space-y-10 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                  {activities.map((activity, index) => (
                    <div key={activity.id} className="relative">
                      <div className={cn(
                        "absolute -left-[31px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center",
                        activity.type === 'Call' ? "bg-blue-500" : 
                        activity.type === 'Meeting' ? "bg-purple-500" : 
                        "bg-emerald-500"
                      )}>
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                              activity.type === 'Call' ? "bg-blue-100 text-blue-700" : 
                              activity.type === 'Meeting' ? "bg-purple-100 text-purple-700" : 
                              "bg-emerald-100 text-emerald-700"
                            )}>
                              {activity.type}
                            </span>
                            <h4 className="font-black text-gray-900">{activity.title}</h4>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Clock size={14} />
                            <span className="text-xs font-bold uppercase tracking-widest">
                              {new Date(activity.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm">{activity.description}</p>
                        {activity.nextSteps && (
                          <div className="mt-4 pt-4 border-t border-gray-200/50">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Next Steps</p>
                            <p className="text-sm font-bold text-indigo-600">{activity.nextSteps}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && (
                    <div className="py-20 text-center">
                      <p className="text-gray-400 font-bold uppercase tracking-widest">No history recorded yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Internal Notes</h3>
                  <button className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest hover:underline">
                    <Edit2 size={16} />
                    Edit Notes
                  </button>
                </div>
                <div className="p-8 bg-amber-50/50 border-2 border-dashed border-amber-200 rounded-3xl text-amber-900/70 font-medium italic min-h-[200px]">
                  Add internal notes about this company, culture, buying processes, or any other relevant information that doesn't fit in standard fields...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (AI Insights & Info Card) */}
        <div className="space-y-8">
          {/* AI Insights Card */}
          <div className="bg-indigo-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-20 rotate-12">
              <Brain size={120} />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/30 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Brain size={24} className="text-indigo-200" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter">AI Company Analysis</h3>
              </div>

              <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Company Health</p>
                  <p className="text-2xl font-black text-white">{insights?.health || 'Strong'}</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-green-500/20">
                  <CheckCircle2 size={28} />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest flex items-center gap-2">
                  <Lightbulb size={12} className="text-amber-400" />
                  Key Insights
                </h4>
                <ul className="space-y-4">
                  {(insights?.keyInsights || []).map((insight, i) => (
                    <li key={i} className="flex gap-3 items-start group">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 group-hover:scale-150 transition-transform" />
                      <p className="text-sm font-bold text-indigo-100 leading-snug">{insight}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Opportunity Score</h4>
                  <span className="text-2xl font-black text-amber-400">{insights?.opportunityScore || 85}%</span>
                </div>
                <div className="w-full h-2 bg-indigo-950/50 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-amber-400 rounded-full transition-all duration-1000"
                    style={{ width: `${insights?.opportunityScore || 85}%` }}
                  />
                </div>
                <p className="text-[10px] font-bold text-indigo-300 italic">High likelihood of expansion in the next 6 months</p>
              </div>

              <div className="bg-indigo-500/20 rounded-3xl p-6 space-y-3">
                <h4 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest flex items-center gap-2">
                  <Rocket size={12} className="text-indigo-200" />
                  Recommended Strategy
                </h4>
                <p className="text-xs font-bold leading-relaxed text-indigo-50 italic">
                  "{insights?.recommendedStrategy || "Multi-thread approach - engage VP Sales and CTO in addition to current champion."}"
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Similar Companies</h4>
                <div className="flex flex-wrap gap-2">
                  {(insights?.similarCompanies || []).map((sim, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold cursor-pointer transition-all"
                    >
                      {sim.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Company Info Sidebar Card */}
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Company Profile</h3>
              <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                <Edit2 size={16} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Legal Name</p>
                <p className="text-sm font-bold text-gray-900">{company.name} Inc.</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Website</p>
                <a href={company.website} className="text-sm font-bold text-indigo-600 hover:underline flex items-center gap-1">
                  {company.website?.replace('https://', '')}
                  <ExternalLink size={12} />
                </a>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</p>
                <p className="text-sm font-bold text-gray-900">{company.location}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Industry</p>
                <p className="text-sm font-bold text-gray-900">{company.industry}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Company Size</p>
                <p className="text-sm font-bold text-gray-900">{company.size} employees</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estimated Revenue</p>
                <p className="text-sm font-bold text-gray-900">{company.revenue || '$50M - $100M'}</p>
              </div>
            </div>

            <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
              <Plus size={16} />
              Log New Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
