import type { ImageType, LinkType } from "./globalTypes";

// HomeHero
export interface HomeHeroContentType {
  title: string;
  highlight: string;
  description: string;
  image: ImageType;
  ctaPrimary: LinkType;
  ctaSecondary: LinkType;
  badges: string[];
}


// HomeServices 
export interface HomeServiceItem {
  title: string;
  desc: string;
  price?: string;
  img: ImageType;
}

export interface HomeServicesContentType {
  heading: string;
  cta: LinkType;
  items: HomeServiceItem[];
}

// HomeGallary
export interface HomeGallaryContentType {
  heading: string;
  images: ImageType[];
}


// HomePricing
export interface HomePricingPlan {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

export interface HomePricingContentType {
  heading: string;
  plans: HomePricingPlan[];
  cta: LinkType;
}


// HomeBooking
export interface HomeBookingContentType {
  heading: string;           // "Reserva en minutos"
  intro: string;             // "Completa el formulario..."
  phone: string;             // "+5281..."
  image: ImageType;          // Imagen lateral
  services: string[];        // Opciones del select
  hours: string[];           // Horarios en lista
  address: string;           // Dirección
  mapUrl: string;            // URL a Maps
  bookingNote: string;       // Nota legal/política
  form: {
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    serviceLabel: string;
    dateLabel: string;
    timeLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitLabel: string;
  };
}


// HomeFAQ
// homeFaqTypes.ts
export interface FaqItem {
  q: string;
  a: string;
}

export interface HomeFaqContentType {
  heading: string;
  faqs: FaqItem[];
}
