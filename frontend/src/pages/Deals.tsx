import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
  DropAnimation
} from '@dnd-kit/core';
import { 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { dealService } from '../services/deal.service';
import { Deal, DealStage } from '../types';
import { 
  Plus, 
  Search, 
  Filter, 
  TrendingUp,
  Download,
  Building2,
  AlertCircle,
  Zap,
  LayoutGrid,
  List as ListIcon,
  BarChart3,
  Brain,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { DealModal } from '../components/deals/DealModal';
import { DealForecast } from '../components/deals/DealForecast';
import { DealListView } from '../components/deals/DealListView';
import { ExportModal } from '../components/common/ExportModal';
import { EmptyState } from '../components/common/EmptyState';
import { ListSkeleton } from '../components/common/Skeletons';
import { ErrorState } from '../components/common/ErrorState';
import { useDebounce } from '../hooks/useDebounce';
import confetti from 'canvas-confetti';

const STAGES: { id: DealStage; label: string; borderColor: string; color: string }[] = [
  { id: 'Lead', label: 'Lead', borderColor: 'border-t-[#9CA3AF]', color: 'text-[#9CA3AF]' },
  { id: 'Qualified', label: 'Qualified', borderColor: 'border-t-[#3B82F6]', color: 'text-[#3B82F6]' },
  { id: 'Discovery', label: 'Discovery', borderColor: 'border-t-[#6366F1]', color: 'text-[#6366F1]' },
  { id: 'Proposal', label: 'Proposal', borderColor: 'border-t-[#8B5CF6]', color: 'text-[#8B5CF6]' },
  { id: 'Negotiation', label: 'Negotiation', borderColor: 'border-t-[#F59E0B]', color: 'text-[#F59E0B]' },
  { id: 'Closed Won', label: 'Closed Won', borderColor: 'border-t-[#10B981]', color: 'text-[#10B981]' },
  { id: 'Closed Lost', label: 'Closed Lost', borderColor: 'border-t-[#EF4444]', color: 'text-[#EF4444]' },
];

const STAGE_PROBABILITIES: Record<DealStage, number> = {
  'Lead': 10,
  'Qualified': 25,
  'Discovery': 40,
  'Proposal': 60,
  'Negotiation': 80,
  'Closed Won': 100,
  'Closed Lost': 0
};

const ITEMS_PER_PAGE = 25;

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const DealCard: React.FC<{ deal: Deal, isOverlay?: boolean, onClick?: () => void, onMouseEnter?: () => void }> = ({ deal, isOverlay, onClick, onMouseEnter }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: deal.id });

  const style = { transform: CSS.Translate.toString(transform), transition };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="w-full h-32 bg-primary/5 border-2 border-dashed border-primary/20 rounded-2xl" />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        "bg-card border border-border rounded-2xl p-4 shadow-sm card-hover cursor-grab active:cursor-grabbing hover:bg-accent/50 active:scale-[0.98] transition-all",
        isOverlay && "shadow-2xl border-primary scale-105 z-50 ring-4 ring-primary/10"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
          {deal.name}
        </h4>
        <div className="flex items-center gap-1">
          {deal.priority === 'High' && <AlertCircle size={14} className="text-destructive" />}
          {deal.probability && deal.probability > 70 && <Zap size={14} className="text-amber-400 fill-amber-400" />}
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-4">
        <Building2 size={12} />
        <span className="truncate max-w-[120px] font-medium">{deal.company?.name}</span>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="text-base font-bold text-foreground tracking-tight">{formatCurrency(deal.value)}</div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 rounded-full text-[10px] font-black text-emerald-500 uppercase tracking-widest">
          <TrendingUp size={10} />
          {deal.probability}%
        </div>
      </div>

      {deal.id % 4 === 0 && (
        <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-2">
          <div className="p-1 bg-primary/10 rounded">
            <Brain size={12} className="text-primary" />
          </div>
          <p className="text-[10px] text-primary/80 font-bold uppercase tracking-widest">Stalled for 5 days</p>
        </div>
      )}
    </div>
  );
};

