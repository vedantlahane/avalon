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
    <div className="h-full flex flex-col justify-center py-4">
      <div className="space-y-1 relative max-w-md mx-auto w-full">
        {data.map((stage, index) => {
          const widthPercent = (stage.value / maxValue) * 100;
          const prevStage = data[index - 1];
          const conversion = prevStage ? Math.round((stage.value / prevStage.value) * 100) : 100;

          return (
            <div key={stage.name} className="relative group">
              {/* Conversion label */}
              {index > 0 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full text-[10px] font-black text-indigo-600 border border-indigo-100 dark:border-indigo-900 shadow-sm transition-transform group-hover:scale-110">
                  {conversion}%
                </div>
              )}

              <div 
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => onStageClick?.(stage.name)}
              >
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: `${widthPercent}%`, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  className="h-14 relative flex items-center justify-center overflow-hidden transition-all group-hover:brightness-110"
                  style={{
                    backgroundColor: stage.color,
                    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
                    marginBottom: '-4px' // Overlap slightly for funnel look
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col items-center px-4 text-center">
                    <span className="text-white font-black text-xs uppercase tracking-tighter drop-shadow-md">
                      {stage.name}
                    </span>
                    <span className="text-white font-medium text-[10px] opacity-90">
                      {stage.count} deals • ${ (stage.value * 1000).toLocaleString() }
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 px-4 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="border-r border-slate-200 dark:border-slate-700">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Overall Conversion</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{totalConversion}%</p>
        </div>
        <div className="pl-2">
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">AI Recommendation</p>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-tight">
            🤖 "Negotiation → Won is the weakest point (53%). Focus on closing techniques."
          </p>
        </div>
      </div>
    </div>
  );
};
