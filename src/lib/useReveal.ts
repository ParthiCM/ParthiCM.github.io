import { useEffect } from 'react'
import { prefersReducedMotion } from './env'

/**
 * Reveals anything carrying [data-rv] as it enters the viewport.
 *
 * Two deliberate choices:
 *  - the pre-state (`opacity: 0`) is applied by a `.js-anim` class that
 *    only exists once this hook runs, so a JS failure leaves a fully
 *    readable page rather than a blank one;
 *  - elements already in view on first paint are revealed immediately,
 *    so the first frame — what a screenshot or a skimming reader gets —
 *    is never a page of invisible text.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const root = document.documentElement
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-rv]'))
    if (!nodes.length) return

    if (prefersReducedMotion()) {
      nodes.forEach((n) => n.classList.add('is-in'))
      return
    }

    root.classList.add('js-anim')

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const el = e.target as HTMLElement
          const delay = Number(el.dataset.rvDelay ?? 0)
          window.setTimeout(() => el.classList.add('is-in'), delay)
          io.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )

    nodes.forEach((n) => {
      const r = n.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) {
        const delay = Number(n.dataset.rvDelay ?? 0)
        window.setTimeout(() => n.classList.add('is-in'), delay)
      } else {
        io.observe(n)
      }
    })

    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