const Column: React.FC<{ stage: any, deals: Deal[], onAddDeal: () => void, onCardClick: (id: number) => void, onMouseEnterCard: (id: number) => void }> = ({ stage, deals, onAddDeal, onCardClick, onMouseEnterCard }) => {
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex flex-col w-80 h-full">
      <div className={cn(
        "flex flex-col mb-3 p-3 bg-card rounded-2xl border border-border shadow-sm border-t-4 transition-all",
        stage.borderColor
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-[10px] text-foreground uppercase tracking-widest">{stage.label}</h3>
            <span className="bg-muted text-muted-foreground text-[10px] font-black px-2 py-0.5 rounded-full">
              {deals.length}
            </span>
          </div>
          <div className="text-[10px] font-black text-muted-foreground tracking-wider">
            {formatCurrency(totalValue)}
          </div>
        </div>
      </div>

      <SortableContext
        id={stage.id}
        items={deals.map(d => d.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 bg-muted/20 border border-border/30 rounded-2xl p-2 space-y-3 min-h-[500px] overflow-y-auto max-h-[calc(100vh-320px)] custom-scrollbar">
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} onClick={() => onCardClick(deal.id)} onMouseEnter={() => onMouseEnterCard(deal.id)} />
          ))}
          
          <button 
            onClick={onAddDeal}
            className="w-full py-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-card rounded-xl border-2 border-dashed border-border/50 hover:border-primary/30 transition-all ripple"
          >
            <Plus size={14} />
            <span>Add Deal</span>
          </button>
        </div>
      </SortableContext>
    </div>
  );
};

