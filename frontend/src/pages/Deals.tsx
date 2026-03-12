import React, { useState } from 'react';
import { useStore } from '../data/store';
import { DealListView } from '../components/deals/DealListView';
import { PipelineFunnel } from '../components/charts/PipelineFunnel';
import { PipelineByStageBar } from '../components/charts/PipelineByStageBar';
import { FUNNEL_DATA, PIPELINE_STAGE_DATA } from '../data/mockData';
import { Button } from '../components/common/FormControls';
import { LayoutList, BarChart2, Plus, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Deals: React.FC = () => {
  const { deals, setDeals } = useStore();
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'forecast'>('list');

  const handleUpdateDeal = async (id: string, data: any) => {
    setDeals(prev => prev.map(d => d.id === id ? { ...d, ...data } : d));
  };

  const handleDeleteDeals = async (ids: string[]) => {
    setDeals(prev => prev.filter(d => !ids.includes(d.id)));
  };

  const handleBulkUpdateDeals = async (ids: string[], data: any) => {
    setDeals(prev => prev.map(d => ids.includes(d.id) ? { ...d, ...data } : d));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Deals Pipeline</h1>
          <p className="text-[var(--text-muted)] text-sm">Track your sales opportunities and forecast revenue.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-[var(--bg-surface)] border border-[var(--border-color)] p-1 rounded-lg mr-2">
            <button 
              onClick={() => setView('list')}
              className={`p-1.5 rounded-md transition-all ${view === 'list' ? 'bg-[var(--accent-glow)] text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
            >
              <LayoutList size={18} />
            </button>
            <button 
              onClick={() => setView('forecast')}
              className={`p-1.5 rounded-md transition-all ${view === 'forecast' ? 'bg-[var(--accent-glow)] text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
            >
              <BarChart2 size={18} />
            </button>
          </div>
          <Button variant="primary" size="sm">
            <Plus size={14} className="mr-2" /> New Deal
          </Button>
        </div>
      </div>

      {view === 'list' ? (
        <DealListView 
          deals={deals} 
          onDealClick={(id) => navigate(`/deals/${id}`)}
          onUpdateDeal={handleUpdateDeal}
          onDeleteDeals={handleDeleteDeals}
          onBulkUpdateDeals={handleBulkUpdateDeals}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">Pipeline Funnel</h3>
            <div className="h-[400px]">
              <PipelineFunnel data={FUNNEL_DATA} />
            </div>
          </div>
          <div className="border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">Pipeline by Stage</h3>
            <div className="h-[400px]">
              <PipelineByStageBar data={PIPELINE_STAGE_DATA} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deals;
