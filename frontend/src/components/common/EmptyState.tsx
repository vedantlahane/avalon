import React from 'react';
import { LucideIcon, Bot } from 'lucide-react';

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actions: ActionButton[];
  aiTip?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actions,
  aiTip,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-gray-50 rounded-2xl p-8 max-w-md w-full border border-gray-100 shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-full shadow-sm">
            <Icon size={48} className="text-gray-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-8">{description}</p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {actions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <button
                key={index}
                onClick={action.onClick}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                  action.variant === 'secondary'
                    ? 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                }`}
              >
                {ActionIcon && <ActionIcon size={18} />}
                {action.label}
              </button>
            );
          })}
        </div>
        
        {aiTip && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3 text-left">
            <div className="bg-white p-1.5 rounded-lg shadow-sm shrink-0">
              <Bot size={20} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-indigo-900 uppercase tracking-wider mb-1">AI Tip</p>
              <p className="text-sm text-indigo-800">{aiTip}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
