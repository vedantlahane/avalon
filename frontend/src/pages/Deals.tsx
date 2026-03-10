import React, { useEffect, useState, useMemo } from 'react';
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
import { Deal, DealStage, DealPriority } from '../types';
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Filter, 
  TrendingUp,
  Building2,
  User,
  Calendar,
  AlertCircle,
  Mail,
  Phone,
  FileText,
  Zap,
  ChevronRight,
  LayoutGrid,
  List,
  BarChart3
} from 'lucide-react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { DealModal } from '../components/deals/DealModal';
import { DealDetailDrawer } from '../components/deals/DealDetailDrawer';
import { DealForecast } from '../components/deals/DealForecast';

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

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

export const Deals: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [view, setView] = useState<'Kanban' | 'List' | 'Forecast'>('Kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    owner: 'All',
    company: 'All',
    priority: 'All',
  });

  // Modal/Drawer state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [initialStage, setInitialStage] = useState<DealStage | undefined>(undefined);
  const [drawerDealId, setDrawerDealId] = useState<number | null>(null);

  const fetchDeals = () => {
    dealService.getDeals().then(setDeals);
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const totalPipelineValue = useMemo(() => {
    return deals.reduce((sum, d) => sum + d.value, 0);
  }, [deals]);

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           deal.company?.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesOwner = filters.owner === 'All' || deal.owner === filters.owner;
      const matchesPriority = filters.priority === 'All' || deal.priority === filters.priority;
      return matchesSearch && matchesOwner && matchesPriority;
    });
  }, [deals, searchQuery, filters]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
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

        if (newStage === 'Closed Won') {
          if (!window.confirm('🎉 Congratulations! Mark deal as won?')) {
            fetchDeals(); // Revert
            setActiveId(null);
            return;
          }
        } else if (newStage === 'Closed Lost') {
          const reason = window.prompt('What was the loss reason?');
          if (reason !== null) {
            activeDeal.lossReason = reason;
          }
        }

        await dealService.updateDeal(activeDeal.id, { 
          stage: newStage, 
          probability: STAGE_PROBABILITIES[newStage],
          lossReason: activeDeal.lossReason 
        });
        fetchDeals();
      }
    }
    
    setActiveId(null);
  };

  const openAddModal = (stage?: DealStage) => {
    setSelectedDeal(null);
    setInitialStage(stage);
    setIsModalOpen(true);
  };

  const openEditModal = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsModalOpen(true);
  };

  const openDrawer = (dealId: number) => {
    setDrawerDealId(dealId);
    setIsDrawerOpen(true);
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deal Pipeline</h1>
          <p className="text-indigo-600 font-semibold mt-1">
            ${totalPipelineValue.toLocaleString()} in pipeline
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
            <button 
              onClick={() => setView('Kanban')}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                view === 'Kanban' ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <LayoutGrid size={16} />
              <span>Kanban</span>
            </button>
            <button 
              onClick={() => setView('List')}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                view === 'List' ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <List size={16} />
              <span>List</span>
            </button>
            <button 
              onClick={() => setView('Forecast')}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                view === 'Forecast' ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <BarChart3 size={16} />
              <span>Forecast</span>
            </button>
          </div>
          <button 
            onClick={() => openAddModal()}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus size={18} />
            <span>Add Deal</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white border border-gray-200 p-3 rounded-xl shadow-sm">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search deals..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-lg py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Owner:</span>
          <select 
            className="bg-gray-50 border border-gray-100 rounded-lg py-1 px-2 text-sm focus:outline-none"
            value={filters.owner}
            onChange={(e) => setFilters(prev => ({ ...prev, owner: e.target.value }))}
          >
            <option>All</option>
            <option>Me</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Priority:</span>
          <select 
            className="bg-gray-50 border border-gray-100 rounded-lg py-1 px-2 text-sm focus:outline-none"
            value={filters.priority}
            onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg border border-transparent hover:border-gray-200 transition-all">
          <Filter size={16} />
          <span>More Filters</span>
        </button>
      </div>

      {/* Main Pipeline View */}
      <div className={cn(
        "flex-1 overflow-x-auto pb-4",
        view === 'Kanban' ? "-mx-6 px-6" : ""
      )}>
        {view === 'Kanban' && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-4 h-full min-w-max pb-2">
              {STAGES.map(stage => (
                <Column 
                  key={stage.id} 
                  stage={stage} 
                  deals={filteredDeals.filter(d => d.stage === stage.id)} 
                  onAddDeal={() => openAddModal(stage.id)}
                  onCardClick={openDrawer}
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
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Deal Name</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Stage</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Close Date</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredDeals.map((deal) => (
                  <tr 
                    key={deal.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => openDrawer(deal.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{deal.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{deal.company?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          STAGES.find(s => s.id === deal.stage)?.color.replace('text', 'bg')
                        )} />
                        <span className="text-sm font-medium text-gray-700">{deal.stage}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">${deal.value.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600 uppercase">
                          {deal.owner?.charAt(0) || 'U'}
                        </div>
                        <span className="text-sm text-gray-600">{deal.owner || 'Unassigned'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {deal.expectedCloseDate ? format(new Date(deal.expectedCloseDate), 'MMM d, yyyy') : 'TBD'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 text-gray-400 hover:text-gray-600" onClick={(e) => { e.stopPropagation(); /* handle actions */ }}>
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'Forecast' && (
          <DealForecast onDealClick={openDrawer} />
        )}
      </div>

      {/* Modal & Drawer */}
      <DealModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchDeals}
        deal={selectedDeal}
        initialStage={initialStage}
      />
      <DealDetailDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        dealId={drawerDealId}
        onEdit={(deal) => {
          setIsDrawerOpen(false);
          openEditModal(deal);
        }}
      />
    </div>
  );
};

interface ColumnProps {
  stage: typeof STAGES[0];
  deals: Deal[];
  onAddDeal: () => void;
  onCardClick: (id: number) => void;
}

const Column: React.FC<ColumnProps> = ({ stage, deals, onAddDeal, onCardClick }) => {
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex flex-col w-80 h-full group/column">
      <div className={cn(
        "flex flex-col mb-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm border-t-4",
        stage.borderColor
      )}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-gray-900">{stage.label}</h3>
            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {deals.length}
            </span>
          </div>
          <div className="text-xs font-bold text-gray-500">
            ${totalValue.toLocaleString()}
          </div>
        </div>
      </div>

      <SortableContext
        id={stage.id}
        items={deals.map(d => d.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className={cn(
          "flex-1 bg-gray-50/50 border border-gray-100 rounded-2xl p-2 space-y-3 min-h-[500px] transition-colors overflow-y-auto max-h-[calc(100vh-320px)]",
          "hover:bg-gray-100/50"
        )}>
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} onClick={() => onCardClick(deal.id)} />
          ))}
          
          <button 
            onClick={onAddDeal}
            className="w-full py-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-200 transition-all"
          >
            <Plus size={14} />
            <span>Add Deal</span>
          </button>
        </div>
      </SortableContext>
    </div>
  );
};

interface DealCardProps {
  deal: Deal;
  isOverlay?: boolean;
  onClick?: () => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, isOverlay, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const hasGlow = deal.probability && deal.probability > 70 ? 'green' : deal.probability && deal.probability < 30 ? 'red' : null;
  const isFaster = deal.id % 3 === 0;
  const isStalling = deal.id % 5 === 0;

  if (isDragging) {
    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        className="w-full h-[180px] bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-xl"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={cn(
        "bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all group relative cursor-grab active:cursor-grabbing",
        hasGlow === 'green' && "ring-2 ring-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
        hasGlow === 'red' && "ring-2 ring-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
        isOverlay && "shadow-2xl border-indigo-500 scale-105 z-50"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
            {deal.name}
          </h4>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1">
            <Building2 size={12} className="text-gray-400" />
            <span className="truncate">{deal.company?.name || 'No Company'}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button className="text-gray-400 hover:text-gray-600 p-0.5 rounded hover:bg-gray-50" onClick={(e) => e.stopPropagation()}>
            <MoreHorizontal size={14} />
          </button>
          {isFaster && <Zap size={14} className="text-amber-500 fill-amber-500" />}
          {isStalling && <AlertCircle size={14} className="text-red-500" />}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-3">
        <User size={12} className="text-gray-400" />
        <span>{deal.contact ? `${deal.contact.firstName} ${deal.contact.lastName}` : 'No Contact'}</span>
      </div>

      <div className="text-lg font-bold text-gray-900 mb-3">
        ${deal.value.toLocaleString()}
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase mb-1">
          <span>Win Probability</span>
          <span>{deal.probability}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div 
            className={cn(
              "h-full transition-all duration-500",
              deal.probability && deal.probability > 70 ? "bg-emerald-500" : deal.probability && deal.probability > 40 ? "bg-indigo-500" : "bg-amber-500"
            )}
            style={{ width: `${deal.probability}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-50 rounded text-[10px] font-bold text-gray-500">
          <Calendar size={10} />
          <span>Close: {deal.expectedCloseDate ? format(new Date(deal.expectedCloseDate), 'MMM d, yyyy') : 'TBD'}</span>
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase",
          deal.priority === 'High' || deal.priority === 'Critical' ? "bg-red-50 text-red-600" : 
          deal.priority === 'Medium' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
        )}>
          <div className={cn("w-1 h-1 rounded-full", 
            deal.priority === 'High' || deal.priority === 'Critical' ? "bg-red-600" : 
            deal.priority === 'Medium' ? "bg-amber-600" : "bg-blue-600"
          )} />
          <span>{deal.priority}</span>
        </div>
      </div>

      {isStalling && (
        <div className="mb-4 p-2 bg-red-50 rounded-lg border border-red-100 flex items-start gap-2">
          <AlertCircle size={14} className="text-red-500 mt-0.5" />
          <p className="text-[10px] text-red-700 leading-tight">
            AI: "No activity in 7 days - follow up"
          </p>
        </div>
      )}

      <div className="pt-3 border-t border-gray-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Email" onClick={(e) => e.stopPropagation()}>
            <Mail size={14} />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Call" onClick={(e) => e.stopPropagation()}>
            <Phone size={14} />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Note" onClick={(e) => e.stopPropagation()}>
            <FileText size={14} />
          </button>
        </div>
        <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

