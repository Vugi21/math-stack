// The course map: Continue card, Daily Mix prompt, then every chapter with its lessons.
import { h, mh } from './dom.js';
import { lessonProgress, isUnlocked, chapterProgress, courseProgress, nextUp, dueCount, CHAPTER_PASS, CHAPTER_SIZE } from './progress.js';
import { streak } from '../engine/review.js';

const pip = (done, total, label) => h('span', { class: 'pip' + (total && done >= total ? ' on' : done ? ' part' : ''), title: label + ': ' + done + ' of ' + total }, label);

export function homeView(app) {
  const { store, course, navigate } = app;
  const s = store.s, cp = courseProgress(course, s), next = nextUp(course, s), due = dueCount(s, course), st = streak(s.days, Date.now());

  const head = h('div', { class: 'hero' },
    h('p', { class: 'eyebrow' }, course.title + ' · Grade ' + course.grade),
    h('h1', {}, 'Your path through ' + course.title),
    h('div', { class: 'stats' },
      h('div', { class: 'stat' }, h('b', {}, cp.mastered + ' / ' + cp.total), h('span', {}, 'lessons mastered')),
      h('div', { class: 'stat' }, h('b', {}, cp.pct + '%'), h('span', {}, 'of the course')),
      h('div', { class: 'stat' }, h('b', {}, String(st)), h('span', {}, st === 1 ? 'day streak' : 'day streak'))),
    h('div', { class: 'bar', role: 'progressbar', 'aria-valuenow': cp.pct, 'aria-valuemin': 0, 'aria-valuemax': 100 }, h('i', { style: 'width:' + cp.pct + '%' })));

  const cards = [];
  if (next) {
    const l = course.lessonById[next.lid];
    cards.push(h('div', { class: 'callout' },
      h('div', {}, h('p', { class: 'eyebrow' }, next.resumed ? 'Pick up where you left off' : 'Next up'), h('h2', {}, l.num + ' ' + l.title)),
      h('button', { class: 'btn', type: 'button', onclick: () => navigate('/lesson/' + next.lid + '/' + next.tab) }, next.resumed ? 'Continue' : 'Start')));
  } else {
    cards.push(h('div', { class: 'callout' }, h('div', {}, h('p', { class: 'eyebrow' }, 'Course complete'), h('h2', {}, 'Every lesson is mastered'))));
  }
  if (due > 0) {
    cards.push(h('div', { class: 'callout alt' },
      h('div', {}, h('p', { class: 'eyebrow' }, 'Daily Mix'), h('h2', {}, due + (due === 1 ? ' lesson is' : ' lessons are') + ' ready for review')),
      h('button', { class: 'btn', type: 'button', onclick: () => navigate('/review') }, 'Start the mix')));
  }

  const chapters = course.chapters.map((ch) => {
    const cpg = chapterProgress(course, s, ch);
    const rows = ch.lessons.map((l) => {
      const pr = lessonProgress(s, l), ok = isUnlocked(course, s, l);
      return h('li', { class: 'lrow' + (pr.mastered ? ' done' : '') + (!ok ? ' locked' : '') },
        h('div', { class: 'lnum', 'aria-hidden': 'true' }, pr.mastered ? '✓' : l.num),
        h('div', { class: 'lmain' },
          h('h3', {}, l.title),
          h('div', { class: 'pips' }, pip(pr.try.done, pr.try.total, 'Try'), pip(pr.practice.done, pr.practice.total, 'Practice'), pip(pr.challenge.done, pr.challenge.total, 'Challenge'),
            pr.mastered ? h('span', { class: 'tag good' }, 'Mastered ' + pr.quiz.best + '/5') : !ok ? h('span', { class: 'tag' }, 'Locked') : null)),
        h('button', { class: ok ? 'btn small' : 'btn ghost small', type: 'button', onclick: () => navigate('/lesson/' + l.id + '/' + (pr.started ? 'learn' : 'try')) },
          pr.mastered ? 'Review' : pr.started ? 'Continue' : ok ? 'Start' : 'Open anyway'));
    });
    const test = h('li', { class: 'lrow test' + (cpg.test.passed ? ' done' : '') + (!cpg.allMastered ? ' locked' : '') },
      h('div', { class: 'lnum', 'aria-hidden': 'true' }, cpg.test.passed ? '✓' : '★'),
      h('div', { class: 'lmain' }, h('h3', {}, 'Chapter ' + ch.n + ' test'), h('div', { class: 'pips' },
        cpg.test.passed ? h('span', { class: 'tag good' }, 'Passed ' + cpg.test.best + '/' + CHAPTER_SIZE) : cpg.allMastered ? h('span', { class: 'tag' }, CHAPTER_SIZE + ' mixed questions, pass with ' + CHAPTER_PASS) : h('span', { class: 'tag' }, 'Master all ' + ch.lessons.length + ' lessons to unlock'))),
      h('button', { class: cpg.allMastered ? 'btn small' : 'btn ghost small', type: 'button', disabled: !cpg.allMastered || null, onclick: () => navigate('/chapter/' + ch.id) }, cpg.test.passed ? 'Retake' : 'Take the test'));
    return h('section', { class: 'chapter' },
      h('div', { class: 'chhead' }, h('span', { class: 'chn' }, ch.n), h('div', {}, h('h2', {}, ch.title), ch.blurb ? mh('p', { class: 'chb' }, ch.blurb) : null), h('span', { class: 'chc' }, cpg.mastered + '/' + cpg.total)),
      h('ol', { class: 'lessons' }, rows, test));
  });

  return h('div', {}, head, cards, chapters);
}
