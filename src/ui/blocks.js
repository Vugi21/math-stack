// Renders the Learn page blocks: paragraphs, rule and warning boxes, worked examples, tables, widgets, quick checks.
import { h, mh } from './dom.js';
import { M } from '../engine/format.js';
import { WIDGETS } from '../widgets/index.js';

export function blockEl(b) {
  switch (b.t) {
    case 'p': return mh('p', {}, b.html);
    case 'rule': return mh('p', { class: 'rule' }, b.html);
    case 'def': return h('div', { class: 'def' }, h('span', { class: 'plabel' }, 'Definition'), mh('b', { class: 'term' }, b.term), mh('p', {}, b.html));
    case 'key': return h('div', { class: 'keyidea' }, h('span', { class: 'plabel' }, 'Key idea'), mh('p', {}, b.html));
    case 'formula': return h('div', { class: 'formula' }, h('span', { class: 'plabel' }, b.name), mh('div', { class: 'fx' }, b.expr), b.where ? mh('p', { class: 'where' }, b.where) : null);
    case 'tip': return h('div', { class: 'tipbox' }, h('span', { class: 'plabel' }, 'Tip'), mh('p', {}, b.html));
    case 'recap': return h('div', { class: 'recap' }, h('span', { class: 'plabel' }, 'Remember this'),
      b.terms.length ? h('dl', {}, b.terms.map(([t, d]) => [mh('dt', {}, t), mh('dd', {}, d)])) : null,
      b.formulas.length ? h('ul', { class: 'rf' }, b.formulas.map(([n, e]) => h('li', {}, h('span', { class: 'rn' }, n), mh('span', { class: 'fx' }, e)))) : null);
    case 'warn': return mh('p', { class: 'warn' }, b.html);
    case 'ex': return h('div', { class: 'worked' }, h('span', { class: 'plabel' }, 'Worked example'), mh('p', { class: 'wt' }, b.title),
      h('ol', {}, b.steps.map((s) => mh('li', {}, s))));
    case 'tbl': return h('div', { class: 'tblwrap' }, h('table', { class: 'mini' },
      b.cap ? h('caption', { html: M(b.cap) }) : null,
      h('thead', {}, h('tr', {}, b.head.map((c) => mh('th', {}, c)))),
      h('tbody', {}, b.rows.map((r) => h('tr', {}, r.map((c) => mh('td', {}, String(c))))))));
    case 'widget': {
      const w = WIDGETS[b.kind];
      if (!w) return h('p', { class: 'warn' }, 'Missing widget: ' + b.kind);
      return w(b.opts || {});
    }
    case 'mc': {
      const fb = h('p', { class: 'fb', role: 'status', 'aria-live': 'polite' });
      let solved = false;
      const opts = b.opts.map((o, i) => {
        const btn = h('button', { class: 'opt', type: 'button', html: M(o), onclick: () => {
          if (solved) return;
          if (i === b.ok) { solved = true; btn.classList.add('ok'); fb.className = 'fb ok'; fb.innerHTML = 'Yes. ' + M(b.why); }
          else { btn.classList.add('no'); fb.className = 'fb no'; fb.textContent = 'Not quite. Try another answer.'; }
        } });
        return btn;
      });
      return h('div', { class: 'mc' }, h('span', { class: 'spot' }, b.label || 'Spot the mistake'), mh('p', { class: 'q' }, b.q), h('div', { class: 'choices' }, opts), fb);
    }
    default: return h('span');
  }
}
