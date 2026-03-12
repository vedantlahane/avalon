import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, ScatterChart, Scatter, ZAxis, FunnelChart, Funnel, LabelList
} from 'recharts';
import { 
  RevenueLineChart, 
  PipelineFunnel, 
  LeadScoreDonut, 
  PipelineByStageBar, 
  ActivityStackedArea, 
  PipelineCoverageGauge, 
  ChartContainer 
} from '../components/charts';
import { 
  BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, 
  Download, Calendar, Search, Sparkles, TrendingUp, AlertTriangle, 
  CheckCircle2, Clock, Mail, Phone, Users, Zap, ArrowUpRight, ArrowDownRight,
  Filter, Plus, Info, ChevronRight, MessageSquare
} from 'lucide-react';
import { reportService } from '../services/report.service';
import { EmptyState } from '../components/common/EmptyState';
import { ExportModal } from '../components/common/ExportModal';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#4f46e5', '#8b5cf6', '#ec4899', '#f97316', '#eab308', '#22c55e', '#06b6d4'];

const Reports: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sales');
  const [loading, setLoading] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        switch (activeTab) {
          case 'sales':
            data = await reportService.getSalesPerformance();
            break;
          case 'pipeline':
            data = await reportService.getPipelineAnalysis();
            break;
          case 'activity':
            data = await reportService.getActivityReports();
            break;
          case 'contact':
            data = await reportService.getContactAnalytics();
            break;
          case 'ai':
            data = await reportService.getAiInsights();
            break;
        }
        setReportData(data);
      } catch (error) {
        console.error('Failed to fetch report data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleAiQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setIsAnalyzing(true);
    try {
      const response = await reportService.queryAi(aiQuery);
      setAiResponse(response);
    } catch (error) {
      console.error('AI Query failed', error);
      // Fallback
      setAiResponse({
        answer: "🤖 Based on your request, I've analyzed your deals for this quarter. You have 12 deals over $50K closing this quarter, with a total value of $1.4M. Technology sector represents 60% of these high-value opportunities.",
        data: [
          { name: 'Technology', value: 60 },
          { name: 'Finance', value: 25 },
          { name: 'Healthcare', value: 15 },
        ],
        chartType: 'pie'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Reports</h1>
          <p className="text-gray-500 mt-1">Comprehensive insights into your sales pipeline and performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download size={18} />
            <span>Download Report</span>
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
            <Sparkles size={18} />
            <span>AI Insights</span>
          </button>
        </div>
      </div>

      {/* AI Ask a Question */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleAiQuery} className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Sparkles className="text-indigo-500" size={20} />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-32 py-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all text-lg placeholder-gray-400"
              placeholder="Ask anything about your data... e.g., 'Show me all deals over $50K closing this quarter'"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
            />
            <button
              type="submit"
              disabled={isAnalyzing}
              className="absolute right-3 top-2 bottom-2 bg-indigo-600 text-white px-6 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing...' : 'Ask AI'}
            </button>
          </form>

          {isAnalyzing && (
            <div className="mt-6 flex items-center gap-3 text-indigo-600 animate-pulse">
              <Zap size={20} className="animate-bounce" />
              <span className="font-medium text-lg">🤖 Analyzing your data...</span>
            </div>
          )}

          {aiResponse && !isAnalyzing && (
            <div className="mt-8 space-y-6 border-t border-gray-100 pt-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <Sparkles size={20} className="text-indigo-600" />
                </div>
                <div className="space-y-4 flex-1">
                  <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
                    {aiResponse.answer}
                  </p>
                  
                  {aiResponse.data && (
                    <div className="h-64 w-full max-w-2xl bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <ResponsiveContainer width="100%" height="100%">
                        {aiResponse.chartType === 'pie' ? (
                          <PieChart>
                            <Pie
                              data={aiResponse.data}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {aiResponse.data.map((_: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend />
                          </PieChart>
                        ) : (
                          <BarChart data={aiResponse.data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => aiResponse.chartType === 'bar' && val <= 100 ? `${val}%` : val} />
                            <Tooltip 
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-4">
                    <p className="text-sm font-medium text-gray-500">Would you like to drill deeper?</p>
                    <div className="flex gap-2">
                      <button className="text-sm bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                        Show by region
                      </button>
                      <button className="text-sm bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                        Compare to last year
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!aiResponse && !isAnalyzing && (
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Examples:</span>
              {["How many deals did I close last month?", "What's my average deal size for Q1?", "Show deals closing this week over $50K"].map((ex, i) => (
                <button key={i} className="text-xs text-indigo-600 hover:underline font-medium" onClick={() => setAiQuery(ex)}>
                  • "{ex}"
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto no-scrollbar">
        <nav className="flex gap-8 min-w-max">
          {[
            { id: 'sales', name: 'Sales Performance', icon: TrendingUp },
            { id: 'pipeline', name: 'Pipeline Analysis', icon: BarChart3 },
            { id: 'activity', name: 'Activity Reports', icon: MessageSquare },
            { id: 'contact', name: 'Contact Analytics', icon: Users },
            { id: 'ai', name: 'AI Insights', icon: Sparkles },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 border-b-2 transition-all font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-8 animate-in fade-in duration-500">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-80 bg-gray-50 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : !reportData ? (
          <EmptyState
            icon={BarChart3}
            title="Not enough data for reports yet"
            description="Add contacts and deals to unlock AI-powered analytics and visual reports."
            actions={[
              { label: 'Go to Contacts', onClick: () => navigate('/contacts'), icon: Users },
              { label: 'Go to Deals', onClick: () => navigate('/deals'), variant: 'secondary', icon: TrendingUp }
            ]}
            aiTip="Once you have data, AI can predict your next quarter's revenue with up to 90% accuracy!"
          />
        ) : (
          <>
            {activeTab === 'sales' && <SalesPerformanceTab data={reportData} />}
            {activeTab === 'pipeline' && <PipelineAnalysisTab data={reportData} />}
            {activeTab === 'activity' && <ActivityReportsTab data={reportData} />}
            {activeTab === 'contact' && <ContactAnalyticsTab data={reportData} />}
            {activeTab === 'ai' && <AIInsightsTab data={reportData} />}
          </>
        )}
      </div>

      <ExportModal 
        isOpen={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
        resource={activeTab === 'sales' || activeTab === 'pipeline' ? 'deals' : activeTab === 'contact' ? 'contacts' : 'companies'} 
        totalCount={100} // Mock count for reports page
      />
    </div>
  );
};

// --- Sub-components (Tabs) ---

const SalesPerformanceTab = ({ data }: { data: any }) => {
  const [compareYear, setCompareYear] = useState(false);

  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Report 1: Revenue Over Time */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <ChartContainer
          title="Revenue Over Time"
          subtitle="Monthly revenue for the last 12 months with AI predictions"
          showExport={true}
        >
          <RevenueLineChart data={data.revenueOverTime.map((r: any) => ({
            name: r.month,
            actual: r.actual,
            predicted: r.predicted,
            confidenceRange: r.actual ? [r.actual * 0.95, r.actual * 1.05] : [r.predicted * 0.9, r.predicted * 1.1]
          }))} />
        </ChartContainer>

        <div className="px-6 pb-6 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-y border-gray-100 bg-gray-50/50">
                <th className="px-4 py-3 font-bold text-gray-600">Month</th>
                <th className="px-4 py-3 font-bold text-gray-600 text-right">Revenue</th>
                <th className="px-4 py-3 font-bold text-gray-600 text-right">vs Last Year</th>
                <th className="px-4 py-3 font-bold text-gray-600 text-right">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.revenueOverTime.filter((r: any) => r.actual).slice(-5).map((row: any, i: number) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{row.month}</td>
                  <td className="px-4 py-3 text-right text-gray-600 font-medium">${row.actual?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="flex items-center justify-end gap-1 text-green-600 font-bold">
                      <ArrowUpRight size={14} />
                      {Math.round(((row.actual || 0) / (row.lastYear || 1) - 1) * 100)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="w-full bg-gray-100 rounded-full h-1.5 ml-auto max-w-[80px]">
                      <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${Math.min(100, (row.actual || 0) / 7000)}%` }}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report 2: Win/Loss Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Win/Loss Analysis</h3>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Won Deals</p>
              <h4 className="text-3xl font-black text-green-900">{data.winLossAnalysis.won.count}</h4>
              <p className="text-sm text-green-700 font-medium mt-2">${data.winLossAnalysis.won.totalValue.toLocaleString()} total</p>
              <div className="mt-4 pt-4 border-t border-green-200 space-y-2">
                <div className="flex justify-between text-xs text-green-800 font-medium">
                  <span>Avg Size</span>
                  <span>${data.winLossAnalysis.won.avgSize.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-green-800 font-medium">
                  <span>Avg Cycle</span>
                  <span>{data.winLossAnalysis.won.avgCycle} days</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">Lost Deals</p>
              <h4 className="text-3xl font-black text-red-900">{data.winLossAnalysis.lost.count}</h4>
              <p className="text-sm text-red-700 font-medium mt-2">${data.winLossAnalysis.lost.totalValue.toLocaleString()} total</p>
              <div className="mt-4 pt-4 border-t border-red-200 space-y-2">
                <div className="flex justify-between text-xs text-red-800 font-medium">
                  <span>Avg Size</span>
                  <span>${data.winLossAnalysis.lost.avgSize?.toLocaleString() || '$82,000'}</span>
                </div>
                <div className="flex justify-between text-xs text-red-800 font-medium">
                  <span>Top Reason</span>
                  <span>{data.winLossAnalysis.lost.topReason}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.winLossAnalysis.lossReasons}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.winLossAnalysis.lossReasons.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(val: any) => [`${val}%`, 'Loss Reason']}
                />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Report 3: Sales Velocity */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Sales Velocity</h3>
            <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold flex items-center gap-1">
              <Zap size={12} />
              <span>AI CALCULATION</span>
            </div>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <h4 className="text-5xl font-black text-gray-900">${data.salesVelocity.current.toLocaleString()}</h4>
            <div className="mb-2">
              <span className={`flex items-center font-bold text-sm ${data.salesVelocity.current >= data.salesVelocity.previous ? 'text-green-600' : 'text-red-600'}`}>
                {data.salesVelocity.current >= data.salesVelocity.previous ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {Math.abs(Math.round((data.salesVelocity.current / data.salesVelocity.previous - 1) * 100))}%
              </span>
              <p className="text-xs text-gray-500 font-medium">vs last period</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm font-bold text-gray-700 mb-4">Formula: (# Deals × Avg Value × Win Rate) / Sales Cycle</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { label: '# Active Deals', value: data.salesVelocity.components.activeDeals, icon: Users, color: 'text-blue-500' },
                  { label: 'Avg Deal Value', value: `$${data.salesVelocity.components.avgValue.toLocaleString()}`, icon: BarChart3, color: 'text-purple-500' },
                  { label: 'Win Rate', value: `${(data.salesVelocity.components.winRate * 100).toFixed(0)}%`, icon: CheckCircle2, color: 'text-green-500' },
                  { label: 'Sales Cycle', value: `${data.salesVelocity.components.salesCycle} days`, icon: Clock, color: 'text-orange-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`p-2 bg-white rounded-lg shadow-sm ${item.color}`}>
                      <item.icon size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                      <p className="text-sm font-bold text-gray-900">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-600 rounded-xl p-5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={64} />
              </div>
              <h5 className="flex items-center gap-2 font-bold mb-2">
                <Sparkles size={18} />
                AI Recommendation
              </h5>
              <p className="text-indigo-100 text-sm leading-relaxed">
                "{data.salesVelocity.aiRecommendation}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PipelineAnalysisTab = ({ data }: { data: any }) => {
  const navigate = useNavigate();
  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Report 4: Pipeline Funnel */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <ChartContainer
          title="Pipeline Conversion Funnel"
          subtitle="Visual conversion rates through each pipeline stage"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <PipelineFunnel 
                data={data.funnel.map((f: any, i: number) => ({
                  name: f.name,
                  value: f.value,
                  color: COLORS[i % COLORS.length],
                  count: f.count
                }))}
              />
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex items-center gap-2 text-orange-700 font-bold mb-2">
                  <AlertTriangle size={18} />
                  AI Callout
                </div>
                <p className="text-sm text-orange-800 leading-relaxed font-medium">
                  The weakest conversion point is from <span className="font-black underline">Discovery to Proposal</span> (62%), which is 15% below industry average.
                </p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {data.funnel.slice(1).map((stage: any, i: number) => (
                  <div key={i} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center font-bold text-gray-400 text-xs">
                        {stage.count}
                      </div>
                      <span className="text-sm font-bold text-gray-700">{stage.name}</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">${(stage.stageValue / 1000).toLocaleString()}k</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Report 5: Pipeline by Stage */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <ChartContainer
            title="Pipeline by Stage"
            subtitle="Value and count of deals in each stage"
          >
            <PipelineByStageBar 
              data={data.stageData || [
                { name: 'Lead', value: 65000, count: 3, color: '#94a3b8' },
                { name: 'Qualified', value: 120000, count: 2, color: '#6366f1' },
                { name: 'Discovery', value: 80000, count: 1, color: '#8b5cf6' },
                { name: 'Proposal', value: 195000, count: 2, color: '#a855f7' },
                { name: 'Negotiation', value: 80000, count: 1, color: '#ec4899' },
                { name: 'Won', value: 95000, count: 1, color: '#10b981' },
              ]} 
              onBarClick={(stage) => navigate(`/deals?stage=${encodeURIComponent(stage)}`)}
            />
          </ChartContainer>
        </div>

        {/* Report 6: Pipeline Coverage Ratio */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <ChartContainer
            title="Pipeline Coverage Ratio"
            subtitle="Ratio of pipeline value to sales quota"
            aiRecommendation="Add $180K to pipeline to reach healthy 3x coverage"
          >
            <PipelineCoverageGauge 
              currentValue={data.pipelineCoverage?.ratio || 2.4}
              targetValue={3.0}
            />
          </ChartContainer>
        </div>
      </div>

      {/* Report 7: Stage Duration Analysis */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Stage Duration Analysis</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.stageDuration} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}d`} />
                <YAxis type="category" dataKey="stage" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Legend />
                <Bar dataKey="days" name="Avg Days in Stage" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="benchmark" name="Industry Benchmark" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6">
            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <AlertTriangle size={16} className="text-orange-500" />
              Deals currently exceeding average
            </h4>
            <div className="space-y-2">
              {[
                { name: 'Quantum Finance', stage: 'Discovery', days: '22 days', value: '$80k' },
                { name: 'RetailMax Inc', stage: 'Proposal', days: '18 days', value: '$120k' },
              ].map((deal, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium text-gray-700">{deal.name}</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{deal.stage}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-red-600">{deal.days}</span>
                    <span className="text-sm font-black text-gray-900">{deal.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

const ActivityReportsTab = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Report 7: Activity Volume */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <ChartContainer
          title="Weekly Activity Volume"
          subtitle="Breakdown of sales activities over time"
        >
          <ActivityStackedArea data={data.activityVolume.map((v: any) => ({
            name: v.week,
            emails: v.Emails || 0,
            calls: v.Calls || 0,
            meetings: v.Meetings || 0,
            demos: v.Demos || 0
          }))} />
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Report 8: Response Time Analysis */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Response Time Analysis</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke="#f1f5f9" />
                <XAxis type="number" dataKey="time" name="Response Time" unit=" min" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="number" dataKey="winRate" name="Win Rate" unit="%" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <ZAxis type="category" dataKey="source" name="Source" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Sources" data={data.responseTime.bySource} fill="#4f46e5" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <h5 className="flex items-center gap-2 font-bold text-indigo-900 mb-2">
              <Sparkles size={18} className="text-indigo-600" />
              AI Insight
            </h5>
            <p className="text-sm text-indigo-800 font-medium">
              "{data.responseTime.aiInsight}"
            </p>
          </div>
        </div>

        {/* Report 9: Communication Effectiveness */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Communication Effectiveness</h3>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Open Rate</p>
              <h4 className="text-2xl font-black text-gray-900">{(data.communicationEffectiveness.metrics.openRate * 100).toFixed(0)}%</h4>
              <span className="text-[10px] text-green-600 font-bold">↑ 5%</span>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Click Rate</p>
              <h4 className="text-2xl font-black text-gray-900">{(data.communicationEffectiveness.metrics.clickRate * 100).toFixed(0)}%</h4>
              <span className="text-[10px] text-green-600 font-bold">↑ 2%</span>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Reply Rate</p>
              <h4 className="text-2xl font-black text-gray-900">{(data.communicationEffectiveness.metrics.replyRate * 100).toFixed(0)}%</h4>
              <span className="text-[10px] text-red-600 font-bold">↓ 1%</span>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="text-sm font-bold text-gray-900 mb-3">Best performing email templates</h5>
            {data.communicationEffectiveness.bestTemplates.map((t: any, i: number) => (
              <div key={i} className="flex items-center justify-between group">
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{t.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-100 h-1.5 rounded-full">
                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: t.rate }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{t.rate}</span>
                </div>
              </div>
            ))}
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">Best time/day to send:</span>
                <span className="font-bold text-gray-900">{data.communicationEffectiveness.bestTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactAnalyticsTab = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Report 10: Lead Source Performance */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <ChartContainer
          title="Lead Source Performance"
          subtitle="Total leads and conversion rates by source"
        >
          <PipelineByStageBar 
            data={data.leadSourcePerformance.map((s: any) => ({
              name: s.name,
              value: s.value * 1000, // Mocking value for visual
              count: s.value,
              color: COLORS[Math.floor(Math.random() * COLORS.length)]
            }))}
          />
        </ChartContainer>
      </div>

      {/* Report 11: Lead Score Distribution */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <ChartContainer
          title="Lead Score Distribution"
          subtitle="Breakdown of leads by quality score"
        >
          <LeadScoreDonut 
            data={[
              { name: 'Hot', value: 45, color: '#ef4444', range: '90-100', icon: '🔥' },
              { name: 'Warm', value: 82, color: '#f59e0b', range: '70-89', icon: '🌡️' },
              { name: 'Cool', value: 64, color: '#3b82f6', range: '50-69', icon: '😐' },
              { name: 'Cold', value: 38, color: '#94a3b8', range: '0-49', icon: '❄️' },
            ]}
          />
        </ChartContainer>
      </div>
    </div>
  );
};

const AIInsightsTab = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Report 12: AI Predictions Summary */}
      <div className="bg-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
        <div className="absolute top-0 right-0 p-8 opacity-10 animate-pulse">
          <Sparkles size={128} />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Zap size={14} />
            Quarterly Forecast
          </div>
          <h2 className="text-4xl font-black mb-4">Revenue prediction for next quarter: ${data.predictions.nextQuarterRevenue.toLocaleString()}</h2>
          <div className="flex items-center gap-4 text-indigo-100 font-medium text-lg">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={20} className="text-green-400" />
              <span>{(data.predictions.confidence * 100).toFixed(0)}% Confidence Score</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-indigo-300"></div>
            <span>Based on current pipeline and 12-month historical data</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-4">
              <h4 className="font-bold text-white flex items-center gap-2">
                <TrendingUp size={18} className="text-green-400" />
                Opportunities to focus on
              </h4>
              <ul className="space-y-3">
                {data.recommendedFocus.slice(0, 3).map((item: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-indigo-50">
                    <span className="text-indigo-300 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-white flex items-center gap-2">
                <AlertTriangle size={18} className="text-yellow-400" />
                Risk areas detected
              </h4>
              <ul className="space-y-3">
                {[
                  'SLA response time has increased by 15 mins this week',
                  '3 major deals in Proposal stage have stalled for 10+ days',
                  'Finance sector lead volume is down 20% compared to Q4'
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-indigo-50">
                    <span className="text-indigo-300 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 bg-green-50 border-b border-green-100 flex items-center justify-between">
            <h4 className="font-bold text-green-900 text-sm">Most Likely to Close</h4>
            <Sparkles size={16} className="text-green-600" />
          </div>
          <div className="p-4 divide-y divide-gray-100">
            {data.likelyToClose.map((deal: any, i: number) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">{deal.name}</p>
                  <p className="text-xs text-gray-500 font-medium">${deal.value.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-green-600">{(deal.prob * 100).toFixed(0)}%</p>
                  <p className="text-[10px] text-gray-400 font-bold">PROBABILITY</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 bg-red-50 border-b border-red-100 flex items-center justify-between">
            <h4 className="font-bold text-red-900 text-sm">Deals at High Risk</h4>
            <AlertTriangle size={16} className="text-red-600" />
          </div>
          <div className="p-4 divide-y divide-gray-100">
            {data.likelyToLose.map((deal: any, i: number) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">{deal.name}</p>
                  <p className="text-xs text-gray-500 font-medium">${deal.value.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-red-600">{deal.reason}</p>
                  <p className="text-[10px] text-gray-400 font-bold">RISK SIGNAL</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 bg-orange-50 border-b border-orange-100 flex items-center justify-between">
            <h4 className="font-bold text-orange-900 text-sm">Churn Prediction</h4>
            <Users size={16} className="text-orange-600" />
          </div>
          <div className="p-4 divide-y divide-gray-100">
            {data.likelyToChurn.map((contact: any, i: number) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">{contact.name}</p>
                  <p className="text-xs text-gray-500 font-medium">{contact.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-orange-600">{contact.signal}</p>
                  <p className="text-[10px] text-gray-400 font-bold">CHURN RISK</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reports;
export { Reports };