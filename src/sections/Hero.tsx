import { hero } from '@/data/content'
import { site } from '@/data/site'

export function Hero({ open }: { open: boolean }) {
  const cls = (base: string) => `${base}${open ? ' is-open' : ''}`

  // Split the sub on the emphasised phrase so it can carry weight
  // without putting markup in the content file.
  const [before, after] = hero.sub.split(hero.subEmphasis)

  return (
    <section id="hero" className={cls('hero')}>
      <div className="hero__inner u-shell">
        <p className="hero__eyebrow">
          <span className="hero__role">{hero.eyebrowRole}</span>
          <span className="hero__meta">{hero.eyebrowMeta}</span>
        </p>

        <h1 className="hero__h1">
          {hero.headline.map((line, i) => (
            <span className="hero__line" key={line} style={{ ['--d' as string]: `${0.06 + i * 0.11}s` }}>
              <span className={`hero__line-in${i === 2 ? ' is-soft' : ''}`}>{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero__sub">
          {before}
          <b>{hero.subEmphasis}</b>
          {after}
        </p>

        <dl className="hero__stats">
          {hero.stats.map((s) => (
            <div className="hero__stat" key={s.l}>
              <dt className="hero__stat-v">{s.v}</dt>
              <dd className="hero__stat-l">{s.l}</dd>
            </div>
          ))}
        </dl>

        <div className="hero__actions">
          <a className="btn btn--primary" href="#work">
            <span>View work ▸</span>
          </a>
          <a className="btn" href={site.resume} download>
            <span>Resume ↓</span>
          </a>
        </div>

        {site.available && (
          <p className="hero__chip">
            <i aria-hidden="true" />
            {site.availableLabel}
          </p>
        )}
      </div>

      <div className="hero__cue" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero__rail" />
      </div>
    </section>
  )
}
