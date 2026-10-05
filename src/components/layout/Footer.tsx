import { workshop } from '../../data/workshop';
import { navItems } from '../../data/navigation';
import { content } from '../../data/content';
import { buildWhatsAppUrl, isWhatsAppNumberUsable } from '../../lib/whatsapp';
import { Container } from '../ui/Container';
import { Icon } from '../ui/Icon';

const SOCIAL_ICON = {
  instagram: 'instagram',
  facebook: 'facebook',
  tiktok: 'tiktok',
  youtube: 'youtube',
} as const;

export function Footer() {
  const socials = workshop.socials.filter((social) => social.url.trim().length > 0);
  const whatsappAvailable = isWhatsAppNumberUsable(workshop.whatsappNumber);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink text-surface">
      <Container className="py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0 sm:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-ink">
                <Icon name="wrench" className="h-5 w-5" />
              </span>
              <span className="font-display text-base font-bold tracking-tight">{workshop.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-surface/70">
              {workshop.description}
            </p>
            {socials.length > 0 ? (
              <ul aria-label={content.footer.socialsAriaLabel} className="mt-5 flex items-center gap-2">
                {socials.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-surface/20 text-surface/80 transition-colors hover:border-brand hover:text-brand"
                    >
                      <Icon name={SOCIAL_ICON[social.platform]} className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label="Tautan footer" className="min-w-0">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-surface/60">
              {content.footer.navigationHeading}
            </h2>
            <ul className="mt-2 flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex min-h-11 items-center text-sm text-surface/80 transition-colors hover:text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#booking"
                  className="flex min-h-11 items-center text-sm text-surface/80 transition-colors hover:text-brand"
                >
                  {content.footer.bookingLabel}
                </a>
              </li>
            </ul>
          </nav>

          <div className="min-w-0">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-surface/60">
              {content.footer.contactHeading}
            </h2>
            <ul className="mt-2 flex flex-col text-sm text-surface/80">
              <li className="flex min-h-11 items-start gap-2.5 py-2">
                <Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="min-w-0 break-words">
                  {workshop.address.line1}, {workshop.address.city}, {workshop.address.region}{' '}
                  {workshop.address.postalCode}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${workshop.phoneE164}`}
                  className="flex min-h-11 items-center gap-2.5 transition-colors hover:text-brand"
                >
                  <Icon name="phone" className="h-4 w-4 shrink-0 text-brand" />
                  {workshop.phoneDisplay}
                </a>
              </li>
              {whatsappAvailable ? (
                <li>
                  <a
                    href={buildWhatsAppUrl(workshop.whatsappNumber, workshop.whatsappDefaultMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-2.5 transition-colors hover:text-brand"
                  >
                    <Icon name="whatsapp" className="h-4 w-4 shrink-0 text-brand" />
                    WhatsApp
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  href={`mailto:${workshop.email}`}
                  className="flex min-h-11 min-w-0 items-center gap-2.5 transition-colors hover:text-brand"
                >
                  <Icon name="mail" className="h-4 w-4 shrink-0 text-brand" />
                  <span className="min-w-0 break-words">{workshop.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-surface/15 pt-6 text-xs text-surface/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {workshop.businessInfo.legalName ?? workshop.name}. Didirikan{' '}
            {workshop.businessInfo.foundedYear}.
          </p>
          <p>
            Template demo. Ganti seluruh isi <span className="font-mono text-surface/70">src/data</span> dengan
            data bengkel Anda.
          </p>
        </div>
      </Container>
    </footer>
  );
}
