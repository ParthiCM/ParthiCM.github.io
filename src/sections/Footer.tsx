import { footer } from '@/data/content'
import { site } from '@/data/site'

export function Footer() {
  return (
    <footer className="footer">
      <div className="u-shell footer__inner">
        <div className="footer__id">
          <p className="footer__name">{site.name}</p>
          <p className="footer__role u-mono">{site.role}</p>
        </div>

        <p className="footer__built">
          {footer.built}
          <br />
          <em>{footer.tested}</em>
        </p>

        <ul className="footer__links u-mono">
          <li>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`}>Email ↗</a>
          </li>
        </ul>
      </div>

      <p className="footer__sign u-mono">
        {footer.signoff} · © {new Date().getFullYear()}
      </p>
    </footer>
  )
}
