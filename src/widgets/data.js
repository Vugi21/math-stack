// Widgets for the data and counting chapters.
import { makeWidget, svg, line, rect, circ, txt, poly, path, numberLine, minus } from './framework.js';
import { gcd } from '../engine/rational.js';

const r2 = (x) => String(Number(x.toFixed(2)));
const frac = (a, b) => { if (b === 0) return '0'; const g = gcd(a, b) || 1; return a / g === 0 ? '0' : (b / g === 1 ? String(a / g) : '{' + a / g + '/' + b / g + '}'); };

// ---------- dataPlot: a dot plot with mean and median marked; add one extra value and watch ----------
export const dataPlot = makeWidget({
  cap: 'Dot plot: mean and median',
  init: (o) => {
    const d = (o.data || [3, 4, 4, 5, 6, 7, 9]);
    const lo = o.lo ?? Math.min(...d) - 1, hi = o.hi ?? Math.max(...d) + 1;
    return { extra: o.extra ?? Math.round((lo + hi) / 2), on: 0, lo: Math.min(lo, o.extra ?? lo), hi: Math.max(hi, o.extra ?? hi) };
  },
  controls: (st, o) => (o.addable === false ? [] : [{ key: 'extra', label: 'extra value', min: st.lo, max: st.hi }]),
  actions: (st, redraw, o) => (o.addable === false ? [] : [{ label: 'Add / remove the extra value', fn: () => { st.on = st.on ? 0 : 1; } }]),
  legend: [['fl-m', 'mean'], ['fl-a', 'median']],
  draw: (st, o) => {
    const base = o.data || [3, 4, 4, 5, 6, 7, 9];
    const data = st.on ? base.concat([st.extra]) : base.slice();
    const sorted = data.slice().sort((a, b) => a - b), n = sorted.length;
    const mean = sorted.reduce((a, b) => a + b, 0) / n;
    const med = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    const cnt = {}; sorted.forEach((v) => { cnt[v] = (cnt[v] || 0) + 1; });
    const top = Math.max(...Object.values(cnt));
    const modes = Object.keys(cnt).filter((k) => cnt[k] === top).map(Number);
    const { s: axis, X } = numberLine(st.lo, st.hi, 24, 536, 150, { every: Math.max(1, Math.ceil((st.hi - st.lo) / 14)) });
    let s = axis;
    const seen = {};
    data.forEach((v, i) => {
      seen[v] = (seen[v] || 0) + 1;
      const isExtra = st.on && i === data.length - 1;
      s += circ(X(v), 150 - 14 - (seen[v] - 1) * 20, 8, 'st-ink ' + (isExtra ? 'fl-bs' : 'fl-a2'));
    });
    s += line(X(med), 16, X(med), 150, 'st-a');
    s += txt(X(med), 12, 'median', 'tx tc');
    s += poly([[X(mean), 156], [X(mean) - 8, 172], [X(mean) + 8, 172]], 'st-ink fl-m');
    s += txt(X(mean), 190, 'mean', 'tx tc');
    return {
      svg: svg(560, 198, s, 'Dot plot of ' + data.length + ' values'),
      text: 'Values: ' + sorted.map(minus).join(', ') + '. Mean = <b>' + r2(mean) + '</b>, median = <b>' + r2(med) + '</b>, mode = <b>' + (top === 1 ? 'none' : modes.join(' and ')) + '</b>, range = <b>' + (sorted[n - 1] - sorted[0]) + '</b>.',
    };
  },
});

