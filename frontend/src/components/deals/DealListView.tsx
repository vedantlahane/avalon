import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Download,
  Edit2,
  Trash2,
  UserPlus,
  ArrowRightLeft,
  Flame,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Snowflake,
  Building2,
  User,
  Calendar,
  Clock
} from 'lucide-react';
import { Deal, DealStage, DealPriority } from '../../types';
import { cn } from '../../lib/utils';
import { format, differenceInDays } from 'date-fns';

interface DealListViewProps {
  deals: Deal[];
  onDealClick: (id: string) => void;
  onUpdateDeal: (id: string, data: Partial<Deal>) => Promise<void>;
  onDeleteDeals: (ids: string[]) => Promise<void>;
  onBulkUpdateDeals: (ids: string[], data: Partial<Deal>) => Promise<void>;
  onMouseEnterRow?: (id: string) => void;
}

const STAGES: DealStage[] = ['lead', 'qualified', 'discovery', 'proposal', 'negotiation', 'closed-won', 'closed-lost'];
const PRIORITIES: DealPriority[] = ['Low', 'Medium', 'High', 'Critical'];

const STAGE_COLORS: Record<string, string> = {
  'lead': 'bg-gray-100 text-gray-700',
  'qualified': 'bg-blue-100 text-blue-700',
  'discovery': 'bg-indigo-100 text-indigo-700',
  'proposal': 'bg-violet-100 text-violet-700',
  'negotiation': 'bg-amber-100 text-amber-700',
  'closed-won': 'bg-emerald-100 text-emerald-700',
  'closed-lost': 'bg-red-100 text-red-700',
  'Lead': 'bg-gray-100 text-gray-700',
  'Qualified': 'bg-blue-100 text-blue-700',
  'Discovery': 'bg-indigo-100 text-indigo-700',
  'Proposal': 'bg-violet-100 text-violet-700',
  'Negotiation': 'bg-amber-100 text-amber-700',
  'Closed Won': 'bg-emerald-100 text-emerald-700',
  'Closed Lost': 'bg-red-100 text-red-700',
};

const PRIORITY_ICONS: Record<DealPriority, { icon: string; color: string }> = {
  'Low': { icon: '🟢', color: 'text-emerald-600' },
  'Medium': { icon: '🟡', color: 'text-amber-600' },
  'High': { icon: '🟠', color: 'text-orange-600' },
  'Critical': { icon: '🔴', color: 'text-red-600' },
};

