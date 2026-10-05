import { services } from '../../data/services';
import { content } from '../../data/content';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';

export function Services() {
  return (
    <section id="layanan" className="scroll-mt-20 border-t border-line bg-surface-2 py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={content.services.eyebrow}
          title={content.services.title}
          description={content.services.description}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="flex flex-col">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-brand">
                <Icon name={service.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{service.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>
              <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-xs font-medium text-muted">
                <Icon name="clock" className="h-4 w-4 text-brand-ink" />
                {content.services.durationPrefix} {service.duration}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
