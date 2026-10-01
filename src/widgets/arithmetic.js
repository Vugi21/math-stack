// Widgets for Chapters 1 to 3: number line, arrays, primes, factors, divisibility, exponents.
import { makeWidget, svg, line, rect, txt, poly, numberLine, minus } from './framework.js';
import { gcd, lcm } from '../engine/rational.js';

const par = (n) => (n < 0 ? '(' + minus(n) + ')' : String(n));
const arrow = (x1, x2, y, cls) => {
  const dir = x2 >= x1 ? 1 : -1;
  return line(x1, y, x2, y, cls) + poly([[x2, y], [x2 - 8 * dir, y - 5], [x2 - 8 * dir, y + 5]], cls.replace('st-', 'fl-').replace(/ .*/, ''));
};

export const numberLineWalk = makeWidget({
  cap: 'Number line walk',
  init: (o) => ({ a: o.a ?? 3, b: o.b ?? -5 }),
  controls: (st, o) => [{ key: 'a', label: 'start', min: -9, max: 9 }, { key: 'b', label: o.mode === 'sub' ? 'subtract' : 'add', min: -9, max: 9 }],
  draw: (st, o) => {
    const sub = o.mode === 'sub';
    const { s: axis, X } = numberLine(-18, 18, 16, 544, 78, { every: 3 });
    const end = sub ? st.a - st.b : st.a + st.b;
    const move = sub ? -st.b : st.b;
    let s = axis + arrow(X(0), X(st.a), 50, 'st-a') + arrow(X(st.a), X(st.a + move), 30, 'st-m');
    s += '<circle class="pt" cx="' + X(end) + '" cy="78" r="7"/>';
    const expr = par(st.a) + (sub ? ' − ' : ' + ') + par(st.b);
    return {
      svg: svg(560, 110, s, 'Number line showing ' + expr + ' = ' + end),
      text: expr + ' = <b>' + minus(end) + '</b>.' + (sub ? ' Subtracting ' + par(st.b) + ' is the same as adding ' + par(-st.b) + '.' : ''),
    };
  },
});

export const arrayModel = makeWidget({
  cap: 'Distributive array',
  init: (o) => ({ r: o.r ?? 3, c1: o.c1 ?? 4, c2: o.c2 ?? 2 }),
  controls: () => [{ key: 'r', label: 'rows', min: 1, max: 8 }, { key: 'c1', label: 'left cols', min: 0, max: 8 }, { key: 'c2', label: 'right cols', min: 0, max: 8 }],
  draw: ({ r, c1, c2 }) => {
    const cell = 26, gap = 18, w = (c1 + c2) * cell + gap + 24, hh = r * cell + 12;
    let s = '';
    for (let i = 0; i < r; i++) for (let j = 0; j < c1 + c2; j++) {
      const x = 12 + j * cell + (j >= c1 ? gap : 0) + cell / 2, y = 6 + i * cell + cell / 2;
      s += '<circle class="' + (j < c1 ? 'fl-a' : 'fl-m') + ' st-ink" cx="' + x + '" cy="' + y + '" r="9"/>';
    }
    return {
      svg: svg(Math.max(w, 120), hh, s, r + ' rows split into ' + c1 + ' and ' + c2 + ' columns'),
      text: r + ' × (' + c1 + ' + ' + c2 + ') = ' + r + ' × ' + c1 + ' + ' + r + ' × ' + c2 + ' = ' + r * c1 + ' + ' + r * c2 + ' = <b>' + r * (c1 + c2) + '</b>',
    };
  },
});

const PRIMES4 = [2, 3, 5, 7];
export const sieve = makeWidget({
  cap: 'Sieve of Eratosthenes',
  init: () => ({ k: 0 }),
  controls: () => [{ key: 'k', label: 'primes used', min: 0, max: 4 }],
  draw: ({ k }) => {
    const used = PRIMES4.slice(0, k), c = 36;
    let s = '', left = 0;
    for (let n = 1; n <= 100; n++) {
      const col = (n - 1) % 10, row = Math.floor((n - 1) / 10);
      const crossed = used.some((p) => n % p === 0 && n !== p);
      const isUsed = used.includes(n);
      if (n > 1 && !crossed) left++;
      const cls = n === 1 ? 'st-soft fl-faded' : crossed ? 'st-soft fl-faded' : isUsed ? 'st-ink fl-m' : 'st-soft fl-s';
      s += rect(4 + col * c, 4 + row * c, c - 2, c - 2, cls) + txt(4 + col * c + (c - 2) / 2, 4 + row * c + 23, n, crossed || n === 1 ? 'tx tc dim' : 'tx-b tc');
    }
    const text = k === 0 ? 'Start with 1 to 100. The number 1 is neither prime nor composite, so it is grayed out.'
      : 'Crossed out every multiple of ' + used.join(', ') + ' (but kept the prime itself). <b>' + left + '</b> numbers are left' + (k === 4 ? ': these are exactly the 25 primes up to 100.' : '.');
    return { svg: svg(368, 368, s, 'Hundred chart with multiples crossed out'), text };
  },
});

