import { JSDOM } from 'jsdom';

export const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost', pretendToBeVisual: true });
for (const key of ['window', 'self', 'document', 'HTMLElement', 'HTMLFormElement', 'Event', 'Node', 'MutationObserver', 'FormData'] as const) {
  Object.defineProperty(globalThis, key, { configurable: true, value: key === 'window' || key === 'self' ? dom.window : dom.window[key] });
}
