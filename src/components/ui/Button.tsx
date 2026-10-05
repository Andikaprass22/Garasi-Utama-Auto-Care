import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-ink hover:bg-brand-strong',
  secondary: 'border border-line bg-surface-2 text-ink hover:border-ink/40',
  ghost: 'text-ink hover:bg-ink/5',
};

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
}

export function Button({
  children,
  variant = 'primary',
  className,
  href,
  external = false,
  type = 'button',
  disabled,
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