function factorSteps(n) {
  const steps = []; let m = n;
  while (m > 1) { let p = 2; while (m % p) p++; steps.push([m, p, m / p]); m /= p; }
  return steps;
}
export const factorExp = (n) => {
  const f = {}; factorSteps(n).forEach(([, p]) => { f[p] = (f[p] || 0) + 1; });
  return Object.entries(f).map(([p, e]) => (e > 1 ? p + '^[' + e + ']' : p)).join(' × ');
};
export const factorTree = makeWidget({
  cap: 'Prime factorization',
  init: (o) => ({ n: o.n ?? 60 }),
  controls: () => [{ key: 'n', label: 'number', min: 2, max: 500, input: true }],
  draw: ({ n }) => {
    const st = factorSteps(n);
    const rows = st.map(([m, p, rest]) => '<li><b>' + m + '</b> = <span class="pf">' + p + '</span> × ' + rest + '</li>').join('');
    return {
      html: '<ol class="ftree">' + rows + '</ol>',
      text: st.length === 1 ? n + ' is prime.' : n + ' = ' + st.map(([, p]) => p).join(' × ') + ' = <b>' + factorExp(n) + '</b>',
    };
  },
});

const RULES = [
  [2, 'last digit is even', (d) => d.last % 2 === 0, (d) => 'last digit ' + d.last],
  [3, 'digit sum divisible by 3', (d) => d.sum % 3 === 0, (d) => 'digit sum ' + d.sum],
  [4, 'last two digits divisible by 4', (d) => d.l2 % 4 === 0, (d) => 'last two digits ' + d.l2],
  [5, 'last digit is 0 or 5', (d) => d.last % 5 === 0, (d) => 'last digit ' + d.last],
  [6, 'divisible by 2 and by 3', (d) => d.n % 6 === 0, () => 'both tests above'],
  [8, 'last three digits divisible by 8', (d) => d.l3 % 8 === 0, (d) => 'last three digits ' + d.l3],
  [9, 'digit sum divisible by 9', (d) => d.sum % 9 === 0, (d) => 'digit sum ' + d.sum],
  [10, 'last digit is 0', (d) => d.last === 0, (d) => 'last digit ' + d.last],
  [11, 'alternating digit sum divisible by 11', (d) => d.alt % 11 === 0, (d) => 'alternating sum ' + d.alt],
];
export const divisibility = makeWidget({
  cap: 'Divisibility tests',
  init: (o) => ({ n: o.n ?? 1234 }),
  controls: () => [{ key: 'n', label: 'number', min: 1, max: 999999, input: true }],
  draw: ({ n }) => {
    const ds = String(n).split('').map(Number);
    const alt = ds.reverse().reduce((a, x, i) => a + (i % 2 ? -x : x), 0);
    const d = { n, last: n % 10, l2: n % 100, l3: n % 1000, sum: String(n).split('').reduce((a, x) => a + +x, 0), alt };
    const rows = RULES.map(([k, rule, test, why]) => '<tr><td><b>' + k + '</b></td><td>' + rule + '</td><td>' + why(d) + '</td><td class="' + (test(d) ? 'yes' : 'no') + '">' + (test(d) ? 'yes' : 'no') + '</td></tr>').join('');
    return { html: '<div class="tblwrap"><table class="mini"><thead><tr><th>÷</th><th>test</th><th>this number</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div>', text: n + ' is divisible by ' + (RULES.filter(([, , t]) => t(d)).map(([k]) => k).join(', ') || 'none of these') + '.' };
  },
});

