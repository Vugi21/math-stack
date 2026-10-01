import { M } from '../engine/format.js';

/** hyperscript: h('div', {class:'x', onclick: fn, html:'<b>hi</b>'}, child, child) */
export function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === false || v === null || v === undefined) continue;
    if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat(Infinity)) {
    if (kid === null || kid === undefined || kid === false) continue;
    e.append(kid.nodeType ? kid : document.createTextNode(kid));
  }
  return e;
}
export const mh = (tag, attrs, markup, ...kids) => h(tag, { ...attrs, html: M(markup) }, ...kids);

export const SVGNS = 'http://www.w3.org/2000/svg';
export const clear = (el) => { el.replaceChildren(); return el; };

let uid = 0;
export const nextId = (p = 'x') => p + '-' + (++uid);

/** a − [value] + control used by the widgets */
export function stepper(label, state, key, min, max, onchange, step = 1, fmtFn = null) {
  const out = h('output', { class: 'val' }, String(state[key]));
  const hi = () => (typeof max === 'function' ? max() : max);
  const lo = () => (typeof min === 'function' ? min() : min);
  const show = () => { out.textContent = fmtFn ? fmtFn(state[key]) : String(state[key]); };
  const bump = (d) => { state[key] = Math.max(lo(), Math.min(hi(), +(state[key] + d * step).toFixed(6))); onchange(); };
  const el = h('div', { class: 'ctl' }, h('span', { class: 'lab' }, label),
    h('button', { class: 'step', type: 'button', 'aria-label': 'Decrease ' + label, onclick: () => bump(-1) }, '−'), out,
    h('button', { class: 'step', type: 'button', 'aria-label': 'Increase ' + label, onclick: () => bump(1) }, '+'));
  el.sync = () => { state[key] = Math.max(lo(), Math.min(hi(), state[key])); show(); };
  show();
  return el;
}

/** a number box for values that are awkward to step to, such as 360 */
export function numberInput(label, state, key, min, max, onchange) {
  const inp = h('input', { class: 'ninp', type: 'number', inputmode: 'numeric', 'aria-label': label, id: nextId('n') });
  inp.value = state[key];
  inp.addEventListener('input', () => {
    const v = parseInt(inp.value, 10);
    if (Number.isFinite(v)) { state[key] = Math.max(typeof min === 'function' ? min() : min, Math.min(typeof max === 'function' ? max() : max, v)); onchange(true); }
  });
  const el = h('div', { class: 'ctl' }, h('span', { class: 'lab' }, label), inp);
  el.sync = () => { if (document.activeElement !== inp) inp.value = state[key]; };
  return el;
}
