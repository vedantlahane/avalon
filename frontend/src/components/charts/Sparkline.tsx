import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineProps {
  data: number[];
  width?: number | string;
  height?: number | string;
}

export const Sparkline: React.FC<SparklineProps> = ({ data, width = 50, height = 20 }) => {
  const chartData = data.map((value, index) => ({ value, index }));
  const isUp = data[data.length - 1] >= data[0];
  const color = isUp ? '#10b981' : '#ef4444';

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={true}
            animationDuration={800}
          />
          {/* Highlight last point */}
          <Line
             type="monotone"
             dataKey="value"
             stroke="transparent"
             dot={(props: any) => {
               const { cx, cy, index } = props;
               if (index === data.length - 1) {
                 return (
                   <circle
                     key={index}
                     cx={cx}
                     cy={cy}
                     r={2}
                     fill={color}
                     stroke="none"
                   />
                 );
               }
               return null as any;
             }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
