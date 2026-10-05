import { advantages } from '../../data/advantages';
import { content } from '../../data/content';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Icon } from '../ui/Icon';

export function Advantages() {
  return (
    <section id="keunggulan" className="scroll-mt-20 border-t border-line bg-surface-2 py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={content.advantages.eyebrow}
          title={content.advantages.title}
          description={content.advantages.description}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage) => (
            <div
              key={advantage.title}
              className="flex gap-4 rounded-2xl border border-line bg-surface p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-ink">
                <Icon name={advantage.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-ink">{advantage.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
