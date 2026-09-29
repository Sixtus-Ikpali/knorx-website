'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { parseContact, serviceNames, type ContactField } from './api/contact/validation';

type FieldErrors = Partial<Record<ContactField, string>>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const checked = parseContact(payload);
    if (!checked.ok) {
      setErrors(checked.fields);
      setStatus('error');
      setMessage('Please check the highlighted fields.');
      const first = Object.keys(checked.fields)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setLoading(true);
    setStatus('idle');
    setMessage('');
    setErrors({});
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checked.value),
      });
      if (!response.ok) {
        const result: unknown = await response.json().catch(() => null);
        if (result && typeof result === 'object' && 'fields' in result && result.fields && typeof result.fields === 'object') {
          setErrors(result.fields as FieldErrors);
        }
        setStatus('error');
        setMessage(response.status === 429
          ? 'Too many attempts. Please try again later or email us directly.'
          : 'We could not send your message. Please try again or email us directly.');
        return;
      }
      form.reset();
      setStatus('success');
      setMessage('Message sent. Thank you for contacting KNORX.');
    } catch {
      setStatus('error');
      setMessage('We could not send your message. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  }

  function fieldProps(field: ContactField) {
    return {
      id: `contact-${field}`,
      name: field,
      'aria-invalid': Boolean(errors[field]),
      'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
    };
  }

  function fieldError(field: ContactField) {
    return errors[field] ? <span className="field-error" id={`contact-${field}-error`}>{errors[field]}</span> : null;
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate aria-busy={loading}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="contact-name">Full name <span aria-hidden="true">*</span></label>
          <input {...fieldProps('name')} autoComplete="name" maxLength={100} required />
          {fieldError('name')}
        </div>
        <div className="form-field">
          <label htmlFor="contact-company">Company <span className="optional">(optional)</span></label>
          <input {...fieldProps('company')} autoComplete="organization" maxLength={120} />
          {fieldError('company')}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Work email <span aria-hidden="true">*</span></label>
        <input {...fieldProps('email')} type="email" autoComplete="email" maxLength={254} required />
        {fieldError('email')}
      </div>
      <div className="form-field">
        <label htmlFor="contact-service">Service of interest <span className="optional">(optional)</span></label>
        <select {...fieldProps('service')} defaultValue="">
          <option value="">Select a service</option>
          {serviceNames.map((service) => <option key={service} value={service}>{service}</option>)}
        </select>
        {fieldError('service')}
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">What are you working on? <span aria-hidden="true">*</span></label>
        <textarea {...fieldProps('message')} minLength={10} maxLength={5000} required rows={5} />
        {fieldError('message')}
      </div>
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="btn-primary form-submit" disabled={loading}>
        {loading ? <><Loader2 size={18} className="sending-icon" aria-hidden="true" /> Sending…</> : 'Send Message'}
      </button>
      <div className="form-status" role={status === 'error' ? 'alert' : 'status'} aria-live={status === 'error' ? 'assertive' : 'polite'}>
        {status === 'success' && <CheckCircle2 size={18} aria-hidden="true" />}
        {message}
        {status === 'error' && <> <a href="mailto:helloknorx@gmail.com">Email helloknorx@gmail.com</a></>}
      </div>
      <p className="form-privacy">We use your details to respond to your inquiry. <a href="/privacy">How we handle contact details</a></p>
    </form>
  );
}
