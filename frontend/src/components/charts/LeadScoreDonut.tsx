import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';

interface LeadScoreData {
  name: string;
  value: number;
  color: string;
  range: string;
  icon: string;
}

interface LeadScoreDonutProps {
  data: LeadScoreData[];
  onSegmentClick?: (segment: string) => void;
}

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export const LeadScoreDonut: React.FC<LeadScoreDonutProps> = ({ data, onSegmentClick }) => {
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const total = data.reduce((acc, item) => acc + item.value, 0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{total}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">CONTACTS</p>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              {...({
                activeIndex,
                activeShape: renderActiveShape,
                data,
                cx: "50%",
                cy: "50%",
                innerRadius: "65%",
                outerRadius: "85%",
                paddingAngle: 5,
                dataKey: "value",
                onMouseEnter: onPieEnter,
                onMouseLeave: onPieLeave,
                onClick: (data: any) => data && data.name && onSegmentClick?.(data.name),
                stroke: "none",
                animationDuration: 800
              } as any)}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} cursor="pointer" />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-800 text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span>{data.icon}</span>
                        <span className="font-semibold">{data.name}</span>
                      </div>
                      <p className="text-slate-400 text-xs mb-1">{data.range}</p>
                      <p className="text-indigo-300 font-bold">
                        {data.value} contacts ({Math.round((data.value / total) * 100)}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer" onClick={() => onSegmentClick?.(item.name)}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                 <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">{item.icon} {item.name}</span>
                 <span className="text-xs font-bold text-slate-900 dark:text-white">{Math.round((item.value / total) * 100)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
