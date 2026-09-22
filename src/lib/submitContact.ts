import { site } from '@/data/site'

const ENDPOINT = 'https://api.web3forms.com/submit'
const RATE_KEY = 'pm_contact_last'
const RATE_MS = 60_000
/** Anything submitted faster than this was not typed by a person. */
const MIN_FILL_MS = 3_000

export type ContactForm = {
  name: string
  email: string
  company: string
  subject: string
  message: string
  botcheck: string
}

export type FieldErrors = Partial<Record<keyof ContactForm | 'form', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validate(f: ContactForm, errors: Record<string, string>): FieldErrors {
  const e: FieldErrors = {}
  if (!f.name.trim()) e.name = errors.name
  if (!EMAIL_RE.test(f.email.trim())) e.email = errors.email
  if (!f.message.trim()) e.message = errors.messageEmpty
  else if (f.message.trim().length < 10) e.message = errors.messageShort
  return e
}

export function rateLimited(): boolean {
  try {
    const last = Number(localStorage.getItem(RATE_KEY) ?? 0)
    return Date.now() - last < RATE_MS
  } catch {
    // Private windows and blocked storage throw. Losing the rate limit
    // is acceptable; breaking the form is not.
    return false
  }
}

function markSent() {
  try {
    localStorage.setItem(RATE_KEY, String(Date.now()))
  } catch {
    /* no-op */
  }
}

export function tooFast(mountedAt: number): boolean {
  return Date.now() - mountedAt < MIN_FILL_MS
}

export async function submitContact(f: ContactForm): Promise<void> {
  const key = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined
  if (!key) {
    throw new Error('Contact endpoint is not configured. Mail me directly at ' + site.email)
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: key,
      subject: `[Portfolio] ${f.subject} — ${f.name}`,
      from_name: 'parthicm.github.io',
      replyto: f.email.trim(),
      name: f.name.trim(),
      email: f.email.trim(),
      company: f.company.trim() || '—',
      enquiry_type: f.subject,
      message: f.message.trim(),
      botcheck: f.botcheck,
    }),
  })

  let payload: { success?: boolean; message?: string } = {}
  try {
    payload = await res.json()
  } catch {
    /* a non-JSON body still tells us nothing useful; fall through */
  }

  if (!res.ok || !payload.success) {
    throw new Error(payload.message || `Transmission failed (${res.status})`)
  }

  markSent()
}
