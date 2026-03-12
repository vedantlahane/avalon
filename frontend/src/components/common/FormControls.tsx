import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', children, className, ...props }) => {
  const variants = {
    primary: "border border-[var(--accent)] text-[var(--accent)] bg-transparent hover:bg-[var(--accent)] hover:text-white",
    secondary: "border-none text-[var(--text-secondary)] bg-transparent hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]",
    ghost: "border-none text-[var(--text-secondary)] bg-transparent hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]",
    danger: "border border-[#EF4444] text-[#EF4444] bg-transparent hover:bg-[#EF4444] hover:text-white",
    outline: "border border-[var(--border-color)] text-[var(--text-secondary)] bg-transparent hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)]",
  };

  const sizes = {
    sm: "h-[32px] px-3 text-[12px]",
    md: "h-[36px] px-4 text-[13px]",
    lg: "h-[44px] px-6 text-[14px]",
    icon: "h-[36px] w-[36px] p-0",
  };

  return (
    <button
      className={cn(
        "cursor-pointer rounded-[6px] font-medium inline-flex items-center justify-center gap-[6px] transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "w-full bg-transparent border border-[var(--border-color)] rounded-[4px] px-[12px] py-[8px] text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-glow)] outline-none transition-all duration-150 ease-in-out",
        className
      )}
      {...props}
    />
  );
};