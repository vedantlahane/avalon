import React from 'react';
import { motion } from 'framer-motion';

interface FunnelStage {
  name: string;
  value: number;
  color: string;
  count: number;
}

interface PipelineFunnelProps {
  data: FunnelStage[];
  onStageClick?: (stage: string) => void;
}

export const PipelineFunnel: React.FC<PipelineFunnelProps> = ({ data, onStageClick }) => {
  const maxValue = data[0]?.value || 1;
  const totalConversion = data.length > 0 ? ((data[data.length - 1].value / data[0].value) * 100).toFixed(1) : 0;

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="space-y-2 relative">
        {data.map((stage, index) => {
          const widthPercent = (stage.value / maxValue) * 100;
          const prevStage = data[index - 1];
          const conversion = prevStage ? ((stage.value / prevStage.value) * 100).toFixed(0) : 100;

          return (
            <div key={stage.name} className="relative group">
              {/* Conversion label */}
              {index > 0 && (
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-10 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-500 border border-slate-200 dark:border-slate-700">
                  {conversion}%
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex-1 flex justify-center h-12 relative cursor-pointer" onClick={() => onStageClick?.(stage.name)}>
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full rounded-md shadow-sm transition-all group-hover:brightness-110"
                    style={{
                      width: `${widthPercent}%`,
                      backgroundColor: stage.color,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                    <span className="text-white font-medium text-sm drop-shadow-sm">{stage.name}</span>
                    <span className="text-white font-bold text-sm drop-shadow-sm">
                      {stage.count} ({conversion}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Overall Conversion</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{totalConversion}%</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">Health Check</p>
          <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
            🤖 "Negotiation → Won needs focus"
          </p>
        </div>
      </div>
    </div>
  );
};
