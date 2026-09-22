import { about } from '@/data/content'
import { site } from '@/data/site'

/**
 * The portrait plate.
 *
 * The photo sits behind the same 1px instrument grid the rest of the
 * site uses, masked to a soft-edged disc so it dissolves into the page
 * rather than sitting in a box, with corner brackets framing it like a
 * viewport. Graded in CSS rather than baked into the file, so the tone
 * can be tuned without regenerating the asset.
 *
 * `loading="lazy"` and explicit dimensions: it is below the fold, and
 * an un-sized image here would shift the whole section on load.
 */
function Plate() {
  return (
    <figure className="about__plate">
      <img
        src="/portrait.jpg"
        alt={`${site.name}, ${site.role}`}
        width={900}
        height={900}
        loading="lazy"
        decoding="async"
      />
      <span className="about__plate-frame" aria-hidden="true" />
    </figure>
  )
}
export function About() {
  return (
    <section id="about" className="section about">
      <div className="u-shell">
        <p className="u-label" data-rv>
          02 â€” About
        </p>

        <div className="about__grid">
          <div className="about__col">
            <h2 className="about__h" data-rv>
              {about.heading}
            </h2>
            {about.body.map((p, i) => (
              <p
                className={`about__p${i === about.body.length - 1 ? ' is-kicker' : ''}`}
                key={i}
                data-rv
                data-rv-delay={60 + i * 40}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="about__aside" data-rv data-rv-delay="120">
            <Plate />
          </div>
        </div>

        <ol className="about__principles">
          {about.principles.map((p, i) => (
            <li key={p.n} data-rv data-rv-delay={80 * i}>
              <span className="about__pn">{p.n}</span>
              <h3 className="about__pt">{p.t}</h3>
              <p className="about__pd">{p.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
