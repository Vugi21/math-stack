// Exact rational arithmetic on small integers. Values are always stored in lowest terms, denominator > 0.
export const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; };
export const lcm = (a, b) => (a && b ? Math.abs(a * b) / gcd(a, b) : 0);

export function R(n, d = 1) {
  if (!Number.isInteger(n) || !Number.isInteger(d)) throw new Error('R needs integers: ' + n + '/' + d);
  if (d === 0) throw new Error('zero denominator');
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
}
export const add = (x, y) => R(x.n * y.d + y.n * x.d, x.d * y.d);
export const sub = (x, y) => R(x.n * y.d - y.n * x.d, x.d * y.d);
export const mul = (x, y) => R(x.n * y.n, x.d * y.d);
export const div = (x, y) => R(x.n * y.d, x.d * y.n);
export const neg = (x) => R(-x.n, x.d);
export const recip = (x) => R(x.d, x.n);
export const eq = (x, y) => x.n === y.n && x.d === y.d;
export const cmp = (x, y) => x.n * y.d - y.n * x.d;
export const val = (x) => x.n / x.d;
export const pow = (x, k) => {
  if (k < 0) return pow(recip(x), -k);
  let r = R(1);
  for (let i = 0; i < k; i++) r = mul(r, x);
  return r;
};
export const isInt = (x) => x.d === 1;

/** plain text such as "3/4" (what a student could type) */
export const fmt = (x) => (x.d === 1 ? String(x.n) : x.n + '/' + x.d);
/** lesson markup such as "{3/4}" with a real minus sign */
export const fm = (x) => (x.d === 1 ? (x.n < 0 ? '−' + Math.abs(x.n) : String(x.n)) : (x.n < 0 ? '−' : '') + '{' + Math.abs(x.n) + '/' + x.d + '}');
/** mixed number markup, e.g. 2 {3/4} */
export const fmMixed = (x) => {
  if (x.d === 1 || Math.abs(x.n) < x.d) return fm(x);
  const w = Math.trunc(x.n / x.d), r = Math.abs(x.n) % x.d;
  return (x.n < 0 ? '−' : '') + Math.abs(w) + (r ? ' {' + r + '/' + x.d + '}' : '');
};
/** mixed number as typed text, e.g. "2 3/4" */
export const fmtMixed = (x) => {
  if (x.d === 1 || Math.abs(x.n) < x.d) return fmt(x);
  const w = Math.trunc(x.n / x.d), r = Math.abs(x.n) % x.d;
  return (x.n < 0 ? '-' : '') + Math.abs(w) + (r ? ' ' + r + '/' + x.d : '');
};
