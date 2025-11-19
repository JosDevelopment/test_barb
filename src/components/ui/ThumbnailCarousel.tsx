'use client'

import { useEffect, useRef } from 'react'

type ZoomImage = { src: string; alt?: string; title?: string }

interface Props {
  images: ZoomImage[]
  currentIndex: number
  onSelect: (index: number) => void
}

export default function ThumbnailCarousel({ images, currentIndex, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Centrar la miniatura activa
  useEffect(() => {
    const c = containerRef.current
    if (!c) return
    const el = c.children[currentIndex] as HTMLElement | undefined
    if (!el) return

    const containerW = c.clientWidth
    const itemW = el.offsetWidth
    const target = el.offsetLeft - (containerW - itemW) / 2
    const max = Math.max(0, c.scrollWidth - c.clientWidth)
    const clamped = Math.min(Math.max(target, 0), max)

    c.scrollTo({ left: clamped, behavior: 'smooth' })
  }, [currentIndex, images.length])

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-auto space-x-3 py-2 px-1 rounded-lg"
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#fff transparent' }}
      onWheel={(e) => {
        // scroll horizontal con rueda vertical
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
          e.currentTarget.scrollLeft += e.deltaY
          e.preventDefault()
        }
      }}
    >
      {images.map((img, i) => (
        <button
          key={`${img.src}-${i}`}
          onClick={() => onSelect(i)}
          className={`flex-shrink-0 relative w-20 h-12 rounded-md overflow-hidden transition-transform duration-300
            ${i === currentIndex ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:scale-105 hover:opacity-80'}`}
          aria-current={i === currentIndex ? 'true' : undefined}
        >
          <div className="relative h-24 w-24 overflow-hidden rounded-md">
            <img
              src={img.src}
              alt={img.alt || `Thumbnail ${i + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
              sizes="96px"
              loading={i === currentIndex ? 'eager' : 'lazy'}
            />
          </div>

        </button>
      ))}
    </div>
  )
}
