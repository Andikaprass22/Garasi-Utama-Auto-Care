import { useState } from 'react';
import type { FormEvent } from 'react';
import { services } from '../../data/services';
import { workshop } from '../../data/workshop';
import { content } from '../../data/content';
import { validateBooking } from '../../lib/validation';
import type { BookingFormErrors, BookingFormValues } from '../../lib/validation';
import { buildBookingMessage, buildWhatsAppUrl, isWhatsAppNumberUsable } from '../../lib/whatsapp';
import { cn } from '../../lib/cn';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Field, fieldDescribedBy } from '../ui/Field';
import { Select } from '../ui/Select';
import { Icon } from '../ui/Icon';

const EMPTY_VALUES: BookingFormValues = {
  name: '',
  contact: '',
  vehicleType: '',
  serviceId: '',
  date: '',
  notes: '',
};

const VEHICLE_OPTIONS = [...content.booking.vehicleOptions];
const SERVICE_OPTIONS = services.map((service) => ({ value: service.id, label: service.name }));

function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function inputClass(hasError: boolean): string {
  return cn(
    'w-full rounded-xl border bg-surface-2 px-3.5 py-2.5 text-base text-ink outline-none transition-colors placeholder:text-muted/70 sm:text-sm',
    hasError ? 'border-red-500' : 'border-line focus:border-brand-strong',
  );
}

export function Booking() {
  const [values, setValues] = useState<BookingFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  const { labels, placeholders, notesHint } = content.booking;
  const whatsappAvailable = isWhatsAppNumberUsable(workshop.whatsappNumber);

  const update = <K extends keyof BookingFormValues>(key: K, value: BookingFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found = validateBooking(values);
    setErrors(found);

    if (Object.keys(found).length > 0 || !whatsappAvailable) {
      setSubmittedUrl(null);
      return;
    }

    const serviceName =
      services.find((service) => service.id === values.serviceId)?.name ?? values.serviceId;

    const message = buildBookingMessage(
      {
        name: values.name.trim(),
        contact: values.contact.trim(),
        vehicleType: values.vehicleType,
        serviceName,
        date: values.date,
        notes: values.notes,
      },
      content.whatsappMessage,
    );

    const url = buildWhatsAppUrl(workshop.whatsappNumber, message);
    setSubmittedUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setSubmittedUrl(null);
  };

  return (
    <section id="booking" className="scroll-mt-20 border-t border-line bg-surface py-16 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow={content.booking.eyebrow}
              title={content.booking.title}
              description={content.booking.description}
            />

            <ul className="mt-8 flex flex-col gap-4 text-sm text-muted">
              {content.booking.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-ink" />
                  {bullet}
                </li>
              ))}
            </ul>

            {whatsappAvailable ? (
              <Button
                href={buildWhatsAppUrl(workshop.whatsappNumber, workshop.whatsappDefaultMessage)}
                external
                variant="secondary"
                className="mt-8"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
                {content.booking.directChatLabel}
              </Button>
            ) : null}
          </div>

          <form
            noValidate
            onSubmit={handleSubmit}
            className="rounded-2xl border border-line bg-surface-2 p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="booking-name" label={labels.name} required error={errors.name}>
                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => update('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={fieldDescribedBy('booking-name', errors.name)}
                  className={inputClass(Boolean(errors.name))}
                  placeholder={placeholders.name}
                />
              </Field>

              <Field id="booking-contact" label={labels.contact} required error={errors.contact}>
                <input
                  id="booking-contact"
                  name="contact"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.contact}
                  onChange={(event) => update('contact', event.target.value)}
                  aria-invalid={Boolean(errors.contact)}
                  aria-describedby={fieldDescribedBy('booking-contact', errors.contact)}
                  className={inputClass(Boolean(errors.contact))}
                  placeholder={placeholders.contact}
                />
              </Field>

              <Field id="booking-vehicle" label={labels.vehicleType} required error={errors.vehicleType}>
                <Select
                  id="booking-vehicle"
                  value={values.vehicleType}
                  onChange={(value) => update('vehicleType', value)}
                  options={VEHICLE_OPTIONS}
                  placeholder={placeholders.vehicleType}
                  invalid={Boolean(errors.vehicleType)}
                  describedBy={fieldDescribedBy('booking-vehicle', errors.vehicleType)}
                />
              </Field>

              <Field id="booking-service" label={labels.service} required error={errors.serviceId}>
                <Select
                  id="booking-service"
                  value={values.serviceId}
                  onChange={(value) => update('serviceId', value)}
                  options={SERVICE_OPTIONS}
                  placeholder={placeholders.service}
                  invalid={Boolean(errors.serviceId)}
                  describedBy={fieldDescribedBy('booking-service', errors.serviceId)}
                />
              </Field>

              <Field
                id="booking-date"
                label={labels.date}
                required
                error={errors.date}
                className="sm:col-span-2"
              >
                <input
                  id="booking-date"
                  name="date"
                  type="date"
                  min={todayIso()}
                  value={values.date}
                  onChange={(event) => update('date', event.target.value)}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={fieldDescribedBy('booking-date', errors.date)}
                  className={inputClass(Boolean(errors.date))}
                />
              </Field>

              <Field
                id="booking-notes"
                label={labels.notes}
                hint={notesHint}
                className="sm:col-span-2"
              >
                <textarea
                  id="booking-notes"
                  name="notes"
                  rows={3}
                  value={values.notes}
                  onChange={(event) => update('notes', event.target.value)}
                  aria-describedby={fieldDescribedBy('booking-notes', undefined, 'hint')}
                  className={cn(inputClass(false), 'resize-y')}
                  placeholder={placeholders.notes}
                />
              </Field>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={!whatsappAvailable}>
                <Icon name="whatsapp" className="h-5 w-5" />
                {content.booking.submitLabel}
              </Button>
              <Button type="button" variant="ghost" className="w-full sm:w-auto" onClick={handleReset}>
                {content.booking.resetLabel}
              </Button>
            </div>

            {!whatsappAvailable ? (
              <p className="mt-4 text-xs font-medium text-red-600">
                {content.booking.unavailableMessage}
              </p>
            ) : null}

            {submittedUrl ? (
              <div className="mt-5 rounded-xl border border-brand/40 bg-brand/10 p-4">
                <p role="status" className="text-sm leading-relaxed text-ink">
                  {content.booking.successMessage}
                </p>
                <a
                  href={submittedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink underline"
                >
                  <Icon name="whatsapp" className="h-4 w-4" />
                  {content.booking.reopenLabel}
                </a>
              </div>
            ) : null}
          </form>
        </div>
      </Container>
    </section>
  );
}
