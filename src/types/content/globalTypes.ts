import type { ReactNode } from "react";

export interface LinkType {
  url: string;
  title?: string;
}

export interface ImageType{
    src: string;
    alt?: string;
    title?: string;
    icon?: ReactNode;
}

export type TemplateMediaType =
  | {
      type: 'image'
      src: string
      alt: string
      width?: number
      height?: number
      caption?: string
    }
  | {
      type: 'video'
      // O bien src directo...
      src?: string
      // ...o múltiples sources (WebM/MP4) para compatibilidad
      sources?: { src: string; type: 'video/webm' | 'video/mp4' }[]
      poster?: string
      caption?: string
      controls?: boolean // default true
      loop?: boolean // default true
      autoPlay?: boolean // default true (muted + playsInline)
      muted?: boolean // default true
      playsInline?: boolean // default true
    }

export interface ServiceItem {
  title: string;
  desc: string;
  img: ImageType;
}

export interface PricingItem {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

export interface Testimonial {
  name: string;
  text: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface BarberShopContent {
  brand: string;
  hero: {
    title: string;
    highlight: string;
    description: string;
    image: ImageType;
    ctaPrimary: LinkType;
    ctaSecondary: LinkType;
    badges: string[];
  };
  services: ServiceItem[];
  pricing: PricingItem[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  contact: {
    phone: string;
    address: string;
    mapUrl: string;
    hours: string[];
  };
  nav: LinkType[];
  social: LinkType[];
  bookingNote: string;
}


export interface HeaderContentType{
    brand: string;
    nav: LinkType[];
    cta: LinkType;
}

export interface FooterContentType {
  brand: string;
  year: number;
  social: LinkType[];
}