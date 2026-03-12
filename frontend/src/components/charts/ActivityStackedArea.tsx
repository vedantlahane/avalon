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
          <defs>
            <pattern id="patternEmails" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="2" height="4" fill="#6366f1" fillOpacity="0.2" />
            </pattern>
            <pattern id="patternCalls" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#8b5cf6" fillOpacity="0.2" />
            </pattern>
            <pattern id="patternMeetings" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">
              <rect width="1" height="4" fill="#ec4899" fillOpacity="0.2" />
            </pattern>
            <pattern id="patternDemos" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <path d="M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9" stroke="#f59e0b" strokeWidth="1" opacity="0.2" />
            </pattern>
          </defs>
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
                    <p className="font-semibold mb-2 text-indigo-300">{label}</p>
                    <div className="space-y-1.5">
                      {payload.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between gap-8">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: entry.color }} />
                            <span className="text-slate-400 font-medium">{entry.name}:</span>
                          </div>
                          <span className="font-black">{entry.value}</span>
                        </div>
                      ))}
                      <div className="pt-2 mt-2 border-t border-slate-800 flex justify-between gap-8">
                        <span className="text-slate-200 font-bold">Total Activity:</span>
                        <span className="font-black text-indigo-400">{total}</span>
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
            wrapperStyle={{ paddingTop: '24px' }}
            formatter={(value, entry) => {
              const { dataKey } = entry as any;
              const isActive = activeLayers.includes(dataKey);
              return (
                <span className={`text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all ${isActive ? 'opacity-100 text-slate-700 dark:text-slate-300' : 'opacity-20 text-slate-400'}`}>
                  {value}
                </span>
              );
            }}
          />
          
          {layers.map((layer, idx) => (
            <Area
              key={layer.key}
              type="monotone"
              dataKey={layer.key}
              name={layer.name}
              stackId="1"
              stroke={layer.color}
              strokeWidth={2}
              fill={activeLayers.includes(layer.key) ? `url(#pattern${layer.name})` : 'transparent'}
              fillOpacity={1}
              strokeOpacity={activeLayers.includes(layer.key) ? 1 : 0}
              animationDuration={1000}
              animationBegin={idx * 100}
            />
          ))}
          {/* Overlay solid areas with low opacity for better background */}
          {layers.map((layer) => (
            <Area
              key={`${layer.key}-solid`}
              type="monotone"
              dataKey={layer.key}
              stackId="1"
              stroke="none"
              fill={layer.color}
              fillOpacity={activeLayers.includes(layer.key) ? 0.2 : 0}
              animationDuration={1000}
              legendType="none"
              tooltipType="none"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
