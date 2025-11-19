/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useMemo, useState } from 'react'
import Mosaic from './Mosaic'
import Lightbox from './Ligthbox'
import type { TemplateMediaType } from '../../types/content/globalTypes'
import type { ZoomImage } from './ImageZoomModal'

type Props = { items: TemplateMediaType[] }

export default function MediaGallery({ items }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // 1) Solo imágenes (para Mosaic + Lightbox), tipadas como ZoomImage
  const imagesOnly: ZoomImage[] = useMemo(
    () =>
      items
        .filter((m) => m.type === 'image' && (m as any).src)
        .map((m) => ({
          src: (m as any).src as string,
          alt: ((m as any).alt as string) ?? '',
          title: ((m as any).title as string) ?? ((m as any).alt as string) ?? '',
        })),
    [items]
  )

  // 2) Videos (sección aparte, sin cambios)
  const videos = useMemo(() => items.filter((m) => m.type === 'video'), [items])

  const openLightbox = (imageIdx: number) => {
    setLightboxIndex(imageIdx)
    setLightboxOpen(true)
  }

  return (
    <>
      {/* MOSAICO de imágenes */}
      {imagesOnly.length > 0 && (
        <Mosaic images={imagesOnly} openLightbox={openLightbox} />
      )}

      {/* VIDEOS */}
      {videos.length > 0 && (
        <section className="mt-4">
          <h3 className="mb-3 text-base font-semibold">Videos</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {videos.map((v: any, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-primary-200/60 bg-black shadow-sm"
              >
                <div className="relative aspect-[16/9] w-full">
                  {v.poster ? (
                    <>
                      <div className="relative w-full h-full overflow-hidden rounded-xl">
                        <img
                          src={v.poster}
                          alt={v.caption ?? `Video ${i + 1}`}
                          className="absolute inset-0 h-full w-full object-cover opacity-95"
                        />
                      </div>

                      <div className="pointer-events-none absolute inset-0 grid place-items-center">
                        <span className="rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-primary-900 shadow-sm transition group-hover:scale-105">
                          ▶ Reproducir
                        </span>
                      </div>
                    </>
                  ) : null}
                  <video
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    poster={v.poster}
                  >
                    {v.sources?.map((s: any, si: number) => (
                      <source key={si} src={s.src} type={s.type} />
                    ))}
                    {v.src ? <source src={v.src} /> : null}
                  </video>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* LIGHTBOX (solo imágenes) */}
      {lightboxOpen && imagesOnly.length > 0 && (
        <Lightbox
          images={imagesOnly}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}