// ---------- countingTree: choices at each stage, every branch is one outcome ----------
export const countingTree = makeWidget({
  cap: 'Counting tree',
  init: (o) => ({ a: o.a ?? 3, b: o.b ?? 2, c: o.c ?? 0 }),
  controls: (st, o) => [
    { key: 'a', label: (o.labels || [])[0] || 'first pick', min: 1, max: 3 },
    { key: 'b', label: (o.labels || [])[1] || 'second pick', min: 1, max: 3 },
    { key: 'c', label: (o.labels || [])[2] || 'third (0 = none)', min: 0, max: 3 },
  ],
  draw: (st) => {
    const sizes = [st.a, st.b].concat(st.c ? [st.c] : []);
    const total = sizes.reduce((a, b) => a * b, 1);
    const rowH = Math.min(22, 330 / total), H = total * rowH + 20;
    const colX = [30, 150, 270, 390], leafX = colX[sizes.length];
    // node y positions per level
    let s = '';
    const rec = (level, rowStart, rowsHere, px, py) => {
      if (level === sizes.length) return;
      const k = sizes[level], sub = rowsHere / k;
      for (let i = 0; i < k; i++) {
        const y = 10 + (rowStart + i * sub + sub / 2) * rowH;
        const x = colX[level + 1];
        s += line(px, py, x, y, 'st-soft');
        s += circ(x, y, level === sizes.length - 1 ? 4 : 5, level === sizes.length - 1 ? 'st-ink fl-m' : 'st-ink fl-a2');
        rec(level + 1, rowStart + i * sub, sub, x, y);
      }
    };
    const y0 = 10 + (total * rowH) / 2 - rowH / 2 + rowH / 2;
    s += circ(colX[0], y0, 5, 'st-ink fl-a');
    rec(0, 0, total, colX[0], y0);
    s += txt(leafX + 22, 14, total + ' ends', 'tx tl');
    return {
      svg: svg(520, H, s, 'Tree with ' + total + ' branches'),
      text: sizes.join(' × ') + ' = <b>' + total + '</b> different outcomes. Each yellow dot at the end is one complete outcome.',
    };
  },
});

// ---------- spinner ----------
const SP = ['fl-a', 'fl-m', 'fl-g', 'fl-bs'];
const SPN = ['blue', 'yellow', 'green', 'pink'];
export const spinner = makeWidget({
  cap: 'Spinner',
  init: (o) => ({ s0: o.s0 ?? 3, s1: o.s1 ?? 2, s2: o.s2 ?? 1, s3: 0, tally: [0, 0, 0, 0], spins: 0 }),
  controls: () => [0, 1, 2, 3].map((i) => ({ key: 's' + i, label: SPN[i] + ' slices', min: 0, max: 8 })),
  actions: (st, redraw) => [
    { label: 'Spin 20 times', fn: () => { const sz = [st.s0, st.s1, st.s2, st.s3], tot = sz.reduce((a, b) => a + b, 0); if (!tot) return; for (let k = 0; k < 20; k++) { let r = Math.floor(Math.random() * tot), i = 0; while (r >= sz[i]) { r -= sz[i]; i++; } st.tally[i]++; st.spins++; } } },
    { label: 'Clear tally', fn: () => { st.tally = [0, 0, 0, 0]; st.spins = 0; } },
  ],
  draw: (st) => {
    const sz = [st.s0, st.s1, st.s2, st.s3], tot = sz.reduce((a, b) => a + b, 0);
    const cx = 100, cy = 100, R = 88;
    let s = '', a0 = -Math.PI / 2;
    if (!tot) s += circ(cx, cy, R, 'st-ink fl-s');
    else {
      const slices = [];
      sz.forEach((k, i) => { for (let j = 0; j < k; j++) slices.push(i); });
      slices.forEach((ci, j) => {
        const a1 = a0 + (2 * Math.PI) / tot;
        const p = (a) => [cx + R * Math.cos(a), cy + R * Math.sin(a)];
        const [x0, y0] = p(a0), [x1, y1] = p(a1);
        s += tot === 1 ? circ(cx, cy, R, 'st-ink ' + SP[ci]) : path('M' + cx + ',' + cy + ' L' + x0.toFixed(1) + ',' + y0.toFixed(1) + ' A' + R + ',' + R + ' 0 0 1 ' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' Z', 'st-ink ' + SP[ci]);
        a0 = a1;
      });
    }
    s += poly([[cx, cy], [cx - 5, cy + 14], [cx + 5, cy + 14]], 'st-ink fl-s');
    const lines = sz.map((k, i) => (k ? SPN[i] + ': ' + k + ' of ' + tot + ' = ' + frac(k, tot) : null)).filter(Boolean);
    const spun = st.spins ? ' Tally after ' + st.spins + ' spins: ' + sz.map((k, i) => (k ? SPN[i] + ' ' + st.tally[i] : '')).filter(Boolean).join(', ') + '. Compare with what the fractions predict.' : '';
    return {
      svg: svg(200, 200, s, 'Spinner with ' + tot + ' equal slices'),
      text: tot ? 'All slices are equal, so each is equally likely. P(color) = slices of that color / all slices. ' + lines.join('; ') + '.' + spun : 'Add some slices.',
    };
  },
});

