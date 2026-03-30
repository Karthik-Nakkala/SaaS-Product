import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200/50 dark:bg-slate-700/50", className)}
      {...props}
    />
  );
}

export function Badge({ children, className, variant = 'default' }) {
  const variants = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
    primary: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800/20 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-300',
    danger: 'bg-rose-100 text-rose-800 dark:bg-rose-800/20 dark:text-rose-300',
    info: 'bg-sky-100 text-sky-800 dark:bg-sky-800/20 dark:text-sky-300',
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent", variants[variant] || variants.default, className)}>
      {children}
    </span>
  );
}
