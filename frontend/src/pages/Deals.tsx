import React, { useEffect, useState } from 'react';
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
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { dealService } from '../services/deal.service';
import { Deal, DealStage } from '../types';
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Filter, 
  ArrowRight,
  TrendingUp,
  Clock,
  Building2
} from 'lucide-react';
import { cn } from '../lib/utils';

const STAGES: { id: DealStage; label: string; color: string }[] = [
  { id: 'discovery', label: 'Discovery', color: 'bg-blue-500' },
  { id: 'qualification', label: 'Qualification', color: 'bg-indigo-500' },
  { id: 'proposal', label: 'Proposal', color: 'bg-violet-500' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-amber-500' },
  { id: 'closed-won', label: 'Closed Won', color: 'bg-emerald-500' },
];

export const Deals: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    dealService.getDeals().then(setDeals);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeDeal = deals.find(d => d.id === activeId);
    if (!activeDeal) return;

    // If dragging over a column
    if (STAGES.some(s => s.id === overId)) {
      if (activeDeal.stage !== overId) {
        setDeals(prev => prev.map(d => 
          d.id === activeId ? { ...d, stage: overId as DealStage } : d
        ));
      }
      return;
    }

    // If dragging over another item
    const overDeal = deals.find(d => d.id === overId);
    if (overDeal && activeDeal.stage !== overDeal.stage) {
      setDeals(prev => prev.map(d => 
        d.id === activeId ? { ...d, stage: overDeal.stage } : d
      ));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      // In a real app, we'd persist the new stage/order here
      const activeDeal = deals.find(d => d.id === active.id);
      if (activeDeal) {
        dealService.updateDealStage(activeDeal.id, activeDeal.stage);
      }
    }
    setActiveId(null);
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Deal Pipeline</h1>
          <p className="text-gray-500 mt-1">Manage your active opportunities and track revenue goals.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
            <button className="px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-900 rounded-md">Board</button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-md">List</button>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
            <Plus size={18} />
            <span>Add Deal</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white border border-gray-200 p-3 rounded-xl shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search deals..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-lg py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
          />
        </div>
        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg border border-transparent hover:border-gray-200">
          <Filter size={16} />
          <span>Filters</span>
        </button>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
          <div className="flex items-center gap-1.5">
            <TrendingUp size={16} className="text-emerald-500" />
            <span className="text-gray-900">$245,000</span> Weighted
          </div>
          <div className="w-[1px] h-4 bg-gray-200"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-900">$840,000</span> Total
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 -mx-6 px-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-full min-w-max">
            {STAGES.map(stage => (
              <Column 
                key={stage.id} 
                stage={stage} 
                deals={deals.filter(d => d.stage === stage.id)} 
              />
            ))}
          </div>

          <DragOverlay>
            {activeId ? (
              <DealCard deal={deals.find(d => d.id === activeId)!} isOverlay />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

const Column = ({ stage, deals }: { stage: typeof STAGES[0], deals: Deal[] }) => {
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex flex-col w-72 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", stage.color)}></div>
          <h3 className="font-bold text-sm text-gray-900">{stage.label}</h3>
          <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {deals.length}
          </span>
        </div>
        <div className="text-xs font-bold text-gray-400 tracking-tight font-mono">
          ${totalValue.toLocaleString()}
        </div>
      </div>

      <SortableContext
        id={stage.id}
        items={deals.map(d => d.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 bg-gray-50/50 border border-gray-100/50 rounded-2xl p-2 space-y-3 min-h-[500px]">
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
          <button className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl border border-dashed border-gray-200 transition-all">
            <Plus size={14} />
            <span>Add Opportunity</span>
          </button>
        </div>
      </SortableContext>
    </div>
  );
};

const DealCard = ({ deal, isOverlay }: { deal: Deal, isOverlay?: boolean }) => {
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

  if (isDragging) {
    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        className="w-full h-[140px] bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-xl"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group relative cursor-grab active:cursor-grabbing",
        isOverlay && "shadow-2xl border-indigo-500 scale-105"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
          {deal.title}
        </h4>
        <button className="text-gray-400 hover:text-gray-600 p-0.5">
          <MoreHorizontal size={14} />
        </button>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Building2 size={12} />
        <span className="truncate">Acme Corp</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-gray-900 font-mono tracking-tight">
          ${deal.value.toLocaleString()}
        </div>
        <div className="flex -space-x-1.5">
          <div className="w-6 h-6 rounded-full border-2 border-white bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
            AR
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
          <TrendingUp size={10} />
          <span>High Intent</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <Clock size={10} />
          <span>2d</span>
        </div>
      </div>
    </div>
  );
};
