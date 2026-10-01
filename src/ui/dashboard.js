// Progress report for the student, and the same report for a parent looking at a linked student.
import { h, mh } from './dom.js';
import { courseProgress, chapterProgress } from './progress.js';
import { streak, dayKey, DAY } from '../engine/review.js';

/** Look up the message that was shown for a tagged mistake: "lessonId/problemId:w2" */
export function wrongMessage(course, tag) {
  if (!tag) return null;
  const [key, w] = tag.split(':w');
  const [lid, pid] = [key.slice(0, key.indexOf('/')), key.slice(key.indexOf('/') + 1)];
  const l = course.lessonById[lid]; if (!l) return null;
  let prob = [...l.tryFirst, ...l.practice].find((p) => p.id === pid);
  const m = /^c(\d+)_(\d+)$/.exec(pid);
  if (!prob && m) prob = l.challenge.filter((x) => x.kind === 'chain')[+m[1]]?.parts[+m[2]];
  const msg = prob?.wrong?.[+w]?.[1];
  return msg ? { lesson: l, q: prob.q, msg } : null;
}

export function summarize(state, attempts, course) {
  const per = {}; let n = 0, c = 0, hints = 0;
  const mistakes = {};
  for (const a of attempts) {
    n++; if (a.correct) c++; hints += a.hints_used || 0;
    const r = (per[a.lesson_id] = per[a.lesson_id] || { n: 0, c: 0 });
    r.n++; if (a.correct) r.c++;
    if (a.mistake_tag) mistakes[a.mistake_tag] = (mistakes[a.mistake_tag] || 0) + 1;
  }
  const weak = Object.entries(per).filter(([id, r]) => r.n >= 5 && course.lessonById[id]).map(([id, r]) => ({ lesson: course.lessonById[id], acc: r.c / r.n, n: r.n })).sort((a, b) => a.acc - b.acc).slice(0, 5);
  const common = Object.entries(mistakes).sort((a, b) => b[1] - a[1]).map(([tag, count]) => ({ ...wrongMessage(course, tag), count })).filter((x) => x.msg).slice(0, 5);
  const now = Date.now();
  const days = [];
  for (let i = 13; i >= 0; i--) { const k = dayKey(now - i * DAY); days.push({ k, n: state.days[k]?.n || 0, c: state.days[k]?.c || 0 }); }
  return { n, c, acc: n ? c / n : null, hintsPer: n ? hints / n : 0, weak, common, days, streak: streak(state.days, now), progress: courseProgress(course, state) };
}

export function dashboardView(course, state, attempts, who) {
  const S = summarize(state, attempts, course);
  const tile = (big, small) => h('div', { class: 'stat' }, h('b', {}, big), h('span', {}, small));
  const maxN = Math.max(1, ...S.days.map((d) => d.n));
  const bars = h('div', { class: 'daybars', role: 'img', 'aria-label': 'Answers per day for the last 14 days' }, S.days.map((d) => h('div', { class: 'daycol', title: d.k + ': ' + d.n + ' answers, ' + d.c + ' correct' },
    h('i', { style: 'height:' + Math.round((d.n / maxN) * 100) + '%' }), h('span', {}, d.k.slice(8)))));
  const chapters = course.chapters.map((ch) => {
    const p = chapterProgress(course, state, ch);
    return h('div', { class: 'chrow' }, h('span', { class: 'chn' }, ch.n), h('div', { class: 'grow' }, h('p', {}, ch.title), h('div', { class: 'bar' }, h('i', { style: 'width:' + Math.round((100 * p.mastered) / Math.max(1, p.total)) + '%' }))),
      h('span', { class: 'chc' }, p.mastered + '/' + p.total + (p.test.passed ? ' ★' : '')));
  });
  const recent = attempts.slice(0, 12).map((a) => {
    const l = course.lessonById[a.lesson_id];
    return h('li', { class: a.correct ? 'ok' : 'no' }, h('span', {}, a.correct ? '✓' : '✕'), h('span', {}, (l ? l.num + ' ' + l.title : a.lesson_id) + ' · ' + a.kind), h('time', {}, new Date(a.created_at).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })));
  });
  return h('div', {},
    h('h1', {}, who ? who + ': progress' : 'Your progress'),
    h('div', { class: 'stats wide' },
      tile(S.progress.mastered + ' / ' + S.progress.total, 'lessons mastered'),
      tile(S.acc === null ? '–' : Math.round(S.acc * 100) + '%', 'answers correct (last ' + S.n + ')'),
      tile(S.n ? S.hintsPer.toFixed(1) : '–', 'hints per answer'),
      tile(String(S.streak), 'day streak')),
    h('section', { class: 'sheet' }, h('h2', {}, 'Activity, last 14 days'), bars),
    h('section', { class: 'sheet' }, h('h2', {}, 'Chapters'), chapters),
    h('section', { class: 'sheet' }, h('h2', {}, 'Where to focus'),
      S.weak.length ? h('ul', { class: 'plain' }, S.weak.map((w) => h('li', {}, h('b', {}, w.lesson.num + ' ' + w.lesson.title), ' · ' + Math.round(w.acc * 100) + '% correct over ' + w.n + ' answers'))) : h('p', { class: 'note' }, 'Not enough answers yet to spot a weak area.'),
      S.common.length ? h('div', {}, h('h3', {}, 'Most common mistakes'), h('ul', { class: 'plain' }, S.common.map((m) => h('li', {}, mh('span', {}, m.q), h('br'), h('span', { class: 'note' }, m.count + '× · ' + m.msg.replace(/<[^>]+>/g, '').replace(/\{([^{}/]+)\/([^{}/]+)\}/g, '$1/$2')))))) : null),
    h('section', { class: 'sheet' }, h('h2', {}, 'Recent answers'), recent.length ? h('ul', { class: 'recent' }, recent) : h('p', { class: 'note' }, 'Nothing yet.')));
}
