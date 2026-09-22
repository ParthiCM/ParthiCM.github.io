import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projectBySlug, projects, type CaseBlock } from '@/data/work'
import { Footer } from '@/sections/Footer'
import { useReveal } from '@/lib/useReveal'
import NotFound from './NotFound'

/** Renders **bold** spans and `code` spans without pulling in a markdown lib. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
        if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>
        return <span key={i}>{p}</span>
      })}
    </>
  )
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.kind) {
    case 'p':
      return (
        <p className="case__p">
          <RichText text={block.text} />
        </p>
      )
    case 'quote':
      return (
        <blockquote className="case__quote">
          <p>{block.text}</p>
        </blockquote>
      )
    case 'list':
      return (
        <ul className="case__list">
          {block.items.map((it, i) => (
            <li key={i}>
              <RichText text={it} />
            </li>
          ))}
        </ul>
      )
    case 'pre':
      return (
        <figure className="case__pre">
          <pre>{block.text}</pre>
          {block.caption && <figcaption className="u-mono">{block.caption}</figcaption>}
        </figure>
      )
  }
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = projectBySlug(slug)

  useReveal([slug])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (project) document.title = `${project.title} — Parthiban Murugan`
    return () => {
      document.title = 'Parthiban Murugan — Senior QA Automation Engineer (SDET)'
    }
  }, [project])

  if (!project) return <NotFound />

  const idx = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(idx + 1) % projects.length]

  return (
    <>
      <main id="main" className="case">
        <div className="u-shell">
          <Link to="/#work" className="case__back u-mono">
            ← Back to work
          </Link>

          <header className="case__head">
            <p className="case__n u-mono">
              {project.n} — Case study
              {project.proprietary && <em className="case__badge">Production work · not open source</em>}
            </p>
            <h1 className="case__title">{project.title}</h1>
            <p className="case__tagline">{project.tagline}</p>

            <ul className="case__stack">
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <div className="case__links">
              {project.demo && (
                <a className="btn btn--primary" href={project.demo} target="_blank" rel="noopener noreferrer">
                  <span>Live demo ↗</span>
                </a>
              )}
              {project.repo && (
                <a className="btn" href={project.repo} target="_blank" rel="noopener noreferrer">
                  <span>View on GitHub ↗</span>
                </a>
              )}
            </div>
          </header>

          {project.draft && (
            <p className="case__draft u-mono" role="note">
              ⚠ {project.draft}
            </p>
          )}

          <div className="case__body">
            {project.sections.map((s) => (
              <section className="case__section" key={s.heading} data-rv>
                <h2 className="case__h2">{s.heading}</h2>
                {s.blocks.map((b, i) => (
                  <Block block={b} key={i} />
                ))}
              </section>
            ))}

            <section className="case__section case__outcomes" data-rv>
              <h2 className="case__h2">Outcome</h2>
              <ul className="case__outcome-list">
                {project.outcomes.map((o) => (
                  <li key={o}>
                    <span aria-hidden="true">✓</span>
                    <RichText text={o} />
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <nav className="case__next" aria-label="Next project">
            <Link to={`/work/${next.slug}`}>
              <span className="u-mono">Next · {next.n === project.n ? 'Back to' : ''} case study</span>
              <strong>{next.title}</strong>
              <em aria-hidden="true">→</em>
            </Link>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  )
}