export const DealListView: React.FC<DealListViewProps> = ({ deals, onDealClick, onUpdateDeal, onDeleteDeals, onBulkUpdateDeals, onMouseEnterRow }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Deal | 'daysInStage'; direction: 'asc' | 'desc' } | null>({
    key: 'priority',
    direction: 'desc'
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingField, setEditingField] = useState<{ id: string; field: keyof Deal } | null>(null);
  const [editValue, setEditValue] = useState<any>(null);

  // Quick Filters
  const [showMyDeals, setShowMyDeals] = useState(false);
  const [stageFilters, setStageFilters] = useState<DealStage[]>([]);
  const [atRiskOnly, setAtRiskOnly] = useState(false);
  const [closingThisMonth, setClosingThisMonth] = useState(false);

  const getDaysInStage = (deal: Deal) => {
    return deal.daysInStage || 1;
  };

  const filteredDeals = useMemo(() => {
    let result = [...deals];

    if (showMyDeals) {
      result = result.filter(d => d.owner === 'Me');
    }

    if (stageFilters.length > 0) {
      result = result.filter(d => stageFilters.includes(d.stage));
    }

    if (atRiskOnly) {
      result = result.filter(d => (d.probability && d.probability < 30) || getDaysInStage(d) > 14);
    }

    if (closingThisMonth) {
      const now = new Date();
      result = result.filter(d => {
        if (!d.expectedCloseDate) return false;
        const date = new Date(d.expectedCloseDate);
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      });
    }

    if (sortConfig) {
      result.sort((a, b) => {
        let aValue: any = sortConfig.key === 'daysInStage' ? getDaysInStage(a) : a[sortConfig.key as keyof Deal];
        let bValue: any = sortConfig.key === 'daysInStage' ? getDaysInStage(b) : b[sortConfig.key as keyof Deal];

        if (sortConfig.key === 'priority') {
          const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
          aValue = priorityOrder[a.priority as DealPriority] || 0;
          bValue = priorityOrder[b.priority as DealPriority] || 0;
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [deals, showMyDeals, stageFilters, atRiskOnly, closingThisMonth, sortConfig]);

  const handleSort = (key: keyof Deal | 'daysInStage') => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'desc' };
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredDeals.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredDeals.map(d => d.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleInlineEdit = (id: number, field: keyof Deal, value: any) => {
    setEditingField({ id, field });
    setEditValue(value);
  };

  const saveInlineEdit = async () => {
    if (editingField) {
      await onUpdateDeal(editingField.id, { [editingField.field]: editValue });
      setEditingField(null);
      setEditValue(null);
    }
  };

  const exportToCSV = () => {
    const headers = ['Deal Name', 'Company', 'Contact', 'Value', 'Stage', 'Probability', 'Priority', 'Expected Close', 'Days in Stage', 'Owner'];
    const rows = filteredDeals.map(d => [
      d.name || d.title,
      typeof d.company === 'string' ? d.company : d.company?.name || '',
      d.contactName || (d.contact ? `${d.contact.firstName} ${d.contact.lastName}` : ''),
      `$${d.value.toLocaleString()}`,
      d.stage,
      `${d.probability}%`,
      d.priority,
      d.expectedCloseDate ? format(new Date(d.expectedCloseDate), 'yyyy-MM-dd') : '',
      getDaysInStage(d),
      d.owner
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `deals_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalValue = filteredDeals.reduce((sum, d) => sum + d.value, 0);
  const avgProb = filteredDeals.length > 0 ? Math.round(filteredDeals.reduce((sum, d) => sum + (d.probability || 0), 0) / filteredDeals.length) : 0;
  const avgDays = filteredDeals.length > 0 ? Math.round(filteredDeals.reduce((sum, d) => sum + getDaysInStage(d), 0) / filteredDeals.length) : 0;

  const renderAISignal = (deal: Deal) => {
    if (deal.probability && deal.probability > 80) return <Flame className="text-orange-500" size={16} />;
    if (deal.probability && deal.probability < 30) return <AlertTriangle className="text-red-500" size={16} />;
    if (parseInt(deal.id) % 4 === 0) return <TrendingUp className="text-emerald-500" size={16} />;
    if (parseInt(deal.id) % 5 === 0) return <TrendingDown className="text-amber-500" size={16} />;
    return <Snowflake className="text-blue-300" size={16} />;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Quick Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-card border border-border p-1 rounded-lg shadow-sm">
            <button 
              onClick={() => setShowMyDeals(false)}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-md transition-all",
                !showMyDeals ? "bg-indigo-50 text-indigo-700" : "text-muted-foreground hover:text-foreground"
              )}
            >
              All Deals
            </button>
            <button 
              onClick={() => setShowMyDeals(true)}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-md transition-all",
                showMyDeals ? "bg-indigo-50 text-indigo-700" : "text-muted-foreground hover:text-foreground"
              )}
            >
              My Deals
            </button>
          </div>

          <div className="h-6 w-px bg-border mx-1" />

          <div className="flex flex-wrap gap-1">
            <button 
              onClick={() => setStageFilters([])}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-full border transition-all",
                stageFilters.length === 0 ? "bg-foreground text-background border-foreground" : "bg-card text-muted-foreground border-border hover:border-indigo-300"
              )}
            >
              All
            </button>
            {STAGES.map(stage => (
              <button 
                key={stage}
                onClick={() => setStageFilters(prev => prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage])}
                className={cn(
                  "px-3 py-1 text-xs font-bold rounded-full border transition-all",
                  stageFilters.includes(stage) ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-indigo-300"
                )}
              >
                {stage}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-border mx-1" />

          <button 
            onClick={() => setAtRiskOnly(!atRiskOnly)}
            className={cn(
              "px-3 py-1 text-xs font-bold rounded-full border transition-all flex items-center gap-1.5",
              atRiskOnly ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-card text-muted-foreground border-border hover:border-indigo-300"
            )}
          >
            <AlertTriangle size={14} />
            <span>At Risk</span>
          </button>

          <button 
            onClick={() => setClosingThisMonth(!closingThisMonth)}
            className={cn(
              "px-3 py-1 text-xs font-bold rounded-full border transition-all flex items-center gap-1.5",
              closingThisMonth ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-card text-muted-foreground border-border hover:border-indigo-300"
            )}
          >
            <Calendar size={14} />
            <span>Closing Soon</span>
          </button>
        </div>

        <button 
          onClick={exportToCSV}
          className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-bold text-muted-foreground hover:bg-muted transition-colors"
        >
          <Download size={14} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-primary text-primary-foreground p-2 px-4 rounded-xl flex items-center justify-between shadow-lg animate-in slide-in-from-top-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold">{selectedIds.length} selected</span>
            <div className="h-6 w-px bg-primary-foreground/20" />
            <div className="flex items-center gap-2">
              <div className="relative group/bulk">
                <button className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors">
                  <ArrowRightLeft size={14} />
                  <span>Stage</span>
                </button>
                <div className="absolute top-full left-0 mt-1 hidden group-hover/bulk:block bg-card text-foreground rounded-lg shadow-xl border border-border py-1 min-w-[150px] z-[60]">
                  {STAGES.map(s => (
                    <button 
                      key={s}
                      onClick={() => {
                        onBulkUpdateDeals(selectedIds, { stage: s });
                        setSelectedIds([]);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-muted transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => {
                  const newOwner = window.prompt('Enter new owner name:');
                  if (newOwner) {
                    onBulkUpdateDeals(selectedIds, { owner: newOwner });
                    setSelectedIds([]);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors"
              >
                <UserPlus size={14} />
                <span>Owner</span>
              </button>
              <button 
                onClick={() => {
                  if (window.confirm(`Delete ${selectedIds.length} deals?`)) {
                    onDeleteDeals(selectedIds);
                    setSelectedIds([]);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1 bg-destructive/80 hover:bg-destructive rounded-lg text-xs font-bold transition-colors"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
          <button onClick={() => setSelectedIds([])} className="text-xs font-bold hover:underline">Clear</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="p-4 w-10">
                <input 
                  type="checkbox" 
                  checked={selectedIds.length === filteredDeals.length && filteredDeals.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              {[ 
                { label: 'Deal Name', key: 'name' },
                { label: 'Company', key: 'company' },
                { label: 'Contact', key: 'contact' },
                { label: 'Value', key: 'value' },
                { label: 'Stage', key: 'stage' },
                { label: 'Prob.', key: 'probability' },
                { label: 'Priority', key: 'priority' },
                { label: 'Expected Close', key: 'expectedCloseDate' },
                { label: 'Days', key: 'daysInStage' },
                { label: 'AI', key: null },
                { label: '', key: null },
              ].map((column, idx) => (
                <th 
                  key={idx}
                  className={cn(
                    "px-4 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/50 transition-colors",
                    column.key && "select-none"
                  )}
                  onClick={() => column.key && handleSort(column.key as any)}
                >
                  <div className="flex items-center gap-1">
                    <span>{column.label}</span>
                    {column.key && sortConfig?.key === column.key && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredDeals.map((deal) => {
              const daysInStage = getDaysInStage(deal);
              const daysColor = daysInStage > 14 ? 'text-destructive' : daysInStage > 7 ? 'text-amber-500' : 'text-emerald-500';

              return (
                <tr 
                  key={deal.id} 
                  onMouseEnter={() => onMouseEnterRow?.(deal.id)}
                  className={cn(
                    "hover:bg-muted/30 transition-colors group",
                    selectedIds.includes(deal.id) && "bg-primary/5"
                  )}
                >
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(deal.id)}
                      onChange={() => toggleSelect(deal.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <button 
                      onClick={() => onDealClick(deal.id)}
                      className="font-bold text-foreground hover:text-primary text-sm text-left truncate max-w-[200px]"
                    >
                      {deal.name || deal.title}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Building2 size={14} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground truncate">
                        {typeof deal.company === 'string' ? deal.company : deal.company?.name || 'No Company'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <User size={14} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground truncate">
                        {deal.contactName || (deal.contact ? `${deal.contact.firstName} ${deal.contact.lastName}` : 'No Contact')}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4" onDoubleClick={() => handleInlineEdit(deal.id, 'value', deal.value)}>
                    {editingField?.id === deal.id && editingField.field === 'value' ? (
                      <input 
                        type="number" 
                        value={editValue} 
                        onChange={(e) => setEditValue(Number(e.target.value))}
                        onBlur={saveInlineEdit}
                        onKeyDown={(e) => e.key === 'Enter' && saveInlineEdit()}
                        className="w-24 p-1 text-sm bg-muted border border-primary rounded focus:outline-none ring-1 ring-primary"
                        autoFocus
                      />
                    ) : (
                      <div className="font-bold text-foreground text-sm">${deal.value.toLocaleString()}</div>
                    )}
                  </td>
                  <td className="px-4 py-4" onDoubleClick={() => handleInlineEdit(deal.id, 'stage', deal.stage)}>
                    {editingField?.id === deal.id && editingField.field === 'stage' ? (
                      <select 
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveInlineEdit}
                        className="p-1 text-xs bg-muted border border-primary rounded focus:outline-none ring-1 ring-primary"
                        autoFocus
                      >
                        {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    ) : (
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                        STAGE_COLORS[deal.stage]
                      )}>
                        {deal.stage}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-20">
                      <div className="flex justify-between text-[10px] font-bold text-muted-foreground mb-1">
                        <span>{deal.probability}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all duration-500",
                            deal.probability && deal.probability > 60 ? "bg-emerald-500" : 
                            deal.probability && deal.probability > 30 ? "bg-amber-500" : "bg-destructive"
                          )}
                          style={{ width: `${deal.probability}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4" onDoubleClick={() => handleInlineEdit(deal.id, 'priority', deal.priority)}>
                    {editingField?.id === deal.id && editingField.field === 'priority' ? (
                      <select 
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveInlineEdit}
                        className="p-1 text-xs bg-muted border border-primary rounded focus:outline-none ring-1 ring-primary"
                        autoFocus
                      >
                        {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    ) : (
                      <div className={cn("flex items-center gap-1.5 text-xs font-bold", PRIORITY_ICONS[deal.priority].color)}>
                        <span>{PRIORITY_ICONS[deal.priority].icon}</span>
                        <span>{deal.priority}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {deal.expectedCloseDate ? format(new Date(deal.expectedCloseDate), 'MMM d, yy') : 'TBD'}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className={cn("flex items-center justify-center gap-1 text-xs font-bold", daysColor)}>
                      <Clock size={12} />
                      <span>{daysInStage}d</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center">
                      {renderAISignal(deal)}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onDealClick(deal.id)}
                        className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-muted/30 font-bold border-t border-border">
              <td className="p-4"></td>
              <td className="px-4 py-4 text-[10px] text-muted-foreground uppercase">Total Pipeline</td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4 text-foreground text-sm">${totalValue.toLocaleString()}</td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4 text-[10px] text-muted-foreground uppercase text-center">Avg Prob: {avgProb}%</td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4 text-[10px] text-muted-foreground uppercase text-center">Avg Days: {avgDays}</td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};