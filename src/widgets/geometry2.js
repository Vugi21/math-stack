// Widgets for Chapters 11 and 12: area and perimeter, circles, the Pythagorean theorem.
import { makeWidget, svg, line, rect, circ, txt, poly, path } from './framework.js';

/** a w by h rectangle made of unit squares */
export const unitSquare = makeWidget({
  cap: 'Unit squares: area and perimeter',
  init: (o) => ({ w: o.w ?? 5, h: o.h ?? 3 }),
  controls: () => [{ key: 'w', label: 'width', min: 1, max: 12 }, { key: 'h', label: 'height', min: 1, max: 8 }],
  draw: ({ w, h }) => {
    const c = Math.min(34, Math.floor(480 / w), Math.floor(230 / h));
    const x0 = 40, y0 = 14;
    let s = '';
    for (let i = 0; i < h; i++) for (let j = 0; j < w; j++) s += rect(x0 + j * c, y0 + i * c, c, c, 'st-soft fl-a2');
    s += rect(x0, y0, w * c, h * c, 'st-ink fl-none');
    s += txt(x0 + (w * c) / 2, y0 + h * c + 20, w) + txt(x0 - 14, y0 + (h * c) / 2 + 4, h);
    return {
      svg: svg(x0 * 2 + w * c + 20, y0 + h * c + 30, s, w + ' by ' + h + ' rectangle of unit squares'),
      text: 'Area = ' + w + ' × ' + h + ' = <b>' + w * h + '</b> unit squares (a count of squares). Perimeter = ' + w + ' + ' + h + ' + ' + w + ' + ' + h + ' = <b>' + 2 * (w + h) + '</b> units (a length around the edge).',
    };
  },
});

/** triangle, parallelogram or trapezoid with a dashed height. opts.shape */
export const areaShapes = makeWidget({
  cap: 'Area of shapes',
  init: (o) => ({ shape: o.shape || 'triangle', b: o.b ?? 8, h: o.h ?? 4, t: o.t ?? 4 }),
  controls: (st) => [{ key: 'b', label: 'base', min: 2, max: 12 }, { key: 'h', label: 'height', min: 1, max: 8 }].concat(st.shape === 'trapezoid' ? [{ key: 't', label: 'top', min: 1, max: 12 }] : []),
  draw: (st) => {
    const { shape, b, h } = st, k = 28, x0 = 50, yb = 20 + h * k;
    const sk = 2; // slant for parallelogram / triangle apex
    let pts, text, hx;
    if (shape === 'parallelogram') {
      pts = [[x0, yb], [x0 + b * k, yb], [x0 + (b + sk) * k, yb - h * k], [x0 + sk * k, yb - h * k]]; hx = x0 + sk * k;
      text = 'Slice off the slanted end and slide it to the other side: it becomes a rectangle. Area = base × height = ' + b + ' × ' + h + ' = <b>' + b * h + '</b>.';
    } else if (shape === 'trapezoid') {
      const t = Math.min(st.t, 12);
      pts = [[x0, yb], [x0 + b * k, yb], [x0 + (1 + t) * k, yb - h * k], [x0 + k, yb - h * k]]; hx = x0 + k;
      text = 'Average of the parallel sides: (' + b + ' + ' + t + ') ÷ 2 = ' + (b + t) / 2 + '. Times the height ' + h + ': area = <b>' + ((b + t) * h) / 2 + '</b>.';
    } else {
      pts = [[x0, yb], [x0 + b * k, yb], [x0 + sk * k, yb - h * k]]; hx = x0 + sk * k;
      text = 'Two copies make a parallelogram with area ' + b + ' × ' + h + ' = ' + b * h + ', so one triangle is half: <b>' + (b * h) / 2 + '</b>.';
    }
    let s = poly(pts, 'st-ink fl-a2') + line(hx, yb, hx, yb - h * k, 'st-m') + txt(x0 + (b * k) / 2, yb + 20, 'base ' + b) + txt(hx + 6, yb - (h * k) / 2, 'h = ' + h, 'tx tl');
    s += poly([[hx, yb], [hx + 10, yb], [hx + 10, yb - 10], [hx, yb - 10]], 'st-soft fl-none');
    return { svg: svg(x0 + (b + 4) * k + 40, yb + 34, s, shape + ' with base ' + b + ' and height ' + h), text };
  },
});

