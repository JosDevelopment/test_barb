import type { FooterContentType, HeaderContentType } from "../../types/content/globalTypes"


export const FALLBACK_HEADER_CONTENT:HeaderContentType = {
  brand: 'Imperium Barber',
  nav: [
    { url: '#servicios', title: 'Servicios' },
    { url: '#galeria', title: 'Galería' },
    { url: '#precios', title: 'Precios' },
    { url: '#faq', title: 'FAQ' },
  ],
  cta: {
    url: '#reserva',
    title: 'Reservar cita',
  }
} as const


export const FALLBACK_FOOTER_CONTENT: FooterContentType = {
  brand: 'Imperium Barber',
  year: new Date().getFullYear(),
  social: [
    { url: '#', title: 'Instagram' },
    { url: '#', title: 'TikTok' },
    { url: '#', title: 'WhatsApp' },
  ],
} as const