// ---------- venn ----------
export const venn = makeWidget({
  cap: 'Two overlapping groups',
  init: (o) => ({ a: o.onlyA ?? 8, ab: o.both ?? 3, b: o.onlyB ?? 5, out: o.neither ?? 4 }),
  controls: (st, o) => [
    { key: 'a', label: 'only ' + (o.A || 'A'), min: 0, max: 20 }, { key: 'ab', label: 'both', min: 0, max: 20 },
    { key: 'b', label: 'only ' + (o.B || 'B'), min: 0, max: 20 }, { key: 'out', label: 'neither', min: 0, max: 20 },
  ],
  draw: (st, o) => {
    const A = o.A || 'A', B = o.B || 'B';
    let s = rect(4, 4, 392, 190, 'st-ink fl-s');
    s += circ(145, 100, 70, 'st-a fl-a2') + circ(255, 100, 70, 'st-m fl-m');
    s += '<circle class="st-ink fl-none" cx="145" cy="100" r="70"/><circle class="st-ink fl-none" cx="255" cy="100" r="70"/>';
    s += txt(100, 105, st.a, 'tx-b tc') + txt(200, 105, st.ab, 'tx-b tc') + txt(300, 105, st.b, 'tx-b tc') + txt(372, 184, st.out, 'tx-b tc');
    s += txt(110, 26, A, 'tx tc') + txt(290, 26, B, 'tx tc');
    const inA = st.a + st.ab, inB = st.b + st.ab, uni = st.a + st.ab + st.b, tot = uni + st.out;
    return {
      svg: svg(400, 198, s, 'Venn diagram of ' + A + ' and ' + B),
      text: A + ': ' + st.a + ' + ' + st.ab + ' = ' + inA + '. ' + B + ': ' + st.b + ' + ' + st.ab + ' = ' + inB + '. Adding those counts the overlap twice: ' + inA + ' + ' + inB + ' = ' + (inA + inB) + ', but only <b>' + uni + '</b> are in at least one group (' + (inA + inB) + ' − ' + st.ab + '). With the outside, the total is <b>' + tot + '</b>.',
    };
  },
});

// ---------- arrangements: slots with the number of choices for each ----------
export const arrangements = makeWidget({
  cap: 'Slots and choices',
  init: (o) => ({ n: o.n ?? 5, k: o.k ?? 3 }),
  controls: (st, o) => [{ key: 'n', label: (o.nlabel || 'items'), min: 1, max: 8 }, { key: 'k', label: (o.klabel || 'slots'), min: 1, max: 6 }],
  draw: (st, o) => {
    const rep = !!o.repeat;
    const n = st.n, k = rep ? st.k : Math.min(st.k, st.n);
    if (st.k > st.n && !rep) st.k = st.n;
    const w = 70, gap = 12, W = k * (w + gap) + 10;
    let s = '', prod = 1; const parts = [];
    for (let i = 0; i < k; i++) {
      const c = rep ? n : n - i; prod *= c; parts.push(c);
      const x = 6 + i * (w + gap);
      s += rect(x, 20, w, 52, 'st-ink fl-a2') + txt(x + w / 2, 54, c, 'tx-b tc') + txt(x + w / 2, 14, 'slot ' + (i + 1), 'tx tc');
    }
    return {
      svg: svg(Math.max(W, 120), 90, s, k + ' slots'),
      text: parts.join(' × ') + ' = <b>' + prod + '</b> ' + (rep ? '(an item can be reused, so every slot has all ' + n + ' choices)' : '(each pick uses one up, so one fewer choice each time; order matters)') + '.',
    };
  },
});
