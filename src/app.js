// App shell: sign-in, header, routing. One Store per signed-in student.
/* global __DEMO__ */
import { h } from './ui/dom.js';
import { courses } from './content/index.js';
import { Store } from './store/store.js';
import { LocalBackend, SupabaseBackend } from './store/backends.js';
import { hasSupabase, getClient, currentUser, signInGoogle, signInEmail, signOut, onAuthChange, checkAllowed, requestAccess } from './auth.js';
import { homeView } from './ui/home.js';
import { lessonView } from './ui/lesson.js';
import { chapterTestView, reviewView } from './ui/views.js';
import { dashboardView } from './ui/dashboard.js';
import { dueCount } from './ui/progress.js';
import { accountMenu, initials, applyTheme, getTheme } from './ui/account.js';
import { loadLinkedStudents, loadStudentData, loadRequests, inviteStudent, denyRequest } from './parent.js';
import { emptyState } from './store/state.js';

const CONTENT_VERSION = import.meta.env?.VITE_CONTENT_VERSION || 'dev';

export function createApp(root) {
  const pickCourse = () => {
    let id = null; try { id = localStorage.getItem('ws.course'); } catch { /* storage unavailable */ }
    return courses.find((c) => c.id === id && c.lessons.length) || courses.find((c) => c.lessons.length) || courses[0];
  };
  applyTheme(getTheme());
  const app = { root, courses, course: pickCourse(), store: null, user: null, role: 'student', navigate: (p) => { location.hash = '#' + p; } };

  const shell = (main) => {
    const status = h('span', { class: 'sync', id: 'sync' });
    const due = h('span', { class: 'badge', hidden: true });
    const switcher = courses.filter((c) => c.lessons.length).length > 1 ? h('select', { id: 'course-pick', class: 'coursepick', 'aria-label': 'Course', onchange: (e) => setCourse(e.target.value) }, courses.filter((c) => c.lessons.length).map((c) => h('option', { value: c.id, selected: c.id === app.course.id }, c.title))) : null;
    const nav = (path, label, extra) => h('a', { href: '#' + path, class: 'navlink' + (location.hash.replace('#', '') === path || (path === '/' && !location.hash.replace('#', '')) ? ' on' : '') }, label, extra || null);
    const menu = accountMenu(app.user, app.role, { exportProgress, resetProgress, signOut: async () => { await app.store.flushNow(); await signOut(); app.user = null; start(); } });
    const label = h('label', { class: 'cp' }, h('span', { class: 'lab' }, 'Course'), switcher);
    const header = h('header', { class: 'topbar' }, h('a', { href: '#/', class: 'brand' }, h('span', { class: 'glyph fr' }, h('span', { class: 'n' }, 'x'), h('span', { class: 'd' }, '2')), h('span', { class: 'bname' }, 'Math Workshop')),
      h('nav', {}, nav('/', 'Course'), nav('/review', 'Daily Mix', due), nav('/progress', 'Progress'), app.role === 'parent' ? nav('/family', 'Family') : null), h('div', { class: 'tools' }, switcher ? label : null, status, menu));
    const paint = () => {
      const st = app.store.status;
      status.textContent = __DEMO__ || app.user.guest ? 'Saved in this browser' : st === 'offline' ? 'Offline: will sync' : st === 'saving' ? 'Saving…' : 'Saved';
      status.title = status.textContent; status.setAttribute('role', 'status');
      status.className = 'sync ' + (st === 'offline' ? 'off' : '');
      const n = dueCount(app.store.s, app.course);
      due.hidden = n === 0; due.textContent = String(n);
    };
    app.paint = paint; paint();
    return h('div', { class: 'wrap' }, header, h('main', { id: 'main' }, main));
  };

  function setCourse(id) {
    const c = courses.find((x) => x.id === id); if (!c) return;
    app.course = c; try { localStorage.setItem('ws.course', id); } catch { /* storage unavailable */ }
    document.documentElement.dataset.band = c.band || '';
    app.navigate('/'); render();
  }

  const exportProgress = async () => {
    const attempts = await app.store.getAttempts(5000);
    const blob = new Blob([JSON.stringify({ exported: new Date().toISOString(), state: app.store.s, attempts }, null, 2)], { type: 'application/json' });
    const a = h('a', { href: URL.createObjectURL(blob), download: 'math-workshop-progress.json' });
    document.body.append(a); a.click(); a.remove();
  };
  let resetArmed = false;
  const resetProgress = (e) => {
    const btn = e.currentTarget;
    if (!resetArmed) { resetArmed = true; btn.textContent = 'Tap again to erase everything'; setTimeout(() => { resetArmed = false; btn.textContent = 'Reset progress'; }, 4000); return; }
    app.store.resetAll().then(() => { resetArmed = false; render(); });
  };

  const parse = () => {
    const parts = (location.hash.replace(/^#/, '') || '/').split('/').filter(Boolean);
    return { name: parts[0] || 'home', a: parts[1], b: parts[2] };
  };

  let renderToken = 0;
  async function render() {
    if (!app.store) return;
    const token = ++renderToken;
    const r = parse();
    let main;
    try {
      if (r.name === 'lesson' && app.course.lessonById[r.a]) main = lessonView(app, app.course.lessonById[r.a], r.b);
      else if (r.name === 'chapter' && app.course.chapterById[r.a]) main = chapterTestView(app, app.course.chapterById[r.a]);
      else if (r.name === 'review') main = reviewView(app);
      else if (r.name === 'progress') main = dashboardView(app.course, app.store.s, await app.store.getAttempts(500), null);
      else if (r.name === 'family') main = await familyView();
      else main = homeView(app);
    } catch (err) {
      console.error(err);
      main = h('div', { class: 'sheet' }, h('h2', {}, 'Something went wrong'), h('p', {}, String(err.message || err)), h('button', { class: 'btn', type: 'button', onclick: () => app.navigate('/') }, 'Back to the course'));
    }
    if (token !== renderToken) return;
    root.replaceChildren(shell(main));
    window.scrollTo(0, 0);
  }

  async function requestsPanel(refreshStudents) {
    const box = h('section', { class: 'reqs' });
    const msg = h('p', { class: 'fb', role: 'status' });
    const email = h('input', { class: 'ans wide', id: 'invite-email', type: 'email', placeholder: 'student@example.com', autocomplete: 'off', 'aria-label': 'Student email' });
    const draw = async () => {
      const { requests, invites } = await loadRequests();
      const act = async (fn, okText) => { try { await fn(); msg.className = 'fb ok'; msg.textContent = okText; await draw(); refreshStudents && refreshStudents(); } catch (e) { msg.className = 'fb no'; msg.textContent = e.message; } };
      box.replaceChildren(
        h('h2', {}, 'Access'),
        requests.length ? h('div', { class: 'reqlist' }, requests.map((r) => h('div', { class: 'req' },
          h('div', {}, h('b', {}, r.name || r.email), h('span', { class: 'note' }, ' ' + r.email), r.message ? h('p', { class: 'note' }, '“' + r.message + '”') : null),
          h('div', { class: 'row' },
            h('button', { class: 'btn small', type: 'button', onclick: () => act(() => inviteStudent(r.email), r.email + ' can now sign in.') }, 'Approve'),
            h('button', { class: 'btn ghost small', type: 'button', onclick: () => act(() => denyRequest(r.id), 'Request denied.') }, 'Deny'))))) : h('p', { class: 'note' }, 'No requests waiting.'),
        h('p', { class: 'note' }, 'Add a student by email. They sign in with that address and are linked to you automatically.'),
        h('div', { class: 'row' }, email, h('button', { class: 'btn ghost', type: 'button', onclick: () => { const v = email.value.trim(); if (!v) return; act(async () => { await inviteStudent(v); email.value = ''; }, v + ' added.'); } }, 'Add student')),
        invites.length ? h('p', { class: 'note' }, 'Invited, not signed in yet: ' + invites.map((i) => i.email).join(', ')) : null,
        msg);
    };
    await draw();
    return box;
  }

  async function familyView() {
    const box = h('div', {}, h('h1', {}, 'Family'));
    const holder = h('div', {});
    const chips = h('div', { class: 'students', role: 'group', 'aria-label': 'Students' });
    let loaded = false;
    const show = async (id, students) => {
      chips.querySelectorAll('.scard').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.id === id)));
      holder.replaceChildren(h('p', { class: 'note' }, 'Loading…'));
      const { state, attempts } = await loadStudentData(id);
      holder.replaceChildren(dashboardView(app.course, state || emptyState(), attempts, students.find((s) => s.id === id).name));
    };
    const loadStudents = async () => {
      const students = await loadLinkedStudents();
      chips.replaceChildren(...students.map((s) => h('button', { type: 'button', class: 'scard', 'data-id': s.id, onclick: () => show(s.id, students) }, h('span', { class: 'avatar' }, initials(s.name)), h('b', {}, s.name))));
      if (!students.length) holder.replaceChildren(h('p', { class: 'note' }, 'No students linked yet. Add one below.'));
      else if (!loaded) { loaded = true; await show(students[0].id, students); }
    };
    box.append(chips, holder, await requestsPanel(loadStudents));
    await loadStudents();
    return box;
  }

  function signInView(msg) {
    const email = h('input', { class: 'ans wide', id: 'email', type: 'email', placeholder: 'you@example.com', autocomplete: 'email', 'aria-label': 'Email address' });
    const note = h('p', { class: 'fb', role: 'status' }, msg || '');
    return h('div', { class: 'wrap narrow' },
      h('div', { class: 'sheet signin' },
        h('p', { class: 'eyebrow' }, 'Math Workshop'), h('h1', {}, 'Sign in to save your progress'),
        h('p', {}, 'This is an invite-only course. Use the Google account or email address your parent added.'),
        h('button', { class: 'btn', type: 'button', onclick: async () => { try { await signInGoogle(); } catch (e) { note.className = 'fb no'; note.textContent = e.message; } } }, 'Continue with Google'),
        h('p', { class: 'note' }, 'or get a sign-in link by email'),
        h('div', { class: 'row' }, email, h('button', { class: 'btn ghost', type: 'button', onclick: async () => {
          try { await signInEmail(email.value.trim()); note.className = 'fb ok'; note.textContent = 'Check your inbox for the link.'; } catch (e) { note.className = 'fb no'; note.textContent = e.message; }
        } }, 'Email me a link')), note));
  }

  function requestView(user) {
    const msg = h('textarea', { class: 'ans wide', id: 'req-msg', rows: '2', maxlength: '300', placeholder: 'Optional note, for example who you are', 'aria-label': 'Note for the parent' });
    const note = h('p', { class: 'fb', role: 'status' });
    const send = h('button', { class: 'btn', type: 'button', id: 'req-send', onclick: async () => {
      send.disabled = true;
      try {
        const r = await requestAccess(user.name, msg.value);
        note.className = 'fb ok';
        note.textContent = r === 'allowed' ? 'You were just added. Reload the page.' : r === 'pending' ? 'Your request is already waiting. The parent will see it in the Family tab.' : 'Request sent. The parent will see it in the Family tab. Come back after they approve it.';
      } catch (e) { note.className = 'fb no'; note.textContent = e.message; send.disabled = false; }
    } }, 'Request access');
    return h('div', { class: 'wrap narrow' }, h('div', { class: 'sheet signin' },
      h('h1', {}, 'You are not on the invite list yet'),
      h('p', {}, 'Signed in as ' + (user.email || 'this account') + '. Send a request and the parent will get it.'),
      msg, h('div', { class: 'row' }, send, h('button', { class: 'btn ghost', type: 'button', onclick: async () => { await signOut(); start(); } }, 'Use a different account')), note));
  }

  async function start() {
    root.replaceChildren(h('div', { class: 'wrap' }, h('p', { class: 'note' }, 'Loading…')));
    const user = await currentUser();
    if (!user) { root.replaceChildren(signInView()); return; }
    app.user = user;
    if (!user.guest) {
      const res = await checkAllowed(user.name);
      if (!res.allowed) {
        root.replaceChildren(requestView(user));
        return;
      }
      app.role = res.role;
    }
    let backend;
    if (user.guest) backend = new LocalBackend('guest');
    else { const client = await getClient(); backend = new SupabaseBackend(client, user.id, { onStatus: (s) => { app.store && app.store.setStatus(s); } }); }
    app.store = new Store(backend, { contentVersion: CONTENT_VERSION });
    document.documentElement.dataset.band = app.course.band || '';
    await app.store.init();
    app.store.subscribe(() => app.paint && app.paint());
    if (!app.bound) { // listen once, even if the person signs out and in again
      app.bound = true;
      window.addEventListener('online', () => app.store && app.store.b.flush && app.store.b.flush());
      window.addEventListener('pagehide', () => app.store && app.store.flushNow());
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && app.store) app.store.flushNow(); });
      window.addEventListener('hashchange', () => { if (app.user && app.store) render(); });
    }
    await render();
  }

  app.start = start; app.render = render;
  return app;
}
