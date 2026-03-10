import React from 'react';
import { Toaster, resolveValue } from 'react-hot-toast';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        className: 'toast-slide',
      }}
      containerStyle={{
        top: 20,
        right: 20,
      }}
    >
      {(t) => (
        <div
          className={cn(
            "flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-4 shadow-2xl min-w-[300px] max-w-md transition-all duration-300",
            t.visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
        >
          {t.type === 'success' && (
            <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
              <CheckCircle2 size={18} />
            </div>
          )}
          {t.type === 'error' && (
            <div className="bg-rose-50 p-2 rounded-xl text-rose-600">
              <AlertTriangle size={18} />
            </div>
          )}
          {t.type === 'loading' && (
            <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600 animate-spin">
              <Info size={18} />
            </div>
          )}
          
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900">{resolveValue(t.message, t)}</p>
          </div>

          <button 
            onClick={() => {}} 
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </Toaster>
  );
};