export const Deals: React.FC = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [view, setView] = useState<'Kanban' | 'List' | 'Forecast'>('Kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [filters, setFilters] = useState({
    owner: 'All',
    priority: 'All',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [initialStage, setInitialStage] = useState<DealStage | undefined>(undefined);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await dealService.getDeals();
      setDeals(data);
      setError(null);
    } catch (err) {
      setError('Failed to load deals');
    } finally {
      setTimeout(() => setIsLoading(false), 600);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPipelineValue = useMemo(() => {
    return deals.reduce((sum, d) => sum + d.value, 0);
  }, [deals]);

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesSearch = deal.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) || 
                           deal.company?.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      const matchesPriority = filters.priority === 'All' || deal.priority === filters.priority;
      return matchesSearch && matchesPriority;
    });
  }, [deals, debouncedSearchQuery, filters]);

  const totalPages = Math.ceil(filteredDeals.length / ITEMS_PER_PAGE);
  const paginatedDeals = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDeals.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDeals, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, filters]);

  const prefetchDeal = useCallback((id: number) => {
    console.log(`Preloading deal ${id}...`);
    dealService.getDealById(id).catch(() => {});
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(Number(event.active.id));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = Number(active.id);
    const overId = over.id as string;

    const activeDeal = deals.find(d => d.id === activeId);
    if (!activeDeal) return;

    if (STAGES.some(s => s.id === overId)) {
      if (activeDeal.stage !== overId) {
        setDeals(prev => prev.map(d => 
          d.id === activeId ? { ...d, stage: overId as DealStage, probability: STAGE_PROBABILITIES[overId as DealStage] } : d
        ));
      }
      return;
    }

    const overDeal = deals.find(d => d.id === Number(overId));
    if (overDeal && activeDeal.stage !== overDeal.stage) {
      setDeals(prev => prev.map(d => 
        d.id === activeId ? { ...d, stage: overDeal.stage, probability: STAGE_PROBABILITIES[overDeal.stage] } : d
      ));
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over) {
      const activeId = Number(active.id);
      const activeDeal = deals.find(d => d.id === activeId);
      
      if (activeDeal) {
        const overId = over.id as string;
        let newStage: DealStage;
        
        if (STAGES.some(s => s.id === overId)) {
          newStage = overId as DealStage;
        } else {
          const overDeal = deals.find(d => d.id === Number(overId));
          newStage = overDeal ? overDeal.stage : activeDeal.stage;
        }

        if (newStage === 'Closed Won' && activeDeal.stage !== 'Closed Won') {
          triggerConfetti();
        }

        await dealService.updateDeal(activeDeal.id, { 
          stage: newStage, 
          probability: STAGE_PROBABILITIES[newStage]
        });
        fetchData();
      }
    }
    
    setActiveId(null);
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  if (isLoading) return <ListSkeleton />;
  if (error) return <ErrorState onRetry={fetchData} />;

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden page-fade-in pb-20 md:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Deal Pipeline</h1>
          <p className="text-primary font-bold mt-1">
            {formatCurrency(totalPipelineValue)} in pipeline
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex bg-card border border-border p-1 rounded-xl shadow-sm">
            <button 
              onClick={() => setView('Kanban')}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                view === 'Kanban' ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid size={14} />
              <span>Kanban</span>
            </button>
            <button 
              onClick={() => setView('List')}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                view === 'List' ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <ListIcon size={14} />
              <span>List</span>
            </button>
            <button 
              onClick={() => setView('Forecast')}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                view === 'Forecast' ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <BarChart3 size={14} />
              <span>Forecast</span>
            </button>
          </div>
          <button 
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-2 bg-card border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground transition-all shadow-sm btn-hover"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md btn-hover ripple"
          >
            <Plus size={18} />
            <span>Add Deal</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-card border border-border p-3 rounded-2xl shadow-sm">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input 
            type="text" 
            placeholder="Search deals..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/50 border border-transparent rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 text-foreground transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            className="bg-muted/50 border border-transparent border-r-8 border-r-transparent rounded-xl py-2 px-3 text-xs font-bold focus:outline-none text-foreground"
            value={filters.priority}
            onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <button className="p-2 bg-muted/50 rounded-xl text-muted-foreground hover:text-primary ripple">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Main Pipeline View */}
      <div className={cn(
        "flex-1 overflow-x-auto pb-4 overflow-y-auto custom-scrollbar",
        view === 'Kanban' ? "-mx-2 px-2" : ""
      )}>
        {filteredDeals.length === 0 ? (
          <EmptyState
            icon={TrendingUp}
            title="No deals found"
            description="Adjust your search or filters to see more deals."
            actions={[{ label: 'Clear Filters', onClick: () => { setSearchQuery(''); setFilters({ owner: 'All', priority: 'All' }); } }]}
          />
        ) : (
          <>
            {view === 'Kanban' && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                <div className="flex gap-4 h-full min-w-max pb-2 pipeline-scroll">
                  {STAGES.map(stage => (
                    <Column 
                      key={stage.id} 
                      stage={stage} 
                      deals={filteredDeals.filter(d => d.stage === stage.id)} 
                      onAddDeal={() => { setInitialStage(stage.id); setIsModalOpen(true); }}
                      onCardClick={(id) => navigate(`/deals/${id}`)}
                      onMouseEnterCard={prefetchDeal}
                    />
                  ))}
                </div>

                <DragOverlay dropAnimation={dropAnimation}>
                  {activeId ? (
                    <DealCard deal={deals.find(d => d.id === activeId)!} isOverlay />
                  ) : null}
                </DragOverlay>
              </DndContext>
            )}

            {view === 'List' && (
              <div className="space-y-4">
                <DealListView 
                  deals={paginatedDeals}
                  onDealClick={(id) => navigate(`/deals/${id}`)}
                  onUpdateDeal={async (id, data) => { await dealService.updateDeal(id, data); fetchData(); }}
                  onDeleteDeals={async (ids) => { await dealService.bulkDeleteDeals(ids); fetchData(); }}
                  onBulkUpdateDeals={async (ids, data) => { await dealService.bulkUpdateDeals(ids, data); fetchData(); }}
                  onMouseEnterRow={prefetchDeal}
                />
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-2 pt-4">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredDeals.length)} of {filteredDeals.length} deals
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
              </div>
            )}

            {view === 'Forecast' && (
              <DealForecast onDealClick={(id) => navigate(`/deals/${id}`)} />
            )}
          </>
        )}
      </div>

      <DealModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchData}
        initialStage={initialStage}
      />
      <ExportModal 
        isOpen={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
        resource="deals" 
        totalCount={deals.length}
        filteredCount={filteredDeals.length}
      />
    </div>
  );
};
