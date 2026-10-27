import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { clientOrganizations, knorxProduct } from '../app/showcase';

test('homepage separates the three client organizations from the KNORX-owned product', async () => {
  require.extensions['.css'] = (module) => { module.exports = { __esModule: true, default: new Proxy({}, { get: (_, key) => String(key) }) }; };
  const { default: HomePage } = await import('../app/page');
  const html = renderToStaticMarkup(<HomePage />);
  const clientsEnd = html.indexOf('Built by KNORX');
  assert.ok(clientsEnd > 0);
  assert.equal(clientOrganizations.length, 3);
  for (const organization of clientOrganizations) {
    assert.ok(existsSync(join(process.cwd(), 'public', organization.logo.slice(1))), `${organization.logo} is missing`);
    assert.match(html.slice(0, clientsEnd), new RegExp(`${organization.name} logo`));
  }
  assert.ok(existsSync(join(process.cwd(), 'public', knorxProduct.logo.slice(1))));
  assert.doesNotMatch(html.slice(0, clientsEnd), /Axiora Health logo/);
  assert.match(html.slice(clientsEnd), /Axiora Health logo/);
  assert.match(html.slice(clientsEnd), /A KNORX-owned product/);
  assert.match(html.slice(clientsEnd), /In Development/);
});
