// Widgets for the ratios and percents chapters. Registered through index.js (spread of this module).
import { makeWidget, svg, line, rect, txt } from './framework.js';
import { R, mul, fm } from '../engine/rational.js';

/** a:b scaled by k. Shows k copies of the "batch" as tokens and the scaled table row. */
export const ratioTable = makeWidget({
  cap: 'Ratio table: scale the batch',
  init: (o) => ({ a: o.a ?? 2, b: o.b ?? 3, k: o.k ?? 3 }),
  controls: () => [{ key: 'a', label: 'first part', min: 1, max: 6 }, { key: 'b', label: 'second part', min: 1, max: 6 }, { key: 'k', label: 'batches', min: 1, max: 8 }],
  legend: [['fl-a', 'first quantity'], ['fl-m', 'second quantity']],
  draw: ({ a, b, k }) => {
    const cell = Math.min(22, Math.floor(520 / Math.max(a, b) / k) - 3) || 8, gap = 8, bw = Math.max(a, b) * cell;
    let s = '', y = 4;
    for (const [n, cls, lab] of [[a, 'seg on', 'first'], [b, 'seg onm', 'second']]) {
      for (let j = 0; j < k; j++) for (let i = 0; i < n; i++) s += '<rect class="' + cls + '" x="' + (12 + j * (bw + gap) + i * cell) + '" y="' + y + '" width="' + cell + '" height="' + cell + '"/>';
      y += cell + 6;
    }
    const W = 24 + k * (bw + gap);
    return {
      svg: svg(Math.max(W, 120), y + 2, s, k + ' batches of ' + a + ' and ' + b),
      text: 'One batch is <b>' + a + ' : ' + b + '</b>. With ' + k + ' batches you have ' + a + ' × ' + k + ' = <b>' + a * k + '</b> and ' + b + ' × ' + k + ' = <b>' + b * k + '</b>, so <b>' + a * k + ' : ' + b * k + '</b>. Both parts were multiplied by the same ' + k + ', so it is the same ratio. Total: ' + (a + b) * k + '.',
    };
  },
});

/** Percent change on a bar. pct may be negative. */
export const percentChange = makeWidget({
  cap: 'Percent change on a bar',
  init: (o) => ({ base: o.base ?? 80, pct: o.pct ?? 25 }),
  controls: () => [{ key: 'base', label: 'start', min: 20, max: 200, step: 20 }, { key: 'pct', label: 'change %', min: -100, max: 100, step: 5, fmt: (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + '%' }],
  legend: [['fl-a', 'start amount'], ['fl-m', 'added'], ['fl-bs dashed', 'removed']],
  draw: ({ base, pct }) => {
    const W = 520, maxv = Math.max(base * 2, 1), sc = W / maxv, x0 = 12;
    const change = mul(R(base), R(pct, 100)), fin = R(base).n + change.n / change.d;
    const cv = change.n / change.d;
    let s = rect(x0, 4, base * sc, 34, 'st-ink fl-a') + txt(x0 + 6, 25, base + ' (100%)', 'tx-b tl');
    let y2 = 52;
    if (pct >= 0) {
      s += rect(x0, y2, base * sc, 34, 'st-ink fl-a') + rect(x0 + base * sc, y2, cv * sc, 34, 'st-ink fl-m');
    } else {
      s += rect(x0, y2, (base + cv) * sc, 34, 'st-ink fl-a') + (cv ? rect(x0 + (base + cv) * sc, y2, -cv * sc, 34, 'st-ink fl-bs') : '');
    }
    s += txt(x0 + 6, y2 + 21, 'new: ' + fin, 'tx-b tl');
    const f = R(100 + pct, 100);
    return {
      svg: svg(W + 24, 94, s, 'Bar of ' + base + ' changed by ' + pct + ' percent'),
      text: (pct >= 0 ? 'Increase' : 'Decrease') + ' of ' + Math.abs(pct) + '% of ' + base + ' is <b>' + fm(R(Math.abs(cv * 100), 100)) + '</b>' + '. New amount: ' + base + (pct >= 0 ? ' + ' : ' − ') + fm(R(Math.abs(cv * 100), 100)) + ' = <b>' + fm(R(Math.round(fin * 100), 100)) + '</b>. Shortcut: the new amount is ' + (100 + pct) + '% of the start, a multiplier of <b>' + fm(f) + '</b>.',
    };
  },
});

/** A rate (amount per one unit of the other quantity) times a count of units. */
export const rateModel = makeWidget({
  cap: 'Rate model: equal chunks',
  init: (o) => ({ r: o.r ?? 4, t: o.t ?? 5, per: o.per ?? 'hour', what: o.what ?? 'km' }),
  controls: () => [{ key: 'r', label: 'rate per 1', min: 1, max: 12 }, { key: 't', label: 'how many', min: 1, max: 12 }],
  draw: ({ r, t, per, what }) => {
    const W = 520, cw = W / t;
    let s = '';
    for (let i = 0; i < t; i++) s += rect(12 + i * cw, 6, cw, 36, 'seg on') + txt(12 + i * cw + cw / 2, 29, String(r), 'tx-b tc');
    s += line(12, 52, 12 + W, 52, 'st-m') + txt(12 + W / 2, 72, 'total: ' + r + ' × ' + t + ' = ' + r * t + ' ' + what, 'tx-b tc');
    return {
      svg: svg(W + 24, 80, s, t + ' equal chunks of ' + r),
      text: 'The rate is <b>' + r + ' ' + what + ' per ' + per + '</b>. Each ' + per + ' gives one chunk of ' + r + '. ' + t + ' ' + per + 's give ' + t + ' chunks: <b>' + r * t + ' ' + what + '</b>. Going the other way, ' + r * t + ' ' + what + ' ÷ ' + r + ' = ' + t + ' ' + per + 's.',
    };
  },
});

/** A 10 by 10 grid: percent as "out of 100". */
export const percentGrid = makeWidget({
  cap: 'Hundred grid: percent means out of 100',
  init: (o) => ({ pct: o.pct ?? 35 }),
  controls: () => [{ key: 'pct', label: 'percent', min: 0, max: 100, fmt: (v) => v + '%' }],
  legend: [['fl-a', 'shaded squares']],
  draw: ({ pct }) => {
    const c = 24, x0 = 12, y0 = 4;
    let s = '';
    for (let i = 0; i < 100; i++) {
      const col = i % 10, row = Math.floor(i / 10);
      s += '<rect class="seg' + (i < pct ? ' on' : '') + '" x="' + (x0 + col * c) + '" y="' + (y0 + row * c) + '" width="' + c + '" height="' + c + '"/>';
    }
    const f = R(pct, 100);
    return {
      svg: svg(2 * x0 + 10 * c, y0 + 10 * c + 4, s, pct + ' of 100 squares shaded'),
      text: '<b>' + pct + '%</b> means ' + pct + ' out of 100. As a fraction: {' + pct + '/100}' + (f.d !== 100 ? ' = ' + fm(f) : '') + '. As a decimal: <b>' + pct / 100 + '</b>.',
    };
  },
});
