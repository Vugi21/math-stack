// Widgets for the geometry chapters. Export each widget built with makeWidget, then it is registered in index.js.
import { makeWidget, svg, line, circ, txt, poly, path, minus } from './framework.js';

const rad = (d) => (d * Math.PI) / 180;
const f2 = (v) => (Math.round(v * 100) / 100).toFixed(2);

/** where does sqrt(n) sit between two whole numbers? */
export const sqrtBetween = makeWidget({
  cap: 'Where does a square root land?',
  init: (o) => ({ n: o.n ?? 20 }),
  controls: () => [{ key: 'n', label: 'number', min: 1, max: 150 }],
  draw: ({ n }) => {
    const k = Math.floor(Math.sqrt(n + 1e-9));
    const exact = k * k === n;
    const r = Math.sqrt(n);
    const lo = k, hi = k + 1, x0 = 30, x1 = 450, y = 70;
    const X = (v) => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
    let s = line(x0, y, x1, y, 'nl');
    for (let i = 0; i <= 10; i++) {
      const v = lo + i / 10;
      s += line(X(v), y - (i % 5 === 0 ? 9 : 5), X(v), y + (i % 5 === 0 ? 9 : 5), 'tk');
      if (i % 5 === 0) s += txt(X(v), y + 28, (i === 0 ? lo : i === 10 ? hi : lo + 0.5) + '');
    }
    s += circ(X(r), y, 6, 'st-ink fl-a2');
    s += txt(X(r), y - 18, '√' + n + ' ≈ ' + f2(r));
    s += txt(x0, 20, lo + '² = ' + lo * lo, 'tx');
    s += txt(x1, 20, hi + '² = ' + hi * hi, 'tx tr');
    const text = exact
      ? 'sqrt[' + n + '] = <b>' + k + '</b> exactly, because ' + k + '^[2] = ' + n + '.'
      : n + ' is between ' + k + '^[2] = ' + k * k + ' and ' + hi + '^[2] = ' + hi * hi + ', so sqrt[' + n + '] is between <b>' + k + '</b> and <b>' + hi + '</b>. It is about ' + f2(r) + '. ' + (r - k < 0.5 ? 'Closer to ' + k + '.' : 'Closer to ' + hi + '.');
    return { svg: svg(480, 110, s, 'square root of ' + n + ' on the number line'), text };
  },
});

/** one angle with its complement, supplement and reflex */
export const angleExplorer = makeWidget({
  cap: 'Make an angle',
  init: (o) => ({ a: o.a ?? 50 }),
  controls: () => [{ key: 'a', label: 'angle (degrees)', min: 0, max: 360, step: 5 }],
  draw: ({ a }) => {
    const cx = 120, cy = 130, R = 100;
    const ex = cx + R * Math.cos(rad(a)), ey = cy - R * Math.sin(rad(a));
    let s = line(cx, cy, cx + R, cy, 'st-ink') + line(cx, cy, ex, ey, 'st-ink');
    if (a > 0 && a < 360) {
      const r2 = 38, sx = cx + r2, sy = cy, tx = cx + r2 * Math.cos(rad(a)), ty = cy - r2 * Math.sin(rad(a));
      s += path('M' + sx + ' ' + sy + ' A' + r2 + ' ' + r2 + ' 0 ' + (a > 180 ? 1 : 0) + ' 0 ' + tx.toFixed(1) + ' ' + ty.toFixed(1), 'st-a fl-none');
    }
    s += circ(cx, cy, 3, 'st-ink fl-ink');
    s += txt(300, 60, a + '°', 'tx tc');
    let kind = a === 0 ? 'zero' : a < 90 ? 'acute' : a === 90 ? 'right' : a < 180 ? 'obtuse' : a === 180 ? 'straight' : a < 360 ? 'reflex' : 'full turn';
    s += txt(300, 90, kind, 'tx tc');
    let t = 'A <b>' + a + '°</b> angle is ' + (kind === 'acute' || kind === 'obtuse' || kind === 'reflex' ? 'an ' + kind : 'a ' + kind) + (kind === 'right' || kind === 'straight' ? ' angle' : '') + '. ';
    if (a <= 90) t += 'Its complement (adds to 90°) is <b>' + (90 - a) + '°</b>. ';
    if (a <= 180) t += 'Its supplement (adds to 180°) is <b>' + (180 - a) + '°</b>. ';
    t += 'The rest of the full turn is ' + (360 - a) + '°.';
    return { svg: svg(400, 170, s, 'an angle of ' + a + ' degrees'), text: t };
  },
});

