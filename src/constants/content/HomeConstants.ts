
import type { BarberShopContent } from "../../types/content/globalTypes";
import type { HomeBookingContentType, HomeFaqContentType, HomeGallaryContentType, HomeHeroContentType, HomePricingContentType, HomeServicesContentType } from "../../types/content/homeTypes";

// HomeHero
export const FALLBACK_HOME_HERO_CONTENT: HomeHeroContentType = {
    title: 'Corte de precisión.',
    highlight: 'Estilo',
    description:
    'Fades limpios, barbas definidas y servicio puntual. Agenda en minutos y sal con un look que impone.',
    image: {
        src: '/img/image.png',
        alt: 'Barbero trabajando en un fade impecable',
    },
    ctaPrimary: { url: '#reserva', title: 'Reservar ahora' },
    ctaSecondary: { url: '#precios', title: 'Ver precios' },
    badges: ['★★★★★ 4.9 / 5', '+10 años de experiencia', 'Wi-Fi • Café • Buen rap'],
} as const;


// HomeServices
export const FALLBACK_HOME_SERVICES_CONTENT: HomeServicesContentType = {
  heading: 'Servicios',
  cta: { url: '#precios', title: 'Ver tabla de precios →' },
  items: [
    {
      title: 'Corte Clásico',
      desc: 'Tijera y máquina. Acabado mate o brillo natural.',
      img: {
        src: '/img/image.png',
        alt: 'Corte clásico en barbería',
      },
    },
    {
      title: 'Skin Fade',
      desc: 'Degradado al ras. Transición limpia, líneas definidas.',
      price: '$320',
      img: {
        src: '/img/image.png',
        alt: 'Skin fade con transición suave',
      },
    },
    {
      title: 'Barba & Afeitado',
      desc: 'Moldeado, toalla caliente y acabado con navaja.',
      price: '$200',
      img: {
        src: '/img/image.png',
        alt: 'Arreglo de barba con navaja',
      },
    },
    {
      title: 'Paquete Premium',
      desc: 'Corte + barba + mascarilla. Rituales y detalle extra.',
      price: '$450',
      img: {
        src: '/img/image.png',
        alt: 'Servicio premium de barbería',
      },
    },
  ],
} as const;








// HomeGallary
export const FALLBACK_HOME_GALLARY_CONTENT: HomeGallaryContentType = {
  heading: 'Galería',
  images: [
    { src: '/img/image.png', alt: 'Trabajo de barbería 1' },
    { src: '/img/image.png', alt: 'Trabajo de barbería 2' },
    { src: '/img/image.png', alt: 'Trabajo de barbería 2' },
    { src: '/img/image.png', alt: 'Trabajo de barbería 2' },
    { src: '/img/image.png', alt: 'Trabajo de barbería 2' },
  ],
} as const;



// HomePricing
export const FALLBACK_HOME_PRICING_CONTENT: HomePricingContentType = {
  heading: 'Precios',
  cta: { url: '#reserva', title: 'Reservar' },
  plans: [
    {
      name: 'Corte',
      price: '$250',
      features: ['Consulta rápida', 'Peinado incluido', 'Productos mate o brillo'],
    },
    {
      name: 'Corte + Barba',
      price: '$400',
      highlight: true,
      features: ['Fade / Tijera', 'Moldeado de barba', 'Toalla caliente'],
    },
    {
      name: 'Premium',
      price: '$550',
      features: ['Corte + barba', 'Mascarilla / Vapor', 'Aceites y acabado'],
    },
  ],
} as const;


// HomeBooking
export const FALLBACK_HOME_BOOKING_CONTENT: HomeBookingContentType = {
  heading: 'Reserva en minutos',
  intro:
    'Completa el formulario y te confirmamos por WhatsApp. Si prefieres, llama al',
  phone: '+528120000000',
  image: {
    src: '/img/image.png',
    alt: 'Interior de la barbería',
  },
  services: ['Corte', 'Corte + Barba', 'Premium'],
  hours: ['Lun–Vie: 10:00–20:00', 'Sáb: 10:00–18:00', 'Dom: Cerrado'],
  address: 'Av. Reforma 123, Centro, Monterrey, N.L.',
  mapUrl: 'https://maps.google.com/?q=Av.+Reforma+123,+Monterrey',
  bookingNote:
    'Al enviar aceptas nuestras políticas y el uso de tus datos para contactarte.',
  form: {
    nameLabel: 'Nombre',
    namePlaceholder: 'Tu nombre',
    phoneLabel: 'Teléfono',
    phonePlaceholder: 'WhatsApp',
    serviceLabel: 'Servicio',
    dateLabel: 'Fecha',
    timeLabel: 'Hora',
    notesLabel: 'Notas (opcional)',
    notesPlaceholder: 'Ej. estilo, referencias, etc.',
    submitLabel: 'Enviar solicitud',
  },
} as const;


