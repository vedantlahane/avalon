import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Search,
  Filter,
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
  CheckCircle2,
  XCircle,
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
  onDealClick: (id: number) => void;
  onUpdateDeal: (id: number, data: Partial<Deal>) => Promise<void>;
  onDeleteDeals: (ids: number[]) => Promise<void>;
  onBulkUpdateDeals: (ids: number[], data: Partial<Deal>) => Promise<void>;
}

const STAGES: DealStage[] = ['Lead', 'Qualified', 'Discovery', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
const PRIORITIES: DealPriority[] = ['Low', 'Medium', 'High', 'Critical'];

const STAGE_COLORS: Record<DealStage, string> = {
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

export const DealListView: React.FC<DealListViewProps> = ({ deals, onDealClick, onUpdateDeal, onDeleteDeals, onBulkUpdateDeals }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Deal | 'daysInStage'; direction: 'asc' | 'desc' } | null>({
    key: 'priority',
    direction: 'desc'
  });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editingField, setEditingField] = useState<{ id: number; field: keyof Deal } | null>(null);
  const [editValue, setEditValue] = useState<any>(null);

  // Quick Filters
  const [showMyDeals, setShowMyDeals] = useState(false);
  const [stageFilters, setStageFilters] = useState<DealStage[]>([]);
  const [atRiskOnly, setAtRiskOnly] = useState(false);
  const [closingThisMonth, setClosingThisMonth] = useState(false);

  const getDaysInStage = (deal: Deal) => {
    // Mocking days in stage based on updatedAt for now
    return differenceInDays(new Date(), new Date(deal.updatedAt)) || 1;
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

        // Priority sorting logic
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
      d.name,
      d.company?.name || '',
      d.contact ? `${d.contact.firstName} ${d.contact.lastName}` : '',
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

  // Summary Calculations
  const totalValue = filteredDeals.reduce((sum, d) => sum + d.value, 0);
  const avgProb = filteredDeals.length > 0 ? Math.round(filteredDeals.reduce((sum, d) => sum + (d.probability || 0), 0) / filteredDeals.length) : 0;
  const avgDays = filteredDeals.length > 0 ? Math.round(filteredDeals.reduce((sum, d) => sum + getDaysInStage(d), 0) / filteredDeals.length) : 0;

  const renderAISignal = (deal: Deal) => {
    if (deal.probability && deal.probability > 80) return <Flame className="text-orange-500" size={16} />;
    if (deal.probability && deal.probability < 30) return <AlertTriangle className="text-red-500" size={16} />;
    if (deal.id % 4 === 0) return <TrendingUp className="text-emerald-500" size={16} />;
    if (deal.id % 5 === 0) return <TrendingDown className="text-amber-500" size={16} />;
    return <Snowflake className="text-blue-300" size={16} />;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Quick Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
            <button 
              onClick={() => setShowMyDeals(false)}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-md transition-all",
                !showMyDeals ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:text-gray-900"
              )}
            >
              All Deals
            </button>
            <button 
              onClick={() => setShowMyDeals(true)}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-md transition-all",
                showMyDeals ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:text-gray-900"
              )}
            >
              My Deals
            </button>
          </div>

          <div className="h-6 w-px bg-gray-200 mx-1" />

          <div className="flex flex-wrap gap-1">
            <button 
              onClick={() => setStageFilters([])}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-full border transition-all",
                stageFilters.length === 0 ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
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
                  stageFilters.includes(stage) ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                )}
              >
                {stage}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-200 mx-1" />

          <button 
            onClick={() => setAtRiskOnly(!atRiskOnly)}
            className={cn(
              "px-3 py-1 text-xs font-bold rounded-full border transition-all flex items-center gap-1.5",
              atRiskOnly ? "bg-red-50 text-red-700 border-red-200" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
            )}
          >
            <AlertTriangle size={14} />
            <span>At Risk Only</span>
          </button>

          <button 
            onClick={() => setClosingThisMonth(!closingThisMonth)}
            className={cn(
              "px-3 py-1 text-xs font-bold rounded-full border transition-all flex items-center gap-1.5",
              closingThisMonth ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
            )}
          >
            <Calendar size={14} />
            <span>Closing This Month</span>
          </button>
        </div>

        <button 
          onClick={exportToCSV}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Download size={14} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-indigo-600 text-white p-2 px-4 rounded-xl flex items-center justify-between shadow-lg animate-in slide-in-from-top-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold">{selectedIds.length} deals selected</span>
            <div className="h-6 w-px bg-indigo-500" />
            <div className="flex items-center gap-2">
              <div className="relative group/bulk">
                <button className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors">
                  <ArrowRightLeft size={14} />
                  <span>Change Stage</span>
                </button>
                <div className="absolute top-full left-0 mt-1 hidden group-hover/bulk:block bg-white text-gray-900 rounded-lg shadow-xl border border-gray-100 py-1 min-w-[150px] z-[60]">
                  {STAGES.map(s => (
                    <button 
                      key={s}
                      onClick={() => {
                        onBulkUpdateDeals(selectedIds, { stage: s });
                        setSelectedIds([]);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 transition-colors"
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
                <span>Change Owner</span>
              </button>
              <button 
                onClick={() => {
                  if (window.confirm(`Delete ${selectedIds.length} deals?`)) {
                    onDeleteDeals(selectedIds);
                    setSelectedIds([]);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1 bg-red-500/80 hover:bg-red-500 rounded-lg text-xs font-bold transition-colors"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
          <button onClick={() => setSelectedIds([])} className="text-xs font-bold hover:underline">Clear Selection</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 w-10">
                <input 
                  type="checkbox" 
                  checked={selectedIds.length === filteredDeals.length && filteredDeals.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </th>
              {[ 
                { label: 'Deal Name', key: 'name' },
                { label: 'Company', key: 'company' },
                { label: 'Contact', key: 'contact' },
                { label: 'Value', key: 'value' },
                { label: 'Stage', key: 'stage' },
                { label: 'Probability', key: 'probability' },
                { label: 'Priority', key: 'priority' },
                { label: 'Expected Close', key: 'expectedCloseDate' },
                { label: 'Days in Stage', key: 'daysInStage' },
                { label: 'AI Signal', key: null },
                { label: 'Actions', key: null },
              ].map((column, idx) => (
                <th 
                  key={idx}
                  className={cn(
                    "px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors",
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
          <tbody className="divide-y divide-gray-50">
            {filteredDeals.map((deal) => {
              const daysInStage = getDaysInStage(deal);
              const daysColor = daysInStage > 14 ? 'text-red-500' : daysInStage > 7 ? 'text-amber-500' : 'text-emerald-500';

              return (
                <tr 
                  key={deal.id} 
                  className={cn(
                    "hover:bg-gray-50/80 transition-colors group",
                    selectedIds.includes(deal.id) && "bg-indigo-50/30"
                  )}
                >
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(deal.id)}
                      onChange={() => toggleSelect(deal.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <button 
                      onClick={() => onDealClick(deal.id)}
                      className="font-bold text-gray-900 hover:text-indigo-600 text-sm text-left"
                    >
                      {deal.name}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Building2 size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{deal.company?.name || 'No Company'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <User size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {deal.contact ? `${deal.contact.firstName} ${deal.contact.lastName}` : 'No Contact'}
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
                        className="w-24 p-1 text-sm border border-indigo-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        autoFocus
                      />
                    ) : (
                      <div className="font-bold text-gray-900 text-sm">${deal.value.toLocaleString()}</div>
                    )}
                  </td>
                  <td className="px-4 py-4" onDoubleClick={() => handleInlineEdit(deal.id, 'stage', deal.stage)}>
                    {editingField?.id === deal.id && editingField.field === 'stage' ? (
                      <select 
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveInlineEdit}
                        className="p-1 text-xs border border-indigo-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                    <div className="w-24">
                      <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
                        <span>{deal.probability}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all duration-500",
                            deal.probability && deal.probability > 60 ? "bg-emerald-500" : 
                            deal.probability && deal.probability > 30 ? "bg-amber-500" : "bg-red-500"
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
                        className="p-1 text-xs border border-indigo-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {deal.expectedCloseDate ? format(new Date(deal.expectedCloseDate), 'MMM d, yyyy') : 'TBD'}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className={cn("flex items-center justify-center gap-1 text-sm font-bold", daysColor)}>
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
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* Summary Row */}
          <tfoot>
            <tr className="bg-gray-50 font-bold border-t-2 border-gray-100">
              <td className="p-4"></td>
              <td className="px-4 py-4 text-xs text-gray-500 uppercase">Total</td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4 text-gray-900 text-sm">${totalValue.toLocaleString()}</td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4 text-xs text-gray-500 uppercase">Avg: {avgProb}%</td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4 text-xs text-gray-500 uppercase text-center">Avg: {avgDays}d</td>
              <td className="px-4 py-4"></td>
              <td className="px-4 py-4"></td>
            </tr>
          </tfoot>
        </table>

        {filteredDeals.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No deals found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};