const divisors = (n) => { const o = []; for (let i = 1; i <= n; i++) if (n % i === 0) o.push(i); return o; };
export const lcmGcd = makeWidget({
  cap: 'Common multiples and divisors',
  init: (o) => ({ a: o.a ?? 12, b: o.b ?? 18 }),
  controls: () => [{ key: 'a', label: 'first', min: 1, max: 99, input: true }, { key: 'b', label: 'second', min: 1, max: 99, input: true }],
  draw: ({ a, b }) => {
    const L = lcm(a, b), G = gcd(a, b);
    const mult = (n) => { const o = []; for (let k = 1; k * n <= L && o.length < 14; k++) o.push(k * n); return o; };
    const chips = (arr, mark) => arr.map((x) => '<span class="num' + (mark(x) ? ' hit' : '') + '">' + x + '</span>').join('');
    const da = divisors(a), db = divisors(b);
    return {
      html: '<div class="lists"><p><b>Multiples of ' + a + '</b> ' + chips(mult(a), (x) => x % b === 0) + '</p><p><b>Multiples of ' + b + '</b> ' + chips(mult(b), (x) => x % a === 0) + '</p><p><b>Divisors of ' + a + '</b> ' + chips(da, (x) => b % x === 0) + '</p><p><b>Divisors of ' + b + '</b> ' + chips(db, (x) => a % x === 0) + '</p></div>',
      text: 'Least common multiple <b>' + L + '</b>. Greatest common divisor <b>' + G + '</b>. Check: ' + a + ' × ' + b + ' = ' + a * b + ' and ' + G + ' × ' + L + ' = ' + G * L + '.',
    };
  },
});

export const exponentTiles = makeWidget({
  cap: 'Powers',
  init: (o) => ({ b: o.b ?? 2, e: o.e ?? 3 }),
  controls: () => [{ key: 'b', label: 'base', min: 1, max: 9 }, { key: 'e', label: 'exponent', min: 0, max: 6 }],
  draw: ({ b, e }) => {
    const val = Math.pow(b, e);
    let s = '';
    if (e === 2) {
      const c = Math.min(24, Math.floor(260 / b));
      for (let i = 0; i < b; i++) for (let j = 0; j < b; j++) s += rect(6 + j * c, 6 + i * c, c - 2, c - 2, 'st-ink fl-a');
      s = svg(b * c + 12, b * c + 12, s, b + ' by ' + b + ' square');
    }
    const chain = e === 0 ? '1 (the empty product)' : Array(e).fill(b).join(' × ');
    return { svg: s, text: b + '^[' + e + '] = ' + chain + ' = <b>' + val.toLocaleString('en-US') + '</b>' + (e === 2 ? '. That is the area of a ' + b + ' by ' + b + ' square.' : '') };
  },
});

export const negExponent = makeWidget({
  cap: 'Powers going down',
  init: (o) => ({ b: o.b ?? 2 }),
  controls: () => [{ key: 'b', label: 'base', min: 2, max: 10 }],
  draw: ({ b }) => {
    let rows = '';
    for (let e = 4; e >= -4; e--) {
      const v = e >= 0 ? String(Math.pow(b, e)) : '{1/' + Math.pow(b, -e) + '}';
      rows += '<tr' + (e === 0 ? ' class="hl"' : '') + '><td>' + b + '^[' + minus(e) + ']</td><td>' + v + '</td></tr>';
    }
    return { html: '<div class="tblwrap"><table class="mini"><thead><tr><th>power</th><th>value</th></tr></thead><tbody>' + rows + '</tbody></table></div>', text: 'Each step down in the exponent divides the value by ' + b + '. So ' + b + '^[0] = 1, and ' + b + '^[−1] = {1/' + b + '}.' };
  },
});

export const squareRoot = makeWidget({
  cap: 'Squares and square roots',
  init: (o) => ({ n: o.n ?? 5 }),
  controls: () => [{ key: 'n', label: 'side', min: 1, max: 15 }],
  draw: ({ n }) => {
    const c = Math.min(22, Math.floor(300 / n));
    let s = '';
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) s += rect(6 + j * c, 6 + i * c, c - 2, c - 2, 'st-soft fl-a2');
    return { svg: svg(n * c + 12, n * c + 12, s, n + ' by ' + n + ' square'), text: 'Side ' + n + ' gives area ' + n + '^[2] = <b>' + n * n + '</b>. Going back, sqrt[' + n * n + '] = ' + n + '.' };
  },
});
