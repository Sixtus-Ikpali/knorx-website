import { dom } from './setup-dom';
import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import SiteHeader from '../app/components/SiteHeader';
import SiteFooter from '../app/components/SiteFooter';

afterEach(cleanup);

test('mobile navigation exposes its state and restores focus after Escape', () => {
  const view = render(<SiteHeader />);
  const toggle = view.getByRole('button', { name: 'Open menu' });
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  fireEvent.click(toggle);
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(view.getByRole('navigation', { name: 'Mobile navigation' }).getAttribute('hidden'), null);
  assert.equal(dom.window.document.activeElement?.textContent, 'Home');
  const mobile = view.getByRole('navigation', { name: 'Mobile navigation' });
  const menuLinks = mobile.querySelectorAll('a');
  menuLinks[menuLinks.length - 1].focus();
  fireEvent.keyDown(dom.window.document, { key: 'Tab' });
  assert.equal(dom.window.document.activeElement, toggle);
  menuLinks[0].focus();
  fireEvent.keyDown(dom.window.document, { key: 'Tab', shiftKey: true });
  assert.equal(dom.window.document.activeElement, menuLinks[menuLinks.length - 1]);
  fireEvent.keyDown(dom.window.document, { key: 'Escape' });
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(dom.window.document.activeElement, toggle);
  const desktop = view.getByRole('navigation', { name: 'Primary navigation' });
  assert.equal(desktop.querySelectorAll('a').length, 5);
  assert.equal(mobile.querySelectorAll('a').length, 6);
  assert.equal(desktop.querySelector('a[href="/work"]'), null);
  assert.equal(mobile.querySelector('a[href="/work"]'), null);
  assert.doesNotMatch(renderToStaticMarkup(<SiteFooter year={2026} />), /href="\/work"/);
});
