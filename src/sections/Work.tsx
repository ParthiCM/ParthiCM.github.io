import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects, workIntro } from '@/data/work'
import { prefersReducedMotion } from '@/lib/env'

/**
 * The lateral dolly.
 *
 * A tall outer container with a sticky viewport inside it: vertical
 * scroll through the container is translated into horizontal movement
 * of the track, while the 3D camera behind it dollies sideways on the
 * same progress. The parallax between the two is what sells the depth.
 *
 * Built on sticky + transform rather than a pinning library: fewer
 * moving parts, no layout thrash, and it cannot leave the page in a
 * pinned state if something throws mid-scroll.
 *
 * Below 900px, or under reduced motion, it degrades to a plain
 * vertical stack. Scroll-jacking a phone is user-hostile.
 */
export function Work() {
  const outer = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [lateral, setLateral] = useState(false)

  useEffect(() => {
    const decide = () => setLateral(window.innerWidth >= 900 && !prefersReducedMotion())
    decide()
    window.addEventListener('resize', decide)
    return () => window.removeEventListener('resize', decide)
  }, [])

  useEffect(() => {
    if (!lateral) {
      setProgress(0)
      return
    }
    const el = outer.current
    const tr = track.current
    if (!el || !tr) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const scrollable = el.offsetHeight - window.innerHeight
      if (scrollable <= 0) return setProgress(0)
      const p = Math.min(Math.max(-rect.top / scrollable, 0), 1)
      setProgress(p)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [lateral])

  /**
   * Keyboard escape from the jack. Tabbing to a card that is currently
   * translated off-screen would otherwise focus something invisible, so
   * we scroll the window to the vertical position that brings it into
   * view. Without this the section is a keyboard trap.
   */
  useEffect(() => {
    if (!lateral) return
    const el = outer.current
    if (!el) return

    const onFocus = (e: FocusEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('[data-panel]')
      if (!card) return
      const i = Number(card.dataset.panel)
      const scrollable = el.offsetHeight - window.innerHeight
      const target = el.offsetTop + (scrollable * i) / Math.max(projects.length - 1, 1)
      window.scrollTo({ top: target, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }

    el.addEventListener('focusin', onFocus)
    return () => el.removeEventListener('focusin', onFocus)
  }, [lateral])

  // The track is N panels of 100vw each, so its own width is N * 100vw.
  // Travelling from the first panel to the last means moving (N-1)
  // panels, which as a percentage of the track is (N-1)/N.
  const n = projects.length
  const shift = lateral ? progress * ((n - 1) / n) * 100 : 0
  const activeIndex = Math.round(progress * (n - 1))

  const cards = projects.map((p, i) => (
    <article className="work__panel" key={p.slug} data-panel={i}>
      <div className="work__panel-inner">
        <div className="work__panel-head">
          <span className="work__n u-mono">{p.n}</span>
          {p.proprietary && <span className="work__badge u-mono">Production work</span>}
        </div>

        <h3 className="work__title">{p.title}</h3>
        <p className="work__tagline">{p.tagline}</p>
        <p className="work__card">{p.card}</p>

        <ul className="work__stack">
          {p.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <div className="work__links">
          <Link className="btn btn--primary" to={`/work/${p.slug}`}>
            <span>Read case study ▸</span>
          </Link>
          {p.demo && (
            <a className="btn" href={p.demo} target="_blank" rel="noopener noreferrer">
              <span>Live demo ↗</span>
            </a>
          )}
          {p.repo && (
            <a className="btn" href={p.repo} target="_blank" rel="noopener noreferrer">
              <span>GitHub ↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  ))

  return (
    <section id="work" className="section work">
      <div className="u-shell work__head">
        <p className="u-label" data-rv>
          05 — Selected work
        </p>
        <h2 className="work__h" data-rv>
          {workIntro.heading}
        </h2>
      </div>

      {lateral ? (
        <div
          className="work__outer"
          ref={outer}
          style={{ height: `${projects.length * 100}vh` }}
        >
          <div className="work__sticky">
            <div
              className="work__track"
              ref={track}
              style={{ transform: `translate3d(-${shift}%, 0, 0)` }}
            >
              {cards}
            </div>

            <div className="work__rail" aria-hidden="true">
              {projects.map((p, i) => (
                <i key={p.slug} className={i === activeIndex ? 'is-active' : undefined} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="u-shell work__stackv">{cards}</div>
      )}
    </section>
  )
}
