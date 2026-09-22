import { useEffect, useRef, useState } from 'react'
import { NodeField, type Quality } from '@/gl/NodeField'
import { guessQuality, isCoarsePointer, prefersReducedMotion, watchFrameRate } from '@/lib/env'

type Props = {
  /** Set true once the preloader has cleared, to fire the opening push-in. */
  started: boolean
  /** Disable entirely (case-study routes render without the field). */
  active?: boolean
}

/**
 * Owns the canvas and the NodeField instance, and feeds it scroll
 * progress. Kept outside the router's animated tree so the scene is
 * never torn down and rebuilt on a route change.
 */
export function Scene({ started, active = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fieldRef = useRef<NodeField | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const quality: Quality = guessQuality()
    const field = new NodeField(canvas, { reduced: prefersReducedMotion(), quality })

    if (!field.ok) {
      setFailed(true)
      return
    }

    fieldRef.current = field
    field.start()

    // hardwareConcurrency is a poor predictor. Measure, then downgrade.
    const stopWatch = watchFrameRate(() => {
      field.setQuality(quality === 'high' ? 'med' : 'low')
    })

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      field.progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
    }

    const onPointer = (e: PointerEvent) => {
      field.setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1))
    }

    // Stop rendering when the tab is hidden — no reason to burn a
    // laptop battery animating a field nobody is looking at.
    const onVisibility = () => (document.hidden ? field.stop() : field.start())

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', field.resize)
    document.addEventListener('visibilitychange', onVisibility)
    if (!isCoarsePointer()) window.addEventListener('pointermove', onPointer, { passive: true })

    onScroll()

    return () => {
      stopWatch()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', field.resize)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointer)
      field.dispose()
      fieldRef.current = null
    }
  }, [])

  useEffect(() => {
    if (started) fieldRef.current?.intro()
  }, [started])

  useEffect(() => {
    if (!fieldRef.current) return
    if (active) fieldRef.current.start()
    else fieldRef.current.stop()
  }, [active])

  if (failed) return <div className="scene-fallback" aria-hidden="true" />

  return <canvas ref={canvasRef} className="scene" aria-hidden="true" />
}
