// Widgets for the algebra chapters. Export each widget built with makeWidget, then it is registered in index.js.
import { makeWidget, svg, line, rect, circ, txt, poly, path, numberLine, minus } from './framework.js';

/** a x + b = c, kept in balance. step 0: the equation, 1: take b from both pans, 2: cut each pan into a equal groups. */
export const balanceScale = makeWidget({
  cap: 'Balance scale: whatever you do to one pan, do to the other',
  init: (o) => ({ a: o.a ?? 2, b: o.b ?? 3, s: o.s ?? 4, step: o.step ?? 0 }),
  controls: () => [
    { key: 'a', label: 'x-boxes', min: 1, max: 4 },
    { key: 'b', label: 'loose units', min: 0, max: 9 },
    { key: 's', label: 'hidden x', min: 1, max: 9 },
    { key: 'step', label: 'step', min: 0, max: 2, fmt: (v) => ['start', 'subtract', 'divide'][v] },
  ],
  legend: [['fl-a', 'a box holding x'], ['fl-m', 'one unit']],
  draw: ({ a, b, s, step }) => {
    const c = a * s + b;
    const W = 560, H = 210, cx = W / 2 + 12;
    const nL = step === 0 ? a : step === 1 ? a : 1, bL = step === 0 ? b : 0;
    const nR = step === 2 ? s : step === 1 ? a * s : c;
    let g = '';
    g += poly([[cx - 8, 196], [cx + 8, 196], [cx, 40]], 'st-ink fl-s') + line(cx - 40, 197, cx + 40, 197, 'st-ink');
    g += line(cx - 190, 40, cx + 190, 40, 'st-ink');
    const pan = (px, boxes, units) => {
      let o = line(px - 70, 40, px - 70, 110, 'tk') + line(px + 70, 40, px + 70, 110, 'tk') + rect(px - 76, 110, 152, 8, 'st-ink fl-a2');
      let x = px - 66;
      for (let i = 0; i < boxes; i++) { o += rect(x, 82, 28, 28, 'st-a fl-a2'); o += txt(x + 14, 101, 'x', 'tx-b tc'); x += 32; }
      const cols = 10, sq = 11;
      const bx = x + (boxes ? 4 : 0);
      for (let i = 0; i < units; i++) {
        const col = i % cols, row = Math.floor(i / cols);
        o += '<rect class="st-ink fl-m" x="' + (bx + col * (sq + 1)) + '" y="' + (110 - sq - row * (sq + 1)) + '" width="' + sq + '" height="' + sq + '"/>';
      }
      return o;
    };
    g += pan(cx - 160, nL, bL) + pan(cx + 160, 0, nR);
    const right = step === 2 ? s : step === 1 ? c - b : c;
    const eq = (step === 0 ? (a === 1 ? 'x' : a + 'x') + (b ? ' + ' + b : '') : step === 1 ? (a === 1 ? 'x' : a + 'x') : 'x') + ' = ' + right;
    g += txt(cx, 20, eq, 'tx-b tc');
    const note = step === 0 ? 'Both pans weigh ' + c + '.' : step === 1 ? (b ? 'Took ' + b + ' unit' + (b > 1 ? 's' : '') + ' off each pan.' : 'There are no loose units to remove.') : (a > 1 ? 'Split each pan into ' + a + ' equal groups; keep one group.' : 'Only one box, so nothing to split.');
    return {
      svg: svg(W + 24, H, g, 'A balance scale showing ' + eq),
      text: '<b>' + eq + '</b>. ' + note + (step === 2 ? ' So x = <b>' + s + '</b>.' : ''),
    };
  },
});

/** An inequality on a number line: open or closed dot, shaded ray, and a test point. */
export const inequalityLine = makeWidget({
  cap: 'Inequality on the number line',
  init: (o) => ({ a: o.a ?? 2, kind: o.kind ?? 2, t: o.t ?? 5 }),
  controls: () => [
    { key: 'a', label: 'boundary', min: -9, max: 9, fmt: (v) => minus(v) },
    { key: 'kind', label: 'symbol', min: 0, max: 3, fmt: (v) => ['<', '≤', '>', '≥'][v] },
    { key: 't', label: 'test point', min: -10, max: 10, fmt: (v) => minus(v) },
  ],
  draw: ({ a, kind, t }) => {
    const sym = ['<', '≤', '>', '≥'][kind], closed = kind === 1 || kind === 3, right = kind >= 2;
    const x0 = 22, x1 = 562, y = 70;
    const { s, X } = numberLine(-10, 10, x0, x1, y, {});
    let g = line(right ? X(a) : x0, y, right ? x1 : X(a), y, 'st-a').replace('class="st-a"', 'class="st-a" stroke-width="6"');
    g += s;
    g += circ(X(a), y, 8, closed ? 'st-ink fl-a' : 'st-ink fl-s');
    g += (right ? poly([[x1 + 8, y], [x1 - 4, y - 7], [x1 - 4, y + 7]], 'fl-a st-a') : poly([[x0 - 8, y], [x0 + 4, y - 7], [x0 + 4, y + 7]], 'fl-a st-a'));
    const holds = kind === 0 ? t < a : kind === 1 ? t <= a : kind === 2 ? t > a : t >= a;
    g += '<circle class="' + (holds ? 'fl-g' : 'fl-b') + '" cx="' + X(t) + '" cy="' + (y - 28) + '" r="6"/>';
    g += txt(X(t), y - 40, minus(t), 'tx-b tc');
    return {
      svg: svg(x1 + 30, 118, g, 'x ' + sym + ' ' + a + ' on a number line'),
      text: '<b>x ' + sym + ' ' + minus(a) + '</b>: the ' + (closed ? 'filled dot means ' + minus(a) + ' is included' : 'open dot means ' + minus(a) + ' is NOT included') + ', and the shading covers everything ' + (right ? 'to the right' : 'to the left') + '. Test point ' + minus(t) + ': ' + minus(t) + ' ' + sym + ' ' + minus(a) + ' is <b>' + (holds ? 'true' : 'false') + '</b>.',
    };
  },
});
