import test from 'node:test';
import assert from 'node:assert/strict';
import { configuredSiteUrl } from '../app/site-url';

test('uses only a configured valid origin for metadata', () => {
  const original = process.env.SITE_URL;
  try {
    delete process.env.SITE_URL;
    assert.equal(configuredSiteUrl(), undefined);
    process.env.SITE_URL = 'https://example.org/some-path';
    assert.equal(configuredSiteUrl()?.toString(), 'https://example.org/');
    process.env.SITE_URL = 'http://unknown.example';
    assert.equal(configuredSiteUrl(), undefined);
    process.env.SITE_URL = 'http://localhost:3000';
    assert.equal(configuredSiteUrl()?.toString(), 'http://localhost:3000/');
  } finally {
    if (original === undefined) delete process.env.SITE_URL;
    else process.env.SITE_URL = original;
  }
});
