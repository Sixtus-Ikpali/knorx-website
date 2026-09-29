import test from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../app/api/contact/route';

const valid = {
  name: 'Ada Example',
  company: 'Example Ltd',
  email: 'ada@example.com',
  service: 'Technology Consulting',
  message: 'We need to modernize our internal systems.',
};

let requestNumber = 0;
function request(body: unknown, ip?: string) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-real-ip': ip || `test-${++requestNumber}` },
    body: JSON.stringify(body),
  });
}

test('rejects missing, invalid, oversized, and unapproved fields', async () => {
  for (const [body, field] of [
    [{}, 'name'],
    [{ ...valid, email: 'bad-address' }, 'email'],
    [{ ...valid, message: 'x'.repeat(5001) }, 'message'],
    [{ ...valid, service: 'Digital Transformation' }, 'service'],
    [{ ...valid, name: { text: 'Ada' } }, 'name'],
  ] as const) {
    const result = await POST(request(body));
    assert.equal(result.status, 400);
    const json = await result.json();
    assert.ok(json.fields[field]);
  }
});

test('escapes HTML and sends a valid request with validated Reply-To', async (t) => {
  process.env.RESEND_API_KEY = 're_test_dummy';
  process.env.CONTACT_FROM_EMAIL = 'onboarding@resend.dev';
  process.env.CONTACT_TO_EMAIL = 'inbox@example.com';
  t.mock.method(globalThis, 'fetch', async (_input: unknown, init?: RequestInit) => {
    const sent = JSON.parse(String(init?.body));
    assert.equal(sent.reply_to, valid.email);
    assert.equal(sent.from, 'KNORX Technologies <onboarding@resend.dev>');
    assert.match(sent.html, /&lt;script&gt;/);
    assert.doesNotMatch(sent.html, /<script>/);
    assert.equal(sent.to[0], 'inbox@example.com');
    return new Response(JSON.stringify({ id: 'test-message' }), { status: 200, headers: { 'content-type': 'application/json' } });
  });
  const result = await POST(request({ ...valid, message: 'Please review <script>alert(1)</script> securely.' }));
  assert.equal(result.status, 200);
  assert.deepEqual(await result.json(), { success: true });
});

test('returns a safe failure when the provider rejects a request', async (t) => {
  process.env.RESEND_API_KEY = 're_test_dummy';
  process.env.CONTACT_FROM_EMAIL = 'contact@example.com';
  process.env.CONTACT_TO_EMAIL = 'inbox@example.com';
  t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ message: 'private provider detail' }), {
    status: 500, headers: { 'content-type': 'application/json' },
  }));
  const result = await POST(request(valid));
  assert.equal(result.status, 502);
  assert.doesNotMatch(await result.text(), /private provider detail|re_test_dummy/);
});

test('rate limits repeated submissions from one address', async () => {
  const ip = 'rate-test';
  for (let index = 0; index < 5; index++) await POST(request({}, ip));
  const result = await POST(request({}, ip));
  assert.equal(result.status, 429);
});

test('fails safely when mail configuration is absent', async () => {
  delete process.env.RESEND_API_KEY;
  const result = await POST(request(valid));
  assert.equal(result.status, 503);
  assert.doesNotMatch(await result.text(), /RESEND_API_KEY/);
});
