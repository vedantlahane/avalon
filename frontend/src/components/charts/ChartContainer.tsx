import React, { useRef } from 'react';
import { Download, RefreshCw, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  children: React.ReactNode;
  className?: string;
  showExport?: boolean;
  aiRecommendation?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  isLoading,
  isEmpty,
  isError,
  onRetry,
  children,
  className,
  showExport = true,
  aiRecommendation,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
        scale: 2,
      });
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${title.replace(/\s+/g, '_').toLowerCase()}_export.png`);
        }
      });
    }
  };

  return (
    <div className={cn("bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-full", className)}>
      <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {showExport && !isLoading && !isError && !isEmpty && (
          <button
            onClick={handleExport}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-500 transition-colors"
            title="Download as PNG"
          >
            <Download size={16} />
          </button>
        )}
      </div>

      <div ref={chartRef} className="flex-1 relative p-5 min-h-[300px]">
        {isLoading ? (
          <div className="absolute inset-0 p-5 space-y-4">
             <div className="flex items-end justify-between h-[200px] gap-2 pt-10">
               {[...Array(6)].map((_, i) => (
                 <div 
                   key={i} 
                   className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg animate-pulse" 
                   style={{ height: `${20 + Math.random() * 60}%`, animationDelay: `${i * 0.1}s` }}
                 />
               ))}
             </div>
             <div className="flex justify-between">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="h-2 w-8 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
               ))}
             </div>
          </div>
        ) : isError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
            <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
            <p className="text-slate-900 dark:text-white font-medium">Couldn't load chart</p>
            <button
              onClick={onRetry}
              className="mt-4 flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-500 font-medium"
            >
              <RefreshCw size={14} />
              <span>Retry</span>
            </button>
          </div>
        ) : isEmpty ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
               <AlertCircle className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400">No data yet</p>
          </div>
        ) : (
          children
        )}
      </div>

      {aiRecommendation && (
        <div className="px-5 py-3 bg-indigo-50/50 dark:bg-indigo-950/20 border-t border-indigo-100 dark:border-indigo-900/30 flex items-start gap-3">
          <span className="text-xl">🤖</span>
          <p className="text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed italic">
            "{aiRecommendation}"
          </p>
        </div>
      )}
    </div>
  );
};
