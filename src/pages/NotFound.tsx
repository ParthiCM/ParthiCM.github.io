import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main id="main" className="nf">
      <div className="u-shell nf__inner">
        <div className="assert assert--fail nf__assert" role="alert">
          <pre>
            {`✗  ROUTE NOT FOUND

expected:  a page
received:  undefined

1 failed  (0.0s)`}
          </pre>
        </div>
        <Link className="btn btn--primary" to="/">
          <span>Return to /</span>
        </Link>
      </div>
    </main>
  )
}
