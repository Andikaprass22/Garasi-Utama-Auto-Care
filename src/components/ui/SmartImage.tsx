import { useState } from 'react';
import { cn } from '../../lib/cn';

export interface SmartImageSource {
  media: string;
  srcSet: string;
}

interface SmartImageProps {
  src: string;
  alt: string;
  sources?: SmartImageSource[];
  className?: string;
  eager?: boolean;
  fallbackLabel?: string;
}

export function SmartImage({
  src,
  alt,
  sources,
  className,
  eager = false,
  fallbackLabel = 'Foto belum tersedia',
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'flex h-full w-full flex-col items-center justify-center gap-2 bg-ink px-4 text-center',
          className,
        )}
      >
        <span aria-hidden="true" className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          Ganti foto ini
        </span>
        <span className="text-sm text-surface/75">{fallbackLabel}</span>
      </div>
    );
  }

  const image = (
    <img
      src={src}
      alt={alt}
      className={cn('h-full w-full object-cover', className)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );

  if (!sources || sources.length === 0) {
    return image;
  }

  return (
    <picture className="contents">
      {sources.map((source) => (
        <source key={source.media} media={source.media} srcSet={source.srcSet} />
      ))}
      {image}
    </picture>
  );
}
