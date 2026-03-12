import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ArrowUpDown } from 'lucide-react';

interface StageData {
  name: string;
  value: number;
  count: number;
  color: string;
}

interface PipelineByStageBarProps {
  data: StageData[];
  onBarClick?: (stage: string) => void;
}

export const PipelineByStageBar: React.FC<PipelineByStageBarProps> = ({ data, onBarClick }) => {
  const [sortBy, setSortBy] = useState<'value' | 'count'>('value');
  
  const sortedData = [...data].sort((a, b) => b[sortBy] - a[sortBy]);
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setSortBy(prev => prev === 'value' ? 'count' : 'value')}
          className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowUpDown size={12} />
          Sort by {sortBy}
        </button>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 0, right: 80, left: 0, bottom: 0 }}
            barSize={24}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
              width={100}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-800 text-sm">
                      <p className="font-semibold mb-1">{data.name}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between gap-4">
                          <span className="text-slate-400">Value:</span>
                          <span className="font-bold text-indigo-300">${data.value.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-slate-400">Deals:</span>
                          <span className="font-bold">{data.count}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-slate-400">Share:</span>
                          <span className="font-bold">{Math.round((data.value / totalValue) * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="value"
              radius={[0, 4, 4, 0]}
              onClick={(data) => data && data.name && onBarClick?.(data.name)}
              animationDuration={800}
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} cursor="pointer" />
              ))}
            </Bar>
            {/* Custom Label for values */}
            <Bar
              dataKey="value"
              fill="transparent"
              label={(props: any) => {
                const { x, y, width, value, index } = props;
                const count = sortedData[index].count;
                return (
                  <text
                    x={x + width + 8}
                    y={y + 16}
                    fill="#64748b"
                    fontSize={11}
                    fontWeight={600}
                  >
                    ${value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value} ({count})
                  </text>
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center px-2">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Pipeline</span>
        <span className="text-lg font-bold text-slate-900 dark:text-white">${totalValue.toLocaleString()}</span>
      </div>
    </div>
  );
};
