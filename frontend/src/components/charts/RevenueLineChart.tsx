import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
  ReferenceLine,
} from 'recharts';

interface RevenueLineChartProps {
  data: any[];
  targetValue?: number;
  onPointClick?: (point: any) => void;
}

export const RevenueLineChart: React.FC<RevenueLineChartProps> = ({ 
  data, 
  targetValue = 180000,
  onPointClick
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart 
        data={data} 
        margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        onClick={(state: any) => {
          if (state && state.activePayload && state.activePayload.length) {
            onPointClick?.(state.activePayload[0].payload);
          }
        }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          tickFormatter={(value) => `$${value / 1000}K`}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const actual = payload.find(p => p.dataKey === 'actual')?.value as number | undefined;
              const predicted = payload.find(p => p.dataKey === 'predicted')?.value as number | undefined;
              const value = actual ?? predicted;
              const prevValue = payload[0].payload.prevValue as number | undefined;
              
              if (value === undefined) return null;
              
              const diff = prevValue ? Math.round(((value - prevValue) / prevValue) * 100) : 0;

              return (
                <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-800 text-sm">
                  <p className="font-semibold mb-1">{label} 2026</p>
                  <p className="text-indigo-300 font-bold">
                    ${value?.toLocaleString()}
                    {diff !== 0 && (
                      <span className={diff > 0 ? "text-emerald-400 ml-2" : "text-rose-400 ml-2"}>
                        ({diff > 0 ? '↑' : '↓'}{Math.abs(diff)}% vs prev)
                      </span>
                    )}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />

        {/* Confidence Band */}
        <Area
          type="monotone"
          dataKey="confidenceRange"
          stroke="none"
          fill="#6366f1"
          fillOpacity={0.1}
          connectNulls
          animationDuration={800}
        />

        {/* Main Revenue Area */}
        <Area
          type="monotone"
          dataKey="actual"
          stroke="none"
          fill="url(#colorRevenue)"
          animationDuration={800}
          connectNulls
        />

        {/* Target Line */}
        <ReferenceLine
          y={targetValue}
          stroke="#94a3b8"
          strokeDasharray="5 5"
          label={{ position: 'right', value: 'Target', fill: '#94a3b8', fontSize: 10 }}
        />

        {/* Actual Revenue Line */}
        <Line
          type="monotone"
          dataKey="actual"
          stroke="#6366f1"
          strokeWidth={3}
          dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
          activeDot={{ r: 6, strokeWidth: 0, cursor: 'pointer' }}
          animationDuration={800}
          connectNulls
        />

        {/* Predicted Revenue Line */}
        <Line
          type="monotone"
          dataKey="predicted"
          stroke="#6366f1"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          animationDuration={800}
          connectNulls
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