/** circle with radius r: circumference and area in terms of pi */
export const circleExplorer = makeWidget({
  cap: 'Circle explorer',
  init: (o) => ({ r: o.r ?? 3 }),
  controls: () => [{ key: 'r', label: 'radius', min: 1, max: 10 }],
  draw: ({ r }) => {
    const k = 14, cx = 150, cy = 150;
    let s = circ(cx, cy, r * k, 'st-ink fl-a2') + line(cx, cy, cx + r * k, cy, 'st-m') + '<circle class="pt" cx="' + cx + '" cy="' + cy + '" r="3"/>';
    s += txt(cx + (r * k) / 2, cy - 6, 'r = ' + r) + line(cx - r * k, cy + r * k + 12, cx + r * k, cy + r * k + 12, 'st-soft') + txt(cx, cy + r * k + 28, 'd = ' + 2 * r);
    return {
      svg: svg(300, 320, s, 'circle with radius ' + r),
      text: 'Circumference = 2πr = 2 × π × ' + r + ' = <b>' + 2 * r + 'π</b> (about ' + (2 * r * Math.PI).toFixed(1) + '). Area = πr² = π × ' + r + '² = <b>' + r * r + 'π</b> (about ' + (r * r * Math.PI).toFixed(1) + '). Circumference ÷ diameter is always π, about 3.14.',
    };
  },
});

/** right triangle with legs a, b and the three squares */
export const pythagoras = makeWidget({
  cap: 'Pythagorean theorem',
  init: (o) => ({ a: o.a ?? 3, b: o.b ?? 4 }),
  controls: () => [{ key: 'a', label: 'leg a', min: 1, max: 9 }, { key: 'b', label: 'leg b', min: 1, max: 9 }],
  draw: ({ a, b }) => {
    const k = 12;
    // right angle at A = (0,0); leg a goes up, leg b goes right (y grows downward on screen)
    const A = [0, 0], B = [b * k, 0], C = [0, -a * k];
    const dx = C[0] - B[0], dy = C[1] - B[1];
    let nx = -dy, ny = dx; // normal to the hypotenuse; flip so it points away from A
    if (nx * (A[0] - B[0]) + ny * (A[1] - B[1]) > 0) { nx = -nx; ny = -ny; }
    const S = [B, C, [C[0] + nx, C[1] + ny], [B[0] + nx, B[1] + ny]];
    const sq1 = [A, [-a * k, 0], [-a * k, -a * k], C], sq2 = [A, B, [B[0], b * k], [0, b * k]];
    const all = [A, B, C, ...S, ...sq1, ...sq2];
    const x0 = Math.min(...all.map((p) => p[0])) - 8, x1 = Math.max(...all.map((p) => p[0])) + 8;
    const y0 = Math.min(...all.map((p) => p[1])) - 8, y1 = Math.max(...all.map((p) => p[1])) + 8;
    let s = poly(sq1, 'st-soft fl-m') + poly(sq2, 'st-soft fl-g') + poly(S, 'st-soft fl-a') + poly([A, B, C], 'st-ink fl-a2');
    s += txt(-(a * k) / 2, -(a * k) / 2 + 4, a * a, 'tx-b tc') + txt((b * k) / 2, (b * k) / 2 + 4, b * b, 'tx-b tc');
    s += txt((B[0] + C[0]) / 2 + nx / 2, (B[1] + C[1]) / 2 + ny / 2 + 4, a * a + b * b, 'tx-b tc');
    const c2 = a * a + b * b, c = Math.sqrt(c2);
    return {
      svg: svg(x1 - x0, y1 - y0, '<g transform="translate(' + -x0 + ',' + -y0 + ')">' + s + '</g>', 'right triangle with squares on each side'),
      text: a + '² + ' + b + '² = ' + a * a + ' + ' + b * b + ' = ' + c2 + ', so the long side is ' + (Number.isInteger(c) ? '<b>' + c + '</b>, a whole number.' : '<b>sqrt[' + c2 + ']</b>, about ' + c.toFixed(2) + '.') + ' The two small squares add up to the big one.',
    };
  },
});
