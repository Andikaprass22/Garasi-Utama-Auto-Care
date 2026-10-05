import { pricing, pricingNote } from '../../data/pricing';
import { services } from '../../data/services';
import { content } from '../../data/content';
import { formatPriceRange } from '../../lib/currency';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Icon } from '../ui/Icon';

const serviceName = (serviceId: string) =>
  services.find((service) => service.id === serviceId)?.name ?? serviceId;

export function Pricing() {
  return (
    <section id="harga" className="scroll-mt-20 border-t border-line bg-surface py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={content.pricing.eyebrow}
          title={content.pricing.title}
          description={content.pricing.description}
        />

        <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">{content.pricing.caption}</caption>
              <thead>
                <tr className="border-b border-line bg-ink/[0.03] text-xs uppercase tracking-wide text-muted">
                  <th scope="col" className="px-4 py-3.5 font-semibold sm:px-5">
                    {content.pricing.columnService}
                  </th>
                  <th scope="col" className="hidden px-4 py-3.5 font-semibold sm:table-cell sm:px-5">
                    {content.pricing.columnVehicle}
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-right font-semibold sm:px-5">
                    {content.pricing.columnPrice}
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((item) => (
                  <tr key={`${item.serviceId}-${item.label}`} className="border-b border-line last:border-0">
                    <td className="px-4 py-4 sm:px-5">
                      <span className="font-medium text-ink">{item.label}</span>
                      <span className="mt-0.5 block text-xs text-muted">
                        {serviceName(item.serviceId)}
                        <span className="sm:hidden">
                          {' '}
                          · {content.pricing.vehicleLabel[item.vehicleType]}
                        </span>
                      </span>
                    </td>
                    <td className="hidden px-4 py-4 text-muted sm:table-cell sm:px-5">
                      {content.pricing.vehicleLabel[item.vehicleType]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-right font-semibold text-ink sm:px-5">
                      {formatPriceRange(item.priceFrom, item.priceTo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-2 text-xs text-muted sm:hidden">{content.pricing.scrollHint}</p>

        <p className="mt-6 flex items-start gap-3 rounded-2xl border border-brand/40 bg-brand/10 px-5 py-4 text-sm leading-relaxed text-ink">
          <Icon name="receipt" className="mt-0.5 h-5 w-5 shrink-0 text-brand-ink" />
          <span>{pricingNote}</span>
        </p>
      </Container>
    </section>
  );
}
