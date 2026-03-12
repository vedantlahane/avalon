import React from 'react';
import { HelpCircle } from 'lucide-react';
import { useHelpStore } from '@/lib/help-store';
import { cn } from '@/lib/utils';

interface HelpTooltipProps {
  articleId: string;
  className?: string;
}

export const HelpTooltip: React.FC<HelpTooltipProps> = ({ articleId, className }) => {
  const { openHelp } = useHelpStore();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openHelp(articleId);
      }}
      className={cn(
        "inline-flex items-center justify-center p-0.5 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10",
        className
      )}
      title="Click for help"
    >
      <HelpCircle size={14} />
    </button>
  );
};
