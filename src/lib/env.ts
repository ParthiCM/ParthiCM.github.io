import type { Quality } from '@/gl/NodeField'

const mq = (q: string) => (typeof window === 'undefined' ? false : window.matchMedia(q).matches)

export const prefersReducedMotion = () => mq('(prefers-reduced-motion: reduce)')
export const isCoarsePointer = () => mq('(pointer: coarse)')
export const isNarrow = () => typeof window !== 'undefined' && window.innerWidth < 768

/**
 * Pick a starting quality from what the device advertises. This is only
 * the opening guess — `FrameWatch` downgrades further if the measured
 * frame rate disagrees, because hardwareConcurrency lies routinely.
 */
export function guessQuality(): Quality {
  if (isCoarsePointer() || isNarrow()) return 'med'
  const cores = navigator.hardwareConcurrency ?? 8
  if (cores <= 4) return 'med'
  return 'high'
}

/**
 * Watches the real frame rate for a short window after start-up and
 * calls back once if the device cannot hold a usable rate. Sampling
 * stops after the verdict — a permanent monitor would itself cost
 * frames, and the answer does not change mid-session.
 */
export function watchFrameRate(onSlow: () => void, opts = { sampleMs: 2500, floor: 42 }) {
  let frames = 0
  let start = 0
  let raf = 0
  let done = false

  const tick = (now: number) => {
    if (done) return
    if (!start) start = now
    frames++
    const elapsed = now - start
    if (elapsed >= opts.sampleMs) {
      done = true
      const fps = (frames / elapsed) * 1000
      if (fps < opts.floor) onSlow()
      return
    }
    raf = requestAnimationFrame(tick)
  }

  raf = requestAnimationFrame(tick)
  return () => {
    done = true
    cancelAnimationFrame(raf)
  }
}

export function formatIST(): string {
  try {
    return new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false })
  } catch {
    return new Date().toTimeString().slice(0, 8)
  }
}
