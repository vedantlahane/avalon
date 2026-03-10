import React, { useState, useEffect, useRef } from 'react';
import { Search, User, Building2, DollarSign, Plus, Mail, MessageSquare, ListCheck, BarChart3, TrendingUp, Info, Zap, X } from 'lucide-react';
import { commandPaletteStore } from '../../lib/command-palette-store';
import { cn } from '../../lib/utils';
import { MOCK_CONTACTS, MOCK_COMPANIES, MOCK_DEALS } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import { composerStore } from '../../lib/composer-store';

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
    { icon: <Plus size={18} />, label: 'New Contact', action: () => navigate('/contacts') },
    { icon: <Plus size={18} />, label: 'New Deal', action: () => navigate('/deals') },
    { icon: <Plus size={18} />, label: 'New Task', action: () => navigate('/tasks') },
    { icon: <Mail size={18} />, label: 'Compose Email', action: () => composerStore.open() },
    { icon: <MessageSquare size={18} />, label: 'Ask AI', action: () => window.dispatchEvent(new CustomEvent('toggle-ai-panel')) },
  ];

  const recent = [
    { icon: <User size={18} className="text-blue-500" />, label: 'John Smith', action: () => navigate('/contacts/1') },
    { icon: <DollarSign size={18} className="text-green-500" />, label: 'Acme Enterprise Plan', action: () => navigate('/deals/1') },
    { icon: <Mail size={18} className="text-indigo-500" />, label: 'Sent follow-up to Sarah', action: () => navigate('/inbox') },
  ];

  const aiCommands = [
    { icon: <Mail size={18} />, command: '/email', description: 'Open email composer', action: () => composerStore.open() },
    { icon: <Zap size={18} />, command: '/call', description: 'Log a call', action: () => window.dispatchEvent(new CustomEvent('toggle-ai-panel')) },
    { icon: <DollarSign size={18} />, command: '/deal', description: 'Create or find deal', action: () => navigate('/deals') },
    { icon: <ListCheck size={18} />, command: '/task', description: 'Create task', action: () => navigate('/tasks') },
    { icon: <BarChart3 size={18} />, command: '/report', description: 'Generate report', action: () => navigate('/reports') },
    { icon: <Zap size={18} />, command: '/score', description: 'View lead score', action: () => window.dispatchEvent(new CustomEvent('toggle-ai-panel')) },
    { icon: <TrendingUp size={18} />, command: '/forecast', description: 'Pipeline forecast', action: () => navigate('/reports') },
    { icon: <Zap size={18} />, command: '/insights', description: 'AI daily insights', action: () => window.dispatchEvent(new CustomEvent('toggle-ai-panel')) },
  ];

  const results: CommandResult[] = [];
  
  if (!query) {
    results.push({ type: 'header', label: 'Recent' });
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
        icon: <Zap size={18} className="text-indigo-500" />, 
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
            icon: <User size={18} className="text-blue-500" />, 
            label: `${c.firstName} ${c.lastName}`, 
            sublabel: c.jobTitle + ' at ' + c.company?.name,
            action: () => navigate(`/contacts/${c.id}`)
        }));
        }

        if (filteredCompanies.length > 0) {
        results.push({ type: 'header', label: 'Companies' });
        filteredCompanies.forEach(c => results.push({ 
            type: 'item', 
            icon: <Building2 size={18} className="text-orange-500" />, 
            label: c.name, 
            action: () => navigate('/companies')
        }));
        }

        if (filteredDeals.length > 0) {
        results.push({ type: 'header', label: 'Deals' });
        filteredDeals.forEach(d => results.push({ 
            type: 'item', 
            icon: <DollarSign size={18} className="text-green-500" />, 
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

  if (!isOpen) return null;

  const itemResults = results.filter(r => r.type === 'item');

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
        onClick={() => commandPaletteStore.close()}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="flex items-center border-b border-gray-100 p-4">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-lg text-gray-900 placeholder-gray-400"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-[10px] font-bold text-gray-500 uppercase">ESC</kbd>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto py-2">
          {results.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Info size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No results found for "{query}"</p>
              <p className="text-gray-400 text-sm mt-1">Try searching for a contact, company, or deal</p>
            </div>
          ) : (
            results.map((result, index) => {
              if (result.type === 'header') {
                return (
                  <div key={`header-${result.label}`} className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
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
                    "w-full flex items-center px-4 py-2.5 text-left transition-colors relative group",
                    isSelected ? "bg-indigo-50" : "hover:bg-gray-50"
                  )}
                  onClick={() => {
                    result.action?.();
                    commandPaletteStore.close();
                  }}
                  onMouseEnter={() => setSelectedIndex(itemIndex)}
                >
                  {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600" />}
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center mr-3 transition-colors",
                    isSelected ? "bg-white shadow-sm" : "bg-gray-50 group-hover:bg-white"
                  )}>
                    {result.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={cn("font-medium truncate", isSelected ? "text-indigo-900" : "text-gray-900")}>
                        {result.label}
                      </span>
                      {result.type_label && (
                        <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded ml-2 uppercase font-bold">
                          {result.type_label}
                        </span>
                      )}
                    </div>
                    {result.sublabel && (
                      <div className="text-xs text-gray-500 truncate mt-0.5">{result.sublabel}</div>
                    )}
                  </div>
                  {isSelected && (
                    <div className="ml-3 flex items-center gap-1 opacity-60">
                       <span className="text-[10px] font-bold text-indigo-600">ENTER</span>
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div className="border-t border-gray-100 p-3 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
            <div className="flex items-center gap-1.5">
              <kbd className="p-1 bg-white border border-gray-200 rounded text-[9px] min-w-[16px] flex items-center justify-center shadow-sm">↑</kbd>
              <kbd className="p-1 bg-white border border-gray-200 rounded text-[9px] min-w-[16px] flex items-center justify-center shadow-sm">↓</kbd>
              <span>to navigate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="p-1 px-1.5 bg-white border border-gray-200 rounded text-[9px] shadow-sm">ENTER</kbd>
              <span>to select</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
             <span>Prefix with </span>
             <kbd className="p-1 px-1.5 bg-white border border-gray-200 rounded text-[9px] text-indigo-600 shadow-sm">/</kbd>
             <span> for AI commands</span>
          </div>
        </div>
      </div>
    </div>
  );
};
