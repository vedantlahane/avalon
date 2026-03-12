import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Mail, 
  Phone, 
  MoreVertical,
  Brain,
  ChevronRight,
  LayoutGrid,
  List,
  Building2,
  Users,
  ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { contactService } from '../services/contact.service';
import { Contact } from '../types';
import { ContactModal } from '../components/contacts/ContactModal';
import { ImportWizard } from '../components/common/ImportWizard';
import { ExportModal } from '../components/common/ExportModal';
import { LeadScoreBadge } from '../components/contacts/LeadScoreBadge';
import { cn } from '../lib/utils';
import { CardGridSkeleton, ListSkeleton } from '../components/common/Skeletons';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { useDebounce } from '../hooks/useDebounce';
import { useModalStore } from '../lib/modal-store';
import { MobileContactsList } from '../components/contacts/MobileContactsList';

const ITEMS_PER_PAGE = 25;

export const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const { contactModal } = useModalStore();
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await contactService.getContacts();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load contacts');
    } finally {
      setTimeout(() => setIsLoading(false), 600);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Listen for modal success to refresh data
  useEffect(() => {
    if (!contactModal.isOpen) {
      fetchData();
    }
  }, [contactModal.isOpen]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => 
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      contact.company?.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [contacts, debouncedSearchQuery]);

  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);
  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredContacts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredContacts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  const prefetchContact = useCallback((id: number) => {
    // Simulate preloading data
    console.log(`Preloading contact ${id}...`);
    contactService.getContactById(id).catch(() => {});
  }, []);

  if (isLoading) return view === 'grid' ? <CardGridSkeleton /> : <ListSkeleton />;
  if (error) return <ErrorState onRetry={fetchData} />;

  if (window.innerWidth < 768) {
    return <MobileContactsList contacts={contacts} onAdd={() => contactModal.open()} />;
  }

  return (
    <div className="p-4 md:p-6 space-y-6 page-fade-in pb-24 md:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Contacts</h1>
          <p className="text-sm text-muted-foreground mt-1 font-medium">Manage your customer relationships</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setIsImportOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-muted transition-all ripple shadow-sm"
          >
            <Upload size={14} />
            <span className="hidden sm:inline">Import</span>
          </button>
          <button 
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-muted transition-all ripple shadow-sm"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button 
            onClick={() => contactModal.open()}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 btn-hover ripple"
          >
            <Plus size={18} />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-card border border-border p-3 rounded-2xl shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input 
            type="text" 
            placeholder="Search contacts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/50 border border-transparent rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 text-foreground transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
          <div className="flex bg-muted p-1 rounded-xl">
            <button 
              onClick={() => setView('grid')}
              className={cn(
                "p-2 rounded-lg transition-all",
                view === 'grid' ? "bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn(
                "p-2 rounded-lg transition-all",
                view === 'list' ? "bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List size={16} />
            </button>
          </div>
          <button className="p-2.5 bg-muted rounded-xl text-muted-foreground hover:text-primary ripple transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {paginatedContacts.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No contacts yet"
          description="Start building your network! Add contacts manually or import them from a CSV file."
          actions={[
            { label: 'Add Contact', onClick: () => contactModal.open(), icon: Plus },
            { label: 'Import CSV', onClick: () => setIsImportOpen(true), variant: 'secondary', icon: Upload }
          ]}
          aiTip="Enter just an email and AI will enrich the rest!"
        />
      ) : (
        <>
          <div className={cn(
            view === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "bg-card border border-border rounded-2xl overflow-hidden shadow-sm overflow-x-auto"
          )}>
            {view === 'grid' ? (
              paginatedContacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className="bg-card p-6 rounded-2xl border border-border shadow-sm card-hover cursor-pointer group flex flex-col h-full active:scale-[0.98] transition-transform"
                  onClick={() => navigate(`/contacts/${contact.id}`)}
                  onMouseEnter={() => prefetchContact(contact.id)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/10">
                      {contact.firstName[0]}{contact.lastName[0]}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <LeadScoreBadge score={contact.leadScore} size="sm" showLabel={false} />
                      <button className="p-1 text-muted-foreground hover:text-foreground rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {contact.firstName} {contact.lastName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Building2 size={14} className="text-muted-foreground" />
                      <p className="text-sm text-muted-foreground font-medium truncate">{contact.jobTitle} at {contact.company?.name}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex gap-2">
                      <button className="p-2 bg-muted text-muted-foreground rounded-xl hover:text-primary hover:bg-primary/10 transition-all ripple" onClick={(e) => e.stopPropagation()}>
                        <Mail size={16} />
                      </button>
                      <button className="p-2 bg-muted text-muted-foreground rounded-xl hover:text-primary hover:bg-primary/10 transition-all ripple" onClick={(e) => e.stopPropagation()}>
                        <Phone size={16} />
                      </button>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1 hover:underline">
                      View Profile <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Contact</th>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Company</th>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Lead Score</th>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Last Activity</th>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedContacts.map((contact) => (
                    <tr 
                      key={contact.id} 
                      className="hover:bg-muted/30 transition-all cursor-pointer group"
                      onClick={() => navigate(`/contacts/${contact.id}`)}
                      onMouseEnter={() => prefetchContact(contact.id)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/10">
                            {contact.firstName[0]}{contact.lastName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                              {contact.firstName} {contact.lastName}
                            </p>
                            <p className="text-xs text-muted-foreground">{contact.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/80 font-medium">
                        {contact.company?.name}
                      </td>
                      <td className="px-6 py-4">
                        <LeadScoreBadge score={contact.leadScore || 0} size="sm" />
                      </td>
                      <td className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        2 days ago
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all ripple" onClick={(e) => e.stopPropagation()}>
                            <Mail size={16} />
                          </button>
                          <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all ripple" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-2 pt-4">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredContacts.length)} of {filteredContacts.length} contacts
              </p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-card border border-border rounded-xl text-muted-foreground hover:text-primary hover:bg-muted transition-all disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={cn(
                        "w-8 h-8 rounded-xl text-xs font-bold transition-all",
                        currentPage === i + 1 
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-card border border-border rounded-xl text-muted-foreground hover:text-primary hover:bg-muted transition-all disabled:opacity-50"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <ImportWizard isOpen={isImportOpen} onClose={() => { setIsImportOpen(false); fetchData(); }} resource="contacts" />
      <ExportModal 
        isOpen={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
        resource="contacts" 
        totalCount={contacts.length}
        filteredCount={filteredContacts.length}
      />
    </div>
  );
};


      