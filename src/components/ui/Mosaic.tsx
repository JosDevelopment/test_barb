'use client'

import type { ImageType } from "../../types/content/globalTypes"


interface MosaicProps {
  images: ImageType[]
  openLightbox: (index: number) => void
}

/**
 * Galería fachada (primeros 4). Si hay más, muestra tile “+N”.
 */
export default function Mosaic({ images, openLightbox }: MosaicProps) {
  const maxVisible = 4
  const visible = images.slice(0, maxVisible)
  const extraCount = Math.max(0, images.length - maxVisible)

  return (
    <section className="py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[150px]">
        {visible.map((img, idx) => (
          <button
            key={idx}
            onClick={() => openLightbox(idx)}
            className={[
              'group relative cursor-pointer overflow-hidden rounded-2xl',
              'border border-primary-200/60 bg-white shadow-sm',
              'transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none',
              'focus-visible:ring-2 focus-visible:ring-primary-500/60',
            ].join(' ')}
            style={{
              gridRowEnd: idx === 0 ? 'span 2' : undefined,
              gridColumnEnd: idx === 0 ? 'span 2' : undefined,
            }}
            aria-label={`Ver imagen ${idx + 1}`}
          >
            <img src={img.src} alt={img.alt || `Imagen ${idx + 1}`} />
            <div className="relative w-full h-full">
              <img
                src={img.src}
                alt={img.alt || `Imagen ${idx + 1}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] group-hover:saturate-110"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                loading={idx < 3 ? 'eager' : 'lazy'}
              />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="pointer-events-none absolute inset-x-3 bottom-3 rounded-lg bg-accent-500/95 px-2 py-1 text-[11px] font-semibold text-white shadow-sm ring-1 ring-white/10 opacity-0 transition-all duration-300 group-hover:opacity-100">
              Ver foto
            </span>
          </button>
        ))}

        {extraCount > 0 && (
          <button
            onClick={() => openLightbox(maxVisible)}
            className={[
              'relative cursor-pointer overflow-hidden rounded-2xl',
              'border border-primary-200/60 bg-white shadow-sm',
              'transition-all hover:-translate-y-0.5 hover:shadow-lg focus:outline-none',
              'focus-visible:ring-2 focus-visible:ring-primary-500/60',
              'flex items-center justify-center',
            ].join(' ')}
            aria-label="Ver todas las fotos"
          >
            <div className="absolute inset-0 bg-primary-900/5 opacity-0 transition-opacity duration-300 hover:opacity-100" />
            <span className="text-base font-semibold text-primary-900">
              +{extraCount} fotos
            </span>
          </button>
        )}
      </div>
    </section>
  )
}
