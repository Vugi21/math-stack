// Avatar button with an account menu: who you are, theme, export, reset, sign out.
import { h } from './dom.js';

const THEMES = [['system', 'Auto'], ['light', 'Light'], ['dark', 'Dark']];

export function getTheme() {
  try { return localStorage.getItem('ws.theme') || 'system'; } catch { return 'system'; }
}
export function applyTheme(t) {
  const el = document.documentElement;
  if (t === 'light' || t === 'dark') el.dataset.theme = t; else delete el.dataset.theme;
  try { localStorage.setItem('ws.theme', t); } catch { /* storage unavailable */ }
}

export const initials = (name) => {
  const parts = String(name || '?').replace(/@.*/, '').split(/[\s._-]+/).filter(Boolean);
  return ((parts[0] || '?')[0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
};

/** actions: { exportProgress, resetProgress, signOut } */
export function accountMenu(user, role, actions) {
  const btn = h('button', { class: 'avatar', type: 'button', 'aria-haspopup': 'true', 'aria-expanded': 'false', 'aria-controls': 'acct-menu', 'aria-label': 'Account menu for ' + (user.name || 'you') }, initials(user.name));
  const themeBtns = THEMES.map(([v, label]) => h('button', {
    type: 'button', class: 'seg', 'data-theme-opt': v, 'aria-pressed': String(getTheme() === v),
    onclick: () => { applyTheme(v); themeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.themeOpt === v))); },
  }, label));
  const menu = h('div', { class: 'menu', id: 'acct-menu', hidden: true },
    h('div', { class: 'who' }, h('b', {}, user.name || 'Account'),
      h('span', { class: 'note' }, user.guest ? 'Guest mode: progress stays in this browser' : user.email),
      user.guest ? null : h('span', { class: 'role' }, role === 'parent' ? 'Parent' : 'Student')),
    h('div', { class: 'grp' }, h('span', { class: 'lab' }, 'Theme'), h('div', { class: 'segs', role: 'group', 'aria-label': 'Theme' }, themeBtns)),
    h('button', { class: 'item', type: 'button', onclick: actions.exportProgress }, 'Export progress'),
    h('button', { class: 'item', type: 'button', id: 'reset', onclick: actions.resetProgress }, 'Reset progress'),
    user.guest ? null : h('button', { class: 'item out', type: 'button', id: 'signout', onclick: actions.signOut }, 'Sign out'));
  const wrap = h('div', { class: 'acct' }, btn, menu);

  const close = (focus) => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); if (focus) btn.focus(); };
  const open = () => { menu.hidden = false; btn.setAttribute('aria-expanded', 'true'); };
  btn.addEventListener('click', () => (menu.hidden ? open() : close()));
  wrap.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { e.stopPropagation(); close(true); } });
  document.addEventListener('click', (e) => { if (!wrap.isConnected) return; if (!wrap.contains(e.target)) close(); });
  return wrap;
}
