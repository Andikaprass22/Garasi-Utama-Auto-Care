import { testimonials } from '../../data/testimonials';
import { content } from '../../data/content';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/cn';

export function Testimonials() {
  return (
    <section id="testimoni" className="scroll-mt-20 border-t border-line bg-surface-2 py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={content.testimonials.eyebrow}
          title={content.testimonials.title}
          description={content.testimonials.description}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="flex flex-col rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-center justify-between gap-3">
                <div
                  role="img"
                  aria-label={`${content.testimonials.ratingLabelPrefix} ${testimonial.rating} dari 5`}
                  className="flex gap-0.5"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Icon
                      key={index}
                      name="star"
                      filled
                      className={cn('h-4 w-4', index < testimonial.rating ? 'text-brand-strong' : 'text-line')}
                    />
                  ))}
                </div>
                {testimonial.isDemo ? <Badge className="text-[10px]">{content.testimonials.demoBadge}</Badge> : null}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4">
                <span className="block text-sm font-semibold text-ink">{testimonial.name}</span>
                <span className="text-xs text-muted">{testimonial.vehicle}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
