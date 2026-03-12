import React from 'react';
import { cn } from '../../lib/utils';

interface StatusDotProps {
  status: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  className?: string;
}

export const StatusDot: React.FC<StatusDotProps> = ({ status, className }) => {
  const colors = {
    success: 'bg-[#10B981]',
    warning: 'bg-[#F59E0B]',
    danger: 'bg-[#EF4444]',
    info: 'bg-[#3B82F6]',
    neutral: 'bg-[#555555]',
  };

  return (
    <span className={cn(
      "inline-flex h-[8px] w-[8px] rounded-full mr-[8px] vertical-middle",
      colors[status],
      className
    )} />
  );
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'border-[var(--border-color-light)] text-[var(--text-secondary)]',
    accent: 'border-[var(--accent)] text-[var(--accent)]',
    success: 'border-[#10B981] text-[#10B981]',
    warning: 'border-[#F59E0B] text-[#F59E0B]',
    danger: 'border-[#EF4444] text-[#EF4444]',
  };

  return (
    <span className={cn(
      "inline-flex items-center px-[10px] py-[2px] rounded-full border text-[11px] font-500 uppercase tracking-[0.05em] bg-transparent",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
