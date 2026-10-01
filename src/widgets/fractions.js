// Widgets for Chapter 4 and the fraction work that follows.
import { makeWidget, svg, line, rect, txt, numberLine } from './framework.js';
import { R, add, sub, fm, fmMixed, gcd, lcm } from '../engine/rational.js';

export const fractionExplorer = makeWidget({
  cap: 'Fraction explorer',
  init: (o) => ({ n: o.n ?? 3, d: o.d ?? 4 }),
  controls: () => [{ key: 'n', label: 'top', min: 0, max: 12 }, { key: 'd', label: 'bottom', min: 1, max: 12 }],
  draw: ({ n, d }) => {
    const W = 560, wh = Math.max(1, Math.ceil(n / d)), rh = wh > 4 ? 14 : wh > 2 ? 22 : 32, gap = 6, sw = W / d;
    let y = 2, s = '';
    for (let r = 0; r < wh; r++) {
      const f = Math.max(0, Math.min(d, n - r * d));
      for (let i = 0; i < d; i++) s += '<rect class="seg' + (i < f ? ' on' : '') + '" x="' + (12 + i * sw) + '" y="' + y + '" width="' + sw + '" height="' + rh + '"/>';
      y += rh + gap;
    }
    const ny = y + 26, L = wh;
    const { s: axis, X } = numberLine(0, L, 12, 12 + W, ny, {});
    let ticks = '';
    if (L * d <= 72) for (let k = 0; k <= L * d; k++) ticks += line(X(k / d), ny - 4, X(k / d), ny + 4, 'tk');
    s += axis + ticks + '<circle class="pt" cx="' + X(n / d) + '" cy="' + ny + '" r="8"/>';
    const val = n / d;
    const w = Math.floor(n / d);
    return {
      svg: svg(W + 24, ny + 36, s, n + ' pieces of size one over ' + d),
      text: '{' + n + '/' + d + '} means ' + n + ' pieces of size {1/' + d + '}. It is also ' + n + ' ÷ ' + d + ' = <b>' + Math.round(val * 1000) / 1000 + '</b>.' + (n > d && n % d ? ' That is ' + w + ' whole' + (w > 1 ? 's' : '') + ' and {' + (n % d) + '/' + d + '}.' : ''),
    };
  },
});

export const fractionProduct = makeWidget({
  cap: 'Area model',
  init: (o) => ({ a: o.a ?? 2, b: o.b ?? 3, c: o.c ?? 3, d: o.d ?? 4 }),
  controls: (st) => [{ key: 'a', label: '1st top', min: 0, max: () => st.b }, { key: 'b', label: '1st bottom', min: 1, max: 8 }, { key: 'c', label: '2nd top', min: 0, max: () => st.d }, { key: 'd', label: '2nd bottom', min: 1, max: 8 }],
  legend: [['fl-a half', 'first fraction: columns'], ['fl-m', 'second fraction: rows'], ['fl-g', 'overlap = the product']],
  draw: ({ a, b, c, d }) => {
    const S0 = 240, cw = S0 / b, ch = S0 / d;
    let s = rect(12, 4, S0, S0, 'st-ink fl-s');
    if (a > 0) s += '<rect class="colsh" x="12" y="4" width="' + a * cw + '" height="' + S0 + '"/>';
    if (c > 0) s += '<rect class="rowsh" x="12" y="4" width="' + S0 + '" height="' + c * ch + '"/>';
    if (a > 0 && c > 0) s += '<rect class="ovl" x="12" y="4" width="' + a * cw + '" height="' + c * ch + '"/>';
    for (let i = 0; i <= b; i++) s += line(12 + i * cw, 4, 12 + i * cw, 4 + S0, 'tk');
    for (let j = 0; j <= d; j++) s += line(12, 4 + j * ch, 12 + S0, 4 + j * ch, 'tk');
    const r = R(a * c, b * d);
    return {
      svg: svg(S0 + 24, S0 + 8, s, 'Unit square split into ' + b + ' columns and ' + d + ' rows'),
      text: 'Overlap: ' + a + ' × ' + c + ' = <b>' + a * c + '</b> small pieces out of ' + b + ' × ' + d + ' = <b>' + b * d + '</b>. So {' + a + '/' + b + '} × {' + c + '/' + d + '} = {' + a * c + '/' + b * d + '}' + (gcd(a * c, b * d) > 1 && a * c > 0 ? ' = ' + fm(r) : '') + '.',
    };
  },
});

export const fractionDivide = makeWidget({
  cap: 'How many pieces fit?',
  init: (o) => ({ a: o.a ?? 3, b: o.b ?? 1, c: o.c ?? 1, d: o.d ?? 4 }),
  controls: () => [{ key: 'a', label: 'amount top', min: 1, max: 12 }, { key: 'b', label: 'amount bottom', min: 1, max: 6 }, { key: 'c', label: 'piece top', min: 1, max: 4 }, { key: 'd', label: 'piece bottom', min: 1, max: 8 }],
  legend: [['fl-a', 'full pieces'], ['fl-m dashed', 'leftover (partial piece)']],
  draw: ({ a, b, c, d }) => {
    const W = 560, U = Math.max(1, Math.ceil(a / b)), unit = W / U, T = a * d, C = c * b, bd = b * d, x0 = 12, y0 = 4, bh = 44;
    let s = '', i = 0;
    for (let q = 0; q < T; q += C) {
      const end = Math.min(q + C, T), full = q + C <= T;
      s += '<rect class="' + (full ? (i % 2 ? 'ch2' : 'ch1') : 'chp') + '" x="' + (x0 + q / bd * unit) + '" y="' + y0 + '" width="' + ((end - q) / bd * unit) + '" height="' + bh + '"/>';
      i++;
    }
    s += '<rect class="barbox" x="' + x0 + '" y="' + y0 + '" width="' + (T / bd * unit) + '" height="' + bh + '"/>';
    const ny = y0 + bh + 22;
    const { s: axis } = numberLine(0, U, x0, x0 + U * unit, ny, {});
    const r = R(a * d, b * c), fullN = Math.floor(T / C), left = T % C;
    return {
      svg: svg(W + 24, ny + 36, s + axis, 'A bar of length ' + a + ' over ' + b + ' cut into pieces of ' + c + ' over ' + d),
      text: '{' + a + '/' + b + '} ÷ {' + c + '/' + d + '} = {' + a + '/' + b + '} × {' + d + '/' + c + '} = <b>' + fmMixed(r) + '</b>. <b>' + fullN + '</b> full piece' + (fullN === 1 ? '' : 's') + ' fit' + (left ? ', plus a leftover that is ' + fm(R(left, C)) + ' of a piece (dashed).' : '.'),
    };
  },
});

