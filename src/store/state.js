// The whole student state is one small JSON document. Every field only ever grows or moves forward,
// so two devices can be merged safely with mergeState().
import { dayKey, schedule } from '../engine/review.js';

export const emptyState = () => ({
  v: 1,
  lessons: {},   // id -> {tryFirst:{key:ts}, practice:{}, challenge:{}, quiz:{best,passed,tries,passedAt}}
  chapters: {},  // id -> {best, passed, tries}
  seen: {},      // problem key -> ts   (never show an exact problem twice)
  used: {},      // lessonId/templateId -> ts when last put into a quiz
  missed: {},    // lessonId/templateId -> ts of last miss
  fixed: {},     // lessonId/templateId -> ts of last correct answer
  resume: null,  // {lid, tab, t}
  drafts: {},    // draftId -> {items:[{lid,tid,seed}], vals:[], done, score, t}
  review: {},    // lessonId -> {box, due, last}
  days: {},      // yyyy-mm-dd -> {n, c}
  updated: 0,
});

const maxMap = (a = {}, b = {}) => { const o = { ...a }; for (const k in b) o[k] = Math.max(o[k] || 0, b[k]); return o; };
const newer = (a, b, f = 't') => (!a ? b : !b ? a : (a[f] || 0) >= (b[f] || 0) ? a : b);

function mergeLesson(a = {}, b = {}) {
  const qa = a.quiz || {}, qb = b.quiz || {};
  return {
    tryFirst: maxMap(a.tryFirst, b.tryFirst),
    practice: maxMap(a.practice, b.practice),
    challenge: maxMap(a.challenge, b.challenge),
    quiz: {
      best: Math.max(qa.best || 0, qb.best || 0),
      passed: !!(qa.passed || qb.passed),
      tries: Math.max(qa.tries || 0, qb.tries || 0),
      passedAt: Math.max(qa.passedAt || 0, qb.passedAt || 0) || undefined,
    },
  };
}

export function mergeState(a, b) {
  a = a || emptyState(); b = b || emptyState();
  const out = emptyState();
  for (const id of new Set([...Object.keys(a.lessons || {}), ...Object.keys(b.lessons || {})])) out.lessons[id] = mergeLesson(a.lessons?.[id], b.lessons?.[id]);
  for (const id of new Set([...Object.keys(a.chapters || {}), ...Object.keys(b.chapters || {})])) {
    const x = a.chapters?.[id] || {}, y = b.chapters?.[id] || {};
    out.chapters[id] = { best: Math.max(x.best || 0, y.best || 0), passed: !!(x.passed || y.passed), tries: Math.max(x.tries || 0, y.tries || 0) };
  }
  out.seen = maxMap(a.seen, b.seen);
  out.used = maxMap(a.used, b.used);
  out.missed = maxMap(a.missed, b.missed);
  out.fixed = maxMap(a.fixed, b.fixed);
  out.resume = newer(a.resume, b.resume) || null;
  for (const id of new Set([...Object.keys(a.drafts || {}), ...Object.keys(b.drafts || {})])) out.drafts[id] = newer(a.drafts?.[id], b.drafts?.[id]);
  for (const id of new Set([...Object.keys(a.review || {}), ...Object.keys(b.review || {})])) out.review[id] = newer(a.review?.[id], b.review?.[id], 'last');
  for (const k of new Set([...Object.keys(a.days || {}), ...Object.keys(b.days || {})])) {
    const x = a.days?.[k] || {}, y = b.days?.[k] || {};
    out.days[k] = { n: Math.max(x.n || 0, y.n || 0), c: Math.max(x.c || 0, y.c || 0) };
  }
  out.updated = Math.max(a.updated || 0, b.updated || 0);
  return out;
}

export const lessonRec = (s, id) => (s.lessons[id] = s.lessons[id] || { tryFirst: {}, practice: {}, challenge: {}, quiz: { best: 0, passed: false, tries: 0 } });
export const chapterRec = (s, id) => (s.chapters[id] = s.chapters[id] || { best: 0, passed: false, tries: 0 });

export const isMissed = (s, key) => (s.missed[key] || 0) > (s.fixed[key] || 0);

export { dayKey, schedule };
