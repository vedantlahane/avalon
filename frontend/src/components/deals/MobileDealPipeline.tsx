import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  TrendingUp,
  Building2,
  AlertCircle,
  Brain,
  Mail,
  Phone,
  Edit3,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { Deal, DealStage } from '@/types';
import { cn, formatCurrency } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const STAGES: { id: DealStage; label: string }[] = [
  { id: 'Lead', label: 'Lead' },
  { id: 'Qualified', label: 'Qualified' },
  { id: 'Discovery', label: 'Discovery' },
  { id: 'Proposal', label: 'Proposal' },
  { id: 'Negotiation', label: 'Negotiation' },
  { id: 'Closed Won', label: 'Won' },
  { id: 'Closed Lost', label: 'Lost' },
];

interface MobileDealPipelineProps {
  deals: Deal[];
  onAdd: (stage?: DealStage) => void;
  onUpdateStage: (id: number, stage: DealStage) => void;
}

export const MobileDealPipeline: React.FC<MobileDealPipelineProps> = ({ deals, onAdd, onUpdateStage }) => {
  const [selectedStage, setSelectedStage] = useState<DealStage | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           deal.company?.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStage = selectedStage === 'All' || deal.stage === selectedStage;
      return matchesSearch && matchesStage;
    });
  }, [deals, searchQuery, selectedStage]);

  const stageTotals = useMemo(() => {
    const totals: Record<string, { count: number, value: number }> = {
      All: { count: deals.length, value: deals.reduce((sum, d) => sum + d.value, 0) }
    };
    STAGES.forEach(s => {
      const stageDeals = deals.filter(d => d.stage === s.id);
      totals[s.id] = {
        count: stageDeals.length,
        value: stageDeals.reduce((sum, d) => sum + d.value, 0)
      };
    });
    return totals;
  }, [deals]);

  return (
    <div className="flex flex-col h-full bg-background pb-24">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">Deals ({filteredDeals.length})</h1>
        <div className="flex items-center gap-2">
          <button className="p-2 text-muted-foreground hover:bg-muted rounded-xl transition-colors">
            <Search size={20} />
          </button>
          <button onClick={() => onAdd(selectedStage !== 'All' ? selectedStage : undefined)} className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors">
            <Plus size={24} />
          </button>
        </div>
      </div>

      {/* Stage Tabs (Horizontal Scroll) */}
      <div className="px-4 py-3 bg-muted/30 border-b border-border/50">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedStage('All')}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
              selectedStage === 'All' 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                : "bg-card text-muted-foreground border border-border"
            )}
          >
            All {stageTotals['All'].count}
          </button>
          {STAGES.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                selectedStage === stage.id 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "bg-card text-muted-foreground border border-border"
              )}
            >
              {stage.label} {stageTotals[stage.id].count}
            </button>
          ))}
        </div>
        
        {selectedStage !== 'All' && (
          <div className="mt-3 flex items-center justify-between px-1">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              {selectedStage} ({stageTotals[selectedStage].count} deals)
            </p>
            <p className="text-xs font-bold text-primary">
              {formatCurrency(stageTotals[selectedStage].value)}
            </p>
          </div>
        )}
      </div>

      {/* List */}
      <div className="divide-y divide-border/50">
        <AnimatePresence mode="popLayout">
          {filteredDeals.map((deal) => (
            <DealListItem 
              key={deal.id} 
              deal={deal} 
              onUpdateStage={(stage) => onUpdateStage(deal.id, stage)}
              onClick={() => navigate(`/deals/${deal.id}`)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const DealListItem: React.FC<{ deal: Deal; onUpdateStage: (stage: DealStage) => void; onClick: () => void }> = ({ deal, onUpdateStage, onClick }) => {
  const [showStageMenu, setShowStageMenu] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="bg-card p-4 space-y-4"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-foreground truncate">{deal.name}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Building2 size={12} className="text-muted-foreground" />
            <p className="text-xs text-muted-foreground font-medium truncate">{deal.company?.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-base font-bold text-foreground">{formatCurrency(deal.value)}</p>
          <div className="flex items-center justify-end gap-1.5 mt-1">
            <TrendingUp size={12} className="text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-500 uppercase">{deal.probability}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
          <span>{deal.stage}</span>
          <span>Close: {deal.expectedCloseDate ? format(new Date(deal.expectedCloseDate), 'MMM d') : 'N/A'}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${deal.probability}%` }}
            className={cn(
              "h-full rounded-full transition-all",
              (deal.probability || 0) > 70 ? "bg-emerald-500" : (deal.probability || 0) > 40 ? "bg-primary" : "bg-muted-foreground/30"
            )}
          />
        </div>
      </div>

      {deal.id % 4 === 0 && (
        <div className="flex items-center gap-2 p-2 bg-primary/5 border border-primary/10 rounded-lg">
          <Brain className="w-4 h-4 text-primary" />
          <p className="text-[11px] font-medium text-primary">"Send proposal follow-up"</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-2">
          <button className="p-2 bg-muted rounded-xl text-muted-foreground" onClick={(e) => { e.stopPropagation(); }}>
            <Mail size={16} />
          </button>
          <button className="p-2 bg-muted rounded-xl text-muted-foreground" onClick={(e) => { e.stopPropagation(); }}>
            <Phone size={16} />
          </button>
          <button className="p-2 bg-muted rounded-xl text-muted-foreground" onClick={(e) => { e.stopPropagation(); }}>
            <Edit3 size={16} />
          </button>
        </div>

        <div className="relative">
          <button 
            onClick={(e) => { e.stopPropagation(); setShowStageMenu(!showStageMenu); }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-xl text-[10px] font-black text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors"
          >
            Move Stage <ChevronDown size={12} />
          </button>

          {showStageMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setShowStageMenu(false); }} />
              <div className="absolute right-0 bottom-full mb-2 w-48 bg-card border border-border rounded-xl shadow-xl z-50 py-1.5">
                {STAGES.map((s) => (
                  <button
                    key={s.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateStage(s.id);
                      setShowStageMenu(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-xs font-bold transition-colors",
                      deal.stage === s.id ? "text-primary bg-primary/5" : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
