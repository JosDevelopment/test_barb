/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MotionConfig, motion, useMotionValue, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Plus, Minus, RotateCcw } from 'lucide-react'
import ThumbnailCarousel from './ThumbnailCarousel'
import type { ImageZoomModalHandle, ZoomImage } from './ImageZoomModal'
import ImageZoomModal from './ImageZoomModal'

interface Props {
  images: ZoomImage[]
  initialIndex?: number
  onClose: () => void
}

export default function Lightbox({ images, initialIndex = 0, onClose }: Props) {
  const [page, setPage] = useState(initialIndex)
  const imageIndex = useMemo(
    () => ((page % images.length) + images.length) % images.length,
    [page, images.length]
  )

  const zoomRef = useRef<ImageZoomModalHandle>(null)
  const [inlineScale, setInlineScale] = useState(1)

  // motionValue para el drag horizontal; sin animaciones de entrada/salida
  const x = useMotionValue(0)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const hardCenter = useCallback(() => {
    x.set(0) // fuerza el wrapper al centro sin animar
  }, [x])

  const goTo = useCallback((i: number) => {
    if (i === imageIndex) return
    zoomRef.current?.reset() // limpia zoom/offset antes de cambiar
    hardCenter()
    setPage(i)
  }, [imageIndex, hardCenter])

  const paginate = useCallback((dir: 1 | -1) => {
    if ((dir === -1 && imageIndex <= 0) || (dir === 1 && imageIndex >= images.length - 1)) return
    zoomRef.current?.reset()
    hardCenter()
    setPage(prev => prev + dir)
  }, [imageIndex, images.length, hardCenter])

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (inlineScale !== 1) { hardCenter(); return }
    const offset = info.offset.x
    const velocity = info.velocity.x
    if (offset > 100 || velocity > 500) {
      paginate(-1)
    } else if (offset < -100 || velocity < -500) {
      paginate(1)
    } else {
      // si no pagina, recentra
      hardCenter()
    }
  }

  return (
    <MotionConfig>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
        {/* Fondo */}
        <div className="fixed inset-0 bg-[#000d]" onClick={onClose} />

        {/* Controles (zoom + cerrar) */}
        <div className="absolute top-5 right-5 z-50 flex items-center gap-2">
          <button className="p-2 rounded-xl bg-gray-500 text-white hover:bg-gray-400 cursor-pointer"
                  onClick={() => zoomRef.current?.zoomOut()} aria-label="Alejar">
            <Minus className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-xl bg-gray-500 text-white hover:bg-gray-400 cursor-pointer"
                  onClick={() => zoomRef.current?.zoomIn()} aria-label="Acercar">
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-xl bg-gray-500 text-white hover:bg-gray-400 cursor-pointer"
                  onClick={() => zoomRef.current?.reset()} aria-label="Reiniciar">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="p-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600 cursor-pointer" aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        {/* Fila: chevron izq / visor / chevron der (sin animaciones de página) */}
        <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center px-2">
          <div className="flex w-full items-stretch gap-4">
            <div className="shrink-0 flex items-center">
              {imageIndex > 0 && (
                <button
                  onClick={() => paginate(-1)}
                  className="p-2 text-white hover:text-gray-300 transition cursor-pointer"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={32} />
                </button>
              )}
            </div>

            <div className="relative flex-1 h-[70vh] max-h-[calc(100vh-160px)]">
              <motion.div
                className="absolute inset-0"
                style={{ x }}                 // << sin animate; solo controlamos x
                drag={inlineScale === 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0}               // << sin “elástico” para que no quede offset residual
                dragMomentum={false}          // << sin inercia
                onDragEnd={handleDragEnd}
              >
                <ImageZoomModal
                  ref={zoomRef}
                  mode="inline"
                  images={images}
                  index={imageIndex}
                  onScaleChange={setInlineScale}
                  enableInlineSwipe={false}
                  onRequestPrev={() => paginate(-1)}
                  onRequestNext={() => paginate(1)}
                  showInlineControls={false}
                />
              </motion.div>
            </div>

            <div className="shrink-0 flex items-center">
              {imageIndex < images.length - 1 && (
                <button
                  onClick={() => paginate(1)}
                  className="p-2 text-white hover:text-gray-300 transition cursor-pointer"
                  aria-label="Siguiente"
                >
                  <ChevronRight size={32} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Thumbnails centrados */}
        <div className="w-full max-w-5xl mt-6 px-3">
          <ThumbnailCarousel
            images={images}
            currentIndex={imageIndex}
            onSelect={(i) => goTo(i)}
          />
        </div>
      </div>
    </MotionConfig>
  )
}
