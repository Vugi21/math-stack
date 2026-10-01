// Picking problems the student has not seen, and building quizzes, chapter tests and the daily mix.
import { makeRng, hash32 } from './rng.js';
import { plain } from './format.js';

export const hashKey = (s) => hash32(s).toString(36);

/** Build one concrete problem from a template and a seed. Same seed gives the same problem. */
export function instantiate(lessonId, tpl, seed) {
  const rng = makeRng((seed ^ hash32(tpl.id)) >>> 0);
  const p = { ...tpl.make(rng) };
  p.type = p.type || 'num';
  p.id = tpl.id; p.tid = tpl.id; p.seed = seed; p.lessonId = lessonId;
  p.key = lessonId + '/' + tpl.id + '#' + hashKey(plain(p.q) + '|' + JSON.stringify(p.ans ?? (p.opts ? p.opts.map(plain) : '')));
  return p;
}

/** Find a seed that produces a problem whose key is not in `seen`. */
export function freshSeed(lessonId, tpl, seen, rng) {
  for (let i = 0; i < 120; i++) {
    const seed = rng.int(1, 2147483646);
    if (!seen[instantiate(lessonId, tpl, seed).key]) return seed;
  }
  return rng.int(1, 2147483646);
}

/**
 * Choose which templates to use. Least recently used first, concepts the student missed get a boost,
 * and no lesson supplies more than `perLessonCap` items so a chapter test spreads across lessons.
 */
export function pickTemplates(entries, count, state, rng, perLessonCap = Infinity) {
  const scored = entries.map((e) => {
    const k = e.lessonId + '/' + e.tpl.id;
    const lastUsed = state.used[k] || 0;
    const missed = (state.missed[k] || 0) > ((state.fixed && state.fixed[k]) || 0);
    return { e, score: lastUsed - (missed ? 1e12 : 0) + rng.next() * 1000 };
  }).sort((a, b) => a.score - b.score);
  const out = []; const perLesson = {};
  for (const { e } of scored) {
    if (out.length >= count) break;
    if ((perLesson[e.lessonId] || 0) >= perLessonCap) continue;
    perLesson[e.lessonId] = (perLesson[e.lessonId] || 0) + 1;
    out.push(e);
  }
  // if the cap left us short, fill without the cap
  for (const { e } of scored) {
    if (out.length >= count) break;
    if (!out.includes(e)) out.push(e);
  }
  return out;
}

/** Descriptors are small and storable: {lid, tid, seed}. */
export function buildDraft(entries, count, state, rng, perLessonCap) {
  const chosen = pickTemplates(entries, count, state, rng, perLessonCap);
  return chosen.map((e) => ({ lid: e.lessonId, tid: e.tpl.id, seed: freshSeed(e.lessonId, e.tpl, state.seen, rng) }));
}

export function hydrate(index, desc) {
  const lesson = index.lessonById[desc.lid];
  const tpl = lesson && lesson.quiz.find((t) => t.id === desc.tid);
  if (!tpl) return null;
  return instantiate(desc.lid, tpl, desc.seed);
}

export const entriesFor = (lessons) => lessons.flatMap((l) => l.quiz.map((tpl) => ({ lessonId: l.id, tpl })));
