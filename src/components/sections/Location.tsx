import { workshop } from '../../data/workshop';
import { content } from '../../data/content';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

export function Location() {
  return (
    <section id="lokasi" className="scroll-mt-20 border-t border-line bg-surface py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={content.location.eyebrow}
          title={content.location.title}
          description={content.location.description}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-line bg-surface-2 p-6">
              <h3 className="text-base font-semibold text-ink">{content.location.addressHeading}</h3>
              <p className="mt-3 flex items-start gap-3 text-sm leading-relaxed text-muted">
                <Icon name="map" className="mt-0.5 h-5 w-5 shrink-0 text-brand-ink" />
                <span>
                  {workshop.address.line1}
                  <br />
                  {workshop.address.city}, {workshop.address.region} {workshop.address.postalCode}
                  <br />
                  {workshop.address.country}
                </span>
              </p>

              <a
                href={`tel:${workshop.phoneE164}`}
                aria-label={content.location.callLabel}
                className="mt-4 inline-flex items-center gap-3 text-sm font-medium text-ink transition-colors hover:text-brand-ink"
              >
                <Icon name="phone" className="h-5 w-5 shrink-0 text-brand-ink" />
                {workshop.phoneDisplay}
              </a>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button href={workshop.mapsUrl} external variant="primary" className="px-4 py-2.5">
                  {content.location.openMapsLabel}
                </Button>
                <Button href={workshop.mapsDirectionsUrl} external variant="secondary" className="px-4 py-2.5">
                  {content.location.directionsLabel}
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-surface-2 p-6">
              <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                <Icon name="clock" className="h-5 w-5 text-brand-ink" />
                {content.location.hoursHeading}
              </h3>
              <dl className="mt-4 divide-y divide-line text-sm">
                {workshop.hours.map((entry) => (
                  <div key={entry.day} className="flex items-center justify-between py-2">
                    <dt className="text-muted">{entry.day}</dt>
                    <dd className={entry.closed ? 'font-medium text-muted' : 'font-medium text-ink'}>
                      {entry.closed ? content.location.closedLabel : `${entry.open} – ${entry.close}`}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
            <iframe
              title={`${content.location.mapTitlePrefix} ${workshop.name}`}
              src={workshop.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[320px] w-full border-0"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
