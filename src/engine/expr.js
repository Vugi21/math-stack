// A small, safe algebra-expression reader. No eval. Used to check answers like 3x+4x = 7x
// by comparing values at several test points.

const FUNCS = { sqrt: Math.sqrt, abs: Math.abs };

function tokenize(src) {
  const s = String(src).replace(/[−–—]/g, '-').replace(/[×·*]/g, '*').replace(/÷/g, '/').replace(/√/g, ' sqrt ');
  const out = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) {
      let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++;
      const txt = s.slice(i, j);
      if ((txt.match(/\./g) || []).length > 1 || txt === '.') throw new Error('bad number');
      out.push({ k: 'n', v: parseFloat(txt) }); i = j; continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      let j = i; while (j < s.length && /[a-zA-Z]/.test(s[j])) j++;
      for (const m of s.slice(i, j).matchAll(/sqrt|abs|[a-zA-Z]/gi)) {
        const w = m[0].toLowerCase();
        out.push(FUNCS[w] ? { k: 'f', v: w } : { k: 'v', v: w });
      }
      i = j; continue;
    }
    if ('+-*/^()'.includes(c)) { out.push({ k: 'o', v: c }); i++; continue; }
    throw new Error('bad character ' + c);
  }
  return out;
}

function parse(tokens) {
  let p = 0;
  const peek = () => tokens[p];
  const next = () => tokens[p++];
  const isOp = (t, v) => t && t.k === 'o' && t.v === v;
  const startsFactor = (t) => t && (t.k === 'n' || t.k === 'v' || t.k === 'f' || isOp(t, '('));

  function expr() {
    let l = term();
    while (isOp(peek(), '+') || isOp(peek(), '-')) {
      const op = next().v; const r = term();
      l = { t: op, a: l, b: r };
    }
    return l;
  }
  function term() {
    let l = unary();
    for (;;) {
      const t = peek();
      if (isOp(t, '*') || isOp(t, '/')) { next(); const r = unary(); l = { t: t.v, a: l, b: r }; }
      else if (startsFactor(t)) {
        const prev = tokens[p - 1];
        if (prev && prev.k === 'n' && t.k === 'n') throw new Error('two numbers in a row');
        const r = power(); l = { t: '*', a: l, b: r };
      } else break;
    }
    return l;
  }
  function unary() {
    const t = peek();
    if (isOp(t, '-')) { next(); return { t: 'neg', a: unary() }; }
    if (isOp(t, '+')) { next(); return unary(); }
    return power();
  }
  function power() {
    const b = atom();
    if (isOp(peek(), '^')) { next(); return { t: '^', a: b, b: unary() }; }
    return b;
  }
  function atom() {
    const t = next();
    if (!t) throw new Error('unexpected end');
    if (t.k === 'n') return { t: 'n', v: t.v };
    if (t.k === 'v') return { t: 'v', v: t.v };
    if (t.k === 'f') return { t: 'f', f: t.v, a: isOp(peek(), '(') ? atom() : power() };
    if (isOp(t, '(')) {
      const e = expr();
      if (!isOp(next(), ')')) throw new Error('missing )');
      return e;
    }
    throw new Error('unexpected token');
  }
  const tree = expr();
  if (p < tokens.length) throw new Error('unexpected trailing input');
  return tree;
}

function evaluate(n, env) {
  switch (n.t) {
    case 'n': return n.v;
    case 'v': return env[n.v] ?? NaN;
    case 'neg': return -evaluate(n.a, env);
    case '+': return evaluate(n.a, env) + evaluate(n.b, env);
    case '-': return evaluate(n.a, env) - evaluate(n.b, env);
    case '*': return evaluate(n.a, env) * evaluate(n.b, env);
    case '/': return evaluate(n.a, env) / evaluate(n.b, env);
    case '^': return Math.pow(evaluate(n.a, env), evaluate(n.b, env));
    case 'f': return FUNCS[n.f](evaluate(n.a, env));
    default: return NaN;
  }
}
function collectVars(n, set = new Set()) {
  if (n.t === 'v') set.add(n.v);
  if (n.a) collectVars(n.a, set);
  if (n.b) collectVars(n.b, set);
  return set;
}
function countOps(n) {
  if (!n.a) return 0;
  return (n.t === 'neg' ? 0 : 1) + countOps(n.a) + (n.b ? countOps(n.b) : 0);
}

export function compileExpr(src) {
  const tree = parse(tokenize(src));
  return { tree, vars: collectVars(tree), ops: countOps(tree), eval: (env) => evaluate(tree, env) };
}

const POINTS = [[1.7, 2.3, 0.6], [-2.1, 1.3, 3.7], [0.45, -1.9, 2.2], [3.3, 0.8, -0.7], [-0.9, -2.6, 1.1], [2.9, -0.4, -1.8], [1.3, 3.1, 2.7], [-3.2, 0.5, -2.4]];

/** true when the two expressions have the same value at many test points */
export function exprEquiv(a, b) {
  const A = typeof a === 'string' ? compileExpr(a) : a;
  const B = typeof b === 'string' ? compileExpr(b) : b;
  const vars = [...new Set([...A.vars, ...B.vars])].sort();
  let compared = 0;
  for (const pt of POINTS) {
    const env = {};
    vars.forEach((v, i) => { env[v] = pt[i % 3] + Math.floor(i / 3) * 0.37; });
    const x = A.eval(env), y = B.eval(env);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    compared++;
    if (Math.abs(x - y) > 1e-7 * Math.max(1, Math.abs(x), Math.abs(y))) return false;
  }
  return compared >= 3 || vars.length === 0 && compared >= 1;
}
