export type IconName =
  | 'wrench'
  | 'oil'
  | 'brake'
  | 'engine'
  | 'sparkle'
  | 'shield'
  | 'clock'
  | 'tools'
  | 'car'
  | 'phone'
  | 'mail'
  | 'map'
  | 'check'
  | 'star'
  | 'whatsapp'
  | 'calendar'
  | 'user'
  | 'chevron'
  | 'menu'
  | 'close'
  | 'gauge'
  | 'sofa'
  | 'receipt'
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'youtube';

export type VehicleType = 'mobil' | 'motor' | 'umum';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  icon: IconName;
}

export interface PriceItem {
  serviceId: string;
  vehicleType: VehicleType;
  label: string;
  priceFrom: number;
  priceTo?: number;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Advantage {
  title: string;
  description: string;
  icon: IconName;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export interface Testimonial {
  name: string;
  vehicle: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  isDemo: true;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface OpeningHour {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export type SocialPlatform = 'instagram' | 'facebook' | 'tiktok' | 'youtube';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
}

export interface WorkshopInfo {
  name: string;
  tagline: string;
  description: string;
  shortDescription: string;
  phoneDisplay: string;
  phoneE164: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  email: string;
  address: {
    line1: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  mapsUrl: string;
  mapsDirectionsUrl: string;
  mapsEmbedUrl: string;
  socials: SocialLink[];
  hours: OpeningHour[];
  businessInfo: {
    foundedYear: number;
    legalName?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteImages {
  hero: GalleryImage;
  heroSecondary: GalleryImage;
}
