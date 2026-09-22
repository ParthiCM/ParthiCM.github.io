import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { site, sections } from '@/data/site'
import { formatIST, isCoarsePointer, prefersReducedMotion } from '@/lib/env'

/* ------------------------------------------------------------ Film FX */

/**
 * Grain is generated once into a 128px tile and animated by stepping
 * its background-position — cheaper by far than redrawing noise per
 * frame, and indistinguishable at this opacity.
 */
export function FilmFx() {
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    const s = 128
    const c = document.createElement('canvas')
    c.width = c.height = s
    const ctx = c.getContext('2d')
    if (!ctx) return
    const img = ctx.createImageData(s, s)
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (Math.random() * 255) | 0
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v
      img.data[i + 3] = 255
    }
    ctx.putImageData(img, 0, 0)
    setUrl(c.toDataURL())
  }, [])

  return (
    <>
      <div className="fx-vignette" aria-hidden="true" />
      <div className="fx-grain" aria-hidden="true" style={url ? { backgroundImage: `url(${url})` } : undefined} />
    </>
  )
}

/* ---------------------------------------------------------- Letterbox */

export function Letterbox({ open }: { open: boolean }) {
  return (
    <div className={`letterbox${open ? ' is-open' : ''}`} aria-hidden="true">
      <i className="letterbox__t" />
      <i className="letterbox__b" />
    </div>
  )
}

/* ------------------------------------------------------------- TopBar */

export function TopBar() {
  const [clock, setClock] = useState(formatIST)

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatIST()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header className="topbar">
      <Link to="/" className="topbar__brand">
        <span className="topbar__lamps" aria-hidden="true">
          <i className="is-on" />
          <i className="is-on" />
          <i />
        </span>
        <b>Parthiban.sys</b>
      </Link>
      <div className="topbar__coords">
        <span className="topbar__geo">
          {site.geo.lat} · {site.geo.lon}
        </span>
        <span>
          IST <em>{clock}</em>
        </span>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------- DotNav */

export function DotNav() {
  const [active, setActive] = useState<string>('hero')

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((e): e is HTMLElement => Boolean(e))
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        // The section occupying the most of the viewport wins, which is
        // steadier than "first intersecting" when two sections overlap.
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (best) setActive(best.target.id)
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: '-10% 0px -10% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  return (
    <nav className="dotnav" aria-label="Sections">
      <ul>
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className={active === s.id ? 'is-active' : undefined}>
              <span className="dotnav__n">{s.n}</span>
              <span className="dotnav__label">{s.label}</span>
              <span className="u-sr">{active === s.id ? ' (current section)' : ''}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* ------------------------------------------------------------- Cursor */

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isCoarsePointer() || prefersReducedMotion()) return
    const d = dot.current
    const r = ring.current
    if (!d || !r) return

    let tx = 0
    let ty = 0
    let rx = 0
    let ry = 0
    let raf = 0

    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      d.style.transform = `translate(${tx}px, ${ty}px)`
    }

    const loop = () => {
      rx += (tx - rx) * 0.16
      ry += (ty - ry) * 0.16
      r.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }

    const over = (e: Event) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, input, textarea, select')) r.classList.add('is-big')
    }
    const out = (e: Event) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, input, textarea, select')) r.classList.remove('is-big')
    }

    document.body.classList.add('has-cursor')
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)
    raf = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
