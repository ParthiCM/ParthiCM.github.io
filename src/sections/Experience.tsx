import { useState } from 'react'
import { experience } from '@/data/content'

export function Experience() {
  const [openEdu, setOpenEdu] = useState(false)

  return (
    <section id="experience" className="section exp">
      <div className="u-shell">
        <p className="u-label" data-rv>
          04 — Experience
        </p>

        <h2 className="exp__h" data-rv>
          {experience.heading}
        </h2>

        <ol className="exp__timeline">
          {experience.stations.map((s, i) => (
            <li className="exp__station" key={s.n} data-rv data-rv-delay={60 * i}>
              <div className="exp__marker" aria-hidden="true">
                <i className={s.current ? 'is-current' : undefined} />
              </div>

              <div className="exp__body">
                <p className="exp__period u-mono">
                  {s.period}
                  {s.current && <em className="exp__now">Current</em>}
                </p>
                <h3 className="exp__role">{s.role}</h3>
                <p className="exp__company">
                  {s.company}
                  <span className="exp__meta"> · {s.meta}</span>
                </p>
                <p className="exp__summary">{s.summary}</p>

                <ul className="exp__points">
                  {s.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>

                <ul className="exp__stack">
                  {s.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <ul className="exp__recognition" data-rv>
          {experience.recognition.map((r) => (
            <li key={r}>
              <span aria-hidden="true">◆</span>
              {r}
            </li>
          ))}
        </ul>

        <div className="exp__edu" data-rv>
          <button
            type="button"
            className="exp__edu-toggle"
            aria-expanded={openEdu}
            onClick={() => setOpenEdu((v) => !v)}
          >
            <span className="u-mono">Education &amp; certifications</span>
            <i aria-hidden="true">{openEdu ? '−' : '+'}</i>
          </button>

          {openEdu && (
            <div className="exp__edu-body">
              <p className="exp__degree">{experience.education.degree}</p>
              <p className="exp__degree-note">{experience.education.note}</p>
              <ul className="exp__certs">
                {experience.education.certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
