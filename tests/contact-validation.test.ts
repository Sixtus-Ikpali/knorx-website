import test from 'node:test';
import assert from 'node:assert/strict';
import { createRateLimiter, escapeHtml, parseContact, serviceNames } from '../app/api/contact/validation';

const valid = {
  name: 'Ada Example',
  company: 'Example Ltd',
  email: 'ada@example.com',
  service: 'Digital Platforms',
  message: 'We need a secure customer portal.',
};

test('accepts a valid contact request and trims text', () => {
  const result = parseContact({ ...valid, name: '  Ada Example  ' });
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.value.name, 'Ada Example');
});

test('requires name, email, and message', () => {
  const result = parseContact({ service: '' });
  assert.equal(result.ok, false);
  if (!result.ok) assert.deepEqual(Object.keys(result.fields).sort(), ['email', 'message', 'name']);
});

test('rejects malformed email and non-string fields', () => {
  const email = parseContact({ ...valid, email: 'bad-address' });
  assert.equal(email.ok, false);
  if (!email.ok) assert.ok(email.fields.email);
  const types = parseContact({ ...valid, name: { unexpected: true }, message: 10 });
  assert.equal(types.ok, false);
  if (!types.ok) {
    assert.ok(types.fields.name);
    assert.ok(types.fields.message);
  }
});

test('rejects oversized fields', () => {
  for (const [field, length] of [['name', 101], ['company', 121], ['email', 255], ['message', 5001]] as const) {
    const result = parseContact({ ...valid, [field]: 'x'.repeat(length) });
    assert.equal(result.ok, false, field);
    if (!result.ok) assert.ok(result.fields[field], field);
  }
});

test('allows exactly the four approved service names', () => {
  assert.equal(serviceNames.length, 4);
  for (const service of serviceNames) assert.equal(parseContact({ ...valid, service }).ok, true);
  const result = parseContact({ ...valid, service: 'Digital Transformation' });
  assert.equal(result.ok, false);
  if (!result.ok) assert.ok(result.fields.service);
});

test('escapes script-like content for the email HTML', () => {
  const result = parseContact({ ...valid, message: '<script>alert("x")</script> & more' });
  assert.equal(result.ok, true);
  const encoded = escapeHtml('<script>alert("x")</script> & more');
  assert.equal(encoded, '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; more');
  assert.ok(!encoded.includes('<script>'));
});

test('limits requests per address and resets after the window', () => {
  let now = 1000;
  const limiter = createRateLimiter(() => now);
  for (let index = 0; index < 5; index++) assert.equal(limiter.take('one'), true);
  assert.equal(limiter.take('one'), false);
  assert.equal(limiter.take('two'), true);
  now += 15 * 60 * 1000;
  assert.equal(limiter.take('one'), true);
});
