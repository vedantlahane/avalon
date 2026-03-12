import React, { useState, useEffect, useRef } from 'react';
import { Search, User, Building2, DollarSign, Plus, Mail, MessageSquare, ListCheck, BarChart3, TrendingUp, Info, Zap, X, Clock } from 'lucide-react';
import { commandPaletteStore } from '../../lib/command-palette-store';
import { cn } from '../../lib/utils';
import { MOCK_CONTACTS, MOCK_COMPANIES, MOCK_DEALS } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import { composerStore } from '../../lib/composer-store';
import { useModalStore } from '../../lib/modal-store';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandResult {
  type: 'header' | 'item';
  label: string;
  icon?: React.ReactNode;
  sublabel?: string;
  type_label?: string;
  action?: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return commandPaletteStore.subscribe(setIsOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        commandPaletteStore.close();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const filteredContacts = query ? MOCK_CONTACTS.filter(c => 
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
    c.company?.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5) : [];

  const filteredCompanies = query ? MOCK_COMPANIES.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5) : [];

  const filteredDeals = query ? MOCK_DEALS.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5) : [];

  const quickActions = [
    { icon: <Plus size={16} />, label: 'New Contact', action: () => useModalStore.getState().contactModal.open() },
    { icon: <Plus size={16} />, label: 'New Deal', action: () => useModalStore.getState().dealModal.open() },
    { icon: <Plus size={16} />, label: 'New Task', action: () => useModalStore.getState().taskModal.open() },
    { icon: <Mail size={16} />, label: 'Compose Email', action: () => composerStore.open() },
    { icon: <MessageSquare size={16} />, label: 'Ask AI', action: () => window.dispatchEvent(new CustomEvent('toggle-ai-panel')) },
  ];

  const recent = [
    { icon: <Clock size={16} className="text-muted-foreground" />, label: 'John Smith', sublabel: 'Contact', action: () => navigate('/contacts/1') },
    { icon: <Clock size={16} className="text-muted-foreground" />, label: 'Acme Enterprise Plan', sublabel: 'Deal', action: () => navigate('/deals/1') },
    { icon: <Clock size={16} className="text-muted-foreground" />, label: 'Sent follow-up to Sarah', sublabel: 'Email', action: () => navigate('/inbox') },
  ];

  const aiCommands = [
    { icon: <Mail size={16} />, command: '/email', description: 'Open email composer', action: () => composerStore.open() },
    { icon: <Zap size={16} />, command: '/call', description: 'Log a call', action: () => window.dispatchEvent(new CustomEvent('toggle-ai-panel')) },
    { icon: <DollarSign size={16} />, command: '/deal', description: 'Create new deal', action: () => useModalStore.getState().dealModal.open() },
    { icon: <ListCheck size={16} />, command: '/task', description: 'Create task', action: () => useModalStore.getState().taskModal.open() },
    { icon: <BarChart3 size={16} />, command: '/report', description: 'View reports', action: () => navigate('/reports') },
  ];

  const results: CommandResult[] = [];
  
  if (!query) {
    results.push({ type: 'header', label: 'Recent Searches' });
    recent.forEach(r => results.push({ type: 'item', ...r }));
    
    results.push({ type: 'header', label: 'Quick Actions' });
    quickActions.forEach(a => results.push({ type: 'item', ...a }));
  } else {
    // If it starts with / or matches an AI command, show AI commands first or only
    const matchedAiCommands = aiCommands.filter(c => 
      c.command.toLowerCase().includes(query.toLowerCase()) || 
      c.description.toLowerCase().includes(query.toLowerCase())
    );

    if (query.startsWith('/') || matchedAiCommands.length > 0) {
      results.push({ type: 'header', label: 'AI Commands' });
      matchedAiCommands.forEach(c => results.push({ 
        type: 'item', 
        icon: <Zap size={16} className="text-indigo-500" />, 
        label: c.command, 
        sublabel: c.description,
        action: c.action
      }));
    }

    if (!query.startsWith('/')) {
        if (filteredContacts.length > 0) {
        results.push({ type: 'header', label: 'Contacts' });
        filteredContacts.forEach(c => results.push({ 
            type: 'item', 
            icon: <User size={16} className="text-blue-500" />, 
            label: `${c.firstName} ${c.lastName}`, 
            sublabel: c.jobTitle + ' at ' + c.company?.name,
            action: () => navigate(`/contacts/${c.id}`)
        }));
        }

        if (filteredCompanies.length > 0) {
        results.push({ type: 'header', label: 'Companies' });
        filteredCompanies.forEach(c => results.push({ 
            type: 'item', 
            icon: <Building2 size={16} className="text-orange-500" />, 
            label: c.name, 
            action: () => navigate(`/companies/${c.id}`)
        }));
        }

        if (filteredDeals.length > 0) {
        results.push({ type: 'header', label: 'Deals' });
        filteredDeals.forEach(d => results.push({ 
            type: 'item', 
            icon: <DollarSign size={16} className="text-green-500" />, 
            label: d.name, 
            sublabel: `$${d.value.toLocaleString()}`,
            action: () => navigate(`/deals/${d.id}`)
        }));
        }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const itemResults = results.filter(r => r.type === 'item');
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % itemResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + itemResults.length) % itemResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = itemResults[selectedIndex];
      if (selected) {
        selected.action?.();
        commandPaletteStore.close();
      }
    }
  };

  const itemResults = results.filter(r => r.type === 'item');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => commandPaletteStore.close()}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-[640px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center border-b border-border p-4">
              <Search className="text-muted-foreground mr-3" size={20} />
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder-muted-foreground"
                placeholder="Search contacts, deals, companies... (⌘K)"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
              />
              <button 
                onClick={() => commandPaletteStore.close()}
                className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[480px] overflow-y-auto py-2 custom-scrollbar">
              {results.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info size={24} className="text-muted-foreground" />
                  </div>
                  <p className="text-foreground font-bold">No results found for "{query}"</p>
                  <p className="text-muted-foreground text-sm mt-1">Try searching for something else or use AI commands</p>
                </div>
              ) : (
                results.map((result, index) => {
                  if (result.type === 'header') {
                    return (
                      <div key={`header-${result.label}`} className="px-4 py-2 mt-2 first:mt-0 text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-50">
                        {result.label}
                      </div>
                    );
                  }

                  const itemIndex = results.slice(0, index).filter(r => r.type === 'item').length;
                  const isSelected = itemIndex === selectedIndex;

                  return (
                    <button
                      key={`item-${index}`}
                      className={cn(
                        "w-full flex items-center px-4 py-2.5 text-left transition-all relative group",
                        isSelected ? "bg-primary/10" : "hover:bg-muted/50"
                      )}
                      onClick={() => {
                        result.action?.();
                        commandPaletteStore.close();
                      }}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                    >
                      {isSelected && <div className="absolute left-0 top-1 bottom-1 w-1 bg-primary rounded-r-full" />}
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center mr-3 transition-all",
                        isSelected ? "bg-card shadow-sm scale-110" : "bg-muted"
                      )}>
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={cn("font-bold truncate text-sm", isSelected ? "text-primary" : "text-foreground")}>
                            {result.label}
                          </span>
                          {result.type_label && (
                            <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded ml-2 uppercase font-black tracking-tighter">
                              {result.type_label}
                            </span>
                          )}
                        </div>
                        {result.sublabel && (
                          <div className="text-xs text-muted-foreground truncate mt-0.5 font-medium">{result.sublabel}</div>
                        )}
                      </div>
                      {isSelected && (
                        <div className="ml-3 flex items-center gap-1 opacity-60">
                           <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[9px] font-bold text-muted-foreground">ENTER</kbd>
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            <div className="border-t border-border p-3 bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-4 text-[9px] text-muted-foreground font-black uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-1">
                    <kbd className="px-1 bg-card border border-border rounded shadow-sm text-[10px]">↑</kbd>
                    <kbd className="px-1 bg-card border border-border rounded shadow-sm text-[10px]">↓</kbd>
                  </div>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 bg-card border border-border rounded shadow-sm text-[10px]">ENTER</kbd>
                  <span>to select</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-muted-foreground font-black uppercase tracking-widest">
                 <span>Prefix with </span>
                 <kbd className="px-1.5 bg-card border border-border rounded text-primary shadow-sm">/</kbd>
                 <span> for AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};