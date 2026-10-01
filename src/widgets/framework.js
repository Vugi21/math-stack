// Every interactive picture is a small definition: state, controls, and a draw function.
// draw(state, opts) returns {svg, html, text}. text is lesson markup shown under the picture.
import { h, stepper, numberInput } from '../ui/dom.js';
import { M, esc } from '../engine/format.js';

export const svg = (w, hh, body, label) => '<svg viewBox="0 0 ' + w + ' ' + hh + '" role="img" aria-label="' + esc(label || 'diagram') + '">' + body + '</svg>';

export function makeWidget(def) {
  return (opts = {}) => {
    const st = { ...(typeof def.init === 'function' ? def.init(opts) : def.init) };
    const viz = h('div', { class: 'viz' });
    const ro = h('p', { class: 'readout' });
    let ctls = [];
    const redraw = (fromTyping) => {
      if (!fromTyping) ctls.forEach((c) => c.sync && c.sync());
      const out = def.draw(st, opts);
      viz.innerHTML = (out.svg || '') + M(out.html || '');
      ro.innerHTML = M(out.text || '');
    };
    ctls = def.controls(st, opts).map((c) => (c.input
      ? numberInput(c.label, st, c.key, c.min, c.max, redraw)
      : stepper(c.label, st, c.key, c.min, c.max, redraw, c.step || 1, c.fmt)));
    const acts = def.actions ? def.actions(st, redraw, opts).map((a) => h('button', { class: 'btn ghost small', type: 'button', onclick: () => { a.fn(); redraw(); } }, a.label)) : [];
    const legend = def.legend ? h('div', { class: 'chips' }, def.legend.map(([cls, label]) => h('span', { html: '<i class="chip ' + cls + '"></i>' + label }))) : null;
    const el = h('div', { class: 'wid' }, h('p', { class: 'cap' }, def.cap), h('div', { class: 'ctls' }, ctls, acts), viz, legend, ro);
    redraw();
    return el;
  };
}

// ---- drawing helpers (strings of SVG) ----
export const line = (x1, y1, x2, y2, cls = 'st-soft') => '<line class="' + cls + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>';
export const rect = (x, y, w, hh, cls = 'st-ink fl-s') => '<rect class="' + cls + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '"/>';
export const circ = (cx, cy, r, cls = 'st-ink fl-s') => '<circle class="' + cls + '" cx="' + cx + '" cy="' + cy + '" r="' + r + '"/>';
export const txt = (x, y, s, cls = 'tx tc') => '<text class="' + cls + '" x="' + x + '" y="' + y + '">' + s + '</text>';
export const poly = (pts, cls = 'st-ink fl-s') => '<polygon class="' + cls + '" points="' + pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ') + '"/>';
export const path = (d, cls = 'st-ink') => '<path class="' + cls + '" d="' + d + '"/>';

/** a number line from lo to hi drawn across [x0, x1] at height y, with integer labels */
export function numberLine(lo, hi, x0, x1, y, { every = 1, labels = true } = {}) {
  const X = (v) => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
  let s = line(x0, y, x1, y, 'nl');
  for (let v = lo; v <= hi; v += every) {
    s += line(X(v), y - 6, X(v), y + 6, 'tk');
    if (labels) s += txt(X(v), y + 22, String(v).replace('-', '−'));
  }
  return { s, X };
}

export const minus = (n) => String(n).replace('-', '−');
