import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { escapeHtml, parseContact, createRateLimiter, type ContactField } from './validation';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 12_000;
const limiter = createRateLimiter();

function response(error: string, status: number, fields?: Partial<Record<ContactField, string>>) {
  return NextResponse.json({ error, ...(fields ? { fields } : {}) }, { status });
}

function configuredEmail(value: string | undefined): value is string {
  return typeof value === 'string' && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
}

async function readLimitedJson(request: Request): Promise<unknown> {
  const contentLength = Number(request.headers.get('content-length'));
  if (contentLength > MAX_BODY_BYTES) throw new Error('body_too_large');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('invalid_json');
  const chunks: Uint8Array[] = [];
  let size = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new Error('body_too_large');
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
  } catch {
    throw new Error('invalid_json');
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!limiter.take(ip)) return response('Too many requests. Please try again later.', 429);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return response('Invalid request.', 415);

  let body: unknown;
  try {
    body = await readLimitedJson(request);
  } catch (error) {
    return response('Invalid request.', error instanceof Error && error.message === 'body_too_large' ? 413 : 400);
  }

  const result = parseContact(body);
  if (!result.ok) return response('Please check the highlighted fields.', 400, result.fields);
  if (result.value.website) return NextResponse.json({ success: true });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !configuredEmail(from) || !configuredEmail(to)) {
    console.error('Contact delivery unavailable: configuration missing or invalid');
    return response('Message delivery is temporarily unavailable. Please email us directly.', 503);
  }

  const { name, company, email, service, message } = result.value;
  const rows = [
    ['Name', name],
    ...(company ? [['Company', company]] : []),
    ['Email', email],
    ...(service ? [['Service', service]] : []),
    ['Message', message],
  ];
  const html = `<h1>New KNORX website inquiry</h1><table>${rows.map(([label, value]) =>
    `<tr><th scope="row" style="text-align:left;vertical-align:top;padding:8px">${escapeHtml(label)}</th><td style="padding:8px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
  ).join('')}</table>`;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: `KNORX Technologies <${from}>`,
      to: [to],
      replyTo: email,
      subject: 'New KNORX website inquiry',
      html,
    });
    if (error) {
      console.error('Contact delivery failed: provider rejected request');
      return response('Message delivery is temporarily unavailable. Please email us directly.', 502);
    }
    return NextResponse.json({ success: true });
  } catch {
    console.error('Contact delivery failed: provider request error');
    return response('Message delivery is temporarily unavailable. Please email us directly.', 502);
  }
}
