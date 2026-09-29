import test from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import SiteFooter from '../app/components/SiteFooter';

test('footer renders the year supplied by the server', () => {
  const first = renderToStaticMarkup(<SiteFooter year={2040} />);
  const next = renderToStaticMarkup(<SiteFooter year={2041} />);
  assert.match(first, /2040 KNORX Technologies/);
  assert.doesNotMatch(first, /2041 KNORX Technologies/);
  assert.match(next, /2041 KNORX Technologies/);
});
