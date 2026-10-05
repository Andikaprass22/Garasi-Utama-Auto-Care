import { processSteps } from '../../data/process';
import { content } from '../../data/content';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function Process() {
  return (
    <section id="alur" className="scroll-mt-20 border-t border-line bg-ink py-16 text-surface lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={content.process.eyebrow}
          title={content.process.title}
          description={content.process.description}
          tone="dark"
        />

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <li key={step.step} className="relative border-t border-surface/20 pt-6">
              <span className="font-display text-3xl font-bold text-brand">
                {String(step.step).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-surface">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-surface/70">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
