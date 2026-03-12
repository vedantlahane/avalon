import React from 'react';
import { cn } from '../../lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  prefix?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, prefix, className }) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className={cn(
      "border border-[var(--border-color)] bg-[var(--bg-surface)] p-[20px_24px] rounded-none transition-all duration-200 ease-in-out hover:border-[var(--accent)] hover:shadow-[0_0_20px_var(--accent-glow)]",
      className
    )}>
      <div className="font-mono text-[28px] font-semibold text-[var(--text-primary)] tracking-[-0.02em]">
        {prefix}{value}
      </div>
      <div className="text-[13px] text-[var(--text-muted)] mt-[4px] font-normal uppercase tracking-wider">
        {label}
      </div>
      {change !== undefined && (
        <div className={cn(
          "text-[12px] font-mono mt-[8px]",
          isPositive ? "text-nexus-success" : "text-nexus-danger"
        )}>
          {isPositive ? "▲" : "▼"} {Math.abs(change)}%
        </div>
      )}
    </div>
  );
};
