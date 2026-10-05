import { describe, it, expect } from 'vitest';
import { services } from './services';
import { pricing, pricingNote } from './pricing';
import { testimonials } from './testimonials';
import { workshop } from './workshop';
import { navItems } from './navigation';
import { faqItems } from './faq';
import { gallery } from './gallery';
import { processSteps } from './process';
import { advantages } from './advantages';
import { images } from './images';

const SECTION_IDS = [
  'beranda',
  'layanan',
  'harga',
  'alur',
  'keunggulan',
  'galeri',
  'testimoni',
  'lokasi',
  'booking',
  'faq',
];

describe('content data integrity', () => {
  it('has at least five services', () => {
    expect(services.length).toBeGreaterThanOrEqual(5);
  });

  it('links every price item to a known service', () => {
    const ids = new Set(services.map((service) => service.id));
    for (const item of pricing) {
      expect(ids.has(item.serviceId)).toBe(true);
    }
  });

  it('marks testimonials as demo content', () => {
    expect(testimonials.length).toBeGreaterThan(0);
    for (const testimonial of testimonials) {
      expect(testimonial.isDemo).toBe(true);
    }
  });

  it('sanitises the whatsapp number to digits only', () => {
    expect(workshop.whatsappNumber).toMatch(/^\d+$/);
  });

  it('points every navigation item at an existing section', () => {
    for (const item of navItems) {
      expect(item.href.startsWith('#')).toBe(true);
      expect(SECTION_IDS).toContain(item.href.slice(1));
    }
  });

  it('provides at least four faq entries', () => {
    expect(faqItems.length).toBeGreaterThanOrEqual(4);
  });

  it('provides gallery, process, and advantage content', () => {
    expect(gallery.length).toBeGreaterThanOrEqual(6);
    expect(processSteps.length).toBeGreaterThanOrEqual(5);
    expect(advantages.length).toBeGreaterThanOrEqual(4);
  });

  it('provides local image paths for every asset', () => {
    expect(images.hero.src.startsWith('/images/')).toBe(true);
    for (const image of gallery) {
      expect(image.src.startsWith('/images/')).toBe(true);
      expect(image.alt.length).toBeGreaterThan(0);
    }
  });

  it('states the price disclaimer', () => {
    expect(pricingNote.toLowerCase()).toContain('kondisi kendaraan');
  });
});
