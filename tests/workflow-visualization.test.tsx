import { dom } from './setup-dom';
import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

async function component() {
  require.extensions['.css'] = (module) => { module.exports = { __esModule: true, default: new Proxy({}, { get: (_, key) => String(key) }) }; };
  return (await import('../app/components/WorkflowVisualization')).default;
}

test('renders the complete continuous cycle without the former visual heading', async () => {
  const WorkflowVisualization = await component();
  const html = renderToStaticMarkup(<WorkflowVisualization />);
  assert.doesNotMatch(html, /KNORX \/ DELIVERY LOGIC/);
  for (const stage of ['Discover', 'Define', 'Design', 'Build', 'Deploy', 'Evolve']) assert.match(html, new RegExp(stage));
  assert.match(html, /then Discover again/);
  assert.equal((html.match(/class="node stage/g) || []).length, 6);
  assert.equal((html.match(/class="indicator stage/g) || []).length, 6);
});

test('keyboard focus and mobile selection emphasize the chosen stage', async () => {
  const WorkflowVisualization = await component();
  const view = render(<WorkflowVisualization />);
  const root = view.getByRole('group', { name: /continuous KNORX delivery process/i });
  const desktopDesign = view.getByRole('button', { name: 'Design, stage 3 of 6' });
  fireEvent.focus(desktopDesign);
  assert.equal(root.getAttribute('data-interacting'), 'true');
  assert.equal(desktopDesign.getAttribute('data-selected'), 'true');
  fireEvent.blur(desktopDesign);
  assert.equal(root.getAttribute('data-interacting'), 'false');

  const mobileDeploy = view.getByRole('button', { name: 'Show Deploy, stage 5 of 6' });
  fireEvent.click(mobileDeploy, { detail: 1 });
  assert.equal(mobileDeploy.getAttribute('aria-pressed'), 'true');
  assert.match(dom.window.document.querySelector('[aria-live="polite"]')?.textContent || '', /Showing Deploy/);
});
