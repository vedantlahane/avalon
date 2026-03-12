import React from 'react';
import { MetricCard } from '../components/common/MetricCard';
import { RevenueLineChart } from '../components/charts/RevenueLineChart';
import { PipelineFunnel } from '../components/charts/PipelineFunnel';
import { LeadScoreDonut } from '../components/charts/LeadScoreDonut';
import { PipelineByStageBar } from '../components/charts/PipelineByStageBar';
import { ActivityStackedArea } from '../components/charts/ActivityStackedArea';
import { PipelineCoverageGauge } from '../components/charts/PipelineCoverageGauge';
import { 
  REVENUE_DATA, 
  FUNNEL_DATA, 
  LEAD_SCORE_DATA, 
  PIPELINE_STAGE_DATA, 
  ACTIVITY_DATA, 
  PIPELINE_COVERAGE 
} from '../data/mockData';
import { useStore } from '../data/store';
import { TrendingUp, Users, Target, Briefcase } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { deals, contacts, companies } = useStore();

  const totalPipelineValue = deals.reduce((acc, deal) => acc + (deal.value || 0), 0);
  const activeDeals = deals.filter(d => d.stage !== 'closed-won' && d.stage !== 'closed-lost').length;
  const winRate = 45; // Mocked for demo

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Sales Overview</h1>
        <p className="text-[var(--text-muted)] text-sm">March 2026 • AI Daily Briefing: 3 high-priority deals need attention today.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          label="Total Pipeline" 
          value={(totalPipelineValue / 1000).toFixed(0) + 'K'} 
          prefix="$"
          change={12.5}
        />
        <MetricCard 
          label="Active Deals" 
          value={activeDeals} 
          change={8}
        />
        <MetricCard 
          label="Win Rate" 
          value={winRate} 
          prefix=""
          change={-2.4}
        />
        <MetricCard 
          label="Total Contacts" 
          value={contacts.length} 
          change={15}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Revenue Over Time</h3>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Actual
              </span>
              <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                <span className="w-2 h-2 rounded-full border border-indigo-500 border-dashed"></span> Predicted
              </span>
            </div>
          </div>
          <div className="h-[300px]">
            <RevenueLineChart data={REVENUE_DATA} />
          </div>
        </div>

        {/* Funnel Chart */}
        <div className="border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">Conversion Funnel</h3>
          <div className="h-[300px]">
            <PipelineFunnel data={FUNNEL_DATA} />
          </div>
          <div className="mt-4 p-3 bg-[var(--accent-glow)] rounded-lg border border-[var(--accent)]/20 flex gap-3">
            <span className="text-xl">🤖</span>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Your weakest point is <strong>Negotiation → Won</strong>. Focus on closing techniques to improve efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Lead Score Distribution */}
        <div className="border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">Lead Score</h3>
          <div className="h-[240px]">
            <LeadScoreDonut data={LEAD_SCORE_DATA} />
          </div>
        </div>

        {/* Pipeline by Stage */}
        <div className="border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">Pipeline by Stage</h3>
          <div className="h-[240px]">
            <PipelineByStageBar data={PIPELINE_STAGE_DATA} />
          </div>
        </div>

        {/* Pipeline Coverage */}
        <div className="border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">Pipeline Coverage</h3>
          <div className="h-[240px]">
            <PipelineCoverageGauge 
              currentValue={PIPELINE_COVERAGE.current} 
              targetValue={PIPELINE_COVERAGE.target} 
            />
          </div>
        </div>
      </div>

      {/* Activity Volume */}
      <div className="border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">Weekly Activity Volume</h3>
        <div className="h-[300px]">
          <ActivityStackedArea data={ACTIVITY_DATA} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
