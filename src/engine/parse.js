import { R } from './rational.js';

const UNITS = '(?:square|sq|cubic|cu)?\\s*(?:units?|cm|mm|km|m|in|inch(?:es)?|ft|feet|foot|yd|yards?|mi|miles?|meters?|metres?|centimeters?|kilometers?|degrees?|deg|dollars?|cents?|hours?|hrs?|minutes?|mins?|seconds?|secs?|mph|km\\/h|kph|kg|g|lbs?|pounds?|liters?|litres?|l|ml|cups?|pieces?|ways?|people|students?|marbles?|days?|years?|games?|points?|pages?|coins?|tiles?|squares?)';
const UNIT_TAIL = new RegExp('\\s*' + UNITS + '(?:\\s*(?:\\^\\s*[23]|²|³))?\\s*$', 'i');

/**
 * Turns what a student typed into an exact rational, or null if it is not a plain number.
 * Accepts: 12, -3, 3/4, 2 3/4, -2 3/4, 0.75, .5, 1,000, $5, 25%, 90°, x = 5, 12 cm, 9 square units.
 */
export function parseNum(s) {
  if (typeof s !== 'string') return null;
  let t = s.trim().replace(/[−–—]/g, '-').replace(/ /g, ' ');
  if (!t) return null;
  t = t.replace(/^[a-zA-Z]\s*=\s*/, '');
  t = t.replace(/^\$\s*/, '');
  t = t.replace(/\s*(%|°|º)\s*$/, '');
  if (/[a-zA-Z²³]/.test(t)) {
    const stripped = t.replace(UNIT_TAIL, '');
    if (stripped === t) return null;
    t = stripped.trim();
  }
  if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(t)) t = t.replace(/,/g, '');
  t = t.replace(/\s*\/\s*/g, '/').replace(/\s+/g, ' ');
  let m;
  if ((m = t.match(/^(-?)(\d+)$/))) return R(+(m[1] + m[2]));
  if ((m = t.match(/^(-?)(\d+)\/(\d+)$/))) { const d = +m[3]; if (!d) return null; return R(+(m[1] + m[2]), d); }
  if ((m = t.match(/^(-?)(\d+) (\d+)\/(\d+)$/))) {
    const d = +m[4]; if (!d) return null;
    const n = +m[2] * d + +m[3];
    return R(m[1] ? -n : n, d);
  }
  if ((m = t.match(/^(-?)(\d*)\.(\d+)$/))) {
    if (m[3].length > 9) return null;
    const dd = Math.pow(10, m[3].length);
    const n = +((m[2] || '0') + m[3]);
    return R(m[1] ? -n : n, dd);
  }
  return null;
}

/** true when the student typed a fraction that is not in lowest terms, such as 6/8 */
export function isUnreduced(s) {
  const m = String(s).trim().replace(/\s*\/\s*/g, '/').match(/^-?(\d+)\/(\d+)$/);
  if (!m) return false;
  const a = +m[1], b = +m[2];
  if (!b) return false;
  let x = a, y = b; while (y) { const t = x % y; x = y; y = t; }
  return x > 1;
}
