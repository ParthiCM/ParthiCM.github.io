import { useMemo, useRef, useState } from 'react'
import { contact } from '@/data/content'
import { site } from '@/data/site'
import {
  rateLimited,
  submitContact,
  tooFast,
  validate,
  type ContactForm,
  type FieldErrors,
} from '@/lib/submitContact'

type Status = 'idle' | 'sending' | 'success' | 'error'

const EMPTY: ContactForm = {
  name: '',
  email: '',
  company: '',
  subject: contact.subjects[0],
  message: '',
  botcheck: '',
}

function CopyRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard can be blocked; the text is on screen regardless */
    }
  }

  return (
    <div className="contact__row">
      <span className="contact__row-label u-mono">{label}</span>
      {href ? (
        <a className="contact__row-value" href={href} target="_blank" rel="noopener noreferrer">
          {value} <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="contact__row-value">{value}</span>
      )}
      {!href && (
        <button type="button" className="contact__copy" onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
          <span className="u-sr"> {label}</span>
        </button>
      )}
    </div>
  )
}

export function Contact() {
  const [form, setForm] = useState<ContactForm>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [failMsg, setFailMsg] = useState('')
  const [elapsed, setElapsed] = useState('0.0')
  const mountedAt = useMemo(() => Date.now(), [])
  const formRef = useRef<HTMLFormElement>(null)

  const set = (k: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return

    const found = validate(form, contact.errors as unknown as Record<string, string>)
    if (Object.keys(found).length) {
      setErrors(found)
      const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
      first?.focus()
      return
    }

    if (form.botcheck || tooFast(mountedAt)) {
      setStatus('error')
      setFailMsg(contact.errors.bot)
      return
    }

    if (rateLimited()) {
      setStatus('error')
      setFailMsg(contact.errors.rate)
      return
    }

    const t0 = performance.now()
    setStatus('sending')
    try {
      await submitContact(form)
      setElapsed(((performance.now() - t0) / 1000).toFixed(1))
      setStatus('success')
    } catch (err) {
      setElapsed(((performance.now() - t0) / 1000).toFixed(1))
      setFailMsg(err instanceof Error ? err.message : 'Transmission failed')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="u-shell">
        <p className="u-label" data-rv>
          06 — Contact
        </p>

        <div className="contact__grid">
          <div className="contact__intro">
            <h2 className="contact__h" data-rv>
              {contact.heading}
            </h2>
            <p className="contact__sub" data-rv data-rv-delay="60">
              {contact.sub}
            </p>

            <div className="contact__rows" data-rv data-rv-delay="120">
              <CopyRow label="Email" value={site.email} />
              <CopyRow label="Phone" value={site.phone} />
              <CopyRow label="LinkedIn" value="in/parthibanmurugan" href={site.linkedin} />
              <CopyRow label="GitHub" value="ParthiCM" href={site.github} />
              <div className="contact__row">
                <span className="contact__row-label u-mono">Location</span>
                <span className="contact__row-value">Chennai, India · IST (UTC+5:30)</span>
              </div>
            </div>

            <a className="btn" href={site.resume} download data-rv data-rv-delay="160">
              <span>Download resume .pdf ↓</span>
            </a>
          </div>

          <div className="contact__formwrap" data-rv data-rv-delay="100">
            {status === 'success' ? (
              <div className="assert assert--pass" role="status">
                <pre>
                  {`✓  name            valid
✓  email           valid
✓  message         valid
✓  transmission    200 OK

1 passed  (${elapsed}s)`}
                </pre>
                <p>Message received. I&rsquo;ll get back to you within a day or two.</p>
              </div>
            ) : (
              <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
                {/* Honeypot: off-screen, unfocusable, hidden from AT. */}
                <div className="form__hp" aria-hidden="true">
                  <label htmlFor="botcheck">Leave this empty</label>
                  <input
                    id="botcheck"
                    name="botcheck"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.botcheck}
                    onChange={set('botcheck')}
                  />
                </div>

                <div className="form__row">
                  <div className="field">
                    <label htmlFor="cf-name" className="u-mono">
                      Name *
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'cf-name-err' : undefined}
                      disabled={status === 'sending'}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="field__err u-mono" id="cf-name-err">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="cf-email" className="u-mono">
                      Email *
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="you@company.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'cf-email-err' : undefined}
                      disabled={status === 'sending'}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="field__err u-mono" id="cf-email-err">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="form__row">
                  <div className="field">
                    <label htmlFor="cf-company" className="u-mono">
                      Company
                    </label>
                    <input
                      id="cf-company"
                      type="text"
                      value={form.company}
                      onChange={set('company')}
                      placeholder="Optional"
                      disabled={status === 'sending'}
                      autoComplete="organization"
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="cf-subject" className="u-mono">
                      Subject *
                    </label>
                    <select
                      id="cf-subject"
                      value={form.subject}
                      onChange={set('subject')}
                      disabled={status === 'sending'}
                    >
                      {contact.subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="cf-message" className="u-mono">
                    Message *
                  </label>
                  <textarea
                    id="cf-message"
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="What's on your mind?"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'cf-message-err' : undefined}
                    disabled={status === 'sending'}
                  />
                  {errors.message && (
                    <p className="field__err u-mono" id="cf-message-err">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`btn btn--primary form__submit${status === 'sending' ? ' is-sending' : ''}`}
                  disabled={status === 'sending'}
                >
                  <span>{status === 'sending' ? 'Running…' : 'Run ▸ Send message'}</span>
                </button>

                {status === 'error' && (
                  <div className="assert assert--fail" role="alert">
                    <pre>
                      {`✗  transmission    FAILED

1 failed  (${elapsed}s)`}
                    </pre>
                    <p>
                      {failMsg}. Mail me directly:{' '}
                      <a href={`mailto:${site.email}`}>{site.email}</a>
                    </p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
