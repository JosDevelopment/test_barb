'use client'

import React, {
  useCallback, useEffect, useMemo, useRef, useState,
  forwardRef, useImperativeHandle
} from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X, Plus, Minus, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'

export type ZoomImage = { src: string; alt?: string; title?: string }
type DragStart = { x: number; y: number; tx: number; ty: number }

type ModalModeProps = {
  mode: 'modal'
  img?: ZoomImage
  images?: ZoomImage[]
  initialIndex?: number
  onClose: () => void
}

type InlineModeProps = {
  mode: 'inline'
  img?: ZoomImage
  images?: ZoomImage[]
  index?: number                 // índice controlado por el padre
  initialIndex?: number          // tolerante si lo pasas por error
  onRequestPrev?: () => void
  onRequestNext?: () => void
  onScaleChange?: (s: number) => void
  enableInlineSwipe?: boolean
  showInlineControls?: boolean   // normalmente false (controlas desde Lightbox)
}

type Props = ModalModeProps | InlineModeProps

export type ImageZoomModalHandle = {
  zoomIn: () => void
  zoomOut: () => void
  reset: () => void
  setScale: (s: number) => void
  getScale: () => number
}

const ImageZoomModal = forwardRef<ImageZoomModalHandle, Props>(function ImageZoomModal(props, ref) {
  const hasImages = !!props.images?.length

  // índice interno (para modal o fallback)
  const [innerIndex, setInnerIndex] = useState<number>(props.initialIndex ?? 0)

  // índice controlado (solo inline)
  const controlledIndex: number | undefined =
    props.mode === 'inline' ? (props.index ?? props.initialIndex) : undefined

  // índice efectivo actual
  const currentIndex = controlledIndex ?? innerIndex

  // Mantener innerIndex en rango cuando cambien props/índice
  useEffect(() => {
    if (!hasImages) return
    const max = props.images!.length
    const base = controlledIndex ?? (props.initialIndex ?? innerIndex)
    const clamped = Math.min(Math.max(base, 0), max - 1)
    setInnerIndex(clamped)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasImages, props.images, controlledIndex, props.initialIndex])

  const current: ZoomImage | undefined = useMemo(() => {
    if (!hasImages) return props.img
    return props.images![currentIndex]
  }, [hasImages, props.img, props.images, currentIndex])

  // ===== Zoom & Pan =====
  const [scale, setScale] = useState(1)
  const [tx, setTx] = useState(0)
  const [ty, setTy] = useState(0)
  const [dragging, setDragging] = useState(false)

  const minScale = 1
  const maxScale = 4

  const areaRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const startRef = useRef<DragStart | null>(null)
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null)
  const swipeStartX = useRef<number | null>(null)

  // Avisar escala hacia el padre (inline)
  useEffect(() => {
    if (props.mode === 'inline') props.onScaleChange?.(scale)
  }, [scale, props])

  // Reset duro al cambiar de imagen (garantizado)
  useEffect(() => {
    setScale(1); setTx(0); setTy(0)
  }, [currentIndex])

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

  // tamaño útil del contenedor (restando paddings)
  const getContentSize = useCallback(() => {
    const area = areaRef.current
    if (!area) return { w: 0, h: 0 }
    const rect = area.getBoundingClientRect()
    const cs = getComputedStyle(area)
    const px = parseFloat(cs.paddingLeft || '0') + parseFloat(cs.paddingRight || '0')
    const py = parseFloat(cs.paddingTop || '0') + parseFloat(cs.paddingBottom || '0')
    return { w: rect.width - px, h: rect.height - py }
  }, [])

  // tamaño base de la imagen a scale=1 (tomando tamaño mostrado)
  const getBaseImageSize = useCallback(() => {
    const el = imgRef.current
    if (!el) return { w: 0, h: 0 }
    // con maxWidth/Height 100%, clientWidth/Height == tamaño mostrado
    return { w: el.clientWidth, h: el.clientHeight }
  }, [])

  // límites geométricos del pan
  const clampTranslate = useCallback(
    (nx: number, ny: number, s: number) => {
      const { w: cw, h: ch } = getContentSize()
      const { w: iw, h: ih } = getBaseImageSize()
      if (!cw || !ch || !iw || !ih) return { x: nx, y: ny }
      const sw = iw * s
      const sh = ih * s
      const halfExcessX = Math.max(0, (sw - cw) / 2)
      const halfExcessY = Math.max(0, (sh - ch) / 2)
      return { x: clamp(nx, -halfExcessX, halfExcessX), y: clamp(ny, -halfExcessY, halfExcessY) }
    },
    [getContentSize, getBaseImageSize]
  )

  // Re-clamp en load/resize/scale con cleanup de onload antiguos
  useEffect(() => {
    let cancelled = false
    const reClamp = () => {
      if (cancelled) return
      const { x, y } = clampTranslate(tx, ty, scale)
      if (x !== tx) setTx(x)
      if (y !== ty) setTy(y)
    }
    const el = imgRef.current
    if (el && !el.complete) el.onload = reClamp
    else reClamp()
    window.addEventListener('resize', reClamp)
    return () => {
      cancelled = true
      if (el) el.onload = null
      window.removeEventListener('resize', reClamp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale, current?.src])

  // Teclado (solo modal)
  useEffect(() => {
    if (props.mode !== 'modal') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') props.onClose()
      if (hasImages && scale === 1 && !dragging) {
        if (e.key === 'ArrowLeft') setInnerIndex(i => Math.max(0, i - 1))
        if (e.key === 'ArrowRight') setInnerIndex(i => Math.min((props.images!.length - 1), i + 1))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [props, hasImages, scale, dragging])

  // Zoom hacia punto
  const applyZoomTowards = useCallback(
    (container: HTMLElement, nextScaleRaw: number, origin: { x: number; y: number }) => {
      const nextScale = clamp(nextScaleRaw, minScale, maxScale)
      if (nextScale === scale) return
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2 + tx
      const centerY = rect.top + rect.height / 2 + ty
      const rx = origin.x - centerX
      const ry = origin.y - centerY
      const factor = nextScale / scale
      const nx = tx + rx * (1 - factor)
      const ny = ty + ry * (1 - factor)
      const { x: ctx, y: cty } = clampTranslate(nx, ny, nextScale)
      setTx(ctx); setTy(cty); setScale(nextScale)
    },
    [scale, tx, ty, clampTranslate]
  )

  const centerOrigin = useCallback(() => {
    const rect = areaRef.current?.getBoundingClientRect()
    return rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : { x: 0, y: 0 }
  }, [])

  // Rueda: zoom al cursor
  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    lastMouseRef.current = { x: e.clientX, y: e.clientY }
    const delta = -e.deltaY
    const next = scale + (delta > 0 ? 0.15 : -0.15)
    if (areaRef.current) applyZoomTowards(areaRef.current, next, { x: e.clientX, y: e.clientY })
  }

  // Pan / Swipe
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (scale > 1) {
      areaRef.current?.setPointerCapture(e.pointerId)
      setDragging(true)
      startRef.current = { x: e.clientX, y: e.clientY, tx, ty }
    } else if (hasImages && (props.mode === 'modal' || props.enableInlineSwipe)) {
      areaRef.current?.setPointerCapture(e.pointerId)
      swipeStartX.current = e.clientX
    }
  }

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    lastMouseRef.current = { x: e.clientX, y: e.clientY }
    if (dragging && startRef.current) {
      const dx = e.clientX - startRef.current.x
      const dy = e.clientY - startRef.current.y
      const { x, y } = clampTranslate(startRef.current.tx + dx, startRef.current.ty + dy, scale)
      setTx(x); setTy(y)
    }
  }

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (dragging) {
      setDragging(false)
      startRef.current = null
    } else if (hasImages && swipeStartX.current !== null && scale === 1) {
      const dx = e.clientX - swipeStartX.current
      const threshold = 80
      if (props.mode === 'inline') {
        if (dx > threshold) props.onRequestPrev?.()
        else if (dx < -threshold) props.onRequestNext?.()
      } else {
        if (dx > threshold) setInnerIndex(i => Math.max(0, i - 1))
        else if (dx < -threshold) setInnerIndex(i => Math.min((props.images!.length - 1), i + 1))
      }
      swipeStartX.current = null
    }
  }

  const onDoubleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = scale === 1 ? 2 : 1
    if (areaRef.current) applyZoomTowards(areaRef.current, target, { x: e.clientX, y: e.clientY })
  }

  // API (zoom al CENTRO para botones externos)
  const zoomStepCentered = (dir: 1 | -1) => {
    if (!areaRef.current) return
    const next = scale + 0.2 * dir
    applyZoomTowards(areaRef.current, next, centerOrigin())
  }
  const reset = useCallback(() => { setScale(1); setTx(0); setTy(0) }, [])

  useImperativeHandle(ref, () => ({
    zoomIn: () => zoomStepCentered(+1),
    zoomOut: () => zoomStepCentered(-1),
    reset,
    setScale: (s: number) => { if (areaRef.current) applyZoomTowards(areaRef.current, s, centerOrigin()) },
    getScale: () => scale,
  }), [reset, scale, applyZoomTowards, centerOrigin])

  // ===== Render =====
  if (!current) return null

  const ZoomArea = (
    <div
      ref={areaRef}
      className="relative h-full w-full overflow-hidden touch-pan-y p-6 md:p-8 select-none cursor-grab active:cursor-grabbing z-0"
      onWheel={handleWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={onDoubleClick}
      onMouseMove={(e) => (lastMouseRef.current = { x: e.clientX, y: e.clientY })}
      role={props.mode === 'modal' ? 'dialog' : undefined}
      aria-modal={props.mode === 'modal' ? 'true' : undefined}
    >
      {/* En modal puedes dejar flechas internas si quieres; en inline las maneja el Lightbox */}
      {props.mode === 'modal' && hasImages && scale === 1 && currentIndex > 0 && (
        <button onClick={() => setInnerIndex(i => Math.max(0, i - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/90 hover:text-white" aria-label="Anterior">
          <ChevronLeft size={32} />
        </button>
      )}
      {props.mode === 'modal' && hasImages && scale === 1 && currentIndex < (props.images!.length - 1) && (
        <button onClick={() => setInnerIndex(i => Math.min((props.images!.length - 1), i + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/90 hover:text-white" aria-label="Siguiente">
          <ChevronRight size={32} />
        </button>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <img
          key={current.src}                 // 👈 remonta solo la imagen al cambiar
          ref={imgRef}
          src={current.src}
          alt={current.alt || ''}
          draggable={false}
          className="max-w-none will-change-transform lb-fade-in"  // 👈 clase de animación CSS
          style={{
            transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
            transformOrigin: 'center center',
            maxHeight: '100%',
            maxWidth: '100%',
          }}
        />

      </div>
    </div>
  )

  if (props.mode === 'inline') {
    return <div className="relative h-full w-full">{ZoomArea}</div>
  }

  // ----- Modo MODAL -----
  const portal = (
    <div className="fixed inset-0 z-[100]">
      <motion.button
        type="button"
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={props.onClose}
      />
      <motion.div className="absolute inset-0 flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="flex items-center justify-between p-3 md:p-4">
          <div className="text-white/80 text-sm md:text-base truncate max-w-[70%]">
            {current.title || current.alt || 'Imagen'}
            {hasImages && props.images && (
              <span className="ml-2 text-white/50 text-xs">
                {currentIndex + 1} / {props.images.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl bg-white text-white hover:bg-white/20 cursor-pointer" onClick={() => zoomStepCentered(-1)} aria-label="Alejar">
              <Minus className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl bg-white text-white hover:bg-white/20 cursor-pointer" onClick={() => zoomStepCentered(+1)} aria-label="Acercar">
              <Plus className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl bg-white text-white hover:bg-white/20 cursor-pointer" onClick={reset} aria-label="Reiniciar">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl bg-white/20 text-white hover:bg-white/30" onClick={props.onClose} aria-label="Cerrar">
              <X size={20} />
            </button>
          </div>
        </div>
        {ZoomArea}
      </motion.div>
    </div>
  )

  return createPortal(portal, document.body)
})

export default ImageZoomModal
