// Widgets for the decimals chapters. Everything is computed with integers, never floating point.
import { makeWidget, svg, line, rect, txt, numberLine, minus } from './framework.js';

/** integer k scaled by 10^places, as an exact decimal string: dec(35, 2) = "0.35" */
export const dec = (k, places) => {
  const neg = k < 0, a = Math.abs(k), s = String(a).padStart(places + 1, '0');
  const out = places ? s.slice(0, s.length - places) + '.' + s.slice(s.length - places) : s;
  return (neg ? '-' : '') + out;
};

/** Hundredths grid: shade a hundredths and b hundredths, then add or take away. */
export const decimalGrid = makeWidget({
  cap: 'Hundredths grid: one big square is 1',
  init: (o) => ({ a: o.a ?? 35, b: o.b ?? 48, sub: o.mode === 'sub' ? 1 : 0 }),
  controls: (st) => [
    { key: 'a', label: 'first (hundredths)', min: 0, max: 100 },
    { key: 'b', label: 'second (hundredths)', min: 0, max: () => (st.sub ? st.a : 100) },
  ],
  actions: (st) => [{ label: 'Switch add / subtract', fn: () => { st.sub = st.sub ? 0 : 1; if (st.sub && st.b > st.a) st.b = st.a; } }],
  legend: [['fl-a', 'first number'], ['fl-m', 'second number'], ['fl-bs', 'taken away']],
  draw: ({ a, b, sub }) => {
    const total = sub ? a - b : a + b, grids = sub ? 1 : Math.max(1, Math.ceil(total / 100)), cell = 22, gw = 10 * cell, gap = 18;
    let s = '';
    for (let g = 0; g < grids; g++) {
      const ox = 6 + g * (gw + gap);
      for (let i = 0; i < 100; i++) {
        const idx = g * 100 + i, x = ox + (i % 10) * cell, y = 6 + Math.floor(i / 10) * cell;
        let cls = 'seg';
        if (sub) cls += idx < total ? ' on' : idx < a ? ' onx' : '';
        else cls += idx < a ? ' on' : idx < a + b ? ' onm' : '';
        s += '<rect class="' + cls + '" x="' + x + '" y="' + y + '" width="' + cell + '" height="' + cell + '"/>';
      }
    }
    const word = sub ? ' − ' : ' + ';
    return {
      svg: svg(grids * (gw + gap) + 6, gw + 12, s, 'Hundredths grids showing ' + dec(a, 2) + (sub ? ' minus ' : ' plus ') + dec(b, 2)),
      text: dec(a, 2) + word + dec(b, 2) + ' = <b>' + dec(total, 2) + '</b>. In hundredths: ' + a + word + b + ' = ' + total + ', and ' + total + ' hundredths is ' + dec(total, 2) + '. Line up the decimal points and you are just adding hundredths with hundredths.',
    };
  },
});