/** Two fractions on matching bars, then the same bars cut into equal pieces. mode: add | sub | compare */
export const commonDenominator = makeWidget({
  cap: 'Common denominator',
  init: (o) => ({ a: o.a ?? 1, b: o.b ?? 2, c: o.c ?? 1, d: o.d ?? 3 }),
  controls: (st) => [{ key: 'a', label: '1st top', min: 0, max: () => st.b }, { key: 'b', label: '1st bottom', min: 1, max: 12 }, { key: 'c', label: '2nd top', min: 0, max: () => st.d }, { key: 'd', label: '2nd bottom', min: 1, max: 12 }],
  legend: [['fl-a', 'first fraction'], ['fl-m', 'second fraction'], ['fl-bs dashed', 'taken away']],
  draw: ({ a, b, c, d }, o) => {
    const mode = o.mode || 'add', L = lcm(b, d), W = 520, x0 = 20, bh = 28;
    const A = a * (L / b), C = c * (L / d);
    const wholes = mode === 'add' ? Math.max(1, Math.ceil((A + C) / L)) : 1;
    const ww = W / wholes;
    const bar = (y, parts, cellW, clsOf) => {
      let s = '';
      for (let i = 0; i < parts; i++) s += '<rect class="seg ' + (clsOf(i) || '') + '" x="' + (x0 + i * cellW) + '" y="' + y + '" width="' + cellW + '" height="' + bh + '"/>';
      return s;
    };
    let s = bar(6, b, ww / b, (i) => (i < a ? 'on' : '')) + bar(44, d, ww / d, (i) => (i < c ? 'onm' : ''));
    let h2 = 76;
    if (mode === 'add') s += bar(88, wholes * L, ww / L, (i) => (i < A ? 'on' : i < A + C ? 'onm' : ''));
    else if (mode === 'sub') s += bar(88, L, ww / L, (i) => (i < A - C ? 'on' : i < A ? 'onx' : ''));
    else s += bar(88, L, ww / L, (i) => (i < A ? 'on' : '')) + bar(124, L, ww / L, (i) => (i < C ? 'onm' : '')), h2 = 112;
    const x = R(a, b), y = R(c, d);
    let text;
    if (mode === 'compare') {
      const cmpTxt = A === C ? 'equal to' : A > C ? 'greater than' : 'less than';
      text = 'Cut both into ' + L + 'ths: {' + a + '/' + b + '} = {' + A + '/' + L + '} and {' + c + '/' + d + '} = {' + C + '/' + L + '}. So {' + a + '/' + b + '} is <b>' + cmpTxt + '</b> {' + c + '/' + d + '}.';
    } else {
      const res = mode === 'add' ? add(x, y) : sub(x, y);
      const sign = mode === 'add' ? '+' : '−';
      text = '{' + a + '/' + b + '} ' + sign + ' {' + c + '/' + d + '} = {' + A + '/' + L + '} ' + sign + ' {' + C + '/' + L + '} = {' + (mode === 'add' ? A + C : A - C) + '/' + L + '} = <b>' + fmMixed(res) + '</b>.';
    }
    return { svg: svg(W + 40, 88 + h2 - 40 + 40, s, 'Fraction bars with a common denominator'), text };
  },
});

export const simplifyFraction = makeWidget({
  cap: 'Simplest form',
  init: (o) => ({ n: o.n ?? 12, d: o.d ?? 18 }),
  controls: () => [{ key: 'n', label: 'top', min: 0, max: 60, input: true }, { key: 'd', label: 'bottom', min: 1, max: 60, input: true }],
  draw: ({ n, d }) => {
    const g = gcd(n, d) || 1, W = 520, x0 = 20;
    const bar = (y, parts, fill) => { let s = ''; for (let i = 0; i < parts; i++) s += '<rect class="seg' + (i < fill ? ' on' : '') + '" x="' + (x0 + i * W / parts) + '" y="' + y + '" width="' + W / parts + '" height="26"/>'; return s; };
    return {
      svg: svg(W + 40, 78, bar(6, d, n) + bar(44, d / g, n / g), 'The same amount cut into ' + d + ' and ' + d / g + ' pieces'),
      text: '{' + n + '/' + d + '}: the greatest common divisor of ' + n + ' and ' + d + ' is <b>' + g + '</b>. Divide top and bottom by ' + g + ': {' + n / g + '/' + d / g + '}' + (g === 1 ? ' (already in simplest form).' : '.'),
    };
  },
});
