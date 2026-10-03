// Request-access screen and the parent's Access panel, with the Supabase calls replaced by stand-ins.
import { describe, it, expect, vi, beforeEach } from 'vitest';

const calls = [];
let user, allowed, role, reqs, invites;
vi.mock('../src/auth.js', () => ({
  hasSupabase: true, getClient: async () => null, signInGoogle: async () => {}, signInEmail: async () => {}, onAuthChange: () => {},
  currentUser: async () => user, signOut: async () => { calls.push('signOut'); user = null; },
  checkAllowed: async () => ({ allowed, role }),
  requestAccess: async (n, m) => { calls.push(['request', n, m]); return 'sent'; },
}));
vi.mock('../src/parent.js', () => ({
  loadLinkedStudents: async () => [],
  loadStudentData: async () => ({ state: null, attempts: [] }),
  loadRequests: async () => ({ requests: reqs, invites }),
  inviteStudent: async (e) => { calls.push(['invite', e]); reqs = reqs.filter((r) => r.email !== e); },
  denyRequest: async (id) => { calls.push(['deny', id]); reqs = reqs.filter((r) => r.id !== id); },
}));
vi.mock('../src/store/backends.js', async (orig) => {
  const m = await orig();
  return { ...m, SupabaseBackend: class extends m.LocalBackend { constructor() { super('test'); } } };
});
const { createApp } = await import('../src/app.js');
window.scrollTo = () => {};
const wait = (ms = 30) => new Promise((r) => setTimeout(r, ms));
const boot = async () => {
  document.body.innerHTML = '<div id="app"></div>';
  const root = document.getElementById('app'); location.hash = '#/';
  const app = createApp(root); await app.start(); return { root, app };
};

describe('access requests', () => {
  beforeEach(() => { calls.length = 0; localStorage.clear(); reqs = []; invites = []; });

  it('an unlisted user can send a request and sign out', async () => {
    user = { id: 'u1', name: 'Sam', email: 'sam@x.com' }; allowed = false;
    const { root } = await boot();
    expect(root.textContent).toContain('not on the invite list');
    root.querySelector('#req-msg').value = 'I am Farhad\'s friend';
    root.querySelector('#req-send').click(); await wait();
    expect(calls).toContainEqual(['request', 'Sam', 'I am Farhad\'s friend']);
    expect(root.textContent).toContain('Request sent');
  });

  it('a parent sees requests, can approve and deny, and can add a student', async () => {
    user = { id: 'p1', name: 'Dad', email: 'dad@x.com' }; allowed = true; role = 'parent';
    reqs = [{ id: 1, email: 'a@x.com', name: 'Ann', message: null }, { id: 2, email: 'b@x.com', name: 'Bo', message: 'hi' }];
    const { root, app } = await boot();
    location.hash = '#/family'; await app.render(); await wait();
    expect(root.textContent).toContain('Ann'); expect(root.textContent).toContain('Bo');
    [...root.querySelectorAll('.req button')].find((b) => b.textContent === 'Approve').click(); await wait();
    expect(calls).toContainEqual(['invite', 'a@x.com']);
    [...root.querySelectorAll('.req button')].find((b) => b.textContent === 'Deny').click(); await wait();
    expect(calls).toContainEqual(['deny', 2]);
    root.querySelector('#invite-email').value = 'kid@x.com';
    [...root.querySelectorAll('button')].find((b) => b.textContent === 'Add student').click(); await wait();
    expect(calls).toContainEqual(['invite', 'kid@x.com']);
    expect(root.textContent).toContain('No requests waiting');
  });

  it('a student does not get the Family tab, and Sign out in the menu works', async () => {
    user = { id: 's1', name: 'Kam', email: 'k@x.com' }; allowed = true; role = 'student';
    const { root } = await boot();
    expect([...root.querySelectorAll('nav a')].map((a) => a.textContent)).not.toContain('Family');
    root.querySelector('.avatar').click();
    expect(root.querySelector('#signout')).not.toBeNull();
    root.querySelector('#signout').click(); await wait();
    expect(calls).toContain('signOut');
  });
});