/** A number on a number line between two neighbouring multiples of a place value. */
export const roundingLine = makeWidget({
  cap: 'Rounding on the number line',
  init: (o) => ({ v: o.v ?? 3846, place: o.place ?? 1 }),
  controls: () => [{ key: 'v', label: 'number (thousandths)', min: 0, max: 9999, step: 1, input: true }, { key: 'place', label: 'round to 10^-', min: 0, max: 2 }],
  legend: [['fl-m', 'your number'], ['fl-g', 'the nearer neighbour']],
  draw: ({ v, place }) => {
    const unit = Math.pow(10, 3 - place), lo = Math.floor(v / unit), hi = lo + 1, rem = v - lo * unit;
    const up = rem * 2 >= unit, tie = rem * 2 === unit;
    const W = 560, x0 = 30, x1 = x0 + W, y = 70;
    const X = (k) => x0 + ((k - lo * unit) / unit) * W;
    let s = line(x0, y, x1, y, 'nl');
    for (let i = 0; i <= 10; i++) s += line(x0 + (i / 10) * W, y - (i % 5 ? 5 : 9), x0 + (i / 10) * W, y + (i % 5 ? 5 : 9), 'tk');
    s += '<line class="st-m" x1="' + (x0 + W / 2) + '" y1="' + (y - 30) + '" x2="' + (x0 + W / 2) + '" y2="' + (y + 30) + '"/>' + txt(x0 + W / 2, y - 36, 'halfway', 'tx tc');
    const nearX = up ? x1 : x0;
    s += '<circle class="fl-g st-ink" cx="' + nearX + '" cy="' + y + '" r="9"/>';
    s += '<circle class="pt" cx="' + X(v) + '" cy="' + y + '" r="8"/>';
    s += txt(x0, y + 32, dec(lo, place), 'tx-b tc') + txt(x1, y + 32, dec(hi, place), 'tx-b tc') + txt(X(v), y + 52, dec(v, 3), 'tx-b tc');
    const target = up ? hi : lo;
    const names = ['whole number', 'tenth', 'hundredth'];
    return {
      svg: svg(W + 60, 134, s, dec(v, 3) + ' between ' + dec(lo, place) + ' and ' + dec(hi, place)),
      text: dec(v, 3) + ' sits between ' + dec(lo, place) + ' and ' + dec(hi, place) + '. ' + (tie ? 'It is exactly halfway, and the rule says round up. ' : 'It is on the ' + (up ? 'right' : 'left') + ' half, so it is closer to ' + dec(target, place) + '. ') + 'Rounded to the nearest ' + names[place] + ': <b>' + dec(target, place) + '</b>.',
    };
  },
});

/** Long division of n by d, remembering remainders so the loop is visible. */
export function divisionDigits(n, d, maxDigits = 24) {
  const whole = Math.floor(n / d);
  let r = n % d;
  const seen = new Map(), digits = [], rems = [r];
  let start = -1;
  while (r !== 0 && digits.length < maxDigits) {
    if (seen.has(r)) { start = seen.get(r); break; }
    seen.set(r, digits.length);
    r *= 10;
    digits.push(Math.floor(r / d));
    r = r % d;
    rems.push(r);
  }
  if (r !== 0 && start < 0 && seen.has(r)) start = seen.get(r);
  return { whole, digits, rems, start, ends: r === 0 };
}

export const repeatingDecimal = makeWidget({
  cap: 'Long division and the remainder loop',
  init: (o) => ({ n: o.n ?? 1, d: o.d ?? 7 }),
  controls: () => [{ key: 'n', label: 'top', min: 1, max: 40 }, { key: 'd', label: 'bottom', min: 2, max: 40 }],
  legend: [['fl-m', 'repeating block'], ['fl-a2', 'before the repeat']],
  draw: ({ n, d }) => {
    const { whole, digits, rems, start, ends } = divisionDigits(n, d);
    const shown = digits.slice(0, 18), w = 28;
    let s = '';
    shown.forEach((dg, i) => {
      const rep = start >= 0 && i >= start;
      s += '<rect class="' + (rep ? 'chp' : 'ch2') + '" x="' + (6 + i * w) + '" y="6" width="' + (w - 2) + '" height="30"/>' + txt(6 + i * w + (w - 2) / 2, 27, String(dg), 'tx-b tc');
      s += txt(6 + i * w + (w - 2) / 2, 56, 'r' + rems[i + 1], 'tx tc');
    });
    const W = Math.max(shown.length, 4) * w + 12;
    let body;
    if (ends) body = 'It stops: after ' + digits.length + ' digit' + (digits.length === 1 ? '' : 's') + ' the remainder is 0. {' + n + '/' + d + '} = <b>' + whole + (digits.length ? '.' + digits.join('') : '') + '</b>.';
    else {
      const pre = digits.slice(0, start).join(''), blk = digits.slice(start).join('');
      body = 'The remainder ' + rems[start] + ' came back, so the digits loop. {' + n + '/' + d + '} = <b>' + whole + '.' + pre + '<span style="text-decoration:overline">' + blk + '</span></b>. The block has ' + (digits.length - start) + ' digit' + (digits.length - start === 1 ? '' : 's') + ': only ' + (d - 1) + ' nonzero remainders are possible, so it must loop.';
    }
    return { svg: svg(W, 66, s, 'Digits of ' + n + ' divided by ' + d), text: body };
  },
});
