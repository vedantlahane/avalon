import React, { useEffect, useState } from 'react';
import { X, Bot, Info, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import { toastStore, ToastMessage } from '../../lib/toast-store';
import { useNavigate } from 'react-router-dom';

const toastIcons = {
  success: <CheckCircle2 size={18} className="text-green-600" />,
  info: <Info size={18} className="text-blue-600" />,
  warning: <AlertTriangle size={18} className="text-yellow-600" />,
  error: <AlertCircle size={18} className="text-red-600" />,
  ai: <Bot size={18} className="text-purple-600" />,
};

export const ToastProvider: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = toastStore.subscribe(setToasts);
    return unsubscribe;
  }, []);

  const handleAction = (toast: ToastMessage, isSecondary = false) => {
    const link = isSecondary ? toast.secondaryActionLink : toast.actionLink;
    if (link && link !== '#') {
      navigate(link);
      toastStore.remove(toast.id);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-4 pointer-events-none w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white rounded-xl shadow-2xl border border-gray-200 pointer-events-auto overflow-hidden transform transition-all animate-in slide-in-from-right-full duration-300 group"
        >
          <div className="p-4 flex gap-4">
            <div className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              toast.type === 'ai' ? 'bg-purple-100' :
              toast.type === 'success' ? 'bg-green-100' :
              toast.type === 'warning' ? 'bg-yellow-100' :
              toast.type === 'error' ? 'bg-red-100' :
              'bg-blue-100'
            }`}>
              {toastIcons[toast.type]}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className={`text-[11px] font-bold uppercase tracking-tight ${
                  toast.type === 'ai' ? 'text-purple-600' :
                  toast.type === 'success' ? 'text-green-600' :
                  toast.type === 'warning' ? 'text-yellow-600' :
                  toast.type === 'error' ? 'text-red-600' :
                  'text-blue-600'
                }`}>
                  {toast.type === 'ai' ? 'AI Insight' : toast.title}
                </span>
                <button 
                  onClick={() => toastStore.remove(toast.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="text-sm text-gray-600 font-medium leading-relaxed mb-3">
                {toast.message}
              </p>
              <div className="flex flex-wrap gap-2">
                {toast.actionLabel && (
                  <button 
                    onClick={() => handleAction(toast)}
                    className="px-3 py-1 bg-white border border-gray-200 rounded text-[11px] font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all"
                  >
                    {toast.actionLabel}
                  </button>
                )}
                {toast.secondaryActionLabel && (
                  <button 
                    onClick={() => handleAction(toast, true)}
                    className="px-3 py-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded transition-colors"
                  >
                    {toast.secondaryActionLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="h-1 bg-indigo-600 origin-left animate-toast-progress"></div>
        </div>
      ))}
    </div>
  );
};
