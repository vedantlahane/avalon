import React, { useEffect, useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  ReferenceLine,
  Cell
} from 'recharts';
import { 
  Calendar, 
  Users, 
  Clock, 
  BrainCircuit, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Info,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { dealService } from '../../services/deal.service';
import { cn } from '../../lib/utils';

interface DealForecastProps {
  onDealClick: (id: number) => void;
}

export const DealForecast: React.FC<DealForecastProps> = ({ onDealClick }) => {
  const [timePeriod, setTimePeriod] = useState('this_quarter');
  const [category, setCategory] = useState('stage');
  const [aiConfidence, setAiConfidence] = useState(false);
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dealService.getForecastData(timePeriod, category, aiConfidence).then(data => {
      setForecastData(data);
      setLoading(false);
    });
  }, [timePeriod, category, aiConfidence]);

  if (loading || !forecastData) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[600px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Generating your forecast...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Forecast Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
            {['this_month', 'this_quarter', 'this_year', 'custom'].map((period) => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-md transition-all capitalize",
                  timePeriod === period ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                {period.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-200"></div>

          <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
            {['stage', 'owner', 'month'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-md transition-all capitalize",
                  category === cat ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                By {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">AI Confidence</span>
            <button 
              onClick={() => setAiConfidence(!aiConfidence)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                aiConfidence ? "bg-indigo-600" : "bg-gray-200"
              )}
            >
              <span 
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  aiConfidence ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all",
            aiConfidence ? "bg-indigo-50 border-indigo-100 text-indigo-700" : "bg-gray-50 border-gray-100 text-gray-500"
          )}>
            <BrainCircuit size={14} className={aiConfidence ? "text-indigo-600" : "text-gray-400"} />
            <span>{aiConfidence ? "AI Adjusted ON" : "Raw Numbers"}</span>
          </div>
        </div>
      </div>

      {/* Main Forecast Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table View */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Forecast Table</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <Info size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Count</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Value</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Weighted</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">AI Adjusted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {forecastData.tableData.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          row.category === 'Qualified' && "bg-blue-500",
                          row.category === 'Discovery' && "bg-indigo-500",
                          row.category === 'Proposal' && "bg-violet-500",
                          row.category === 'Negotiation' && "bg-amber-500",
                        )} />
                        <span className="text-sm font-bold text-gray-700">{row.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-600">{row.count}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">${row.value.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-gray-600">${row.weighted.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-indigo-600 group-hover:bg-indigo-50/50 transition-colors">
                      ${row.aiAdjusted.toLocaleString()}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-bold">
                  <td className="px-6 py-4 text-sm text-gray-900 uppercase">Total</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{forecastData.totals.count}</td>
                  <td className="px-6 py-4 text-right text-sm text-gray-900">${forecastData.totals.value.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-sm text-gray-900">${forecastData.totals.weighted.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-sm text-indigo-600">${forecastData.totals.aiAdjusted.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-emerald-600 uppercase">Won (MTD)</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center text-sm font-medium text-gray-600">{forecastData.wonMTD.count}</td>
                  <td className="px-6 py-3 text-right text-sm font-medium text-emerald-600">${forecastData.wonMTD.value.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right text-sm font-medium text-emerald-600">${forecastData.wonMTD.weighted.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right text-sm font-bold text-emerald-600">${forecastData.wonMTD.aiAdjusted.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-xs font-bold text-red-600 uppercase">Lost (MTD)</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center text-sm font-medium text-gray-600">{forecastData.lostMTD.count}</td>
                  <td className="px-6 py-3 text-right text-sm font-medium text-red-600">${forecastData.lostMTD.value.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right text-sm font-medium text-red-600">$0</td>
                  <td className="px-6 py-3 text-right text-sm font-bold text-red-600">$0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <BrainCircuit size={24} />
            </div>
            <h3 className="text-lg font-bold">AI Forecast Insights</h3>
          </div>

          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {forecastData.insights.map((insight: any, i: number) => (
              <div key={i} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all group">
                <div className="flex gap-3">
                  <div className="mt-1">
                    {insight.type === 'trend' && <TrendingUp size={18} className="text-emerald-300" />}
                    {insight.type === 'warning' && <AlertTriangle size={18} className="text-amber-300" />}
                    {insight.type === 'idea' && <Lightbulb size={18} className="text-blue-300" />}
                    {insight.type === 'forecast' && <ArrowUpRight size={18} className="text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                      {insight.text}
                    </p>
                    {insight.type === 'idea' && (
                      <div className="mt-3 flex gap-2">
                        <button className="text-[10px] font-bold bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors uppercase tracking-wider">
                          Review Candidates
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">Confidence Level</div>
              <div className="text-xl font-black">78%</div>
            </div>
            <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 w-[78%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Forecast Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col">
              <h3 className="font-bold text-gray-900">Revenue Forecast</h3>
              <p className="text-xs text-gray-400">Monthly stacked revenue by stage</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span>Actual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-0.5 border-t-2 border-dashed border-gray-400"></div>
                <span>Quota ($500k)</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastData.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#9CA3AF' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#9CA3AF' }}
                  tickFormatter={(val) => `$${val/1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: '#F9FAFB' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 600 }} />
                <Bar dataKey="Qualified" stackId="a" fill="#3B82F6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Discovery" stackId="a" fill="#6366F1" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Proposal" stackId="a" fill="#8B5CF6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Negotiation" stackId="a" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <ReferenceLine y={50000} stroke="#9CA3AF" strokeDasharray="5 5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend & Predictions */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col">
              <h3 className="font-bold text-gray-900">Revenue Trend & Predictions</h3>
              <p className="text-xs text-gray-400">Historical performance vs AI prediction</p>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData.trendData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A5B4FC" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#A5B4FC" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#9CA3AF' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#9CA3AF' }}
                  tickFormatter={(val) => `$${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="low" 
                  stackId="1" 
                  stroke="none" 
                  fill="#E0E7FF" 
                  fillOpacity={0.3} 
                />
                <Area 
                  type="monotone" 
                  dataKey="high" 
                  stackId="1" 
                  stroke="none" 
                  fill="#E0E7FF" 
                  fillOpacity={0.3} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366F1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                  dot={{ r: 4, fill: '#6366F1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#A5B4FC" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  fillOpacity={1} 
                  fill="url(#colorPred)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel Chart (Simplified with Bars) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
              <h3 className="font-bold text-gray-900">Sales Funnel Efficiency</h3>
              <p className="text-xs text-gray-400">Stage conversion rates and drop-offs</p>
            </div>
            <div className="bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 flex items-center gap-2">
              <AlertTriangle size={14} className="text-amber-600" />
              <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                AI Alert: Proposal → Negotiation is 15% below average
              </p>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-4xl flex flex-col gap-2">
              {forecastData.funnelData.map((stage: any, i: number) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-32 text-right">
                    <span className="text-xs font-bold text-gray-500 uppercase">{stage.name}</span>
                  </div>
                  <div className="flex-1 relative h-10">
                    <div 
                      className={cn(
                        "h-full rounded-r-lg transition-all duration-1000 ease-out flex items-center justify-end pr-4",
                        i === 0 && "bg-slate-200",
                        i === 1 && "bg-blue-100",
                        i === 2 && "bg-indigo-100",
                        i === 3 && "bg-violet-100",
                        i === 4 && "bg-amber-100",
                        i === 5 && "bg-emerald-100",
                      )}
                      style={{ width: `${(stage.value / forecastData.funnelData[0].value) * 100}%` }}
                    >
                      <span className="text-xs font-black text-gray-600">{stage.value}</span>
                    </div>
                    {i < forecastData.funnelData.length - 1 && (
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 bg-white border border-gray-100 rounded-full px-2 py-0.5 shadow-sm">
                        <span className="text-[10px] font-black text-indigo-600">{stage.conversion}</span>
                      </div>
                    )}
                  </div>
                  <div className="w-32">
                    <span className="text-[10px] font-bold text-gray-400">
                      {i === 0 ? "100% Volume" : `${Math.round((stage.value / forecastData.funnelData[0].value) * 100)}% Conversion`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
