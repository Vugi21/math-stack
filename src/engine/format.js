import { R, fm, fmMixed } from './rational.js';
import { parseNum } from './parse.js';

/**
 * Lesson markup to HTML.
 *   {3/4}      stacked fraction        x^[2]   superscript
 *   _[n]       subscript               sqrt[x] square root with bar
 */
export const M = (s) => String(s)
  .replace(/\{([^{}/]+)\/([^{}/]+)\}/g, (_, a, b) => '<span class="fr"><span class="n">' + a + '</span><span class="d">' + b + '</span></span>')
  .replace(/\^\[([^\]]*)\]/g, '<sup>$1</sup>')
  .replace(/_\[([^\]]*)\]/g, '<sub>$1</sub>')
  .replace(/sqrt\[([^\]]*)\]/g, '√<span class="rad">$1</span>');

/** markup to plain text, used for comparing and hashing problems */
export const plain = (s) => String(s)
  .replace(/\{([^{}/]+)\/([^{}/]+)\}/g, '($1/$2)')
  .replace(/\^\[([^\]]*)\]/g, '^$1')
  .replace(/_\[([^\]]*)\]/g, '_$1')
  .replace(/sqrt\[([^\]]*)\]/g, '√$1')
  .replace(/<[^>]+>/g, '')
  .replace(/\s+/g, ' ').trim();

/** how the correct answer is shown to the student, as markup */
export function ansMarkup(p) {
  const type = p.type || 'num';
  if (type === 'mc') return p.opts[p.ok];
  if (type === 'text') return Array.isArray(p.ans) ? p.ans[0] : p.ans;
  if (type === 'num') {
    const v = parseNum(String(p.ans));
    return v ? (p.mixed ? fmMixed(v) : fm(v)) + (p.unit ? ' ' + p.unit : '') : String(p.ans);
  }
  return String(p.ans);
}

/** the text a student would have to type to be correct (used by tests) */
export function ansToInput(p) {
  const type = p.type || 'num';
  if (type === 'mc') return p.ok;
  if (type === 'text') return Array.isArray(p.ans) ? p.ans[0] : p.ans;
  return String(p.ans);
}

export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export { R };
