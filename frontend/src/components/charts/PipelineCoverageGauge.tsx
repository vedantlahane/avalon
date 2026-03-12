import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface PipelineCoverageGaugeProps {
  currentValue: number;
  targetValue: number;
  min?: number;
  max?: number;
}

export const PipelineCoverageGauge: React.FC<PipelineCoverageGaugeProps> = ({
  currentValue,
  targetValue,
  min = 0,
  max = 5,
}) => {
  // Semi-circle logic
  const data = [
    { value: 2 }, // Red zone (<2x)
    { value: 1 }, // Yellow zone (2-3x)
    { value: 2 }, // Green zone (>3x)
  ];
  
  const COLORS = ['#ef4444', '#f59e0b', '#10b981'];

  // Needle calculation
  const needleValue = Math.min(Math.max(currentValue, min), max);
  const percentage = (needleValue - min) / (max - min);
  const angle = 180 - percentage * 180;

  return (
    <div className="h-full flex flex-col items-center justify-center pt-4">
      <div className="w-full h-[200px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="85%"
              startAngle={180}
              endAngle={0}
              innerRadius="65%"
              outerRadius="95%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} opacity={0.8} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Needle */}
        <div 
          className="absolute left-1/2 bottom-[15%] w-1 h-24 bg-slate-800 dark:bg-slate-200 origin-bottom rounded-full z-10"
          style={{ 
            transform: `translateX(-50%) rotate(${angle - 90}deg)`,
            transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        />
        <div className="absolute left-1/2 bottom-[15%] w-4 h-4 bg-slate-800 dark:bg-slate-200 rounded-full -translate-x-1/2 translate-y-1/2 z-20 border-2 border-white dark:border-slate-900" />
        
        {/* Value Display */}
        <div className="absolute left-1/2 bottom-[25%] -translate-x-1/2 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-black text-slate-900 dark:text-white"
          >
            {currentValue}x
          </motion.p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Coverage</p>
        </div>
      </div>

      <div className="w-full flex justify-between px-8 -mt-4 mb-4">
        <div className="text-center">
          <div className="flex items-center gap-1.5 mb-1 justify-center">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[10px] font-bold text-slate-500">NEEDS ATTN</span>
          </div>
          <p className="text-xs font-medium text-slate-400">&lt;2x</p>
        </div>
        <div className="text-center">
          <div className="flex items-center gap-1.5 mb-1 justify-center">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-[10px] font-bold text-slate-500">ADEQUATE</span>
          </div>
          <p className="text-xs font-medium text-slate-400">2-3x</p>
        </div>
        <div className="text-center">
          <div className="flex items-center gap-1.5 mb-1 justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-slate-500">HEALTHY</span>
          </div>
          <p className="text-xs font-medium text-slate-400">&gt;3x</p>
        </div>
      </div>

      <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
           <span className="text-slate-500">Target:</span>
           <span className="font-bold text-slate-900 dark:text-white">{targetValue}x</span>
        </div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
           <span>GAP:</span>
           <span className="font-bold">{(targetValue - currentValue).toFixed(1)}x</span>
        </div>
      </div>
    </div>
  );
};
