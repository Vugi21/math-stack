// Widgets for Math 4 (numbers4). Export each widget built with makeWidget; index.js registers them.
import { makeWidget, svg, rect, txt } from './framework.js';

/** Base 2 place-value strip: flip bits, see the binary numeral and the decimal value. */
export const baseTwo = makeWidget({
  cap: 'Base 2 switches',
  init: (o) => {
    const bits = Math.max(2, Math.min(8, o.bits ?? 6));
    return { bits, v: Math.max(0, Math.min(2 ** bits - 1, o.value ?? 0)) };
  },
  controls: () => [],
  actions: (st, redraw, o) => {
    const bits = Math.max(2, Math.min(8, o.bits ?? 6));
    const acts = [];
    for (let i = bits - 1; i >= 0; i--) {
      acts.push({ label: 'Flip ' + 2 ** i, fn: () => { st.v ^= 1 << i; } });
    }
    acts.push({ label: 'Add 1', fn: () => { st.v = st.v + 1 > 2 ** st.bits - 1 ? 0 : st.v + 1; } });
    acts.push({ label: 'Double', fn: () => { if (st.v * 2 <= 2 ** st.bits - 1) st.v *= 2; } });
    acts.push({ label: 'Clear', fn: () => { st.v = 0; } });
    return acts;
  },
  draw: ({ bits, v }) => {
    const w = 44, gap = 6;
    let s = '', terms = [], str = '';
    for (let i = bits - 1; i >= 0; i--) {
      const on = (v >> i) & 1, x = 6 + (bits - 1 - i) * (w + gap);
      s += txt(x + w / 2, 18, 2 ** i, 'tx tc dim');
      s += rect(x, 26, w, 44, on ? 'st-ink fl-a' : 'st-soft fl-s');
      s += txt(x + w / 2, 56, on, 'tx-b tc');
      str += on;
      if (on) terms.push(2 ** i);
    }
    const width = bits * (w + gap) + 6;
    const text = '<b>' + str + '</b>_[2] = ' + (terms.length ? terms.join(' + ') + ' = ' : '') + '<b>' + v + '</b> in base 10.';
    return { svg: svg(width, 80, s, 'Binary digits ' + str + ' with value ' + v), text };
  },
});
