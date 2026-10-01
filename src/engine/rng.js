// Small deterministic random source. The same seed always gives the same problem.
export function hash32(str) {
  let h = 2166136261 >>> 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
}

export function makeRng(seed) {
  let a = (seed >>> 0) || 1;
  const next = () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const r = {
    next,
    int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    bool: (p = 0.5) => next() < p,
    shuffle: (arr) => {
      const x = arr.slice();
      for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; }
      return x;
    },
    /** nonzero integer in [lo, hi] */
    nz: (lo, hi) => { let v = 0; while (v === 0) v = lo + Math.floor(next() * (hi - lo + 1)); return v; },
    /** n distinct integers from [lo, hi] */
    distinct: (n, lo, hi) => {
      const pool = []; for (let v = lo; v <= hi; v++) pool.push(v);
      return r.shuffle(pool).slice(0, n);
    },
  };
  return r;
}
