import { cn } from '../../lib/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  const isDark = tone === 'dark';

  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'mb-2 text-xs font-semibold uppercase tracking-[0.18em]',
            isDark ? 'text-brand' : 'text-brand-ink',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          'text-3xl font-bold tracking-tight sm:text-4xl',
          isDark ? 'text-surface' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn('mt-3 text-base leading-relaxed', isDark ? 'text-surface/70' : 'text-muted')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