/** two parallel lines cut by a transversal */
export const transversal = makeWidget({
  cap: 'Parallel lines and a transversal',
  init: (o) => ({ a: o.a ?? 60, pick: o.pick ?? 2 }),
  controls: () => [
    { key: 'a', label: 'angle 2 (degrees)', min: 20, max: 160, step: 10 },
    { key: 'pick', label: 'look at angle', min: 1, max: 8 },
  ],
  draw: ({ a, pick }) => {
    const y1 = 60, y2 = 150, cx = 230, th = rad(a);
    const dx = (y2 - y1) / Math.tan(th); // lower point is dx to the left
    const P = [cx, y1], Q = [cx - dx, y2];
    let s = line(30, y1, 430, y1, 'st-ink') + line(30, y2, 430, y2, 'st-ink');
    // arrow marks on the parallel lines
    s += txt(420, y1 - 6, '▶', 'tx') + txt(420, y2 - 6, '▶', 'tx');
    const ux = Math.cos(th), uy = -Math.sin(th);
    s += line(P[0] + ux * 70, P[1] + uy * 70, Q[0] - ux * 70, Q[1] - uy * 70, 'st-a');
    // sector values and mid-directions (math angles, y up)
    const secs = [
      { id: 1, lo: a, hi: 180, v: 180 - a, c: P },
      { id: 2, lo: 0, hi: a, v: a, c: P },
      { id: 3, lo: 180, hi: 180 + a, v: a, c: P },
      { id: 4, lo: 180 + a, hi: 360, v: 180 - a, c: P },
      { id: 5, lo: a, hi: 180, v: 180 - a, c: Q },
      { id: 6, lo: 0, hi: a, v: a, c: Q },
      { id: 7, lo: 180, hi: 180 + a, v: a, c: Q },
      { id: 8, lo: 180 + a, hi: 360, v: 180 - a, c: Q },
    ];
    const me = secs[pick - 1];
    for (const q of secs) {
      const m = rad((q.lo + q.hi) / 2), r = 30;
      const lx = q.c[0] + r * Math.cos(m), ly = q.c[1] - r * Math.sin(m) + 4;
      if (q.id === pick) {
        const x1 = q.c[0] + 24 * Math.cos(rad(q.lo)), y1b = q.c[1] - 24 * Math.sin(rad(q.lo));
        const x2 = q.c[0] + 24 * Math.cos(rad(q.hi)), y2b = q.c[1] - 24 * Math.sin(rad(q.hi));
        s += path('M' + q.c[0] + ' ' + q.c[1] + ' L' + x1.toFixed(1) + ' ' + y1b.toFixed(1) + ' A24 24 0 0 0 ' + x2.toFixed(1) + ' ' + y2b.toFixed(1) + ' Z', 'st-ink fl-a2');
      }
      s += txt(lx.toFixed(1), ly.toFixed(1), String(q.id), q.id === pick ? 'tx-b tc' : 'tx tc');
    }
    const same = secs.filter((q) => q.v === me.v && q.id !== pick).map((q) => q.id);
    const other = secs.filter((q) => q.v !== me.v).map((q) => q.id);
    const text = 'Angle ' + pick + ' is <b>' + me.v + '°</b>. These angles equal it: ' + same.join(', ') + '. The others (' + other.join(', ') + ') are each ' + (180 - me.v) + '°, its supplement. Only two different sizes appear: ' + a + '° and ' + (180 - a) + '°.';
    return { svg: svg(460, 210, s, 'two parallel lines cut by a transversal'), text };
  },
});

/** angle sum of a regular polygon cut into triangles */
export const polygonAngles = makeWidget({
  cap: 'Cut a polygon into triangles',
  init: (o) => ({ n: o.n ?? 6 }),
  controls: () => [{ key: 'n', label: 'sides', min: 3, max: 12 }],
  draw: ({ n }) => {
    const cx = 130, cy = 115, R = 95;
    const pts = [];
    for (let i = 0; i < n; i++) { const t = rad(90 + (360 * i) / n); pts.push([cx + R * Math.cos(t), cy - R * Math.sin(t)]); }
    let s = poly(pts, 'st-ink fl-a2');
    for (let i = 2; i < n - 1; i++) s += line(pts[0][0], pts[0][1], pts[i][0], pts[i][1], 'st-ink');
    s += txt(300, 70, n + ' sides', 'tx tc');
    s += txt(300, 100, (n - 2) + ' triangles', 'tx tc');
    s += txt(300, 130, (n - 2) + ' × 180° = ' + (n - 2) * 180 + '°', 'tx tc');
    const each = ((n - 2) * 180) / n;
    const text = 'Draw every diagonal from one corner and you get <b>' + (n - 2) + '</b> triangles, so the angles add to <b>' + (n - 2) * 180 + '°</b>. If all ' + n + ' angles are equal, each is ' + (Number.isInteger(each) ? each : f2(each)) + '°. The outside (exterior) turns add to 360°, so each is ' + (Number.isInteger(360 / n) ? 360 / n : f2(360 / n)) + '°.';
    return { svg: svg(400, 230, s, 'a polygon with ' + n + ' sides cut into triangles'), text };
  },
});
