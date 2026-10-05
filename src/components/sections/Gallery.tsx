import { useEffect, useRef, useState } from 'react';
import { gallery } from '../../data/gallery';
import { content } from '../../data/content';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { SmartImage } from '../ui/SmartImage';
import { Icon } from '../ui/Icon';

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : gallery[activeIndex];

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const open = (index: number) => setActiveIndex(index);
  const close = () => setActiveIndex(null);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      triggerRefs.current[activeIndex]?.focus();
    };
  }, [activeIndex]);

  return (
    <section id="galeri" className="scroll-mt-20 border-t border-line bg-surface py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={content.gallery.eyebrow}
          title={content.gallery.title}
          description={content.gallery.description}
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {gallery.map((image, index) => (
            <button
              key={image.src}
              type="button"
              ref={(element) => {
                triggerRefs.current[index] = element;
              }}
              onClick={() => open(index)}
              aria-label={`${content.gallery.zoomLabelPrefix} ${image.caption ?? image.alt}`}
              className="group relative overflow-hidden rounded-2xl border border-line"
            >
              <div className="aspect-[4/3]">
                <SmartImage
                  src={image.src}
                  alt={image.alt}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {image.caption ? (
                <span className="absolute inset-x-0 bottom-0 bg-ink/70 px-3 py-2 text-left text-xs font-medium text-surface">
                  {image.caption}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </Container>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption ?? active.alt}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-3xl overflow-hidden rounded-2xl bg-surface-2"
          >
            <div className="aspect-[4/3]">
              <SmartImage src={active.src} alt={active.alt} eager />
            </div>
            <div className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="text-sm font-semibold text-ink">{active.caption ?? active.alt}</p>
                {active.credit ? <p className="mt-0.5 text-xs text-muted">{active.credit}</p> : null}
              </div>
              <button
                type="button"
                ref={closeButtonRef}
                onClick={close}
                aria-label={content.gallery.closeLabel}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line text-ink hover:bg-ink/5"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
