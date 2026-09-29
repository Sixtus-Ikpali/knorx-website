import { dom } from './setup-dom';
import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import ContactForm from '../app/ContactForm';
const originalFetch = globalThis.fetch;

afterEach(() => {
  cleanup();
  globalThis.fetch = originalFetch;
});

function fillValidForm(container: HTMLElement) {
  fireEvent.change(container.querySelector('#contact-name')!, { target: { value: 'Ada Example' } });
  fireEvent.change(container.querySelector('#contact-email')!, { target: { value: 'ada@example.com' } });
  fireEvent.change(container.querySelector('#contact-message')!, { target: { value: 'Please discuss our new application.' } });
}

test('labels fields and announces validation errors', () => {
  const view = render(<ContactForm />);
  assert.ok(view.getByLabelText(/Full name/));
  assert.ok(view.getByLabelText(/Work email/));
  assert.ok(view.getByLabelText(/What are you working on/));
  fireEvent.submit(view.container.querySelector('form')!);
  assert.match(view.getByRole('alert').textContent || '', /highlighted fields/i);
  assert.equal(view.container.querySelector('#contact-email')?.getAttribute('aria-invalid'), 'true');
  assert.ok(view.container.querySelector('#contact-email-error'));
  assert.equal(dom.window.document.activeElement?.id, 'contact-name');
});

test('shows loading and announces success after a valid submission', async () => {
  let finish!: (response: Response) => void;
  globalThis.fetch = () => new Promise<Response>((resolve) => { finish = resolve; });
  const view = render(<ContactForm />);
  fillValidForm(view.container);
  fireEvent.submit(view.container.querySelector('form')!);
  assert.equal((view.getByRole('button', { name: /Sending/ }) as HTMLButtonElement).disabled, true);
  finish(Response.json({ success: true }));
  await waitFor(() => assert.match(view.getByRole('status').textContent || '', /Message sent/));
  assert.equal((view.container.querySelector('#contact-name') as HTMLInputElement).value, '');
});

test('announces a safe failure and offers a clickable email fallback', async () => {
  globalThis.fetch = async () => Response.json({ error: 'provider detail' }, { status: 502 });
  const view = render(<ContactForm />);
  fillValidForm(view.container);
  fireEvent.submit(view.container.querySelector('form')!);
  await waitFor(() => assert.match(view.getByRole('alert').textContent || '', /could not send/i));
  assert.doesNotMatch(view.getByRole('alert').textContent || '', /provider detail/);
  assert.equal(view.getByRole('link', { name: /Email helloknorx@gmail.com/ }).getAttribute('href'), 'mailto:helloknorx@gmail.com');
});
