import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactService } from '../services/contact.service';
import { Contact, LeadStatus, LeadSource } from '../types';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  Building2,
  List,
  LayoutGrid,
  ChevronDown,
  ArrowUpDown,
  UserPlus,
  Trash2,
  Tag,
  Download,
  ExternalLink,
  MessageSquare,
  Clock,
  Flame,
  Snowflake,
  Sun,
  Cloud,
  CheckCircle2,
  X,
  Edit2,
  Sparkles,
  Loader2,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactModal } from '../components/contacts/ContactModal';
import { EmptyState } from '../components/common/EmptyState';

type ViewMode = 'list' | 'grid';
type SortOption = 'name-az' | 'name-za' | 'score-high' | 'score-low' | 'recently-added' | 'last-contacted';

export const Contacts: React.FC = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus[]>([]);
  const [selectedSource, setSelectedSource] = useState<LeadSource[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState<SortOption>('name-az');
  const [selectedContactIds, setSelectedContactIds] = useState<number[]>([]);
  
  // UI States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
  
  const [isBulkEnriching, setIsBulkEnriching] = useState(false);
  const [showEnrichToast, setShowEnrichToast] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const handleBulkEnrich = async () => {
    if (selectedContactIds.length === 0) return;
    
    setIsBulkEnriching(true);
    try {
      await contactService.bulkEnrichContacts(selectedContactIds);
      setShowEnrichToast(true);
      setTimeout(() => setShowEnrichToast(false), 3000);
      loadContacts();
      setSelectedContactIds([]);
    } catch (error) {
      console.error('Bulk enrichment failed:', error);
    } finally {
      setIsBulkEnriching(false);
    }
  };

  const loadContacts = async () => {
    setIsLoading(true);
    try {
      const data = await contactService.getContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddContact = () => {
    setContactToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditContact = (e: React.MouseEvent, contact: Contact) => {
    e.stopPropagation();
    setContactToEdit(contact);
    setIsModalOpen(true);
  };

  const handleModalSuccess = () => {
    loadContacts();
  };

  const handleContactClick = (id: number) => {
    navigate(`/contacts/${id}`);
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    contacts.forEach(c => c.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    return contacts
      .filter(contact => {
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
        const email = contact.email.toLowerCase();
        const company = contact.company?.name.toLowerCase() || '';
        const matchesSearch = fullName.includes(searchQuery.toLowerCase()) || 
                             email.includes(searchQuery.toLowerCase()) || 
                             company.includes(searchQuery.toLowerCase());
        
        const matchesStatus = selectedStatus.length === 0 || (contact.leadStatus && selectedStatus.includes(contact.leadStatus));
        const matchesSource = selectedSource.length === 0 || (contact.leadSource && selectedSource.includes(contact.leadSource));
        const matchesTags = selectedTags.length === 0 || selectedTags.every(t => contact.tags.includes(t));
        const matchesScore = contact.leadScore >= scoreRange[0] && contact.leadScore <= scoreRange[1];

        return matchesSearch && matchesStatus && matchesSource && matchesTags && matchesScore;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name-az':
            return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          case 'name-za':
            return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
          case 'score-high':
            return b.leadScore - a.leadScore;
          case 'score-low':
            return a.leadScore - b.leadScore;
          case 'recently-added':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'last-contacted':
            const dateA = a.lastContacted ? new Date(a.lastContacted).getTime() : 0;
            const dateB = b.lastContacted ? new Date(b.lastContacted).getTime() : 0;
            return dateB - dateA;
          default:
            return 0;
        }
      });
  }, [contacts, searchQuery, selectedStatus, selectedSource, selectedTags, scoreRange, sortBy]);

  const toggleSelectAll = () => {
    if (selectedContactIds.length === filteredContacts.length) {
      setSelectedContactIds([]);
    } else {
      setSelectedContactIds(filteredContacts.map(c => c.id));
    }
  };

  const toggleSelectContact = (id: number) => {
    setSelectedContactIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: 'Hot', icon: <Flame size={12} />, className: 'bg-red-50 text-red-700 border-red-100' };
    if (score >= 60) return { label: 'Warm', icon: <Sun size={12} />, className: 'bg-orange-50 text-orange-700 border-orange-100' };
    if (score >= 40) return { label: 'Cool', icon: <Cloud size={12} />, className: 'bg-blue-50 text-blue-700 border-blue-100' };
    return { label: 'Cold', icon: <Snowflake size={12} />, className: 'bg-gray-50 text-gray-700 border-gray-100' };
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

  const getInitials = (first: string, last: string) => `${first[0]}${last[0]}`;
  const getRandomColor = (name: string) => {
    const colors = ['bg-pink-100 text-pink-700', 'bg-purple-100 text-purple-700', 'bg-indigo-100 text-indigo-700', 'bg-blue-100 text-blue-700', 'bg-teal-100 text-teal-700', 'bg-emerald-100 text-emerald-700'];
    const index = name.length % colors.length;
    return colors[index];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          <p className="text-gray-500 font-medium">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
              <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-bold border border-indigo-100">
                {contacts.length} contacts
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-1.5 rounded-md transition-all",
                    viewMode === 'list' ? "bg-gray-100 text-gray-900 shadow-inner" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  <List size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-1.5 rounded-md transition-all",
                    viewMode === 'grid' ? "bg-gray-100 text-gray-900 shadow-inner" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  <LayoutGrid size={18} />
                </button>
              </div>
              <button 
                onClick={handleAddContact}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                <Plus size={18} />
                <span>Add Contact</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search contacts by name, email, company..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <div className="relative">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-bold border rounded-xl px-4 py-2.5 transition-all whitespace-nowrap shadow-sm",
                    isFilterOpen ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <Filter size={16} />
                  <span>Filters</span>
                  {(selectedStatus.length > 0 || selectedSource.length > 0 || selectedTags.length > 0) && (
                    <span className="ml-1 bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                      {selectedStatus.length + selectedSource.length + selectedTags.length}
                    </span>
                  )}
                  <ChevronDown size={14} className={cn("transition-transform", isFilterOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-5 space-y-5"
                    >
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Lead Status</label>
                        <div className="flex flex-wrap gap-2">
                          {['New', 'Contacted', 'Qualified', 'Unqualified', 'Nurturing'].map((status) => (
                            <button
                              key={status}
                              onClick={() => {
                                setSelectedStatus(prev => prev.includes(status as LeadStatus) ? prev.filter(s => s !== status) : [...prev, status as LeadStatus]);
                              }}
                              className={cn(
                                "text-xs px-2.5 py-1.5 rounded-lg border transition-all",
                                selectedStatus.includes(status as LeadStatus) ? "bg-indigo-600 border-indigo-600 text-white" : "bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100"
                              )}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Lead Source</label>
                        <div className="flex flex-wrap gap-2">
                          {['Website', 'LinkedIn', 'Referral', 'Cold Outreach', 'Event', 'Other'].map((source) => (
                            <button
                              key={source}
                              onClick={() => {
                                setSelectedSource(prev => prev.includes(source as LeadSource) ? prev.filter(s => s !== source) : [...prev, source as LeadSource]);
                              }}
                              className={cn(
                                "text-xs px-2.5 py-1.5 rounded-lg border transition-all",
                                selectedSource.includes(source as LeadSource) ? "bg-indigo-600 border-indigo-600 text-white" : "bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100"
                              )}
                            >
                              {source}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Score Range</label>
                          <span className="text-xs font-bold text-indigo-600">{scoreRange[0]}-{scoreRange[1]}</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={scoreRange[1]}
                          onChange={(e) => setScoreRange([scoreRange[0], parseInt(e.target.value)])}
                          className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Tags</label>
                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1">
                          {allTags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => {
                                setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
                              }}
                              className={cn(
                                "text-xs px-2.5 py-1.5 rounded-lg border transition-all",
                                selectedTags.includes(tag) ? "bg-indigo-600 border-indigo-600 text-white" : "bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100"
                              )}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100 flex justify-between">
                        <button 
                          onClick={() => {
                            setSelectedStatus([]);
                            setSelectedSource([]);
                            setSelectedTags([]);
                            setScoreRange([0, 100]);
                          }}
                          className="text-xs font-bold text-gray-400 hover:text-gray-600"
                        >
                          Reset All
                        </button>
                        <button 
                          onClick={() => setIsFilterOpen(false)}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 text-sm font-bold bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-600 hover:bg-gray-50 transition-all whitespace-nowrap shadow-sm"
                >
                  <ArrowUpDown size={16} />
                  <span>Sort</span>
                  <ChevronDown size={14} className={cn("transition-transform", isSortOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-2"
                    >
                      {[
                        { id: 'name-az', label: 'Name A-Z' },
                        { id: 'name-za', label: 'Name Z-A' },
                        { id: 'score-high', label: 'Score High-Low' },
                        { id: 'score-low', label: 'Score Low-High' },
                        { id: 'recently-added', label: 'Recently Added' },
                        { id: 'last-contacted', label: 'Last Contacted' },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortBy(option.id as SortOption);
                            setIsSortOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all",
                            sortBy === option.id ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedContactIds.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 border border-white/10 backdrop-blur-xl"
            >
              <span className="text-sm font-bold">
                {selectedContactIds.length} contact{selectedContactIds.length > 1 ? 's' : ''} selected
              </span>
              <div className="h-4 w-[1px] bg-white/20"></div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBulkEnrich}
                  disabled={isBulkEnriching}
                  className="flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors disabled:opacity-50"
                >
                  {isBulkEnriching ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                  <span>AI Enrich</span>
                </button>
                <button className="flex items-center gap-2 text-sm font-bold hover:text-indigo-400 transition-colors">
                  <Tag size={16} />
                  <span>Add Tag</span>
                </button>
                <button className="flex items-center gap-2 text-sm font-bold hover:text-indigo-400 transition-colors">
                  <CheckCircle2 size={16} />
                  <span>Change Status</span>
                </button>
                <button className="flex items-center gap-2 text-sm font-bold hover:text-indigo-400 transition-colors">
                  <Download size={16} />
                  <span>Export</span>
                </button>
                <button className="flex items-center gap-2 text-sm font-bold text-rose-400 hover:text-rose-300 transition-colors">
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
              <div className="h-4 w-[1px] bg-white/20"></div>
              <button 
                onClick={() => setSelectedContactIds([])}
                className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
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
              <span className="font-bold">✨ Contacts enriched with new data points</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="min-h-[400px]">
          {contacts.length === 0 ? (
            <EmptyState
              icon={UserPlus}
              title="No contacts yet"
              description="Start building your network! Add contacts manually or import them from a CSV file."
              actions={[
                { label: 'Add Contact', onClick: handleAddContact, icon: Plus },
                { label: 'Import CSV', onClick: () => console.log('Import CSV'), variant: 'secondary', icon: Download }
              ]}
              aiTip="Enter just an email and AI will enrich the rest!"
            />
          ) : filteredContacts.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                <Search size={48} />
              </div>
              <div className="max-w-xs">
                <h3 className="text-lg font-bold text-gray-900">No results found</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStatus([]);
                  setSelectedSource([]);
                  setSelectedTags([]);
                  setScoreRange([0, 100]);
                }}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === 'list' ? (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 w-10">
                      <input 
                        type="checkbox" 
                        checked={selectedContactIds.length === filteredContacts.length && filteredContacts.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4 cursor-pointer"
                      />
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Avatar</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lead Score</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Contacted</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredContacts.map((contact) => (
                    <tr 
                      key={contact.id} 
                      onClick={() => handleContactClick(contact.id)}
                      className="hover:bg-gray-50/80 transition-all group cursor-pointer"
                    >
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          checked={selectedContactIds.includes(contact.id)}
                          onChange={() => toggleSelectContact(contact.id)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm transition-transform group-hover:scale-110",
                          getRandomColor(`${contact.firstName}${contact.lastName}`)
                        )}>
                          {getInitials(contact.firstName, contact.lastName)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {contact.firstName} {contact.lastName}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">{contact.jobTitle}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{contact.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                          <Building2 size={14} className="text-gray-400" />
                          {contact.company?.name || '---'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {(() => {
                          const badge = getScoreBadge(contact.leadScore);
                          return (
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase border shadow-sm",
                                badge.className
                              )}>
                                {badge.icon}
                                {badge.label}
                              </div>
                              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block shadow-inner">
                                <div 
                                  className={cn(
                                    "h-full rounded-full transition-all duration-1000",
                                    contact.leadScore >= 80 ? "bg-red-500" : contact.leadScore >= 60 ? "bg-orange-500" : contact.leadScore >= 40 ? "bg-blue-500" : "bg-gray-400"
                                  )}
                                  style={{ width: `${contact.leadScore}%` }}
                                />
                              </div>
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border whitespace-nowrap shadow-sm",
                          getStatusColor(contact.leadStatus)
                        )}>
                          {contact.leadStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500 font-medium">
                        {contact.lastContacted ? formatDistanceToNow(new Date(contact.lastContacted), { addSuffix: true }) : 'Never'}
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => handleEditContact(e, contact)}
                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit Contact"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="More">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContacts.map((contact) => (
                <motion.div 
                  layout
                  key={contact.id}
                  onClick={() => handleContactClick(contact.id)}
                  className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group relative cursor-pointer"
                >
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={(e) => handleEditContact(e, contact)}
                      className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                      {/* Progress Ring */}
                      <svg className="w-24 h-24 -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="44"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-gray-100"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="44"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray={44 * 2 * Math.PI}
                          strokeDashoffset={44 * 2 * Math.PI * (1 - contact.leadScore / 100)}
                          strokeLinecap="round"
                          className={cn(
                            "transition-all duration-1000",
                            contact.leadScore >= 80 ? "text-red-500" : contact.leadScore >= 60 ? "text-orange-500" : contact.leadScore >= 40 ? "text-blue-500" : "text-gray-400"
                          )}
                        />
                      </svg>
                      <div className={cn(
                        "absolute top-2 left-2 w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl border-4 border-white shadow-md transition-transform group-hover:scale-105",
                        getRandomColor(`${contact.firstName}${contact.lastName}`)
                      )}>
                        {getInitials(contact.firstName, contact.lastName)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center",
                          contact.leadScore >= 80 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                        )}>
                          {contact.leadScore >= 80 ? <Flame size={12} /> : <Sun size={12} />}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">
                        {contact.firstName} {contact.lastName}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium mt-0.5">{contact.jobTitle}</p>
                      <div className="flex items-center justify-center gap-1.5 mt-2 text-gray-400 text-xs font-bold">
                        <Building2 size={12} />
                        {contact.company?.name || 'No Company'}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full pt-1">
                      <span className={cn(
                        "flex-1 text-[10px] font-black py-1.5 rounded-xl uppercase tracking-widest border text-center shadow-sm",
                        getStatusColor(contact.leadStatus)
                      )}>
                        {contact.leadStatus}
                      </span>
                      <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl shadow-inner">
                        <span className="text-xs font-mono font-bold text-gray-900">{contact.leadScore}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full pt-4 border-t border-gray-50" onClick={(e) => e.stopPropagation()}>
                      <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 p-2.5 rounded-xl transition-all text-gray-500 shadow-sm active:scale-90">
                        <Mail size={18} />
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 p-2.5 rounded-xl transition-all text-gray-500 shadow-sm active:scale-90">
                        <Phone size={18} />
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 p-2.5 rounded-xl transition-all text-gray-500 shadow-sm active:scale-90">
                        <MessageSquare size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 pt-1">
                      <Clock size={10} />
                      {contact.lastContacted ? `Last contacted ${formatDistanceToNow(new Date(contact.lastContacted), { addSuffix: true })}` : 'Never contacted'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Section */}
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm">
          <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
            <span>Show</span>
            <select className="bg-gray-50 border border-gray-100 rounded-lg px-2 py-1 text-gray-900 font-bold outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all cursor-pointer">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>per page</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-bold text-gray-400 cursor-not-allowed transition-colors hover:text-gray-600">Previous</button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold shadow-md transform scale-110">1</button>
              <button className="w-8 h-8 rounded-lg hover:bg-gray-50 text-sm font-bold text-gray-600 transition-all">2</button>
              <button className="w-8 h-8 rounded-lg hover:bg-gray-50 text-sm font-bold text-gray-600 transition-all">3</button>
            </div>
            <button className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">Next</button>
          </div>
        </div>
      </div>

      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
        contact={contactToEdit}
      />
    </div>
  );
};
