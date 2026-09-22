import { capabilities } from '@/data/content'

export function Capabilities() {
  return (
    <section id="capabilities" className="section caps">
      <div className="u-shell">
        <p className="u-label" data-rv>
          03 — Capabilities
        </p>

        <div className="caps__head">
          <h2 className="caps__h" data-rv>
            {capabilities.heading}
          </h2>
          <p className="caps__intro u-mono" data-rv data-rv-delay="80">
            {capabilities.intro}
          </p>
        </div>

        <ul className="caps__grid">
          {capabilities.clusters.map((c, i) => (
            <li
              key={c.n}
              className={`caps__cluster${c.featured ? ' is-featured' : ''}`}
              data-rv
              data-rv-delay={60 * i}
            >
              <div className="caps__cluster-head">
                <span className="caps__n">{c.n}</span>
                <h3 className="caps__t">{c.t}</h3>
              </div>
              <ul className="caps__items">
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="caps__types" data-rv>
          <span className="u-mono caps__types-label">Testing</span>
          <ul>
            {capabilities.testingTypes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
