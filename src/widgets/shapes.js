// Widgets for Math 4 (shapes). Export each widget built with makeWidget; index.js registers them.
import { makeWidget, svg, line, circ, txt, poly, path } from './framework.js';

const rad = (d) => (d * Math.PI) / 180;

/** a protractor with two rays: read both marks, subtract */
export const angleMeasure = makeWidget({
  cap: 'Read an angle on a protractor',
  init: (o) => ({ from: o.from ?? 0, to: o.to ?? 70 }),
  controls: () => [
    { key: 'from', label: 'first ray reads', min: 0, max: 180, step: 10 },
    { key: 'to', label: 'second ray reads', min: 0, max: 180, step: 10 },
  ],
  draw: ({ from, to }) => {
    const cx = 200, cy = 175, R = 150;
    const P = (d, r) => [cx + r * Math.cos(rad(180 - d)), cy - r * Math.sin(rad(180 - d))];
    let s = path('M' + (cx - R) + ' ' + cy + ' A' + R + ' ' + R + ' 0 0 1 ' + (cx + R) + ' ' + cy + ' Z', 'st-soft fl-none');
    for (let d = 0; d <= 180; d += 10) {
      const a = P(d, R), b = P(d, R - (d % 30 === 0 ? 14 : 8)), t = P(d, R - 28);
      s += line(a[0].toFixed(1), a[1].toFixed(1), b[0].toFixed(1), b[1].toFixed(1), 'tk');
      if (d % 30 === 0) s += txt(t[0].toFixed(1), (t[1] + 4).toFixed(1), String(d), 'tx tc');
    }
    const lo = Math.min(from, to), hi = Math.max(from, to);
    if (hi > lo) {
      const a = P(lo, 60), b = P(hi, 60);
      s += path('M' + cx + ' ' + cy + ' L' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' A60 60 0 0 0 ' + b[0].toFixed(1) + ' ' + b[1].toFixed(1) + ' Z', 'st-ink fl-a2');
    }
    for (const [d, cls] of [[from, 'st-ink'], [to, 'st-a']]) { const e = P(d, R + 10); s += line(cx, cy, e[0].toFixed(1), e[1].toFixed(1), cls); }
    s += circ(cx, cy, 3, 'st-ink fl-ink');
    const diff = hi - lo;
    const kind = diff === 0 ? 'no opening' : diff < 90 ? 'acute' : diff === 90 ? 'right' : diff < 180 ? 'obtuse' : 'straight';
    const text = 'First ray reads <b>' + from + '</b>. Second ray reads <b>' + to + '</b>. The angle between them is ' + hi + ' − ' + lo + ' = <b>' + diff + '°</b> (' + kind + '). Never read the angle off one mark alone unless a ray sits on 0.';
    return { svg: svg(400, 200, s, 'protractor with rays at ' + from + ' and ' + to + ' degrees'), text };
  },
});

/** regular polygon: its lines of symmetry and its turns */
export const symmetryLines = makeWidget({
  cap: 'Lines of symmetry of a regular polygon',
  init: (o) => ({ n: o.n ?? 5, k: o.k ?? 1 }),
  controls: () => [
    { key: 'n', label: 'sides', min: 3, max: 8 },
    { key: 'k', label: 'show line number', min: 1, max: 8 },
  ],
  draw: (st) => {
    const n = st.n, k = ((st.k - 1) % n) + 1;
    const cx = 150, cy = 120, R = 95;
    const pts = [];
    for (let i = 0; i < n; i++) { const t = rad(90 + (360 * i) / n); pts.push([cx + R * Math.cos(t), cy - R * Math.sin(t)]); }
    let s = poly(pts, 'st-ink fl-a2');
    // the n lines are 180/n degrees apart
    const th = rad(90 + (180 * (k - 1)) / n);
    const ux = Math.cos(th), uy = -Math.sin(th), L = R + 18;
    s += line((cx - ux * L).toFixed(1), (cy - uy * L).toFixed(1), (cx + ux * L).toFixed(1), (cy + uy * L).toFixed(1), 'st-a');
    s += circ(cx, cy, 3, 'st-ink fl-ink');
    s += txt(262, 70, n + ' sides', 'tx');
    s += txt(262, 100, n + ' lines of symmetry', 'tx');
    s += txt(262, 130, 'smallest turn: ' + (360 / n) + '°', 'tx');
    const through = n % 2 === 0 ? (k % 2 === 1 ? 'This line joins two opposite corners.' : 'This line joins the middles of two opposite sides.') : 'This line joins a corner to the middle of the opposite side.';
    const text = 'A regular polygon with <b>' + n + '</b> sides has <b>' + n + '</b> lines of symmetry. ' + through + ' It also looks the same after a turn of 360° ÷ ' + n + ' = <b>' + (360 / n) + '°</b>.';
    return { svg: svg(400, 240, s, 'regular polygon with ' + n + ' sides and one line of symmetry'), text };
  },
});
