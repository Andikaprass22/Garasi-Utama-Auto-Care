import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
