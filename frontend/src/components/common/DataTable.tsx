import React from 'react';
import { cn } from '../../lib/utils';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
  isNumeric?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T>({ columns, data, onRowClick, className }: DataTableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((column, idx) => (
              <th
                key={idx}
                className={cn(
                  "text-[11px] uppercase tracking-[0.05em] text-[var(--text-muted)] font-500 p-[12px_16px] border-b border-[var(--border-color)] text-left",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIdx) => (
            <tr
              key={rowIdx}
              onClick={() => onRowClick?.(item)}
              className={cn(
                "border-b border-[var(--border-color)] transition-colors hover:bg-[var(--bg-hover)]",
                onRowClick && "cursor-pointer"
              )}
            >
              {columns.map((column, colIdx) => {
                const value = typeof column.accessor === 'function' 
                  ? column.accessor(item) 
                  : (item[column.accessor] as React.ReactNode);
                
                return (
                  <td
                    key={colIdx}
                    className={cn(
                      "p-[12px_16px] text-[14px] text-[var(--text-primary)]",
                      column.isNumeric && "font-mono",
                      column.className
                    )}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
