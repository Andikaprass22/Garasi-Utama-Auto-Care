import { workshop } from '../../data/workshop';
import { images } from '../../data/images';
import { content } from '../../data/content';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { SmartImage } from '../ui/SmartImage';
import { Icon } from '../ui/Icon';

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden bg-ink text-surface lg:justify-center"
    >
      <div className="absolute inset-0 lg:left-auto lg:w-[40%]">
        <SmartImage
          src={images.hero.src}
          sources={[{ media: '(min-width: 1024px)', srcSet: images.heroSecondary.src }]}
          alt={content.hero.imageAlt}
          eager
          className="h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/85 to-ink lg:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-ink to-transparent lg:block"
        />
      </div>

      <div className="relative w-full">
        <Container className="pt-6 pb-20 sm:pt-10 sm:pb-24 lg:pt-16 lg:pb-16">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-[34rem]">
            <p className="inline-flex items-center gap-2 rounded-full border border-surface/15 bg-surface/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              {content.hero.badge}
            </p>

            <h1 className="mt-4 text-[1.9rem] font-bold leading-[1.06] tracking-tight text-surface sm:mt-5 sm:text-5xl lg:text-[3.4rem]">
              {workshop.tagline}
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-surface/70 sm:text-base lg:text-lg">
              <span className="sm:hidden">{workshop.shortDescription}</span>
              <span className="hidden sm:inline">{workshop.description}</span>
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Button href="#layanan" variant="primary" className="w-full sm:w-auto">
                {content.hero.primaryCta}
              </Button>
              <Button
                href="#booking"
                variant="secondary"
                className="w-full border-surface/25 bg-surface/5 text-surface hover:border-surface/45 hover:bg-surface/15 sm:w-auto"
              >
                {content.hero.secondaryCta}
              </Button>
            </div>

            <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-surface/15 pt-4 sm:mt-9 sm:gap-5 sm:pt-5">
              {content.hero.facts.map((fact) => (
                <div key={fact.label} className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <Icon name={fact.icon} className="h-4 w-4 shrink-0 text-brand sm:h-5 sm:w-5" />
                  <div className="min-w-0">
                    <dt className="hidden text-[10px] font-medium uppercase tracking-[0.14em] text-surface/45 sm:block">
                      {fact.label}
                    </dt>
                    <dd className="text-xs font-semibold leading-snug text-surface sm:text-sm">
                      {fact.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </div>
    </section>
  );
}
