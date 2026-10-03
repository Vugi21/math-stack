// Widgets for Math 4 (logic). Export each widget built with makeWidget; index.js registers them.
import { makeWidget, svg, line, rect, txt } from './framework.js';
import { esc } from '../engine/format.js';

// ---------- logicGrid: a yes/no/blank elimination grid. Click a cell to cycle blank -> no -> yes ----------
// opts: rows: ['Ava','Ben','Cy'], cols: ['cat','dog','fish'], partial: true when some columns may stay empty (e.g. digits 1-9 for a 3-digit code)
const CELL = 54, LEFT = 86, TOP = 40;

const base = makeWidget({
  cap: 'Elimination grid',
  init: (o) => ({ cells: new Array((o.rows || ['A', 'B', 'C']).length * (o.cols || ['x', 'y', 'z']).length).fill(0) }),
  controls: () => [],
  actions: (st, redraw, o) => {
    if (o._hold) { o._hold.st = st; o._hold.redraw = redraw; }
    return [{ label: 'Clear the grid', fn: () => { st.cells.fill(0); } }];
  },
  draw: (st, o) => {
    const rows = o.rows || ['A', 'B', 'C'], cols = o.cols || ['x', 'y', 'z'];
    const R = rows.length, C = cols.length, W = LEFT + C * CELL + 10, H = TOP + R * CELL + 10;
    let s = '';
    cols.forEach((c, j) => { s += txt(LEFT + j * CELL + CELL / 2, TOP - 12, esc(c), 'tx tc'); });
    rows.forEach((r, i) => { s += txt(LEFT - 8, TOP + i * CELL + CELL / 2 + 5, esc(r), 'tx tr'); });
    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        const v = st.cells[i * C + j];
        const x = LEFT + j * CELL, y = TOP + i * CELL;
        s += '<g data-cell="' + (i * C + j) + '" style="cursor:pointer">' + rect(x, y, CELL, CELL, 'st-ink ' + (v === 2 ? 'fl-g' : v === 1 ? 'fl-bs' : 'fl-s'));
        if (v === 1) s += txt(x + CELL / 2, y + CELL / 2 + 8, '✗', 'tx-b tc');
        if (v === 2) s += txt(x + CELL / 2, y + CELL / 2 + 8, '✓', 'tx-b tc');
        s += '</g>';
      }
    }
    // reasoning feedback
    const notes = [];
    const at = (i, j) => st.cells[i * C + j];
    for (let i = 0; i < R; i++) {
      const yes = [], blank = [];
      for (let j = 0; j < C; j++) { if (at(i, j) === 2) yes.push(j); if (at(i, j) === 0) blank.push(j); }
      if (yes.length > 1) notes.push('<b>' + esc(rows[i]) + '</b> has two ✓. That cannot be: each person matches only one.');
      else if (!yes.length && blank.length === 1) notes.push('Every other cell in <b>' + esc(rows[i]) + '</b> is ✗, so the last blank must be ✓.');
    }
    for (let j = 0; j < C; j++) {
      const yes = [], blank = [];
      for (let i = 0; i < R; i++) { if (at(i, j) === 2) yes.push(i); if (at(i, j) === 0) blank.push(i); }
      if (yes.length > 1) notes.push('<b>' + esc(cols[j]) + '</b> has two ✓. That cannot be.');
      else if (!o.partial && !yes.length && blank.length === 1) notes.push('Every other cell in column <b>' + esc(cols[j]) + '</b> is ✗, so the last blank must be ✓.');
    }
    const yesCount = st.cells.filter((v) => v === 2).length;
    const text = notes.length ? notes.join(' ') : (yesCount === Math.min(R, C) ? 'The grid is full. Check it against every clue.' : 'Click a cell: one click puts ✗ (not a match), two clicks put ✓ (a match), three clicks clear it. When a ✓ goes in, put ✗ in the rest of its row' + (o.partial ? '.' : ' and column.'));
    return { svg: svg(W, H, s, 'Elimination grid with ' + R + ' rows and ' + C + ' columns'), text };
  },
});

export const logicGrid = (opts = {}) => {
  const hold = {};
  const el = base({ ...opts, _hold: hold });
  const viz = el.querySelector('.viz');
  viz.addEventListener('click', (e) => {
    const g = e.target.closest && e.target.closest('[data-cell]');
    if (!g || !hold.st) return;
    const k = Number(g.getAttribute('data-cell'));
    hold.st.cells[k] = (hold.st.cells[k] + 1) % 3;
    hold.redraw();
  });
  return el;
};
