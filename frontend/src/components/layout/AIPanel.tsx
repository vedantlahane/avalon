import React from 'react';
import { Bot, X, Sparkles, MessageSquare, Zap, Target } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AIPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIPanel: React.FC<AIPanelProps> = ({ isOpen, onClose }) => {
  return (
    <div 
      className={cn(
        "fixed right-0 top-0 h-screen bg-white border-l border-gray-200 shadow-2xl transition-all duration-300 ease-in-out z-50 flex flex-col",
        isOpen ? "w-96" : "w-0 overflow-hidden"
      )}
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
                                        <h3 className="font-bold text-gray-900 leading-none">Avalon AI Assistant</h3>            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Online</span>
          </div>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-md text-gray-400">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Mocking the widget content as per design requirements */}
        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-2">
              <Sparkles size={16} />
              <span>Smart Insights</span>
            </div>
            <p className="text-sm text-indigo-900/80 leading-relaxed">
              Based on recent activity, **John Doe** from Acme Corp is showing 85% intent. Recommended action: Send the final proposal today.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Suggested Actions</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-sm transition-all text-left">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare size={16} />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">Draft outreach script</div>
                  <div className="text-xs text-gray-500">For new lead Jane Smith</div>
                </div>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-sm transition-all text-left">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Zap size={16} />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">Deal Stagnation Alert</div>
                  <div className="text-xs text-gray-500">Cloud Migration Project (5 days)</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-sm transition-all text-left">
                <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                  <Target size={16} />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">Quarterly Goal Analysis</div>
                  <div className="text-xs text-gray-500">You are at 72% of your target</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask AI anything..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors">
            <Zap size={14} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};
