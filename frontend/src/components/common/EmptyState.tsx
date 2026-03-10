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
      <div className="bg-card rounded-3xl p-8 max-w-md w-full border border-border shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="bg-muted p-4 rounded-full shadow-sm ring-4 ring-muted/30">
            <Icon size={48} className="text-muted-foreground" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-8 font-medium">{description}</p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {actions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <button
                key={index}
                onClick={action.onClick}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ripple ${
                  action.variant === 'secondary'
                    ? 'bg-muted text-foreground border border-border hover:bg-muted/80'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20'
                }`}
              >
                {ActionIcon && <ActionIcon size={18} />}
                {action.label}
              </button>
            );
          })}
        </div>
        
        {aiTip && (
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-start gap-3 text-left">
            <div className="bg-card p-1.5 rounded-lg shadow-sm shrink-0 border border-border">
              <Bot size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">AI Pro-Tip</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{aiTip}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
