import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Filter, 
  Mail, 
  Phone, 
  Trash2, 
  Star, 
  MoreVertical,
  MoreHorizontal,
  ChevronRight,
  Building2,
  Brain
} from 'lucide-react';
import { Contact } from '@/types';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LeadScoreBadge } from './LeadScoreBadge';

interface MobileContactsListProps {
  contacts: Contact[];
  onAdd: () => void;
}

export const MobileContactsList: React.FC<MobileContactsListProps> = ({ contacts, onAdd }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'Hot') return matchesSearch && (contact.leadScore || 0) >= 70;
    return matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-background pb-24">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">Contacts ({filteredContacts.length})</h1>
        <div className="flex items-center gap-2">
          <button className="p-2 text-muted-foreground hover:bg-muted rounded-xl transition-colors">
            <Search size={20} />
          </button>
          <button onClick={onAdd} className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors">
            <Plus size={24} />
          </button>
          <button className="p-2 text-muted-foreground hover:bg-muted rounded-xl transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="px-4 py-3 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input 
            type="text" 
            placeholder="Search contacts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/50 border border-transparent rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {['All', 'Hot', 'Customer', 'Source'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all",
                filter === f 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-card text-muted-foreground border-border hover:border-primary/50"
              )}
            >
              {f} {f === 'All' ? '' : '▼'}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-border/50">
        <AnimatePresence>
          {filteredContacts.map((contact) => (
            <ContactListItem 
              key={contact.id} 
              contact={contact} 
              onClick={() => navigate(`/contacts/${contact.id}`)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Infinite Scroll Loader */}
      <div className="py-8 flex justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

const ContactListItem: React.FC<{ contact: Contact; onClick: () => void }> = ({ contact, onClick }) => {
  const [isStarred, setIsStarred] = useState(false);
  
  // Handlers for swipe actions
  const onEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Email', contact.email);
  };
  
  const onCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Call', contact.phone);
  };
  
  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Delete', contact.id);
  };

  return (
    <div className="relative overflow-hidden group">
      {/* Background Actions (Left Swipe) */}
      <div className="absolute inset-0 flex items-center justify-end px-4 gap-2 pointer-events-none">
        <div className="flex items-center gap-1">
          <button onClick={onEmail} className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center pointer-events-auto shadow-lg shadow-blue-500/20">
            <Mail size={20} />
          </button>
          <button onClick={onCall} className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center pointer-events-auto shadow-lg shadow-emerald-500/20">
            <Phone size={20} />
          </button>
          <button onClick={onDelete} className="w-12 h-12 rounded-xl bg-red-500 text-white flex items-center justify-center pointer-events-auto shadow-lg shadow-red-500/20">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Background Actions (Right Swipe) */}
      <div className="absolute inset-0 flex items-center justify-start px-4 pointer-events-none">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-colors pointer-events-auto shadow-lg",
          isStarred ? "bg-amber-500 text-white shadow-amber-500/20" : "bg-muted text-muted-foreground shadow-sm"
        )} onClick={(e) => { e.stopPropagation(); setIsStarred(!isStarred); }}>
          <Star size={20} fill={isStarred ? "currentColor" : "none"} />
        </div>
      </div>

      {/* Foreground Content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -180, right: 80 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x > 50) setIsStarred(!isStarred);
        }}
        className="relative bg-card px-4 py-4 cursor-pointer active:bg-muted transition-colors z-10 touch-pan-y"
        onClick={onClick}
      >
        <div className="flex items-start gap-3">
          <div className={cn(
            "h-12 w-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0",
            contact.id % 2 === 0 ? "bg-indigo-500" : "bg-violet-500"
          )}>
            {contact.firstName[0]}{contact.lastName[0]}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-foreground truncate">
                {contact.firstName} {contact.lastName}
                {isStarred && <Star className="inline ml-1 w-3 h-3 text-amber-500 fill-amber-500" />}
              </h3>
              <LeadScoreBadge score={contact.leadScore || 0} size="sm" showLabel={false} />
            </div>
            
            <p className="text-xs text-muted-foreground font-medium truncate mt-0.5">
              {contact.jobTitle}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <Building2 size={12} className="text-muted-foreground" />
              <p className="text-xs text-muted-foreground font-medium truncate">
                {contact.company?.name}
              </p>
            </div>
            
            <div className="flex items-center gap-3 mt-2">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">
                Last: 2 days ago
              </p>
              <div className="flex gap-2">
                <button className="p-1.5 bg-muted rounded-lg text-muted-foreground" onClick={onEmail}>
                  <Mail size={12} />
                </button>
                <button className="p-1.5 bg-muted rounded-lg text-muted-foreground" onClick={onCall}>
                  <Phone size={12} />
                </button>
                <button className="p-1.5 bg-muted rounded-lg text-muted-foreground">
                  <MoreVertical size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
