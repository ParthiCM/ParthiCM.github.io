import { Suspense, lazy, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { Scene } from '@/components/Scene'
import { Preloader } from '@/components/Preloader'
import { Cursor, FilmFx, Letterbox, TopBar } from '@/components/Chrome'
import { prefersReducedMotion } from '@/lib/env'
import Home from '@/pages/Home'

// Case studies are a separate route most visitors never reach, so
// they load on demand rather than in the initial bundle.
const CaseStudy = lazy(() => import('@/pages/CaseStudy'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Never smooth-scroll touch: it fights the platform's own
      // momentum and makes a phone feel broken.
      syncTouch: false,
    })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}

/** Anchor links need handling once Lenis owns the scroll position. */
function useHashScroll(ready: boolean) {
  const { hash, pathname } = useLocation()
  useEffect(() => {
    if (!ready || pathname !== '/' || !hash) return
    const el = document.querySelector(hash)
    if (el) {
      window.setTimeout(
        () => el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' }),
        60,
      )
    }
  }, [hash, pathname, ready])
}

export default function App() {
  const [open, setOpen] = useState(false)
  // Kept separate from `open` so the overlay can finish fading out.
  // Unmounting it the instant `open` flips would cut the reveal dead —
  // and the whole point of the sequence is that the curtain lifts on a
  // camera that is already moving.
  const [showPreload, setShowPreload] = useState(true)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => setShowPreload(false), 900)
    return () => window.clearTimeout(id)
  }, [open])

  useLenis()
  useHashScroll(open)

  // Route changes get a short curtain wipe rather than a hard cut.
  const [wiping, setWiping] = useState(false)
  useEffect(() => {
    if (prefersReducedMotion()) return
    setWiping(true)
    const id = window.setTimeout(() => setWiping(false), 520)
    return () => window.clearTimeout(id)
  }, [pathname])

  return (
    <div className={`app${open ? ' is-open' : ''}`}>
      <a className="u-skip" href="#main">
        Skip to content
      </a>

      <Scene started={open} active={isHome} />
      <FilmFx />
      <Letterbox open={open} />
      <TopBar />
      <Cursor />

      <div className={`wipe${wiping ? ' is-wiping' : ''}`} aria-hidden="true" />

      <Suspense fallback={<div className="route-fallback u-mono">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home open={open} />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {showPreload && <Preloader onDone={() => setOpen(true)} />}
    </div>
  )
}
