// HomeGallary.tsx
'use client';

import React, { useMemo } from 'react';
import MediaGallery from '../ui/MediaGallery';
import type { HomeGallaryContentType } from '../../types/content/homeTypes';
import type { TemplateMediaType } from '../../types/content/globalTypes';

interface HomeGallaryProps {
  content: HomeGallaryContentType;
  className?: string;
}

/**
 * Galería profesional + Lightbox:
 * - Mantiene estética barbería (fondo oscuro + franja “barber pole” sutil).
 * - Usa tu MediaGalleryClient (Mosaic + Lightbox) para zoom y navegación.
 * - Mapea content.images -> TemplateMediaType[] (type: 'image').
 */
const HomeGallary: React.FC<HomeGallaryProps> = ({ content, className = '' }) => {
  const { heading, images } = content;

  const items = useMemo<TemplateMediaType[]>(
    () =>
      images.map((img) =>
        ({
          type: 'image',
          src: img.src,
          alt: img.alt ?? '',
          title: img.title ?? img.alt ?? '',
        } as unknown as TemplateMediaType)
      ),
    [images]
  );

  return (
    <section
      id="galeria"
      className={`relative border-y border-neutral-700 bg-neutral-900 py-20 md:py-24 ${className}`}
    >
      {/* Decor “barber pole” superior sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-20 opacity-15"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg,
            var(--color-primary-800) 0 12px,
            var(--color-accent-600) 12px 24px,
            var(--color-neutral-900) 24px 36px
          )`,
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-neutral-50">{heading}</h2>
          <span className="hidden h-[3px] w-32 rounded-full bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 md:inline-block" />
        </div>

        {/* Mosaic + Lightbox */}
        <MediaGallery items={items} />
      </div>
    </section>
  );
};

export default HomeGallary;
