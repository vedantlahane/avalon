import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface ActivityData {
  name: string;
  emails: number;
  calls: number;
  meetings: number;
  demos: number;
}

interface ActivityStackedAreaProps {
  data: ActivityData[];
}

export const ActivityStackedArea: React.FC<ActivityStackedAreaProps> = ({ data }) => {
  const [activeLayers, setActiveLayers] = useState<string[]>(['emails', 'calls', 'meetings', 'demos']);

  const handleLegendClick = (e: any) => {
    const { dataKey } = e;
    if (activeLayers.includes(dataKey)) {
      setActiveLayers(activeLayers.filter(l => l !== dataKey));
    } else {
      setActiveLayers([...activeLayers, dataKey]);
    }
  };

  const layers = [
    { key: 'emails', color: '#6366f1', name: 'Emails' },
    { key: 'calls', color: '#8b5cf6', name: 'Calls' },
    { key: 'meetings', color: '#ec4899', name: 'Meetings' },
    { key: 'demos', color: '#f59e0b', name: 'Demos' },
  ];

  return (
    <div className="h-full flex flex-col">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const total = payload.reduce((sum, entry) => sum + (entry.value as number), 0);
                return (
                  <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-800 text-sm">
                    <p className="font-semibold mb-2">{label}</p>
                    <div className="space-y-1.5">
                      {payload.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between gap-6">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="text-slate-400">{entry.name}:</span>
                          </div>
                          <span className="font-bold">{entry.value}</span>
                        </div>
                      ))}
                      <div className="pt-1.5 mt-1.5 border-t border-slate-800 flex justify-between gap-6">
                        <span className="text-slate-400 font-medium">Total:</span>
                        <span className="font-bold text-indigo-300">{total}</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend 
            onClick={handleLegendClick}
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value, entry) => {
              const { dataKey } = entry as any;
              const isActive = activeLayers.includes(dataKey);
              return (
                <span className={`text-xs font-medium cursor-pointer transition-opacity ${isActive ? 'opacity-100' : 'opacity-30'}`}>
                  {value}
                </span>
              );
            }}
          />
          
          {layers.map((layer) => (
            <Area
              key={layer.key}
              type="monotone"
              dataKey={layer.key}
              name={layer.name}
              stackId="1"
              stroke={layer.color}
              fill={layer.color}
              fillOpacity={activeLayers.includes(layer.key) ? 0.6 : 0}
              strokeOpacity={activeLayers.includes(layer.key) ? 1 : 0}
              animationDuration={800}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
