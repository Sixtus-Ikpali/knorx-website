import test from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import WorkPage from '../app/work/page';
import ServicesPage from '../app/services/page';
import ApproachPage from '../app/approach/page';
import AboutPage from '../app/about/page';
import ContactPage from '../app/contact/page';
import { projects } from '../app/content';
import { serviceCatalog } from '../app/services';
import { pageMetadata } from '../app/metadata';

test('approved services and project statuses remain consistent', () => {
  assert.deepEqual(serviceCatalog.map(({ title }) => title), [
    'Digital Platforms', 'Application Engineering', 'Enterprise Systems', 'Technology Consulting',
  ]);
  assert.deepEqual(projects.map(({ name, status }) => [name, status]), [
    ['DredgOps', 'Live in Production'],
    ['GeoAttend', 'Live in Production'],
    ['Axiora Health', 'In Development'],
  ]);
});

test('all primary pages render approved content and contact route', async () => {
  require.extensions['.css'] = (module) => { module.exports = { __esModule: true, default: new Proxy({}, { get: (_, key) => String(key) }) }; };
  const { default: HomePage } = await import('../app/page');
  const pages = [HomePage, ServicesPage, WorkPage, ApproachPage, AboutPage, ContactPage];
  const html = pages.map((Page) => renderToStaticMarkup(<Page />));
  assert.match(html[0], /From Complexity to/);
  assert.match(html[0], /Explore Our Work/);
  for (const anchor of ['about', 'services', 'approach', 'contact']) assert.match(html[0], new RegExp(`id="${anchor}"`));
  assert.match(html[1], /Typical Solutions/);
  assert.match(html[2], /Axiora Health/);
  assert.match(html[2], /In Development/);
  assert.match(html[3], /Remote by Design/);
  assert.match(html[4], /understand the problem deeply/);
  assert.match(html[5], /helloknorx@gmail.com/);
  for (const page of html) assert.match(page, /id="main-content"/);
});

test('page metadata uses a canonical only when SITE_URL is configured', () => {
  const previous = process.env.SITE_URL;
  try {
    delete process.env.SITE_URL;
    assert.equal(pageMetadata('Work', 'Selected work', '/work').alternates, undefined);
    process.env.SITE_URL = 'https://example.netlify.app';
    const metadata = pageMetadata('Work', 'Selected work', '/work');
    assert.deepEqual(metadata.alternates, { canonical: '/work' });
    assert.equal(metadata.openGraph?.url, 'https://example.netlify.app/work');
  } finally {
    if (previous === undefined) delete process.env.SITE_URL;
    else process.env.SITE_URL = previous;
  }
});
