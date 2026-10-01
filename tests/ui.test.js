// Smoke test: the app boots in guest mode, renders the course map, a lesson in every tab, the review and progress pages.
import { describe, it, expect, beforeEach } from 'vitest';
import { createApp } from '../src/app.js';
import { course } from '../src/content/index.js';

window.scrollTo = () => {};
const wait = (ms = 30) => new Promise((r) => setTimeout(r, ms));

describe('app smoke', () => {
  let root, app;
  beforeEach(async () => {
    localStorage.clear();
    document.body.innerHTML = '<div id="app"></div>';
    root = document.getElementById('app');
    app = createApp(root);
    location.hash = '#/';
    await app.start();
  });
  it('renders the course map', () => { expect(root.textContent).toContain('Prealgebra'); expect(root.querySelectorAll('a').length).toBeGreaterThan(3); });
  it('opens every lesson tab without errors', async () => {
    const l = course.lessons[0];
    for (const tab of ['try', 'learn', 'practice', 'challenge', 'quiz']) {
      location.hash = '#/lesson/' + l.id + '/' + tab; await app.render(); await wait(5);
      expect(root.textContent, tab).not.toContain('Something went wrong');
      expect(root.querySelector('main').children.length).toBeGreaterThan(0);
    }
  });
  it('shows review and progress pages', async () => {
    for (const r of ['/review', '/progress']) { location.hash = '#' + r; await app.render(); expect(root.textContent).not.toContain('Something went wrong'); }
  });
});