// HomeFAQ
export const FALLBACK_HOME_FAQ_CONTENT: HomeFaqContentType = {
  heading: 'Preguntas frecuentes',
  faqs: [
    {
      q: '¿Aceptan walk-ins?',
      a: 'Sí, pero la prioridad es para citas. Te recomendamos reservar para evitar espera.',
    },
    {
      q: '¿Qué métodos de pago aceptan?',
      a: 'Efectivo, tarjeta y transferencias.',
    },
    {
      q: '¿Puedo llevar referencia de corte?',
      a: 'Claro. Trae fotos o muéstranos tu estilo ideal y te asesoramos.',
    },
    {
      q: '¿Tienen estacionamiento?',
      a: 'Sí, 2 lugares frente al local y estacionamientos cercanos.',
    },
  ],
} as const;




export const FALLBACK_HOME_MAIN_CONTENT: BarberShopContent = {
  brand: 'Imperium Barber',
  nav: [
    { url: '#servicios', title: 'Servicios' },
    { url: '#galeria', title: 'Galería' },
    { url: '#precios', title: 'Precios' },
    { url: '#faq', title: 'FAQ' },
  ],
  hero: {
    title: 'Corte de precisión.',
    highlight: 'Estilo',
    description:
      'Fades limpios, barbas definidas y servicio puntual. Agenda en minutos y sal con un look que impone.',
    image: {
      src: '/img/image.png',
      alt: 'Barbero trabajando en un fade impecable',
    },
    ctaPrimary: { url: '#reserva', title: 'Reservar ahora' },
    ctaSecondary: { url: '#precios', title: 'Ver precios' },
    badges: ['★★★★★ 4.9 / 5', '+10 años de experiencia', 'Wi-Fi • Café • Buen rap'],
  },
  services: [
    {
      title: 'Corte Clásico',
      desc: 'Tijera y máquina. Acabado mate o brillo natural.',
      img: {
        src: '/img/image.png',
        alt: 'Corte clásico en barbería',
      },
    },
    {
      title: 'Skin Fade',
      desc: 'Degradado al ras. Transición limpia, líneas definidas.',
      img: {
        src: '/img/image.png',
        alt: 'Skin fade con transición suave',
      },
    },
    {
      title: 'Barba & Afeitado',
      desc: 'Moldeado, toalla caliente y acabado con navaja.',
      img: {
        src: '/img/image.png',
        alt: 'Arreglo de barba con navaja',
      },
    },
    {
      title: 'Paquete Premium',
      desc: 'Corte + barba + mascarilla. Rituales y detalle extra.',
      img: {
        src: '/img/image.png',
        alt: 'Servicio premium de barbería',
      },
    },
  ],
  pricing: [
    {
      name: 'Corte',
      price: '$250',
      features: ['Consulta rápida', 'Peinado incluido', 'Productos mate o brillo'],
    },
    {
      name: 'Corte + Barba',
      highlight: true,
      price: '$400',
      features: ['Fade / Tijera', 'Moldeado de barba', 'Toalla caliente'],
    },
    {
      name: 'Premium',
      price: '$550',
      features: ['Corte + barba', 'Mascarilla / Vapor', 'Aceites y acabado'],
    },
  ],
  testimonials: [
    { name: 'Luis G.', text: 'El mejor fade del centro. Detalle impecable y puntualidad.' },
    { name: 'Sebas R.', text: 'Me arreglaron una mala experiencia de otra barbería. 10/10.' },
    { name: 'Iván P.', text: 'Ambiente chido, café y buen trato. Regreso seguro.' },
  ],
  faqs: [
    { q: '¿Aceptan walk-ins?', a: 'Sí, pero la prioridad es para citas. Te recomendamos reservar.' },
    { q: '¿Qué métodos de pago aceptan?', a: 'Efectivo, tarjeta y transferencias.' },
    { q: '¿Puedo llevar referencia de corte?', a: 'Claro. Trae fotos o muéstranos tu estilo ideal y te asesoramos.' },
    { q: '¿Tienen estacionamiento?', a: 'Sí, 2 lugares frente al local y estacionamientos cercanos.' },
  ],
  contact: {
    phone: '+528120000000',
    address: 'Av. Reforma 123, Centro, Monterrey, N.L.',
    mapUrl: 'https://maps.google.com/?q=Av.+Reforma+123,+Monterrey',
    hours: ['Lun–Vie: 10:00–20:00', 'Sáb: 10:00–18:00', 'Dom: Cerrado'],
  },
  social: [
    { url: '#', title: 'Instagram' },
    { url: '#', title: 'TikTok' },
    { url: '#', title: 'WhatsApp' },
  ],
  bookingNote:
    'Al enviar aceptas nuestras políticas y el uso de tus datos para contactarte.',
};




