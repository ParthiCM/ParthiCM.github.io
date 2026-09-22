import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/env'

const CHECKS = ['shaders', 'geometry', 'fonts', 'telemetry'] as const
const DURATION = 1500

export function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)
  const [gone, setGone] = useState(false)
  const finished = useRef(false)

  const finish = () => {
    if (finished.current) return
    finished.current = true
    setN(100)
    setGone(true)
    onDone()
  }

  useEffect(() => {
    // Skip entirely for reduced motion, and for a tab that is not being
    // looked at — otherwise a background tab shows a frozen counter.
    if (prefersReducedMotion() || document.hidden) {
      finish()
      return
    }

    let raf = 0
    const t0 = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - t0) / DURATION, 1)
      setN(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(step)
      else window.setTimeout(finish, 220)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`preload${gone ? ' is-gone' : ''}`} role="status" aria-live="polite">
      <div className="preload__panel">
        <div className="preload__title">Parthiban.sys</div>
        <div className="preload__rule" />
        {CHECKS.map((c, i) => {
          const ok = n >= 22 + i * 20
          return (
            <div key={c} className={`preload__chk${ok ? ' is-ok' : ''}`}>
              <span>▸ {c}</span>
              <b>{ok ? 'PASS' : '....'}</b>
            </div>
          )
        })}
        <div className="preload__bar">
          <i style={{ width: `${n}%` }} />
        </div>
        <div className="preload__n">
          <span>Initialising</span>
          <em>{String(n).padStart(3, '0')}</em>
        </div>
      </div>
      <button type="button" className="preload__skip" onClick={finish}>
        Skip ▸
      </button>
    </div>
  )
}
